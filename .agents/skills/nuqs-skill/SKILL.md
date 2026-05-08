---
name: nuqs-skill
description: nuqs를 사용한 URL 쿼리 파라미터 관리. useQueryStates 훅 패턴, 타입별 파서 규칙을 참조합니다.
globs: "**/*query-states*.ts", "**/*query-states*.tsx"
---

# nuqs Query States 스킬

이 스킬은 nuqs 라이브러리를 사용한 URL 쿼리 파라미터 관리 규칙을 포함합니다.

## 주요 영역

- **Query States 패턴**: [query-states-patterns.md](./query-states-patterns.md) - useQueryStates 훅, 파서 규칙

## 빠른 참조

### 파일 네이밍

`use-{페이지명}-page-query-states.tsx` 형식을 사용합니다.

```typescript
// src/app/(protected)/transactions/hooks/use-transaction-list-page-query-states.tsx
export const useTransactionListPageQueryStates = () => {
  return useQueryStates({
    customerId: parseAsString.withDefault(""),
    pageNo: parseAsInteger.withDefault(0),
    startDate: parseAsIsoDate,
    status: parseAsStringEnum<Status>(["ALL", ...Object.values(Status)]),
  });
};
```

### 구조 분해 규칙

**반드시 `queryStates`, `setQueryStates`로 구조 분해합니다.**

```typescript
// ✅ 좋은 예
const [queryStates, setQueryStates] = useTransactionListPageQueryStates();

// ❌ 나쁜 예
const [query, setQuery] = useTransactionListPageQueryStates();
```

자세한 내용은 [query-states-patterns.md](./query-states-patterns.md)를 참조하세요.
