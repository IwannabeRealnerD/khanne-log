---
name: i18n-skill
description: next-intl 번역키 규칙. 계층적 구조, 네이밍 컨벤션, Element Types를 참조합니다.
globs: "**/messages/**/*.json"
---

# i18n 스킬

이 스킬은 next-intl을 사용한 번역키 관리 규칙을 포함합니다.

## 주요 영역

- **번역키 패턴**: [translation-patterns.md](./translation-patterns.md) - 계층 구조, 네이밍 컨벤션

## 빠른 참조

### 기본 구조

`{PageName}Page.{Component}.{ElementType}.{key}[.{property}]`

### 네이밍 규칙

- **상위 depth** (Page/Component/ElementType): **PascalCase**
- **최하위 key**: **camelCase**

### Element Types

| Type      | 용도              | 예시                                             |
| --------- | ----------------- | ------------------------------------------------ |
| `Buttons` | 버튼 텍스트       | `Buttons.Save.label`                             |
| `Inputs`  | 입력 필드         | `Inputs.Email.label`, `Inputs.Email.placeholder` |
| `Errors`  | 에러 메시지       | `Errors.validationFailed`                        |
| `Success` | 성공 메시지       | `Success.saved`                                  |
| `Domains` | 도메인 필드 라벨  | `Domains.createdAt`                              |
| `Dialogs` | 다이얼로그 텍스트 | `Dialogs.DeleteConfirm.title`                    |

### 예시

```json
{
  "UserManagementPage": {
    "UserTable": {
      "Buttons": { "Edit": { "label": "편집" } },
      "Domains": { "email": "이메일", "status": "상태" }
    }
  }
}
```

자세한 내용은 [translation-patterns.md](./translation-patterns.md)를 참조하세요.
