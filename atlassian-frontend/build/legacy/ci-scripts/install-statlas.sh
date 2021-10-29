#!/bin/bash
# Install Statlas plugin #
echo "installing atlas"
curl -fL https://statlas.prod.atl-paas.net/atlas-cli/linux/atlas-latest-linux-amd64.tar.gz | tar -xzp atlas
mv atlas /usr/local/bin
echo "installing statlas"
atlas plugin install -n statlas