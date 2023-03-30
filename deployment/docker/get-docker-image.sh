#!/usr/bin/env bash

set -euo pipefail

script_dir=$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)
source $script_dir/../config/config.env

generate_docker_tag() {
    echo $1 | iconv -t ascii//TRANSLIT | sed -E s/[^a-zA-Z0-9\.]+/-/g | sed -E s/^-+\|-+$//g | cut -c1-128
}

git_revision=$(git log -1 --format=%H)

# if latest commit is tagged
#   then generate docker tag from git tag
#   else generate docker tag from git branch
git describe --tags --exact-match "$git_revision" &>/dev/null &&
    docker_tag=$(generate_docker_tag "$(git describe --tags --exact-match $git_revision)") ||
    docker_tag=$(generate_docker_tag "$(git rev-parse --abbrev-ref HEAD)")

echo "${FRONTEND_DOCKER_REPO}:${docker_tag}"
