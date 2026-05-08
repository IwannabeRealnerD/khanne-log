---
name: form-skill
description: React Hook Form 기반 폼 작성 규칙. 폼 컴포넌트 작성, 유효성 검사, MDS 폼 컴포넌트 통합, 폼 상태 관리 시 참조합니다.
globs: "*.tsx"
---

# 폼 스킬

이 스킬은 React Hook Form 기반 폼 작성 규칙을 포함합니다.

## 주요 영역

- **모달 폼 패턴**: [modal-form.md](./modal-form.md) - 모달 안에 폼이 있을 때의 구현 패턴

## 빠른 참조

### 사용 라이브러리

- **폼 관리**: `react-hook-form` (`useForm`, `Controller`, `useWatch`)
- **MDS 폼 컴포넌트**: `MdsTextField`, `MdsDropdown`, `MdsCheckbox` 등. 이 외에도 `packages/moin-design-system/src/form/`, `control/`, `picker/` 디렉터리에 다양한 MDS 폼 컴포넌트가 있으므로, 필요한 컴포넌트는 해당 디렉터리를 탐색하여 찾아서 사용합니다.
- **에러 메시지**: `SharedFieldMessage` (`@shared-components/form/FieldMessage`)

### useForm 기본 설정

`mode`는 기본적으로 `"onChange"`를 사용합니다.

```typescript
const form = useForm<FormValues>({
  defaultValues: {
    // props에서 전달받은 초기값 또는 기본값
    name: props.editData?.name ?? undefined,
    status: props.editData?.status ?? true,
    // Dropdown 등 ENUM 값을 사용하는 필드는 undefined가 아닌 ENUM 값 중 하나를 기본값으로 지정
    channelType: props.editData?.channelType ?? "MOBILE",
  },
  mode: "onChange",
  shouldUnregister: true, // 동적 필드가 있으면 필수
});
```

> **주의**: Dropdown/Select 같은 ENUM 기반 필드는 `undefined`를 기본값으로 사용하면 안 됩니다. 반드시 해당 ENUM 값 중 하나를 기본값으로 지정해야 합니다. `undefined`로 두면 Dropdown이 빈 상태로 렌더링되어 사용자 경험이 나빠지고, validation 문제가 발생할 수 있습니다.

### shouldUnregister 규칙

조건부로 필드가 렌더링/언마운트되는 폼에서는 **반드시** `shouldUnregister: true`를 설정합니다. 이 옵션이 없으면 언마운트된 필드의 값이 submit 데이터에 남아 의도하지 않은 데이터가 전송됩니다.

```tsx
// 예: channelType에 따라 phone 또는 email 필드가 조건부 렌더링되는 경우
const channelType = useWatch({ control: form.control, name: "channelType" });

{
  channelType === "MOBILE" && <MdsTextField {...form.register("phone")} />;
}
{
  channelType === "EMAIL" && <MdsTextField {...form.register("email")} />;
}
```

> 동적 필드가 없는 정적 폼에서는 생략해도 무방합니다.

### MDS 컴포넌트 연동

**MdsTextField** - `register` 직접 사용:

```tsx
<MdsTextField
  required
  errorText={formState.errors.name?.message}
  label="이름"
  placeholder="이름을 입력해 주세요"
  {...form.register("name", { required: "이름을 입력해 주세요" })}
/>
```

**MdsDropdown / MdsCheckbox** - `Controller`로 감싸서 사용:

```tsx
<Controller
  control={form.control}
  name="fieldName"
  render={({ field }) => (
    <MdsDropdown
      buttonSize="md"
      label="라벨"
      options={{ items: OPTIONS, size: "md" }}
      value={field.value}
      onChange={field.onChange}
    />
  )}
/>
```

### FormValues 타입 규칙

FormValues 타입은 서버에서 생성된(OpenAPI generated) 타입을 최대한 활용합니다. 직접 타입을 새로 정의하지 말고, 서버 타입을 `Pick`, `Omit` 등으로 가공해서 사용합니다.

```typescript
// Good - 서버 생성 타입 활용
type FormValues = Pick<CreateSomethingRequest, "name" | "status" | "items">;

// Bad - 서버 타입이 있는데 직접 정의
interface FormValues {
  name: string;
  status: boolean;
  items: string[];
}
```

### Create / Edit 폼 분리 기준

Create 폼과 Edit 폼은 차이의 복잡도에 따라 하나로 합칠지, 분리할지를 결정합니다.

**하나의 컴포넌트로 충분한 경우** — Create와 Edit의 차이가 단순할 때:

- `defaultValues`만 다른 경우 (Edit은 기존 데이터로 초기화, Create는 빈 값)
- 제목·버튼 텍스트만 다른 경우 ("생성" vs "수정")
- submit 시 호출하는 API만 다른 경우 (`POST` vs `PUT`)

이런 경우 `editData` prop의 유무로 모드를 구분하는 단일 컴포넌트가 적합합니다.

```tsx
// editData가 있으면 Edit 모드, 없으면 Create 모드
function SomethingForm({ editData }: { editData?: SomethingResponse }) {
  const isEdit = !!editData;
  const form = useForm<FormValues>({
    defaultValues: {
      name: editData?.name ?? "",
      status: editData?.status ?? true,
    },
    mode: "onChange",
  });

  const onSubmit = (data: FormValues) => {
    if (isEdit) {
      updateMutation.mutate(data);
    } else {
      createMutation.mutate(data);
    }
  };
}
```

**분리하는 것이 좋은 경우** — Create와 Edit 사이에 복잡한 차이가 있을 때:

- 폼 필드 구성이 다른 경우 (Edit에만 존재하는 필드, Create에서만 입력받는 필드)
- validation 규칙이 모드별로 다른 경우
- Edit에서 특정 필드가 읽기 전용이거나 비활성화되는 경우
- 모드별 분기(`if (isEdit)`)가 컴포넌트 전반에 퍼져 가독성이 떨어지는 경우

이런 경우 **중복 코드가 있더라도** `CreateSomethingForm`과 `EditSomethingForm`으로 분리합니다. 무리하게 하나로 합치면 조건 분기가 늘어나 유지보수가 어려워집니다.

```
components/
├── create-something-form.tsx   # Create 전용 폼
└── edit-something-form.tsx     # Edit 전용 폼
```

> 공통 UI 조각(필드 그룹 등)이 있다면 별도 컴포넌트로 추출해 재사용할 수 있지만, 폼 로직(useForm, onSubmit) 자체는 각 폼에서 독립적으로 관리합니다.

### 폼 파일 구조

간단한 폼은 단일 파일(`component-name.tsx`)로 충분합니다. 타입·상수도 같은 파일 안에 정의하면 됩니다.

폼이 복잡해져서 파일 분리가 필요한 경우에만 디렉터리 구조로 나눕니다:

```
component-name/
├── index.tsx      # 폼 컴포넌트 본체
├── type.ts        # FormValues 인터페이스 + 관련 타입 (필요 시 분리)
└── constants.ts   # 드롭다운 옵션, 체크박스 리스트 등 상수 (필요 시 분리)
```

`type.ts`, `constants.ts`는 타입이나 상수가 많아 분리하는 것이 가독성에 도움이 될 때만 만듭니다.

자세한 패턴은 각 영역별 문서를 참조하세요.
