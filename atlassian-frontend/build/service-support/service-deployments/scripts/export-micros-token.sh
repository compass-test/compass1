#!/bin/bash

# THIS METHOD OF AUTH IS DEPRECATED IN FAVOUR OF DEPLOY TOKENS
# https://hello.atlassian.net/wiki/spaces/MICROS/pages/645966004/HOWTO+Deploy+to+Micros+with+Bitbucket+Pipelines
# LEAVING IN TO SUPPORT LEGACY TOKEN USAGE

echo "Determining default Micros Token for $SERVICE_NAME"
# Convert service name into uppercase, replace - with _, then append "_MICROS_TOKEN"
MICROS_TOKEN_NAME="$(echo $SERVICE_NAME | tr [:lower:]- [:upper:]_)_MICROS_TOKEN"
echo "Name for default Micros Token env var: $MICROS_TOKEN_NAME"
export MICROS_TOKEN="${!MICROS_TOKEN_NAME}"
