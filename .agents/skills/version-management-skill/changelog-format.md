# CHANGELOG 형식 상세

CHANGELOG는 **프로젝트 단위**로 두고, 각 프로젝트 내에서는 필요 시 **피처·도메인·내부 단위**로 구분합니다.

## 파일 위치

- **프로젝트 단위**: 버전 관리 대상 11개 프로젝트 각각의 루트에 `CHANGELOG.md`를 둡니다.
  - 예: `apps/dashboard/CHANGELOG.md`, `apps/remittance-admin/CHANGELOG.md`, `packages/moin-design-system/CHANGELOG.md`
- 파일이 속한 디렉터리가 곧 프로젝트 스코프이므로, 항목에 프로젝트명 `(dashboard)` 같은 식별자는 붙이지 않습니다.

## 항목 구분: 피처·도메인·내부 단위

한 프로젝트 CHANGELOG 안에서 구분이 필요할 때는 **프로젝트명이 아니라** 다음 같은 **내부 단위**로 표기합니다.

| 구분 예시       | 설명                                 |
| --------------- | ------------------------------------ |
| 도메인/기능     | `[송금]`, `[인증]`, `[정산]`         |
| 화면/영역       | `[대시보드 위젯]`, `[송금 목록]`     |
| 컴포넌트/패키지 | `[MdsButton]`, `[MdsInput]` (MDS 등) |
| 팀/서비스 단위  | 팀별로 쓰는 접두/괄호 등             |

- 선택 사항입니다. 단순히 Added/Fixed만 나열해도 됩니다.
- 한 프로젝트 내에서 “무엇 기준으로 묶을지”만 정하면 되고, 괄호 `[]` 또는 팀 컨벤션에 맞게 통일해서 사용하면 됩니다.

## 섹션 (Keep a Changelog)

- **Added**: 새 기능
- **Changed**: 기존 동작/API 변경 (breaking이면 major)
- **Fixed**: 버그 수정
- **Removed**: 제거된 기능/API (breaking이면 major)
- **Security**: 보안 관련 변경

## Unreleased 블록

아직 릴리스하지 않은 변경은 `## [Unreleased]` 아래에 적습니다. 릴리스 시 날짜와 버전으로 블록을 만들고, Unreleased는 비우거나 새 변경을 다시 적습니다.

## 릴리스 워크플로우 (Unreleased → 릴리스)

Unreleased에 항목이 쌓인 뒤 실제로 릴리스할 때는 아래 순서를 따릅니다.

1. **버전 타입 결정**  
   Unreleased 블록의 변경 유형에 따라 bump 타입을 정합니다. (Added → minor, Fixed 등 → patch, Breaking Changed/Removed → major. 여러 유형이 있으면 그중 가장 높은 단계 하나로 결정.)

2. **CHANGELOG.md 수정**

   - `## [Unreleased]` 제목을 `## [x.y.z] - YYYY-MM-DD`로 바꿉니다. (x.y.z는 **현재** 버전 매니페스트(`package.json`, moin-design-system은 `package.build.json`)가 아니라 **bump 후** 버전을 적습니다.)
   - 그 아래에 빈 `## [Unreleased]` 블록을 새로 추가해, 이후 변경은 여기에 다시 쌓이도록 합니다.

3. **버전 매니페스트 반영**
   `pnpm run version:bump <major|minor|patch> <package-name>` 으로 해당 프로젝트의 version을 올립니다. (`@themoin/moin-design-system`은 `package.build.json`, 나머지는 `package.json`. 2번에서 적은 x.y.z와 일치하는 타입을 사용.)

4. **커밋·태그·푸시**  
   팀 정책에 따라 CHANGELOG + 버전 파일 변경을 커밋하고, 필요하면 git tag를 붙인 뒤 푸시합니다. 태그 네이밍은 아래 "태그 네이밍" 규칙을 권장합니다.

**요약**: CHANGELOG에서 Unreleased를 “릴리스된 버전 블록”으로 바꾸고 → 빈 Unreleased를 다시 두고 → bump 스크립트로 버전 매니페스트를 그 버전으로 맞춘 뒤 → 커밋/태그/푸시.

## 태그 네이밍 (권장)

모노레포에서는 **어느 프로젝트의 몇 버전인지** 구분할 수 있어야 하므로, 태그에 프로젝트와 버전을 함께 넣는 방식을 권장합니다.

- **형식**: `<package>/v<version>`
- **package**: 버전 관리 대상 패키지명. 앱은 그대로(`dashboard`, `remittance-admin` 등), `@themoin/moin-design-system`은 태그에서는 스코프를 빼고 **`moin-design-system`**만 사용.
- **version**: semver 그대로 (태그에는 앞에 `v` 붙임).

| 프로젝트           | 태그 예시                   |
| ------------------ | --------------------------- |
| dashboard          | `dashboard/v1.2.0`          |
| remittance-admin   | `remittance-admin/v0.2.1`   |
| moin-design-system | `moin-design-system/v2.0.0` |

- **사용 예**: `git tag dashboard/v1.2.0`, `git push origin dashboard/v1.2.0`
- **장점**: 프로젝트별로 태그 목록 조회가 쉬움 (`git tag -l 'dashboard/*'`), GitHub Releases에서 프로젝트·버전 구분이 명확함.

## PR 번호 표기

CHANGELOG 항목을 추가할 때 **관련 PR이 있으면 PR 번호를 함께 적습니다.** 항목 끝에 `(#123)` 형태로 붙이면 됩니다. 리포지터리 기본 URL이 PR 링크로 연결되는 경우 링크가 자동으로 걸리는 환경(GitHub 등)에서는 `(#123)`만으로 충분합니다.

- 예: `- [송금 목록] 정렬 오류 수정 (#456)`
- PR이 없는 변경(내부 정리, 문서 등)은 번호 없이 적어도 됩니다.

## 예시: 프로젝트별 CHANGELOG (dashboard)

```markdown
# Changelog

## [Unreleased]

### Added

- [대시보드 위젯] 새 요약 카드 추가 (#100)
- [송금] 거래 필터 옵션 추가 (#101)

### Fixed

- [송금 목록] 정렬 오류 수정 (#102)

## [1.2.0] - 2025-02-01

### Added

- [대시보드 위젯] 새 요약 카드 추가 (#100)
- [송금] 거래 필터 옵션 추가 (#101)

### Fixed

- [송금 목록] 정렬 오류 수정 (#102)

## [1.1.0] - 2025-01-15

...
```

## 예시: moin-design-system (피처/컴포넌트 단위)

```markdown
# Changelog

## [Unreleased]

### Added

- [MdsButton] `variant="secondary"` 추가 (#200)

### Changed

- [MdsInput] **BREAKING** `size` 기본값 제거, 필수 지정 (#201)

### Fixed

- [MdsDialog] 포커스 트랩 오류 수정 (#202)

## [1.0.0] - 2025-01-15

...
```

위 예에서 Changed는 breaking이므로 해당 패키지는 major bump 대상입니다.
