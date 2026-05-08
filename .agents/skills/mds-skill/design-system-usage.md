# Moin Design System 컴포넌트 사용 가이드라인

## Overview

Moin Design System은 Tailwind CSS 기반의 디자인 시스템 컴포넌트 라이브러리입니다.
MDS를 사용하여 컴포넌트 또는 기능 개발시 사용해주세요.

## Package Structure

```
packages/moin-design-system/
├── src/
│   ├── button/          # 버튼 컴포넌트 (Button, IconButton, TextButton)
│   ├── chat/            # 채팅 컴포넌트 (Bubble)
│   ├── constants/       # 색상 상수
│   ├── control/         # 컨트롤 컴포넌트 (Checkbox, RadioButton, Switch)
│   ├── dev/             # 개발용 컴포넌트 (MdsProvider, Dimmed, Popover)
│   ├── feedback/        # 피드백 컴포넌트 (Spinner)
│   ├── form/            # 폼 컴포넌트 (Dropdown, SearchBar, TextArea, TextField)
│   ├── navigation/      # 네비게이션 컴포넌트 (Breadcrumb, Lnb, Tab)
│   ├── overlay/         # 오버레이 컴포넌트 (Dialog, FloatingPanel, Modal, Toast, Tooltip)
│   ├── picker/          # 피커 컴포넌트 (DatePicker)
│   ├── section/         # 섹션 컴포넌트 (Top)
│   ├── styles/          # 스타일 정의 (colors.css, typography.css, utilities.css)
│   ├── tag/             # 태그 컴포넌트 (Chip, Signal, StatusBadge)
│   ├── utils/           # 유틸리티 함수
│   └── viewer/          # 뷰어 컴포넌트 (FilePreview)
```

## Component Naming Convention

- 모든 컴포넌트는 `Mds` 접두사를 사용합니다
  - 예: `MdsButton`, `MdsLnb`, `MdsTextField`, `MdsDialog`
- 컴포넌트 파일명은 kebab-case를 사용합니다
  - 예: `button.tsx`, `text-field.tsx`
- 관련 컴포넌트는 같은 디렉토리에 그룹화됩니다
  - 예: `button/` 디렉토리에 `button.tsx`, `icon-button.tsx`, `text-button.tsx`

## Import Rules

```tsx
// 개별 경로로 import
import { MdsButton } from "@moin-design-system/button/button";
import { MdsTextField } from "@moin-design-system/form/text-field";
import { MdsLnb } from "@moin-design-system/navigation/lnb";
import type {
  Category,
  UtilityCategory,
} from "@moin-design-system/navigation/lnb";
```

## Development Guidelines

### Component Development

1. **CVA (Class Variance Authority) 사용**: 모든 variant는 `cva`를 사용하여 정의
2. **ForwardRef 사용**: 모든 컴포넌트는 `React.forwardRef`로 구현
3. **TypeScript**: 모든 props는 타입 정의 필수
4. **Accessibility**:
   - 적절한 ARIA 속성 추가 (예: `aria-label`, `aria-describedby`)
   - 키보드 네비게이션 지원 (Tab, Enter, Escape 등)
   - 포커스 관리 (visible focus indicator)
   - 스크린 리더 호환성 확인

## Best Practices

### Component Usage

1. **MDS 컴포넌트 우선 사용**: 커스텀 컴포넌트보다 MDS 컴포넌트를 우선적으로 사용
2. **Props 전달**: 필요한 props만 전달하고 불필요한 커스터마이징 지양
3. **Accessibility**: 키보드 네비게이션과 스크린 리더 지원 확인

### Styling

1. **Design Tokens 사용**: 하드코딩된 색상/크기 대신 design token 사용

```tsx
// Good: Design token 사용
<div className="text-primary-500 bg-gray-100 rounded-lg" />

// Bad: 하드코딩된 값
<div style={{ color: "#3b82f6", backgroundColor: "#f3f4f6" }} />
```

2. **Responsive Design**: 모바일 우선 설계
3. **Dark Mode**: 자동 다크모드 지원 (CSS 변수 기반)

## Troubleshooting

### Common Issues

1. **Import 경로 오류**

```tsx
// ❌ 잘못된 import
import { MdsButton } from "@moin-design-system";

// ✅ 올바른 import
import { MdsButton } from "@moin-design-system/button/button";
```

2. **MdsProvider 누락**

```tsx
// MDS 컴포넌트 사용 전 MdsProvider로 앱을 감싸야 합니다
import { MdsProvider } from "@moin-design-system/dev/mds-provider";

<MdsProvider>
  <App />
</MdsProvider>;
```

3. **Tailwind CSS 설정 오류**

- `tailwind.config.js`에 MDS 경로가 포함되어 있는지 확인
- Tailwind CSS가 프로젝트에 올바르게 설치되어 있는지 확인

4. **TypeScript 타입 오류**

- 컴포넌트 props 타입이 올바른지 확인
- 필수 props가 모두 전달되었는지 확인

```tsx
// ❌ 필수 props 누락
<MdsButton>클릭</MdsButton>

// ✅ 올바른 사용
<MdsButton variant="primary">클릭</MdsButton>
```

5. **스타일이 적용되지 않는 경우**

- CSS 파일이 올바르게 import 되었는지 확인
- Tailwind의 purge/content 설정 확인

이 규칙들을 참고하여 기능 구현에 참고해주세요.
