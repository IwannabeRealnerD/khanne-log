---
name: api-layer-skill
description: API 레이어 통합 스킬. API 클라이언트 구조, QueryKey 팩토리, queryOptions 패턴, TanStack Query 훅 규칙을 참조합니다.
globs:
  - "**/apis/client.ts"
  - "**/query-key-factory/**/*.ts"
  - "**/apis/query-options/**/*.ts"
  - "**/apis/hooks/**/*.ts"
  - "**/apis/hooks/**/*.tsx"
---

# API Layer 스킬

이 스킬은 API 호출과 관련된 모든 규칙을 포함합니다.

## 주요 영역

- **API 클라이언트 구조**: [api-client-structure.md](./api-client-structure.md) - 카테고리별 그룹화, 엔드포인트 매핑
- **QueryKey 팩토리**: [query-key-factory.md](./query-key-factory.md) - 키 팩토리 구조, 디렉토리 구조
- **queryOptions & TanStack Query**: [query-hooks-patterns.md](./query-hooks-patterns.md) - queryOptions 패턴, useQuery/useMutation, Query Invalidation

## 빠른 참조

### 1. API 클라이언트 구조

API는 엔드포인트 경로의 첫 번째 세그먼트(서비스명)를 기준으로 카테고리별 객체로 그룹화합니다.

```typescript
// ✅ 좋은 예
const apiClient = {
  IntegrationAuth: {
    AuthApi: new AuthApi(configuration),
    EmailLoginUserApi: new EmailLoginUserApi(configuration),
    GetUserControllerApi: new GetUserControllerApi(configuration),
    PartnerManagerApi: new PartnerManagerApi(configuration),
  },
  Policy: { SourceRoutingV3Api: new SourceRoutingV3Api(configuration) },
  Remittance: { BalanceApi: new DashboardBalanceApi(configuration) },
};

// ❌ 나쁜 예: 최상위 레벨에 단독 배치
const apiClient = {
  AuthApi: new AuthApi(configuration), // IntegrationAuth 카테고리로 그룹화해야 함
};
```

### 2. QueryKeyFactory 구조

- **모든 값은 함수형으로 정의합니다.**
- **`all`은 객체의 맨 아래에 배치합니다.**
- **변수명은 `global{Domain}Keys` 형식을 사용합니다.**
- **API 그룹명은 컨트롤러 클래스 이름의 camelCase를 사용합니다.**
- **중첩 구조에서는 부모의 `all()`을 스프레드합니다.**
- **페이지 진입 시 초기값이 `undefined`인 파라미터는 optional(`?`)로 선언합니다.** (예: URL 파라미터, 다른 쿼리 결과에 의존하는 값 등 나중에 채워지는 값)

```typescript
// query-key-factory/remittance.ts
export const globalRemittanceKeys = {
  transferApi: {
    all: () => [...globalRemittanceKeys.all(), "transfer"] as const,
    list: (params?: ListParams) =>
      [...globalRemittanceKeys.transferApi.all(), "list", params] as const,
    // ✅ 좋은 예: 페이지 진입 시 undefined → 이후 채워지는 값은 optional
    detail: (id?: string) =>
      [...globalRemittanceKeys.transferApi.all(), "detail", id] as const,
    // ❌ 나쁜 예: 초기값이 undefined인데 required로 선언
    // detail: (id: string) => [...]
  },
  all: () => ["remittance"] as const, // ⚠️ 맨 아래에 위치
};
```

### 3. 훅 파일 네이밍

`use-{http-method}-{resource-name}` 형식을 사용합니다.

```typescript
use - post - login.tsx; // POST /integration-auth/tokens/access-tokens
use - get - inquiry - detail.tsx; // GET /remittance/inquiries/{id}
use - patch - webhook - subscription.tsx; // PATCH /remittance/webhooks/{id}
```

### 4. Query Invalidation

**`invalidateQueries`를 사용할 때는 해당 컨트롤러(API)의 `all()` 키를 사용합니다.**

```typescript
// ✅ 좋은 예
onSuccess: () => {
  queryClient.invalidateQueries({
    queryKey: globalRemittanceKeys.transferApi.all(),
  });
};

// ❌ 나쁜 예: 특정 queryKey만 invalidate
onSuccess: () => {
  queryClient.invalidateQueries({
    queryKey: globalRemittanceKeys.transferApi.detail(id), // 다른 쿼리들이 stale 상태로 남음
  });
};
```

### 5. useMutation 패턴 (쓰기)

- **훅 함수는 파라미터를 받지 않는다.** 모든 파라미터는 `mutationFn`의 인자로 전달한다.
- **`useMutation` 제네릭을 명시하지 않는다.** (타입 자동 추론)
- **`onSuccess`는 훅에서 정의하지 않고, 사용처에서 처리한다.**
- 파라미터가 2개 이상이면 Request interface로 묶는다.

```typescript
// ✅ 파라미터 1개: OpenAPI 타입 직접 사용
export const useGlobalPatchUser = () => {
  return useMutation({
    mutationFn: (data: UpdateUserRequest) => {
      return globalApiClient.IntegrationAuth.GetUserControllerApi.updateUser(
        data,
      );
    },
  });
};

// ✅ 파라미터 2개 이상: Request interface로 묶기
interface PostReRequestVendorTransferRequest {
  customerTransferId: string;
  req: AdminVendorTransferChangePartnerRequestModel;
}

export const useGlobalPostReRequestVendorTransfer = () => {
  return useMutation({
    mutationFn: (req: PostReRequestVendorTransferRequest) => {
      return globalApiClient.Remittance.AdminTransferMasterApi.vendorTransferReRequestWithChangePartner(
        req.customerTransferId,
        req.req,
      );
    },
  });
};

// ❌ 나쁜 예: 훅 함수에 파라미터를 받음, 불필요한 제네릭 명시
export const useGlobalPostSomething = (id: string | undefined) => {
  return useMutation<void, CustomResponseError, SomeRequest>({
    mutationFn: (data) => {
      sharedAssertNonNull(id);
      return globalApiClient.Remittance.SomeApi.doSomething(id, data);
    },
  });
};
```

### 6. queryOptions 패턴 (GET/읽기)

서버 상태 조회는 **queryOptions**로 정의하고, 사용처에서 `useQuery(options)`로 호출합니다. queryKey는 queryKeyFactory에서 가져옵니다.

```typescript
// apis/query-options/ma/remit-detail.ts
export function globalRemitDetailQueryOptions(remitId: number | undefined) {
  return queryOptions({
    enabled: Boolean(remitId),
    queryKey: globalMaKeys.remitApi.detail(remitId),
    queryFn: () => {
      sharedAssertNonNull(remitId);
      return globalApiClient.Ma.RemitApi.getRemit(remitId);
    },
  });
}

// 사용처
const remitQuery = useQuery(globalRemitDetailQueryOptions(remitId));
```

### 7. 디렉토리 구조 매핑

| client.ts 카테고리 | queryOptions 디렉토리             | hooks 디렉토리 (mutation) | queryKeyFactory       |
| ------------------ | --------------------------------- | ------------------------- | --------------------- |
| `IntegrationAuth`  | `query-options/integration-auth/` | `integration-auth/`       | `integration-auth.ts` |
| `Remittance`       | `query-options/remittance/`       | `remittance/`             | `remittance.ts`       |
| `Policy`           | `query-options/policy/`           | `policy/`                 | `policy.ts`           |
| `Ma`               | `query-options/ma/`               | `ma/`                     | `ma.ts`               |

자세한 내용은 각 문서를 참조하세요.
