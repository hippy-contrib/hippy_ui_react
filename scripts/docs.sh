#!/bin/bash
directory=docs
branch=docs
build_command() {
  yarn doc:build
}

echo "\033[0;32mGenerating site...\033[0m"
build_command

echo "\033[0;32mDeploying $branch branch...\033[0m"
gh-pages -d docs -b docs -r https://github.com/hippy-contrib/hippy_ui_react.git -m "docs: publish for docs"
