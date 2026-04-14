# 27 — 프롬프트 캐싱 TTL 제어

> 난이도: ⭐⭐ (v2.1.108 신규)

Claude Code 세션 비용의 **절반 이상**은 프롬프트 캐시 히트율에서 결정돼요. v2.1.108부터 **캐시 TTL을 1시간까지 늘릴 수 있는 환경 변수**가 추가됐습니다. 장시간 작업·리뷰·리서치 세션에서 특히 효과가 큽니다.

## 이런 상황에서 유용해요

- 한 세션에서 **30분 이상** 작업하는 경우 (캐시 만료 방지)
- Bedrock / Vertex / Foundry 등 **API 기반 세션**
- 같은 저장소를 **반복 탐색**하는 리뷰/리서치
- 점심·미팅 등으로 **세션이 중단됐다 재개**되는 패턴

## 핵심 환경 변수

| 변수 | 효과 | 지원 백엔드 |
|------|------|-------------|
| `ENABLE_PROMPT_CACHING_1H` | 캐시 TTL을 **1시간**으로 확장 | API key, Bedrock, Vertex, Foundry |
| `FORCE_PROMPT_CACHING_5M` | 1시간 TTL 비활성화, **5분 강제** | 전체 |
| ~~`ENABLE_PROMPT_CACHING_1H_BEDROCK`~~ | deprecated (하위 호환만 유지) | Bedrock |

## 빠른 시작

```bash
# 1시간 TTL 활성화 (장시간 세션용)
export ENABLE_PROMPT_CACHING_1H=1
claude

# 5분으로 되돌리기 (비용 절감 우선)
unset ENABLE_PROMPT_CACHING_1H
# 또는
export FORCE_PROMPT_CACHING_5M=1
```

## 캐시 TTL 선택 가이드

| 세션 패턴 | 추천 TTL | 이유 |
|----------|---------|------|
| 10분 이내 단발 작업 | 5분 | 1시간은 오버헤드 |
| 30분~2시간 연속 작업 | **1시간** | 캐시 미스 비용 회피 |
| 점심·회의로 중단되는 작업 | **1시간** | 재개 시 캐시 재사용 |
| 병렬 세션 여러 개 | 5분 | 개별 세션이 짧으면 5분이 저렴 |

## 주의사항

- `DISABLE_TELEMETRY` 설정 시 1시간 TTL이 **5분으로 폴백**되던 버그가 v2.1.108에서 수정됐어요
- 프롬프트 캐싱이 **비활성화**된 상태로 실행하면 시작 시 경고가 표시됩니다 (`DISABLE_PROMPT_CACHING*`)
- `/model`로 모델 전환 시 다음 응답은 **캐시 미스** — 모델 전환 전에 경고가 표시됩니다

## 참고

- v2.1.108 릴리스 노트: 환경 변수 네이밍 단순화
- 스튜디오 튜토리얼: `studio/data/content/content-27.js`
