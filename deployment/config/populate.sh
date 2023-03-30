#!/usr/bin/env bash

set -euo pipefail

script_dir=$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )
git_root=$(git rev-parse --show-toplevel)

# Load environment variables from config.env file
source $script_dir/config.env

# Set Docker image to use
export FRONTEND_DOCKER_IMAGE=$("${script_dir}/../docker/get-docker-image.sh")
