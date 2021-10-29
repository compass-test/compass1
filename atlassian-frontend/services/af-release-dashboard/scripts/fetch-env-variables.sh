#!/bin/bash
source $(dirname "${BASH_SOURCE[0]}")/set-env-variables.sh

atlas micros service local -s af-release-dashboard -e $MICROS_ENV -f af-release-dashboard.sd.yml --output-file=afrd-$MICROS_ENV.yaml