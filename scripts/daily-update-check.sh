#!/bin/zsh
#
# daily-update-check.sh
# 매일 Claude Code 업데이트를 체크해 cc-project 튜토리얼 갱신 필요 여부를 감지한다.
# launchd(com.kent.ccproject.update-check)가 매일 09:00 KST에 실행한다.
#
# 2단계 동작:
#   1) check-updates.js 로 기록 버전 vs 설치 버전 갭을 감지 (무료/즉시)
#   2) 갭이 있을 때만 claude 헤드리스로 changelog 분석 리포트 생성 + macOS 알림
#
# 읽기 전용 — 파일을 수정하거나 PR을 만들지 않는다. 실제 반영은 사람이 /update-check 로 수행.

set -uo pipefail

PROJECT_DIR="/Users/kent/Work/cc-project"
# 실제 claude 바이너리. cmux 번들 경로는 PATH에서 실제 claude를 찾아 위임하는
# shim이라 launchd 최소 환경에서 실패한다. 실 설치본을 직접 가리킨다.
CLAUDE_BIN="/Users/kent/.local/bin/claude"
LOG_DIR="$PROJECT_DIR/workbook/log/update-checks"

# launchd는 최소 PATH로 실행되므로 필요한 바이너리 경로를 직접 보장한다.
# ~/.local/bin 을 맨 앞에 둬서 check-updates.js 의 execFileSync("claude")도
# 실 설치본(2.1.168+)을 해석하도록 한다.
export PATH="/Users/kent/.local/bin:/opt/homebrew/bin:/usr/bin:/bin:/usr/sbin:/sbin:$PATH"

DATE="$(date +%Y-%m-%d)"
TS="$(date '+%Y-%m-%d %H:%M:%S')"
ROLLING_LOG="$LOG_DIR/history.log"
GAP_LOG="$LOG_DIR/$DATE-gap.txt"
REPORT="$LOG_DIR/$DATE-report.md"

mkdir -p "$LOG_DIR"

cd "$PROJECT_DIR" || {
  echo "[$TS] ERROR: cd $PROJECT_DIR 실패" >> "$ROLLING_LOG"
  exit 1
}

# --- 1단계: 결정적 버전 갭 감지 -------------------------------------------------
GAP_OUTPUT="$(node studio/data/check-updates.js 2>&1)"
echo "$GAP_OUTPUT" > "$GAP_LOG"

if echo "$GAP_OUTPUT" | grep -q "CLI가 업데이트됨"; then
  RECORDED="$(echo "$GAP_OUTPUT" | sed -n 's/.*기록된 CLI 버전: *//p' | head -1 | tr -d ' ')"
  INSTALLED="$(echo "$GAP_OUTPUT" | sed -n 's/.*설치된 CLI 버전: *//p' | head -1 | tr -d ' ')"
  echo "[$TS] NEW: 기록 ${RECORDED} → 설치 ${INSTALLED} — 전체 분석 실행" >> "$ROLLING_LOG"

  # --- 2단계: 새 버전 있을 때만 changelog 분석 (헤드리스, 읽기 전용) -----------
  PROMPT='cc-project 튜토리얼이 최신 Claude Code를 반영하는지 점검해줘. studio/data/check-updates.js 를 실행해 기록 버전과 설치 버전 갭을 확인하고, "gh api repos/anthropics/claude-code/releases" 로 그 사이 모든 릴리스 changelog 를 가져와 분석해줘. 각 변경을 studio/data/version-track.json 의 trackedFeatures 와 대조해 (1) 기존 튜토리얼 업데이트 대상(튜토리얼 번호 + 기능 + 중요도 별점) (2) 새 튜토리얼 후보 (3) 무시(버그수정 등) 로 분류한 한국어 마크다운 리포트만 출력해줘. 파일은 절대 수정하지 말고 분석/보고만 해.'

  if "$CLAUDE_BIN" -p "$PROMPT" \
      --output-format text \
      --allowedTools "Bash Read Glob Grep Skill TodoWrite WebFetch WebSearch" \
      > "$REPORT" 2>> "$ROLLING_LOG"; then
    echo "[$TS] DONE: 리포트 저장 → $REPORT" >> "$ROLLING_LOG"
    NOTIF_MSG="기록 ${RECORDED} → 설치 ${INSTALLED}. 리포트: $(basename "$REPORT")"
  else
    echo "[$TS] WARN: claude 분석 실패 (갭은 감지됨). gap 로그 참고: $GAP_LOG" >> "$ROLLING_LOG"
    NOTIF_MSG="새 버전 감지(기록 ${RECORDED} → 설치 ${INSTALLED}) — 분석 실패, 수동 확인 필요"
  fi

  # macOS 알림 (로그 기반 — 메일 미사용)
  osascript -e "display notification \"${NOTIF_MSG}\" with title \"CC Project: Claude Code 업데이트 감지\" sound name \"Glass\"" 2>/dev/null || true
else
  echo "[$TS] OK: 최신 — 갱신 불필요" >> "$ROLLING_LOG"
fi
