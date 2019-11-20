#!/bin/bash

# any future command that fails will exit the script
set -e

# Lets write the public key of our aws instance
eval $(ssh-agent -s)
echo "$PRIVATE_KEY" | tr -d '\r' | ssh-add - > /dev/null

# disable the host key checking.
#Host *
#  StrictHostKeyChecking no
#
sudo mkdir -p ~/.ssh
sudo touch ~/.ssh/config
echo -e "Host *\n\tStrictHostKeyChecking no\n\n" >> ~/.ssh/config

# we have already setup the DEPLOY_SERVER in our gitlab settings
DEPLOY_SERVER=$DEPLOY_SERVER

sudo echo "deploying to ${DEPLOY_SERVER}"
sudo ssh ubuntu@${DEPLOY_SERVER} 'bash' < ./deploy/updateAndRestart.sh
#done