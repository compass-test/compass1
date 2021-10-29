---
date: '2021-09-27'
---

# Bundle Size

## What is the bundle size?

It is basically analyzing JavaScript collections of files using the source maps. This helps you understand where code bloat is coming from.

## Why does it matter?

When you talk about Apdex, load times or any performance app related, the bundle size is critical.

Analyzing it enables to optimize your dependencies and improve your app.

## How to measure the bundle size?

There are couple of tools that measure the bundle size:

- [Bundlephobia](https://bundlephobia.com)

- [Webpack-bundle-analyzer](https://www.npmjs.com/package/webpack-bundle-analyzer)

## How do we currently measure the bundle size in Atlaskit?

In Atlaskit, we use a tool _measure_ that uses Webpack-bundle-analyzer. In the past, we used local ratchet files to store the relevant output of the measure and we used them to compare between versions.
As this solution was not ideal, we moved the logic and the ratchet files to s3.

More about the journey:

- [Atlaskit+now+has+a+bundle+size+ratchet](https://hello.atlassian.net/wiki/spaces/AtlasKit/blog/2019/01/11/378834980/Atlaskit+now+has+a+bundle+size+ratchet).
- [Bundle size add on](https://hello.atlassian.net/wiki/spaces/AtlasKit/blog/2019/05/16/458923875/Atlaskit+-+Bundle+size+check+add-on) about it.
  .)
- [Release add-on to Atlaskit](https://hello.atlassian.net/wiki/spaces/TBTT/blog/2019/08/13/531210841/Atlaskit+PR+s+update....Bundle+size+checking...).
- [Bundle size V2](https://hello.atlassian.net/wiki/spaces/AFP/blog/2020/06/15/754260184/Bundle+Size+V2)

## Usage

### Locally

If you are unsure about what to do locally , please run: yarn measure --help

```
 Usage
        $ measure <[paths]>

      Options
        --analyze               Opens bundle analyzer report
        --entryPoints           Run the tool for each entrypoint per package
        --json                  Outputs measure stats as json
        --lint                  Lint mode fails build if size has been increased beyond threshold (except if used with s3 flag)
        --s3                    Run S3 flow
        --updateSnapshot        Update measure snapshots

      Examples
        $ measure editor-core editor-common
        $ measure editor-core --updateSnapshot
        $ measure editor-core --analyze
        $ measure button badge --entryPoints
```

### CI

In CI, the flow is using s3. Ratchet files are generated and stored by commit. Every hour, a custom build computes the master bundle size for all the packages, and then stores it on s3. A pull request page add-on will display a comparison between your s3 committed files to s3 _master_ or _develop_.

_Note:_ We are now using the `mergeBaseCommit` when it exists, if not it will default to the PR target branch.

As part of the reviewer duties, you will need to review those changes and approve them when reviewing the PR.

For further details, please read this [blog](https://hello.atlassian.net/wiki/spaces/TBTT/blog/2019/08/13/531210841/Atlaskit+PR+s+update....Bundle+size+checking...) or jump on [#bundle-size-addon](https://app.slack.com/client/TFCUTJ0G5/CJETTKT63/thread/CFGLY49D2-1565841834.207200) Slack channel.

## What is the most important information in a bundle size measurement?

As a developer, the output of the measure tool / file gives you a list of different measurements grouped in the following categories:

- Source code – the size of the source code of a measured package, which is split between main and async chunks.

- Main – includes all synchronously loaded code inside a give packages.

- Async – includes all asynchronously loaded code inside a package e.g. import('./something').then(...).

- External dependencies – basically, the size of everything that was imported from node_modules folder. Also split between async and main chunks.

- Atlassian Frontend dependencies – since we are Atlassian Frontend, we treat our dependencies differently. In addition, we want to have more detailed breakdown of how the dependencies contribute to the bundle size of other atlassian-frontend packages. In this category you can see what atlassian-frontend packages groups contributed to your package bundle size. Also split in main and async bundle following the same principles as previous categories.

- Combined size – since gzip can show different results depending on how many content the resulting bundle has, it makes sense to combine all chunks together and see how well they are compressed. Also split between main and async sub-chunks.

Local output example for a _package_:

`$ bolt measure button`

```
✔ Module  "button" passed bundle size check
  Source code:
    – main: 13.8 kB (4.43 kB)

  External Dependencies:
    – node_modules [main]: 16.3 kB (6.23 kB)  -1.09 kB (-14 B)

  Atlassian Frontend Dependencies:
    analytics:
      – main: 4.77 kB (1.35 kB)
    design-system:
      – main: 6.83 kB (2.03 kB)

  Combined:
    – main: 38.4 kB (12.4 kB)  -1.1 kB (-15 B)

The measure tool now stores ratchet files in s3, you can still run it locally, but the data maybe inaccurate.
No significant bundle size changes detected.
```

You can also measure the `entry-points` of a package and this is what is measured and displayed on the PR.

Local output example for a _package_ with `entry-points`:

`$ bolt measure button --entryPoints`

```
✔ Module  "button" > "types" passed bundle size check
✔ Module  "button" > "theme" passed bundle size check
✔ Module  "button" > "index" passed bundle size check
The measure tool now stores ratchet files in s3, you can still run it locally, but the data maybe inaccurate.
No significant bundle size changes detected.
```

If you want to see the local data, they are stored in the `.currentBundleSize` folder and the baseline `.masterBundleSize` (even if you are on `develop`).

Every hour, we published baseline bundle size data from `master` & `develop`.

S3 / CI output [example](https://s3-ap-southeast-2.amazonaws.com/atlaskit-artefacts/a109a0ff15a3/merged.json):

```
[
  {
    team: "Design System Team",
    package: "@atlaskit/breadcrumbs",
    entryPath: "index",
    version: "9.2.10",
    bitbucketBranch: "button-bundle-test",
    targetBranch: "master",
    mergeBaseCommit: "84e0804893",
    mainPkg: false,
    dependent: true,
    id: "src.main",
    name: "main",
    stats: {
      size: 7249,
      gzipSize: 2535,
      originalSize: 7249,
      newSize: 7249,
      sizeDiff: 0,
      gzipOriginalSize: 2535,
      gzipSizeDiff: 0,
    },
  },
  {
    team: "Design System Team",
    package: "@atlaskit/breadcrumbs",
    entryPath: "index",
    version: "9.2.10",
    bitbucketBranch: "button-bundle-test",
    targetBranch: "master",
    mergeBaseCommit: "84e0804893",
    mainPkg: false,
    dependent: true,
    id: "node_modules.main",
    name: "node_modules [main]",
    stats: {
      size: 62544,
      gzipSize: 19355,
      originalSize: 152531,
      newSize: 62544,
      sizeDiff: -89987,
      gzipOriginalSize: 50509,
      gzipSizeDiff: -31154,
    },
  },
  {
    team: "Design System Team",
    package: "@atlaskit/breadcrumbs",
    entryPath: "index",
    version: "9.2.10",
    mainPkg: false,
    dependent: true,
    id: "atlassian-frontend.analytics.main",
    name: "main",
    stats: {
      size: 4766,
      gzipSize: 1350,
      originalSize: 4766,
      newSize: 4766,
      sizeDiff: 0,
      gzipOriginalSize: 1350,
      gzipSizeDiff: 0,
    },
  },
  {
    team: "Design System Team",
    package: "@atlaskit/breadcrumbs",
    entryPath: "index",
    version: "9.2.10",
    mainPkg: false,
    dependent: true,
    id: "atlassian-frontend.design-system.main",
    name: "main",
    stats: {
      size: 32800,
      gzipSize: 9026,
      originalSize: 32844,
      newSize: 32800,
      sizeDiff: -44,
      gzipOriginalSize: 9062,
      gzipSizeDiff: -36,
    },
  },
  {
    team: "Design System Team",
    package: "@atlaskit/breadcrumbs",
    entryPath: "index",
    version: "9.2.10",
    bitbucketBranch: "button-bundle-test",
    targetBranch: "master",
    mergeBaseCommit: "84e0804893",
    mainPkg: false,
    dependent: true,
    id: "combined.main",
    name: "main",
    stats: {
      size: 103524,
      gzipSize: 30071,
      originalSize: 193557,
      newSize: 103524,
      sizeDiff: -90033,
      gzipOriginalSize: 61385,
      gzipSizeDiff: -31314,
    },
  },
  {
    team: "Design System Team",
    package: "@atlaskit/breadcrumbs",
    entryPath: "types",
    version: "9.2.10",
    bitbucketBranch: "button-bundle-test",
    targetBranch: "master",
    mergeBaseCommit: "84e0804893",
    mainPkg: false,
    dependent: true,
    id: "src.main",
    name: "main",
    stats: {
      size: 931,
      gzipSize: 452,
      originalSize: 931,
      newSize: 931,
      sizeDiff: 0,
      gzipOriginalSize: 452,
      gzipSizeDiff: 0,
    },
  },
  {
    team: "Design System Team",
    package: "@atlaskit/breadcrumbs",
    entryPath: "types",
    version: "9.2.10",
    bitbucketBranch: "button-bundle-test",
    targetBranch: "master",
    mergeBaseCommit: "84e0804893",
    mainPkg: false,
    dependent: true,
    id: "combined.main",
    name: "main",
    stats: {
      size: 931,
      gzipSize: 452,
      originalSize: 931,
      newSize: 931,
      sizeDiff: 0,
      gzipOriginalSize: 452,
      gzipSizeDiff: 0,
    },
  },
]
```
