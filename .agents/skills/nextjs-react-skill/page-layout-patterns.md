# Page & Layout 패턴

Next.js App Router의 Page, Layout 작성 규칙입니다.

## Params 처리

- **Next.js 15/16에서는 params가 Promise를 반환합니다.**
- **params는 항상 Page/Layout의 props에서 받아서 사용합니다.** (`PageProps`, `LayoutProps` 타입 활용)
- **`useParams()` 사용을 지양합니다.** (타입 안정성 부족 - `Record<string, string | string[]>` 반환)

### 타입 안정성

```tsx
// ✅ 좋은 예: props.params 사용 - 타입이 정확함
const Page = (props: PageProps<"/transactions/[id]">) => {
  const { id } = use(props.params); // id: string (타입 보장)
};

// ❌ 나쁜 예: useParams() 사용 - 타입이 불명확함
const Page = () => {
  const { id } = useParams(); // id: string | string[] | undefined (타입 불안정)
};
```

### 하위 컴포넌트로 전달

하위 컴포넌트에서도 `useParams()` 대신 **props로 전달받아서 사용**합니다.

```tsx
// ✅ 좋은 예: Page에서 params를 추출하고 하위 컴포넌트에 props로 전달
const Page = (props: PageProps<"/transactions/[id]">) => {
  const { id } = use(props.params);
  return (
    <>
      <CardSection transactionId={id} />
      <LogSection transactionId={id} />
    </>
  );
};

// 하위 컴포넌트는 props로 받아서 사용
const CardSection = (props: { transactionId: string }) => {
  const query = useGetTransactionDetail(props.transactionId);
  return <div>{query.data?.title}</div>;
};

// ❌ 나쁜 예: 하위 컴포넌트에서 useParams() 직접 호출
const CardSection = () => {
  const { id } = useParams(); // 타입 불안정, Page와의 의존성 불명확
  const query = useGetTransactionDetail(id as string); // 타입 단언 필요
  return <div>{query.data?.title}</div>;
};
```

### 환경별 패턴

```tsx
// Server Component - 서버 기능(fetch, DB 쿼리 등) 사용 시
const Page = async (props: PageProps<"/transactions/[id]">) => {
  const { id } = await props.params;
  const data = await fetch(`/api/transactions/${id}`);
  return <div>{data.title}</div>;
};

// Client Component - Next.js 16 + React 19 (dashboard, ma-admin-v2, remittance-admin)
("use client");

import { use } from "react";

const Page = (props: PageProps<"/transactions/[id]">) => {
  const { id } = use(props.params);
  const searchParams = use(props.searchParams);
};

// Client Component - Next.js 15 + React 18 (agreement, intoss, operation-admin, settlement)
// React 18에서는 use() 훅이 없으므로 useParams() 사용 (예외적 허용)
("use client");

import { useParams, useSearchParams } from "next/navigation";

const Page = () => {
  const { id } = useParams();
  const searchParams = useSearchParams();
};
```

## Layout과 Page 구조

- **Layout**: 여러 페이지에서 공유되는 UI (Breadcrumb, 헤더, 사이드바 등)
- **Page**: 페이지 고유 콘텐츠, 복잡한 UI는 별도 컴포넌트로 분리

## 타입 사용

`PageProps`와 `LayoutProps`는 `next typegen`으로 생성된 타입을 사용합니다.

```tsx
import type { PageProps, LayoutProps } from "@/types/next";

const Page = (props: PageProps<"/transactions/[id]">) => {};
const Layout = (props: LayoutProps<"/transactions/[id]">) => {};
```

## Route Groups

Route Groups `(groupName)`을 사용하여 레이아웃을 그룹화합니다. URL 경로에는 포함되지 않습니다.

```
app/[locale]/(protected)/layout.tsx - 인증이 필요한 페이지 그룹
app/[locale]/(unprotected)/layout.tsx - 인증이 필요 없는 페이지 그룹
```

## 데이터 페칭

- **Server Component**: 직접 `fetch` 사용, React Query 사용 불가
- **Client Component**: React Query (`useQuery`, `useMutation`) 사용

```tsx
// Client Component에서 React Query 사용
"use client";

const CardSection = (props: { transactionId: string }) => {
  const query = useDashboardGetTransferDetail(props.transactionId);
  if (!query.data) return <div>Loading...</div>;
  return <div>{query.data.title}</div>;
};
```
