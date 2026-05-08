# QueryKeyFactory 패턴

## 기본 원칙

- **QueryKeyFactory는 React Query의 queryKey를 체계적으로 관리합니다.**
- 각 도메인별로 별도의 키 팩토리 파일을 생성합니다.
- 계층적 구조를 사용하여 invalidation을 효율적으로 수행합니다.
- **모든 값은 함수형으로 정의합니다.**
- **`all`은 객체의 맨 아래에 배치합니다.**
- **변수명은 `global{Domain}Keys` 형식을 사용합니다.** (예: `globalRemittanceKeys`)
- **API 그룹명은 컨트롤러 클래스 이름의 camelCase를 사용합니다.** (예: `balanceApi`, `getUserControllerApi`)

## QueryKeyFactory 구조

### 기본 구조

```typescript
// query-key-factory/remittance.ts
export const globalRemittanceKeys = {
  balanceApi: {
    all: () => [...globalRemittanceKeys.all(), "balance"] as const,
    detail: (id: string) =>
      [...globalRemittanceKeys.balanceApi.all(), "detail", id] as const,
    list: () => [...globalRemittanceKeys.balanceApi.all(), "list"] as const,
  },
  transferApi: {
    all: () => [...globalRemittanceKeys.all(), "transfer"] as const,
    detail: (id: string) =>
      [...globalRemittanceKeys.transferApi.all(), "detail", id] as const,
    list: (requestObj: TransferRequestModel) =>
      [
        ...globalRemittanceKeys.transferApi.all(),
        "list",
        { ...requestObj },
      ] as const,
    rejectReasons: (language?: string) =>
      [
        ...globalRemittanceKeys.transferApi.all(),
        "rejectReasons",
        language,
      ] as const,
  },
  webhookSubscriptionControllerApi: {
    all: () => [...globalRemittanceKeys.all(), "webhook"] as const,
    list: () =>
      [
        ...globalRemittanceKeys.webhookSubscriptionControllerApi.all(),
        "list",
      ] as const,
  },
  all: () => ["remittance"] as const, // ⚠️ 맨 아래에 위치
};
```

### API 컨트롤러별 그룹화 예시 (중첩 구조 포함)

중첩된 구조에서는 **부모의 `all()`을 스프레드**하여 계층적으로 확장합니다.

```typescript
// query-key-factory/integration-auth.ts
export const globalIntegrationAuthKeys = {
  getUserControllerApi: {
    meta: {
      // ✅ 부모(getUserControllerApi)의 all()을 스프레드
      all: () =>
        [
          ...globalIntegrationAuthKeys.getUserControllerApi.all(),
          "meta",
        ] as const,
      detail: (userUUID: string) =>
        [
          ...globalIntegrationAuthKeys.getUserControllerApi.meta.all(),
          "detail",
          userUUID,
        ] as const,
    },
    all: () =>
      [...globalIntegrationAuthKeys.all(), "getUserControllerApi"] as const,
    me: () =>
      [...globalIntegrationAuthKeys.getUserControllerApi.all(), "me"] as const,
  },
  partnerManagerApi: {
    all: () =>
      [...globalIntegrationAuthKeys.all(), "partnerManagerApi"] as const,
    list: (reqObj?: GetCorporationUserRequestModel) =>
      [
        ...globalIntegrationAuthKeys.partnerManagerApi.all(),
        "list",
        reqObj,
      ] as const,
  },
  all: () => ["integrationAuth"] as const, // ⚠️ 맨 아래에 위치
};
```

### 중첩 구조 키 생성 규칙

중첩된 객체의 `all()` 함수는 **부모의 `all()`**을 기준으로 확장합니다:

```typescript
// ✅ 올바른 중첩 구조
defaultApi: {
  country: {
    // country.all()은 defaultApi.all()을 스프레드
    all: () => [...globalMaKeys.defaultApi.all(), "country"] as const,
    list: () => [...globalMaKeys.defaultApi.country.all(), "list"] as const,
  },
  all: () => [...globalMaKeys.all(), "defaultApi"] as const,
},

// ❌ 잘못된 중첩 구조 (루트 all()에서 전체 경로를 나열)
defaultApi: {
  country: {
    all: () => [...globalMaKeys.all(), "defaultApi", "country"] as const, // 부모 all()을 활용하지 않음
  },
  all: () => [...globalMaKeys.all(), "defaultApi"] as const,
},
```

### 다른 도메인 예시

```typescript
// query-key-factory/settlement.ts
export const globalSettlementKeys = {
  partnerTxApi: {
    all: () => [...globalSettlementKeys.all(), "partnerTxApi"] as const,
    keyList: () =>
      [...globalSettlementKeys.partnerTxApi.all(), "keyList"] as const,
    typeList: () =>
      [...globalSettlementKeys.partnerTxApi.all(), "typeList"] as const,
  },
  settlementApi: {
    all: () => [...globalSettlementKeys.all(), "settlementApi"] as const,
  },
  all: () => ["settlement"] as const, // ⚠️ 맨 아래에 위치
};

// query-key-factory/user.ts
export const globalUserKeys = {
  adminApi: {
    all: () => [...globalUserKeys.all(), "adminApi"] as const,
    detail: (id: string) =>
      [...globalUserKeys.adminApi.all(), "detail", id] as const,
    list: (params?: ListParams) =>
      [...globalUserKeys.adminApi.all(), "list", params] as const,
  },
  all: () => ["user"] as const, // ⚠️ 맨 아래에 위치
};
```

## queryOptions / Hooks 디렉터리 구조 규칙

### 디렉터리 구조

- **읽기(GET)**: `apis/query-options/{category}/` 에서 `queryOptions`를 정의합니다. 카테고리는 `client.ts`와 일치합니다.
- **쓰기(mutation)**: `apis/hooks/{category}/` 에서 `useMutation` 훅을 정의합니다.

```typescript
// ✅ 좋은 예: queryOptions(읽기) + hooks(쓰기) 구조
apis/
  ├── query-options/
  │   ├── integration-auth/
  │   │   ├── me.ts           // globalGetMeQueryOptions 또는 globalMeQueryOptions
  │   │   └── user-list.ts
  │   ├── remittance/
  │   │   ├── balance-list.ts
  │   │   ├── transfer-list.ts
  │   │   └── transfer-detail.ts
  │   └── policy/
  │       └── validator.ts
  └── hooks/
      ├── integration-auth/
      │   ├── use-global-post-login.tsx
      │   └── use-global-patch-user.tsx
      └── remittance/
          └── use-global-put-transfer.ts
```

### 카테고리 매핑 규칙

| client.ts 카테고리 | queryOptions 디렉터리             | hooks 디렉터리 (mutation) | queryKeyFactory       |
| ------------------ | --------------------------------- | ------------------------- | --------------------- |
| `IntegrationAuth`  | `query-options/integration-auth/` | `integration-auth/`       | `integration-auth.ts` |
| `User`             | `query-options/user/`             | `user/`                   | `user.ts`             |
| `Remittance`       | `query-options/remittance/`       | `remittance/`             | `remittance.ts`       |
| `Policy`           | `query-options/policy/`           | `policy/`                 | `policy.ts`           |
| `Ma`               | `query-options/ma/`               | `ma/`                     | `ma.ts`               |
| `LocalKR`          | `query-options/local-kr/`         | `local-kr/`               | `local-kr.ts`         |

## QueryKeyFactory 연동 규칙

**queryOptions는 해당 카테고리의 queryKeyFactory를 사용해 `queryKey`를 지정합니다.**

- queryKeyFactory 파일은 `query-key-factory/{category}.ts` 형식으로 생성됩니다.
- queryOptions 디렉터리 구조는 query-key-factory/ client.ts 카테고리와 일치합니다.
- `queryOptions()` 반환 객체의 `queryKey`는 queryKeyFactory에서 가져온 키를 사용합니다.

```typescript
// ✅ 좋은 예: queryOptions에서 queryKeyFactory 연동
// apis/query-options/integration-auth/me.ts
import { queryOptions } from "@tanstack/react-query";
import { globalIntegrationAuthKeys } from "@/query-key-factory/integration-auth";
import { globalApiClient } from "@/apis/client";

export function globalGetMeQueryOptions() {
  return queryOptions({
    queryKey: globalIntegrationAuthKeys.getUserControllerApi.me(),
    queryFn: () => globalApiClient.IntegrationAuth.GetUserControllerApi.getMe(),
  });
}

// 사용처: useQuery(options)
const meQuery = useQuery(globalGetMeQueryOptions());

// ❌ 나쁜 예: 하드코딩된 queryKey
return queryOptions({
  queryKey: ["integrationAuth", "getUserControllerApi", "me"],
  queryFn: () => {
    /* ... */
  },
});
```

## 디렉터리 구조 예시

```
src/
├── apis/
│   ├── client.ts
│   ├── query-options/
│   │   ├── integration-auth/
│   │   │   ├── me.ts
│   │   │   └── user-list.ts
│   │   ├── remittance/
│   │   │   ├── transfer-list.ts
│   │   │   └── transfer-detail.ts
│   │   └── policy/
│   │       └── validator.ts
│   └── hooks/
│       ├── integration-auth/
│       │   └── use-global-post-login.tsx
│       └── remittance/
│           └── use-global-put-transfer.ts
└── query-key-factory/
    ├── integration-auth.ts
    ├── remittance.ts
    ├── policy.ts
    └── user.ts
```
