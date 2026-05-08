---
name: check-browser
description: 브라우저에서 동작을 확인할 때 사용합니다. Playwright MCP로 페이지를 열고, 스냅샷을 찍고, 클릭/입력 등 인터랙션을 수행하여 실제 동작을 검증합니다. "확인해줘", "화면 확인", "브라우저에서 테스트" 등의 요청 시 참조합니다.
---

# 브라우저 동작 확인 스킬

Playwright MCP를 사용하여 브라우저에서 직접 동작을 확인하는 스킬입니다.

## 대상 앱

| 앱                   | dev 서버 URL         | clientId                          | 설명                              |
| -------------------- | -------------------- | --------------------------------- | --------------------------------- |
| dashboard-inbound    | `localhost:3003`     | `moin-platform-dashboard-client`  | Inbound 계정으로 로그인 (동일 앱) |
| dashboard-outbound   | `localhost:3003`     | `moin-platform-dashboard-client`  | Outbound 계정으로 로그인 (동일 앱)|
| remittance-admin     | `localhost:3009`     | `moin-platform-admin-client`      | 송금 어드민                       |

## 실행 절차

### 1단계: 로그인 (토큰 준비)

사용자가 확인할 앱을 파악한 뒤, 로그인 스크립트를 실행하여 토큰을 준비합니다.

```bash
# dashboard inbound 로그인
node .Codex/skills/check-browser-skill/scripts/login.mjs dashboard-inbound

# dashboard outbound 로그인
node .Codex/skills/check-browser-skill/scripts/login.mjs dashboard-outbound

# remittance-admin 로그인
node .Codex/skills/check-browser-skill/scripts/login.mjs remittance-admin
```

스크립트가 성공하면 `tmp/login_credential_<앱>.json`에 토큰이 저장됩니다.

> 이미 캐시 파일이 존재하면 스크립트가 캐시를 재사용합니다. 401 에러 발생 시 캐시를 삭제하고 재실행하세요.

### 2단계: 브라우저에서 토큰 주입

캐시된 토큰 파일을 읽고, `browser_evaluate`로 localStorage에 주입합니다.

**절차:**

1. `tmp/login_credential_<앱>.json` 파일을 Read 도구로 읽어 토큰 값을 확인
2. `browser_navigate`로 대상 앱 URL에 접속 (예: `http://localhost:3003`)
3. `browser_evaluate`로 localStorage에 토큰 설정:

```javascript
localStorage.setItem('accessToken', '<accessToken>');
localStorage.setItem('refreshToken', '<refreshToken>');
localStorage.setItem('userUUID', '<userUUID>');
```

4. `browser_navigate`로 확인할 페이지로 이동 (또는 현재 페이지를 새로고침)

### 3단계: 동작 확인

`browser_snapshot`, `browser_click`, `browser_fill_form` 등을 사용하여 사용자가 요청한 동작을 확인합니다.

**확인 패턴:**

- **페이지 렌더링 확인**: `browser_snapshot`으로 접근성 트리를 확인하여 요소가 올바르게 렌더링되었는지 검증
- **인터랙션 확인**: `browser_click`, `browser_fill_form`으로 사용자 동작을 시뮬레이션
- **상태 변화 확인**: 동작 후 `browser_snapshot`으로 변경된 상태 확인
- **시각적 확인**: `browser_take_screenshot`으로 스크린샷을 찍어 시각적 상태 확인

## 토큰 만료 시 대응

브라우저에서 401 에러가 발생하거나 로그인 페이지로 리다이렉트되는 경우:

1. 캐시 파일 삭제: `rm tmp/login_credential_<앱>.json`
2. 로그인 스크립트 재실행: `node .Codex/skills/check-browser-skill/scripts/login.mjs <앱>`
3. 2단계부터 다시 수행

## 크리덴셜 설정

로그인 스크립트를 사용하려면 `.Codex/skills/check-browser-skill/.env.local`에 크리덴셜을 설정해야 합니다. 템플릿은 `.env.example`을 참조하세요.

## 요구사항 분석 시 Playwright MCP 및 코드베이스 활용

사용자의 요청을 수행하기 위해 **어떤 URL에 접속해야 하는지**, **어떤 버튼/요소를 클릭해야 하는지** 등이 불분명할 때, 다음 방법으로 정보를 수집할 수 있습니다:

- **Playwright MCP 활용**: `browser_snapshot`으로 페이지의 접근성 트리를 탐색하여 버튼, 링크, 폼 요소 등의 존재 여부와 위치를 파악
- **코드베이스 참조**: 라우트 구조(`app/` 디렉토리), 컴포넌트 코드, 상수 파일 등을 읽어 URL 경로와 UI 요소를 사전에 파악

이 정보를 종합하여 사용자의 요구사항을 정확히 분석한 뒤 동작을 수행합니다.

## 불분명한 요청에 대한 대응

다음과 같은 경우에는 임의로 수행하지 말고 **사용자에게 되물어** 명확히 한 뒤 진행합니다:

- 대상 앱이 특정되지 않은 경우 (예: "화면 확인해줘" — 어떤 앱?)
- 확인할 페이지나 기능이 광범위하거나 모호한 경우 (예: "전체적으로 잘 동작하는지 봐줘")
- 여러 해석이 가능한 경우 (예: "버튼 눌러봐" — 어떤 버튼?)

## 주의사항

- dev 서버가 실행 중이어야 합니다 (`pnpm <앱-alias> dev`)
- `.env.local`에 크리덴셜이 설정되어 있어야 합니다
- `tmp/` 디렉토리의 토큰 캐시 파일은 git에 포함되지 않습니다
