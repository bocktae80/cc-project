#!/usr/bin/env node
/**
 * 튜토리얼 버전 추적 도구
 *
 * 사용법:
 *   node studio/data/check-updates.js              # 갱신 필요 항목 확인
 *   node studio/data/check-updates.js --all        # 전체 현황
 *   node studio/data/check-updates.js --bump 2.1.65  # 현재 CLI 버전 갱신
 *   node studio/data/check-updates.js --update 18    # 특정 튜토리얼 버전 갱신
 */

const fs = require("fs");
const path = require("path");
const { execFileSync } = require("child_process");

const TRACK_FILE = path.join(__dirname, "version-track.json");

function loadTrack() {
  return JSON.parse(fs.readFileSync(TRACK_FILE, "utf8"));
}

function saveTrack(data) {
  fs.writeFileSync(TRACK_FILE, JSON.stringify(data, null, 2) + "\n");
}

function parseVersion(v) {
  return v.split(".").map(Number);
}

function compareVersions(a, b) {
  const pa = parseVersion(a);
  const pb = parseVersion(b);
  for (let i = 0; i < 3; i++) {
    if ((pa[i] || 0) < (pb[i] || 0)) return -1;
    if ((pa[i] || 0) > (pb[i] || 0)) return 1;
  }
  return 0;
}

function getInstalledVersion() {
  try {
    const out = execFileSync("claude", ["--version"], {
      encoding: "utf8",
      stdio: ["pipe", "pipe", "pipe"],
    });
    const match = out.match(/([\d.]+)/);
    return match ? match[1] : null;
  } catch {
    return null;
  }
}

function versionGap(base, current) {
  const pb = parseVersion(base);
  const pc = parseVersion(current);
  return pc[2] - pb[2]; // patch diff (같은 major.minor 가정)
}

// --- Commands ---

function showStatus(showAll) {
  const track = loadTrack();
  const installed = getInstalledVersion();
  const current = installed || track.currentCLI;

  console.log("=== Claude Code 튜토리얼 버전 추적 ===\n");
  console.log(`기록된 CLI 버전:  ${track.currentCLI}`);
  if (installed) {
    console.log(`설치된 CLI 버전:  ${installed}`);
    if (compareVersions(track.currentCLI, installed) < 0) {
      console.log(
        `  → CLI가 업데이트됨! --bump ${installed} 로 기록을 갱신하세요.`
      );
    }
  }
  console.log(`Python SDK:       ${track.sdkVersions.python}`);
  console.log(`TypeScript SDK:   ${track.sdkVersions.typescript}`);
  console.log(`마지막 확인:      ${track.lastChecked}`);
  console.log();

  const entries = Object.entries(track.tutorials);
  const outdated = [];
  const upToDate = [];

  for (const [id, info] of entries) {
    const gap = versionGap(info.basedOn, current);
    if (gap > 5) {
      outdated.push({ id, ...info, gap });
    } else {
      upToDate.push({ id, ...info, gap });
    }
  }

  if (outdated.length > 0) {
    console.log(
      `⚠ 갱신 필요 (현재 버전과 5+ 패치 차이): ${outdated.length}개\n`
    );
    console.log(
      "  " +
        "번호".padEnd(24) +
        "기준 버전".padEnd(14) +
        "차이".padEnd(8) +
        "마지막 갱신".padEnd(14) +
        "추적 기능"
    );
    console.log("  " + "-".repeat(80));
    for (const t of outdated) {
      console.log(
        `  ${t.id.padEnd(24)}${t.basedOn.padEnd(14)}+${String(t.gap).padEnd(7)}${t.lastUpdated.padEnd(14)}${t.trackedFeatures.slice(0, 3).join(", ")}`
      );
    }
    console.log();
  }

  if (showAll && upToDate.length > 0) {
    console.log(`✓ 최신 (5 패치 이내): ${upToDate.length}개\n`);
    for (const t of upToDate) {
      console.log(
        `  ${t.id.padEnd(24)}${t.basedOn.padEnd(14)}+${String(t.gap).padEnd(7)}${t.lastUpdated}`
      );
    }
    console.log();
  }

  if (outdated.length === 0) {
    console.log("✓ 모든 튜토리얼이 최신 버전 범위 내에 있습니다.\n");
  }

  console.log(`총 ${entries.length}개 튜토리얼 추적 중`);
}

function bumpVersion(newVersion) {
  const track = loadTrack();
  const old = track.currentCLI;
  track.currentCLI = newVersion;
  track.lastChecked = new Date().toISOString().slice(0, 10);
  saveTrack(track);
  console.log(`CLI 버전 갱신: ${old} → ${newVersion}`);
  console.log(`lastChecked: ${track.lastChecked}`);
  console.log("\n갱신 필요 항목을 확인하세요: node studio/data/check-updates.js");
}

function updateTutorial(numOrId, newVersion) {
  const track = loadTrack();
  const current = newVersion || track.currentCLI;

  // 번호로 찾기
  const key =
    Object.keys(track.tutorials).find((k) => {
      const match = k.match(/^(\d+)/);
      return match && match[1] === String(numOrId).padStart(2, "0");
    }) || numOrId;

  if (!track.tutorials[key]) {
    console.error(`튜토리얼을 찾을 수 없습니다: ${numOrId}`);
    process.exit(1);
  }

  const old = track.tutorials[key].basedOn;
  track.tutorials[key].basedOn = current;
  track.tutorials[key].lastUpdated = new Date().toISOString().slice(0, 10);
  saveTrack(track);
  console.log(`${key}: ${old} → ${current} (갱신 완료)`);
}

// --- Main ---

const args = process.argv.slice(2);

if (args.includes("--all")) {
  showStatus(true);
} else if (args.includes("--bump")) {
  const idx = args.indexOf("--bump");
  const ver = args[idx + 1];
  if (!ver) {
    console.error("사용법: --bump <version>  (예: --bump 2.1.65)");
    process.exit(1);
  }
  bumpVersion(ver);
} else if (args.includes("--update")) {
  const idx = args.indexOf("--update");
  const num = args[idx + 1];
  const ver = args[idx + 2];
  if (!num) {
    console.error(
      "사용법: --update <번호> [version]  (예: --update 18 2.1.65)"
    );
    process.exit(1);
  }
  updateTutorial(num, ver);
} else {
  showStatus(false);
}
