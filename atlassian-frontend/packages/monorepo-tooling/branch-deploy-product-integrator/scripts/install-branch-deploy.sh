#! /bin/bash

set -e
set -o pipefail

export PACKAGES="$PACKAGES"
export PRODUCT="$PRODUCT"
export BRANCH="$BITBUCKET_BRANCH"
export COMMIT="$BITBUCKET_COMMIT"
export PRODUCT_CI_PLANURL="$PRODUCT_PLAN_URL"

if [ "$BITBUCKET_BRANCH" != "master" ]; then

  cd packages/monorepo-tooling/branch-deploy-product-integrator
  # Link the CLI globally
  yarn link
  # cd back to atlassian-frontend root dir
  cd -

  # Compute if this is the first commit of the branch
  # We compare against master and develop to determine target branch.
  export COMMITS_FROM_MASTER=$(git rev-list --count origin/master..)
  export COMMITS_FROM_DEVELOP=$(git rev-list --count origin/develop..)

  echo "This branch is $COMMITS_FROM_MASTER ahead of master"
  echo "This branch is $COMMITS_FROM_DEVELOP ahead of develop"

  # Clone the product repository, we only shallow clone on the first commit.
  # Unfortunately, we can't use `CLONE_COMMIT_OVERRIDE` on a shallow clone.
  if [[ "$COMMITS_FROM_MASTER" == "1" || "$COMMITS_FROM_DEVELOP" == "1" ]]; then
    echo "First commit, we do a shallow clone..."
    branch-deploy-product-integrator clone-product-repo --shallow
  else
    echo "Any subsequent commit, we do a full clone..."
    # Setup the override commit and pass the flag if needed.
    # We check the length of the value passed in the override commit variable, in case, we don't use those variables or they default to an empty string.
    if [[ ${#CONFLUENCE_INTEGRATOR_OVERRIDE_COMMIT} -ge 8 || ${#JIRA_INTEGRATOR_OVERRIDE_COMMIT} -ge 8  ]]; then CLONE_OVERRIDE_COMMIT=$( echo --overrideCommit); fi
    branch-deploy-product-integrator clone-product-repo $CLONE_OVERRIDE_COMMIT
  fi

  # cd into product
  cd "$PRODUCT"

  # Logging the master commit in Product Integrator log
  MASTER_COMMMIT=$(git rev-parse master)
  echo 'The Product master branch commit is:' $MASTER_COMMMIT

  # Skipping side effects check
  export FIX_SIDE_EFFECTS_IN_CI_FOR_ATLASKIT_BRANCH_PREVIEWS="true"

  PACKAGES_FLAG=$([[ -n "$PACKAGES" ]] && echo "--packages $PACKAGES" || true)

  # In Jira, this command fails.
  nvm install && nvm use || true

  DEDUPE_FLAG=$([ "$DEDUPE" == "true" ] && echo --dedupe || true)

  PACKAGE_ENGINE=$([ "$PRODUCT" == "confluence" ] && echo "--packageEngine bolt" || echo "--packageEngine yarn")

  PRODUCT_CI_PLAN_URL_FLAG=$([[ -n "$PRODUCT_CI_PLANURL" ]] && echo "--productCiPlanUrl $PRODUCT_CI_PLANURL" || true)

  # Run the new integrator
  echo "Running the new integrator"
  branch-deploy-product-integrator push "$BRANCH" "$COMMIT" --ci $PACKAGE_ENGINE $PRODUCT_CI_PLAN_URL_FLAG $DEDUPE_FLAG $PACKAGES_FLAG | tee integrator.log.new

  # Log the output to an untracked file so that it does not get automatically committed during the integrator run and exit early
  mv integrator.log.new integrator.log

  if grep -q 'Branch deploy product integrator success!' integrator.log; then
    # Only add the logfile if the integrator succeeded and did not exit early
    git add -f integrator.log
    # If the logfile is identical to what is already committed, e.g. someone has re-ran the integrator, don't error
    set +e
    git commit -m 'Add integrator log' --author 'BOT Atlassian frontend branch deploy integrator <no-reply@atlassian.com>'
    COMMITTED=$?
    set -e
    if [ $COMMITTED -eq 0 ]; then
      git push
    fi
  fi
else
  echo "Current branch is master. Not going to branch deploy."
fi
