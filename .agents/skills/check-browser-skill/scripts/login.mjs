#!/usr/bin/env node

/**
 * 로그인 스크립트 - fetch 기반으로 토큰을 획득하고 tmp/에 캐싱합니다.
 *
 * 사용법:
 *   node .claude/skills/check-skill/scripts/login.mjs dashboard-inbound
 *   node .claude/skills/check-skill/scripts/login.mjs dashboard-outbound
 *   node .claude/skills/check-skill/scripts/login.mjs remittance-admin
 */

import { readFileSync, writeFileSync, mkdirSync, existsSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// 프로젝트 루트: scripts/ → check-skill/ → skills/ → .claude/ → 루트
const PROJECT_ROOT = resolve(__dirname, '..', '..', '..', '..');
const ENV_PATH = resolve(__dirname, '..', '.env.local');

const APP_CONFIG = {
  'dashboard-inbound': {
    clientId: 'moin-platform-dashboard-client',
    usernameEnvKey: 'DASHBOARD_INBOUND_USER_NAME',
    passwordEnvKey: 'DASHBOARD_INBOUND_USER_PASSWORD',
  },
  'dashboard-outbound': {
    clientId: 'moin-platform-dashboard-client',
    usernameEnvKey: 'DASHBOARD_OUTBOUND_USER_NAME',
    passwordEnvKey: 'DASHBOARD_OUTBOUND_USER_PASSWORD',
  },
  'remittance-admin': {
    clientId: 'moin-platform-admin-client',
    usernameEnvKey: 'REMITTANCE_ADMIN_USER_NAME',
    passwordEnvKey: 'REMITTANCE_ADMIN_USER_PASSWORD',
  },
};

/**
 * .env.local 파일을 파싱하여 key-value 객체로 반환
 */
function parseEnvFile(filePath) {
  if (!existsSync(filePath)) {
    throw new Error(
      `.env.local 파일이 존재하지 않습니다: ${filePath}\n.env.example을 참조하여 .env.local을 생성하세요.`,
    );
  }

  const content = readFileSync(filePath, 'utf-8');
  const env = {};

  for (const line of content.split('\n')) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith('#')) continue;

    const eqIndex = trimmed.indexOf('=');
    if (eqIndex === -1) continue;

    const key = trimmed.slice(0, eqIndex).trim();
    const value = trimmed.slice(eqIndex + 1).trim();
    if (key) env[key] = value;
  }

  return env;
}

/**
 * 로그인 API를 호출하여 토큰을 획득
 */
async function fetchAccessToken(apiBase, clientId, userName, password) {
  const url = `${apiBase}/integration-auth/api/v1/auth/tokens/access-tokens`;

  const response = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ clientId, userName, password }),
  });

  if (!response.ok) {
    const body = await response.text();
    throw new Error(`로그인 API 실패 (${response.status}): ${body}`);
  }

  return response.json();
}

/**
 * /me API를 호출하여 userUUID를 획득
 */
async function fetchUserUUID(apiBase, accessToken) {
  const url = `${apiBase}/integration-auth/api/v1/users/me`;

  const response = await fetch(url, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${accessToken}`,
    },
  });

  if (!response.ok) {
    const body = await response.text();
    throw new Error(`/me API 실패 (${response.status}): ${body}`);
  }

  const data = await response.json();
  return data.uuid;
}

async function main() {
  const appName = process.argv[2];

  if (!appName || !APP_CONFIG[appName]) {
    console.error(`사용법: node login.mjs <앱이름>`);
    console.error(`지원 앱: ${Object.keys(APP_CONFIG).join(', ')}`);
    process.exit(1);
  }

  const config = APP_CONFIG[appName];
  const cacheFilePath = resolve(PROJECT_ROOT, 'tmp', `login_credential_${appName}.json`);

  // 캐시 파일이 존재하면 재사용
  if (existsSync(cacheFilePath)) {
    const cached = JSON.parse(readFileSync(cacheFilePath, 'utf-8'));
    console.log(`캐시된 토큰을 사용합니다: ${cacheFilePath}`);
    console.log(JSON.stringify(cached, null, 2));
    return;
  }

  // .env.local 파싱
  const env = parseEnvFile(ENV_PATH);

  const userName = env[config.usernameEnvKey];
  const password = env[config.passwordEnvKey];
  const apiBase = env['API_BASE_URL'];

  if (!apiBase) {
    throw new Error('API_BASE_URL이 설정되지 않았습니다.\n.env.local에 API_BASE_URL을 설정하세요.');
  }

  if (!userName || !password) {
    throw new Error(
      `크리덴셜이 설정되지 않았습니다.\n` +
        `.env.local에 ${config.usernameEnvKey}과 ${config.passwordEnvKey}을 설정하세요.`,
    );
  }

  console.log(`${appName} 로그인 중...`);

  // 1. 로그인 API 호출
  const tokenData = await fetchAccessToken(apiBase, config.clientId, userName, password);
  const { accessToken, refreshToken } = tokenData;

  console.log('토큰 획득 완료. /me API 호출 중...');

  // 2. /me API 호출하여 userUUID 획득
  const userUUID = await fetchUserUUID(apiBase, accessToken);

  console.log('userUUID 획득 완료.');

  // 3. 캐시 파일에 저장
  const credential = { accessToken, refreshToken, userUUID };

  const tmpDir = resolve(PROJECT_ROOT, 'tmp');
  if (!existsSync(tmpDir)) {
    mkdirSync(tmpDir, { recursive: true });
  }

  writeFileSync(cacheFilePath, JSON.stringify(credential, null, 2), 'utf-8');

  console.log(`토큰 저장 완료: ${cacheFilePath}`);
  console.log(JSON.stringify(credential, null, 2));
}

main().catch((error) => {
  console.error(`오류: ${error.message}`);
  process.exit(1);
});
