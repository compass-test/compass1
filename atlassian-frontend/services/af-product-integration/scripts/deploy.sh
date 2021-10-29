#!/bin/bash

if [[ $MICROS_ENV == *"prod"* ]]; then
  npx @atlassian/micros-support deploy-lambda --isCi --env $MICROS_ENV --isSox
else
  npx @atlassian/micros-support deploy-lambda --isCi --env $MICROS_ENV
fi
