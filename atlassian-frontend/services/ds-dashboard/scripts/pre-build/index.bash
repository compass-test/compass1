#!/usr/bin/env bash
source scripts/util.bash

section "pre-build"

##
# RECORD TIME AT BUILD
##

now=$(date +%s)     # gets epoch in seconds
now=$((now * 1000)) # JS uses milliseconds

echo "NEXT_PUBLIC_LAST_BUILT=$now" > ".env"
msg "✅ Build time recorded"

##
# DOWNLOAD CACHE
##

msg "📥 Fetching cache..."
npx ts-node -O '{"module":"commonjs"}' scripts/pre-build/fetch-cache.tsx
status="$?"
case "$status" in
0) msg 2 "✅ Cache fetched";;
1) msg 2 "❌ Failed to fetch cache";;
2) msg 2 "❌ Cache file is not JSON";;
3) msg 2 "❌ Failed to write cache";;
esac

if [ "$status" -ne 0 ]
then
  exit 1
fi

##
# BUILD DEPENDENCIES
##

# only build the css-reset if it hasn't been built yet
# TODO: maybe check for staleness
if [ ! -f ./node_modules/@atlaskit/css-reset/dist/bundle.css ]
then
  msg "🛠 Building dependencies..."
  cd ../..
  bolt build tokens theme css-reset
  if [ "$?" -eq 0 ]
  then
    msg 2 "✅ Dependencies built"
  else
    msg 2 "❌ Failed to build dependencies"
    exit 1
  fi
else
  msg "📦 Dependencies already built"
fi
