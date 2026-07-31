#!/bin/bash
yarn
echo "" > ~/.npmrc
git_sha=$(git rev-parse --short HEAD)
preid="beta.${git_sha}"
auth=""
registry=""
yarn build
lerna publish -y --canary --preid $preid --pre-dist-tag=beta --force-publish
