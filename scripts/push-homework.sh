#!/bin/bash
# Push chỉ homework lên branch main
set -e
cd "$(dirname "$0")/.."

echo "=== Push homework → main ==="
git checkout main 2>/dev/null || git branch -M main

git add homework/ README.md .gitignore
echo ""
echo "Files sẽ commit:"
git status --short

read -p "Tiếp tục commit & push? (y/n) " -n 1 -r
echo
if [[ $REPLY =~ ^[Yy]$ ]]; then
  git commit -m "Update homework" || echo "Không có thay đổi mới"
  git push origin main
  echo "✅ Done — học sinh clone: git clone https://github.com/USERNAME/JSI.git"
fi
