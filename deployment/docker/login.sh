#!/usr/bin/env bash

set -euo pipefail

echo "Login to Docker registry"

printf $DOCKER_PASSWORD | wc -c
printf $DOCKER_USERNAME | wc -c

echo $DOCKER_PASSWORD | docker login -u $DOCKER_USERNAME --password-stdin
