---
name: style-skill
description: Tailwind CSS 스타일을 작성하거나 수정할 때 사용합니다. arbitrary values 지양, 시맨틱 토큰 우선, MDS 컴포넌트 우선 규칙을 참조합니다.
globs: *.tsx, *.svelte
---

# 스타일 규칙

Tailwind CSS를 사용한 스타일링의 기본 원칙입니다.

## 핵심 원칙

### 1. Arbitrary Values 지양

`[]` 문법을 사용한 하드코딩을 지양하고 디자인 토큰을 사용합니다.

```tsx
// ❌ 나쁜 예
<div className="text-[#1a1b22] text-[14px] h-[56px]">텍스트</div>

// ✅ 좋은 예
<div className="text-contents-primary typo-14 h-14">텍스트</div>
```

### 2. Semantic Token 우선

Core Color보다 의미론적 System Token을 필수로 사용합니다.

```tsx
// ❌ 나쁜 예: Core Color
<div className="bg-gray-50 text-gray-900">배경</div>

// ✅ 좋은 예: System Token
<div className="bg-surface-secondary text-contents-primary">배경</div>
```

### 3. MDS 컴포넌트 우선

커스텀 스타일링보다 MDS(Moin Design System) 컴포넌트를 우선적으로 사용합니다.

### 4. 모바일 우선 설계

반응형 디자인은 모바일 우선으로 설계합니다.

```tsx
// 모바일 → 태블릿 → 데스크탑 순서
<div className="p-4 md:p-6 lg:p-8">콘텐츠</div>
```

## 세부 규칙

디자인 토큰의 전체 목록과 상세 제약 사항은 [design-tokens.md](./design-tokens.md)를 참조하세요.
