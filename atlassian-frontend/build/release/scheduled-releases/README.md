# Scheduled releases

Scripts & tooling that support Atlaskit scheduled releases.

See https://product-fabric.atlassian.net/wiki/spaces/AFP/pages/986055983/Scheduled+platform+releases.

## Scripts

### yarn create-release <releaseName> <nextReleaseName>

This should be run by the release manager when cutting a release. The script:

1. creates a release-candidate branch off latest develop
2. creates a tag marking the start of the next release
3. generates a set of release notes for the release and writes it to the /releases directory

Requires knowledge of next release name.

### yarn update-pr

Used as part of CI to comment the release that a PR merging into develop will fall into.

Currently runs in the after-script of successful landkid builds.

### yarn get-prs <releaseName> [forceRefetch (boolean)]

This script should be run by a release manager to get information about all PRs merged into a release.
Retrieves a list of relevant PR info for all PRs merged into a release. This is used to get a list of jira tickets/PRs in a release to then convert into jira links on a release page/PR.

If the second param is true, refetches data from bitbucket API, otherwise uses cached PR data if it exists.

This script should be run after a release has been cut.

### yarn label-issues <release-name> <pr-metadata-path>

This script should be run by a release manager to label all Jira issues with the release name they are included in.
The script requires that you have env variables set for BITBUCKET_USERNAME, BITBUCKET_PASSWORD, JIRA_USERNAME & JIRA_PASSWORD

You can create Jira API tokens here: https://id.atlassian.com/manage-profile/security/api-tokens

First, you need to generate the PR metadata for the release by running the get-prs script and outputting to a file (good to give the data a quick sanity check)

1. yarn run -s get-prs <release-name> > prMetadata.json
2. yarn run label-issues <release-name> prMetadata.json

### yarn generate-release-notes <releaseName>

Generates an aggregated set of release notes for a release based on changesets of the current branch since the time the release started.

Outputs to the releases directory
