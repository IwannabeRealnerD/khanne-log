# 컴포넌트 테스트 패턴

React 컴포넌트 테스트 작성 시 참조합니다. Vitest + @testing-library/react를 사용하며, 사용자 관점에서 동작을 검증합니다.

## 목적

- 컴포넌트가 사용자에게 기대한 내용을 보여주는지 검증
- 사용자 상호작용(클릭, 입력 등) 후 UI·동작 변화 검증
- 구현 디테일이 아닌 접근 가능한 역할·라벨·텍스트 기준으로 쿼리

## 도구

- **테스트 러너**: Vitest
- **렌더·쿼리·상호작용**: @testing-library/react (Next.js 앱)
- **환경**: vitest.config에서 `environment: "jsdom"`, React 앱은 `@vitejs/plugin-react` 사용

## 사용자 관점 테스트

AGENTS.md 테스트 가이드: "컴포넌트 테스트는 사용자 관점에서 작성"합니다.

- **구현 디테일보다 행동·노출 정보**: DOM 구조, 클래스명, 내부 state 직접 검사 지양
- **쿼리 우선순위**: 사용자가 보거나 조작하는 방식에 가까운 수단 우선

### 쿼리 우선순위 (Testing Library 권장)

1. `getByRole` - 버튼, 링크, 입력 등 접근성 역할
2. `getByLabelText` - 폼 필드(라벨과 연결된 입력)
3. `getByPlaceholderText` - 라벨이 없을 때만
4. `getByText` - 비인터랙티브 텍스트
5. `getByTestId` - 위 방법으로 불가할 때만 사용

```typescript
// ✅ 좋은 예: 역할·라벨 기반
screen.getByRole("button", { name: "제출" });
screen.getByLabelText("이메일");
screen.getByText("저장되었습니다.");

// ❌ 나쁜 예: 구현 디테일에 의존
container.querySelector(".submit-btn");
screen.getByTestId("email-input"); // 역할/라벨로 할 수 있으면 지양
```

### 상호작용 시뮬레이션

- `userEvent`(예: `@testing-library/user-event`)로 클릭, 입력, 포커스 등 사용자 행동 시뮬레이션
- `fireEvent`보다 userEvent가 여러 이벤트를 묶어서 발생시키므로 사용자 동작에 가깝습니다

```typescript
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

it("제출 버튼 클릭 시 폼이 제출된다", async () => {
  const user = userEvent.setup();
  render(<MyForm />);
  await user.type(screen.getByLabelText("이름"), "홍길동");
  await user.click(screen.getByRole("button", { name: "제출" }));
  expect(screen.getByText("저장되었습니다.")).toBeInTheDocument();
});
```

## Wrapper (Provider)

React Query, Router, Theme 등 Provider가 필요한 컴포넌트는 `render` 시 wrapper로 감쌉니다.

```typescript
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

function createWrapper() {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: { retry: false },
      mutations: { retry: false },
    },
  });
  return function Wrapper(props: { children: React.ReactNode }) {
    return (
      <QueryClientProvider client={queryClient}>
        {props.children}
      </QueryClientProvider>
    );
  };
}

it("데이터를 불러와 목록을 렌더한다", () => {
  render(<ListPage />, { wrapper: createWrapper() });
  // ...
});
```

API·훅을 mock할 때는 [mocking-patterns.md](./mocking-patterns.md)를 참조합니다.

## 검증 시 유의사항

- **보이는 결과 위주**: 텍스트, 역할, 상태 메시지 등 사용자가 인지하는 내용으로 assert
- **비동기**: 데이터 로딩 후 UI가 바뀌면 `findBy*` 또는 `waitFor` 사용
- **불필요한 snapshot 지양**: 의미 있는 assert로 동작을 명시적으로 검증하는 것을 권장

## 요약

| 항목     | 권장 내용                                      |
| -------- | ---------------------------------------------- |
| 쿼리     | getByRole, getByLabelText, getByText 우선      |
| 상호작용 | userEvent로 클릭·입력 시뮬레이션               |
| Provider | React Query·Router 등 필요 시 wrapper로 전달   |
| 검증     | 사용자가 보는 텍스트·역할·상태 기준으로 assert |
