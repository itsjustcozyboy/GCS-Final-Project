#!/usr/bin/env bash
set -euo pipefail

# Make user-level CLI install locations available in this shell and future terminals.
export PATH="$HOME/.local/bin:$HOME/.cargo/bin:$HOME/.codex/bin:$HOME/.npm-global/bin:$PATH"
if ! grep -q "# Codex CLI path" "$HOME/.bashrc" 2>/dev/null; then
  {
    echo ""
    echo "# Codex CLI path"
    echo 'export PATH="$HOME/.local/bin:$HOME/.cargo/bin:$HOME/.codex/bin:$HOME/.npm-global/bin:$PATH"'
  } >> "$HOME/.bashrc"
fi

corepack enable
corepack prepare pnpm@9.15.4 --activate

pnpm install

install_codex() {
  if command -v codex >/dev/null 2>&1; then
    return 0
  fi

  # Official macOS/Linux standalone installer.
  curl -fsSL https://chatgpt.com/codex/install.sh | CODEX_NON_INTERACTIVE=1 sh || true
  export PATH="$HOME/.local/bin:$HOME/.cargo/bin:$HOME/.codex/bin:$HOME/.npm-global/bin:$PATH"

  if command -v codex >/dev/null 2>&1; then
    return 0
  fi

  # If the installer put the binary somewhere under $HOME but did not expose it,
  # link it into ~/.local/bin, which we add to PATH above.
  local found_codex=""
  found_codex="$(find "$HOME" -type f -name codex -perm -111 2>/dev/null | head -n 1 || true)"
  if [ -n "$found_codex" ]; then
    mkdir -p "$HOME/.local/bin"
    ln -sf "$found_codex" "$HOME/.local/bin/codex"
  fi

  if command -v codex >/dev/null 2>&1; then
    return 0
  fi

  # Fallback supported by the OpenAI Codex repository.
  npm config set prefix "$HOME/.npm-global"
  npm install -g @openai/codex
}

install_codex
hash -r

if ! command -v codex >/dev/null 2>&1; then
  echo "❌ Codex CLI installation failed. Try: npm install -g @openai/codex"
  exit 1
fi

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

codex --version || true
