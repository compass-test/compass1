#!/usr/bin/env bash

#########################################################################
## Will build all icon glyphs as well as the SVGs for reduced ui pack. ##
## Not sure what this is?                                              ##
## Read: https://hello.atlassian.net/wiki/spaces/DST/pages/974849756   ##
#########################################################################

# Ensures we bail out if an error happens.
set -e

# Each package with icons will call-out to the icon build process package themselves.
bolt w @atlaskit/icon build-glyphs && \
bolt w @atlaskit/icon-object build-glyphs && \
bolt w @atlaskit/icon-file-type build-glyphs && \
bolt w @atlaskit/icon-priority build-glyphs && \
bolt w @atlaskit/reduced-ui-pack update
