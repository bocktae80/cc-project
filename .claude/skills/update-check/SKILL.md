---
description: "Claude Code CLI 또는 SDK 버전이 업데이트되었는지 체크하고, changelog를 분석하여 기존 튜토리얼에 반영할 항목과 새 튜토리얼 후보를 식별합니다. 사용자가 '업데이트 체크', '새 기능 확인', '버전 확인', '새 버전 나왔어?', '변경사항 알려줘', '튜토리얼 갱신할 거 있어?', 'update check', 'what changed', 'new features', 'changelog' 등을 말할 때 이 스킬을 사용하세요. check-updates.js를 단순 실행하는 것과 다르게, GitHub changelog까지 분석하고 튜토리얼 매칭까지 수행합니다."
user-invocable: true
allowed-tools:
  - Bash
  - Read
  - Edit
  - WebSearch
  - WebFetch
  - Grep
  - Glob
---

# /update-check — 튜토리얼 업데이트 체크

이 스킬은 CC Project의 튜토리얼이 최신 Claude Code 버전을 반영하고 있는지 확인하고, 갱신이 필요한 항목을 식별합니다. 단순 버전 비교가 아니라 **changelog 분석 → 튜토리얼 매칭 → 액션 제안**까지 수행하는 것이 핵심입니다.

## 1단계: 현재 상태 수집

### 버전 추적 현황
!`node studio/data/check-updates.js --all 2>&1`

### 설치된 CLI 버전
!`claude --version 2>&1`

## 2단계: 버전 비교

`studio/data/version-track.json`의 `currentCLI`(및 `sdkVersions`)와 실제 설치된 버전을 비교합니다.

- **버전이 같으면**: "모든 튜토리얼이 최신 버전 기준입니다."라고 보고하고 종료
- **버전이 다르면**: 3단계로 진행

## 3단계: Changelog 조사

GitHub Releases에서 변경사항을 가져옵니다:

```bash
gh api repos/anthropics/claude-code/releases --jq '.[0:5] | .[] | "## \(.tag_name)\n\(.body)\n---"' 2>&1 | head -500
```

`gh` CLI가 실패하면 WebSearch로 대체합니다:
```
WebSearch: "Claude Code CLI {새버전} changelog site:github.com"
```

## 4단계: 튜토리얼 매칭

changelog의 각 항목을 `version-track.json`의 `trackedFeatures`와 대조하여 분류합니다:

- **기존 튜토리얼 업데이트**: 이미 다루는 기능이 변경/개선된 경우
- **새 튜토리얼 후보**: 완전히 새로운 기능으로 별도 튜토리얼이 필요한 경우
- **무시**: 버그 수정, 내부 개선 등 튜토리얼에 영향 없는 항목

중요도 기준:
- ⭐⭐⭐: 워크플로우가 달라지는 변경 (새 도구, 동작 변경)
- ⭐⭐: 기존 기능의 유의미한 개선
- ⭐: 사소한 추가/개선

## 5단계: 결과 보고

아래 형식으로 보고합니다:

```
### 버전 변경 요약
- CLI: X.X.X → Y.Y.Y
- Python SDK: A.B.C → D.E.F (변경 있을 때만)
- TypeScript SDK: A.B.C → D.E.F (변경 있을 때만)

### 기존 튜토리얼 업데이트 대상
| 튜토리얼 | 새 기능 | 중요도 |
|----------|---------|--------|
| ...      | ...     | ⭐⭐⭐ |

### 새 튜토리얼 후보
| 기능 | 설명 | 추천 이유 |
|------|------|----------|
| ...  | ...  | ...      |
(해당 없으면 "없음" 표시)

### 추천 액션
1. ...
2. ...
```

## 6단계: 사용자 확인 후 실행

사용자가 업데이트 항목을 확인하고 승인하면:
1. 해당 `content-{num}.js` 파일에 새 기능 설명 추가
2. `version-track.json`의 `basedOn`, `lastUpdated`, `trackedFeatures`, `notes` 갱신
3. `check-updates.js --bump {새버전}`으로 버전 기록 갱신
4. 콘텐츠 파일 구문 검증 (JS eval)
