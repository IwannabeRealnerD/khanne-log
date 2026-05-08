# 모달 안의 폼 패턴

모달(`MdsModal`) 안에 폼이 존재하는 경우의 구현 패턴입니다.

기본적인 useForm 설정, MDS 컴포넌트 연동, 조건부 필드, 파일 구조 규칙은 [SKILL.md](./SKILL.md)를 참조하세요.

## 핵심 구조

모달의 CTA 버튼이 폼 외부에 있으므로, `formId`로 `<form>`과 CTA 버튼을 연결합니다.

```tsx
const EditModal: FunctionComponent<EditModalProps> = (props) => {
  const formId = useId();
  const form = useForm<FormValues>({ ... });

  const onSubmit = (values: FormValues) => { ... };

  return (
    <MdsModal
      closeOnDimmedClick
      ctaButton={
        <MdsModal.CtaButton form={formId} type="submit">
          저장
        </MdsModal.CtaButton>
      }
      onClose={props.onClose}
    >
      <form id={formId} onSubmit={form.handleSubmit(onSubmit)}>
        {/* 폼 필드들 */}
      </form>
    </MdsModal>
  );
};
```

**포인트:**

- `useId()`로 고유 `formId` 생성
- `<form id={formId}>`와 `<MdsModal.CtaButton form={formId} type="submit">`으로 연결
- `form.handleSubmit(onSubmit)`을 `<form onSubmit>`에 바인딩
