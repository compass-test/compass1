---
date: '2021-10-05'
---

# Continuous Integration

In Atlassian Frontend, we have many different build types with content/steps which are subject to change.
Please consult the latest [bitbucket-pipelines.yml](https://bitbucket.org/atlassian/atlassian-frontend/src/master/bitbucket-pipelines.yml) to learn which pipelines will run on your branches.

- `Default branch build` is the build triggered after any push to your branch on Bitbucket Cloud.
- `Pull request build` is the build triggered after a pull-request creation.

> We consider changes in a branch against its base (_forked from_) or target (_pull request destination_) branch.
>
> - We refer to packages containing touched files as `changed` packages.
> - We refer to packages that depend on these `changed` packages, as `dependents`.

We cache our tests results and we use horizontal scaling to speed up our builds, you can read all about it in this [blog](https://hello.atlassian.net/wiki/spaces/AF/blog/2021/08/31/1306752750/Speeding+up+tests+in+CI).

## Default branch build

The`default branch build` currently runs **8 parallel steps and 1 final step**.

1. This step creates/uploads the `default build status` and triggers async builds.
   - Build and deploy branch packages which builds packages (`cjs`, `esm`, `es2019`) and publishes them as alpha packages to our private npm registry, ready to be branch deployed
     - _If files within `/src` have changed._
   - Staging Atlaskit website hosted on Statlas
     - _If files within `/docs` or `/examples` have changed_
   - Staging Atlassian Design (Constellation) site
     - _If tooling related to the site or files within `/examples` have changed._
   - Bundle size build that runs on changed packages + dependents
     - _If files within `/src` have changed._
   - A flakey visual regression detection build that runs if VR test(s) have been modified.
2. This step caches `node_modules`.
   - We recently added our caching tooling to make build faster!
3. This step checks the `yarn.lock` file and the licenses of our packages and libraries.
   - We don't accept GPL licenses (exceptions might be possible - please reach out to us in #help-afp-monorepo)
4. This step runs linting and prettier checks.
5. This step runs stylelint and typecheck.
6. This step runs unit test for changed packages - in this step, tests results are cached and scaled horizontally if needed.
7. This step runs visual regression tests for changed packages in this step, tests results are cached and scaled horizontally if needed.
8. This step deploys service(s) if changed and if a changeset for such packages is available.
9. Lastly, in a final step, we update the final `default build status`.

> **Additional Product Integrator build:**
> At the end of the build and branch deploy packages, we trigger the product integrator build that applies your changes from Atlassian Frontend to Confluence & Jira. See this [page](/cloud/framework/atlassian-frontend/development/build/00-product-integration/) for further details.

## Pull request build

The `pull request build` currently runs **5 parallel steps and 1 final step**.

1. This step caches `node_modules`. We recently added our caching tooling to make build faster!
2. This step checks if packages changed are on `scheduled releases` and will comment on the PR if the target branch is wrongly selected. (`master` -> `continuous releases` and `develop` -> `scheduled releases`)
3. This step runs the package ownership service that adds reviewers based on the `teams.json`, the service can be opt-out by adding `WIP` or `[WIP]` to your PR title.
4. This step runs webdriver tests for changed packages - in this step, tests results are cached. Due to our restricted amount of slots on BrowserStack, we can't really scale horizontally this step.
5. This step triggers a flakey webdriver detection build that runs if integration / webdriver test(s) have been modified - this runs only for `editor` and `media` packages.
6. Lastly, in a final step, we send any build events.

## Landkid branch build

The `Landkid build` currently runs **9 parallel steps and 1 final step**.

1. This step checks if the changes in this pull request requires a `changeset`.
2. This step builds the packages (only `cjs`).
3. This step builds the packages types.
4. This step runs linting and prettier checks.
5. This step runs typecheck.
6. Those steps run all unit tests - in this step, tests results are cached and scaled horizontally if needed.
7. This step runs runs webdriver tests for changed packages + dependents - in this step, tests results are not cached for now.
8. This step runs runs visual regression tests for changed packages + dependents - in this step, tests results are cached and scaled horizontally if needed.
9. Lastly, in a final step, we check the `pull-request` target branch
   a. For `master`, we wait to see if any `master` build is running before merging.
   b. For `develop`, we run some additional tooling used for `scheduled-releases` (release comment, populate release dashboard data...)

## Master branch build

As of today on `Master build` runs **1 step** where we

- check the changesets
- build all our packages
- trigger production deployment to services if changeset
- release our packages and update changelogs
- push the code (and tags) to `master` branch.

## Custom builds

We have plenty of custom builds with different purposes that can be triggered manually, by the user or through the API, or scheduled.

To manually run a custom build you have different path / ways of doing it:

- In [Pipeline][pipeline] , click on `Run pipeline` , find your branch and run the custom Landkid.
- In [Branches][branches], find your branch click on the `…`, select `Run a pipeline` and run the custom build of your choice.
- In [Commits][commits] , search the latest commit of your build or access it through the pull request view, and click on the `Run pipeline` on the bottom left.

Handy custom builds when modifying test runners or making important libraries updates:

- `build-visual-regression`: runs desktop visual regression tests.
  - Specific packages, or all of them.
- `build-webdriver`: runs desktop webdriver tests.
  - Specific packages, or all of them.
- `full-suite`: runs most of our tooling in the repo - building, linting, all tests....

These builds and more can be found under the `custom` section in [bitbucket-pipelines.yml][pipelines].

[pipelines]: https://bitbucket.org/atlassian/atlassian-frontend/src/HEAD/bitbucket-pipelines.yml
[pipeline]: https://bitbucket.org/atlassian/atlassian-frontend/addon/pipelines/home
[branches]: https://bitbucket.org/atlassian/atlassian-frontend/branches/
[commits]: https://bitbucket.org/atlassian/atlassian-frontend/commits/
