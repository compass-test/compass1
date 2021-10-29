---
date: '2021-10-11'
---

# Versioning & Release

## Releasing packages

We use [changesets](https://github.com/atlassian/changesets) to manage the release of our packages.

Each package that is changed in a PR must be accompanied by a changeset that specifies what release type it is (major, minor, patch, none) and the associated changelog message for that change.

To create a changeset, run `yarn changeset`. This will then prompt you with questions related to the change such as whether it's a UX change, what packages were changed and the release type of each change.

If the change you have made does not constitute a release (see the 'NO RELEASE' versioning guidelines above), you need to run the `yarn changeset:none` command to create a special `none` changeset. If you're making a wide sweeping change that doesn't constitute a release, you can prefix your branch with `no-changeset/` to opt out of creating a changeset, although this is not encouraged.

After running the `changeset` command, it will create a changeset in the form of a markdown file in the `.changeset` folder with a unique filename that contains the metadata you added during the command. The changeset will then be consumed by the master release build on CI once the changeset is merged to master along with your PR.

### Running the `changeset` command

#### Step 1: Mark whether this is a UX change

Changes that affect the UX of a component/package need to be marked as a UX change to assist products in assessing the experience change when upgrading atlassian-frontend products. See [go/af-ccm](http://go.atlassian.com/af-ccm) for more information.

#### Step 2: Select packages to release

You will be prompted to select packages to release. This will be divided into
packages that have changes since their last release, and other packages (if you
believe something will need updating).

Press space to select an individual package, and enter once you have made your selection of
releases.

#### Step 2: Write a summary of the release

You will be prompted to write a summary. This will be used in the changelog for
the packages you have selected to release. Each changeset only contains one changelog message. Create multiple finer grained changesets to have individualised changelog messages.

#### Step 3: Select Versions

For each package you have chosen to release, you will be prompted to select a
version of that package. This will need to be either 'patch', 'minor', or
'major'.

Versions of dependent packages, i.e. packages that depend on the packages being released, may be automatically bumped and released themselves. See [what packages get released?](#what-packages-get-released-)

If you wanted to mark your package as 'none', run the `yarn changeset:none` command.

### Release pipeline

Packages will be versioned and published to npm as part of our [master build](https://bitbucket.org/atlassian/atlassian-frontend/addon/pipelines/home#!/results/branch/master/page/1/filters/%5BtriggerType=Push%5D) on CI.

The build will read all the changesets currently on master, calculate all packages that need to be released, update their versions and changelog entries and then publish them to npm.

#### What packages get released?

Changesets will release all packages specified in a changeset with a bump type of major, minor & patch.

Additionally, any dependent packages that have a version range that would fall out of range as a result of the dependency being bumped, will also be patch released with an updated version range on the dependency that satisfies the new version. This predominantly occurs for major releases of a package as most dependency version ranges are caret ranges (e.g. `^1.0.0`) which only match versions of a single major version. However, this can also occur for patch releases if a dependent has pinned their dependency versions to specific versions without a range.

#### When do version ranges get bumped?

Dependency version ranges on internal packages, i.e. packages that live in the repo, are updated in the following scenarios:

- The dependency version range no longer satisfies the latest version of the package
  - E.g. `"@atlaskit/modal` depends on `"@atlaskit/button": "^1.0.0"` and `@atlaskit/button` has a major changeset that will bump it to `2.0.0`
- A dependency is being minor released. All dependents will have their version ranges updated to ensure that minor version is the minimum version. This safeguards against relying on features added in newer versions than the minimum version specified in the version range ([DACI](https://hello.atlassian.net/wiki/spaces/AFP/pages/1272261739/Monorepo+DACI+001+Preventing+stale+minimum+version+dependency+ranges))
  - Dependents released in the same `master` release build as the dependency will have their version ranges updated as part of the release
  - Dependents that otherwise would not be released, will have their version ranges bumped but will _not_ be released. The version range bump will be released as part of the next release of that dependent.

We do _not_ update dependency version ranges for patch releases even if a dependency and dependent are released together ([RFC](https://hello.atlassian.net/wiki/spaces/AF/pages/717632661)). If you _do_ want the dependency version range updated in this case, either:

- consider whether it should be a patch release rather than a minor release if its new feature/functionality you're relying on
- consider pinning dependency versions if the dependency & dependent are very tightly coupled and will always be released and upgraded together by consumers
- create a separate changeset for the dependents explicitly updating their version ranges manually to the new patch version that would be created (this may need to be done after the original dependency is released)

## Versioning

All components must follow [Semver](http://semver.org/). For new components they should start in what's called "dev releases" at 0.0.0. While a component is in dev releases, it is considered unstable and not bound by normal Semver rules for versions above the first major release (1.0.0).

Although Semver leaves dev releases open to do anything you want, we will only make breaking changes in minor versions (i.e. 0.1.0). Features and non-breaking patches will still go into their normal versions. Basically, we still follow Semver in dev releases except that breaking changes go into minor releases.

For the sake of keeping things simple, refer to the [Semver spec](http://semver.org/) for anything this document does not cover.

### Versioning examples

Some examples of what would fall under the abstract semver umbrella:

1. **MAJOR** version when

- Changing named exports exposed via the main entry point or any declared custom entry points
- Changing and renaming public props.
- Making a public prop more restrictive in what it accepts.
- Icon sizes changing.
- Changes in CSS that can affect layout outside of a component. For example, changing display property from flex to block and vice-versa.
- Upgrade peer dependencies.
- You've made a visual change in a component that could affect someone using the public API. Box sizing could affect positioning, or child content. The value of a predefined prop like `size="xlarge"` could fall into this. These are addressed on a component-by-component basis.

2. **MINOR** version when

- Adding new features or API
- Anything that has a leading underscore.
- Anything inside render(). This includes elements, attributes and classes. For example, add / removing attributes or changing text content. Some integration tests may be relying on this, but it's still not a breaking change. It won't break you in production if you're using caret versions from NPM. It'll break your tests, but you'll update those prior to releasing anything. _We'll do our best to notify products of changes like this._

3. **PATCH** version when

- update package dependencies
- Directory structure changes
  - Reworking our directory structure. We offer a `dist/esm` build where the module field in the `package.json` points to the entry point within that folder. There should be no reason to reach into packages.

4. **NO RELEASE** when

- Update dev dependencies
- Add tests or examples
- Update examples
- Update internal documentation

### Dev releases

All components, whether they are being started fresh or being converted from another implementation, should start in dev releases. There's a few reasons for this.

#### Shipping often

We move fast and want to ship often. We don't want our consumers to be twiddling their thumbs at perfection. While stability is important, it's also important that we iterate during the build phase and are able to ship functionally atomic pieces until it reaches a 1.0.

This not only gives consumers an insight to a component's API and functionality, it allows us to have a discussion about them and further harden them if necessary.

#### Conveying stability

Versions do matter. If we release something at 1.0 and say we follow Semver, it tells consumers that this API is ready for prime time. If we realise we made some mistakes and have to reiterate them, it may cause some breaking changes. Using dev releases here gives us a grace period where we can harden a component while a consumer uses it. We will always have early adopters and later adopters. Let's leverage the former to help the latter.

_A version should specifically outline the overall stability of the component and where it's at in its greater evolutionary lifecycle._

#### Striking a balance

We want as many contributions as possible and we want to make the process as simple as possible for both parties.

For contributors, they want to feel empowered to make a useful contribution. Their time is also very limited, so we must respect that and use it as best as possible. For reviewers, we want to empower contributors and, like them, our time is also very limited.

It's important to strike a balance here because the more contributions we get, the better it is for us because it takes the brunt of the initial weight off our shoulders. By contributing components into our repo as dev releases, it allows contributors a bit more leeway in terms of getting an initial iteration into Atlaskit. Even if it has some nits and some things that need work, using dev releases gives us time to polish those off before going 1.0.

## Hotfix process (patching older versions)

For notes on how to publish a hotfix [please refer to this doc](../09-publishing-hotfixes).

## Deprecating and discontinuing support

Deprecating and eventually discontinuing the support of a package is never something we take lightly.

### Communicate intent

First and foremost, we should communicate our intent to deprecate and give reasoning. Internally, we should notify our consumers directly and discuss the ramifications of deprecating and eventually removing the package in question. It's also a good candidate for a blog post to get a wider opinion.

### Add the deprecated field to the package

Add a deprecated message to the package with the `atlassian.website.deprecated` field in package.json. E.g.:

TODO:

```js
  // package.json
  {
    "atlassian": {
      "website": {
        "name": "Package Name",
        "deprecated": "This is an internal component and should not be used directly.",
      }
    }
  }
```

### Deprecate

Based on the response to the communication, we should come up with a reasonable deprecation timeline where we still support the component and may offer bugfixes, but will discontinue feature development.

#### Add deprecation notice to package docs

We should add a deprecation notice to the top of the component docs that says something like:

> This package is deprecated and will be supported until [insert date].

If there is an alternative package, then documenting it would also be a good idea.

> This package is deprecated and will be supported until [insert date]. We recommend using [x package] instead.

Use @atlaskit/section-message component with appearance set to "error" in order to make the deprecation notice
visible in the component docs.

You can see examples of deprecation notices using SectionMessage in @atlaskit/single-select component docs.

#### Run `npm deprecate`

The `npm deprecate` command deprecates a version of a package, but it can be run on a version range. We should run this on the current version and any future versions and specify the same message that we put in the docs.

#### Wait it out

During the deprecation period, we may need to push a critical bug fix or two. We should strive not to have to do this, and encourage alternatives.

#### Communicate one last time

Give one last heads up to consumers. Internally this can be done via internal comms. This is also a good candidate for a blog post, but we do not need to wait for feedback at this point.

Go ahead and move on to the next step.

#### Delete!

Once you've notified everyone, create a PR deleting the package from our repository. No action needs to be taken on NPM as it's already deprecated and we don't want to unpublish it as it will probably still be depended on for some time.
