#!/usr/bin/env bash
source scripts/util.bash

section "post-build"

msg "📤 Uploading cache..."
bolt cache:deploy
if [ $? -eq 0 ]
then
  msg 2 "✅ Uploaded cache"
else
  msg 2 "❌ Failed to upload cache"
fi
