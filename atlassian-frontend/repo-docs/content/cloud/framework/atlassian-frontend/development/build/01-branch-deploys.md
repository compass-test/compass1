---
date: '2021-09-27'
---

# Branch deploys

Branch deploys are a way to publish changes to all packages you've made in your development branch to a private npm internal registry (using commit hash) as a published package bundle that can then be installed in a product via traditional `yarn` / `bolt` / `npm` commands.

This allows you to test your changes in as prod-like a way as possible and provides an easy way to test your changes in products before they are officially released to npm.

Note: The term branch deploys is slightly overloaded, it can refer to either the published package artifacts of your branch OR the process of building and publishing itself.

## Deploying

By default, every branch build will automatically perform a branch deploy containing all packages that would be released, as decided by `changesets`, when merged to master. This includes any changesets that are yet to be released on the target branch.

> For example, if you create a PR that is targeting `develop` and the `develop` branch has changesets yet to be released, then a branch deploy will be automatically made for your PR (regardless of if your PR includes any changesets).

## Installing

There are 2 modes of installing a branch deploy

### Package per package

This is the easiest mode to use, in your target repo checkout follow these steps:

1. `npm set @atlaskit:registry https://packages.atlassian.com/api/npm/atlassian-npm/ --userconfig .npmrc`
2. `yarn add #yourPackage#@#commitHash#`
3. Done, if you want CI to work you'll have to check in the changes made to the `.npmrc`

_Note:_ For the `@atlassiansox` scope step 2 needs to use a npm alias: `yarn add @atlassiansox/#yourpackagename#@npm:@atlassian/not-sox-#yourpackagename#@702774d3b9875f66011e6dc9c7c42439a9fdc06f`, if done properly the updated package.json will look something like: `"@atlassiansox/cross-flow-support": "npm:@atlassian/not-sox-cross-flow-support@702774d3b9875f66011e6dc9c7c42439a9fdc06f",`

_Note #2_ This mode does not execute codemods for your new packages, you will have to run this manually ([see also][codemods]). You can do this by running:

```
npx @atlaskit/codemod-cli --since-ref HEAD --extensions ts,tsx --parser tsx src/
npx @atlaskit/codemod-cli --since-ref HEAD --extensions js --parser babel src/
```

### Product CI integration mode

This mode is what is used for the product CI integration's in Confluence & Jira. This mode also runs the associated codemods and deduplicates packages. It attempts to simulate how Renovate would create an upgrade PR (Although package grouping for renovate will differ).

**NOTE**: If you need to resolve merge conflicts as part of branch deploys that are automatically integrated into products, you should use the specific `@atlaskit/branch-deploy-product-integrator` tool by following its [README][branch-deploy-product-integrator].
In addition, the usage of [branch-installer][branch-installer] is **deprecated**, we don't recommend using this tool, instead, rely on the current automation of the product integrator build.
if any issues / question, please reach out to `!disturbed` in [atlassian-frontend][https://atlassian.slack.com/archives/cl6hc337z].

### Relevant sources:

- [bitbucket-pipelines.yml][pipelines]
- [branch-deploy-product-integrator][branch-deploy-product-integrator]
- [Product Integrator][product-integrator]
- [How to automatically test and view your Atlassian Frontend changes in Jira Frontend][jira-guide]
- [Super easy branch artefacts][branch-artefacts]

[branch-deploy-product-integrator]: https://bitbucket.org/atlassian/atlassian-frontend/src/HEAD/packages/monorepo-tooling/branch-deploy-product-integrator/
[branch-artefacts]: https://hello.atlassian.net/wiki/spaces/AF/blog/2020/11/09/937094442/Super+easy+branch+artefacts
[codemods]: /cloud/framework/atlassian-frontend/codemods/01-atlassian-codemods/
[jira-guide]: https://hello.atlassian.net/wiki/spaces/AF/blog/2020/11/22/948652325/How+to+automatically+test+and+view+your+Atlassian+Frontend+changes+in+Jira+Frontend
[product-integrator]: /cloud/framework/atlassian-frontend/development/build/00-product-integration/
[pipelines]: https://bitbucket.org/atlassian/atlassian-frontend/src/HEAD/bitbucket-pipelines.yml
