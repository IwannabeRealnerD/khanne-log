# Svelte 5 문법 규칙

이 프로젝트는 Svelte 5를 사용합니다. Svelte 4 이하의 구버전 문법은 절대 사용하지 않습니다.

## Props 선언

- **`export let` 구문은 절대 사용하지 않습니다.**
- **`$props()`를 사용하여 props를 선언합니다.**

```svelte
<!-- ❌ 나쁜 예: Svelte 4 문법 -->
<script lang="ts">
  export let name: string;
  export let age: number = 0;
</script>

<!-- ✅ 좋은 예: Svelte 5 문법 -->
<script lang="ts">
  interface Props {
    name: string;
    age?: number;
  }

  let { name, age = 0 }: Props = $props();
</script>
```

## 상태 관리

- **반응형 `let` 변수는 사용하지 않습니다.**
- **`$state()`를 사용하여 반응형 상태를 선언합니다.**

```svelte
<!-- ❌ 나쁜 예: Svelte 4 문법 -->
<script lang="ts">
  let count = 0;
  let items: string[] = [];
</script>

<!-- ✅ 좋은 예: Svelte 5 문법 -->
<script lang="ts">
  let count = $state(0);
  let items = $state<string[]>([]);
</script>
```

## 파생 상태 (Derived State)

- **`$:` 구문은 절대 사용하지 않습니다.**
- **`$derived()` 또는 `$derived.by()`를 사용합니다.**

```svelte
<!-- ❌ 나쁜 예: Svelte 4 문법 -->
<script lang="ts">
  let count = 0;
  $: doubled = count * 2;
  $: sum = a + b;
</script>

<!-- ✅ 좋은 예: Svelte 5 문법 -->
<script lang="ts">
  let count = $state(0);
  const doubled = $derived(count * 2);

  // 복잡한 로직이 필요한 경우
  const sum = $derived.by(() => {
    return a + b;
  });
</script>
```

## 사이드 이펙트

- **`$:` 구문을 사이드 이펙트에 사용하지 않습니다.**
- **`$effect()`를 사용합니다.**

```svelte
<!-- ❌ 나쁜 예: Svelte 4 문법 -->
<script lang="ts">
  let count = 0;
  $: {
    console.log('count changed:', count);
  }
</script>

<!-- ✅ 좋은 예: Svelte 5 문법 -->
<script lang="ts">
  let count = $state(0);
  $effect(() => {
    console.log('count changed:', count);
  });
</script>
```

## 양방향 바인딩 (Bindable Props)

- **`export let` + `bind:` 조합은 사용하지 않습니다.**
- **`$bindable()`을 사용합니다.**

```svelte
<!-- ❌ 나쁜 예: Svelte 4 문법 -->
<script lang="ts">
  export let value: string;
</script>
<input bind:value />

<!-- ✅ 좋은 예: Svelte 5 문법 -->
<script lang="ts">
  interface Props {
    value: string;
  }

  let { value = $bindable() }: Props = $props();
</script>
<input bind:value />

<!-- 사용 예시 -->
<!-- 부모 컴포넌트 -->
<ChildComponent bind:value={myValue} />
```

## 이벤트 핸들러

- **`on:click`, `on:submit` 등 구버전 이벤트 핸들러 구문은 사용하지 않습니다.**
- **`onclick`, `onsubmit` 등 HTML 표준 속성을 사용합니다.**

```svelte
<!-- ❌ 나쁜 예: Svelte 4 문법 -->
<button on:click={handleClick}>Click me</button>
<form on:submit={handleSubmit}>

<!-- ✅ 좋은 예: Svelte 5 문법 -->
<button onclick={handleClick}>Click me</button>
<form onsubmit={handleSubmit}>
```

**주의**: 커스텀 이벤트의 경우 `on:custom-event` 구문을 계속 사용할 수 있습니다.

## SvelteKit 스토어

- **`$app/stores`의 `page`는 절대 사용하지 않습니다.**
- **`$app/state`의 `page`를 사용합니다.**

```svelte
<!-- ❌ 나쁜 예: Svelte 4 문법 -->
<script lang="ts">
  import { page } from "$app/stores";
</script>

<div>
  {$page.url.pathname}
</div>

<!-- ✅ 좋은 예: Svelte 5 문법 -->
<script lang="ts">
  import { page } from "$app/state";
</script>

<div>
  {page.url.pathname}
</div>
```

## 스니펫 (Snippets)

- **슬롯(`<slot />`)은 절대 사용하지 않습니다.**
- **모든 템플릿 재사용은 `{#snippet}`을 사용합니다.**
- **스니펫을 렌더링할 때는 `{@render}`를 사용합니다.**

스니펫은 컴포넌트 내에서 반복되는 마크업을 재사용하거나, 조건부로 다른 위치에서 렌더링할 때 사용합니다. 컴포넌트 간 콘텐츠 전달이 필요할 때도 슬롯 대신 스니펫을 사용합니다.

### 기본 사용법

```svelte
<!-- ✅ 좋은 예: 스니펫 정의 및 사용 -->
<script lang="ts">
  let items = $state<string[]>(['item1', 'item2']);
</script>

{#snippet ItemList(items: string[])}
  <ul>
    {#each items as item}
      <li>{item}</li>
    {/each}
  </ul>
{/snippet}

<div>
  {@render ItemList(items)}
</div>
```

### 파라미터가 있는 스니펫

```svelte
<!-- ✅ 좋은 예: 타입이 지정된 파라미터 -->
<script lang="ts">
  let invalidFormKeys = $state<string[]>([]);
  let focusedField = $state<string | null>(null);
</script>

{#snippet LinkList(invalidFormKeys: string[])}
  <ul class="mb-2 flex list-disc flex-col">
    {#if invalidFormKeys.length === 0}
      <li class="ml-5">
        <p class="text-xs text-gray-700">없음</p>
      </li>
    {:else}
      {#each invalidFormKeys as key (key)}
        <li class="ml-5">
          <button
            class="cursor-pointer text-xs text-gray-700"
            onclick={() => (focusedField = key)}
          >
            {key}
          </button>
        </li>
      {/each}
    {/if}
  </ul>
{/snippet}

<div>
  {@render LinkList(invalidFormKeys)}
</div>
```

### 스니펫의 장점

1. **코드 재사용성**: 같은 마크업을 여러 곳에서 사용할 때 중복을 줄입니다.
2. **가독성 향상**: 복잡한 컴포넌트를 논리적으로 분리하여 읽기 쉽게 만듭니다.
3. **조건부 렌더링**: 같은 스니펫을 다른 조건에서 렌더링할 수 있습니다.

```svelte
<!-- ✅ 좋은 예: 스니펫을 조건부로 렌더링 -->
<script lang="ts">
  let isExpanded = $state(false);
  let invalidFormKeys = $state<string[]>(['field1', 'field2']);
</script>

{#snippet LinkList(invalidFormKeys: string[])}
  <ul>
    {#each invalidFormKeys as key}
      <li>{key}</li>
    {/each}
  </ul>
{/snippet}

<div>
  {#if isExpanded}
    <div class="expanded-view">
      {@render LinkList(invalidFormKeys)}
    </div>
  {:else}
    <div class="collapsed-view">
      {@render LinkList(invalidFormKeys)}
    </div>
  {/if}
</div>
```

### 컴포넌트 간 콘텐츠 전달

- **슬롯(`<slot />`)은 사용하지 않습니다.**
- **컴포넌트 간 콘텐츠 전달이 필요할 때도 스니펫을 사용합니다.**

```svelte
<!-- ❌ 나쁜 예: 슬롯 사용 -->
<!-- Child.svelte -->
<div>
  <slot />
</div>

<!-- Parent.svelte -->
<Child>
  <p>부모에서 전달한 콘텐츠</p>
</Child>

<!-- ✅ 좋은 예: 스니펫 사용 -->
<!-- Child.svelte -->
<script lang="ts">
  interface Props {
    content: string;
  }

  let { content }: Props = $props();
</script>

{#snippet Content(content: string)}
  <p>{content}</p>
{/snippet}

<div>
  {@render Content(content)}
</div>

<!-- Parent.svelte -->
<script lang="ts">
  let childContent = $state('부모에서 전달한 콘텐츠');
</script>

<Child content={childContent} />
```

## 예외 사항

다음 항목들은 Svelte 5에서도 계속 사용 가능합니다:

### DOM 요소 참조 바인딩

```svelte
<!-- ✅ 허용: DOM 요소 참조 -->
<script lang="ts">
  let element: HTMLElement;
</script>
<div bind:this={element} />
```

### 라이프사이클 함수

```svelte
<!-- ✅ 허용: 라이프사이클 함수 -->
<script lang="ts">
  import { onMount, onDestroy } from 'svelte';

  onMount(() => {
    // 초기화 로직
  });

  onDestroy(() => {
    // 정리 로직
  });
</script>
```

### 일반 변수 (비반응형)

```svelte
<!-- ✅ 허용: 비반응형 변수 -->
<script lang="ts">
  const API_URL = 'https://api.example.com';
  let nonReactiveValue = 'static';
</script>
```

## 추가 참고사항

- Svelte 5는 Runes 기반의 새로운 반응성 시스템을 사용합니다.
- 모든 반응형 값은 명시적으로 `$state()`, `$derived()`, `$effect()` 등을 사용해야 합니다.
- 컴포넌트 간 props 전달은 `$props()`를 통해서만 이루어집니다.
- 스니펫 파라미터는 타입을 명시하는 것이 좋습니다 (예: `{#snippet List(items: string[])`).
