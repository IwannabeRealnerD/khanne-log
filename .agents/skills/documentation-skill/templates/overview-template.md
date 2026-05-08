# 도메인/기능 개요 템플릿 (\_overview.md)

예: `docs/domains/remittance/transfer/_overview.md`
예: `docs/domains/local-kr/kyc/_overview.md`
예: `docs/apps/dashboard/balance/_overview.md`

```markdown
# [도메인/기능명] 개요

- [전체에 해당하는 특이사항 1]
- [전체에 해당하는 특이사항 2]

## 세부 문서

- [topic-a](./topic-a.md) - 주제 A 관련
- [topic-b](./topic-b.md) - 주제 B 관련
```

## 작성 가이드

- **경로 (domains)**: `docs/domains/[service-name]/[domain]/_overview.md`
- **경로 (apps)**: `docs/apps/[app-name]/[feature]/_overview.md`
- **역할**: 해당 도메인/기능의 인덱스 페이지 역할 (개요 + 세부 문서 링크)
- **개요**: 전체에 걸쳐 적용되는 특이사항, 비즈니스 로직, 주의사항을 bulleted로 나열
- **세부 문서**: 해당 디렉토리 내 토픽 문서들의 링크 목록 (`./[topic].md` 상대경로 사용)
- 다른 서비스/앱의 관련 문서도 링크 가능 (상대경로 사용)
