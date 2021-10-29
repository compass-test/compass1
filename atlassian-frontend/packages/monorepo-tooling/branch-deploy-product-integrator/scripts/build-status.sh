#! /bin/bash

# We don't execute the build on `master` branch.
if [[ "$bamboo_planRepository_branchName" == "master" ]]; then
    echo "Master branch is detected. Exiting..."
    exit 0
fi

export AF_VERSION_CONTENT="$(<.atlassian-frontend-version)"
export COMMIT_HASH="$(node -e 'console.log(JSON.parse(process.env.AF_VERSION_CONTENT).afCommitHash)')"
export AF_BRANCH_NAME="$(node -e 'console.log(JSON.parse(process.env.AF_VERSION_CONTENT).afBranchName)')"
export BITBUCKET_USER="$bamboo_bitbucket_afp_bot_user"
export BITBUCKET_PASSWORD="$bamboo_bitbucket_afp_bot_password"
export URL="$bamboo_buildResultsUrl"
export HAS_BUILD_FAILED="${bamboo_buildFailed}"
export BITBUCKET_REPO_FULL_NAME="atlassian/atlassian-frontend"

# Now, the atlassian frontend repository is checked out in its own directory.
cd atlassian-frontend

# Install yarn if not installed.
if ! command -v yarn &> /dev/null
then
    echo "Yarn is not installed. Installing..."
    npm install -g yarn
fi

# Checking which product will be running.
if [[ "$URL" == *"confluence"* ]]; then export NAME="Confluence Pipeline" && export STATE="INPROGRESS"; fi # The Confluence build is now gating.
if [[ "$URL" == *"jira"* ]]; then export NAME="Jira Pipeline [OPT]" && export STATE="STOPPED" && nvm install && nvm use; fi # The Jira build is optional.

cd build/legacy/ci-scripts && ./install-and-link-utils.sh

if [ "$1" != "-update" ]
then
  yarn upload-build-status --commit="$COMMIT_HASH" --url="$URL" --name="$NAME" --state="$STATE"
  echo "Uploading 'IN-PROGRESS' Build Status to Atlassian Frontend PR!"
else
  if [ "$HAS_BUILD_FAILED" == true ];
  then
      STATE="FAILED"
  else
      STATE="SUCCESSFUL"
  fi

  # The Jira build is not gating yet, we marked it as 'STOPPED'.
  if [[ "$URL" == *"jira"* ]]; then STATE="STOPPED"; fi

  yarn update-build-status --commit="$COMMIT_HASH" --url="$URL" --name="$NAME" --state="$STATE"
  echo "Updating '$STATE' Build Status to Atlassian Frontend PR!"
fi
