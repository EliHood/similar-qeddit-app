#!/usr/bin/env bash

set -euo pipefail

echo "Login to Docker registry"

echo $DOCKER_PASSWORD | docker login -u $DOCKER_USERNAME --password-stdin
