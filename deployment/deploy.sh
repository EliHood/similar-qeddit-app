#!/usr/bin/env bash

set -euo pipefail

script_dir=$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )
source $script_dir/config/config.env

git_branch=$(git rev-parse --abbrev-ref HEAD)
echo "Current branch: ${git_branch}"

echo "Deploying the current branch \"${git_branch}\" to AWS"

if [[ "${git_branch}" == "deployment" ]]; then
	vm_host="ec2-user@ec2-3-239-65-122.compute-1.amazonaws.com"
else
	echo "Not deployment configuration found for branch: ${git_branch}"
	exit 0
fi

echo "Configuring VM SSH key"
mkdir -p ~/.ssh && echo "${VM_SSH_KEY}" >~/.ssh/vm_ssh_key && chmod 600 ~/.ssh/vm_ssh_key

echo "Running deployment commands on VM"

vm_command_populate_env="cd ${VM_GIT_ROOT} && source ./deployment/config/populate.sh"
vm_command_pull_latest_changes="cd $VM_GIT_ROOT && git reset --hard HEAD && git checkout $git_branch && git pull origin $git_branch"
vm_command_restart_docker_compose="cd $VM_GIT_ROOT/deployment && docker-compose pull && make restart"
vm_command_docker_prune="docker image prune -f"
vm_commands="${vm_command_populate_env} && ${vm_command_pull_latest_changes} && ${vm_command_restart_docker_compose} && ${vm_command_docker_prune}"

ssh -i ~/.ssh/vm_ssh_key -o "StrictHostKeyChecking=no" "${vm_host}" "$vm_commands"

function test_deployment() {
	test_url="http://${vm_host}"

	echo "Awaiting deployment at ${test_url} to be ready"

	curl --fail \
		--retry-all-errors \
		--retry 100 \
		--retry-delay 0 \
		--retry-max-time 120 "${test_url}"

	echo "Deployment is ready at ${vm_host}"
}

test_deployment
