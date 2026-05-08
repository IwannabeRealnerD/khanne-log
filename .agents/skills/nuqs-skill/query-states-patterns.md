# nuqs Query States 규칙

## 기본 원칙

- **nuqs의 `useQueryStates`를 사용하여 URL 쿼리 파라미터를 관리합니다.**
- 각 페이지별로 별도의 query states 훅을 생성합니다.
- 일관된 네이밍과 구조를 유지합니다.

## 파일 구조 규칙

### 파일 위치 및 이름

- **해당 페이지의 `hooks` 디렉터리에 생성합니다.**
- 파일명은 `use-{페이지명}-page-query-states.tsx` 형식을 사용합니다.
- 페이지명은 kebab-case로 작성합니다.

```typescript
// ✅ 좋은 예: 파일 위치 및 이름
// src/app/(protected)/transactions/hooks/use-transaction-list-page-query-states.tsx
// src/app/(protected)/fund/balances/hooks/use-balance-list-page-query-states.tsx
```

### 훅 이름 규칙

- **훅 이름은 `use{페이지명}PageQueryStates` 형식을 사용합니다.**
- 페이지명은 PascalCase로 작성합니다.

```typescript
// ✅ 좋은 예: 올바른 훅 이름
export const useTransactionListPageQueryStates = () => {
  // ...
};

export const useBalanceListPageQueryStates = () => {
  // ...
};

// ❌ 나쁜 예: 잘못된 훅 이름
export const useTransactionListQueryParams = () => {
  // ...
};

export const useTransactionListFilter = () => {
  // ...
};
```

## 기본 구조

### 훅 정의

- **`useQueryStates`를 반환하는 함수로 정의합니다.**
- `nuqs`에서 필요한 parser를 import하여 사용합니다.

```typescript
// ✅ 좋은 예: 올바른 훅 구조
import {
  parseAsInteger,
  parseAsIsoDate,
  parseAsString,
  parseAsStringEnum,
  useQueryStates,
} from "nuqs";

export const useTransactionListPageQueryStates = () => {
  return useQueryStates({
    customerTransferId: parseAsString.withDefault(""),
    pageNo: parseAsInteger.withDefault(0),
    startDate: parseAsIsoDate,
    endDate: parseAsIsoDate,
    status: parseAsStringEnum<Status>(["ALL", ...Object.values(Status)]),
  });
};
```

## 타입별 규칙

### String 타입

- **`parseAsString`을 사용할 때는 반드시 `withDefault("")`를 사용합니다.**
- string 타입의 기본값은 항상 빈 문자열(`""`)입니다.

```typescript
// ✅ 좋은 예: string 타입에 withDefault("") 사용
export const useTransactionListPageQueryStates = () => {
  return useQueryStates({
    customerId: parseAsString.withDefault(""),
    customerTransferId: parseAsString.withDefault(""),
    recipientFullName: parseAsString.withDefault(""),
    senderFullName: parseAsString.withDefault(""),
  });
};

// ❌ 나쁜 예: withDefault 없이 사용
export const useTransactionListPageQueryStates = () => {
  return useQueryStates({
    customerId: parseAsString, // withDefault("") 누락
  });
};

// ❌ 나쁜 예: 다른 기본값 사용
export const useTransactionListPageQueryStates = () => {
  return useQueryStates({
    customerId: parseAsString.withDefault("default"), // 빈 문자열이 아님
  });
};
```

### 다른 타입들

- **Integer, Date, Enum 등은 필요에 따라 적절한 기본값을 설정합니다.**

```typescript
// ✅ 좋은 예: 다른 타입들의 기본값 설정
export const useTransactionListPageQueryStates = () => {
  return useQueryStates({
    pageNo: parseAsInteger.withDefault(0),
    startDate: parseAsIsoDate, // 기본값 없음 (optional)
    endDate: parseAsIsoDate, // 기본값 없음 (optional)
    status: parseAsStringEnum<Status>(["ALL", ...Object.values(Status)]), // enum은 기본값 없음
  });
};
```

## 사용 규칙

### 구조 분해 할당

- **훅을 사용할 때는 반드시 `queryStates`, `setQueryStates`로 구조 분해합니다.**
- 다른 이름(`query`, `setQuery` 등)은 사용하지 않습니다.

```typescript
// ✅ 좋은 예: 올바른 구조 분해
"use client";
import { useTransactionListPageQueryStates } from "./hooks/use-transaction-list-page-query-states";

const TransactionListPage = () => {
  const [queryStates, setQueryStates] = useTransactionListPageQueryStates();

  return (
    <div>
      <input
        value={queryStates.customerId}
        onChange={(e) =>
          setQueryStates({ customerId: e.target.value })
        }
      />
    </div>
  );
};

// ❌ 나쁜 예: 잘못된 구조 분해 이름
const TransactionListPage = () => {
  const [query, setQuery] = useTransactionListPageQueryStates(); // queryStates, setQueryStates 사용해야 함
  // ...
};

// ❌ 나쁜 예: 다른 이름 사용
const TransactionListPage = () => {
  const [params, setParams] = useTransactionListPageQueryStates(); // queryStates, setQueryStates 사용해야 함
  // ...
};
```

### Client Component 사용

- **`useQueryStates`는 React Hook이므로 Client Component에서만 사용합니다.**
- `"use client"` 지시어를 반드시 추가합니다.

```typescript
// ✅ 좋은 예: Client Component에서 사용
"use client";
import { useTransactionListPageQueryStates } from "./hooks/use-transaction-list-page-query-states";

const TransactionListPage = () => {
  const [queryStates, setQueryStates] = useTransactionListPageQueryStates();
  // ...
};

// ❌ 나쁜 예: Server Component에서 사용
import { useTransactionListPageQueryStates } from "./hooks/use-transaction-list-page-query-states";

const TransactionListPage = () => {
  const [queryStates, setQueryStates] = useTransactionListPageQueryStates(); // Server Component에서는 Hook 사용 불가
  // ...
};
```

## 전체 예시

```typescript
// src/app/(protected)/transactions/hooks/use-transaction-list-page-query-states.tsx
import {
  parseAsInteger,
  parseAsIsoDate,
  parseAsString,
  parseAsStringEnum,
  useQueryStates,
} from "nuqs";

import { CustomerTransferStatus } from "@shared-openapi/generated/remittance/models/CustomerTransferStatus";

type ExtendedCustomerTransferStatus = CustomerTransferStatus | "ALL";

export const useTransactionListPageQueryStates = () => {
  return useQueryStates({
    customerId: parseAsString.withDefault(""),
    customerTransferId: parseAsString.withDefault(""),
    recipientFullName: parseAsString.withDefault(""),
    senderFullName: parseAsString.withDefault(""),
    pageNo: parseAsInteger.withDefault(0),
    startDate: parseAsIsoDate,
    endDate: parseAsIsoDate,
    status: parseAsStringEnum<ExtendedCustomerTransferStatus>([
      "ALL",
      ...Object.values(CustomerTransferStatus),
    ]),
  });
};
```

```typescript
// src/app/(protected)/transactions/page.tsx
"use client";
import { useTransactionListPageQueryStates } from "./hooks/use-transaction-list-page-query-states";

const TransactionListPage = () => {
  const [queryStates, setQueryStates] = useTransactionListPageQueryStates();

  return (
    <div>
      <input
        value={queryStates.customerId}
        onChange={(e) =>
          setQueryStates({ customerId: e.target.value })
        }
      />
      <input
        value={queryStates.customerTransferId}
        onChange={(e) =>
          setQueryStates({ customerTransferId: e.target.value })
        }
      />
    </div>
  );
};

export default TransactionListPage;
```
