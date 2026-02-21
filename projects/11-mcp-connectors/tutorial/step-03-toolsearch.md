# Step 3: ToolSearch로 도구 찾기

> 커넥터가 제공하는 도구를 검색하고, 필요한 것만 꺼내 쓰는 방법!

---

## Deferred Tools(지연 로딩 도구)란?

커넥터가 제공하는 도구는 **처음부터 전부 로딩되지 않습니다.**
"필요할 때" 로딩됩니다. 이걸 **Deferred Tools(지연 로딩 도구)** 라고 해요.

### 왜 지연 로딩?

학교 도서관을 생각해보세요.

```
도서관에 책이 10,000권 있다고 합시다.

(나쁜 방법) 등교할 때 10,000권을 전부 가방에 넣고 다닌다
           → 가방이 터짐! 걸을 수도 없음!

(좋은 방법) 필요한 책만 도서관에서 빌려온다
           → 수학 시간에는 수학책만, 국어 시간에는 국어책만!
```

Claude Code도 마찬가지입니다:

```
Slack 커넥터 도구: 약 10개
Notion 커넥터 도구: 약 10개
기타 커넥터: ...
──────────────────────
총 도구 수: 50개 이상이 될 수도 있음!

전부 로딩하면? → 느려짐, 메모리 낭비
필요한 것만?   → 빠르고 효율적!
```

---

## ToolSearch 사용법

ToolSearch는 **도서관의 검색 컴퓨터**와 같아요.
책(도구)을 찾기 위해 키워드를 입력하면, 관련 책(도구)을 알려줍니다.

### 방법 1: 키워드 검색

"이런 기능의 도구가 있을까?" 할 때 사용합니다.

```
사용자: "Slack 관련 도구 찾아줘"
```

클로드가 내부적으로 하는 일:

```
ToolSearch 호출:
  query: "slack"

결과:
  1. mcp__claude_ai_Slack__slack_read_channel     — 채널 읽기
  2. mcp__claude_ai_Slack__slack_send_message      — 메시지 보내기
  3. mcp__claude_ai_Slack__slack_search_public      — 공개 메시지 검색
  4. mcp__claude_ai_Slack__slack_search_channels    — 채널 검색
  5. mcp__claude_ai_Slack__slack_search_users       — 사용자 검색
```

> 키워드 검색은 최대 5개 결과를 반환하고, **반환된 도구는 바로 사용 가능**합니다.

### 방법 2: 직접 선택 (select:)

도구 이름을 이미 알고 있을 때 사용합니다.

```
정확한 도구 이름을 알 때:
  ToolSearch: "select:mcp__claude_ai_Slack__slack_read_channel"

결과:
  slack_read_channel 도구가 로딩됨 → 바로 사용 가능!
```

### 두 방법 비교

| 방법 | 사용 상황 | 예시 |
|------|----------|------|
| 키워드 검색 | "어떤 도구가 있는지 모를 때" | `"slack"`, `"notion search"` |
| 직접 선택 | "정확한 도구 이름을 알 때" | `"select:slack_read_channel"` |

---

## 실습: 도구 찾기부터 사용까지

### Slack 도구 찾아서 사용하기

```
사용자: "Slack 채널 목록을 보고 싶어"
```

클로드의 동작 과정:

```
1단계: ToolSearch
   → query: "slack channel"
   → 결과: slack_search_channels, slack_read_channel 등 발견

2단계: 도구 선택
   → slack_search_channels가 적합하다고 판단

3단계: 도구 호출
   → slack_search_channels 실행

4단계: 결과 전달
   → "채널 목록입니다: #general, #dev, #random, ..."
```

### Notion 도구 찾아서 사용하기

```
사용자: "Notion에서 '회의록' 페이지 찾아줘"
```

```
1단계: ToolSearch
   → query: "notion search"
   → 결과: notion-search, notion-fetch 등 발견

2단계: 도구 선택
   → notion-search가 적합하다고 판단

3단계: 도구 호출
   → notion-search(query: "회의록")

4단계: 결과 전달
   → "검색 결과: '주간 회의록', '팀 회의록 템플릿', ..."
```

---

## 사용 가능한 주요 도구 목록

### Slack 커넥터 도구

| 도구 이름 | 기능 | 사용 예 |
|-----------|------|---------|
| `slack_read_channel` | 채널 메시지 읽기 | "#general 메시지 보여줘" |
| `slack_send_message` | 메시지 보내기 | "#dev에 메시지 보내줘" |
| `slack_search_public` | 공개 메시지 검색 | "'배포' 관련 메시지 찾아줘" |
| `slack_search_channels` | 채널 검색 | "dev 관련 채널 찾아줘" |
| `slack_search_users` | 사용자 검색 | "김철수 프로필 찾아줘" |
| `slack_read_thread` | 스레드 읽기 | "그 메시지의 답글 보여줘" |
| `slack_read_user_profile` | 사용자 프로필 보기 | "이 사람 프로필 보여줘" |
| `slack_create_canvas` | 캔버스 만들기 | "Slack 캔버스 만들어줘" |
| `slack_read_canvas` | 캔버스 읽기 | "이 캔버스 내용 보여줘" |

### Notion 커넥터 도구

| 도구 이름 | 기능 | 사용 예 |
|-----------|------|---------|
| `notion-search` | 페이지/DB 검색 | "'프로젝트' 페이지 찾아줘" |
| `notion-fetch` | 페이지 내용 읽기 | "이 페이지 내용 보여줘" |
| `notion-create-pages` | 페이지 만들기 | "새 페이지 만들어줘" |
| `notion-create-comment` | 댓글 달기 | "이 페이지에 댓글 달아줘" |
| `notion-create-database` | 데이터베이스 만들기 | "새 DB 만들어줘" |
| `notion-update-page` | 페이지 수정 | "이 페이지 수정해줘" |
| `notion-get-comments` | 댓글 보기 | "이 페이지 댓글 보여줘" |
| `notion-get-users` | 사용자 보기 | "워크스페이스 멤버 보여줘" |

---

## ToolSearch 핵심 패턴

### 패턴 1: 키워드로 탐색 후 사용

가장 흔한 패턴입니다. 도구를 몰라도 자연어로 요청하면 됩니다.

```
사용자: "Slack에서 최근 메시지 검색해줘"
        ↓
클로드: ToolSearch("slack search") → 도구 발견 → 도구 호출 → 결과 전달
```

### 패턴 2: 필수 키워드로 범위 좁히기

ToolSearch에서 `+` 접두어를 사용하면 특정 서비스의 도구만 검색합니다.

```
"+slack send"     → Slack 도구 중 "send" 관련만
"+notion search"  → Notion 도구 중 "search" 관련만
```

### 패턴 3: 한 번 찾으면 재검색 불필요

키워드 검색으로 도구를 찾으면, **그 도구는 이미 로딩된 상태**입니다.
같은 도구를 다시 ToolSearch할 필요 없어요.

```
(올바른 방법)
1. ToolSearch("slack") → slack_read_channel 발견 (로딩됨)
2. slack_read_channel 바로 사용

(불필요한 방법)
1. ToolSearch("slack") → slack_read_channel 발견
2. ToolSearch("select:slack_read_channel") → 이미 로딩됨! 중복!
```

---

## 핵심 정리

```
Deferred Tools = 필요할 때만 로딩되는 도구 (도서관에서 책 빌리기)
ToolSearch = 도구를 찾는 검색 기능 (도서관 검색 컴퓨터)
키워드 검색 = 어떤 도구가 있는지 탐색 ("slack", "notion")
직접 선택 = 정확한 이름을 알 때 ("select:도구이름")
한 번 찾으면 바로 사용 가능 (재검색 불필요)
```

> 실습으로 넘어가기: [Slack 커넥터 실습](../examples/slack-connector/) | [Notion 커넥터 실습](../examples/notion-connector/)
