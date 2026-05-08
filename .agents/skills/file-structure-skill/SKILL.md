---
name: file-structure
description: 파일 구조를 결정하거나 새 파일을 배치할 때 사용합니다. 리소스 배치 의사결정 플로우, 컴포넌트 구조 원칙, 명명 규칙, UI suffix 규칙을 참조합니다.
globs: "*.tsx", "*.ts", "*.svelte"
---

# 파일 구조 가이드라인

## Overview

이 문서는 모노레포(`apps/`) 환경에서의 파일 구조 가이드입니다. App Router, 사용 범위에 따른 계층적 배치 원칙을 따릅니다.

### 리소스 배치 의사결정 플로우

새 파일(컴포넌트, 훅, 유틸, 타입 등)을 배치할 때 다음 3단계 계층 순서로 판단합니다:

```
1. 전역 (src/)          — 두 개 이상의 페이지에서 사용하는 리소스
2. 페이지 디렉터리      — 해당 페이지 내 여러 컴포넌트가 공유하는 리소스
3. 컴포넌트 레벨        — 특정 컴포넌트 하나만 사용하는 리소스 → "파일 단위 관리" 규칙 적용
```

**판단 순서:**

1. 이 리소스를 두 개 이상의 페이지에서 사용하는가? → **Yes**: `src/` 하위 공용 디렉터리에 배치
2. 이 리소스를 해당 페이지 내 여러 컴포넌트가 공유하는가? → **Yes**: 페이지 디렉터리의 `hooks/`, `utils/`, `components/`에 배치
3. 특정 컴포넌트 하나만 사용하는가? → **Yes**: 해당 컴포넌트와 같은 레벨에 파일 단위로 배치 (→ [컴포넌트 구조 원칙](#컴포넌트-구조-원칙) 참조)

## App 라우팅 구조

### 번역키가 적용된 프로젝트의 경우

```
app/[locale]/
├─ (protected)/
│  ├─ (without-side-sheet)/
│  │  ├─ balance/{components,hooks,utils}/, page.tsx
│  │  └─ transactions/{components,hooks}/, page.tsx
│  └─ (with-side-sheet)/
│     └─ transactions/[id]/{components,utils}/, page.tsx
└─ (unprotected)/login/page.tsx
```

### 번역키가 없는 프로젝트의 경우

```
app/
├─ (protected)/
│  ├─ (without-side-sheet)/
│  │  ├─ balance/{components,hooks,utils}/, page.tsx
│  │  └─ transactions/{components,hooks}/, page.tsx
│  └─ (with-side-sheet)/
│     └─ transactions/[id]/{components,utils}/, page.tsx
└─ (unprotected)/login/page.tsx
```

## 라우팅 규칙

- 하위에 `(protected)`와 `(unprotected)`로 접근 제어를 분리합니다.
- 동적 세그먼트는 `[id]`를 사용합니다.
- 기능 단위 폴더(페이지 디렉터리) 내부에 `components/`, `hooks/`, `utils/`를 함께 배치합니다(코로케이션).

## API/데이터 규칙

- HTTP 클라이언트 설정은 `apis/client.ts`에 둡니다.
- 서버 통신은 `apis/hooks/*`의 React Query 훅으로 일원화합니다. 예: `useGlobalGetTransferList`.
- 캐시 키는 `query-key-factory/*`에서 생성합니다. 예: `transfer.ts`, `user.ts`.
- 서버 스키마 관련 타입은 필요 시 `types/`에 정의합니다.

## 사용 범위에 따른 리소스 배치

```
# [1단계: 전역] 두 개 이상의 페이지에서 사용 → src/ 하위 공용 디렉터리
/apps/[project-name]/src/
├─ hooks/                     # 여러 페이지에서 공유하는 훅
├─ components/                # 여러 페이지에서 공유하는 컴포넌트
└─ utils/                     # 여러 페이지에서 공유하는 유틸

# [2단계: 페이지 디렉터리] 해당 페이지 내 여러 컴포넌트가 공유 → 페이지 디렉터리에 배치
/apps/[project-name]/src/app/[locale]/(protected)/(without-side-sheet)/transactions/
├─ page.tsx                   # 페이지 컴포넌트
├─ components/                # 이 페이지 내 여러 컴포넌트가 공유하는 컴포넌트
│  ├─ submit-button.tsx        # 파일 단위 관리
│  ├─ use-submit-button.ts     # SubmitButton 전용 훅 → 컴포넌트와 같은 레벨에 배치 [3단계]
│  ├─ submit-button-types.ts   # SubmitButton 전용 타입 → 컴포넌트와 같은 레벨에 배치 [3단계]
│  └─ complex-form/            # 하위 컴포넌트가 필요할 때만 폴더 구조
│     ├─ index.tsx             # 메인 컴포넌트
│     ├─ form-field.tsx        # 하위 컴포넌트
│     └─ form-section.tsx      # 하위 컴포넌트
├─ hooks/                      # 이 페이지 내 여러 컴포넌트가 공유하는 훅
│  └─ use-transaction-list-page-query-states.tsx
└─ utils/                      # 이 페이지 내 여러 컴포넌트가 공유하는 유틸
   └─ format-transaction-date.ts
```

## 컴포넌트 구조 원칙

### 파일 단위 관리 우선

- 기본적으로 컴포넌트는 파일 단위로 관리합니다 (`component-name.tsx`)
- 해당 컴포넌트 전용 관련 파일들(훅, 타입, 유틸)도 같은 레벨에 배치합니다
- 파일이 5개 미만일 때는 하위 폴더(`components/`, `hooks/`)를 만들지 않습니다

```tsx
// ✅ 좋은 예: 파일이 적을 때 (5개 미만)
components/
├─ submit-button.tsx
├─ use-submit-button.ts         // SubmitButton 전용 훅
├─ submit-button-types.ts       // SubmitButton 전용 타입
└─ get-submit-button-style.ts   // SubmitButton 전용 유틸
```

### 폴더 구조는 필요할 때만 사용

- 컴포넌트 내부에 하위 컴포넌트가 필요할 때만 `component-name/index.tsx` 구조를 사용합니다
- 2depth 이상의 컴포넌트는 지양합니다 (필요할 때만 추가)
- 파일이 5개 이상일 때만 구분을 위해 하위 폴더를 추가합니다

```tsx
// ✅ 좋은 예: 하위 컴포넌트가 필요할 때만 폴더 구조
components/
└─ complex-form/
   ├─ index.tsx           # 메인 컴포넌트
   ├─ form-field.tsx      # 하위 컴포넌트
   └─ form-section.tsx    # 하위 컴포넌트

// ✅ 좋은 예: 파일이 많아질 때만 하위 폴더 분리 (5개 이상)
components/
├─ components/
│  ├─ button.tsx
│  ├─ input.tsx
│  └─ select.tsx
├─ hooks/
│  ├─ use-button.ts
│  ├─ use-input.ts
│  └─ use-select.ts
└─ types.ts
```

## 명명 규칙

- 컴포넌트: `kebab-case.tsx` (예: `filter-section.tsx`)
- 훅: `use-xxx.ts` 또는 `use-xxx.tsx` (예: `use-balance-history-filter.tsx`)
- 유틸/상수: `kebab-case.ts` (예: `get-is-plus.ts`)
- API 훅: `use-<action>-<domain>.tsx` (예: `use-post-user.tsx`)
- 쿼리키: 도메인 단위 파일명 (예: `transfer.ts`, `user.ts`)

### 컴포넌트 UI 요소 suffix 규칙

`components/` 디렉터리 내의 컴포넌트는 **UI 요소 타입을 suffix로 포함**해야 합니다.

| UI 요소 | suffix    | 예시                                       |
| ------- | --------- | ------------------------------------------ |
| 버튼    | `Button`  | `submit-button.tsx`, `cancel-button.tsx`   |
| 테이블  | `Table`   | `user-table.tsx`, `transaction-table.tsx`  |
| 모달    | `Modal`   | `confirm-modal.tsx`, `detail-modal.tsx`    |
| 입력    | `Input`   | `search-input.tsx`, `email-input.tsx`      |
| 선택    | `Select`  | `country-select.tsx`, `status-select.tsx`  |
| 섹션    | `Section` | `filter-section.tsx`, `header-section.tsx` |
| 폼      | `Form`    | `login-form.tsx`, `signup-form.tsx`        |
| 카드    | `Card`    | `user-card.tsx`, `product-card.tsx`        |
| 리스트  | `List`    | `item-list.tsx`, `notification-list.tsx`   |
| 패널    | `Panel`   | `side-panel.tsx`, `detail-panel.tsx`       |

```tsx
// ❌ 나쁜 예: UI 요소 타입이 불명확
components/
├─ confirm.tsx
├─ user.tsx
└─ filter.tsx

// ✅ 좋은 예: UI 요소 타입이 명확
components/
├─ confirm-modal.tsx
├─ user-table.tsx
└─ filter-section.tsx
```

## 금지/지양 사항

- 기능과 무관한 상위 폴더로의 불필요한 의존 역전 금지.
