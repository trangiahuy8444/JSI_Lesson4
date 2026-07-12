#!/bin/bash
# Publish sản phẩm hoàn chỉnh buổi 4
set -e
cd "$(dirname "$0")/.."

echo "=== Publish Lesson 04 complete ==="
git checkout main
git checkout -B lesson04-complete

git add -f JSI16-Lesson04/complete/
git add homework/ README.md

echo ""
echo "Files sẽ commit:"
git status --short

read -p "Tiếp tục commit & push branch lesson04-complete? (y/n) " -n 1 -r
echo
if [[ $REPLY =~ ^[Yy]$ ]]; then
  git commit -m "Release Lesson 04 complete product"
  git push -u origin lesson04-complete --force
  echo ""
  echo "✅ Done — học sinh clone:"
  echo "   git clone -b lesson04-complete https://github.com/USERNAME/JSI.git"
fi
