#!/usr/bin/env bash

set -euo pipefail
script_dir=$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )

# Stop containers
docker-compose down --remove-orphans
