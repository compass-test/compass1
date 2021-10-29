---
title: Publishing Hotfixes
description: A guide to publishing hotfixes
date: '2021-09-27'
---

# How to publish Hotfixes

Hotfix releases are possible but should be avoided where **at all possible**. They introduce lots of room for mistakes and create a manual maintenance problem that we'd like to avoid.

Before creating a hotfix, first consider if your bug can be fixed by:

1. Upgrading to a stable version of the faulty package, if one exists
2. Add [yarn resolution](https://classic.yarnpkg.com/en/docs/selective-version-resolutions/) to bump transitive dependencies to a stable version
3. Releasing a patch to master and upgrading the package in products
4. Using a tool like [patch-package](https://www.npmjs.com/package/patch-package) (or similar) to patch the faulty version in products
5. If all else else fails, hotfix

> **All hotfixes must be approved by the AFP team. You will need to [ping whoever's on-call](https://atlassian.app.opsgenie.com/teams/dashboard/6cfc2879-3b4c-4820-970e-b682d27473ed) or ping !AFP in #atlassian-frontend to run the hotfix build on your behalf.**

## 1. Checkout defective commit

Checkout the commit or tag you are branching from and create a new branch from there. e.g.

```
git checkout @atlaskit/avatar@1.1.0               # you will be in a detached head state
git checkout -b hotfix/avatar-hotifx-for-stride   # create the new branch
```

## 2. Clean the workspace

Ensure that your workspace is completely clean (this ensures any testing isn't affected by changes on your local machine).

```
bolt clean    # removes all untracked files and directories
```

then perform a normal `bolt install`

```
bolt install
```

## 3. Applying changes

Apply manual changes and **test thoroughly**. _It is extremely important that this is done correctly_. How you test will depend on exactly what you are fixing, but in general building the package you are changing and `yarn link`-ing it will be useful.

## 4. Versioning

Once you are completely satisfied that the change is correct, **manually change its version** by editing it's package.json file.

The hotfix version should be the next available patch version, relative to the defective version. So, if the defective version is `1.5.2` the hot fix version should be `1.5.3`. If that was already taken, check 1.5.4, 1.5.5, etc. Use `npm view [package] versions` to get a list of all published versions of a package. For example: `npm view @atlaskit/avatar versions`

e.g. _packages/design-system/avatar/package.json_:

```diff
{
  "name": "@atlaskit/avatar"
- "version": "1.5.2"
+ "version": "1.5.3"
  ...
}
```

**Note:** If other monorepo packages depend on a specific version (non ranged, without a caret `^` or tilde `~`) of your package, then you'll have to update their dependent version to avoid a `bolt` installation error during the later building and publishing stage.

> **This is rare**. You don't need to do this if they're depending on a range such as `"@atlaskit/avatar": "^1.5.2"` (_note that caret `^`_).

e.g. _packages/consumer/component/package.json_:

```diff
{
  "dependencies": {
    ...
-   "@atlaskit/avatar": "1.5.2"
+   "@atlaskit/avatar": "1.5.3"
    ...
  }
}
```

**Git Tags are not always up to date. You should use npm as the source of truth.**

Commit the work to your branch with a git tag and descriptive message (**no changeset is required**). The `-m` flag is very important here as `git push --follow-tags` behaves strangely if this isn't present. Push the branch up with tags for future reference.

```bash
git commit -m "Hotfix for avatar to expose forgotten proptypes in version 1.5.0"
git tag @atlaskit/avatar@1.5.3 -m "@atlaskit/avatar@1.5.3"
git push --follow-tags
```

> The hotfix process deliberately avoids a changeset file as it's not necessary for the manual publishing process, and it allows us to avoid the knock on effect of automatic bumping of dependent packages within the monorepo.

## 5. Building and Publishing

**This step requires the hotfix password. If you don't know who on your team has the password the build should be handled by the current on-call AFP team member. You will need to alert them directly using Opsgenie at [go/page](http://go.atlassian.com/page).** Leave the team category as the default and set the Team to Page as `Atlassian Frontend Platform Team - Teamwork Platform`.

For `@atlassian` and `@atlaskit` packages, an AFP team member will run the custom `hotfix` pipeline on your branch (a password is required). This will take care of building and publishing the package.

For `@atlassiansox` packages, an AFP team member will run the custom `hotfix-sox` pipeline.

#### ⚠️ **PLEASE BE AWARE that the `hotfix-sox` pipeline can only be run on a SOX-compliant branch, which someone from AFP will create for you. This will automatically trigger the creation of Compliance tickets that you will be responsible for resolving by having _the commit hashes immediately preceding, and following, the creation of the compliant branch_ ready. This is an undesirable side effect of hotfixing `@atlassiansox` packages, and should be avoided unless _absolutely necessary_ (i.e., in the event of a HOT).**

## 6. Verifying

Confirm that we definitely haven't changed the `latest` tag:

```
$ npm info @atlaskit/avatar dist-tags
{ latest: '17.1.3', hotfix: '1.5.3' }
```

## 7. Recording

Once you've published a hotfix, be sure to record all relevant information about the fix on this page: [go/ak-hotfixes](https://hello.atlassian.net/wiki/spaces/AF/pages/964302643/Published+Hotfix+Register), so it can be tracked and referenced in the future.

## 8. Help product teams upgrade

You should [search all indexed Atlassian repos](https://developer.atlassian.com/cloud/framework/atlassian-frontend/development/09-search-code-across-all-repos/) to find instances of affected code and reach out to the respective product teams to help them upgrade.
