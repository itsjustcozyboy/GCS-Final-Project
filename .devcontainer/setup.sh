#!/usr/bin/env bash
set -euo pipefail

corepack enable
corepack prepare pnpm@9.15.4 --activate

pnpm install

# Install the OpenAI Codex CLI for use inside GitHub Codespaces.
# OpenAI's current CLI docs recommend the standalone installer for Linux.
curl -fsSL https://chatgpt.com/codex/install.sh | CODEX_NON_INTERACTIVE=1 sh

cat <<'EOF'

✅ Codespaces setup complete.

Next steps:
1. Open a new terminal and run:
   codex
2. The first run will ask you to authenticate with your ChatGPT account or an API key.

Useful project commands:
- pnpm dev
- pnpm build
- pnpm lint
- pnpm test
EOF
