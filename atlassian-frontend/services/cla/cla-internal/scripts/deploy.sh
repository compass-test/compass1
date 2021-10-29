#!/bin/bash

set -ex

atlas micros service deploy -s cla-internal -e "$MICROS_ENV" -f cla-internal.sd.yml
