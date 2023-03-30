#!/usr/bin/env bash

set -euo pipefail
script_dir=$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )

source $script_dir/../config/populate.sh

# Stop containers
docker-compose down --remove-orphans
