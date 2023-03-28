#!/usr/bin/env bash

set -euo pipefail
script_dir=$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )

# Start containers
docker-compose up -d
