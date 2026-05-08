# 타입 단언 상세 규칙

이 문서는 TypeScript 타입 단언(`as`) 사용에 대한 상세한 가이드라인을 제공합니다.

## 기본 원칙

타입 단언은 타입 시스템을 우회하는 방법이므로, 가능한 한 사용을 피해야 합니다. 대신 타입 가드, 제네릭, 조건부 타입 등을 활용하여 타입 안전성을 보장합니다.

## 허용되는 경우

### 1. DOM API 사용

DOM API는 타입 정의가 넓게 설정되어 있어, 구체적인 타입이 필요한 경우 타입 단언이 필요할 수 있습니다.

```typescript
// ✅ 허용: DOM API 사용 시
const input = document.getElementById("username") as HTMLInputElement;
// document.getElementById는 HTMLElement | null을 반환하지만,
// 이 경우 HTMLInputElement임을 보장할 수 있음

// 주석으로 사용 이유를 명시하는 것이 좋습니다
const canvas = document.getElementById("myCanvas") as HTMLCanvasElement;
// getElementById는 HTMLElement | null을 반환하지만,
// 이 요소는 canvas 요소임을 보장할 수 있음
```

### 2. 외부 라이브러리와의 상호작용

타입 정의가 부정확하거나 없는 외부 라이브러리와 상호작용할 때 사용할 수 있습니다.

```typescript
// ✅ 허용: 외부 라이브러리 타입 정의가 부정확한 경우
// 주석으로 이유를 명시
const result = externalLibrary.getData() as ExpectedType;
// externalLibrary의 타입 정의가 부정확하여 타입 단언 필요
```

### 3. 타입 시스템의 한계

TypeScript의 타입 시스템 한계로 인해 정확한 타입 추론이 불가능한 경우입니다.

```typescript
// ✅ 허용: 타입 시스템 한계
function createInstance<T>(Class: new () => T): T {
  return new Class() as T;
}
// 제네릭 생성자 패턴에서 타입 시스템의 한계로 인한 단언
```

## 금지되는 경우

### 1. 불필요한 타입 단언

타입이 이미 올바르게 추론되는 경우 타입 단언을 사용하지 않습니다.

```typescript
// ❌ 나쁜 예: 불필요한 타입 단언
const value = someFunction() as string;
// someFunction()이 이미 string을 반환한다면 단언 불필요

// ✅ 좋은 예: 타입 가드 사용
function isString(value: unknown): value is string {
  return typeof value === "string";
}

const result = someFunction();
if (isString(result)) {
  // 타입 가드를 통해 안전하게 타입 좁히기
  console.log(result.toUpperCase());
}
```

### 2. 타입 오류를 숨기기 위한 단언

타입 오류를 해결하기 위해 타입 단언을 사용하는 것은 금지됩니다.

```typescript
// ❌ 나쁜 예: 타입 오류를 숨기기 위한 단언
const data = apiResponse as UserData;
// apiResponse의 타입이 UserData와 맞지 않는데 단언으로 강제 변환

// ✅ 좋은 예: 타입 가드로 검증
function isUserData(value: unknown): value is UserData {
  return (
    typeof value === "object" &&
    value !== null &&
    "id" in value &&
    "name" in value
  );
}

if (isUserData(apiResponse)) {
  // 검증 후 안전하게 사용
  console.log(apiResponse.name);
}
```

## 대안 방법

### 타입 가드 사용

```typescript
// ✅ 좋은 예: 사용자 정의 타입 가드
function isUser(value: unknown): value is User {
  return (
    typeof value === "object" &&
    value !== null &&
    "id" in value &&
    typeof (value as { id: unknown }).id === "string" &&
    "name" in value &&
    typeof (value as { name: unknown }).name === "string"
  );
}

const data = getData();
if (isUser(data)) {
  // data는 이제 User 타입으로 추론됨
  console.log(data.name);
}
```

### 제네릭 활용

```typescript
// ✅ 좋은 예: 제네릭으로 타입 안전성 보장
function getValue<T>(key: string): T | undefined {
  const value = storage.get(key);
  return value as T | undefined;
  // storage.get의 반환 타입이 any이지만,
  // 제네릭을 통해 사용하는 쪽에서 타입을 지정
}

const user = getValue<User>("user");
if (user) {
  console.log(user.name); // 타입 안전
}
```

### 조건부 타입 사용

```typescript
// ✅ 좋은 예: 조건부 타입으로 복잡한 타입 관계 표현
type ApiResponse<T> = T extends string
  ? { message: T }
  : T extends number
    ? { code: T }
    : { data: T };

function processResponse<T>(response: ApiResponse<T>): T {
  if ("data" in response) {
    return response.data;
  }
  // 타입 시스템이 자동으로 타입을 좁혀줌
  throw new Error("Invalid response");
}
```

## 주의사항

1. **주석 필수**: 타입 단언을 사용할 때는 반드시 주석으로 이유를 명시합니다.
2. **최후의 수단**: 타입 단언은 최후의 수단으로만 사용합니다.
3. **타입 안전성 우선**: 타입 단언보다 타입 가드나 제네릭을 우선적으로 고려합니다.
