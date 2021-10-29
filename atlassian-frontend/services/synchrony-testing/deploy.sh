#!/bin/bash

set -ex

atlas micros service deploy -s synchronytesting -e "$MICROS_ENV" -f synchrony-testing.sd.yml -c
