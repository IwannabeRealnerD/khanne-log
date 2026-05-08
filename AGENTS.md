# Khanne Log

Khanne의 영화, 시리즈, 게임 기록을 위한 개인 웹 프로젝트.

## Tech Stack

- **Framework**: Next.js 16 (App Router, `"use cache"` 사용)
- **Language**: TypeScript (strict mode)
- **Styling**: Tailwind CSS v4
- **Validation**: Valibot
- **Data**: Notion API (`@notionhq/client`)
- **Testing**: Vitest + jsdom + @testing-library/react
- **Linting**: ESLint 9 (flat config) + Prettier + cspell
- **Package Manager**: pnpm (10.12.1)
- **Node**: 22.16.0
- **Deploy**: Vercel

## Commands

```bash
pnpm dev          # 개발 서버 (debug cache 활성화)
pnpm build        # 프로덕션 빌드
pnpm lint         # ESLint 실행
pnpm test         # vitest run
pnpm test:watch   # vitest watch 모드
```

## Project Structure

```
src/
├── app/              # Next.js App Router 페이지
│   ├── layout.tsx    # 루트 레이아웃
│   ├── page.tsx      # 홈
│   └── lines/        # Lines 페이지 (명대사 목록)
├── components/       # 공용 컴포넌트
├── constants/        # 상수
├── styles/           # CSS
├── types/            # 타입 정의
└── utils/            # 유틸리티
    └── notion/       # Notion API 연동
lint/                 # ESLint 커스텀 규칙 및 설정
test/                 # 테스트 파일 (test/**/*.test.ts)
```

## Conventions

- **Path alias**: `@/*` → `./src/*`
- **파일명**: kebab-case 사용
- **CN 유틸**: `clsx` + `tailwind-merge` 조합의 `globalCn` 사용 (커스텀 ESLint 규칙으로 강제)
- **Pre-commit**: husky + lint-staged (lint + tsc)
- **ESLint**: boundary, naming-convention, export, import 관련 커스텀 설정 포함
- **npx 대신 pnpm dlx 사용**
