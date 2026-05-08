---
name: testing-skill
description: 유닛 테스트·컴포넌트 테스트 작성·수정 시 Vitest 및 필요 시 mocking 규칙을 참조합니다.
globs:
  - "**/*.test.ts"
  - "**/*.test.tsx"
  - "**/__tests__/**/*.ts"
  - "**/__tests__/**/*.tsx"
---

# Testing 스킬

이 스킬은 Vitest 기반 유닛 테스트, React 컴포넌트 테스트, mocking 규칙을 포함합니다.

## 공통 규칙 참조

- **TypeScript 규칙**: [typescript-skill](../common-skills/typescript-skill/SKILL.md) - 테스트 코드에서도 any 금지, 타입 가드 등 공통 규칙 준수

## 테스트 블록 명명

- 테스트 케이스는 **`test`**를 사용하고 **`it`**은 사용하지 않습니다. (`test("설명", () => { ... })`, `test.each` 등)

## 주요 영역

- **유닛 테스트**: [unit-test-patterns.md](./unit-test-patterns.md) - 순수 함수·유틸·validator 테스트 패턴
- **컴포넌트 테스트**: [component-test-patterns.md](./component-test-patterns.md) - React + Testing Library, 사용자 관점
- **Mocking**: [mocking-patterns.md](./mocking-patterns.md) - vi.mock, vi.fn, vi.spyOn 사용 규칙

## 빠른 참조

### 1. Vitest 기본

- `describe`로 대상 함수/모듈 그룹화, **`test`**로 시나리오 작성 (`it` 사용 금지)
- `test.each`로 테이블 드리븐 테스트 권장
- `expect` 매처: `toBe`, `toEqual`, `toContainEqual` 등 목적에 맞게 선택

```typescript
// ✅ 좋은 예
describe("sharedToLocaleFixed", () => {
  test.each([
    [123, 0, "123"],
    [1123, 0, "1,123"],
  ])("toLocaleFixed(%s, %s) = %s", (n, fractionDigits, expected) => {
    expect(sharedToLocaleFixed(n, fractionDigits)).toBe(expected);
  });
});
```

### 2. 파일/디렉터리 규칙

- **파일명**: `*.test.ts`, `*.test.tsx`
- **위치**: 소스 옆 코로케이션(`foo.test.ts`) 또는 `__tests__/` 디렉터리. 앱/패키지 내에서 일관되게 유지

### 3. 컴포넌트 테스트 원칙

- **사용자 관점**: 구현 디테일이 아닌 사용자 행동·노출 텍스트·역할 기반 쿼리 우선
- **도구**: Vitest + @testing-library/react (Next.js 앱)
- **쿼리**: `screen.getByRole`, `getByLabelText`, `getByText` 등; `render` 시 React Query·Router 등 필요하면 wrapper 패턴

### 4. Mocking 사용 시점

- 외부/부수 효과 격리 시에만 사용. 불필요한 mock 최소화
- 모듈 대체: `vi.mock("module-path")`
- 함수/스파이: `vi.fn()`, `vi.spyOn(object, "method")`
- 사용 후 복원: `afterEach`에서 `vi.restoreAllMocks()` 등

자세한 내용은 각 상세 문서를 참조하세요.
