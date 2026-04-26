<!-- auto-generated from workbook/rules/ — do not edit manually -->
# 아키텍처 컨벤션 (architecture-convention-001)

> Severity: error

- **의존성 방향**: 상위 → 하위만 허용, 역방향 import 금지
- **순환 참조**: 모듈 간 순환 import 금지
- **모듈 경계**: 진입점은 index.ts만, 내부 구현 직접 import 금지
- **관심사 분리**: UI/비즈니스 로직/데이터 접근 혼재 금지

> Source: workbook/rules/conventions/architecture-convention.yaml
