# @atlaskit/website

## 6.8.1

### Patch Changes

- Updated dependencies

## 6.8.0

### Minor Changes

- [`fa6105ab587`](https://bitbucket.org/atlassian/atlassian-frontend/commits/fa6105ab587) - Example themes now persist across renders & refreshes

## 6.7.4

### Patch Changes

- Updated dependencies

## 6.7.3

### Patch Changes

- [`5fe6e21a9a0`](https://bitbucket.org/atlassian/atlassian-frontend/commits/5fe6e21a9a0) - [ux] Upgrade to the latest version of @atlaskit/modal-dialog. This change includes shifting the primary button in the footer of the modal to be on the right instead of the left.
- Updated dependencies

## 6.7.2

### Patch Changes

- [`fb61868bd81`](https://bitbucket.org/atlassian/atlassian-frontend/commits/fb61868bd81) - Internal patch to `@atlaskit/navigation` to remove dependency on `@atlaskit/theme/math`.
- Updated dependencies

## 6.7.1

### Patch Changes

- Updated dependencies

## 6.7.0

### Minor Changes

- [`1c4079ad349`](https://bitbucket.org/atlassian/atlassian-frontend/commits/1c4079ad349) - [ux] Package nav links to atlassian.design now have an outgoing link icon, and act consistently on right click

## 6.6.0

### Minor Changes

- [`f5b0ebafe71`](https://bitbucket.org/atlassian/atlassian-frontend/commits/f5b0ebafe71) - Add support for the new token-based theming system in examples. Enable by adding 'mode=light' as a query parameter on isolated examples

### Patch Changes

- Updated dependencies

## 6.5.0

### Minor Changes

- [`04f188b4330`](https://bitbucket.org/atlassian/atlassian-frontend/commits/04f188b4330) - [ux] Added controls in fullscreen and modal example views to allow users to choose a token theme. The controls will appear for packages that import @atlaskit/tokens, or if an environment variable is set (ENABLE_TOKENS=true)

### Patch Changes

- Updated dependencies

## 6.4.7

### Patch Changes

- Updated dependencies

## 6.4.6

### Patch Changes

- [`cd488f9d370`](https://bitbucket.org/atlassian/atlassian-frontend/commits/cd488f9d370) - Bumps prismjs to address a security vulnerability in the underlying lib.

## 6.4.5

### Patch Changes

- Updated dependencies

## 6.4.4

### Patch Changes

- [`b80c6b31558`](https://bitbucket.org/atlassian/atlassian-frontend/commits/b80c6b31558) - Update redirects for legacy URLs

## 6.4.3

### Patch Changes

- [`f3799e8cb2a`](https://bitbucket.org/atlassian/atlassian-frontend/commits/f3799e8cb2a) - Update organisation field in service descriptor

## 6.4.2

### Patch Changes

- Updated dependencies

## 6.4.1

### Patch Changes

- [`ee99273096b`](https://bitbucket.org/atlassian/atlassian-frontend/commits/ee99273096b) - Fixed docs not showing in main nav & wrong link showing in search results

## 6.4.0

### Minor Changes

- [`c99d6adb3f2`](https://bitbucket.org/atlassian/atlassian-frontend/commits/c99d6adb3f2) - Adds axe-core in dev mode

### Patch Changes

- [`0e3333cd10a`](https://bitbucket.org/atlassian/atlassian-frontend/commits/0e3333cd10a) - Corrects usage of modal dialog types.
- [`7ba7af04db8`](https://bitbucket.org/atlassian/atlassian-frontend/commits/7ba7af04db8) - Type fixes related to consumption of `@atlaskit/code`
- Updated dependencies

## 6.3.1

### Patch Changes

- [`08af4eb0d17`](https://bitbucket.org/atlassian/atlassian-frontend/commits/08af4eb0d17) - Upgrade @atlassiansox/analytics-web-client dependency to ^2.1.6 and import via main entry point instead of with-deps where applicable.

## 6.3.0

### Minor Changes

- [`82e118321e0`](https://bitbucket.org/atlassian/atlassian-frontend/commits/82e118321e0) - add msw to use for website examples

## 6.2.0

### Minor Changes

- [`90248160238`](https://bitbucket.org/atlassian/atlassian-frontend/commits/90248160238) - [ux] Moves the AK website to consume the AK Code Component rather than rolling its own version. AK website examples now use the dark variant of the CodeBlock component to render code.

## 6.1.6

### Patch Changes

- Updated dependencies

## 6.1.5

### Patch Changes

- [`d8a707736d2`](https://bitbucket.org/atlassian/atlassian-frontend/commits/d8a707736d2) - Add redirection page to have permanent link to the private documentation preview

## 6.1.4

### Patch Changes

- [`18f2f68a7c8`](https://bitbucket.org/atlassian/atlassian-frontend/commits/18f2f68a7c8) - remove unused third party scripts

## 6.1.3

### Patch Changes

- [`acc15aa450b`](https://bitbucket.org/atlassian/atlassian-frontend/commits/acc15aa450b) - Website no longer redirects to constellation in devmode

## 6.1.2

### Patch Changes

- [`d361f290d63`](https://bitbucket.org/atlassian/atlassian-frontend/commits/d361f290d63) - NO-ISSUE avoid bundling test data for development

## 6.1.1

### Patch Changes

- Updated dependencies

## 6.1.0

### Minor Changes

- [`d59ff0f283`](https://bitbucket.org/atlassian/atlassian-frontend/commits/d59ff0f283) - Bumped up react-helmet to fix 'Maximum call stack size exceeded’ issue

## 6.0.17

### Patch Changes

- [`d3265f19be`](https://bitbucket.org/atlassian/atlassian-frontend/commits/d3265f19be) - Transpile packages using babel rather than tsc

## 6.0.16

### Patch Changes

- Updated dependencies

## 6.0.15

### Patch Changes

- [`5f58283e1f`](https://bitbucket.org/atlassian/atlassian-frontend/commits/5f58283e1f) - Export types using Typescript's new "export type" syntax to satisfy Typescript's --isolatedModules compiler option.
  This requires version 3.8 of Typescript, read more about how we handle Typescript versions here: https://atlaskit.atlassian.com/get-started
  Also add `typescript` to `devDependencies` to denote version that the package was built with.

## 6.0.14

### Patch Changes

- Updated dependencies

## 6.0.13

### Patch Changes

- [`78e52e2c54`](https://bitbucket.org/atlassian/atlassian-frontend/commits/78e52e2c54) - Allowing private packages to be displayed on staging Atlaskit site.

## 6.0.12

### Patch Changes

- Updated dependencies

## 6.0.11

### Patch Changes

- [`ae7383d754`](https://bitbucket.org/atlassian/atlassian-frontend/commits/ae7383d754) - Bumping prismjs to ^1.21.0 & types to ^1.16.1 to avoid XSS security issue.

## 6.0.10

### Patch Changes

- [`d1d709af68`](https://bitbucket.org/atlassian/atlassian-frontend/commits/d1d709af68) - Exclude private packages for public website build

## 6.0.9

### Patch Changes

- [`03b3e15984`](https://bitbucket.org/atlassian/atlassian-frontend/commits/03b3e15984) - Do not load private packages in public website

## 6.0.8

### Patch Changes

- [`7315203b80`](https://bitbucket.org/atlassian/atlassian-frontend/commits/7315203b80) - Rename `AkCode` and `AkCodeBlock` exports to `Code` and `CodeBlock` for `@atlaskit/code`.
- Updated dependencies

## 6.0.7

### Patch Changes

- [`6c525a8229`](https://bitbucket.org/atlassian/atlassian-frontend/commits/6c525a8229) - Upgraded to TypeScript 3.9.6 and tslib to 2.0.0

  Since tslib is a dependency for all our packages we recommend that products also follow this tslib upgrade
  to prevent duplicates of tslib being bundled.

## 6.0.6

### Patch Changes

- Updated dependencies

## 6.0.5

### Patch Changes

- [`7cf33690be`](https://bitbucket.org/atlassian/atlassian-frontend/commits/7cf33690be) - Remove cards that were pointing to private urls & create a component to handle Getting Started public message.

## 6.0.4

### Patch Changes

- [`15520b5f80`](https://bitbucket.org/atlassian/atlassian-frontend/commits/15520b5f80) - Remove IE11 from browserslist and replace by Edge>=18.

## 6.0.3

### Patch Changes

- Updated dependencies

## 6.0.2

### Patch Changes

- [`0c532edf6e`](https://bitbucket.org/atlassian/atlassian-frontend/commits/0c532edf6e) - Use the 'lodash' package instead of single-function 'lodash.\*' packages

## 6.0.1

### Patch Changes

- [`82371b6401`](https://bitbucket.org/atlassian/atlassian-frontend/commits/82371b6401) - Remove preload example functionality. This reverts to previous behaviour where examples are fetched and deployed on button click. This means the "relative import" error will also only be shown after button click.

## 6.0.0

### Major Changes

- [`87f4720f27`](https://bitbucket.org/atlassian/atlassian-frontend/commits/87f4720f27) - Officially dropping IE11 support, from this version onwards there are no warranties of the package working in IE11.
  For more information see: https://community.developer.atlassian.com/t/atlaskit-to-drop-support-for-internet-explorer-11-from-1st-july-2020/39534

### Patch Changes

- Updated dependencies

## 5.2.32

### Patch Changes

- Updated dependencies

## 5.2.31

### Patch Changes

- [`64e7f3f077`](https://bitbucket.org/atlassian/atlassian-frontend/commits/64e7f3f077) - Bump dependency query-string to ^5.1.0

## 5.2.30

### Patch Changes

- [`894c17aafc`](https://bitbucket.org/atlassian/atlassian-frontend/commits/894c17aafc) - Use async-retry instead of our own implementation and fix the logic for deploying the website.

## 5.2.29

### Patch Changes

- [`4560b65a4f`](https://bitbucket.org/atlassian/atlassian-frontend/commits/4560b65a4f) - upgrade react-transition-group to latest

## 5.2.28

### Patch Changes

- Updated dependencies

## 5.2.27

### Patch Changes

- [`b7f97ccea4`](https://bitbucket.org/atlassian/atlassian-frontend/commits/b7f97ccea4) - upgrade extract-react-types-loader from 0.3.9 to 0.3.12

## 5.2.26

### Patch Changes

- [`e826bd26be`](https://bitbucket.org/atlassian/atlassian-frontend/commits/e826bd26be) - \*.atlassian.com allowed in CSP headers

## 5.2.25

### Patch Changes

- Updated dependencies

## 5.2.24

### Patch Changes

- [`0c168002d1`](https://bitbucket.org/atlassian/atlassian-frontend/commits/0c168002d1) - Fix mouse event regression with 'changelog' button on component page

## 5.2.23

### Patch Changes

- [`01214127c9`](https://bitbucket.org/atlassian/atlassian-frontend/commits/01214127c9) - Updated netlify-cli to latest version, updated website-constellation constants to reflect .env functionality in netlify dev- [`bdd51958f7`](https://bitbucket.org/atlassian/atlassian-frontend/commits/bdd51958f7) - Add 'show more' / 'show less' functionality to the LatestChangeset panel- Updated dependencies

## 5.2.22

### Patch Changes

- [patch][196518ccc9](https://bitbucket.org/atlassian/atlassian-frontend/commits/196518ccc9):

  Commenting sending events to the analytics service.

## 5.2.21

### Patch Changes

- [patch][0ef8a7a973](https://bitbucket.org/atlassian/atlassian-frontend/commits/0ef8a7a973):

  Update sites & webpack config to support new atlassian website metadata fields as per https://hello.atlassian.net/wiki/spaces/~hobweger/pages/668331437/RFC+atlassian-frontend+package+categories+and+.jsons- Updated dependencies [0ef8a7a973](https://bitbucket.org/atlassian/atlassian-frontend/commits/0ef8a7a973):

  - @atlaskit/webpack-config@2.1.2

## 5.2.20

### Patch Changes

- [patch][1d31492be9](https://bitbucket.org/atlassian/atlassian-frontend/commits/1d31492be9):

  Added auth integration to website-constellation and associated ui elements in gatsby theme brisk- Updated dependencies [5f5b93071f](https://bitbucket.org/atlassian/atlassian-frontend/commits/5f5b93071f):

- Updated dependencies [9d2da865dd](https://bitbucket.org/atlassian/atlassian-frontend/commits/9d2da865dd):
- Updated dependencies [4d3749c9e6](https://bitbucket.org/atlassian/atlassian-frontend/commits/4d3749c9e6):
- Updated dependencies [9a93eff8e6](https://bitbucket.org/atlassian/atlassian-frontend/commits/9a93eff8e6):
- Updated dependencies [d49ebd7c7a](https://bitbucket.org/atlassian/atlassian-frontend/commits/d49ebd7c7a):
- Updated dependencies [6dcad31e41](https://bitbucket.org/atlassian/atlassian-frontend/commits/6dcad31e41):
- Updated dependencies [8c9e4f1ec6](https://bitbucket.org/atlassian/atlassian-frontend/commits/8c9e4f1ec6):
- Updated dependencies [3cbc8a49a2](https://bitbucket.org/atlassian/atlassian-frontend/commits/3cbc8a49a2):
  - @atlaskit/code@11.1.4
  - @atlaskit/media-card@67.1.1
  - @atlaskit/modal-dialog@10.5.5
  - @atlaskit/navigation@36.0.4
  - @atlaskit/media-test-helpers@27.1.0
  - @atlaskit/media-core@31.1.0
  - @atlaskit/docs@8.5.0
  - @atlaskit/media-filmstrip@38.0.0

## 5.2.19

### Patch Changes

- [patch][66dcced7a0](https://bitbucket.org/atlassian/atlassian-frontend/commits/66dcced7a0):

  Update pretty-proptypes dependency in @atlaskit/docs added a PropTable component to render prop-types in a table
  Added automatic prop-resolution behaviour to @atlaskit/gatsby-theme-brisk- [patch][5ccd5d5712](https://bitbucket.org/atlassian/atlassian-frontend/commits/5ccd5d5712):

  ED-8822: promote internal packages from peer to automatically installed dependencies- Updated dependencies [66dcced7a0](https://bitbucket.org/atlassian/atlassian-frontend/commits/66dcced7a0):

- Updated dependencies [fd5292fd5a](https://bitbucket.org/atlassian/atlassian-frontend/commits/fd5292fd5a):
- Updated dependencies [196500df34](https://bitbucket.org/atlassian/atlassian-frontend/commits/196500df34):
- Updated dependencies [64fb94fb1e](https://bitbucket.org/atlassian/atlassian-frontend/commits/64fb94fb1e):
- Updated dependencies [be57ca3829](https://bitbucket.org/atlassian/atlassian-frontend/commits/be57ca3829):
- Updated dependencies [d7ed7b1513](https://bitbucket.org/atlassian/atlassian-frontend/commits/d7ed7b1513):
- Updated dependencies [41a2496393](https://bitbucket.org/atlassian/atlassian-frontend/commits/41a2496393):
- Updated dependencies [39ee28797d](https://bitbucket.org/atlassian/atlassian-frontend/commits/39ee28797d):
- Updated dependencies [5ccd5d5712](https://bitbucket.org/atlassian/atlassian-frontend/commits/5ccd5d5712):
- Updated dependencies [fd5292fd5a](https://bitbucket.org/atlassian/atlassian-frontend/commits/fd5292fd5a):
- Updated dependencies [8b9598a760](https://bitbucket.org/atlassian/atlassian-frontend/commits/8b9598a760):
- Updated dependencies [bbf5eb8824](https://bitbucket.org/atlassian/atlassian-frontend/commits/bbf5eb8824):
- Updated dependencies [eea5e9bd8c](https://bitbucket.org/atlassian/atlassian-frontend/commits/eea5e9bd8c):
- Updated dependencies [695e1c1c31](https://bitbucket.org/atlassian/atlassian-frontend/commits/695e1c1c31):
- Updated dependencies [6b06a7baa9](https://bitbucket.org/atlassian/atlassian-frontend/commits/6b06a7baa9):
- Updated dependencies [fd5292fd5a](https://bitbucket.org/atlassian/atlassian-frontend/commits/fd5292fd5a):
- Updated dependencies [109c1a2c0a](https://bitbucket.org/atlassian/atlassian-frontend/commits/109c1a2c0a):
- Updated dependencies [c57bb32f6d](https://bitbucket.org/atlassian/atlassian-frontend/commits/c57bb32f6d):
- Updated dependencies [8b34c7371d](https://bitbucket.org/atlassian/atlassian-frontend/commits/8b34c7371d):
  - @atlaskit/docs@8.4.0
  - @atlaskit/icon-object@5.0.3
  - @atlaskit/icon@20.1.0
  - @atlaskit/logo@12.3.3
  - @atlaskit/media-test-helpers@27.0.0
  - @atlaskit/webdriver-runner@0.3.0
  - @atlaskit/media-card@67.1.0
  - @atlaskit/media-filmstrip@37.1.2
  - @atlaskit/webpack-config@2.1.1
  - @atlaskit/navigation@36.0.3
  - @atlaskit/media-core@31.0.5
  - @atlaskit/badge@13.1.7
  - @atlaskit/button@13.3.9
  - @atlaskit/dynamic-table@13.7.2
  - @atlaskit/flag@12.3.10
  - @atlaskit/inline-dialog@12.1.11
  - @atlaskit/lozenge@9.1.6
  - @atlaskit/modal-dialog@10.5.4
  - @atlaskit/section-message@4.1.7
  - @atlaskit/select@11.0.9
  - @atlaskit/spinner@12.1.6
  - @atlaskit/textfield@3.1.9
  - @atlaskit/tooltip@15.2.5

## 5.2.18

### Patch Changes

- Updated dependencies [e3f01787dd](https://bitbucket.org/atlassian/atlassian-frontend/commits/e3f01787dd):
  - @atlaskit/webpack-config@2.1.0
  - @atlaskit/webdriver-runner@0.2.0
  - @atlaskit/badge@13.1.6
  - @atlaskit/button@13.3.8
  - @atlaskit/dynamic-table@13.7.1
  - @atlaskit/flag@12.3.9
  - @atlaskit/inline-dialog@12.1.10
  - @atlaskit/lozenge@9.1.5
  - @atlaskit/modal-dialog@10.5.3
  - @atlaskit/section-message@4.1.6
  - @atlaskit/select@11.0.8
  - @atlaskit/spinner@12.1.5
  - @atlaskit/textfield@3.1.8
  - @atlaskit/tooltip@15.2.4
  - @atlaskit/media-card@67.0.5

## 5.2.17

### Patch Changes

- [patch][da5f4a8062](https://bitbucket.org/atlassian/atlassian-frontend/commits/da5f4a8062):

  AFP-1437 Fix high vulnerabilities

  Many insecure packages were found in a SourceClear scan of the repository that require fixing by 11 March 2020. The original scan can be found [here](https://atlassian.sourceclear.io/workspaces/100tz9Q/projects/152927/issues?branch=master).

  The following packages were updated in [this PR](https://bitbucket.org/atlassian/atlassian-frontend/pull-requests/905/afp-1437-fix-vulnerability-batch) to remove some of the high rated vulnerabilities:

  - merge: 1.2.0 → removed. Removed by updating tty-table where it was a direct dependency.
  - webpack-dev-server: 3.1.5 → 3.9.0. Deduplicating.
  - hoek: 2.16.3 → removed. Removed by raising the version of less where it was a direct dependency.
  - @hapi/hoek: 8.5.0 → 8.5.1. Made resolved version one patch bump higher.
  - moment: 2.18.1 → 2.19.3. Updated by bumping the dependent version of react-live-clock by a patch.
  - kind-of: 6.0.2 → 6.0.3. Made resolved version one patch bump higher.
  - sshpk: 1.13.1 → 1.16.1. Made resolved version several minor versions higher.
  - axios: 0.17.1 + 0.18.0 → 0.19.2.
    - Versions of axios being used directly were explicitly changed to require the safe version.
    - The old npm version of landkid was removed as a dependency.
    - traduki-lite was asked to bump their version of axios, and packages depending on it were updated to point to the latest patch.
  - mem: 1.1.0 → 4.0.0.
    - Improved one by bumping svg-sprite by a minor.
    - Removing source-trace.
    - gatsby is being bumped to fix last bad instance in a separate PR [here](https://bitbucket.org/atlassian/atlassian-frontend/pull-requests/963/no-issue-update-gatsby-dep-to-resolve-sec/diff).
  - https-proxy-agent: 0.3.6 → 3.0.1, 2.2.1 → 2.2.4. Updating @atlassian/nanos for the former and forcing higher patch resolution for the latter.
  - tar-fs: 1.12.0 → 1.16.3. Updating @atlassian/nanos.
  - ms: 0.7.1 → removed. Removed source-trace, which was an unused dependency from a deprecated package.

## 5.2.16

### Patch Changes

- [patch][6548261c9a](https://bitbucket.org/atlassian/atlassian-frontend/commits/6548261c9a):

  Remove namespace imports from React, ReactDom, and PropTypes- Updated dependencies [6548261c9a](https://bitbucket.org/atlassian/atlassian-frontend/commits/6548261c9a):

  - @atlaskit/docs@8.3.2
  - @atlaskit/visual-regression@0.1.9
  - @atlaskit/mobile-header@4.0.2
  - @atlaskit/badge@13.1.5
  - @atlaskit/button@13.3.7
  - @atlaskit/code@11.1.3
  - @atlaskit/dynamic-table@13.6.2
  - @atlaskit/flag@12.3.7
  - @atlaskit/icon-object@5.0.2
  - @atlaskit/icon@20.0.1
  - @atlaskit/inline-dialog@12.1.9
  - @atlaskit/logo@12.3.2
  - @atlaskit/lozenge@9.1.4
  - @atlaskit/modal-dialog@10.5.2
  - @atlaskit/navigation@36.0.1
  - @atlaskit/page@11.0.12
  - @atlaskit/section-message@4.1.5
  - @atlaskit/select@11.0.7
  - @atlaskit/spinner@12.1.4
  - @atlaskit/tag-group@9.0.6
  - @atlaskit/tag@9.0.13
  - @atlaskit/textfield@3.1.6
  - @atlaskit/theme@9.5.1
  - @atlaskit/tooltip@15.2.3
  - @atlaskit/css-reset@5.0.10
  - @atlaskit/analytics-listeners@6.2.3
  - @atlaskit/media-card@67.0.3
  - @atlaskit/media-core@31.0.4
  - @atlaskit/media-filmstrip@37.1.1
  - @atlaskit/media-test-helpers@26.1.1
  - @atlaskit/quick-search@7.8.5

## 5.2.15

### Patch Changes

- [patch][68b967a358](https://bitbucket.org/atlassian/atlassian-frontend/commits/68b967a358):

  Update packages and links to target atlassian-frontend.

## 5.2.14

### Patch Changes

- Updated dependencies [fe4eaf06fc](https://bitbucket.org/atlassian/atlassian-frontend/commits/fe4eaf06fc):
- Updated dependencies [c0102a3ea2](https://bitbucket.org/atlassian/atlassian-frontend/commits/c0102a3ea2):
- Updated dependencies [0e439590a3](https://bitbucket.org/atlassian/atlassian-frontend/commits/0e439590a3):
  - @atlaskit/media-test-helpers@26.1.0
  - @atlaskit/icon@20.0.0
  - @atlaskit/navigation@36.0.0
  - @atlaskit/media-filmstrip@37.1.0
  - @atlaskit/quick-search@7.8.4
  - @atlaskit/flag@12.3.6
  - @atlaskit/logo@12.3.1
  - @atlaskit/modal-dialog@10.5.1
  - @atlaskit/media-card@67.0.2
  - @atlaskit/docs@8.3.1
  - @atlaskit/mobile-header@4.0.1
  - @atlaskit/button@13.3.6
  - @atlaskit/inline-dialog@12.1.8
  - @atlaskit/select@11.0.6
  - @atlaskit/tag@9.0.12
  - @atlaskit/textfield@3.1.5
  - @atlaskit/tooltip@15.2.2
  - @atlaskit/page@11.0.11

## 5.2.13

### Patch Changes

- Updated dependencies [5504a7da8c](https://bitbucket.org/atlassian/atlassian-frontend/commits/5504a7da8c):
- Updated dependencies [966622bd45](https://bitbucket.org/atlassian/atlassian-frontend/commits/966622bd45):
- Updated dependencies [82a9f69a64](https://bitbucket.org/atlassian/atlassian-frontend/commits/82a9f69a64):
- Updated dependencies [b52f2be5d9](https://bitbucket.org/atlassian/atlassian-frontend/commits/b52f2be5d9):
- Updated dependencies [f998d0afc2](https://bitbucket.org/atlassian/atlassian-frontend/commits/f998d0afc2):
- Updated dependencies [d2b8166208](https://bitbucket.org/atlassian/atlassian-frontend/commits/d2b8166208):
- Updated dependencies [6ee177aeb4](https://bitbucket.org/atlassian/atlassian-frontend/commits/6ee177aeb4):
  - @atlaskit/media-card@67.0.1
  - @atlaskit/media-test-helpers@26.0.0
  - @atlaskit/mobile-header@4.0.0
  - @atlaskit/code@11.1.2
  - @atlaskit/tag@9.0.11
  - @atlaskit/docs@8.3.0
  - @atlaskit/media-core@31.0.3
  - @atlaskit/media-filmstrip@37.0.1

## 5.2.12

### Patch Changes

- [patch][ed9ce323c0](https://bitbucket.org/atlassian/atlassian-frontend/commits/ed9ce323c0):

  Update website changelogs to work with new atlassian-frontend repo

## 5.2.11

### Patch Changes

- Updated dependencies [28f8f0e089](https://bitbucket.org/atlassian/atlassian-frontend/commits/28f8f0e089):
- Updated dependencies [82747f2922](https://bitbucket.org/atlassian/atlassian-frontend/commits/82747f2922):
- Updated dependencies [486a5aec29](https://bitbucket.org/atlassian/atlassian-frontend/commits/486a5aec29):
- Updated dependencies [03c917044e](https://bitbucket.org/atlassian/atlassian-frontend/commits/03c917044e):
- Updated dependencies [d3f4c97f6a](https://bitbucket.org/atlassian/atlassian-frontend/commits/d3f4c97f6a):
- Updated dependencies [4a223473c5](https://bitbucket.org/atlassian/atlassian-frontend/commits/4a223473c5):
  - @atlaskit/icon@19.1.0
  - @atlaskit/theme@9.5.0
  - @atlaskit/media-card@67.0.0
  - @atlaskit/media-filmstrip@37.0.0
  - @atlaskit/badge@13.1.4
  - @atlaskit/button@13.3.5
  - @atlaskit/code@11.1.1
  - @atlaskit/dynamic-table@13.6.1
  - @atlaskit/flag@12.3.5
  - @atlaskit/inline-dialog@12.1.7
  - @atlaskit/lozenge@9.1.3
  - @atlaskit/page@11.0.10
  - @atlaskit/select@11.0.4
  - @atlaskit/spinner@12.1.3
  - @atlaskit/tooltip@15.2.1
  - @atlaskit/media-core@31.0.2
  - @atlaskit/media-test-helpers@25.2.6

## 5.2.10

### Patch Changes

- [patch][3a20e9a596](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/3a20e9a596):

  Make PopupSelect correctly pass props. Forcing update of @atlaskit/select for all other packages- Updated dependencies [3a20e9a596](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/3a20e9a596):

  - @atlaskit/select@11.0.2
  - @atlaskit/media-test-helpers@25.2.5

## 5.2.9

### Patch Changes

- [patch][1ed27f5f85](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/1ed27f5f85):

  Adds prop types for Header / Footer render props.

## 5.2.8

### Patch Changes

- [patch][30acc30979](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/30acc30979):

  @atlaskit/select has been converted to Typescript. Typescript consumers will now get static type safety. Flow types are no longer provided. No API or behavioural changes.

## 5.2.7

### Patch Changes

- [patch][d222c2b987](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/d222c2b987):

  Theme has been converted to Typescript. Typescript consumers will now get static type safety. Flow types are no longer provided.

  ### Breaking

  ** getTokens props changes **
  When defining the value function passed into a ThemeProvider, the getTokens parameter cannot be called without props; if no props are provided an empty object `{}` must be passed in:

  ```javascript
  <CustomTheme.Provider
    value={t => ({ ...t(), backgroundColor: '#333'})}
  >
  ```

  becomes:

  ```javascript
  <CustomTheme.Provider
    value={t => ({ ...t({}), backgroundColor: '#333'})}
  >
  ```

  ** Color palette changes **
  Color palettes have been moved into their own file.
  Users will need to update imports from this:

  ```javascript
  import { colors } from '@atlaskit/theme';

  colors.colorPalette('8');
  ```

  to this:

  ```javascript
  import { colorPalette } from '@atlaskit/theme';

  colorPalette.colorPalette('8');
  ```

  or for multi entry-point users:

  ```javascript
  import * as colors from '@atlaskit/theme/colors';

  colors.colorPalette('8');
  ```

  to this:

  ```javascript
  import * as colorPalettes from '@atlaskit/theme/color-palette';

  colorPalettes.colorPalette('8');
  ```

## 5.2.6

- Updated dependencies [24b8ea2667](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/24b8ea2667):
  - @atlaskit/media-filmstrip@36.0.0
  - @atlaskit/media-test-helpers@25.2.2
  - @atlaskit/media-card@66.0.1
  - @atlaskit/media-core@31.0.0

## 5.2.5

- Updated dependencies [c3e65f1b9e](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/c3e65f1b9e):
- Updated dependencies [ae4f336a3a](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/ae4f336a3a):
  - @atlaskit/media-core@30.0.17
  - @atlaskit/media-test-helpers@25.2.0
  - @atlaskit/media-card@66.0.0
  - @atlaskit/media-filmstrip@35.0.0

## 5.2.4

- Updated dependencies [f9b5e24662](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/f9b5e24662):
  - @atlaskit/icon-object@5.0.0
  - @atlaskit/icon@19.0.8

## 5.2.3

### Patch Changes

- [patch][a2d0043716](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/a2d0043716):

  Updated version of analytics-next to fix potential incompatibilities with TS 3.6

## 5.2.2

- Updated dependencies [6410edd029](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/6410edd029):
  - @atlaskit/badge@13.0.0

## 5.2.1

- Updated dependencies [af72468517](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/af72468517):
  - @atlaskit/media-core@30.0.14
  - @atlaskit/media-filmstrip@34.3.6
  - @atlaskit/media-test-helpers@25.1.1
  - @atlaskit/media-card@65.0.0
  - @atlaskit/analytics-listeners@6.2.0

## 5.2.0

### Minor Changes

- [minor][c6efb2f5b6](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/c6efb2f5b6):

  Prefix the legacy lifecycle methods with UNSAFE\_\* to avoid warning in React 16.9+

  More information about the deprecation of lifecycles methods can be found here:
  https://reactjs.org/blog/2018/03/29/react-v-16-3.html#component-lifecycle-changes

## 5.1.21

### Patch Changes

- [patch][097b696613](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/097b696613):

  Components now depend on TS 3.6 internally, in order to fix an issue with TS resolving non-relative imports as relative imports

## 5.1.20

### Patch Changes

- [patch][ecca4d1dbb](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/ecca4d1dbb):

  Upgraded Typescript to 3.3.x

## 5.1.19

- Updated dependencies [3624730f44](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/3624730f44):
  - @atlaskit/media-core@30.0.11
  - @atlaskit/media-filmstrip@34.3.3
  - @atlaskit/media-test-helpers@25.0.2
  - @atlaskit/media-card@64.0.0

## 5.1.18

- Updated dependencies [cc461c0022](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/cc461c0022):
  - @atlaskit/tag-group@9.0.0

## 5.1.17

- Updated dependencies [69586b5353](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/69586b5353):
  - @atlaskit/media-card@63.3.11
  - @atlaskit/media-core@30.0.10
  - @atlaskit/media-filmstrip@34.3.2
  - @atlaskit/media-test-helpers@25.0.0

## 5.1.16

### Patch Changes

- [patch][a73580e138](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/a73580e138):

  BUILDTOOLS-260/BUILDTOOLS-261: Replace data-test-id by data-testid to be consistent with react-testing-library.
  **Products**, you may require to update your integration and end to end tests if they are based on `data-test-id` please replace by `data-testid`.

## 5.1.15

### Patch Changes

- [patch][688f2957ca](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/688f2957ca):

  Fixes various TypeScript errors which were previously failing silently

## 5.1.14

- Updated dependencies [1adb8727e3](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/1adb8727e3):
  - @atlaskit/tag-group@8.0.2
  - @atlaskit/tag@9.0.0

## 5.1.13

- Updated dependencies [790e66bece](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/790e66bece):
  - @atlaskit/button@13.0.11
  - @atlaskit/inline-dialog@12.0.5
  - @atlaskit/logo@12.1.1
  - @atlaskit/modal-dialog@10.0.10
  - @atlaskit/media-test-helpers@24.3.1
  - @atlaskit/select@10.0.0

## 5.1.12

- Updated dependencies [06326ef3f7](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/06326ef3f7):
  - @atlaskit/docs@8.1.3
  - @atlaskit/mobile-header@3.1.2
  - @atlaskit/button@13.0.9
  - @atlaskit/flag@12.0.10
  - @atlaskit/inline-dialog@12.0.3
  - @atlaskit/modal-dialog@10.0.7
  - @atlaskit/navigation@35.1.8
  - @atlaskit/select@9.1.8
  - @atlaskit/tag@8.0.5
  - @atlaskit/tooltip@15.0.2
  - @atlaskit/media-card@63.3.1
  - @atlaskit/media-filmstrip@34.2.2
  - @atlaskit/media-test-helpers@24.1.2
  - @atlaskit/quick-search@7.5.1
  - @atlaskit/icon@19.0.0

## 5.1.11

- Updated dependencies [67f06f58dd](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/67f06f58dd):
  - @atlaskit/icon@18.0.1
  - @atlaskit/icon-object@4.0.3
  - @atlaskit/navigation@35.1.6
  - @atlaskit/select@9.1.6
  - @atlaskit/tooltip@15.0.0

## 5.1.10

- Updated dependencies [cfc3c8adb3](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/cfc3c8adb3):
  - @atlaskit/docs@8.1.2
  - @atlaskit/button@13.0.8
  - @atlaskit/flag@12.0.4
  - @atlaskit/inline-dialog@12.0.1
  - @atlaskit/modal-dialog@10.0.4
  - @atlaskit/navigation@35.1.5
  - @atlaskit/select@9.1.5
  - @atlaskit/tag@8.0.3
  - @atlaskit/tooltip@14.0.3
  - @atlaskit/media-card@63.1.5
  - @atlaskit/media-filmstrip@34.2.1
  - @atlaskit/media-test-helpers@24.0.3
  - @atlaskit/quick-search@7.4.1
  - @atlaskit/icon@18.0.0

## 5.1.9

- Updated dependencies [181209d135](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/181209d135):
  - @atlaskit/modal-dialog@10.0.3
  - @atlaskit/inline-dialog@12.0.0

## 5.1.8

- [patch][b0ef06c685](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/b0ef06c685):

  - This is just a safety release in case anything strange happened in in the previous one. See Pull Request #5942 for details

## 5.1.7

- [patch][92381960e9](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/92381960e9):

  - Updated types to support modal-dialog typescript conversion

- Updated dependencies [215688984e](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/215688984e):
- Updated dependencies [06c5cccf9d](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/06c5cccf9d):
- Updated dependencies [9ecfef12ac](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/9ecfef12ac):
- Updated dependencies [97bfe81ec8](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/97bfe81ec8):
- Updated dependencies [bfb006f65a](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/bfb006f65a):
  - @atlaskit/button@13.0.4
  - @atlaskit/dynamic-table@13.0.1
  - @atlaskit/flag@12.0.2
  - @atlaskit/select@9.1.2
  - @atlaskit/media-card@63.1.0
  - @atlaskit/spinner@12.0.0
  - @atlaskit/icon@17.1.2
  - @atlaskit/icon-object@4.0.1
  - @atlaskit/modal-dialog@10.0.0
  - @atlaskit/media-core@30.0.3
  - @atlaskit/media-filmstrip@34.1.2
  - @atlaskit/media-test-helpers@24.0.0
  - @atlaskit/docs@8.1.0
  - @atlaskit/logo@12.0.1
  - @atlaskit/code@11.0.0
  - @atlaskit/css-reset@5.0.0

## 5.1.6

- Updated dependencies [3af5a7e685](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/3af5a7e685):
  - @atlaskit/navigation@35.1.3
  - @atlaskit/page@11.0.0

## 5.1.5

- Updated dependencies [238b65171f](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/238b65171f):
  - @atlaskit/flag@12.0.0

## 5.1.4

- Updated dependencies [ed41cac6ac](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/ed41cac6ac):
  - @atlaskit/theme@9.0.3
  - @atlaskit/lozenge@9.0.0

## 5.1.3

- Updated dependencies [4b07b57640](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/4b07b57640):
  - @atlaskit/button@13.0.2
  - @atlaskit/icon@17.0.2
  - @atlaskit/navigation@35.1.1
  - @atlaskit/page@10.0.2
  - @atlaskit/select@9.1.1
  - @atlaskit/logo@12.0.0

## 5.1.2

- Updated dependencies [ed3f034232](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/ed3f034232):
  - @atlaskit/media-card@63.0.2
  - @atlaskit/media-core@30.0.1
  - @atlaskit/media-filmstrip@34.1.1
  - @atlaskit/media-test-helpers@23.0.0

## 5.1.1

- Updated dependencies [3d95467c4b](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/3d95467c4b):
  - @atlaskit/icon@17.0.1
  - @atlaskit/dynamic-table@13.0.0

## 5.1.0

- [minor][5a49043dac](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/5a49043dac):

  - Enable strictPropertyInitialization in tsconfig.base

## 5.0.0

- [major][7c17b35107](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/7c17b35107):

  - Updates react and react-dom peer dependencies to react@^16.8.0 and react-dom@^16.8.0. To use this package, please ensure you use at least this version of react and react-dom.

## 4.1.55

- Updated dependencies [a1192ef860](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/a1192ef860):
  - @atlaskit/media-card@62.0.0
  - @atlaskit/media-filmstrip@33.0.0
  - @atlaskit/media-test-helpers@21.4.0
  - @atlaskit/media-core@29.3.0

## 4.1.54

- Updated dependencies [e7292ab444](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/e7292ab444):
  - @atlaskit/media-card@61.0.0
  - @atlaskit/media-filmstrip@32.0.0
  - @atlaskit/media-test-helpers@21.3.0
  - @atlaskit/media-core@29.2.0

## 4.1.53

- Updated dependencies [9c0b4744be](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/9c0b4744be):
  - @atlaskit/docs@7.0.3
  - @atlaskit/badge@11.0.1
  - @atlaskit/button@12.0.3
  - @atlaskit/code@9.0.1
  - @atlaskit/dynamic-table@11.0.3
  - @atlaskit/field-text@8.0.3
  - @atlaskit/flag@10.0.6
  - @atlaskit/icon@16.0.9
  - @atlaskit/icon-object@3.0.8
  - @atlaskit/inline-dialog@10.0.4
  - @atlaskit/logo@10.0.4
  - @atlaskit/lozenge@7.0.2
  - @atlaskit/modal-dialog@8.0.7
  - @atlaskit/navigation@34.0.4
  - @atlaskit/select@8.1.1
  - @atlaskit/spinner@10.0.7
  - @atlaskit/tag@7.0.2
  - @atlaskit/tooltip@13.0.4
  - @atlaskit/css-reset@3.0.8
  - @atlaskit/media-card@60.0.3
  - @atlaskit/media-filmstrip@31.0.4
  - @atlaskit/quick-search@6.1.1
  - @atlaskit/theme@8.1.7

## 4.1.52

- Updated dependencies [1e826b2966](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/1e826b2966):
  - @atlaskit/docs@7.0.2
  - @atlaskit/dynamic-table@11.0.2
  - @atlaskit/field-text@8.0.2
  - @atlaskit/flag@10.0.5
  - @atlaskit/icon@16.0.8
  - @atlaskit/icon-object@3.0.7
  - @atlaskit/inline-dialog@10.0.3
  - @atlaskit/logo@10.0.3
  - @atlaskit/modal-dialog@8.0.6
  - @atlaskit/navigation@34.0.3
  - @atlaskit/page@9.0.3
  - @atlaskit/select@8.0.5
  - @atlaskit/spinner@10.0.5
  - @atlaskit/theme@8.1.6
  - @atlaskit/tooltip@13.0.3
  - @atlaskit/analytics-listeners@5.0.3
  - @atlaskit/media-card@60.0.1
  - @atlaskit/media-core@29.1.4
  - @atlaskit/media-filmstrip@31.0.3
  - @atlaskit/button@12.0.0

## 4.1.51

- Updated dependencies [0ff405bd0f](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/0ff405bd0f):
  - @atlaskit/media-core@29.1.2
  - @atlaskit/media-test-helpers@21.2.2
  - @atlaskit/media-card@60.0.0
  - @atlaskit/media-filmstrip@31.0.2

## 4.1.50

- [patch][d13fad66df](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/d13fad66df):

  - Enable esModuleInterop for typescript, this allows correct use of default exports

## 4.1.49

- Updated dependencies [c2c36de22b](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/c2c36de22b):
  - @atlaskit/media-card@59.0.0
  - @atlaskit/media-filmstrip@31.0.0
  - @atlaskit/media-test-helpers@21.1.0
  - @atlaskit/media-core@29.1.0

## 4.1.48

- Updated dependencies [9c316bd8aa](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/9c316bd8aa):
  - @atlaskit/media-core@29.0.2
  - @atlaskit/media-filmstrip@30.0.2
  - @atlaskit/media-test-helpers@21.0.3
  - @atlaskit/media-card@58.0.0

## 4.1.47

- Updated dependencies [c95557e3ff](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/c95557e3ff):
  - @atlaskit/badge@11.0.0

## 4.1.46

- Updated dependencies [9d5cc39394](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/9d5cc39394):
  - @atlaskit/docs@7.0.1
  - @atlaskit/dynamic-table@11.0.1
  - @atlaskit/field-text@8.0.1
  - @atlaskit/flag@10.0.1
  - @atlaskit/icon@16.0.5
  - @atlaskit/icon-object@3.0.5
  - @atlaskit/inline-dialog@10.0.1
  - @atlaskit/logo@10.0.1
  - @atlaskit/modal-dialog@8.0.2
  - @atlaskit/navigation@34.0.1
  - @atlaskit/page@9.0.1
  - @atlaskit/select@8.0.3
  - @atlaskit/spinner@10.0.1
  - @atlaskit/theme@8.0.1
  - @atlaskit/tooltip@13.0.1
  - @atlaskit/media-card@57.0.0
  - @atlaskit/media-filmstrip@30.0.0
  - @atlaskit/button@11.0.0
  - @atlaskit/analytics-listeners@5.0.0
  - @atlaskit/media-core@29.0.0
  - @atlaskit/media-test-helpers@21.0.0
  - @atlaskit/quick-search@6.0.0

## 4.1.45

- Updated dependencies [7ab3e93996](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/7ab3e93996):
  - @atlaskit/media-card@56.0.0
  - @atlaskit/media-filmstrip@29.0.0
  - @atlaskit/media-test-helpers@20.1.8
  - @atlaskit/media-core@28.0.0

## 4.1.44

- Updated dependencies [76299208e6](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/76299208e6):
  - @atlaskit/button@10.1.3
  - @atlaskit/icon@16.0.4
  - @atlaskit/icon-object@3.0.4
  - @atlaskit/css-reset@3.0.6
  - @atlaskit/analytics-listeners@4.2.1
  - @atlaskit/media-card@55.0.2
  - @atlaskit/media-core@27.2.3
  - @atlaskit/media-filmstrip@28.0.1
  - @atlaskit/quick-search@5.4.1
  - @atlaskit/media-test-helpers@20.1.7
  - @atlaskit/docs@7.0.0
  - @atlaskit/badge@10.0.0
  - @atlaskit/code@9.0.0
  - @atlaskit/dynamic-table@11.0.0
  - @atlaskit/field-text@8.0.0
  - @atlaskit/flag@10.0.0
  - @atlaskit/inline-dialog@10.0.0
  - @atlaskit/logo@10.0.0
  - @atlaskit/lozenge@7.0.0
  - @atlaskit/modal-dialog@8.0.0
  - @atlaskit/navigation@34.0.0
  - @atlaskit/page@9.0.0
  - @atlaskit/select@8.0.0
  - @atlaskit/spinner@10.0.0
  - @atlaskit/tag-group@7.0.0
  - @atlaskit/tag@7.0.0
  - @atlaskit/theme@8.0.0
  - @atlaskit/tooltip@13.0.0

## 4.1.43

- Updated dependencies [4aee5f3cec](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/4aee5f3cec):
  - @atlaskit/media-card@55.0.0
  - @atlaskit/media-filmstrip@28.0.0
  - @atlaskit/media-test-helpers@20.1.6
  - @atlaskit/media-core@27.2.0

## 4.1.42

- Updated dependencies [fc6164c8c2](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/fc6164c8c2):
- Updated dependencies [190c4b7bd3](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/190c4b7bd3):
  - @atlaskit/media-card@54.0.0
  - @atlaskit/media-filmstrip@27.0.0
  - @atlaskit/media-test-helpers@20.1.5
  - @atlaskit/media-core@27.1.0

## 4.1.41

- Updated dependencies [46dfcfbeca](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/46dfcfbeca):
  - @atlaskit/media-core@27.0.2
  - @atlaskit/media-filmstrip@26.1.2
  - @atlaskit/media-test-helpers@20.1.4
  - @atlaskit/media-card@53.0.0

## 4.1.40

- Updated dependencies [06713e0a0c](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/06713e0a0c):
  - @atlaskit/inline-dialog@9.0.15
  - @atlaskit/logo@9.2.7
  - @atlaskit/media-test-helpers@20.1.3
  - @atlaskit/modal-dialog@7.2.3
  - @atlaskit/select@7.0.0

## 4.1.39

- Updated dependencies [69c8d0c19c](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/69c8d0c19c):
  - @atlaskit/media-card@52.0.0
  - @atlaskit/media-filmstrip@26.0.0
  - @atlaskit/media-test-helpers@20.1.0
  - @atlaskit/media-core@27.0.0

## 4.1.38

- Updated dependencies [07a187bb30](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/07a187bb30):
  - @atlaskit/media-card@51.0.2
  - @atlaskit/media-core@26.2.1
  - @atlaskit/media-filmstrip@25.0.2
  - @atlaskit/media-test-helpers@20.0.0

## 4.1.37

- Updated dependencies [d7ef59d432](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/d7ef59d432):
  - @atlaskit/docs@6.0.1
  - @atlaskit/button@10.1.2
  - @atlaskit/flag@9.1.9
  - @atlaskit/inline-dialog@9.0.14
  - @atlaskit/modal-dialog@7.2.1
  - @atlaskit/navigation@33.3.9
  - @atlaskit/select@6.1.19
  - @atlaskit/tag@6.1.4
  - @atlaskit/tooltip@12.1.15
  - @atlaskit/media-card@51.0.1
  - @atlaskit/media-filmstrip@25.0.1
  - @atlaskit/media-test-helpers@19.1.1
  - @atlaskit/quick-search@5.2.5
  - @atlaskit/icon@16.0.0

## 4.1.36

- Updated dependencies [85d5d168fd](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/85d5d168fd):
  - @atlaskit/media-card@51.0.0
  - @atlaskit/media-filmstrip@25.0.0
  - @atlaskit/media-test-helpers@19.1.0
  - @atlaskit/media-core@26.2.0

## 4.1.35

- Updated dependencies [dadef80](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/dadef80):
- Updated dependencies [3ad16f3](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/3ad16f3):
  - @atlaskit/media-card@50.0.0
  - @atlaskit/media-filmstrip@24.0.0
  - @atlaskit/media-test-helpers@19.0.0
  - @atlaskit/media-core@26.1.0

## 4.1.34

- [patch][6855bec](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/6855bec):

  - Updated internal use of ModalDialog to use new modal composition API

## 4.1.33

- Updated dependencies [cbb8cb5](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/cbb8cb5):
  - @atlaskit/media-card@49.0.0
  - @atlaskit/media-filmstrip@23.0.0
  - @atlaskit/media-test-helpers@18.9.1
  - @atlaskit/media-core@26.0.0

## 4.1.32

- Updated dependencies [72d37fb](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/72d37fb):
  - @atlaskit/media-card@48.0.0
  - @atlaskit/media-filmstrip@22.0.0
  - @atlaskit/media-core@25.0.0
  - @atlaskit/media-test-helpers@18.9.0

## 4.1.31

- [patch][b9b1900](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/b9b1900):

  - Use @atlaskit/select instead of @atlaskit/single-select on the Fullscreen examples on website

## 4.1.30

- Updated dependencies [135ed00](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/135ed00):
  - @atlaskit/media-core@24.7.2
  - @atlaskit/media-filmstrip@21.0.2
  - @atlaskit/media-test-helpers@18.7.2
  - @atlaskit/media-card@47.0.0

## 4.1.29

- Updated dependencies [b3738ea](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/b3738ea):
  - @atlaskit/media-card@46.0.0
  - @atlaskit/media-filmstrip@21.0.0
  - @atlaskit/media-test-helpers@18.7.0
  - @atlaskit/media-core@24.7.0

## 4.1.28

- Updated dependencies [80f765b](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/80f765b):
  - @atlaskit/media-card@45.0.0
  - @atlaskit/media-filmstrip@20.0.0
  - @atlaskit/media-test-helpers@18.6.2
  - @atlaskit/media-core@24.6.0

## 4.1.27

- Updated dependencies [58b84fa](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/58b84fa):
- Updated dependencies [882a85c](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/882a85c):
  - @atlaskit/badge@9.2.2
  - @atlaskit/button@10.1.1
  - @atlaskit/code@8.2.2
  - @atlaskit/dynamic-table@10.0.22
  - @atlaskit/field-text@7.0.18
  - @atlaskit/flag@9.1.8
  - @atlaskit/icon@15.0.2
  - @atlaskit/icon-object@3.0.2
  - @atlaskit/inline-dialog@9.0.13
  - @atlaskit/logo@9.2.6
  - @atlaskit/lozenge@6.2.4
  - @atlaskit/modal-dialog@7.1.1
  - @atlaskit/navigation@33.3.8
  - @atlaskit/page@8.0.12
  - @atlaskit/single-select@6.0.11
  - @atlaskit/spinner@9.0.13
  - @atlaskit/tag@6.1.3
  - @atlaskit/tag-group@6.0.8
  - @atlaskit/theme@7.0.1
  - @atlaskit/tooltip@12.1.13
  - @atlaskit/css-reset@3.0.5
  - @atlaskit/analytics-listeners@4.1.4
  - @atlaskit/media-card@44.1.3
  - @atlaskit/media-core@24.5.2
  - @atlaskit/media-filmstrip@19.0.3
  - @atlaskit/quick-search@5.2.4
  - @atlaskit/docs@6.0.0
  - extract-react-types-loader@0.3.0

## 4.1.26

- Updated dependencies [d13242d](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/d13242d):
  - @atlaskit/docs@5.2.3
  - @atlaskit/button@10.0.4
  - @atlaskit/code@8.2.1
  - @atlaskit/dynamic-table@10.0.20
  - @atlaskit/field-text@7.0.16
  - @atlaskit/flag@9.1.7
  - @atlaskit/icon@15.0.1
  - @atlaskit/icon-object@3.0.1
  - @atlaskit/inline-dialog@9.0.12
  - @atlaskit/logo@9.2.5
  - @atlaskit/modal-dialog@7.0.14
  - @atlaskit/navigation@33.3.7
  - @atlaskit/single-select@6.0.10
  - @atlaskit/spinner@9.0.12
  - @atlaskit/tag@6.1.2
  - @atlaskit/tooltip@12.1.12
  - @atlaskit/css-reset@3.0.4
  - @atlaskit/quick-search@5.2.1
  - @atlaskit/theme@7.0.0
  - @atlaskit/badge@9.2.1
  - @atlaskit/lozenge@6.2.3

## 4.1.25

- Updated dependencies [ab9b69c](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/ab9b69c):
  - @atlaskit/docs@5.2.2
  - @atlaskit/button@10.0.1
  - @atlaskit/flag@9.1.6
  - @atlaskit/inline-dialog@9.0.11
  - @atlaskit/modal-dialog@7.0.13
  - @atlaskit/navigation@33.3.6
  - @atlaskit/single-select@6.0.9
  - @atlaskit/tag@6.1.1
  - @atlaskit/tooltip@12.1.11
  - @atlaskit/media-card@44.0.2
  - @atlaskit/media-filmstrip@19.0.2
  - @atlaskit/media-test-helpers@18.3.1
  - @atlaskit/quick-search@5.1.2
  - @atlaskit/icon-object@3.0.0
  - @atlaskit/icon@15.0.0

## 4.1.24

- Updated dependencies [6998f11](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/6998f11):
  - @atlaskit/docs@5.2.1
  - @atlaskit/dynamic-table@10.0.18
  - @atlaskit/field-text@7.0.15
  - @atlaskit/flag@9.1.5
  - @atlaskit/icon@14.6.1
  - @atlaskit/icon-object@2.0.1
  - @atlaskit/inline-dialog@9.0.10
  - @atlaskit/logo@9.2.4
  - @atlaskit/modal-dialog@7.0.12
  - @atlaskit/navigation@33.3.5
  - @atlaskit/page@8.0.11
  - @atlaskit/single-select@6.0.8
  - @atlaskit/spinner@9.0.11
  - @atlaskit/theme@6.2.1
  - @atlaskit/tooltip@12.1.10
  - @atlaskit/analytics-listeners@4.1.1
  - @atlaskit/media-card@44.0.1
  - @atlaskit/media-core@24.5.1
  - @atlaskit/media-filmstrip@19.0.1
  - @atlaskit/button@10.0.0

## 4.1.23

- Updated dependencies [7e8b4b9](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/7e8b4b9):
  - @atlaskit/media-card@44.0.0
  - @atlaskit/media-filmstrip@19.0.0
  - @atlaskit/media-test-helpers@18.3.0
  - @atlaskit/media-core@24.5.0

## 4.1.22

- Updated dependencies [29b160f](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/29b160f):
- Updated dependencies [b29bec1](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/b29bec1):
- Updated dependencies [80304f0](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/80304f0):
  - @atlaskit/icon-object@2.0.0
  - @atlaskit/icon@14.4.0

## 4.1.21

- Updated dependencies [2c21466](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/2c21466):
  - @atlaskit/media-card@43.0.0
  - @atlaskit/media-filmstrip@18.0.0
  - @atlaskit/media-test-helpers@18.2.12
  - @atlaskit/media-core@24.4.0

## 4.1.20

- Updated dependencies [04c7192](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/04c7192):
  - @atlaskit/media-core@24.3.1
  - @atlaskit/media-filmstrip@17.0.2
  - @atlaskit/media-test-helpers@18.2.11
  - @atlaskit/media-card@42.0.0

## 4.1.19

- Updated dependencies [2da04ed](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/2da04ed):
  - @atlaskit/navigation@33.3.1
  - @atlaskit/quick-search@5.0.0

## 4.1.18

- [patch] Updated dependencies [e7bb74d](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/e7bb74d)
  - @atlaskit/icon-object@1.0.4
  - @atlaskit/icon@14.0.3

## 4.1.17

- [patch] Updated dependencies [b71751b](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/b71751b)
  - @atlaskit/badge@9.1.5
  - @atlaskit/button@9.0.15
  - @atlaskit/code@8.0.9
  - @atlaskit/dynamic-table@10.0.14
  - @atlaskit/field-text@7.0.12
  - @atlaskit/flag@9.1.1
  - @atlaskit/icon-object@1.0.3
  - @atlaskit/icon@14.0.2
  - @atlaskit/inline-dialog@9.0.7
  - @atlaskit/layer-manager@5.0.14
  - @atlaskit/logo@9.2.3
  - @atlaskit/lozenge@6.2.2
  - @atlaskit/modal-dialog@7.0.3
  - @atlaskit/navigation@33.2.1
  - @atlaskit/page@8.0.8
  - @atlaskit/single-select@6.0.7
  - @atlaskit/spinner@9.0.10
  - @atlaskit/tag-group@6.0.7
  - @atlaskit/tag@6.0.9
  - @atlaskit/theme@6.1.1
  - @atlaskit/tooltip@12.1.4

## 4.1.16

- [patch] Updated dependencies [b1ce691](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/b1ce691)
  - @atlaskit/media-card@41.0.0
  - @atlaskit/media-filmstrip@17.0.0
  - @atlaskit/media-core@24.3.0
  - @atlaskit/media-test-helpers@18.2.8

## 4.1.15

- [patch] Updated dependencies [6e510d8](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/6e510d8)
  - @atlaskit/media-core@24.2.2
  - @atlaskit/media-filmstrip@16.0.1
  - @atlaskit/media-test-helpers@18.2.7
  - @atlaskit/media-card@40.0.0

## 4.1.14

- [patch] Updated dependencies [2afa60d](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/2afa60d)
  - @atlaskit/media-card@39.0.0
  - @atlaskit/media-filmstrip@16.0.0
  - @atlaskit/media-test-helpers@18.2.5
  - @atlaskit/media-core@24.2.0

## 4.1.13

- [patch] Updated dependencies [272208b](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/272208b)
  - @atlaskit/icon-object@1.0.2

## 4.1.12

- [patch] Updated dependencies [8b2c4d3](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/8b2c4d3)
- [patch] Updated dependencies [3302d51](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/3302d51)
  - @atlaskit/media-card@38.0.0
  - @atlaskit/media-filmstrip@15.0.0
  - @atlaskit/media-core@24.1.0
  - @atlaskit/media-test-helpers@18.2.3

## 4.1.11

- [patch] Updated dependencies [0823d35](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/0823d35)
  - @atlaskit/icon-object@1.0.1

## 4.1.10

- [patch] Updated dependencies [709b239](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/709b239)
- [patch] Updated dependencies [65c6514](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/65c6514)
  - @atlaskit/icon@14.0.0
  - @atlaskit/icon-object@1.0.0
  - @atlaskit/docs@5.0.8
  - @atlaskit/button@9.0.13
  - @atlaskit/flag@9.0.11
  - @atlaskit/inline-dialog@9.0.6
  - @atlaskit/layer-manager@5.0.13
  - @atlaskit/modal-dialog@7.0.2
  - @atlaskit/navigation@33.1.11
  - @atlaskit/single-select@6.0.6
  - @atlaskit/tag@6.0.8
  - @atlaskit/tooltip@12.1.1
  - @atlaskit/media-card@37.0.1
  - @atlaskit/media-filmstrip@14.0.3
  - @atlaskit/media-test-helpers@18.2.1
  - @atlaskit/quick-search@4.2.9

## 4.1.9

- [patch] Updated dependencies [dae7792](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/dae7792)
  - @atlaskit/media-core@24.0.2
  - @atlaskit/media-filmstrip@14.0.2
  - @atlaskit/media-card@37.0.0
  - @atlaskit/media-test-helpers@18.2.0

## 4.1.8

- [patch] Updated dependencies [927ae63](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/927ae63)
  - @atlaskit/media-card@36.0.0
  - @atlaskit/media-filmstrip@14.0.0
  - @atlaskit/media-core@24.0.0
  - @atlaskit/media-test-helpers@18.0.0

## 4.1.7

- [patch] Updated dependencies [1be4bb8](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/1be4bb8)
  - @atlaskit/media-core@23.2.1
  - @atlaskit/media-filmstrip@13.0.2
  - @atlaskit/media-card@35.0.0

## 4.1.6

- [patch] Updated dependencies [6e1d642](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/6e1d642)
  - @atlaskit/media-card@34.0.0
  - @atlaskit/media-filmstrip@13.0.0
  - @atlaskit/media-core@23.2.0
  - @atlaskit/media-test-helpers@17.1.0

## 4.1.5

- [patch] Updated dependencies [d5a043a](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/d5a043a)
  - @atlaskit/icon@13.8.1
  - @atlaskit/layer-manager@5.0.12
  - @atlaskit/flag@9.0.10
  - @atlaskit/tooltip@12.0.14
  - @atlaskit/modal-dialog@7.0.0

## 4.1.4

- [patch] Updated dependencies [9c66d4d](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/9c66d4d)
  - @atlaskit/layer-manager@5.0.10
  - @atlaskit/webdriver-runner@0.1.0

## 4.1.3

- [patch] Updated dependencies [7545979](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/7545979)
  - @atlaskit/media-card@33.0.0
  - @atlaskit/media-filmstrip@12.0.0
  - @atlaskit/media-core@23.1.0

## 4.1.2

- [patch] removed promise from FabricAnalyticsListener.client property [90ba6bd](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/90ba6bd)

## 4.1.1

- [patch] Updated dependencies [911a570](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/911a570)
  - @atlaskit/media-test-helpers@17.0.0
  - @atlaskit/media-filmstrip@11.0.2
  - @atlaskit/media-core@23.0.2
  - @atlaskit/media-card@32.0.6

## 4.0.6

- [patch] Updated dependencies [b12f7e6](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/b12f7e6)
  - @atlaskit/badge@9.1.1
  - @atlaskit/media-card@32.0.5
  - @atlaskit/media-filmstrip@11.0.1

## 4.0.5

- [patch] Updated dependencies [dfa100e](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/dfa100e)
  - @atlaskit/analytics-listeners@3.3.1

## 4.0.4

- [patch] Updated dependencies [df22ad8](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/df22ad8)
  - @atlaskit/theme@6.0.0
  - @atlaskit/quick-search@4.2.7
  - @atlaskit/tooltip@12.0.9
  - @atlaskit/tag@6.0.5
  - @atlaskit/spinner@9.0.6
  - @atlaskit/single-select@6.0.4
  - @atlaskit/navigation@33.1.5
  - @atlaskit/modal-dialog@6.0.9
  - @atlaskit/lozenge@6.1.5
  - @atlaskit/layer-manager@5.0.6
  - @atlaskit/inline-dialog@9.0.2
  - @atlaskit/icon@13.2.5
  - @atlaskit/flag@9.0.5
  - @atlaskit/field-text@7.0.6
  - @atlaskit/dynamic-table@10.0.9
  - @atlaskit/code@8.0.1
  - @atlaskit/button@9.0.6
  - @atlaskit/badge@9.1.0
  - @atlaskit/docs@5.0.6

## 4.0.3

- [none] Updated dependencies [333a440](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/333a440)
- [patch] Updated dependencies [1d9e75a](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/1d9e75a)
  - @atlaskit/inline-dialog@9.0.0
  - @atlaskit/tooltip@12.0.8
  - @atlaskit/modal-dialog@6.0.8
- [none] Updated dependencies [a3109d3](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/a3109d3)
  - @atlaskit/inline-dialog@9.0.0
  - @atlaskit/tooltip@12.0.8
  - @atlaskit/modal-dialog@6.0.8
- [none] Updated dependencies [87d45d3](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/87d45d3)
  - @atlaskit/inline-dialog@9.0.0
  - @atlaskit/tooltip@12.0.8
  - @atlaskit/modal-dialog@6.0.8
- [none] Updated dependencies [a08b0c2](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/a08b0c2)
  - @atlaskit/inline-dialog@9.0.0
  - @atlaskit/tooltip@12.0.8
  - @atlaskit/modal-dialog@6.0.8

## 4.0.2

- [patch] Updated dependencies [f9c0cdb](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/f9c0cdb)
  - @atlaskit/code@8.0.0
  - @atlaskit/logo@9.0.4
  - @atlaskit/docs@5.0.5

## 4.0.1

- [patch] Add Object.values polyfill [b340c56](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/b340c56)

## 4.0.0

- [none] Updated dependencies [812a39c](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/812a39c)
  - @atlaskit/dynamic-table@10.0.6
- [major] Updated dependencies [d02746f](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/d02746f)
  - @atlaskit/media-test-helpers@16.0.0
  - @atlaskit/media-filmstrip@11.0.0
  - @atlaskit/media-core@23.0.0
  - @atlaskit/media-card@32.0.0

## 3.1.1

- [patch] Updated dependencies [acd86a1](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/acd86a1)
  - @atlaskit/media-card@31.2.1
  - @atlaskit/media-filmstrip@10.2.1
  - @atlaskit/logo@9.0.2
  - @atlaskit/navigation@33.1.2
  - @atlaskit/quick-search@4.2.4
  - @atlaskit/page@8.0.2
  - @atlaskit/inline-dialog@8.0.3
  - @atlaskit/tooltip@12.0.4
  - @atlaskit/layer-manager@5.0.4
  - @atlaskit/flag@9.0.3
  - @atlaskit/icon@13.2.2
  - @atlaskit/dynamic-table@10.0.5
  - @atlaskit/tag@6.0.3
  - @atlaskit/tag-group@6.0.3
  - @atlaskit/single-select@6.0.3
  - @atlaskit/button@9.0.4
  - @atlaskit/media-core@22.2.1
  - @atlaskit/media-test-helpers@15.2.1
  - @atlaskit/analytics-listeners@3.0.3
  - @atlaskit/theme@5.1.2
  - @atlaskit/lozenge@6.1.3
  - @atlaskit/code@7.0.2
  - @atlaskit/badge@9.0.3
  - @atlaskit/spinner@9.0.4
  - @atlaskit/field-text@7.0.3
  - @atlaskit/css-reset@3.0.1
  - @atlaskit/modal-dialog@6.0.5

## 3.1.0

- [patch] Updated dependencies [fa6f865](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/fa6f865)
  - @atlaskit/media-card@31.0.0
  - @atlaskit/media-filmstrip@10.1.0
  - @atlaskit/media-test-helpers@15.1.0
- [none] Updated dependencies [fdd03d8](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/fdd03d8)
  - @atlaskit/media-card@31.0.0
  - @atlaskit/media-filmstrip@10.1.0
  - @atlaskit/media-test-helpers@15.1.0
- [patch] Updated dependencies [49c8425](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/49c8425)
  - @atlaskit/media-card@31.0.0
  - @atlaskit/media-filmstrip@10.1.0
  - @atlaskit/media-test-helpers@15.1.0
- [minor] Updated dependencies [3476e01](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/3476e01)
  - @atlaskit/media-card@31.0.0
  - @atlaskit/media-filmstrip@10.1.0

## 3.0.4

- [none] Updated dependencies [25d6e48](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/25d6e48)
  - @atlaskit/single-select@6.0.2
  - @atlaskit/layer-manager@5.0.2
- [patch] Updated dependencies [e16d2b6](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/e16d2b6)
  - extract-react-types-loader@0.2.1

## 3.0.3

- [none] Updated dependencies [d0e13b7](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/d0e13b7)
- [patch] Updated dependencies [c5214a3](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/c5214a3)
  - extract-react-types-loader@0.2.0

## 3.0.2

- [patch] Update examples iframe loader to be more performant and unmount unused react dom trees [c42f300](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/c42f300)

## 3.0.1

- [patch] Updated dependencies [e6b1985](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/e6b1985)
  - @atlaskit/tooltip@12.0.0
  - @atlaskit/media-card@30.0.1
  - @atlaskit/navigation@33.0.1
  - @atlaskit/layer-manager@5.0.1
  - @atlaskit/icon@13.1.1

## 3.0.0

- [major] Updates to React ^16.4.0 [7edb866](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/7edb866)
- [major] Updated dependencies [563a7eb](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/563a7eb)
  - @atlaskit/tooltip@11.0.0
  - @atlaskit/media-card@30.0.0
  - @atlaskit/media-filmstrip@10.0.0
  - @atlaskit/logo@9.0.0
  - @atlaskit/inline-dialog@8.0.0
  - @atlaskit/modal-dialog@6.0.0
  - @atlaskit/quick-search@4.0.0
  - @atlaskit/single-select@6.0.0
  - @atlaskit/field-text@7.0.0
  - @atlaskit/analytics-listeners@3.0.0
  - @atlaskit/page@8.0.0
  - @atlaskit/tag@6.0.0
  - @atlaskit/tag-group@6.0.0
  - @atlaskit/flag@9.0.0
  - @atlaskit/dynamic-table@10.0.0
  - @atlaskit/button@9.0.0
  - @atlaskit/media-core@22.0.0
  - @atlaskit/media-test-helpers@15.0.0
  - @atlaskit/theme@5.0.0
  - @atlaskit/lozenge@6.0.0
  - @atlaskit/code@7.0.0
  - @atlaskit/badge@9.0.0
  - @atlaskit/spinner@9.0.0
  - @atlaskit/css-reset@3.0.0
  - @atlaskit/navigation@33.0.0
  - @atlaskit/layer-manager@5.0.0
  - @atlaskit/icon@13.0.0
- [major] Updated dependencies [7edb866](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/7edb866)
  - @atlaskit/quick-search@4.0.0
  - @atlaskit/navigation@33.0.0
  - @atlaskit/page@8.0.0
  - @atlaskit/media-card@30.0.0
  - @atlaskit/media-filmstrip@10.0.0
  - @atlaskit/media-test-helpers@15.0.0
  - @atlaskit/media-core@22.0.0
  - @atlaskit/analytics-listeners@3.0.0
  - @atlaskit/css-reset@3.0.0
  - @atlaskit/tooltip@11.0.0
  - @atlaskit/logo@9.0.0
  - @atlaskit/inline-dialog@8.0.0
  - @atlaskit/modal-dialog@6.0.0
  - @atlaskit/single-select@6.0.0
  - @atlaskit/field-text@7.0.0
  - @atlaskit/tag@6.0.0
  - @atlaskit/tag-group@6.0.0
  - @atlaskit/flag@9.0.0
  - @atlaskit/dynamic-table@10.0.0
  - @atlaskit/button@9.0.0
  - @atlaskit/theme@5.0.0
  - @atlaskit/lozenge@6.0.0
  - @atlaskit/code@7.0.0
  - @atlaskit/badge@9.0.0
  - @atlaskit/spinner@9.0.0
  - @atlaskit/layer-manager@5.0.0
  - @atlaskit/icon@13.0.0

## 2.1.8

- [patch] Updated dependencies [8bf8e51](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/8bf8e51)
  - @atlaskit/quick-search@3.0.0
  - @atlaskit/navigation@32.3.2
- [none] Updated dependencies [8b8ace1](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/8b8ace1)
  - @atlaskit/quick-search@3.0.0
  - @atlaskit/navigation@32.3.2

## 2.1.7

- [patch] Updated dependencies [42ee1ea](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/42ee1ea)
  - @atlaskit/media-test-helpers@14.0.6
  - @atlaskit/media-filmstrip@9.0.7
  - @atlaskit/media-core@21.0.0
  - @atlaskit/media-card@29.1.8

## 2.1.6

- [patch] adds environment variable for whether the atlaskit website is running locally, in staging or in production [a04c1c5](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/a04c1c5)
- [patch] Updated dependencies [a04c1c5](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/a04c1c5)
  - @atlaskit/webpack-config@2.0.1

## 2.1.5

- [patch] Updated dependencies [eee2d45](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/eee2d45)
  - @atlaskit/code@6.0.0
  - @atlaskit/logo@8.1.3

## 2.1.4

- [patch] Updated dependencies [c57e9c1](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/c57e9c1)
  - @atlaskit/media-test-helpers@14.0.4
  - @atlaskit/media-filmstrip@9.0.5
  - @atlaskit/media-card@29.1.5
  - @atlaskit/media-core@20.0.0

## 2.1.3

- [patch] Updated dependencies [cdba8b3](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/cdba8b3)
  - @atlaskit/spinner@8.0.0
  - @atlaskit/media-card@29.1.4
  - @atlaskit/single-select@5.2.2
  - @atlaskit/flag@8.1.3
  - @atlaskit/dynamic-table@9.2.2
  - @atlaskit/button@8.2.3

## 2.1.2

- [patch] Clean Changelogs - remove duplicates and empty entries [e7756cd](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/e7756cd)
- [none] Updated dependencies [e7756cd](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/e7756cd)
  - @atlaskit/media-card@29.1.2
  - @atlaskit/media-filmstrip@9.0.3
  - @atlaskit/media-test-helpers@14.0.3
  - @atlaskit/media-core@19.1.3
  - @atlaskit/css-reset@2.0.6
  - @atlaskit/tooltip@10.2.1
  - @atlaskit/inline-dialog@7.1.2
  - @atlaskit/modal-dialog@5.2.2
  - @atlaskit/single-select@5.1.2
  - @atlaskit/field-text@6.0.4
  - @atlaskit/button@8.1.2
  - @atlaskit/page@7.1.1
  - @atlaskit/theme@4.0.4
  - @atlaskit/tag@5.0.4
  - @atlaskit/tag-group@5.1.1
  - @atlaskit/lozenge@5.0.4
  - @atlaskit/code@5.0.4
  - @atlaskit/spinner@7.0.2
  - @atlaskit/logo@8.1.2
  - @atlaskit/flag@8.1.1
  - @atlaskit/dynamic-table@9.1.2
  - @atlaskit/navigation@32.1.1
  - @atlaskit/layer-manager@4.2.1
  - @atlaskit/icon@12.1.2

## 2.1.1

- [patch] Update changelogs to remove duplicate [cc58e17](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/cc58e17)
- [none] Updated dependencies [cc58e17](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/cc58e17)
  - @atlaskit/quick-search@2.1.1
  - @atlaskit/media-card@29.1.1
  - @atlaskit/media-filmstrip@9.0.2
  - @atlaskit/media-test-helpers@14.0.2
  - @atlaskit/media-core@19.1.2
  - @atlaskit/css-reset@2.0.5
  - @atlaskit/theme@4.0.3
  - @atlaskit/layer-manager@4.1.1
  - @atlaskit/tag@5.0.3
  - @atlaskit/spinner@7.0.1
  - @atlaskit/single-select@5.1.1
  - @atlaskit/modal-dialog@5.1.1
  - @atlaskit/lozenge@5.0.3
  - @atlaskit/inline-dialog@7.1.1
  - @atlaskit/icon@12.1.1
  - @atlaskit/logo@8.1.1
  - @atlaskit/dynamic-table@9.1.1
  - @atlaskit/code@5.0.3
  - @atlaskit/button@8.1.1
  - @atlaskit/badge@8.0.3

## 2.1.0

- [patch] Updated dependencies [9d20f54](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/9d20f54)
  - @atlaskit/spinner@7.0.0
  - @atlaskit/media-card@29.1.0
  - @atlaskit/media-filmstrip@9.0.1
  - @atlaskit/single-select@5.1.0
  - @atlaskit/navigation@32.1.0
  - @atlaskit/quick-search@2.1.0
  - @atlaskit/page@7.1.0
  - @atlaskit/inline-dialog@7.1.0
  - @atlaskit/modal-dialog@5.1.0
  - @atlaskit/layer-manager@4.1.0
  - @atlaskit/tooltip@10.2.0
  - @atlaskit/tag-group@5.1.0
  - @atlaskit/tag@5.0.2
  - @atlaskit/icon@12.1.0
  - @atlaskit/logo@8.1.0
  - @atlaskit/media-core@19.1.1
  - @atlaskit/media-test-helpers@14.0.1
  - @atlaskit/css-reset@2.0.4
  - @atlaskit/theme@4.0.2
  - @atlaskit/lozenge@5.0.2
  - @atlaskit/field-text@6.0.2
  - @atlaskit/code@5.0.2
  - @atlaskit/badge@8.0.2
  - @atlaskit/flag@8.1.0
  - @atlaskit/dynamic-table@9.1.0
  - @atlaskit/button@8.1.0

## 2.0.0

- [major] makes styled-components a peer dependency and upgrades version range from 1.4.6 - 3 to ^3.2.6 [1e80619](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/1e80619)
- [patch] Updated dependencies [1e80619](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/1e80619)
  - @atlaskit/quick-search@2.0.0
  - @atlaskit/navigation@32.0.0
  - @atlaskit/page@7.0.0
  - @atlaskit/media-card@29.0.0
  - @atlaskit/media-filmstrip@9.0.0
  - @atlaskit/media-test-helpers@14.0.0
  - @atlaskit/media-core@19.0.0
  - @atlaskit/tooltip@10.0.0
  - @atlaskit/layer-manager@4.0.0
  - @atlaskit/modal-dialog@5.0.0
  - @atlaskit/flag@8.0.0
  - @atlaskit/icon@12.0.0
  - @atlaskit/dynamic-table@9.0.0
  - @atlaskit/tag@5.0.0
  - @atlaskit/tag-group@5.0.0
  - @atlaskit/single-select@5.0.0
  - @atlaskit/inline-dialog@7.0.0
  - @atlaskit/logo@8.0.0
  - @atlaskit/field-text@6.0.0
  - @atlaskit/button@8.0.0
  - @atlaskit/theme@4.0.0
  - @atlaskit/lozenge@5.0.0
  - @atlaskit/code@5.0.0
  - @atlaskit/badge@8.0.0
  - @atlaskit/spinner@6.0.0
  - @atlaskit/css-reset@2.0.3

## 1.5.24

- [patch] Updated dependencies [1c87e5a](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/1c87e5a)
  - @atlaskit/page@6.0.4
  - @atlaskit/media-card@28.0.6
  - @atlaskit/media-filmstrip@8.0.9
  - @atlaskit/navigation@31.0.5
  - @atlaskit/quick-search@1.7.2

## 1.5.23

- [patch] Fix fullscreen examples increasing height on each browser repaint [5118ca4](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/5118ca4)

## 1.5.22

- [patch] Updated dependencies [481c086](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/481c086)
  - extract-react-types-loader@0.1.3

## 1.5.21

- [patch] Updated dependencies [bd26d3c](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/bd26d3c)
  - @atlaskit/media-core@18.1.1
  - @atlaskit/media-test-helpers@13.0.1
  - @atlaskit/media-card@28.0.1

## 1.5.20

- [patch] Updated dependencies [84f6f91](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/84f6f91)
  - @atlaskit/media-test-helpers@13.0.0
  - @atlaskit/media-core@18.1.0
  - @atlaskit/media-filmstrip@8.0.7
  - @atlaskit/media-card@28.0.0
- [patch] Updated dependencies [9041d71](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/9041d71)
  - @atlaskit/media-test-helpers@13.0.0
  - @atlaskit/media-core@18.1.0
  - @atlaskit/media-filmstrip@8.0.7
  - @atlaskit/media-card@28.0.0

## 1.5.19

- [patch] Updated dependencies [d662caa](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/d662caa)
  - @atlaskit/icon@11.3.0
  - @atlaskit/quick-search@1.4.2
  - @atlaskit/media-filmstrip@8.0.6
  - @atlaskit/media-card@27.1.4
  - @atlaskit/tooltip@9.2.1
  - @atlaskit/page@6.0.3
  - @atlaskit/dynamic-table@8.0.3
  - @atlaskit/tag@4.1.1
  - @atlaskit/tag-group@4.0.1
  - @atlaskit/single-select@4.0.3
  - @atlaskit/navigation@31.0.4
  - @atlaskit/modal-dialog@4.0.5
  - @atlaskit/layer-manager@3.0.4
  - @atlaskit/inline-dialog@6.0.2
  - @atlaskit/flag@7.0.3
  - @atlaskit/logo@7.0.1
  - @atlaskit/field-text@5.0.3
  - @atlaskit/media-test-helpers@12.0.4
  - @atlaskit/media-core@18.0.3
  - @atlaskit/button@7.2.5
  - @atlaskit/theme@3.2.2
  - @atlaskit/code@4.0.4
  - @atlaskit/badge@7.1.2
  - @atlaskit/spinner@5.0.2
  - @atlaskit/css-reset@2.0.2
  - @atlaskit/lozenge@4.0.1

## 1.5.16

- [patch] Fix react dev warnings that appear when running the website in dev mode [b7f2a1a](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/b7f2a1a)

## 1.5.15

- [patch] release @atlaskit/navigation-next [33492df](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/33492df)

## 1.5.14

- [patch] Remove quick-search component from navigation. See docs for how to upgrade. [5447ec2](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/5447ec2)

## 1.5.10

- [patch] Bump to React 16.3. [4251858](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/4251858)

## 1.5.0

- [minor] Updated website to use iframe to load examples. Example loader now in a separate react app. Webpack config refactored to compile separate example loader, chunking refactored to be more performant with the new website changes. Updated modal-dialog to use new component structure to optionally specify a Body wrapping component. [e1fdfd8](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/e1fdfd8)

## 1.4.0

- [minor] Update styled-components dependency to support versions 1.4.6 - 3 [ceccf30](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/ceccf30)

## 1.3.5

- [patch] Migrate Navigation from Ak repo to ak mk 2 repo, Fixed flow typing inconsistencies in ak mk 2 [bdeef5b](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/bdeef5b)

## 1.3.3

- [patch] Resolved low hanging flow errors in field-base field-text comment icon item and website, \$ [007de27](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/007de27)

## 1.3.1

- [patch] package bump to resolve discrepencies with npm [be745da](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/be745da)

## 1.3.0

- [minor] Add React 16 support. [12ea6e4](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/12ea6e4)

## 1.2.11

- [patch] Include fetch polyfill in website [7bb41ac](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/7bb41ac)

## 1.2.10

- [patch] Bug fix and better error messages for changeset error [7f09b86](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/7f09b86)

## 1.2.8

- [patch] update flow dep, fix flow errors [722ad83](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/722ad83)
- [patch] update flow dep, fix flow errors [722ad83](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/722ad83)

## 1.1.5

- [patch] bump icon dependency [da14956](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/da14956)
- [patch] bump icon dependency [da14956](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/da14956)

## 1.1.1

- [patch] Use correct dependencies [7b178b1](7b178b1)
- [patch] Use correct dependencies [7b178b1](7b178b1)
