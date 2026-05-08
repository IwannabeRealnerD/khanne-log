---
name: skill-maintain
description: Codex 스킬을 생성하거나 유지보수합니다. 새 스킬을 만들거나, 기존 스킬 구조를 수정하거나, 스킬 description을 개선하거나, 스킬을 리팩토링할 때 사용합니다.
argument-hint: [skill-name]
---

# 스킬 생성 및 유지보수 가이드

스킬을 생성하거나 유지보수할 때 이 가이드를 따릅니다.

## 1. 스킬 이름 결정

`$ARGUMENTS`로 전달된 스킬 이름을 사용하거나, 사용자와 함께 결정합니다.

### 네이밍 규칙

- **소문자 + 하이픈**만 사용 (예: `api-docs`, `code-review`)
- **동사-명사** 또는 **명사-명사** 형태 권장
- **최대 64자** 이내
- **명확하고 직관적**으로 작성 (호출 시 `/skill-name`으로 사용)

```
✅ 좋은 예:
- make-skill (동사-명사, 스킬 생성)
- code-review (명사-명사, 코드 리뷰)
- api-docs (명사-명사, API 문서)
- fix-issue (동사-명사, 이슈 수정)

❌ 나쁜 예:
- skillMaker (camelCase 금지)
- MAKE_SKILL (대문자/언더스코어 금지)
- make_a_new_skill_for_me (너무 김)
```

## 2. 스킬 유형 결정

### 참조 콘텐츠 (자동 로드)

Codex가 관련 작업 시 자동으로 참조하는 스킬입니다.

```yaml
---
description: 이 코드베이스의 API 설계 패턴
---
```

- 코딩 컨벤션, 스타일 가이드, 아키텍처 규칙 등
- `disable-model-invocation` 설정 안 함

### 작업 콘텐츠 (수동 호출만)

사용자가 `/skill-name`으로 직접 호출해야만 실행되는 스킬입니다.

```yaml
---
description: 애플리케이션을 프로덕션에 배포합니다.
disable-model-invocation: true
---
```

- 배포, 커밋, 특정 작업 수행 등
- `disable-model-invocation: true` 필수

### 배경 지식 (Codex만)

Codex가 자동으로 사용하지만 사용자가 직접 호출할 수 없는 스킬입니다.

```yaml
---
description: 레거시 시스템 컨텍스트
user-invocable: false
---
```

## 3. 디렉토리 생성

스킬 위치를 결정합니다:

| 위치         | 경로                                     | 적용 대상     |
| ------------ | ---------------------------------------- | ------------- |
| **개인**     | `~/.Codex/skills/<skill-name>/SKILL.md` | 모든 프로젝트 |
| **프로젝트** | `.Codex/skills/<skill-name>/SKILL.md`   | 이 프로젝트만 |

이 프로젝트의 스킬은 `.Codex/skills/` 디렉토리에 생성합니다.

## 4. SKILL.md 작성

### 필수 구조

```yaml
---
name: skill-name # 슬래시 명령어 이름
description: 스킬 설명 (언제 사용하는지) # Codex 자동 로드 결정에 사용
---
# 스킬 제목

스킬 본문 내용...
```

### 프론트매터 필드

> **⚠️ 중요**: `name`과 `description`은 **둘 다 필수**입니다. 하나라도 없으면 스킬이 정상적으로 인식되지 않습니다.

| 필드                       | 필수     | 설명                                    |
| -------------------------- | -------- | --------------------------------------- |
| `name`                     | **필수** | 슬래시 명령어 이름 (기본값: 디렉토리명) |
| `description`              | **필수** | Codex가 언제 사용할지 결정하는 데 사용 |
| `argument-hint`            | 선택     | 자동완성 힌트 (예: `[issue-number]`)    |
| `disable-model-invocation` | 선택     | `true`: 사용자만 호출 가능              |
| `user-invocable`           | 선택     | `false`: Codex만 호출 가능             |
| `allowed-tools`            | 선택     | 사용 가능한 도구 제한                   |
| `context`                  | 선택     | `fork`: 서브에이전트에서 실행           |
| `agent`                    | 선택     | `context: fork` 시 에이전트 유형        |

### description 작성 베스트 프랙티스

`description`은 Codex가 스킬을 자동 호출할지 결정하는 핵심 필드입니다.

**핵심 원칙: "이 문서를 언제 참조해야 하는지"를 명시**

```yaml
# ❌ 무엇을 하는지만 설명 (비권장)
description: API 문서를 생성합니다.

# ✅ 언제 참조해야 하는지 명시 (권장)
description: API 문서를 작성하거나 수정할 때 사용합니다. OpenAPI 스펙 작성, 엔드포인트 문서화, API 예제 추가 시 참조합니다.
```

**작성 팁:**

- **"~할 때 사용합니다"** 형식으로 참조 시점을 명확히 기술
- 구체적인 상황/작업을 나열 (예: "컴포넌트 작성 시", "스타일 수정 시")
- 1~2문장으로 간결하게 작성

### 변수 사용

- `$ARGUMENTS`: 스킬 호출 시 전달된 인수
- `${CLAUDE_SESSION_ID}`: 현재 세션 ID

## 5. 파일 구조

**필수**: SKILL.md는 **500줄 이내**로 작성합니다. 상세 내용은 별도 파일로 분리합니다.

### 디렉토리 구조 규칙

스킬 디렉토리는 다음 구조를 따릅니다:

```
my-skill/
├── SKILL.md           # 주요 지침 (필수, 500줄 이내)
├── prompts/           # 서브에이전트용 프롬프트 파일
│   └── *.md
├── templates/         # 코드/문서 템플릿 파일
│   └── *.md
├── scripts/           # 스킬에서 사용하는 실행 스크립트
│   └── *.mjs
├── patterns.md        # 상세 패턴/규칙 (선택)
├── examples.md        # 예제 (선택)
└── reference.md       # 참조 문서 (선택)
```

| 디렉토리     | 용도                                                    | 필수 여부 |
| ------------ | ------------------------------------------------------- | --------- |
| `prompts/`   | 서브에이전트에게 위임할 프롬프트 파일                   | 해당 시   |
| `templates/` | 코드 생성이나 문서 작성에 사용할 템플릿 파일            | 해당 시   |
| `scripts/`   | 스킬에서 사용하는 실행 스크립트 (shell, Node.js 등)     | 해당 시   |

- 서브에이전트를 사용하는 스킬은 반드시 `prompts/` 디렉토리에 프롬프트 파일을 분리
- 코드/문서 템플릿이 있는 스킬은 반드시 `templates/` 디렉토리에 템플릿 파일을 분리
- 실행 스크립트가 있는 스킬은 반드시 `scripts/` 디렉토리에 스크립트 파일을 분리
- SKILL.md에서 상대경로로 참조: `[프롬프트](./prompts/verify-something.md)`

SKILL.md에서 참조:

```markdown
## 상세 내용

- 패턴: [patterns.md](./patterns.md)
- 예제: [examples.md](./examples.md)
```

## 6. 이 프로젝트의 기존 스킬 참조

```
.Codex/skills/
├── common-skills/
│   ├── typescript-skill/        # TypeScript 규칙
│   └── style-skill/             # 스타일링 규칙
├── api-layer-skill/             # API 레이어 스킬
├── blueprint-skill/             # 블루프린트 스킬
├── documentation-skill/         # 문서화 스킬
├── e2e-skill/                   # E2E 테스트 스킬
├── error-handling-skill/        # 에러 처리 스킬
├── file-structure-skill/        # 파일 구조 가이드라인
├── form-skill/                  # 폼 스킬
├── i18n-skill/                  # 번역키 규칙
├── mds-skill/                   # Moin Design System 스킬
├── nextjs-react-skill/          # Next.js + React 개발 스킬
├── nuqs-skill/                  # URL 쿼리 상태 관리 스킬
├── skills-maintain-skill/       # 스킬 생성 및 유지보수
├── svelte-code-skill/           # Svelte 5 개발 스킬
├── testing-skill/               # 테스트 스킬
└── version-management-skill/    # 버전 관리 스킬
```

### 기존 스킬 패턴

1. **공통 규칙 참조**: 공통 스킬을 상대경로로 참조

```markdown
## 공통 규칙 참조

- **TypeScript 규칙**: [typescript-skill](../common-skills/typescript-skill/SKILL.md)
- **스타일 규칙**: [style-skill](../common-skills/style-skill/SKILL.md)
```

2. **주요 영역 + 상세 문서 분리**: SKILL.md는 요약, 상세는 별도 파일

```markdown
## 주요 영역

- **컴포넌트 패턴**: [component-patterns.md](./component-patterns.md)
- **파일 구조**: [file-structure.md](./file-structure.md)
```

3. **빠른 참조 섹션**: 자주 쓰는 규칙은 SKILL.md에 직접 포함

## 7. 스킬 테스트

생성 후 테스트:

```bash
# 직접 호출
/skill-name [arguments]

# 자동 호출 테스트 (description에 맞는 질문)
"관련 작업 질문..."
```

## 8. 체크리스트

스킬 생성/수정 완료 전 확인:

- [ ] `name`: 소문자 + 하이픈, 명확하고 직관적
- [ ] `description`: 언제 사용하는지 명확히 기술
- [ ] 스킬 유형에 맞는 프론트매터 설정
- [ ] **SKILL.md 500줄 이내** (상세 내용은 별도 파일로 분리)
- [ ] 프롬프트/템플릿이 SKILL.md에 인라인되어 있지 않은지 확인 (해당 시 `prompts/` 또는 `templates/`로 분리)
- [ ] 기존 공통 스킬 참조 (해당 시)
- [ ] 테스트 완료

## 9. 스킬 품질 검증

스킬 생성 또는 수정 완료 후, 서브에이전트를 사용하여 내용 품질을 검증합니다.

### 검증 절차

1. 검증 프롬프트 파일을 읽는다: [verify-skill-quality.md](./prompts/verify-skill-quality.md)
2. 서브에이전트에게 대상 스킬 파일 경로와 프롬프트 내용을 전달하여 검증을 요청한다
3. 검증 결과가 "수정 필요"이면 문제를 수정하고 재검증한다
4. **최대 3회**까지 반복한다 (3회 초과 시 사용자에게 남은 문제를 보고하고 중단)

### 검증 대상

- SKILL.md (필수)
- SKILL.md에서 참조하는 별도 파일들 (해당 시)

### 서브에이전트 호출 방식

```
Agent 도구를 사용하여 서브에이전트에게 다음을 전달:
- 검증 프롬프트 내용 (prompts/verify-skill-quality.md)
- 대상 스킬 파일 경로
- "검증 결과를 출력 형식에 맞춰 반환하라"는 지시
```

---

## 유지보수 가이드

### 스킬 수정 시

1. **기존 구조 유지**: 네이밍 규칙, 파일 구조 패턴 준수
2. **500줄 제한 확인**: 수정 후에도 SKILL.md가 500줄를 넘지 않는지 확인
3. **참조 파일 동기화**: SKILL.md와 참조 파일 간 일관성 유지

### 스킬 리팩토링 시

| 상황                  | 조치                                  |
| --------------------- | ------------------------------------- |
| SKILL.md가 500줄 초과 | 상세 내용을 별도 `.md` 파일로 분리    |
| 여러 스킬에서 중복    | `common-skills/`로 공통화             |
| description이 모호    | 트리거 키워드를 구체적으로 수정       |
| 자동 호출이 너무 잦음 | `disable-model-invocation: true` 추가 |
| 프롬프트/템플릿이 인라인 | `prompts/` 또는 `templates/`로 분리 |

### 스킬 삭제 시

1. 다른 스킬에서 참조하는지 확인
2. 참조가 있으면 해당 참조도 함께 수정
3. 디렉토리 전체 삭제
