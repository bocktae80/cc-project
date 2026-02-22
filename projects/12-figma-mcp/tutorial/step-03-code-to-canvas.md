# Step 3: Code to Canvas — 코드를 Figma로 보내기

> HTML/CSS 코드를 Figma 캔버스에 렌더링하는 **Code to Canvas** 기능을 배워봅시다

---

## Code to Canvas란?

지금까지 디자인 → 코드 방향은 많이 해봤을 거예요. **Code to Canvas**는 그 반대입니다:

```
기존 방식:    Figma 디자인 ──→ 코드 (한 방향)
Code to Canvas: 코드 ──→ Figma 캔버스 (역방향!)
```

왜 필요할까요?

```
시나리오: 개발자가 카드 컴포넌트를 코딩했어요
─────────────────────────────────────────────
❌ 기존: 스크린샷 찍어서 디자이너에게 "이렇게 됐는데 맞아?"
✅ Code to Canvas: 코드를 Figma에 바로 올려서 디자인과 나란히 비교!
```

---

## 실습 준비: Studio 카드 컴포넌트

이 실습에서는 cc-project의 학습 스튜디오 카드를 사용합니다.

[`examples/studio-card-to-figma/studio-card.html`](../examples/studio-card-to-figma/studio-card.html)을 먼저 브라우저에서 열어 카드 3종을 확인하세요:
- **완료 상태**: 초록색 테두리, 진행률 100%
- **진행중 상태**: 노란색 테두리 + 펄스 애니메이션
- **예정 상태**: 점선 테두리, 투명도 75%

---

## Code to Canvas 실행하기

### 1. Figma 파일 준비

Figma에서 새 파일을 만들거나 기존 파일을 열어주세요.

### 2. Claude에게 요청

```
> studio-card.html의 "완료 상태" 카드를 Figma 캔버스에 렌더링해줘.
> Figma 파일: https://www.figma.com/design/YOUR_FILE_KEY/Studio-Cards
```

### 3. Claude의 동작

Claude는 다음 과정을 자동으로 수행합니다:

```
1. studio-card.html 파일 읽기
2. "완료 상태" 카드의 HTML/CSS 추출
3. Figma API를 통해 캔버스에 노드 생성
   - Rectangle: 카드 배경 (320×auto, #FFFFFF, border-radius 12px)
   - Text: 제목, 부제목, 설명
   - Badge: 상태 배지 (pill shape)
   - Tags: 개념 태그들
4. Figma 캔버스에 렌더링 완료!
```

### 예상 응답

```
✅ Figma 캔버스에 카드를 생성했습니다!

생성된 노드:
├── Frame "Studio Card - Completed" (320×280)
│   ├── Badge "완료" (#10B981 on #ECFDF5)
│   ├── Number "#02"
│   ├── Title "파일 읽기/쓰기" (17.6px, Bold)
│   ├── Subtitle "파일을 자유자재로 다루기" (13.6px)
│   ├── Difficulty "⭐"
│   ├── Description (13.6px, #475569)
│   ├── Tags: [Read] [Write] [Edit] [파일 조작]
│   └── Progress Bar (100%, #10B981)

Figma에서 확인해보세요!
```

---

## 세 가지 상태 모두 보내기

```
> studio-card.html의 카드 3종(완료, 진행중, 예정)을 모두 Figma에 나란히 배치해줘.
> 간격은 20px로.
```

### 예상 결과 (Figma에서)

```
┌──────────────┐  ┌──────────────┐  ┌ ─ ─ ─ ─ ─ ─ ┐
│ ✅ 완료       │  │ 🔄 진행중     │  │ ⏳ 예정       │
│              │  │              │  │              │
│ 파일 읽기/쓰기 │  │ Figma MCP    │  │ Agent SDK    │
│ ⭐           │  │ ⭐⭐⭐       │  │ ⭐⭐⭐       │
│              │  │              │  │              │
│ ████████ 3/3 │  │ ████░░░░ 2/4 │  │              │
│ 학습 시작 📚  │  │ 학습 시작 📚  │  │              │
└──────────────┘  └──────────────┘  └ ─ ─ ─ ─ ─ ─ ┘
   20px 간격          20px 간격
```

---

## Code to Canvas의 한계

모든 것이 완벽하진 않아요. 알아두면 좋은 점들:

| 항목 | 지원 | 미지원/제한 |
|------|------|-----------|
| 기본 레이아웃 | 블록, 플렉스 | 복잡한 그리드 |
| 색상 | 단색, 그라데이션 | 복잡한 블렌딩 모드 |
| 텍스트 | 폰트, 크기, 굵기 | 커스텀 웹폰트 |
| 테두리 | 단색, 둥근 모서리 | 개별 모서리 다른 값 |
| 애니메이션 | - | CSS 애니메이션 전체 |
| 반응형 | 고정 크기로 렌더 | 미디어 쿼리 |

> 핵심은 **시각적 비교 도구**라는 것. 100% 픽셀 퍼펙트가 목적이 아니라,
> 디자이너와 개발자가 **빠르게 소통**하기 위한 도구입니다.

---

## 다음 단계

- [Step 4: 라운드트립 워크플로우](./step-04-round-trip.md) — 수정하고 다시 동기화하기
