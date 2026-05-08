# TanStack Query 훅 패턴

## queryOptions 패턴 (읽기 / GET)

서버 상태 **조회**는 `queryOptions`로 정의하고, 사용처에서 `useQuery(options)`로 호출합니다.

- **위치**: `apis/query-options/{category}/` (파일명 예: `me.ts`, `remit-detail.ts`)
- **export 네이밍**: `global{Resource}QueryOptions` (예: `globalGetMeQueryOptions`, `globalRemitDetailQueryOptions`)
- **queryKey**: 해당 카테고리의 queryKeyFactory 사용 (예: `globalMaKeys.remitApi.detail(remitId)`)

```typescript
// apis/query-options/ma/remit-detail.ts
import { queryOptions } from "@tanstack/react-query";
import { sharedAssertNonNull } from "@shared-utils/assert";
import { globalApiClient } from "@/apis/client";
import { globalMaKeys } from "@/query-key-factory/ma";

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

파라미터가 optional인 경우 `enabled: Boolean(param)`으로 조건부 실행하고, `queryFn` 내부에서 `sharedAssertNonNull(param)`으로 타입 가드합니다.

## Mutation 훅 파일 네이밍 규칙

**Mutation 훅 파일 이름은 `use-{http-method}-{resource-name}` 형식을 따릅니다.** (쓰기 전용)

- `use`: React Hook 접두사
- `{http-method}`: HTTP 메서드 (post, put, patch, delete)
- `{resource-name}`: 리소스 이름 (kebab-case)

```plaintext
// ✅ 좋은 예: mutation 훅 파일 네이밍
use-post-login.tsx;
use-patch-webhook-subscription.tsx;
use-put-transfer.ts;

// ❌ 나쁜 예
use-login.tsx; // HttpMethod 누락
use-global-post.tsx; // ResourceName 누락
```

## 타입 자동 추론

각 앱의 `tanstack-query.d.ts`에서 전역 에러 타입(`CustomResponseError`)이 등록되어 있고, OpenAPI 클라이언트가 반환 타입을 제공하므로 **필요하지 않은 이상 제네릭을 명시하지 않습니다.**

```typescript
// ❌ 불필요한 제네릭 명시
const meQuery = useQuery<GetMeResponse, CustomResponseError>({ ... });

// ✅ 권장: queryOptions + 타입 자동 추론
const meQuery = useQuery(globalGetMeQueryOptions());
// meQuery.data: GetMeResponse, meQuery.error: CustomResponseError | null
```

### 훅 반환값 네이밍

사용처에서 구조분해할당 대신 반환값 전체를 변수에 할당합니다.

```typescript
// ✅ 권장
const meQuery = useQuery(globalGetMeQueryOptions()); // useQuery → ~~Query
const loginMutation = usePostLogin(); // useMutation → ~~Mutation

// ❌ 비권장
const { data, error, isLoading } = useQuery(globalGetMeQueryOptions());
```

## Hook에서의 API 사용

### IntegrationAuth 카테고리 예시

```typescript
// ✅ 좋은 예: 카테고리 구조에 맞게 사용
import { globalApiClient } from "@/apis/client";

export const useGlobalPostLogin = () => {
  return useMutation({
    mutationFn: (request) => {
      return globalApiClient.IntegrationAuth.AuthApi.createAccessToken({
        clientId: "moin-platform-dashboard-client",
        password: request.password,
        userName: request.userName,
      });
    },
  });
};

// ❌ 나쁜 예: 최상위 레벨에서 직접 접근 (구조 변경 시 에러 발생)
export const useGlobalPostLogin = () => {
  return useMutation({
    mutationFn: (request) => {
      return globalApiClient.AuthApi.createAccessToken(request); // 구조 변경 시 에러
    },
  });
};
```

### Auth 카테고리 예시

```typescript
// ✅ 좋은 예: 카테고리 구조에 맞게 사용
import { globalApiClient } from "@/apis/client";

const useGlobalPostLogin = () => {
  return useMutation({
    mutationFn: (request) => {
      return globalApiClient.Auth.TokenApi.postAccessToken(request);
    },
  });
};
```

## Query Invalidation 규칙

### 기본 원칙

**`invalidateQueries`를 사용할 때는 해당 컨트롤러(API)의 `all()` 키를 사용해야 합니다.**

- 컨트롤러 레벨의 `all()` 키를 사용하여 해당 컨트롤러의 모든 쿼리를 invalidate합니다.
- 서비스 레벨의 `all()` 키가 존재하는 경우, 서비스 레벨의 `all()`도 함께 invalidate합니다.
- **모든 queryKey는 함수 호출 형태로 사용합니다.** (`all` → `all()`)

### 사용 예시

```typescript
// ✅ 좋은 예: 컨트롤러 레벨의 all() 사용 (사용처에서 onSuccess 처리)
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { globalRemittanceKeys } from "@/query-key-factory/remittance";
import { globalApiClient } from "@/apis/client";

// 훅 정의 (onSuccess 없이)
export const useGlobalPutTransfer = () => {
  return useMutation({
    mutationFn: (data) => {
      return globalApiClient.Remittance.TransferApi.updateTransfer(data);
    },
  });
};

// 사용처에서 invalidation 처리
const queryClient = useQueryClient();
const { mutate } = useGlobalPutTransfer();

mutate(data, {
  onSuccess: () => {
    queryClient.invalidateQueries({
      queryKey: globalRemittanceKeys.transferApi.all(),
    });
  },
});

// ❌ 나쁜 예: 특정 queryKey만 invalidate
mutate(data, {
  onSuccess: () => {
    // ❌ 특정 detail만 invalidate하면 다른 쿼리들이 stale 상태로 남을 수 있음
    queryClient.invalidateQueries({
      queryKey: globalRemittanceKeys.transferApi.detail(customerTransferId),
    });
  },
});
```

## queryOptions 상세 (조건부 쿼리)

조건부 실행과 타입 가드는 queryOptions 내부에 정의합니다.

```typescript
// 조건부 + sharedAssertNonNull
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
```

## useMutation 패턴

### 핵심 규칙

1. **훅 함수는 파라미터를 받지 않는다.** API 호출에 필요한 모든 파라미터는 `mutationFn`의 인자(Request 타입)로 전달한다.
2. **`useMutation` 제네릭을 명시하지 않는다.** (타입 자동 추론 규칙과 동일)
3. **훅에서는 `onSuccess`를 정의하지 않고, 사용처에서 처리한다.**

### 파라미터가 1개인 경우

OpenAPI 생성 타입을 `mutationFn` 인자 타입으로 직접 사용한다.

```typescript
import { useMutation } from "@tanstack/react-query";
import { globalApiClient } from "@/apis/client";

// ✅ 좋은 예: 파라미터 1개 → OpenAPI 타입 직접 사용
export const useGlobalPatchUser = () => {
  return useMutation({
    mutationFn: (data: UpdateUserRequest) => {
      return globalApiClient.IntegrationAuth.GetUserControllerApi.updateUser(
        data,
      );
    },
  });
};

// ❌ 나쁜 예: 훅 함수에 파라미터를 받음
export const useGlobalPatchUser = (userId: string | undefined) => {
  return useMutation({
    mutationFn: (data: UpdateUserRequest) => {
      sharedAssertNonNull(userId);
      return globalApiClient.IntegrationAuth.GetUserControllerApi.updateUser(
        userId,
        data,
      );
    },
  });
};

// ❌ 나쁜 예: 불필요한 제네릭 명시
export const useGlobalPatchUser = () => {
  return useMutation<void, CustomResponseError, UpdateUserRequest>({
    mutationFn: (data) => {
      return globalApiClient.IntegrationAuth.GetUserControllerApi.updateUser(
        data,
      );
    },
  });
};
```

### 파라미터가 2개 이상인 경우

Request interface를 정의하여 모든 파라미터를 하나로 묶는다.

- **interface 네이밍**: `{PascalCase 훅 이름에서 useGlobal 제거}Request` (예: `PostReRequestVendorTransferRequest`)
- **interface 위치**: 훅과 같은 파일 내, 훅 선언 위에 배치

```typescript
import { useMutation } from "@tanstack/react-query";
import { AdminVendorTransferChangePartnerRequestModel } from "@shared-openapi/generated/remittance/models/AdminVendorTransferChangePartnerRequestModel";
import { globalApiClient } from "@/apis/client";

// ✅ 좋은 예: Request interface로 파라미터 묶기
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
```

### 사용처 예시

```typescript
// ✅ 사용처: 필요에 따라 onSuccess 처리
const queryClient = useQueryClient();
const { mutate } = usePatchUser();

mutate(userData, {
  onSuccess: () => {
    queryClient.invalidateQueries({
      queryKey: globalIntegrationAuthKeys.getUserControllerApi.all(),
    });
  },
});
```
