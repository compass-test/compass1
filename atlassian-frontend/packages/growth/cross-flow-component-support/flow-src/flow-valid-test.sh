#!/usr/bin/env bash

set -e

PATH=$(npm bin):$PATH

# Set working directory to `flow-src`
cd "$(dirname "$0")"

# Check flow
echo "Checking Flow types"
flow check . && echo "All good!"
