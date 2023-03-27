#!/usr/bin/env bash

set -eo pipefail

function validate_env() {
  if [ -z "$DOCKER_USERNAME" ]; then
	echo "DOCKER_USERNAME is not set"
	exit 1
  fi

  if [ -z "$DOCKER_PASSWORD" ]; then
	echo "DOCKER_PASSWORD is not set"
	exit 1
  fi
}

validate_env

echo "Login to Docker registry"

echo $DOCKER_PASSWORD | docker login -u $DOCKER_USERNAME --password-stdin
