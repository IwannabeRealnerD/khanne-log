# Mocking 패턴

외부 의존성·부수 효과를 격리할 때 Vitest의 `vi` API 사용 규칙을 참조합니다.

## 원칙

- **최소한만 mock**: 테스트 목적에 필요한 부분만 mock하고, 나머지는 실제 구현 사용
- **복원**: 테스트 후 다른 테스트에 영향이 없도록 `vi.restoreAllMocks()` 또는 개별 `mockRestore()` 호출

## 모듈 mock: vi.mock

API 클라이언트, 외부 서비스, 전역 객체 등을 대체할 때 사용합니다.

### 기본 형태

```typescript
import { vi } from "vitest";

vi.mock("@/apis/client", () => ({
  globalApiClient: {
    Remittance: {
      TransferApi: { getList: vi.fn().mockResolvedValue({ data: [] }) },
    },
  },
}));
```

### 호이스팅

`vi.mock("module-path")`는 파일 최상단으로 호이스팅됩니다. 따라서:

- `vi.mock` 호출은 import 구문보다 "위"에 써도 되며, 실제로는 먼저 실행됨
- factory 함수 안에서는 `vi`를 사용할 수 있지만, factory 밖에서 이미 정의된 변수를 참조할 때는 주의 (호이스팅으로 인해 그 변수가 아직 초기화되지 않았을 수 있음)

### factory 사용 시

factory를 넘기면 해당 모듈의 mock 구현을 직접 정의할 수 있습니다.

```typescript
vi.mock("@/utils/formatDate", () => ({
  formatDate: (d: Date) => d.toISOString().slice(0, 10),
}));
```

필요한 것만 mock하고 나머지는 `vi.importActual`로 실제 모듈을 가져와 합칠 수 있습니다.

```typescript
vi.mock("@/utils/date", async (importOriginal) => {
  const actual = await importOriginal<typeof import("@/utils/date")>();
  return { ...actual, getToday: vi.fn(() => new Date("2025-01-01")) };
});
```

## 함수 mock: vi.fn

콜백, props로 넘기는 핸들러 등을 검증할 때 사용합니다.

```typescript
const onSubmit = vi.fn();
render(<Form onSubmit={onSubmit} />);
await userEvent.click(screen.getByRole("button", { name: "제출" }));
expect(onSubmit).toHaveBeenCalledTimes(1);
expect(onSubmit).toHaveBeenCalledWith(expectedData);
```

- `vi.fn().mockReturnValue(value)` - 반환값 고정
- `vi.fn().mockResolvedValue(value)` - Promise resolve
- `vi.fn().mockRejectedValue(error)` - Promise reject

## 스파이: vi.spyOn

이미 존재하는 객체의 메서드를 일시적으로 대체하거나, 호출 여부·인자를 검증할 때 사용합니다.

```typescript
const getItemSpy = vi.spyOn(Storage.prototype, "getItem");
getItemSpy.mockReturnValue('"cached"');
// 테스트 로직
getItemSpy.mockRestore(); // 또는 afterEach에서 vi.restoreAllMocks()
```

- `vi.spyOn(object, "method")` 후 `mockReturnValue`, `mockResolvedValue` 등으로 동작 변경
- 테스트/`afterEach`에서 `mockRestore()`로 원래 구현 복원

## 복원

다른 테스트가 같은 모듈·객체를 사용할 수 있도록 mock을 정리합니다.

```typescript
afterEach(() => {
  vi.restoreAllMocks();
});
```

- `vi.restoreAllMocks()`: 모든 스파이의 `mockRestore()` 호출 (vi.fn으로 만든 mock의 구현은 초기화되지 않을 수 있음)
- `vi.clearAllMocks()`: 호출 기록만 비움, 구현은 유지
- 개별 스파이는 `spy.mockRestore()`로 복원

## 타이밍: vi.useFakeTimers

setTimeout, setInterval, Date 등 시간에 의존하는 로직을 테스트할 때만 사용합니다.

```typescript
beforeEach(() => {
  vi.useFakeTimers();
});
afterEach(() => {
  vi.useRealTimers();
});

it("3초 후 메시지를 표시한다", () => {
  render(<MessageAfterDelay />);
  expect(screen.queryByText("완료")).not.toBeInTheDocument();
  vi.advanceTimersByTime(3000);
  expect(screen.getByText("완료")).toBeInTheDocument();
});
```

사용 후 반드시 `vi.useRealTimers()`로 복원합니다.

## React Query / API 훅 테스트

훅이 API를 호출하고 결과를 반영하는지 검증할 때:

1. **API 모듈 mock**: `vi.mock`으로 해당 API 클라이언트 또는 훅이 사용하는 함수를 mock
2. **Wrapper**: `QueryClientProvider`로 훅/컴포넌트를 감싼 뒤 render
3. **비동기 처리**: `waitFor`, `findBy*` 등으로 응답 후 UI·상태 변화 검증

API 레이어 구조·QueryKey·훅 네이밍 등은 [api-layer-skill](../api-layer-skill/SKILL.md)을 참조합니다.

## 요약

| 용도                  | API                       | 복원/정리                                   |
| --------------------- | ------------------------- | ------------------------------------------- |
| 모듈 대체             | `vi.mock(path)`           | 다음 테스트 전 모듈 캐시 고려               |
| 콜백/핸들러 검증      | `vi.fn()`                 | 필요 시 `mockClear`                         |
| 기존 메서드 대체·검증 | `vi.spyOn(obj, "method")` | `mockRestore()` 또는 `vi.restoreAllMocks()` |
| 타이밍                | `vi.useFakeTimers`        | `vi.useRealTimers()`                        |
