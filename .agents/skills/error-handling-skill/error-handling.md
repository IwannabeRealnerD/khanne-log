# 에러 메시지 및 성공 메시지 처리 규칙

## 기본 원칙

- **모든 성공 메시지는 `MdsToast`를 사용합니다.**
- **모든 실패/에러 메시지는 `MdsDialog`를 사용합니다.**
- **워딩은 정중한 톤을 사용합니다.** ("~해주세요", "~되었습니다")

## 성공 메시지 (Toast)

### 사용 규칙

모든 성공 케이스는 `MdsToast.open()`을 사용하여 표시합니다.

```tsx
// ✅ 좋은 예: 성공 메시지 Toast 사용
import { MdsToast } from "@moin-design-system/overlay/Toast";

mutation.mutate(data, {
  onSuccess: () => {
    MdsToast.open("환불 요청이 완료되었습니다.");
    props.onClose();
  },
});

// ❌ 나쁜 예: 성공 메시지를 Dialog로 표시
mutation.mutate(data, {
  onSuccess: () => {
    openDialog({
      ctaButton: <MdsDialog.CtaButton>확인</MdsDialog.CtaButton>,
      description: "환불 요청이 완료되었습니다.",
      title: "성공",
    });
  },
});
```

### 워딩 가이드라인

성공 메시지는 정중한 톤으로 작성하며, 다음과 같은 패턴을 사용합니다:

- **완료**: "~이(가) 완료되었습니다."
  - 예: "환불 요청이 완료되었습니다.", "재송금 요청이 완료되었습니다."
- **생성**: "~이(가) 생성되었습니다."
  - 예: "테스트용 계좌가 생성되었습니다.", "문서가 생성되었습니다."
- **수정**: "~이(가) 수정되었습니다."
  - 예: "계정 정보가 수정되었습니다.", "설정이 수정되었습니다."
- **삭제**: "~이(가) 삭제되었습니다."
  - 예: "테스트용 계좌가 삭제되었습니다.", "데이터가 삭제되었습니다."
- **저장**: "~이(가) 저장되었습니다."
  - 예: "변경사항이 저장되었습니다."

## 에러 메시지 (Dialog)

### 사용 규칙

모든 에러 케이스는 `useMdsDialog`의 `openDialog`를 사용하여 표시합니다.

```tsx
// ✅ 좋은 예: 에러 메시지 Dialog 사용
import { useMdsDialog } from "@moin-design-system/overlay/Dialog/useDialog";
import { MdsDialog } from "@moin-design-system/overlay/Dialog";

const { openDialog } = useMdsDialog();

mutation.mutate(data, {
  onError: (error) => {
    openDialog({
      ctaButton: <MdsDialog.CtaButton>확인</MdsDialog.CtaButton>,
      description: error.message,
      title: "알 수 없는 오류 발생",
    });
  },
});

// ❌ 나쁜 예: 에러 메시지를 Toast로 표시
mutation.mutate(data, {
  onError: (error) => {
    MdsToast.open(error.message);
  },
});
```

### 에러 처리 방식 (하이브리드)

에러 처리는 하이브리드 방식을 사용합니다:

1. **기본**: API에서 받은 `error.message`를 그대로 사용합니다.
2. **중요한 에러**: 에러 코드별로 커스텀 메시지를 작성합니다.

```tsx
// ✅ 좋은 예: 기본 에러 처리
mutation.mutate(data, {
  onError: (error) => {
    openDialog({
      ctaButton: <MdsDialog.CtaButton>확인</MdsDialog.CtaButton>,
      description: error.message,
      title: "오류 발생",
    });
  },
});

// ✅ 좋은 예: 에러 코드별 커스텀 메시지
mutation.mutate(data, {
  onError: (error) => {
    switch (error.status_code) {
      case 3504:
        openDialog({
          ctaButton: <MdsDialog.CtaButton>확인</MdsDialog.CtaButton>,
          description: "이메일 확인 후 다시 시도해 주세요.",
          title: "해당 이메일과 일치하는 계정이 없습니다.",
        });
        break;
      case 3506:
        openDialog({
          ctaButton: <MdsDialog.CtaButton>확인</MdsDialog.CtaButton>,
          description: "비밀번호 확인 후 다시 시도해 주세요.",
          title: "비밀번호가 일치하지 않습니다.",
        });
        break;
      default:
        openDialog({
          ctaButton: <MdsDialog.CtaButton>확인</MdsDialog.CtaButton>,
          description: error.message,
          title: "알 수 없는 오류가 발생했습니다.",
        });
    }
  },
});
```

### 워딩 가이드라인

에러 메시지는 정중한 톤으로 작성하며, 다음과 같은 패턴을 사용합니다:

- **요청형**: "~해주세요."
  - 예: "파트너사를 선택해주세요.", "다시 시도해 주세요."
- **상태 설명**: "~이(가) 발생했습니다."
  - 예: "알 수 없는 오류가 발생했습니다.", "오류가 발생했습니다."
- **검증 실패**: "~이(가) 일치하지 않습니다." / "~이(가) 없습니다."
  - 예: "비밀번호가 일치하지 않습니다.", "해당 이메일과 일치하는 계정이 없습니다."
- **안내**: "~확인 후 다시 시도해 주세요."
  - 예: "이메일 확인 후 다시 시도해 주세요.", "입력 정보를 확인 후 다시 시도해 주세요."

## 사용 예시

### React Query Mutation

```tsx
// ✅ 좋은 예: onSuccess와 onError 올바르게 사용
import { MdsToast } from "@moin-design-system/overlay/Toast";
import { useMdsDialog } from "@moin-design-system/overlay/Dialog/useDialog";
import { MdsDialog } from "@moin-design-system/overlay/Dialog";

const { openDialog } = useMdsDialog();

const mutation = useMutation({
  mutationFn: createData,
  onSuccess: () => {
    MdsToast.open("데이터가 생성되었습니다.");
    queryClient.invalidateQueries({ queryKey: ["data"] });
  },
  onError: (error) => {
    openDialog({
      ctaButton: <MdsDialog.CtaButton>확인</MdsDialog.CtaButton>,
      description: error.message,
      title: "생성 실패",
    });
  },
});
```

### try-catch 블록

```tsx
// ✅ 좋은 예: try-catch에서 Dialog 사용
import { useMdsDialog } from "@moin-design-system/overlay/Dialog/useDialog";
import { MdsDialog } from "@moin-design-system/overlay/Dialog";

const { openDialog } = useMdsDialog();

const handleDownloadFile = async (fileId: string, fileName: string) => {
  try {
    const blob = await apiClient.downloadFile(fileId);
    // 파일 다운로드 로직
  } catch (error) {
    openDialog({
      ctaButton: <MdsDialog.CtaButton>확인</MdsDialog.CtaButton>,
      description: `파일 다운로드 중 오류가 발생했습니다: ${String(error)}`,
      dismissButton: <MdsDialog.DismissButton>취소</MdsDialog.DismissButton>,
      title: "다운로드 오류",
    });
  }
};
```

### 폼 검증 실패

```tsx
// ✅ 좋은 예: 폼 검증 실패 시 Dialog 사용
import { useMdsDialog } from "@moin-design-system/overlay/Dialog/useDialog";
import { MdsDialog } from "@moin-design-system/overlay/Dialog";

const { openDialog } = useMdsDialog();

const handleSubmit = () => {
  if (!selectedPartnerId) {
    openDialog({
      ctaButton: <MdsDialog.CtaButton>확인</MdsDialog.CtaButton>,
      description: "파트너사를 선택해주세요.",
      title: "입력 오류",
    });
    return;
  }
  // 제출 로직
};
```

## 금지 사항

### 1. 에러 메시지를 Toast로 표시하지 않기

```tsx
// ❌ 나쁜 예: 에러를 Toast로 표시
mutation.mutate(data, {
  onError: (error) => {
    MdsToast.open(error.message);
  },
});
```

### 2. 성공 메시지를 Dialog로 표시하지 않기

```tsx
// ❌ 나쁜 예: 성공을 Dialog로 표시
mutation.mutate(data, {
  onSuccess: () => {
    openDialog({
      ctaButton: <MdsDialog.CtaButton>확인</MdsDialog.CtaButton>,
      description: "요청이 완료되었습니다.",
      title: "성공",
    });
  },
});
```

### 3. alert() 사용하지 않기

```tsx
// ❌ 나쁜 예: alert 사용
catch (error) {
  alert(error.message);
}

// ✅ 좋은 예: Dialog 사용
catch (error) {
  openDialog({
    ctaButton: <MdsDialog.CtaButton>확인</MdsDialog.CtaButton>,
    description: error.message,
    title: "오류 발생",
  });
}
```

## 요약

| 메시지 타입      | 사용 컴포넌트               | 사용 시기                                 |
| ---------------- | --------------------------- | ----------------------------------------- |
| 성공 메시지      | `MdsToast`                  | 작업 완료, 생성, 수정, 삭제 성공          |
| 에러 메시지      | `MdsDialog`                 | API 에러, 검증 실패, 예외 발생            |
| 사용자 입력 안내 | `MdsToast` 또는 `MdsDialog` | 간단한 안내는 Toast, 중요한 안내는 Dialog |
