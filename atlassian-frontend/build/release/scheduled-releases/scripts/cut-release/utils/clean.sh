#!/bin/bash

CURR_RELEASE="$1"
NEXT_RELEASE="$2"
RETURN_TO_BRANCH="$3"

if [ -z "$CURR_RELEASE" ]; then
  echo "😱 No argument supplied for current release - exiting"
  exit 1
fi
if [ -z "$NEXT_RELEASE" ]; then
  echo "😱 No argument supplied for next release - exiting"
  exit 1
fi
if [ -z "$RETURN_TO_BRANCH" ]; then
  RETURN_TO_BRANCH=$(git rev-parse --abbrev-ref HEAD)
  echo "✅ No argument supplied for branch to return to - defaulting to current branch, [$RETURN_TO_BRANCH]"
fi

# Get rid of tag for next release locally
git tag --delete "next-release-start-$2"
echo "✅ Deleted tag for next release locally"
# Get rid of tag for next release remotely
git push fork --delete "next-release-start-$2"
echo "✅ Deleted tag for next release remotely"
# Get rid of local and remote branch for current release
git branch -D "release-candidate/$1"
git push fork --delete "release-candidate/$1"
echo "✅ Deleted branch for next release locally, remotely"
# Go to an existing release and tag it as start of current release (for release notes)
git checkout next-release-start-radium
git tag --delete "next-release-start-$1"
git tag "next-release-start-$1"
git push fork --tags
echo "✅ Tagged [$1] release with same commit as [radium]"

# Go back to branch you want to execute your test from
git checkout "$RETURN_TO_BRANCH"
echo "✅ Returned to $RETURN_TO_BRANCH"