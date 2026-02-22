# Studio 카드 → Figma 전체 실습 가이드

> cc-project의 카드 컴포넌트를 Figma로 보내고, 수정하고, 다시 코드에 반영하는 **처음부터 끝까지** 실습

---

## 실습 목표

```
studio-card.html (코드)
        │
        ▼
   Figma 캔버스에 렌더링
        │
        ▼
   디자이너가 수정
        │
        ▼
   변경 사항을 코드에 반영
        │
        ▼
   라운드트립 완료!
```

---

## 사전 준비

| 항목 | 필수 여부 | 설명 |
|------|----------|------|
| Claude Code | 필수 | 최신 버전 |
| Figma 계정 | 필수 | 무료 플랜 OK |
| Figma MCP 연결 | 필수 | [Step 1 참고](../../tutorial/step-01-setup.md) |
| Figma 파일 | 필수 | 새 파일 하나 만들기 |

---

## 실습 파일

### studio-card.html

이 폴더의 [`studio-card.html`](./studio-card.html)은 `studio/` 대시보드에서 카드 관련 HTML/CSS만 추출한 **독립 실행 파일**입니다.

브라우저에서 직접 열어볼 수 있어요:

```bash
# 프로젝트 루트에서
open projects/12-figma-mcp/examples/studio-card-to-figma/studio-card.html
```

포함된 카드 3종:
- **완료 상태**: 초록색 실선 테두리, 진행률 바 100%
- **진행중 상태**: 노란색 실선 테두리 + 펄스 애니메이션, 진행률 50%
- **예정 상태**: 회색 점선 테두리, 진행률 없음

---

## 전체 실습 순서

### Phase 1: 코드 → Figma (10분)

```
1. studio-card.html을 브라우저에서 열어 카드 확인
2. Figma에서 새 파일 생성 (이름: "Studio Cards")
3. Claude에게 요청:
   "studio-card.html의 완료 상태 카드를 이 Figma 파일에 올려줘"
4. Figma에서 생성된 카드 확인
5. 3종 카드를 모두 올리기:
   "나머지 진행중, 예정 카드도 옆에 나란히 올려줘"
```

### Phase 2: Figma에서 수정 (5분)

Figma에서 직접 수정해보세요:

```
수정 제안:
- 카드 패딩: 20px → 24px
- 배지 모양: 원형(999px) → 약간 둥근(8px)
- 진행중 색상: 노란색 → 파란색
- 설명 줄 수: 3줄 → 2줄
```

> 어떤 값이든 자유롭게 수정해보세요! 라운드트립의 핵심은 "무엇을 수정하든 코드에 반영할 수 있다"는 것입니다.

### Phase 3: 변경 감지 (3분)

```
Claude에게 요청:
"Figma의 Studio Cards 파일에서 카드를 읽어서
 studio-card.html과 달라진 점을 비교해줘"
```

Claude가 변경 사항을 표로 정리해줍니다.

### Phase 4: 코드 반영 (2분)

```
Claude에게 요청:
"변경 사항을 studio-card.html에 반영해줘"
```

---

## 예상 결과 (Figma 계정 없는 경우)

전체 과정의 예상 출력은 각 튜토리얼 스텝에서 확인할 수 있습니다:

| 단계 | 예상 출력 위치 |
|------|--------------|
| Figma에 올리기 | [Step 3: Code to Canvas](../../tutorial/step-03-code-to-canvas.md) |
| 변경 감지 & 반영 | [Step 4: 라운드트립](../../tutorial/step-04-round-trip.md) |

---

## 소스 코드 출처

이 실습의 카드 HTML/CSS는 다음 파일에서 추출했습니다:

| 원본 파일 | 추출 내용 |
|----------|----------|
| `studio/js/app.js` (renderCard 함수) | 카드 HTML 구조 |
| `studio/css/style.css` (362~536행) | 카드 CSS 스타일 |
| `studio/css/style.css` (9~42행) | CSS 변수 (라이트/다크) |

---

## 학습 포인트

이 실습을 통해 배우는 것:

1. **Code to Canvas**: HTML/CSS를 Figma 노드로 변환하는 과정
2. **디자인 읽기**: Figma에서 정확한 수치를 추출하는 방법
3. **변경 감지**: 코드와 디자인의 차이를 자동으로 분석
4. **라운드트립**: 수정 → 반영의 순환 워크플로우 체험

> 핵심 교훈: 디자이너와 개발자가 **같은 파일**을 보며 대화하면,
> "3px인가 4px인가?" 같은 커뮤니케이션 낭비가 사라집니다.
