<!-- auto-generated from workbook/rules/ — do not edit manually -->
# 보안 원칙 (security-001)

> Severity: error

- **개인정보**: 데이터 분류(Public~Restricted), PII 식별, 최소 수집, 보존 기간 정의
- **암호화**: 저장/전송 암호화 필수, 민감 데이터 필드 레벨 암호화, KMS 키 관리
- **접근 통제**: Need-to-Know, MFA 필수, 최소 권한(RBAC), Secret Manager 사용
- **시큐어 코딩**: OWASP Top 10, 입력 검증(Whitelist), 파라미터화 쿼리, XSS/CSRF 방지
- **프로세스**: 코드 리뷰에 보안 포함, 사고 대응 계획(IRP), 침투 테스트 연 1회+

> Source: workbook/rules/workflow/security.yaml
