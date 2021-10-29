#!/bin/bash

set -ex

atlas micros service deploy -s cla-bot -e "$MICROS_ENV" -f cla-bot.sd.yml
