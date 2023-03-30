#!/usr/bin/env bash

set -euo pipefail

script_dir=$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )
docker_image=$($script_dir/get-docker-image.sh)

$script_dir/login.sh

echo "Pushing docker image $docker_image"

docker push $docker_image
