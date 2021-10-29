#!/bin/sh
apt-get update; apt-get install -y curl zip
curl -fL https://statlas.prod.atl-paas.net/atlas-cli/linux/atlas-latest-linux-amd64.tar.gz | tar -xzp atlas
mv atlas /usr/local/bin
echo 'Atlas is installed with version:'
/usr/local/bin/atlas version
echo "Installing Micros & Poco plugins"
atlas plugin install -n micros
atlas plugin install -n poco
echo 'Micros plugin installed'
echo 'Upgrading Atlas and associated plugins'
atlas upgrade
