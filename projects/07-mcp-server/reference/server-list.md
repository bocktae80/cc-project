# 주요 MCP 서버 카탈로그 📚

> 앱 스토어의 인기 앱처럼, 자주 쓰이는 MCP 서버들을 모았습니다!

---

## MCP 서버 목록 🏪

### 1. 📂 파일시스템 서버

| 항목 | 내용 |
|------|------|
| **패키지** | `@anthropic/mcp-server-filesystem` |
| **하는 일** | 파일 읽기/쓰기/검색/이동 |
| **설치** | `claude mcp add fs -- npx -y @anthropic/mcp-server-filesystem /path` |
| **비유** | 파일 관리자 앱 📁 |

**주요 도구:**
- `read_file` — 파일 읽기
- `write_file` — 파일 쓰기
- `list_directory` — 폴더 목록
- `search_files` — 파일 검색
- `move_file` — 파일 이동/이름 변경

---

### 2. 🐙 GitHub 서버

| 항목 | 내용 |
|------|------|
| **패키지** | `@anthropic/mcp-server-github` |
| **하는 일** | 이슈, PR, 리포 관리 |
| **설치** | `claude mcp add github -e GITHUB_PERSONAL_ACCESS_TOKEN -- npx -y @anthropic/mcp-server-github` |
| **비유** | GitHub 앱 🐙 |

**주요 도구:**
- `search_repositories` — 리포 검색
- `list_issues` — 이슈 목록
- `create_issue` — 이슈 생성
- `create_pull_request` — PR 생성
- `get_file_contents` — 파일 내용 읽기

---

### 3. 💬 Slack 서버

| 항목 | 내용 |
|------|------|
| **패키지** | `@anthropic/mcp-server-slack` |
| **하는 일** | 메시지 보내기/읽기, 채널 관리 |
| **설치** | `claude mcp add slack -e SLACK_BOT_TOKEN -e SLACK_TEAM_ID -- npx -y @anthropic/mcp-server-slack` |
| **비유** | 카카오톡 같은 메신저 앱 💬 |

**주요 도구:**
- `send_message` — 메시지 보내기
- `list_channels` — 채널 목록
- `read_messages` — 메시지 읽기
- `search_messages` — 메시지 검색

---

### 4. 🧠 메모리 서버

| 항목 | 내용 |
|------|------|
| **패키지** | `@anthropic/mcp-server-memory` |
| **하는 일** | 정보를 영구적으로 기억 |
| **설치** | `claude mcp add memory -- npx -y @anthropic/mcp-server-memory` |
| **비유** | 메모장 앱 📝 |

**주요 도구:**
- `store` — 정보 저장
- `retrieve` — 정보 불러오기
- `search` — 정보 검색
- `delete` — 정보 삭제

> 💡 클로드는 대화가 끝나면 기억을 잃지만, 메모리 서버를 쓰면 **영구적으로** 기억할 수 있어요!

---

### 5. 🐘 PostgreSQL 서버

| 항목 | 내용 |
|------|------|
| **패키지** | `@anthropic/mcp-server-postgres` |
| **하는 일** | 데이터베이스 쿼리 실행 |
| **설치** | `claude mcp add postgres -- npx -y @anthropic/mcp-server-postgres postgresql://...` |
| **비유** | 엑셀(스프레드시트) 앱 📊 |

**주요 도구:**
- `query` — SQL 쿼리 실행
- `list_tables` — 테이블 목록
- `describe_table` — 테이블 구조 보기

---

### 6. 🌐 Fetch 서버

| 항목 | 내용 |
|------|------|
| **패키지** | `@anthropic/mcp-server-fetch` |
| **하는 일** | 웹 페이지 내용 가져오기 |
| **설치** | `claude mcp add fetch -- npx -y @anthropic/mcp-server-fetch` |
| **비유** | 웹 브라우저 앱 🌐 |

**주요 도구:**
- `fetch` — URL의 내용 가져오기

---

## 비교표 📊

| 서버 | 난이도 | 토큰 필요? | 추천 용도 |
|------|--------|-----------|-----------|
| 📂 파일시스템 | ⭐ | ❌ | 파일 관리 자동화 |
| 🐙 GitHub | ⭐⭐ | ✅ | 코드 리뷰, 이슈 관리 |
| 💬 Slack | ⭐⭐ | ✅ | 팀 커뮤니케이션 |
| 🧠 메모리 | ⭐ | ❌ | 정보 영구 저장 |
| 🐘 PostgreSQL | ⭐⭐⭐ | ✅ | 데이터 분석 |
| 🌐 Fetch | ⭐ | ❌ | 웹 정보 수집 |

---

## 더 많은 서버 찾기 🔍

MCP 서버는 누구나 만들 수 있어요! 커뮤니티에서 만든 서버들도 많습니다.

- **공식 서버**: Anthropic이 만든 검증된 서버들
- **커뮤니티 서버**: 개발자들이 만든 다양한 서버들

> ⚠️ **주의**: 커뮤니티 서버는 직접 코드를 확인하고 신뢰할 수 있는지 판단하세요!
