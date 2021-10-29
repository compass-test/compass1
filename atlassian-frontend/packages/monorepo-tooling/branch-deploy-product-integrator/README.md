# `@atlaskit/branch-deploy-product-integrator`

This is a CLI that integrates atlaskit branch deploys into products.

Integrating atlaskit branch deploys into products allows us to leverage their CI to:

- detect any errors that occur in product CI before they are released
- obtain product branch deploys that can be used to test AK changes in a staging environment within products

The tool is run in two ways:

1. Automatically as part of integrator bamboo builds for certain products
2. Manually, required to resolve merge conflicts that cannot be resolved automatically by the tool

## Usage

Run `branch-deploy-product-integrator --help` for usage details.

The main functionality is under the `push` command.

## How it works

On the first run, in its most basic form, it:

1. Creates a branch in a product repo corresponding to a branch in atlassian-frontend
2. Installs an atlaskit branch deploy using a supplied commit hash
3. Pushes the branch

On subsequent runs, it reuses the same product branch so that any manual commits, made to fix product CI, are not lost. Example manual commits could be:

- Updating API of a component after a breaking change
- Fixing incorrect types that are now revealed after component API types are fixed
- Fixing issues in product test framework or helper methods that are exposed by a change in component behaviour

Since we reuse the same branch, we need to be careful of previously installed branch deployed versions of atlaskit packages lingering around from a previous run. To alleviate this, we reset package.json, yarn.lock and all workspace package.json back to their version on `master` before installing the latest branch deploy.

Subsequent runs also merge the latest `master` branch in product into the integrated branch so that it does not fall out of date, which is especially important for long living atlaskit branches such as `develop`.

Because we merge `master` into the integrated branch, there is a chance that merge conflicts arise. We can resolve any conflicts in package.json's & yarn.lock by resolving to the version on `master` since we reset them back to `master` anyway before a branch install. However, because manual 'fix' commits can occur as described above, there is a possibility that a merge conflict occurs in other files that we cannot resolve automatically. In those cases, the tool must be manually run as described below in [Resolving merge conflicts](#merge-conflicts).

<a id="merge-conflicts"></a>

## Manually resolving merge conflicts

**NOTE: This only needs to happen if you've made manual changes to your branch in product. We are moving away from this model towards an automated product change management model using codemods to prevent these issues from occurring**

You will need to manually resolve merge conflicts that cannot be automatically resolved by the tool. This is pointed out in the error message of an integrator ci build that encounters these. Merge conflicts should only need to be resolved manually if you have made a manual fix commit to your branch. If you haven't, then reach out to the afp team in #atlassian-frontend as it may be an issue with this integrator CLI itself.

To resolve merge conflicts manually, perform the following steps:

1. Checkout and setup the product repo locally (nvm, install node_modules). See [here](https://product-fabric.atlassian.net/wiki/spaces/AFP/pages/1026263059/Linking+with+product+repos) for a list of the product repos.
2. Globally link this tool by running the following in atlassian-frontend:

```sh
$ cd packages/monorepo-tooling/branch-deploy-product-integrator
$ yarn link
```

3. Ensure the product repo sits alongside the atlassian-frontend repo and that the directory name is `atlassian-frontend`
4. In the product repo, run the tool with your atlaskit branch name and the commit hash of the last commit of the branch:

**NOTE: You may want to double check you're passing all the relevant flags, you can cross-reference the command with what is being executed in [install-branch-deploy.sh](../../../services/bamboo-templates/branch-deploy-integrator/install-branch-deploy.sh). You should omit the `--ci` and `--productCiPlan` related flags.**

```sh
$ branch-deploy-product-integrator push <atlaskitBranchName> <atlaskitCommitHash> --packageEngine <bolt/yarn> --dedupe
```

You can also add the `--no-push` argument if you would like to prevent the tool from pushing the commits after resolving, if you want to inspect them before doing so.

5. Once the tool encounters unresolvable merge conflicts, it will provide a prompt, asking you to resolve the merge conflicts manually. Resolve all unmerged conflicts manually and stage them in another terminal (e.g. `git add`).
6. Answer the prompt to let the tool continue the integration process
7. If all went well, it should have successfully commited the merge conflicts, installed the latest branch deploy and pushed the changes. If you used `--no-push`, you will need to manually push the changes yourself with `git push`.

## Development

There are two main modes of development, testing the CLI locally and testing in conjunction with our integrator bamboo builds.

To test with our integrator bamboo builds, follow the development steps in `services/bamboo-templates/branch-deploy-integrator`.

To test the CLI locally, we adopt the same method as when running manually.

1. Cd into this package
2. Run `yarn link`. The tool is now globally linked and can be run in a product repo. Use the `--no-push` argument to ensure it does not push.

You can also debug by running `node --inspect-brk /usr/local/bin/branch-deploy-product-integrator ...` and attaching via chrome inspector or vscode debugger.

We have some unit test stubs, and ideally it would be good to have integration tests as well, feel free to contribute :)

When testing in Confluence you can also use:

```
 COMMIT_HASH=#commithashyouwannatestwith# PRODUCT=confluence PACKAGE_ENGINE=bolt PACKAGE_ENGINE_CMD=add node /PATH/TO/YOUR/COMMIT_HASH/OF/atlassian-frontend/packages/monorepo-tooling/branch-deploy-product-integrator/bin/branch-deploy-product-integrator push $RANDOM $COMMIT_HASH --ci --packageEngine bolt --cmd add --dedupe --no-push
```
