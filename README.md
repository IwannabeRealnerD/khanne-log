# Khanne Log

A personal archive for keeping track of memorable quotes and reviews from movies and TV series I love.

Content is managed in Notion and rendered with Next.js.

## Features

- Memorable quotes with personal notes
- Movie and TV series reviews
- OTT platform and keyword tags
- Pagination
- Notion database integration
- Cached content with partial prerendering
- Game logs planned for the future

## Tech Stack

- Next.js 16
- React 19
- TypeScript
- Tailwind CSS
- Notion API
- Vitest

## Getting Started

Install the dependencies and start the development server:

```bash
pnpm install
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Environment Variables

Create a `.env.local` file in the project root:

```env
NOTION_API_KEY=
NOTION_LINES_DATABASE_ID=
NOTION_REVIEWS_DATABASE_ID=
```

Make sure the Notion integration has access to both databases.

## Scripts

```bash
pnpm dev        # Start the development server
pnpm build      # Create a production build
pnpm start      # Start the production server
pnpm lint       # Run lint checks
pnpm test       # Run tests
```
