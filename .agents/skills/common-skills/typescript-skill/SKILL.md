---
name: typescript-skill
description: TypeScript 코드를 작성하거나 수정할 때 사용합니다. any 타입 사용 금지, 타입 단언 최소화, unknown과 타입 가드 활용 규칙을 참조합니다.
globs: *.tsx, *.ts, *.svelte
---

# TypeScript 규칙

이 스킬은 모든 TypeScript 프로젝트에서 타입 안전성을 보장하기 위한 공통 규칙을 포함합니다.

## 핵심 원칙

### 1. any 타입 사용 금지

- **`any` 타입은 절대 사용하지 않습니다.**

  - `any`는 TypeScript의 타입 안전성을 완전히 무력화시킵니다.
  - 타입 체크를 우회하여 런타임 에러의 위험을 증가시킵니다.

- **대안:**

  - **`unknown` 사용**: 타입을 모를 때는 `unknown`을 사용하고, 타입 가드로 검증합니다.
  - **제네릭 활용**: 재사용 가능한 타입을 만들 때 제네릭을 사용합니다.
  - **구체적인 타입 정의**: 가능한 한 구체적인 타입을 정의합니다.
  - **유니온 타입**: 여러 타입 중 하나일 경우 유니온 타입을 사용합니다.

- **예외 상황:**
  - 정말 불가피한 경우(예: 외부 라이브러리 타입 정의가 없고 `unknown`으로도 해결이 안 될 때)에만 사용하며, 반드시 주석으로 이유를 명시합니다.

### 2. 타입 단언(as) 최소화

- **타입 단언(`as`)은 불필요한 경우 사용하지 않습니다.**

  - 타입 단언은 타입 시스템을 우회하는 방법입니다.
  - 잘못된 타입 단언은 런타임 에러를 유발할 수 있습니다.

- **대안:**

  - **타입 가드 사용**: `typeof`, `instanceof`, 사용자 정의 타입 가드 함수를 활용합니다.
  - **제네릭 활용**: 제네릭을 통해 타입을 정확히 추론하도록 합니다.
  - **조건부 타입**: 복잡한 타입 관계는 조건부 타입으로 표현합니다.
  - **타입 정의 개선**: 타입 정의를 개선하여 단언이 필요 없도록 합니다.

- **사용이 허용되는 경우:**
  - DOM API 사용 시 (예: `document.getElementById('id') as HTMLInputElement`)
  - 타입 정의가 부정확한 외부 라이브러리와의 상호작용
  - 타입 시스템의 한계로 인해 정확한 타입 추론이 불가능한 경우
  - **단, 사용 이유를 주석으로 명시해야 합니다.**

## 사용 예시

### any 타입 사용 금지

```typescript
// ❌ 나쁜 예: any 사용
function processData(data: any) {
  return data.value;
}

// ✅ 좋은 예: unknown과 타입 가드 사용
function isData(value: unknown): value is { value: string } {
  return typeof value === "object" && value !== null && "value" in value;
}

function processData(data: unknown) {
  if (isData(data)) {
    return data.value; // 타입 안전하게 접근
  }
  throw new Error("Invalid data");
}

// ✅ 좋은 예: 제네릭 활용
function processData<T extends { value: string }>(data: T): string {
  return data.value;
}
```

### 타입 단언 최소화

```typescript
// ❌ 나쁜 예: 불필요한 타입 단언
const value = someFunction() as string;

// ✅ 좋은 예: 타입 가드 사용
function isString(value: unknown): value is string {
  return typeof value === "string";
}

const result = someFunction();
if (isString(result)) {
  // result는 이제 string 타입으로 추론됨
  console.log(result.toUpperCase());
}

// ✅ 좋은 예: 제네릭 활용
function getValue<T>(key: string): T | undefined {
  return storage.get(key) as T | undefined;
}

// ✅ 허용되는 경우: DOM API (주석 필수)
const input = document.getElementById("username") as HTMLInputElement;
// document.getElementById는 HTMLElement | null을 반환하지만,
// 이 경우 HTMLInputElement임을 보장할 수 있음
```

## 세부 규칙

타입 단언에 대한 더 자세한 내용은 [type-assertions.md](./type-assertions.md)를 참조하세요.
