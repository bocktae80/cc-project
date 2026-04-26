<!-- auto-generated from workbook/rules/ — do not edit manually -->
# 코드 컨벤션 (code-convention-001)

> Severity: error

- **네이밍**: PascalCase(인터페이스/클래스/타입/컴포넌트), camelCase(함수/변수), UPPER_SNAKE_CASE(상수), kebab-case(파일명)
- **Import**: Node builtin → 외부 패키지 → 내부 모듈 → 상대 경로 (그룹 간 빈 줄)
- **타입 안전**: `any` 금지(`unknown` 사용), 함수 반환 타입 명시, strict mode
- **제한**: 파일 600줄·함수 50줄 이내, 빈 catch 금지, 에러 무시 시 주석 필수

> Source: workbook/rules/conventions/code-convention.yaml
