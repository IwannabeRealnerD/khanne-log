---
name: svelte-code-skill
description: Svelte 5 코드를 작성하거나 수정할 때 사용합니다. Runes 문법($props, $state, $derived, $effect), 상태 관리 규칙을 참조합니다.
globs: *.svelte, *.ts
---

# Svelte 코드 작성 스킬

이 스킬은 Svelte 5 프로젝트에서 코드를 작성할 때 따라야 할 규칙들을 포함합니다.

## 공통 규칙 참조

다음 공통 스킬들도 함께 적용됩니다:

- **TypeScript 규칙**: [typescript-skill](../../common-skills/typescript-skill/SKILL.md) 참조
- **스타일 규칙**: [style-skill](../../common-skills/style-skill/SKILL.md) 참조

## 주요 영역

Svelte 개발 시 다음 영역의 규칙을 따릅니다:

- **Svelte 5 문법**: [svelte-5-patterns.md](./svelte-5-patterns.md) - Svelte 5 최신 문법 규칙

## 빠른 참조

### Props 선언

`export let` 구문은 사용하지 않고 `$props()`를 사용합니다. 자세한 내용은 [svelte-5-patterns.md](./svelte-5-patterns.md)를 참조하세요.

### 상태 관리

반응형 변수는 `$state()`를 사용합니다. 자세한 내용은 [svelte-5-patterns.md](./svelte-5-patterns.md)를 참조하세요.

### 파생 상태

`$:` 구문은 사용하지 않고 `$derived()` 또는 `$derived.by()`를 사용합니다. 자세한 내용은 [svelte-5-patterns.md](./svelte-5-patterns.md)를 참조하세요.
