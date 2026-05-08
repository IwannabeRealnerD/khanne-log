---
name: e2e-skill
description: E2E 테스트 작성·수정 시 사용. Playwright 설정, e2e/ 디렉터리 구조, 상수·환경 변수 규칙을 참조합니다.
globs:
  - "e2e/**/*.spec.ts"
  - "e2e/playwright.config.ts"
  - "e2e/constant.ts"
---

# E2E Playwright 스킬

E2E 테스트 코드 작성·수정 시 참조합니다. 이 스킬만으로 프로젝트 E2E 규칙을 파악할 수 있도록 구성되어 있습니다.

## 공통 규칙 참조

- **TypeScript 규칙**: [typescript-skill](../common-skills/typescript-skill/SKILL.md) - E2E 테스트 코드에서도 any 금지, 타입 가드 등 공통 규칙 준수

## 프로젝트 구조 (맥락 독립)

- **프로젝트 루트**: 모노레포 최상위 (`platform-frontend/`)
- **E2E 패키지**: 루트 직하위 `e2e/`. pnpm workspace에 포함됨 (`pnpm-workspace.yaml` 참조)
- **테스트 파일**: `e2e/tests/<앱명>/` 하위에 `*.spec.ts`
- **앱 디렉터리명**: kebab-case (예: `remittance-admin`, `dashboard`)

**테스트 대상**: `apps/` 하위의 Next.js 기반 앱들이 E2E 테스트 대상입니다. `GLOBAL_APP_URLS`에 URL이 등록된 앱별로 `tests/<앱명>/` 디렉터리를 두고 스펙을 작성합니다.

### 핵심 파일 경로

| 파일                         | 역할                            |
| ---------------------------- | ------------------------------- |
| `e2e/constant.ts`            | 앱 URL 상수 (`GLOBAL_APP_URLS`) |
| `e2e/playwright.config.ts`   | Playwright 설정                 |
| `e2e/tests/<앱명>/*.spec.ts` | 앱별 테스트 스펙                |

## 앱 URL 및 환경 변수

`e2e/constant.ts`에서 `GLOBAL_APP_URLS`를 export합니다. 환경 변수로 오버라이드 가능합니다.

```typescript
// e2e/constant.ts
export const GLOBAL_APP_URLS = {
  DASHBOARD: process.env.DASHBOARD_URL || "기본값",
  KYC: process.env.KYC_URL || "기본값",
  REMITTANCE_ADMIN: process.env.REMITTANCE_ADMIN_URL || "기본값",
} as const;
```

**환경 변수**: `DASHBOARD_URL`, `KYC_URL`, `REMITTANCE_ADMIN_URL`

## 실행 명령어

```bash
pnpm --filter e2e e2e:test    # 테스트 실행
pnpm --filter e2e e2e:ui      # Playwright UI 모드
```

또는 `cd e2e && pnpm e2e:test`.

## 스펙 작성 패턴

### 필수 import

```typescript
import { expect, test } from "@playwright/test";
import { GLOBAL_APP_URLS } from "../../constant";
```

### 기본 구조

```typescript
test.describe("<앱명> 앱 테스트", () => {
  test("테스트 설명", async ({ page }) => {
    await page.goto(GLOBAL_APP_URLS.<앱키>);
    await expect(page).toHaveURL(...);  // 또는 toHaveTitle 등
  });
});
```

### 복제 가능한 예제

**Dashboard (접속 검증)**:

```typescript
import { expect, test } from "@playwright/test";
import { GLOBAL_APP_URLS } from "../../constant";

test.describe("Dashboard 앱 테스트", () => {
  test("Dashboard 앱에 접속할 수 있다", async ({ page }) => {
    await page.goto(GLOBAL_APP_URLS.DASHBOARD);
    await expect(page).toHaveURL(new RegExp(GLOBAL_APP_URLS.DASHBOARD));
  });
});
```

**Remittance Admin (접속 + 리다이렉트)**:

```typescript
import { expect, test } from "@playwright/test";
import { GLOBAL_APP_URLS } from "../../constant";

test.describe("Remittance Admin 앱 테스트", () => {
  test("Remittance Admin 앱에 접속할 수 있다", async ({ page }) => {
    await page.goto(GLOBAL_APP_URLS.REMITTANCE_ADMIN);
    await expect(page).toHaveTitle(/모인 송금 관리 어드민/);
  });
  test("로그인 안했을 때 로그인 페이지로 리다이렉트 된다", async ({ page }) => {
    await page.goto(GLOBAL_APP_URLS.REMITTANCE_ADMIN);
    await expect(page).toHaveURL(`${GLOBAL_APP_URLS.REMITTANCE_ADMIN}/login`);
  });
});
```

## E2E 테스트 Best Practice

### 요소 선택 (Locators)

- **우선순위**: `getByRole()` → `getByLabel()` → `getByText()` → `getByTestId()` 순으로 사용
- **권장**: 역할·라벨·텍스트 등 사용자 관점 속성 사용. `data-testid`는 불가피할 때만
- **금지**: class명, CSS selector, ID (UI 변경에 취약)

```typescript
// ✅ 권장
await page.getByRole("button", { name: "제출" }).click();
await page.getByLabel("이메일").fill("user@example.com");
await page.getByText("저장 완료").isVisible();

// ❌ 비권장: implementation에 의존
await page.locator(".submit-btn").click();
```

### 테스트 격리

- 각 테스트는 **독립적으로 실행** 가능해야 함 (다른 테스트 결과에 의존하지 않음)
- `beforeEach`에서 공통 setup. 테스트 간 상태 공유·의존 금지
- 필요한 데이터는 테스트 내에서 생성하거나 fixture로 준비

### Assertion 및 대기

- **Web-first assertion** 사용: `expect().toBeVisible()`, `toHaveURL()` 등 (자동 재시도·대기)
- `page.waitForTimeout(ms)` 같은 **고정 대기 지양**. 조건 기반 `expect`로 대체

### 테스트 설계

- **사용자 시나리오** 중심: 구현이 아닌 사용자가 보는 동작 검증
- **한 테스트·한 시나리오**: 테스트를 atomic하게 유지
- **의미 있는 설명**: `test("로그인 후 대시보드로 이동한다")`처럼 기대 동작 명시

### 기타

- 외부/서드파티 API는 필요한 경우 Network API로 mock
- Page Object Model은 페이지 복잡도가 높을 때 검토

## 검증 통과를 위한 규칙

- **실행 후**: `pnpm --filter e2e tsc`, `pnpm --filter e2e lint` 통과 확인

## 상세 문서

- [playwright-structure.md](./playwright-structure.md) - 설정·디렉터리·환경 변수 상세
