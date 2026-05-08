---
name: mds-skill
description: Moin Design System 컴포넌트 사용 규칙. MDS 컴포넌트 import, 네이밍, 스타일링 가이드라인을 참조합니다.
globs: "*.tsx"
---

# Moin Design System 스킬

이 스킬은 Moin Design System (MDS) 컴포넌트 사용 규칙을 포함합니다.

## 주요 영역

- **MDS 사용 가이드**: [design-system-usage.md](./design-system-usage.md) - 컴포넌트 import, 네이밍, 스타일링

## 빠른 참조

### Import 규칙

```typescript
// ✅ 개별 경로로 import
import { MdsButton } from "@moin-design-system/button/Button";
import { MdsTextField } from "@moin-design-system/form/TextField";
import { MdsLnb } from "@moin-design-system/navigation/Lnb";

// ❌ 잘못된 import
import { MdsButton } from "@moin-design-system";
```

### 컴포넌트 네이밍

모든 MDS 컴포넌트는 `Mds` 접두사를 사용합니다:

- `MdsButton`, `MdsTextField`, `MdsDialog`, `MdsToast`

### Design Tokens 사용

```tsx
// ✅ Design token 사용
<div className="text-primary-500 bg-gray-100 rounded-lg" />

// ❌ 하드코딩된 값
<div style={{ color: "#3b82f6", backgroundColor: "#f3f4f6" }} />
```

자세한 내용은 [design-system-usage.md](./design-system-usage.md)를 참조하세요.
