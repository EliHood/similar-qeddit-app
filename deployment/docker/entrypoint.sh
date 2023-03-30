#!/usr/bin/env bash

set -euo pipefail

echo "Starting an application..."
echo ""
echo "BUILD_BRANCH: $BUILD_BRANCH"
echo "BUILD_REV: $BUILD_REV"
echo "BUILD_TIME: $BUILD_TIME"
echo ""

script_dir=$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )

$script_dir/packages/front-end/run --config /config.json
