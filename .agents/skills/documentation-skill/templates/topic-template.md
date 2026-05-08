# 토픽 특이사항 템플릿

예: `docs/domains/remittance/transfer/master-transfer-status.md`
예: `docs/domains/local-kr/kyc/force-kyc.md`
예: `docs/apps/dashboard/balance/topup.md`

```markdown
# [토픽명]

- [간단한 특이사항 1]
- [간단한 특이사항 2]

## [구체적 주제]

- [상세한 내용]

## TODO

- [ ] [확인 필요한 사항]
- [ ] [팀원 답변 대기 중인 사항]
```

## 작성 가이드

- **경로 (domains)**: `docs/domains/[service-name]/[domain]/[topic].md`
- **경로 (apps)**: `docs/apps/[app-name]/[feature]/[topic].md`
- **특이사항**: 제목 바로 아래에 섹션 없이 bulleted로 나열 (비직관적인 비즈니스 로직, API 응답 처리, 제약사항, 에러 케이스, 성능 주의사항 등)
- **구체적 주제**: 내용이 길거나 별도 설명이 필요한 경우 ## 섹션으로 추가
- **TODO**: 체크박스로 진행 상황 추적 (완료 시 체크 또는 섹션 제거)
