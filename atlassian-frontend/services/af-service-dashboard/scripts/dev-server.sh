#!/bin/bash

source $(dirname "${BASH_SOURCE[0]}")/setup-local-variables.sh

nodemon -e ts,js -w src/server -x ts-node src/server/index.ts | bunyan --time local --color --level debug
