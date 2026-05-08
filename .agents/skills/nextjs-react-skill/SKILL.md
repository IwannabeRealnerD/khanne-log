---
name: nextjs-react-skill
description: Next.js + React 코드를 작성하거나 수정할 때 사용합니다. 컴포넌트 패턴, 파일 구조, Page/Layout 규칙을 참조합니다.
globs: "*.tsx", "*.ts"
---

# Next.js + React 코드 작성 스킬

이 스킬은 Next.js App Router 기반 React 프로젝트에서 코드를 작성할 때 따라야 할 핵심 규칙들을 포함합니다.

## 공통 규칙 참조

다음 공통 스킬들도 함께 적용됩니다:

- **TypeScript 규칙**: [typescript-skill](../common-skills/typescript-skill/SKILL.md) 참조
- **스타일 규칙**: [style-skill](../common-skills/style-skill/SKILL.md) 참조
- **파일 구조 규칙**: [file-structure-skill](../file-structure-skill/SKILL.md) 참조

## 주요 영역

Next.js + React 개발 시 다음 영역의 규칙을 따릅니다:

- **컴포넌트 패턴**: [component-patterns.md](./component-patterns.md) - Props 참조 방식, 컴포넌트 구조
- **파일 구조**: [file-structure-skill](../file-structure-skill/SKILL.md) - 모노레포 환경의 파일 조직, 기능별 코로케이션
- **Page & Layout**: [page-layout-patterns.md](./page-layout-patterns.md) - Page, Layout, Params, Route Groups
- **폴리모픽 컴포넌트**: [polymorphic-components.md](./polymorphic-components.md) - as 프롭 기반 폴리모픽 컴포넌트

## 관련 스킬 (분리됨)

다음 스킬들은 별도로 분리되어 각자의 글롭 패턴에 따라 자동 적용됩니다:

| 스킬                                                           | 설명                   | 글롭 패턴                      |
| -------------------------------------------------------------- | ---------------------- | ------------------------------ |
| [api-client-skill](../api-client-skill/SKILL.md)               | API 클라이언트 구조화  | `**/apis/client.ts`            |
| [tanstack-query-skill](../tanstack-query-skill/SKILL.md)       | React Query 훅 패턴    | `**/apis/hooks/**/*.ts(x)`     |
| [query-key-factory-skill](../query-key-factory-skill/SKILL.md) | QueryKeyFactory 패턴   | `**/query-key-factory/**/*.ts` |
| [nuqs-skill](../nuqs-skill/SKILL.md)                           | URL 쿼리 상태 관리     | `**/*QueryStates*.ts(x)`       |
| [error-handling-skill](../error-handling-skill/SKILL.md)       | Toast/Dialog 에러 처리 | `*.tsx`                        |
| [mds-skill](../mds-skill/SKILL.md)                             | Moin Design System     | `*.tsx`                        |
| [i18n-skill](../i18n-skill/SKILL.md)                           | 번역키 규칙            | `**/messages/**/*.json`        |

## 빠른 참조

### Props 참조

Props는 구조분해할당하지 않고 `props.` 형태로 참조합니다. 자세한 내용은 [component-patterns.md](./component-patterns.md)를 참조하세요.

```tsx
// ✅ 좋은 예
function UserCard(props: Props) {
  return (
    <div onClick={props.onClick}>
      <span>{props.name}</span>
    </div>
  );
}
```

### 파일 구조

기능별 코로케이션 원칙을 따릅니다. 자세한 내용은 [file-structure-skill](../file-structure-skill/SKILL.md)을 참조하세요.

### Page & Layout

Page, Layout 작성 및 Params 처리 규칙은 [page-layout-patterns.md](./page-layout-patterns.md)를 참조하세요.
