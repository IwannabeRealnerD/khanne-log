---
name: error-handling-skill
description: 에러 및 성공 메시지 처리 규칙. MdsToast(성공), MdsDialog(에러) 사용 패턴을 참조합니다.
globs: "*.tsx"
---

# 에러 처리 스킬

이 스킬은 에러 및 성공 메시지 처리 규칙을 포함합니다.

## 주요 영역

- **에러 처리 패턴**: [error-handling.md](./error-handling.md) - Toast/Dialog 사용 규칙, 워딩 가이드라인

## 빠른 참조

### 핵심 원칙

| 메시지 타입 | 사용 컴포넌트 | 사용 시기                        |
| ----------- | ------------- | -------------------------------- |
| 성공 메시지 | `MdsToast`    | 작업 완료, 생성, 수정, 삭제 성공 |
| 에러 메시지 | `MdsDialog`   | API 에러, 검증 실패, 예외 발생   |

### 성공 메시지 (Toast)

```typescript
// ✅ 좋은 예
mutation.mutate(data, {
  onSuccess: () => {
    MdsToast.open("환불 요청이 완료되었습니다.");
  },
});
```

### 에러 메시지 (Dialog)

```typescript
// ✅ 좋은 예
mutation.mutate(data, {
  onError: (error) => {
    openDialog({
      ctaButton: <MdsDialog.CtaButton>확인</MdsDialog.CtaButton>,
      description: error.message,
      title: "오류 발생",
    });
  },
});
```

자세한 내용은 [error-handling.md](./error-handling.md)를 참조하세요.
