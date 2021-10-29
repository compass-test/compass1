#!/bin/bash

echo "Determining service name for $SERVICE_PACKAGE"

export SERVICE_NAME
SERVICE_NAME=$(node build/service-support/service-deployments/scripts/get-service-name.js)
echo $SERVICE_NAME
