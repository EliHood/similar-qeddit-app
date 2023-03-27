#!/usr/bin/env bash

set -eo pipefail
script_dir=$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )

# Stop containers
docker-compose down --remove-orphans
