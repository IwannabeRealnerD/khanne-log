# as 프롭 기반 폴리모픽 컴포넌트

asChild 패턴을 사용하는 React + TypeScript 컴포넌트를 **as 프롭 기반 제네릭 폴리모픽 컴포넌트**로 리팩토링하기 위한 공통 규칙입니다.

## 전제 및 목표

### 전제

- 대상 컴포넌트는 React + TypeScript 기반입니다.
- 기존에 `asChild`, `Slot`, `forwardRef` 등을 사용하고 있을 수 있습니다.

### 핵심 목표

- `asChild` 의존성을 모두 제거하고, **오직 `as` 프롭만 사용하는 폴리모픽 컴포넌트**로 변경합니다.
- 기본 태그(예: 버튼 계열이면 `button`)는 유지하되, `button` | `a` | (선택) `Next.js Link` 같은 라우팅 컴포넌트 등으로 확장 가능하도록 설계합니다.
- `as` 값에 따라 **알맞은 props 타입이 자동 추론**되도록 TypeScript 제네릭 기반 폴리모픽 타입을 사용합니다.

## 공통 유틸 타입 패턴

`moin-design-system`에서 실제로 사용하는 `PolymorphicComponentProps`를 **폴리모픽 컴포넌트용 단일 유틸 타입**으로 사용합니다.

```typescript
// packages/moin-design-system/src/types/polymorphic.ts
export type PolymorphicComponentProps<
  TAs extends React.ElementType,
  OwnProps = Record<string, never>,
> = OwnProps &
  Omit<React.ComponentPropsWithoutRef<TAs>, keyof OwnProps | "as"> & {
    as?: TAs;
  };
```

### 사용 방법

- 컴포넌트 파일에서 `import { PolymorphicComponentProps } from "../types/polymorphic";` 형태로 import합니다.
- 각 컴포넌트마다 타입을 재정의하지 않고, 공통 유틸 타입을 재사용합니다.

### 역할

- `OwnProps`: 컴포넌트 고유의 디자인 시스템용 props (예: `variant`, `size`, `isLoading` 등)
- `React.ComponentPropsWithoutRef<TAs>`: `as`로 지정된 태그/컴포넌트의 원래 props
- 두 타입을 병합하되, `keyof OwnProps`와 `"as"`는 `Omit`으로 제거해 **중복 키를 방지**합니다.

### 결과 예시

- `as="button"` → `button` 기본 props + `OwnProps`
- `as="a"` → `a` 기본 props + `OwnProps`
- `as={Link}` → `Link` 컴포넌트 props + `OwnProps`

## 컴포넌트 전용 타입 템플릿

`text-button.tsx`에서 사용하는 패턴을 기준으로 한 템플릿입니다.

```typescript
import { PolymorphicComponentProps } from "../types/polymorphic";

// OwnProps는 디자인 시스템 고유 props (예: CVA의 VariantProps)
type ComponentNameOwnProps = {
  // 디자인 시스템 고유 props 예시
  variant?: "primary" | "secondary" | "ghost";
  size?: "sm" | "md" | "lg";
  // etc...
};

type ComponentNameProps<TAs extends React.ElementType = "button"> =
  PolymorphicComponentProps<
    TAs,
    ComponentNameOwnProps &
      (TAs extends "button"
        ? React.ButtonHTMLAttributes<HTMLButtonElement>
        : // eslint-disable-next-line @typescript-eslint/no-empty-object-type
          {})
  >;
```

### 제네릭 `TAs extends React.ElementType = "button"`

- `as` 프롭이 가리키는 실제 태그/컴포넌트 타입입니다.
- `as`를 생략하면 기본값이 적용됩니다.
- **중요**: 기본 타입은 컴포넌트의 용도에 따라 다를 수 있습니다.
  - 버튼 계열 컴포넌트: `"button"` (예: `TextButton`, `IconButton`)
  - 컨테이너/레이아웃 계열: `"div"` (예: `Card`, `Container`)
  - 기타: 컴포넌트의 의미에 맞는 적절한 기본 태그

### 기본 태그용 props 병합

- `TAs extends "button" ? React.ButtonHTMLAttributes<HTMLButtonElement> : {}` 조건부 타입을 통해
  - 기본 사용(`as` 미지정) 시 기본 태그의 고유 props를 자연스럽게 사용할 수 있게 합니다.
    - `button`의 경우: `type`, `disabled` 등
    - `div`의 경우: 일반적인 HTML 속성들
  - 다른 태그/컴포넌트(`"a"`, `Link` 등)를 사용할 때도 `PolymorphicComponentProps`가 각자의 props를 병합해 줍니다.

## 컴포넌트 구현 패턴

`React.forwardRef`와 제네릭 콜 시그니처를 결합해 아래 패턴으로 구현합니다.

```typescript
export const ComponentName = React.forwardRef<
  HTMLButtonElement,
  ComponentNameProps<React.ElementType>
>(function ComponentName({ as, children, className, size, ...props }, ref) {
  const Component = (as || "button") as React.ElementType;

  // variant, size, className 등을 사용한 스타일 계산
  // 예: const computedClassName = variants({ className, size });

  return (
    <Component ref={ref} className={computedClassName} {...props}>
      {children}
    </Component>
  );
}) as <TAs extends React.ElementType = "button">(
  props: ComponentNameProps<TAs> &
    React.RefAttributes<React.ElementRef<TAs>>,
) => React.ReactElement | null;
```

### 내부 구현

- `forwardRef` 내부에서는 `HTMLButtonElement` + `ComponentNameProps<React.ElementType>`로 구현합니다.
- `as || "button"`을 통해 기본 태그는 `"button"`으로 유지하면서, `as`로 다른 태그/컴포넌트를 지정할 수 있습니다.
- `const Component = (as || "button") as React.ElementType;` 형태로 타입 단언을 사용합니다.

### 외부 제네릭 시그니처

- 마지막 `as <TAs extends React.ElementType = "button">(...) => ...` 부분에서
  - `as` 값에 따라 props와 `ref` 타입이 자동으로 추론됩니다.
  - `as`를 생략하면 `"button"` 기준 타입이 기본값으로 사용됩니다.

## asChild / Slot 제거 규칙

- 기존 코드에 `asChild`, `Slot` 등을 사용 중이라면:
  - `asChild` 관련 분기와 `Slot` 사용 코드는 **모두 삭제**합니다.
  - 대신 `as` 프롭으로 렌더링할 실제 컴포넌트/태그를 결정합니다.
    - 예: `const Component = (as || "button") as React.ElementType;`
- 렌더링 패턴은 다음과 같이 유지합니다.

```tsx
const Component = as || "button";

return (
  <Component ref={ref} className={computedClassName} {...props}>
    {children}
  </Component>
);
```

## 타입 안전성과 중복 props 처리

- `as="button"`인데 `href`를 넘기는 등 **잘못된 조합은 타입 레벨에서 에러**가 나야 합니다.
- `className`, `onClick`, `disabled` 등 공통적으로 많이 쓰이는 props는
  - 가능하면 `OwnProps`가 아니라 원래 태그/컴포넌트의 props에 맡기고,
  - `Omit<..., keyof OwnProps | 'as'>`를 통해 **중복 정의를 피합니다.**
- `ref`는 항상 `forwardRef` + 제네릭 시그니처 캐스팅을 사용해서
  - `as="button"` → `HTMLButtonElement`
  - `as="a"` → `HTMLAnchorElement`
  - `as={Link}` → `Link` 내부 ref 타입
    이 자연스럽게 추론되도록 합니다.

## 기존 API 호환성 규칙

- 기존 컴포넌트가 노출하던 **공개 API (props 이름/의미)**는 가능한 한 유지합니다.
  - 예: `variant`, `size`, `isLoading` 등의 의미 및 기본값 유지
- `as` 도입 이후에도, 이전처럼
  - `<ComponentName>...</ComponentName>`
    형태의 코드는 **변경 없이 그대로 동작**해야 합니다.
- 단, 과거에 `asChild`를 사용하던 사용처는:
  - 컴파일 타임에 명확한 에러가 나야 하고,
  - `<ComponentName as="a">`, `<ComponentName as={Link}>` 형태로
    쉽게 마이그레이션 할 수 있도록 타입/구조를 설계합니다.

## 사용 예시

```tsx
// as 미사용 (기본 button)
<ComponentName>텍스트 버튼</ComponentName>

// a 태그로 사용
<ComponentName as="a" href="/foo">
  링크 버튼
</ComponentName>

// Next.js Link로 사용
<ComponentName as={Link} href="/bar">
  링크 버튼
</ComponentName>
```

위 규칙을 모두 만족하도록, 대상 컴포넌트를 **as 프롭만 사용하는 제네릭 폴리모픽 컴포넌트**로 리팩토링해 주세요.
