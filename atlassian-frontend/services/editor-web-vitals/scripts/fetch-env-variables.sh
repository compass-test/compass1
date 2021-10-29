#!/bin/bash
source $(dirname "${BASH_SOURCE[0]}")/set-env-variables.sh

atlas micros service local -s editor-web-vitals -e $MICROS_ENV -f editor-web-vitals.sd.yml --output-file=ewv-$MICROS_ENV.yaml
