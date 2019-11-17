#!/bin/bash

# any future command that fails will exit the script
set -e

# Lets write the public key of our aws instance
#eval $(ssh-agent -s)
#echo "$PRIVATE_KEY" | tr -d '\r' | ssh-add - > /dev/null

# ** Alternative approach
# sudo rm -rf ~/.ssh
#sudo mkdir -p ~/.ssh
#sudo chmod 777 ~/.ssh
#sudo echo -e "" > ~/.ssh/id_rsa
#sudo chmod 600 ~/.ssh/id_rsa
# ** End of alternative approach

# disable the host key checking.
# sudo ./deploy/disableHostKeyChecking.sh

#Host *
#  StrictHostKeyChecking no
#
## any future command that fails will exit the script
#sudo set -e
mkdir -p ~/.ssh
sudo touch ~/.ssh/config
sudo bash -c 'echo -e "Host *\n\tStrictHostKeyChecking no\n\n" >> ~/.ssh/config'
#sudo echo -e "Host *\n\tStrictHostKeyChecking no\n\n" >> ~/.ssh/config

# we have already setup the DEPLOYER_SERVER in our gitlab settings which is a
# comma seperated values of ip addresses.
DEPLOY_SERVERS=$DEPLOY_SERVERS

# lets split this string and convert this into array
# In UNIX, we can use this commond to do this
# ${string//substring/replacement}
# our substring is "," and we replace it with nothing.
#ALL_SERVERS=(${DEPLOY_SERVERS//,/ })
#sudo echo "ALL_SERVERS ${ALL_SERVERS}"
#
## Lets iterate over this array and ssh into each EC2 instance
## Once inside the server, run updateAndRestart.sh
#for server in "${ALL_SERVERS[@]}"
#do
sudo echo "deploying to 52.220.86.67"
sudo ssh -v -i ./aws-key/engimaInstance.pem ubuntu@52.220.86.67 'bash' < ./deploy/updateAndRestart.sh
#done