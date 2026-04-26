<!-- auto-generated from workbook/rules/ — do not edit manually -->
# 마일스톤 관리 원칙 (milestone-management-001)

> Severity: warning

- **신규 작업 감지**: 기존 마일스톤에 없는 새 모듈/기능 작업 시작 시 마일스톤 추가 제안
- **분기 감지**: 진행 중 스코프가 확장되거나 새 서브시스템이 생기면 마일스톤 분리 제안
- **기록 필수**: 마일스톤 없이 코드 작성 시작 금지 — 최소 항목명 + 상태 테이블
- **넘버링**: M{N} (메인), M{N}.{x} (서브). 예: M8, M6.2
- **버전 연결**: 메인 마일스톤 완료 → minor +1, 서브 마일스톤 → patch +1, breaking → major +1
- **완료 배포**: 마일스톤 완료 → 설계문서 + TECHNICAL.md + USER-GUIDE.md 업데이트 → 커밋 → 푸시 → 플러그인 업데이트

> Source: workbook/rules/workflow/milestone-management.yaml
