#!/usr/bin/env bash


cd ../../../..

npx build-storybook  -c packages/components/schedule-timeline/.storybook  -o .storybook-out/dist && \

(cd .storybook-out/dist && zip -FSr ../dist.zip ./) && \

atlas statlas post -f .storybook-out/dist.zip -n schedule-timeline-preview -s $(git rev-parse --abbrev-ref HEAD) --auth-group growth-optimization-engineering-all && \

echo '' && \

echo "Storybook URL: https://statlas.prod.atl-paas.net/schedule-timeline-preview/$(git rev-parse --abbrev-ref HEAD)/"
