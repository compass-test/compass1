# Advanced Roadmaps Create Plan wizard

A multi-step form that creates advanced roadmap plans. Mounted in a drawer in jira-frontend.

## How to develop

[https://hello.atlassian.net/wiki/spaces/~322826481/blog/2020/07/31/798706485/Minimize+the+wasting+waiting+time+on+JFE+when+integrating+AFE](https://hello.atlassian.net/wiki/spaces/~322826481/blog/2020/07/31/798706485/Minimize+the+wasting+waiting+time+on+JFE+when+integrating+AFE)

Generally the dev cycle will look like this:

- Develop most of your feature in storybook
- Link to Jira-frontend
- Update package with `yarn changeset`
- Update VR if needed
- Merge/Land the PR of this repo
- Wait 1 hour or so for the new version
- Bump JFE version and yarn install to update yarn.lock
- Regenerate flow types
- QA your feature on staging
- Merge in JFE

**WARNING** : It is VERY important to follow at least the semanitic versioning of patch (NO breaking changes, 100% backward compatible). Because on JFE we install using ~ so we can auto inherit i18n updates. I advise you just bump minor for ANY code change unless if you are absolutely certain it is fine.

## VR Testing

- Inside the packgage folder, run `node scripts/generate-examples` (or from root: `node packages/jira/jira-portfolio-plan-wizard/scripts/generate-examples.js`) to generate examples from `./src/ui/` to `./examples/`
- From the root folder, If you are expecting any changes run `yarn test:vr <PATH_TO_FILE> -u` to update, or `yarn test:vr jira-portfolio-plan-wizard --updateSnapshot` to update all
- From the root folder, run `yarn test:vr jira-portfolio-plan-wizard` if you want to check your VR passes
- Double check the `./src/__tests__/visual-regression/__images_snapshots__` for output, also errors and diff.
- Remember to commit all the screenshots when there is no errors or strange diff.

## Some commands you may need

```bash
## replace ~/work to however you get to your directories

## Starts storybook (development friendly)
alias @@afe-plan-wizard-start='cd ~/work/atlassian-frontend && nvm use && yarn storybook --verbose @atlassian/jira-portfolio-plan-wizard -s ./packages/jira/portfolio-plan-wizard/examples/assets'

## Yalc links AFE to your JFE
alias @@afe-link-jfe='cd ~/work/atlassian-frontend && nvm use && yarn link-pkg ../jira-frontend @atlassian/jira-portfolio-plan-wizard'

## Watches AFE and pushes changes to JFE (once linked)
alias @@afe-plan-wizard-watch='cd ~/work/atlassian-frontend && nvm use && yarn watch @atlassian/jira-portfolio-plan-wizard'

### Flow generation
# https://hello.atlassian.net/wiki/spaces/JPLAT/pages/836672135/Flow-patch+CLI+Generate+flow+type+declarations.#Step-1:-Adjust-.flowconfig-&-delete-existing-module-declarations

# Generates all the types
alias @@jfe-plan-wizard-generate-flow='cd ~/work/jira-frontend && nvm use && yarn run flow-patch generate ./node_modules/@atlassian/jira-portfolio-plan-wizard/dist/esm'

# apply patches that you've manually written (optional and not recommended, you can just patch this repo directly)
alias @@jfe-plan-wizard-generate-flow-patched='cd ~/work/jira-frontend && nvm use && yarn run flow-patch generate --patchFolderPath ./src/packages/platform/repo-tools/flowtype/src/patches ./node_modules/@atlassian/jira-portfolio-plan-wizard/dist/esm'

# Saves the patches and latest flow generations to git
alias @@jfe-plan-wizard-generate-flow-apply='cd ~/work/jira-frontend && nvm use && yarn run patch-package @atlassian/jira-portfolio-plan-wizard'

### Other

# Restarts watchman
alias @@watchman-kill='killall watchman'
```
