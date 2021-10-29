---
date: '2021-09-27'
---

# Product Integration

As a shared library that is heavily used by a wide range of Atlassian products, it is essential that we can easily integrate Atlassian frontend components and packages into products both before and after they are officially released.

Integrating in-development changes to components before they are released allows the changes to be validated and tested in products as part of the development phase rather than the post-release phase. This leads to more robust components that have less defects, more confidence in upgrading changes from products and less overall cost to the change.

Combined with our [Scheduled Release Workflow][release-workflow], this allows us to ship stable releases of our components by forcing us to tackle any integration challenges up-front rather than letting them fall by the wayside.

There are a number of different ways that we can integrate Atlassian frontend changes into Atlassian products:

- [Locally linking into products](#local-linking) - Linking changes on your local machine to a product repo
- [Branch deploys](#branch-deploys) - Building and deploying the changes in your branch to the cloud where they can then be installed in products
- [Product CI integration](#product-ci-integration) - Automated branch deploys in products that runs a subset of products CI and reports the status back to the original AF branch

<a id="local-linking"></a>

## Locally linking into products

Linking changes you've made on your local machine to another repo allows you to test your changes rapidly in real-time without having to wait for a full branch build every time you wish to make a change.

It's recommended to use this approach when you need to develop a component directly inside a product or to debug an issue that can only be reproduced in that product.

Read the [Local linking guide][linking-with-products] to learn how to do this.

<a id="branch-deploys"></a>

## Branch deploys

Branch deploys are a way to publish changes to all packages you've made in your development branch to a private npm internal registry (using commit hash) as a published package bundle that can then be installed in a product via traditional `yarn` / `bolt` / `npm` commands.

Read more about branch deploys [here][branch-deploys].

<a id="product-ci-integration"></a>

## Product CI Integration

Product CI integration takes [branch deploys][branch-deploys] one step further by automatically creating a branch in product repos that contains an installed version of your branch deployed packages. A subset of product CI is then automatically triggered and run on these branches and the result is reported back to your pull request as a build status.

The process is roughly as follows:

1. New commits are pushed to an AF branch - see this [page][continuous integration] about our CI to glance at what runs when pushing a new commit to an AF branch.
2. Build and branch deploy custom build that builds and deploy to a private registry the changed packages based on changesets then triggers the [product integrator][product-integrator] build in Bitbucket pipeline for each supported product.
3. The build:

   - Creates a new branch in product (or re-uses an existing branch) with the name `'atlaskit-branch-deploy-<ak-branch-name>'`, known as an _integrated branch_. **Please note that the name of the branch is susceptible to change**
   - In the product integrated branch, merges latest product master into the branch and resets package.json/yarn.lock back to their original state.
   - Installs changed packages based on the _changesets_ defined in the AF pull request / branch.
   - Pushes the product branch with the AF branch installed packages and triggers a subset of product CI builds.

4. Once the subset of product CI builds finishes, build status are reported back to the original AF commit as a build status. For now, the subset of Confluence build is _gating_ and the Jira one not yet - it is just marked as `STOPPED`. `STOPPED` status do not block pull request to be landed / merged.

![Product CI integration system][product-ci-integration-system]

See the [product integrator][product-integrator] for more detailed information on how this works.

### Important information

There are a few important things to note about this process:

- Product CI integration is now enabled on all branches by default.
- Product CI integration runs codemods and can potentially fail - see [codemods documentation][codemods]
- You should receive a comment on your PR detailing the branch deploy and the branch. Branch deploy links will not work until the product build finishes. A successful message does not mean the branch deployed succeeded, please check the corresponding product build in the PR panel.

![PR comment][product-ci-comment]

### FAQ / Troubleshooting

#### How can I opt-out of product integration?

Yes, you can opt-out of running the product integrator and triggering the product builds BUT it is not recommended.

However, we offer 2 ways of skipping product integration:

- Prepend `skip-product/`to your branch name - eg `skip-product/my-working-branch-no-tested-in-the-product`. In the case, you already have an opened branch then decided to opt-out, you would need to push a new commit, if not the previous builds will still be linked to the new `skip-product/branch`.
- Add in your `package.json`, the flag `disableProductCI`, and set it to true - **This flag will only work for packages on continuous release (targeting master)**.

#### Which products are we automatically integrating with?

Right now, confluence for all packages and Jira for a subset of AF packages - see the list of [packages][jira-packages] .

See [here][product-status] for the current status and where each product repo lives.

#### Why has the latest commit of my branch not integrated into product?

There are a few reasons why this may happen:

1. The product integrator build step of your atlassian-frontend pull request failed. The build step must pass to successfully integrate and branch deploys in products.
2. The product CI build step that publishes the branch deploy failed. You would need to investigate and maybe reach out to the respective product team slack channel to understand why. Most of the cases, it would be because of a codemod failure - refer to [codemods documentation][codemods] for further details or if Confluence: [How to troubleshoot a 🔴 Confluence build in Atlassian Frontend][confluence-troubleshoot].

#### Is branch deploying supported for non-@atlaskit scoped packages?

Yes, we currently support non-public packages from being branched deployed. There is one caveat for `@atlassiansox` packages that we publish to the private registry as `@atlassian/not-sox-` and use a `npm` alias to resolve them.

See this [page][branch-artefacts] for further details.

#### How do I get automatic product branch integration for Jira?

See this [guide][jira-guide].

if you still need to do it manually for a package not yet on the [packages list][jira-packages], please follow the steps below:

- Capture the alpha-version of the published packages to the private registry
- Run `yarn add <packages@alpha-version>` in Jira and run `yarn-deduplicate` if needed.
- Create a branch and push your changes to Jira repository.

<a id="product-ci-fixes"></a>

### Fixing product CI issues within product

Product CI running against an integrated AF branch can fail for one of two reasons:

1. A legitimate issue/regression originating from a change in the AF branch caused a test or build step to fail
2. An issue originating from the product's usage of a component from AF.

For us to detect issues originating from the AF side (1), we need to be able to eliminate issues originating from the product (2) so that product CI build failures only alert us when new or AF problems occur.

In most of the cases, you should try to use codemods to fix any issues on products CI build. Codemods are running as part of the product integrator build - refer to [codemods documentation][codemods] for further details.

If a manual fix is still needed, please see below on how to do it.

#### Making a fix

Possible CI failures that require a product fix commit are:

1. An API breaking change made on the AF side that requires consumers to update the API of a component
2. Tests that rely on internal implementation details that are not public API
3. Tests that break because of a changed internal implementation detail
4. New/fixed typechecking for a component that catch existing issues with product usages

To make a fix, checkout the product integrated branch in the product codebase, make the required changes, commit and push.

**Warning: We don't currently support fix commits that affect package.json/yarn.lock as they will automatically be overwritten by a future automated branch install commit.**

#### Merge conflicts

Updating a branch in a product with a fix commit may lead to merge conflicts that occur when the AF product integrator automatically merges product master into the integrated branch as part of the creating a branch install commit. These need to be fixed manually by following the README of the [@atlaskit/branch-deploy-product-integrator][integrator-package] package for any further Atlassian Frontend commits to successfully integrate into the existing product branch.

One way to avoid this is to try to get the fix commits into master if they are not coupled to the change made in atlassian-frontend. For example, any tests relying on internal implementation detail or incorrect usage of API (typechecking). See 'Incorporating a fix upstream' below.

#### Incorporating a fix upstream

If you've made a manual fix commit on your branch, it will need to be incorporated upstream somewhere so that it eventually lands in product.
There are a few different scenarios that need to be catered for.

##### Raising a PR against master

Merging any fix commits to master directly is the easiest way of incorporating your changes and can be done if they do not rely on the upcoming AF change you've made. For example, any tests relying on internal implementation detail or incorrect usage of API (typechecking).

This can be done by creating a PR from your own branch containing only your fix commits (via cherry-picking) and getting that reviewed by the relevant product team. Once this is merged, it will flow down to all other integrated branches when a new commit is added to their branch.

This approach sidesteps any merge conflicts that may arise if the manual fix commits stay on an integrated branch. Once the fix is in master, you can revert/rebase away your fix commits in integrated branches if they are causing merge conflicts.

##### Raising a PR against product develop

For any AF branches based off `develop`, their product CI failures will start impacting all other develop-based branches once the branch is merged into `develop`. As such, any fix commits required for product CI to go green will need to be applied to product develop as well so that other branches can stay green and not be affected red product CI caused by unrelated changes.

The same process as above applies but instead the PR will need to target product develop (`atlaskit-branch-deploy-develop`).

### Glossary

<table>
<tr><th>Term</th><th>Definition</th></tr>
<tr><td>AF</td><td>Atlassian Frontend</td></tr>
<tr><td>AK</td><td>Atlaskit, public packages hosted in Atlassian-frontend</td></tr>
<tr><td>Product</td><td>An Atlassian product</td></tr>
<tr><td>Product CI</td><td>The Continuous Integration system that a product uses to run their builds & tests</td></tr>
<tr><td>AK / AF branch deploy (noun)</td><td>The set of published packages of a branch that have been uploaded to our private registry</td></tr>
<tr><td>Product branch deploy (noun)</td><td>The deployed artifacts of a branch in product, that allow you to test the product in that branch. Either via query string (confluence) or fragment headers (jira).</td></tr>
<tr><td>Branch deploy (verb)</td><td>The action of producing an AK / AF Product branch deploy</td></tr>
<tr><td>Integrated branch</td><td>A branch in product containing an automated install of an AK / AF branch deploy, the name is prefixed with `atlaskit-branch-deploy-`</td></tr>
<tr><td>AK / AF Product integrator  </td><td>The bitbucket build that automatically creates and updates product integrated branches, located in our pipeline.yml file under `product-integrator-build`.</td></tr>
<tr><td>AK / AF develop</td><td>The develop branch in atlassian-frontend</td></tr>
<tr><td>Product develop</td><td>The integrated branch of develop in product.</td></tr>
<tr><td>Branch install commit</td><td>The automated commit made by the AK / AF product integrator</td></tr>
<tr><td>Product fix commit</td><td>A commit made in an integrated branch to fix a product CI failure. This could be a test that tests internal implementation or an API update after a breaking change.</td></tr>
</table>

#### Relevant sources:

- [Jira guide][jira-guide]
- [Product Integration 2.0][product-integration-2-0]
- [How to troubleshoot a 🔴 Confluence build in Atlassian Frontend][confluence-troubleshoot]

[branch-artefacts]: https://hello.atlassian.net/wiki/spaces/AF/blog/2020/11/09/937094442/Super+easy+branch+artefacts
[branch-deploys]: /cloud/framework/atlassian-frontend/development/build/01-branch-deploys
[continuous integration]: /cloud/framework/atlassian-frontend/development/08-continuous-integration/
[codemods]: /cloud/framework/atlassian-frontend/codemods/00-intro-to-codemods/
[confluence-troubleshoot]: https://hello.atlassian.net/wiki/spaces/AF/pages/1167964515/Troubleshoot+a+Confluence+build+in+Atlassian+Frontend
[integrator-package]: https://bitbucket.org/atlassian/atlassian-frontend/src/HEAD/packages/monorepo-tooling/branch-deploy-product-integrator
[jira-guide]: https://hello.atlassian.net/wiki/spaces/AF/blog/2020/11/22/948652325/How+to+automatically+test+and+view+your+Atlassian+Frontend+changes+in+Jira+Frontend
[jira-packages]: https://bitbucket.org/atlassian/atlassian-frontend/src/HEAD/packages/monorepo-tooling/branch-deploy-product-integrator/src/config.ts#lines-87
[linking-with-products]: /cloud/framework/atlassian-frontend/development/build/02-local-linking-with-products
[product-ci-integration-system]: /cloud/framework/atlassian-frontend/images/branch_integrator_flow_2.0.png
[product-ci-comment]: /cloud/framework/atlassian-frontend/images/product_ci_comment.png
[product-integrator]: https://bitbucket.org/atlassian/atlassian-frontend/src/HEAD/bitbucket-pipelines.yml#lines-501
[product-integration-2-0]: https://hello.atlassian.net/wiki/spaces/AFP/blog/2021/05/27/1167577128/Product+Integration+2.0
[product-status]: https://hello.atlassian.net/wiki/spaces/AFP/pages/908938554/Local+linking+with+product+repos
[release-workflow]: /cloud/framework/atlassian-frontend/getting-started/00-getting-started/#release-process
