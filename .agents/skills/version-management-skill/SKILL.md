---
name: version-management-skill
description: 프로젝트별 semver 버전 관리 및 프로젝트별 CHANGELOG 작성·해석 시 참조. CHANGELOG나 diff를 보고 어떤 프로젝트에 major/minor/patch를 올릴지 결정하거나, 버전 bump 스크립트/명령을 실행할 때 사용합니다.
globs:
  - "CHANGELOG.md"
  - "**/package.json"
  - "pnpm-workspace.yaml"
---

# Version Management 스킬

이 스킬은 모노레포 내 **버전 관리 대상 프로젝트**의 semver 버전 정책, 프로젝트별 CHANGELOG 형식, 버전 bump 방법을 정의합니다. CHANGELOG 수정, 버전 bump 요청, 릴리스/버전 관련 질문 시 참조합니다.

## 1. 버전 정책 요약

| 항목          | 내용                                                                                                                               |
| ------------- | ---------------------------------------------------------------------------------------------------------------------------------- |
| **버전 소스** | 각 워크스페이스 `package.json`의 `version`(단, `@themoin/moin-design-system`은 `package.build.json`). 루트 버전은 모노레포 메타용. |
| **Semver**    | MAJOR: 호환 깨지는 변경. MINOR: 하위 호환 기능 추가. PATCH: 하위 호환 버그/문서 수정.                                              |
| **CHANGELOG** | **프로젝트 단위**: 각 프로젝트 루트의 `CHANGELOG.md` (예: `apps/dashboard/CHANGELOG.md`). 구분이 필요하면 피처·도메인·내부 단위로. |
| **대상**      | 아래 "버전 관리 대상 목록"의 11개만. 그 외(shared, boilerplate 등)은 제외.                                                         |

## 2. 버전 관리 대상 목록 (고정)

버전을 관리하는 프로젝트는 **다음 11개만**입니다. 이 목록을 그대로 유지합니다.

### Apps (10개)

- agreement
- back-office
- dashboard
- intoss
- kyc
- ma-admin-v2
- ocr
- operation-admin
- remittance-admin
- settlement

### Packages (1개)

- **packages/moin-design-system** — pnpm filter 사용 시 패키지명은 `@themoin/moin-design-system`

**제외**: shared/\*, boilerplate, packages/eslint-config-core-frontend 등 위 목록에 없는 워크스페이스는 버전 관리 대상이 아닙니다.

## 3. CHANGELOG 형식

- **위치**: **프로젝트 단위**. 각 버전 관리 대상 프로젝트 루트에 `CHANGELOG.md` (예: `apps/dashboard/CHANGELOG.md`, `packages/moin-design-system/CHANGELOG.md`). 파일 자체가 프로젝트 스코프이므로 프로젝트명 괄호 표기는 사용하지 않음.
- **항목 구분**: 구분이 필요할 때는 **피처·도메인·내부 단위**로 나눕니다. 예: `[송금]`, `[인증]`, `[대시보드 위젯]`, `[MdsButton]` — 팀/도메인/컴포넌트 등 프로젝트 내부 단위 기준.
- **PR 번호**: 관련 PR이 있으면 항목 끝에 `(#123)` 형태로 붙입니다.
- **섹션**: [Keep a Changelog](https://keepachangelog.com/) 스타일 — `Added`, `Changed`, `Fixed`, `Removed`, `Security`.
- **릴리스 시**: Unreleased를 버전 블록(`## [x.y.z] - YYYY-MM-DD`)으로 바꾸고, 빈 Unreleased를 다시 둔 뒤, `version:bump`로 버전 매니페스트를 올리고 커밋/태그(moin-design-system은 `package.build.json`, 그 외는 `package.json`). 자세한 단계는 [changelog-format.md](./changelog-format.md)의 "릴리스 워크플로우" 참조.

### 예시 (dashboard 프로젝트의 CHANGELOG.md)

```markdown
## [Unreleased]

### Added

- [대시보드 위젯] 새 요약 카드 추가 (#100)
- [송금] 거래 필터 옵션 추가 (#101)

### Fixed

- [송금 목록] 정렬 오류 수정 (#102)

## [1.2.0] - 2025-02-01

...
```

## 4. CHANGELOG → bump 매핑

Unreleased 또는 특정 릴리스 블록 내 변경 유형에 따라 bump 타입을 결정합니다.

| CHANGELOG 섹션 / 유형                    | Bump 타입                                       |
| ---------------------------------------- | ----------------------------------------------- |
| **Added**                                | minor                                           |
| **Fixed**, **Removed**(비호환 아님)      | patch                                           |
| **Changed**(breaking), **Removed**(제거) | major                                           |
| **Security**                             | patch (단순 수정) 또는 major (노출/취약점 있음) |

## 5. 버전 올리는 방법 (명령)

스킬에는 "실제 버전을 올리는 스크립트" 구현은 포함하지 않고, **규칙과 명령만** 문서화합니다.

### pnpm version으로 bump

대상 프로젝트의 `package.json`에 있는 `version`을 올리려면, 해당 패키지의 **name**으로 `--filter`를 사용합니다.

```bash
# 단일 프로젝트 bump (major | minor | patch 중 하나)
pnpm version <major|minor|patch> --filter <package-name>
```

### filter에 쓸 패키지명

- **Apps**: `package.json`의 `name`이 디렉터리명과 동일합니다.
  예: `agreement`, `back-office`, `dashboard`, `intoss`, `kyc`, `ma-admin-v2`, `ocr`, `operation-admin`, `remittance-admin`, `settlement`
- **moin-design-system**: 패키지명이 `@themoin/moin-design-system`이므로 filter에는 이 이름을 사용합니다.

```bash
# 예: dashboard minor bump
pnpm version minor --filter dashboard

# 예: moin-design-system patch bump
pnpm version patch --filter @themoin/moin-design-system
```

### 버전 bump 스크립트

버전 올리기: `pnpm run version:bump <major|minor|patch> <package-name>` 또는 `node scripts/bump-version.mjs <major|minor|patch> <package-name>`. 스크립트는 해당 프로젝트의 `package.json`에서 `version` 필드만 읽어 bump 후 다시 씁니다. **`@themoin/moin-design-system`만** `packages/moin-design-system/package.build.json`을 사용합니다 (pnpm version 명령/exec 사용 없음). 인자를 넘길 때는 `pnpm run version:bump minor dashboard -- --dry-run`처럼 `--` 뒤에 붙입니다. `--dry-run`이면 변경 내용만 출력하고 파일은 수정하지 않습니다.

## 6. Semver 판단 규칙 요약

- **MAJOR**: 공개 API 또는 사용자에게 보이는 동작이 깨지는 변경. 컴포넌트 props 제거/이름 변경, 응답 스키마 호환 깨짐 등.
- **MINOR**: 하위 호환되는 기능 추가. 새 컴포넌트, 새 API 필드(선택), 새 옵션 등.
- **PATCH**: 버그 수정, 문서 수정, 내부 리팩터링으로 동작이 바뀌지 않는 경우.

공용 패키지(moin-design-system 등)에서 breaking 변경을 할 경우, 해당 패키지는 major bump하고 이를 사용하는 앱들은 필요 시 의존 버전만 올리면 됩니다. 앱 자체의 "공개 동작"이 바뀌지 않으면 앱은 patch/minor만 해도 될 수 있습니다.

자세한 변경 유형별 판단은 [semver-rules.md](./semver-rules.md)를 참조합니다. CHANGELOG 위치·피처 단위 구분은 [changelog-format.md](./changelog-format.md)를 참조합니다.
