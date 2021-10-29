#!/bin/bash

set -ex

atlas micros service deploy -s cla-external -e "$MICROS_ENV" -f cla-external.sd.yml
