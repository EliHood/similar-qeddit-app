#!/bin/sh
set -eo pipefail

echo "Starting an application..."
echo ""
echo "BUILD_BRANCH: $BUILD_BRANCH"
echo "BUILD_REV: $BUILD_REV"
echo "BUILD_TIME: $BUILD_TIME"
echo ""

./run --config /config.json
