# 유닛 테스트 패턴

순수 함수, 유틸, validator 등 로직 전용 테스트 작성 시 참조합니다.

## 목적

- 입력/출력이 명확한 함수·모듈의 동작 검증
- 테이블 드리븐 테스트로 경계값·다양한 케이스 일괄 검증
- 설정·전역 상태에 의존하는 테스트의 격리(beforeEach 등)

## 기본 구조

### describe / it·test

- `describe`로 테스트 대상 함수 또는 모듈을 그룹화
- `it` 또는 `test`로 하나의 시나리오(동작 단위) 작성
- 시나리오 설명은 "~하면 ~한다" 형태로 작성하면 가독성이 좋음

```typescript
// 참조: shared/utils/src/date/date-refine.test.ts
describe("sharedFormatDateTime", () => {
  it("undefined가 전달되면 '-'를 반환한다", () => {
    expect(sharedFormatDateTime(undefined)).toBe("-");
  });

  it("유효한 Date 객체를 'yyyy.MM.dd HH:mm' 형식으로 포맷한다", () => {
    const date = new Date(2025, 10, 4, 10, 30, 0, 0);
    expect(sharedFormatDateTime(date)).toBe("2025.11.04 10:30");
  });
});
```

### test.each / it.each

동일한 로직에 대해 입력·기대값만 다른 경우 테이블 드리븐으로 작성합니다.

```typescript
// 참조: shared/utils/src/number/index.test.ts
describe("sharedToLocaleFixed", () => {
  describe("integer", () => {
    test.each([
      [123, 0, "123"],
      [1123, 0, "1,123"],
      [123, 1, "123.0"],
      [0, 0, "0"],
    ])('toLocaleFixed(%s, %s) = "%s"', (n, fractionDigits, expected) => {
      expect(sharedToLocaleFixed(n, fractionDigits)).toBe(expected);
    });
  });
});
```

## expect 매처 선택

| 목적                  | 매처 예시                      |
| --------------------- | ------------------------------ |
| 원시값 동등           | `toBe(expected)`               |
| 객체/배열 내용 동등   | `toEqual(expected)`            |
| 배열에 특정 요소 포함 | `toContainEqual(element)`      |
| 예외 발생             | `expect(() => fn()).toThrow()` |
| 참/거짓·null 등       | `toBeTruthy`, `toBeNull` 등    |

validator처럼 에러 객체 배열을 반환하는 경우 `toContainEqual`로 특정 에러만 검증할 수 있습니다.

```typescript
// 참조: apps/back-office/src/__tests__/validate-validator/text-field-check.test.ts
expect(result).toContainEqual({
  location: "fields.[0].key",
  message: "키는 필수 입력 사항이며, 문자열이어야 합니다.",
});
```

## 설정·전역 상태 의존 테스트

localStorage, 전역 객체 등 테스트 간 상태가 공유되면 `beforeEach`에서 초기화합니다.

```typescript
// 참조: shared/utils/src/storage/index.test.ts
describe("sharedLocalStorage", () => {
  beforeEach(() => {
    localStorage.clear();
  });

  test("string primitive 값을 set 한다.", () => {
    sharedSetStorage("accessToken", "testToken");
    const result = localStorage.getItem("accessToken");
    expect(result).toBe('"testToken"');
  });
});
```

### 테스트 전용 타입 확장

제네릭·키 기반 스토리지 등 테스트에서만 특정 키를 사용해야 할 때는 `declare module`로 해당 테스트 파일 안에서만 타입을 확장하고, 목적을 주석으로 남깁니다.

```typescript
// 참조: shared/utils/src/storage/index.test.ts
declare module "./index" {
  // NOTE - 테스트 목적으로 추가한 타입
  interface StorageDef {
    accessToken: string;
    testDate: Date;
    // ...
  }
}
```

## 참조 예시 경로

- `shared/utils/src/number/index.test.ts` - describe + test.each + expect
- `shared/utils/src/date/date-refine.test.ts` - it + expect
- `apps/back-office/src/__tests__/validate-validator/text-field-check.test.ts` - 구조화된 describe/it, toContainEqual
- `shared/utils/src/storage/index.test.ts` - beforeEach, declare module
