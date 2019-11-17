#!/bin/bash

# any future command that fails will exit the script
set -e

# Delete the old repo
sudo su
rm -rf /home/ubuntu/ws-transaksi/
sudo su ubuntu

# clone the repo again
git clone git@gitlab.informatika.org:if3110-2019-02-k03-18/ws-transaksi.git
#git pull

#sudo su

#source the nvm file. In an non
#If you are not using nvm, add the actual path like
#PATH=/home/ubuntu/node/bin:$PATH
#source /home/ubuntu/.nvm/nvm.sh

cd /home/ubuntu/ws-transaksi/

# stop the previous pm2
pm2 kill
sudo su
npm remove pm2 -g
sudo su ubuntu

#pm2 needs to be installed globally as we would be deleting the repo folder.
# this needs to be done only once as a setup script.
sudo su
npm install pm2 -g
sudo su ubuntu
# starting pm2 daemon
pm2 status

#install npm packages
echo "Running npm install"
npm install

#Restart the node server
pm2 start bin/www