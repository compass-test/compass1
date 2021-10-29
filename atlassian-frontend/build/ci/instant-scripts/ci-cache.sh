#!/usr/bin/env bash

# This script is used to provide a custom caching solution for our node_modules in ci. It's main
# advantages over a regular pipelines cache are:
#  * dynamic - we can choose when, if and how we push / pull our caches
#  * speed - by using lz4 compression and a closely located s3 bucket we can pull and extract a cache
#    slightly faster than pipelines does today
#  * cache hits - we're able to hit the cache way more often than we could with pipelines
# See this announcement post for more information:
#
# This script performs three operations:
#   * pull-and-extract - checks if a cache exists for current yarn.lock - if it does, we pull and extract it
#   * compress-and-push - checks if a cache exists for the current yarn.lock, if it doesn't we compress and push
#   * delete [cacheHash] - checks if a cache exists for a specific hash (defaults to the current hash) and deletes it
#
# This script expects lz4 and s3cmd to already be installed on your system (`apt-get update && apt-get install -y s3cmd liblz4-tool`)

# This script expects to be run from the root of the repo:
# `./build/ci/instant-scripts/ci-cache.sh pull-and-extract`
# `./build/ci/instant-scripts/ci-cache.sh delete [someHash]`

# https://www.gnu.org/software/bash/manual/bash.html#The-Set-Builtin
set -euxo pipefail

CMD="$1"
ARG="${2:-}"
BUCKET_NAME="atlassian-frontend-private-us-east"
BUCKET_REGION="us-east-1"
CACHE_KEY=$(git ls-files -s patches yarn.lock package.json | git hash-object --stdin)
CACHE_FILE_NAME="node_modules.tar.lz4"
CACHE_URL="s3://$BUCKET_NAME/npm-cache/$CACHE_KEY/$CACHE_FILE_NAME"


function cache_exists() {
  local CACHE_EXISTS=$(s3cmd --access_key="$AWS_ACCESS_KEY" --secret_key="$AWS_SECRET_KEY" --region="$BUCKET_REGION" info $CACHE_URL)
  if [[ "$CACHE_EXISTS" != ""  ]];
  then
    echo "true";
  fi
}

function pull_and_extract() {
  local CACHE_EXISTS=$(cache_exists)
  if [[ "$CACHE_EXISTS" != ""  ]]; then
    echo "Cache exists, pulling now"
    time s3cmd --access_key="$AWS_ACCESS_KEY" --secret_key="$AWS_SECRET_KEY" --region="$BUCKET_REGION" get $CACHE_URL $CACHE_FILE_NAME
    du -sh $CACHE_FILE_NAME # check the file exists and show how big it is
    time lz4 -d $CACHE_FILE_NAME - | tar -xf - ;
    echo "Successfully pulled existing cache $CACHE_URL"
  else
    echo "No cache found for current yarn.lock hash - exiting";
  fi
  node build/metrics/build-reporting/scripts/add-attribute.js boltCacheHit=$CACHE_EXISTS
}

function compress_and_push() {
  local CACHE_EXISTS=$(cache_exists)
  if [[ "$CACHE_EXISTS" == ""  ]]; then
    time tar -cf - node_modules | lz4 > $CACHE_FILE_NAME
    du -sh $CACHE_FILE_NAME # check the file exists and show how big it is
    time s3cmd --access_key="$AWS_ACCESS_KEY" --secret_key="$AWS_SECRET_KEY" --region="$BUCKET_REGION" put $CACHE_FILE_NAME $CACHE_URL;
    echo "Successfully pushed new cache $CACHE_URL"
  else
    echo "Cache already existing, no need to push";
  fi
}

function delete() {
  local CACHE_HASH="";
  if [[ "$ARG" != "" ]]; then
    CACHE_HASH="$ARG";
  else
    CACHE_HASH="$CACHE_KEY";
  fi

  local CACHE_DIRECTORY="s3://$BUCKET_NAME/npm-cache/$CACHE_HASH";
  local CACHE_EXISTS=$(s3cmd --access_key="$AWS_ACCESS_KEY" --secret_key="$AWS_SECRET_KEY" --region="$BUCKET_REGION" info "$CACHE_DIRECTORY/$CACHE_FILE_NAME");

  if [[ "$CACHE_EXISTS" != ""  ]]; then
    s3cmd del -r --access_key="$AWS_ACCESS_KEY" --secret_key="$AWS_SECRET_KEY" --region="$BUCKET_REGION" "$CACHE_DIRECTORY";
    echo "Successfully deleted cache $CACHE_HASH";
  else
    echo "Cache doesn't exist, no need to delete";
  fi
}

function main() {
  if [[ "$AWS_ACCESS_KEY" == "" || "$AWS_SECRET_KEY" == "" ]]; then
    echo "AWS_ACCESS_KEY or AWS_SECRET_KEY variables are required to run this script"
    exit 1
  fi

  echo "Current node_modules cache key: $CACHE_KEY"
  echo "Current node_modules cache url: $CACHE_URL"

  if [[ "$CMD" == "pull-and-extract"  ]]; then
    pull_and_extract
  elif [[ "$CMD" == "compress-and-push"  ]]; then
    compress_and_push
  elif [[ "$CMD" == "delete"  ]]; then
    delete
  else
    echo "Invalid command"
    echo "Usage ./build/ci/instant-scripts/ci-cache.sh [pull-and-extract|compress-and-push|delete]"
    exit 1
  fi
}

main
