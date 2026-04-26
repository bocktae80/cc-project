<!-- auto-generated from workbook/rules/ — do not edit manually -->
# DevOps/인프라 원칙 (devops-001)

> Severity: error

- **IaC**: 모든 인프라 코드로 정의, 수동 변경 금지, Drift Detection
- **CI/CD**: Lint→Test→Build→Deploy 파이프라인, 테스트 실패 시 배포 차단
- **컨테이너**: 최소 이미지, 멀티스테이지 빌드, non-root, immutable 태그
- **모니터링**: Metrics/Logs/Traces 3축, SLI/SLO, 구조화 로그(JSON)
- **장애 대응**: Runbook 사전 작성, 먼저 복구 후 원인 분석, Postmortem 문화

> Source: workbook/rules/workflow/devops.yaml
