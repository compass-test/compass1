#!/bin/bash
# This script removes the node_modules cache on CI if it is stale. This avoids errors caused by lingering
# versions of transitive dependencies.
if [[ -d node_modules ]]; then
  echo 'Found node_modules directory, checking integrity'
  yarn check --integrity
  if [[ $? -ne 0 ]]; then
    echo 'Node_modules is stale, removing...'
    mv node_modules /tmp/node_modules_bk
    echo 'Done'
  fi
else
  echo 'No node_modules directory found'
fi
