# CC Project — Claude Code 학습 프로젝트

> 클로드 코드의 기능을 배우고, 시각화된 튜토리얼로 만드는 교육용 프로젝트

**타겟:** 중학생, 비개발자 팀원
**원칙:** 쉽게, 예제 중심, 시각적으로

---

## 프로젝트 구조

```
cc-project/
├── projects/          # 기능별 예제 프로젝트 (26개: 01~25 + 03d)
│   └── {번호}-{기능명}/
│       ├── README.md  # 설명 + 따라하기
│       └── ...        # 예제 파일들
├── .claude/skills/    # 프로젝트 스킬
│   └── update-check/  # /update-check — changelog 분석 + 튜토리얼 매칭
├── studio/            # 학습 대시보드 (v2 리디자인)
│   ├── index.html     # 메인 HTML
│   ├── css/
│   │   ├── style.css  # v1(보존) + v2 카탈로그 CSS
│   │   ├── learn.css  # 학습 뷰 CSS
│   │   └── sandbox.css
│   ├── js/
│   │   ├── app.js     # 카탈로그 (사이드바+카드v2+히어로+학습경로)
│   │   ├── learn.js   # 학습 뷰 엔진
│   │   ├── quiz.js    # 퀴즈 엔진
│   │   └── ...        # challenges, level-system, sandbox, terminal
│   └── data/
│       ├── projects.js         # 프로젝트 메타데이터 (26개)
│       ├── content/            # 콘텐츠 파일 (26개)
│       ├── version-track.json  # CLI 버전 추적
│       └── check-updates.js    # 갱신 체커
├── assets/            # 스크린샷, 다이어그램, 영상 대본
└── workbook/          # 워크북 (상태/플랜/로그)
```

## 규칙

1. **프로젝트 네이밍:** `projects/{번호}-{기능명}/` (예: `01-file-operations/`)
2. **각 프로젝트에 README.md 필수** — 무엇을, 왜, 어떻게
3. **난이도 표기:** README 상단에 ⭐~⭐⭐⭐ 표시
4. **한국어 설명** — 코드 주석도 한국어 허용 (교육 목적)
5. **스튜디오 동기화** — 새 프로젝트 추가 시 `studio/data/projects.js`도 함께 업데이트
6. **스튜디오 시각화 검증** — 프로젝트 추가 또는 스튜디오 기능 변경 시 반드시 검증 루틴 실행
   > 상세: `workbook/rules/studio-visual-qa.yaml`

### 스튜디오 시각화 검증 루틴 (v2)

프로젝트 추가 또는 `studio/` 파일 변경 시 아래 체크리스트를 실행한다:

| # | 항목 | 확인 내용 |
|---|------|----------|
| 1 | 데이터 동기화 | `projects.js`에 신규 항목 추가됨, 필수 필드(subtitle 포함) 모두 존재, `content-{num}.js` 생성 + index.html script 태그 추가 |
| 2 | 사이드바 | 진행률 링 정확, phase 네비 항목 수/카운트 정확, 검색/필터 필 동작 |
| 3 | 히어로 배너 | phase 선택 시 색상/제목/설명/진행률 정확 표시, "전체" 선택 시 전체 통계 |
| 4 | 카드 v2 렌더링 | phase 컬러 바(상단 3px), 큰 번호, 상태 도트, 제목, 부제목, 난이도 바, 진행률 링 |
| 5 | Phase 필터 | 사이드바 phase 클릭 → 해당 phase만 표시, "전체" → 모든 카드 phase별 그룹 |
| 6 | 학습 경로 | 세로형 phase별 그룹, 노드 상태 색상, 클릭 시 learn 뷰 이동 |
| 7 | 카드 클릭 | learn 뷰 정상 이동, 콘텐츠 없는 카드는 폴더 열기 |
| 8 | 접근성 | 스킵 링크, 키보드 탐색 (Tab/Enter/Space), aria-label, focus-visible |
| 9 | 반응형 | 1024px+: 사이드바+메인, 768-1023px: 상단 탭+2열+모바일 필터, ~767px: 1열+학습경로 숨김 |
| 10 | 다크 모드 | 라이트/다크 전환 시 사이드바, 히어로, 카드, 필터, 학습경로, 진행률 링 모두 정상 |
