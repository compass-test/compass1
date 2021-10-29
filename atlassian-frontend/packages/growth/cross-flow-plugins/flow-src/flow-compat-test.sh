#!/usr/bin/env bash

set -e

PATH=$(npm bin):$PATH

# Set working directory to `flow-src`
cd "$(dirname "$0")"

# Check flow
flow check-contents < index.js.flow

# Generate TS declarations from Flow declarations
echo "Generating TS type declaration from 'index.js.flow'..."
flow-to-ts --inline-utility-types index.js.flow > generated-index.d.ts

# Run tsc to test types compatibility
echo "Type checking against original TS sources"
tsc --noEmit && echo "All good!"

