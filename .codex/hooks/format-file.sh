#!/bin/bash
set -e

INPUT=$(cat)
FILE_PATH=$(echo "$INPUT" | jq -r '.tool_input.file_path // empty')

if [[ -z "$FILE_PATH" ]]; then
  exit 0
fi

if [[ "$FILE_PATH" =~ \.(ts|tsx|js|jsx|json|css|md|svelte)$ ]]; then
  cd "$CLAUDE_PROJECT_DIR"

  if [[ -f "$FILE_PATH" ]]; then
    # package.json의 format 명령어와 동일한 ignore 옵션 사용
    pnpm prettier --write "$FILE_PATH" \
      --ignore-path .gitignore \
      --ignore-path .prettierignore \
      2>/dev/null || true
  fi
fi

exit 0
