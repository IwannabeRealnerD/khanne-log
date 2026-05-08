# Translation Key Guidelines

## Overview

번역키는 영어로 작성하며, 계층적 구조를 통해 체계적으로 관리합니다.

## 빠른 참조

### 핵심 패턴

- **기본 구조**: `{PageName}Page.{Component}.{ElementType}.{key}[.{property}]`
- **네이밍 규칙**:
  - 상위 depth (Page/Component/ElementType): **PascalCase**
  - 최하위 key: **camelCase** (소문자로 시작)
- **Element Types**: `Buttons`, `Dialogs`, `Domains`, `Errors`, `Inputs`, `Menus`, `Options`, `Placeholders`, `Status`, `Success`, `Switch`

### 주요 규칙

- ✅ 영어로 번역키 작성
- ✅ 계층적 구조 유지 (Page > Component > Element Type)
- ✅ 일관된 패턴 사용
- ✅ **번역키 변경 시 한글/영어 번역 파일 모두 업데이트 필수**
- ❌ flat 구조 사용 금지
- ❌ 중복 키 생성 금지
- ❌ snake_case, kebab-case 사용 금지

## 구조 규칙

### 1. 계층 구조

기본 패턴: `{Scope}.{Component}.{ElementType}.{key}[.{property}]`

#### Depth별 설명

**Scope (1depth)**: Page 단위 또는 공통 스코프

- Page: `{PageName}Page` (예: `UserManagementPage`, `LoginPage`)
- 공통: `Common` (여러 페이지에서 공통으로 사용하는 요소만 포함)
  - ⚠️ **제한사항**: `Common` 스코프에는 `Menus`와 `Domains`를 우선적으로 포함하고, 다른 Element Types(`Buttons`, `Dialogs`, `Inputs`, `Options`, `Placeholders`, `Status`, `Success`, `Switch` 등)는 최대한 지양합니다.
  - ✅ **예외**: `Errors` 중에서 최대한 General한 것들(예: `unknownError`, `networkError` 등)은 `Common`에 포함할 수 있습니다.

**Component (2depth)**: 의미 있는 컴포넌트 단위

- 예: `FilterSection`, `UserTable`, `UserEditModal`, `LoginForm`, `Page`
- 페이지 메타데이터는 `Page` 컴포넌트로 표현
- Modal, Dialog 등은 컴포넌트명을 직접 사용 (예: `UserEditModal`, `DeleteConfirmModal`)

**ElementType (3depth)**: 역할별 그룹

- 실제 문자열 값을 가지는 필드들을 역할에 따라 분류
- 자세한 Element Types는 [네이밍 컨벤션 - Element Types](#element-types-3depth) 섹션 참조

**key / property (4depth 이후)**: 실제 문자열을 가지는 필드 및 부가 속성

- 예: `UserManagementPage.FilterSection.Buttons.Save.label`
- 예: `UserManagementPage.UserEditModal.Errors.validationFailed`

#### 컴포넌트 레벨 메타데이터

컴포넌트의 최상위 레벨에서 `title`, `description` 같은 메타데이터를 직접 정의할 수 있습니다. 이는 ElementType을 거치지 않고 컴포넌트 바로 하위에 위치합니다.

- 예: `UserManagementPage.UserEditModal.title` → "사용자 편집"
- 예: `UserManagementPage.UserEditModal.description` → "사용자 정보를 수정합니다."

#### Error, Success Message 패턴

Errors와 Success 그룹에서는 `message` 속성을 사용하지 않고, 에러/성공 키에 바로 문자열을 매핑합니다.

- ✅ 올바른 예: `Errors.validationFailed` → "유효성 검사에 실패했습니다."
- ❌ 잘못된 예: `Errors.validationFailed.message` → "유효성 검사에 실패했습니다."

Success도 동일한 패턴을 따릅니다:

- ✅ 올바른 예: `Success.saved` → "저장에 성공했습니다."

### 2. 네이밍 컨벤션

#### Page Level (1depth)

- 형식: `{PageName}Page`
- 예시: `UserManagementPage`, `TransactionListPage`, `LoginPage`

#### Component Level (2depth)

- 의미있는 컴포넌트명 사용 (PascalCase)
- 예시: `FilterSection`, `UserTable`, `UserEditModal`, `LoginForm`
- 페이지 메타데이터는 `Page` 컴포넌트로 표현

#### Element Types (3depth)

Element Types는 역할별로 문자열 값들을 그룹화합니다. 각 타입은 PascalCase로 작성합니다.

- **`Buttons`**: 버튼 텍스트

  - 구조: `Buttons.{ButtonName}.label`
  - 예: `Buttons.Save.label` → "저장"

- **`Dialogs`**: 다이얼로그 관련 텍스트

  - 구조: `Dialogs.{DialogName}.{property}` (title, description, Buttons 등)
  - 예: `Dialogs.DeleteConfirm.title` → "삭제하시겠습니까?"

- **`Domains`**: 도메인 필드 라벨

  - 테이블 컬럼, 상세 정보 필드 등에 사용
  - 구조: `Domains.{fieldName}` → "필드명"
  - 예: `Domains.createdAt` → "생성일"
  - 상태 값 라벨이 도메인 필드와 관련된 경우 `Domains.Status.{statusKey}` 형태로 포함 가능
  - 예: `Domains.Status.Active` → "활성"

- **`Errors`**: 에러 메시지

  - 구조: `Errors.{errorKey}` → "에러 메시지"
  - 예: `Errors.validationFailed` → "유효성 검사에 실패했습니다."

- **`Inputs`**: 입력 필드 (label, placeholder 포함)

  - 구조: `Inputs.{FieldName}.label` 또는 `Inputs.{FieldName}.placeholder`
  - 예: `Inputs.Email.label` → "이메일", `Inputs.Email.placeholder` → "이메일을 입력하세요"

- **`Menus`**: 메뉴 항목

  - 네비게이션 메뉴, 사이드바 메뉴 등에 사용
  - 구조: `Menus.{menuKey}` → "메뉴명"
  - 예: `Menus.home` → "홈"

- **`Options`**: 선택 옵션

  - 드롭다운, 라디오 버튼 등에 사용
  - 구조: `Options.{optionKey}` → "옵션명"
  - 예: `Options.allUsers` → "전체 사용자"

- **`Placeholders`**: 단독 placeholder 텍스트

  - Inputs와 분리하여 사용하는 placeholder
  - 구조: `Placeholders.{fieldName}` → "placeholder 텍스트"
  - 예: `Placeholders.search` → "검색어를 입력하세요"

- **`Status`**: 상태 값 라벨

  - 활성/비활성, 진행중/완료 등 상태 표시에 사용
  - 구조: `Status.{statusKey}` → "상태명" 또는 `Domains.Status.{statusKey}` → "상태명"
  - 독립적으로 사용: `Status.active` → "활성"
  - Domains 안에 포함: `Domains.Status.Active` → "활성" (도메인 필드와 관련된 상태 값인 경우)

- **`Success`**: 성공 메시지

  - 구조: `Success.{successKey}` → "성공 메시지"
  - 예: `Success.saved` → "저장에 성공했습니다."

- **`Switch`**: 스위치 토글 관련 텍스트
  - 구조: `Switch.{switchKey}` → "스위치 라벨"
  - 예: `Switch.enableNotifications` → "알림 활성화"

#### 최하위 Key 네이밍 (4depth 이후)

실제 문자열 값을 가진 최하위 depth의 key는 **camelCase**로 작성합니다.

- 예: `validationFailed`, `createdAt`, `email`, `allUsers`
- 예: `Save`, `Cancel` (Buttons의 경우 컴포넌트명이므로 PascalCase)

### 3. 일관된 패턴

#### Buttons

```json
"Buttons": {
  "Save": { "label": "저장" },
  "Cancel": { "label": "취소" }
}
```

#### Inputs

```json
"Inputs": {
  "Email": {
    "label": "이메일",
    "placeholder": "이메일을 입력하세요"
  }
}
```

#### Errors

```json
"Errors": {
  "validationFailed": "유효성 검사에 실패했습니다."
}
```

#### Success

```json
"Success": {
  "saved": "저장에 성공했습니다."
}
```

#### Domains

```json
"Domains": {
  "createdAt": "생성일",
  "email": "이메일",
  "status": "상태",
  "Status": {
    "Active": "활성",
    "Inactive": "비활성"
  }
}
```

## 예시 구조

```json
{
  "Common": {
    "Domains": {
      "createdAt": "생성일",
      "status": "상태",
      "updatedAt": "최종 수정일"
    },
    "Errors": {
      "networkError": "네트워크 오류가 발생했습니다.",
      "unknownError": "알 수 없는 오류가 발생했습니다."
    },
    "Menus": { "dashboard": "대시보드", "home": "홈", "settings": "설정" }
  },
  "UserManagementPage": {
    "FilterSection": {
      "Inputs": { "email": { "placeholder": "이메일 검색" } },
      "Options": {
        "allUsers": "전체 사용자",
        "disabled": "비활성",
        "enabled": "활성"
      }
    },
    "Page": {
      "Buttons": { "AddUser": { "label": "사용자 추가" } },
      "description": "시스템 사용자를 관리합니다.",
      "title": "사용자 관리"
    },
    "UserEditModal": {
      "Buttons": { "Cancel": { "label": "취소" }, "Save": { "label": "저장" } },
      "Dialogs": {
        "DeleteConfirm": {
          "Buttons": {
            "Cancel": { "label": "취소" },
            "Confirm": { "label": "삭제" }
          },
          "description": "이 작업은 되돌릴 수 없습니다.",
          "title": "사용자를 삭제하시겠습니까?"
        }
      },
      "Errors": {
        "deleteFailed": "사용자 삭제에 실패했습니다.",
        "emailDuplicated": "이미 존재하는 이메일입니다."
      },
      "Inputs": {
        "email": {
          "label": "사용자 이메일",
          "placeholder": "이메일을 입력하세요"
        },
        "role": { "label": "역할" }
      },
      "description": "사용자 정보를 수정합니다.",
      "title": "사용자 편집"
    },
    "UserTable": {
      "Buttons": { "Delete": { "label": "삭제" }, "Edit": { "label": "편집" } },
      "Domains": {
        "createdAt": "생성일",
        "email": "이메일",
        "role": "역할",
        "status": "계정 상태"
      }
    }
  }
}
```

## 규칙

### DO

1. **영어로 번역키 작성**: 모든 번역키는 영어로 작성
2. **대소문자 규칙 분리**:
   - Page / Component / ElementType와 같은 상위 depth 키는 **PascalCase**로 작성
   - 실제 string 값을 가진 최하위 depth의 key는 **camelCase**로 작성 (예: `validationFailed`, `createdAt`, `email`)
3. **계층적 구조 유지**: Page > Component > Element Type 구조 준수
4. **일관된 패턴**: 동일한 타입의 요소는 동일한 구조 사용
5. **의미있는 이름**: 키 이름만으로도 용도를 알 수 있도록 작성
6. **공통 요소 분리**: 여러 페이지에서 사용하는 요소는 `Common` 스코프로 분리
7. **번역 파일 동시 업데이트 필수**: 번역키를 추가, 수정, 삭제할 때는 반드시 한글 번역 파일(`ko/{app}/dashboard.json` 등)과 영어 번역 파일(`en/{app}/dashboard.json` 등) 모두에 동일한 구조로 업데이트해야 합니다.

### DON'T

1. **flat 구조 사용 금지**: 모든 요소는 적절한 그룹 내에 위치
2. **중복 키 생성 금지**: 같은 의미의 번역키를 여러 곳에 중복 생성하지 않음
3. **snake_case, kebab-case 사용 금지**: PascalCase와 camelCase만 사용
4. **한글 키 사용 금지**: 모든 키는 영어로 작성
5. **Common 스코프 남용 금지**: `Common` 스코프에 `Menus`, `Domains` 외의 Element Types를 추가하는 것을 최대한 지양합니다.
