# API 클라이언트 구조화 규칙

## 기본 원칙

- **API 클라이언트는 엔드포인트 경로에 따라 카테고리별로 그룹화합니다.**
- 최상위 레벨에 단독으로 두지 않고, 도메인별 객체로 그룹화합니다.
- 일관된 구조를 유지하여 코드 가독성과 유지보수성을 향상시킵니다.

## 엔드포인트 경로와 카테고리 매핑

API의 엔드포인트 경로를 확인하여 적절한 카테고리로 그룹화합니다.

**중요**: 엔드포인트 경로의 **첫 번째 세그먼트가 서비스명**입니다. 이 서비스명을 기반으로 카테고리를 결정합니다.

예를 들어 `/auth/api/v1/auth/tokens/access-tokens`에서:

- 첫 번째 세그먼트: `/auth` (서비스명)
- 카테고리: `Auth`

| 엔드포인트 경로                                 | 첫 번째 세그먼트 (서비스명) | 카테고리          | 예시                                                                        |
| ----------------------------------------------- | --------------------------- | ----------------- | --------------------------------------------------------------------------- |
| `/integration-auth/api/v1/integration-auth/...` | `/integration-auth`         | `IntegrationAuth` | `AuthApi`, `EmailLoginUserApi`, `GetUserControllerApi`, `PartnerManagerApi` |
| `/auth/api/v1/auth/...`                         | `/auth`                     | `Auth`            | `TokenApi`, `PartnerApi`                                                    |
| `/user/api/v1/user/...`                         | `/user`                     | `User`            | `MoinUserApi`, `MoinManagerApi`                                             |
| `/remittance/api/v1/remittance/...`             | `/remittance`               | `Remittance`      | `AdminBalanceApi`, `AdminTransferMasterApi`                                 |
| `/policy/api/v1/policy/...`                     | `/policy`                   | `Policy`          | `AdminExchangeRatioControllerApi`, `SourceRoutingV3Api`                     |
| `/local-kr/api/v1/local-kr/...`                 | `/local-kr`                 | `LocalKR`         | `FileApi`, `OperatorVerificationFlowApi`                                    |
| `/aml/api/v1/aml/...`                           | `/aml`                      | `AML`             | `AMLApi`                                                                    |
| `/banking/api/v1/banking/...`                   | `/banking`                  | `Banking`         | `DevInternalTestApi`                                                        |

## 구조 규칙

### 1. 카테고리별 객체 그룹화

API는 엔드포인트 경로에 따라 적절한 카테고리 객체 안에 배치합니다.

```typescript
// ✅ 좋은 예: 엔드포인트 경로에 따라 카테고리로 그룹화
const globalApiClient = {
  Auth: {
    TokenApi: new TokenApi(remittanceAdminApiConfiguration),
  },
  User: {
    AdminApi: new MoinAdminApi(remittanceAdminApiConfiguration),
    EmailApi: new EmailLoginUserCommandControllerApi(remittanceAdminApiConfiguration),
  },
  Remittance: {
    BalanceApi: new AdminBalanceApi(remittanceAdminApiConfiguration),
    TransferApi: new AdminTransferMasterApi(remittanceAdminApiConfiguration),
  },
};

// ❌ 나쁜 예: 최상위 레벨에 단독으로 배치
const globalApiClient = {
  TokenApi: new TokenApi(remittanceAdminApiConfiguration), // Auth 엔드포인트인데 최상위 레벨
  User: { ... },
};
```

### 2. 엔드포인트 경로 확인 방법

API 클래스의 메서드에서 사용하는 `path`를 확인하여 카테고리를 결정합니다.

**카테고리 결정 방법**:

1. 엔드포인트 경로의 **첫 번째 세그먼트(서비스명)**를 확인합니다.
2. 서비스명을 기반으로 적절한 카테고리를 결정합니다.
3. 서비스명이 없거나 명확하지 않은 경우, 경로의 패턴을 분석하여 결정합니다.

```typescript
// token-api.ts 예시
async postAccessTokenRaw(...) {
  const response = await this._request({
    // 첫 번째 세그먼트: /auth (서비스명)
    // 따라서 Auth 카테고리에 배치
    path: `/auth/api/v1/auth/tokens/access-tokens`,
    // ...
  });
}

// 다른 예시들
// path: `/user/api/v1/user/...` → 첫 번째 세그먼트: /user → User 카테고리
// path: `/remittance/api/v1/remittance/...` → 첫 번째 세그먼트: /remittance → Remittance 카테고리
// path: `/policy/api/v1/policy/...` → 첫 번째 세그먼트: /policy → Policy 카테고리
```

### 3. 카테고리 내 네이밍 규칙

카테고리 객체 내부의 API 키 이름은 **OpenAPI에서 생성된 컨트롤러 클래스 이름을 그대로 사용합니다.**

- 클래스 이름이 `XxxControllerApi`이면 키도 `XxxControllerApi`로 작성합니다.
- 클래스 이름에 `Controller`가 없으면 (`XxxApi`) 키도 `XxxApi`로 작성합니다.
- **클래스 이름에서 `Controller`를 임의로 제거하거나 축약하지 않습니다.**

```typescript
// ✅ 좋은 예: 컨트롤러 클래스 이름 그대로 사용
const globalApiClient = {
  Auth: {
    TokenApi: new TokenApi(...), // 클래스명: TokenApi → 키: TokenApi
  },
  IntegrationAuth: {
    GetUserControllerApi: new GetUserControllerApi(...), // 클래스명: GetUserControllerApi → 키: GetUserControllerApi
  },
  Remittance: {
    WebhookSubscriptionControllerApi: new WebhookSubscriptionControllerApi(...), // 클래스명 그대로
  },
};

// ❌ 나쁜 예: 클래스 이름을 임의로 축약
const globalApiClient = {
  Auth: {
    Token: new TokenApi(...), // Api 접미사 누락
  },
  Remittance: {
    WebhookSubscriptionApi: new WebhookSubscriptionControllerApi(...), // ❌ Controller 임의 제거
  },
};
```

### 4. 단일 API인 경우도 객체로 그룹화

카테고리 내에 API가 하나만 있어도 객체로 그룹화합니다.

```typescript
// ✅ 좋은 예: 단일 API도 객체로 그룹화
const globalApiClient = {
  Auth: {
    TokenApi: new TokenApi(remittanceAdminApiConfiguration),
  },
  AML: {
    AMLApi: new AMLApi(remittanceAdminApiConfiguration),
  },
};

// ❌ 나쁜 예: 단일 API를 최상위 레벨에 배치
const globalApiClient = {
  TokenApi: new TokenApi(remittanceAdminApiConfiguration), // Auth 카테고리로 그룹화해야 함
  AML: { ... },
};
```

## 사용 예시

### Dashboard 앱 예시 (IntegrationAuth 사용)

```typescript
const globalApiClient = {
  IntegrationAuth: {
    AuthApi: new AuthApi(dashboardApiConfiguration),
    EmailLoginUserApi: new EmailLoginUserApi(dashboardApiConfiguration),
    GetUserControllerApi: new GetUserControllerApi(dashboardApiConfiguration),
    PartnerManagerApi: new PartnerManagerApi(dashboardApiConfiguration),
  },
  Policy: {
    SourceRoutingV3Api: new SourceRoutingV3Api(dashboardApiConfiguration),
  },
  Remittance: {
    BalanceApi: new DashboardBalanceApi(dashboardApiConfiguration),
    BalanceHistoryApi: new DashboardBalanceHistoryApi(
      dashboardApiConfiguration,
    ),
    InquiryApi: new DashboardInquiryApi(dashboardApiConfiguration),
    TransferApi: new DashboardTransferMasterApi(dashboardApiConfiguration),
    WebhookSubscriptionControllerApi: new WebhookSubscriptionControllerApi(
      dashboardApiConfiguration,
    ),
  },
};
```

### Admin 앱 예시 (Auth 사용)

```typescript
const globalApiClient = {
  AML: { AMLApi: new AMLApi(remittanceAdminApiConfiguration) },
  Auth: { TokenApi: new TokenApi(remittanceAdminApiConfiguration) },
  Banking: {
    DevInternalTestApi: new BankingDevInternalTestApi(
      remittanceAdminApiConfiguration,
    ),
  },
  LocalKR: {
    FileApi: new FileApi(remittanceAdminApiConfiguration),
    VerificationFlowApi: new OperatorVerificationFlowApi(
      remittanceAdminApiConfiguration,
    ),
  },
  Policy: {
    CompanyApi: new AdminCustomerCompanyControllerApi(
      remittanceAdminApiConfiguration,
    ),
    ExchangeRatioApi: new AdminExchangeRatioControllerApi(
      remittanceAdminApiConfiguration,
    ),
  },
  Remittance: {
    BalanceApi: new AdminBalanceApi(remittanceAdminApiConfiguration),
    TransferApi: new AdminTransferMasterApi(remittanceAdminApiConfiguration),
  },
  User: {
    AdminApi: new MoinAdminApi(remittanceAdminApiConfiguration),
    ManagerApi: new MoinManagerApi(remittanceAdminApiConfiguration),
  },
};
```

## 주의사항

1. **엔드포인트 경로 확인**: API 클래스의 실제 엔드포인트 경로를 확인하여 올바른 카테고리에 배치합니다.
2. **서비스명 기반 분류**: 엔드포인트 경로의 **첫 번째 세그먼트(서비스명)**를 기준으로 카테고리를 결정합니다. 서비스명이 없거나 명확하지 않은 경우 경로 패턴을 분석합니다.
3. **일관성 유지**: 한 앱 내에서 동일한 서비스명을 사용하는 API는 같은 카테고리에 배치합니다.
4. **네이밍 일관성**: 카테고리 이름은 PascalCase를 사용하고, API 이름은 `Api` 접미사를 포함합니다.
