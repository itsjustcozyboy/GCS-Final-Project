#!/usr/bin/env bash
set -euo pipefail

corepack enable
corepack prepare pnpm@9.15.4 --activate

pnpm install

# Install the OpenAI Codex CLI globally for use inside GitHub Codespaces.
# It can authenticate through ChatGPT sign-in, or through OPENAI_API_KEY
# configured as a GitHub Codespaces secret.
npm install -g @openai/codex

cat <<'EOF'

✅ Codespaces setup complete.

Next steps:
1. Add OPENAI_API_KEY as a GitHub Codespaces secret if you want API-key auth.
   GitHub → Settings → Codespaces → Secrets → New secret → OPENAI_API_KEY
2. Open a new terminal and run:
   codex

Useful project commands:
- pnpm dev
- pnpm build
- pnpm lint
- pnpm test
EOF
