# @atlassian/xen-editor-provider

## 13.3.2

### Patch Changes

- [`b85e7ce12cd`](https://bitbucket.org/atlassian/atlassian-frontend/commits/b85e7ce12cd) - Internal upgrade of memoize-one to 6.0.0

## 13.3.1

### Patch Changes

- [`5bbb5d97888`](https://bitbucket.org/atlassian/atlassian-frontend/commits/5bbb5d97888) - CONFDEV-76900 - Added support of referentiality in renderer
- Updated dependencies

## 13.3.0

### Minor Changes

- [`fc807ec538a`](https://bitbucket.org/atlassian/atlassian-frontend/commits/fc807ec538a) - adds editor-referentiality references to xen-editor-provider

### Patch Changes

- Updated dependencies

## 13.2.2

### Patch Changes

- Updated dependencies

## 13.2.1

### Patch Changes

- Updated dependencies

## 13.2.0

### Minor Changes

- [`79d379ef893`](https://bitbucket.org/atlassian/atlassian-frontend/commits/79d379ef893) - Add dynamic modals to Custom UI macros.

## 13.1.4

### Patch Changes

- [`36e3ca6a76b`](https://bitbucket.org/atlassian/atlassian-frontend/commits/36e3ca6a76b) - Deletes `ConfigForm` export from forge-ui, removes support for `ConfigForm` from xen-editor-provider (Confluence macros). This style of config has been deprecated for 12 months. No code change needed unless you are using `ConfigForm` directly from forge-ui. If you are, please reach out in #eco-dev-loop.
- [`b95863772be`](https://bitbucket.org/atlassian/atlassian-frontend/commits/b95863772be) - Support external observers.
  Use better naming for refNode (refNode => reference).
  In favor of further work (supporting multiple references) pass array of references to Extension component.
  Expand node with localId for extentions.
- Updated dependencies

## 13.1.3

### Patch Changes

- Updated dependencies

## 13.1.2

### Patch Changes

- [`5dc955f265d`](https://bitbucket.org/atlassian/atlassian-frontend/commits/5dc955f265d) - [ux] Add automatic resizing to iframes.
- Updated dependencies

## 13.1.1

### Patch Changes

- Updated dependencies

## 13.1.0

### Minor Changes

- [`0313831c844`](https://bitbucket.org/atlassian/atlassian-frontend/commits/0313831c844) - Use requiresUserConsent to derive if 3LO prompt is needed for Custom UI apps

### Patch Changes

- Updated dependencies

## 13.0.7

### Patch Changes

- Updated dependencies

## 13.0.6

### Patch Changes

- [`c80316f9a1e`](https://bitbucket.org/atlassian/atlassian-frontend/commits/c80316f9a1e) - Internal change to read mentionsProvider using the ProviderFactory APIs instead of accessing the providers property

## 13.0.5

### Patch Changes

- Updated dependencies

## 13.0.4

### Patch Changes

- Updated dependencies

## 13.0.3

### Patch Changes

- [`5007d8bc3b4`](https://bitbucket.org/atlassian/atlassian-frontend/commits/5007d8bc3b4) - Change @atlassian/forge-ui-core dependency to @atlassian/forge-ui.
- Updated dependencies

## 13.0.2

### Patch Changes

- [`b02b35ca15c`](https://bitbucket.org/atlassian/atlassian-frontend/commits/b02b35ca15c) - Add in feature flag logic for xen-editor-provider with egress disclosure consent flow

## 13.0.1

### Patch Changes

- [`e20ad95e07f`](https://bitbucket.org/atlassian/atlassian-frontend/commits/e20ad95e07f) - implemented ExtensionAPI.doc.insertAfter()
- Updated dependencies

## 13.0.0

### Major Changes

- [`aec7614e371`](https://bitbucket.org/atlassian/atlassian-frontend/commits/aec7614e371) - This change removes legacy code associated with the Editor Manifest API migration.

  Delete getForgeExtensionProvider function.

  Delete ForgeEditorIntegration, ForgeRendererIntegration, ForgeEditorIntegrationNext and ForgeRendererIntegrationNext components.

  Delete useExtensionHandlers and useQuickInsertProvider hooks, and mergeQuickInsertProviders helper function.

## 12.0.8

### Patch Changes

- [`5a6e9efd99b`](https://bitbucket.org/atlassian/atlassian-frontend/commits/5a6e9efd99b) - ED-12508 implement api stub
- Updated dependencies

## 12.0.7

### Patch Changes

- [`58b170725be`](https://bitbucket.org/atlassian/atlassian-frontend/commits/58b170725be) - Renamed @atlaskit/editor-test-helpers/schema-builder to @atlaskit/editor-test-helpers/doc-builder
- Updated dependencies

## 12.0.6

### Patch Changes

- [`d2e70ebaaa9`](https://bitbucket.org/atlassian/atlassian-frontend/commits/d2e70ebaaa9) - NO-ISSUE: updated editor tests to use 'doc: DocBuilder' instead of 'doc: any'
- Updated dependencies

## 12.0.5

### Patch Changes

- [`dbc54ce7590`](https://bitbucket.org/atlassian/atlassian-frontend/commits/dbc54ce7590) - Pass accountId to Iframe Coredata

## 12.0.4

### Patch Changes

- [`24bc5849b52`](https://bitbucket.org/atlassian/atlassian-frontend/commits/24bc5849b52) - Remove unnecessary memoization

## 12.0.3

### Patch Changes

- Updated dependencies

## 12.0.2

### Patch Changes

- [`6fcd1689ecf`](https://bitbucket.org/atlassian/atlassian-frontend/commits/6fcd1689ecf) - [ux] Updates button implementation in xen editor provider
- Updated dependencies

## 12.0.1

### Patch Changes

- [`2b078f420fa`](https://bitbucket.org/atlassian/atlassian-frontend/commits/2b078f420fa) - Fix bug in Custom UI temporary context

## 12.0.0

### Major Changes

- [`03f5a7187ab`](https://bitbucket.org/atlassian/atlassian-frontend/commits/03f5a7187ab) - Breaking changes:

  - Removes `ForgeEditorIntegrationNext` and `ForgeRendererIntegrationNext` exports
  - Makes `analyticsWebClient` required to call `getForgeExtensionProviderNext`

## 11.0.0

### Major Changes

- [`6485e7c3c9e`](https://bitbucket.org/atlassian/atlassian-frontend/commits/6485e7c3c9e) - Added temporaryContext parameter to getForgeExtensionProvider and getForgeExtensionProviderNext.

  Also added accountId, cloudId and extensionData parameters to getForgeExtensionProvider and removed forgeContext.

  Existing consumers of this package should provide the legacy context (what is currently being passed in) into temporaryContext and the new context to extensionData.

  If unsure, see https://hello.atlassian.net/wiki/spaces/ECO/pages/954464066

### Patch Changes

- Updated dependencies

## 10.5.13

### Patch Changes

- [`37bfef8412`](https://bitbucket.org/atlassian/atlassian-frontend/commits/37bfef8412) - FIX: make changes for breaking change to IFrame component from @atlassian/forge-ui

## 10.5.12

### Patch Changes

- [`438b0a51f3`](https://bitbucket.org/atlassian/atlassian-frontend/commits/438b0a51f3) - Reverted PR-6686
- [`16677aa695`](https://bitbucket.org/atlassian/atlassian-frontend/commits/16677aa695) - BUGFIX: Do not return array as default value in non-multi Select config.
- Updated dependencies

## 10.5.11

### Patch Changes

- Updated dependencies

## 10.5.10

### Patch Changes

- Updated dependencies

## 10.5.9

### Patch Changes

- [`10c3b66919`](https://bitbucket.org/atlassian/atlassian-frontend/commits/10c3b66919) - Fix Custom UI macro context

## 10.5.8

### Patch Changes

- [`bfe3f1d3ec`](https://bitbucket.org/atlassian/atlassian-frontend/commits/bfe3f1d3ec) - Update coreData and extensionData props of Iframe component in ForgeEditorExtension and ForgeEditorExtensionNext.
- Updated dependencies

## 10.5.7

### Patch Changes

- [`d3265f19be`](https://bitbucket.org/atlassian/atlassian-frontend/commits/d3265f19be) - Transpile packages using babel rather than tsc

## 10.5.6

### Patch Changes

- Updated dependencies

## 10.5.5

### Patch Changes

- [`76af8395b1`](https://bitbucket.org/atlassian/atlassian-frontend/commits/76af8395b1) - Pass in context to the config invocation

## 10.5.4

### Patch Changes

- [`fdb430d614`](https://bitbucket.org/atlassian/atlassian-frontend/commits/fdb430d614) - add viewportSeize for macro

## 10.5.3

### Patch Changes

- [`34d9197d45`](https://bitbucket.org/atlassian/atlassian-frontend/commits/34d9197d45) - Read extension from query response instead of ADF

## 10.5.2

### Patch Changes

- [`08e62663ca`](https://bitbucket.org/atlassian/atlassian-frontend/commits/08e62663ca) - Proper context to bridge for custom UI

## 10.5.1

### Patch Changes

- Updated dependencies

## 10.5.0

### Minor Changes

- [`f394d9a149`](https://bitbucket.org/atlassian/atlassian-frontend/commits/f394d9a149) - [ux] Supports Custom UI apps calling authenticated resolver Forge functions. Requires apolloClient and contextIds as new props on the Iframe component.

### Patch Changes

- Updated dependencies

## 10.4.0

### Minor Changes

- [`1ddb0c2e31`](https://bitbucket.org/atlassian/atlassian-frontend/commits/1ddb0c2e31) - Add TextArea and UserPicker to macro config

### Patch Changes

- Updated dependencies

## 10.3.1

### Patch Changes

- [`29b9963ac8`](https://bitbucket.org/atlassian/atlassian-frontend/commits/29b9963ac8) - Update publishConfig registry URL

## 10.3.0

### Minor Changes

- [`a7900fb3ec`](https://bitbucket.org/atlassian/atlassian-frontend/commits/a7900fb3ec) - Add support for hosted resource macros
- [`e970042aaa`](https://bitbucket.org/atlassian/atlassian-frontend/commits/e970042aaa) - Add hosted resource support for Forge macros

### Patch Changes

- Updated dependencies

## 10.2.8

### Patch Changes

- [`5f58283e1f`](https://bitbucket.org/atlassian/atlassian-frontend/commits/5f58283e1f) - Export types using Typescript's new "export type" syntax to satisfy Typescript's --isolatedModules compiler option.
  This requires version 3.8 of Typescript, read more about how we handle Typescript versions here: https://atlaskit.atlassian.com/get-started
  Also add `typescript` to `devDependencies` to denote version that the package was built with.

## 10.2.7

### Patch Changes

- Updated dependencies

## 10.2.6

### Patch Changes

- [`57c5a91b35`](https://bitbucket.org/atlassian/atlassian-frontend/commits/57c5a91b35) - ED-10189: Show description at the top of config
- Updated dependencies

## 10.2.5

### Patch Changes

- [`8004795d40`](https://bitbucket.org/atlassian/atlassian-frontend/commits/8004795d40) - Updated Metal client

## 10.2.4

### Patch Changes

- [`b05b99898f`](https://bitbucket.org/atlassian/atlassian-frontend/commits/b05b99898f) - [ED-10476] Remove renderer dependency from xen-editor-provider

## 10.2.3

### Patch Changes

- [`edac4706ec`](https://bitbucket.org/atlassian/atlassian-frontend/commits/edac4706ec) - [ED-10473] Remove `editor-core` dependency from the package

## 10.2.2

### Patch Changes

- [`4ca8902178`](https://bitbucket.org/atlassian/atlassian-frontend/commits/4ca8902178) - Minor build config change - no effect on consumers

## 10.2.1

### Patch Changes

- Updated dependencies

## 10.2.0

### Minor Changes

- [`badba13c0f`](https://bitbucket.org/atlassian/atlassian-frontend/commits/badba13c0f) - Adds getForgeExtensionProviderNext
- [`779246daf9`](https://bitbucket.org/atlassian/atlassian-frontend/commits/779246daf9) - Implement xen-editor-provider with useWebRuntime and RendererNext.

  Introduces ForgeEditorIntegrationNext/ForgeRendererIntegrationNext

### Patch Changes

- [`ae9655c29f`](https://bitbucket.org/atlassian/atlassian-frontend/commits/ae9655c29f) - Wire up appName in ForgeEditorExtensionNext
- [`2914e9ec0a`](https://bitbucket.org/atlassian/atlassian-frontend/commits/2914e9ec0a) - Change EditorManifest generic to propagate instead of defaulting to any
- [`5c283c56e7`](https://bitbucket.org/atlassian/atlassian-frontend/commits/5c283c56e7) - Fix pluginFactory ExtensionState types falling back to any
- Updated dependencies

## 10.1.3

### Patch Changes

- [`6c525a8229`](https://bitbucket.org/atlassian/atlassian-frontend/commits/6c525a8229) - Upgraded to TypeScript 3.9.6 and tslib to 2.0.0

  Since tslib is a dependency for all our packages we recommend that products also follow this tslib upgrade
  to prevent duplicates of tslib being bundled.

## 10.1.2

### Patch Changes

- Updated dependencies

## 10.1.1

### Patch Changes

- Updated dependencies

## 10.1.0

### Minor Changes

- [`3fcca15f00`](https://bitbucket.org/atlassian/atlassian-frontend/commits/3fcca15f00) - Preserve app config when migrating from old config API to new config API. Support invoking config function as lambda entry point.
- [`0c7165e0dc`](https://bitbucket.org/atlassian/atlassian-frontend/commits/0c7165e0dc) - Add error handling for ThreeLOPrompt error
- [`21c5a57efd`](https://bitbucket.org/atlassian/atlassian-frontend/commits/21c5a57efd) - Added support for new editor config API
- [`7fcc4ba186`](https://bitbucket.org/atlassian/atlassian-frontend/commits/7fcc4ba186) - Support MacroConfig primitive for new config api
  Allow for new config API to be used with legacy manifest (for old extension nodes)

### Patch Changes

- [`faf010cbc3`](https://bitbucket.org/atlassian/atlassian-frontend/commits/faf010cbc3) - ED-9212: Add support for extension auto convert

  ## Breaking changes:

  Renamed the following exports from '@atlaskit/editor-common/extensions':

  - from `ExtensionModuleType` to `ExtensionQuickInsertModule`;
  - from `getItemsFromModule` to `getQuickInsertItemsFromModule`,

  Renamed the following exports from '@atlaskit/editor-common':

  - from `ExtensionModuleType` to `ExtensionQuickInsertModule`;

- Updated dependencies

## 10.0.1

### Patch Changes

- [`525f114365`](https://bitbucket.org/atlassian/atlassian-frontend/commits/525f114365) - Changes to forge-ui-core to support useWebRuntime/RendererNext in ForgeEditorExtension

  Config-related data is pulled from the effect and attached to legacy requests

- Updated dependencies

## 10.0.0

### Major Changes

- [`87f4720f27`](https://bitbucket.org/atlassian/atlassian-frontend/commits/87f4720f27) - Officially dropping IE11 support, from this version onwards there are no warranties of the package working in IE11.
  For more information see: https://community.developer.atlassian.com/t/atlaskit-to-drop-support-for-internet-explorer-11-from-1st-july-2020/39534

### Patch Changes

- Updated dependencies

## 9.3.0

### Minor Changes

- [`2e7e4ce49e`](https://bitbucket.org/atlassian/atlassian-frontend/commits/2e7e4ce49e) - Add list app latency and list app success metrics to getForgeExtensionProvider

  - And fix bug in legacyMacroManifest to work with new editor-core

### Patch Changes

- Updated dependencies

## 9.2.7

### Patch Changes

- Updated dependencies

## 9.2.6

### Patch Changes

- Updated dependencies

## 9.2.5

### Patch Changes

- [`98fd19b1af`](https://bitbucket.org/atlassian/atlassian-frontend/commits/98fd19b1af) - Rename current effects/Job with Legacy and introduce new types (no behaviour change)
- Updated dependencies

## 9.2.4

### Patch Changes

- Updated dependencies

## 9.2.3

### Patch Changes

- Updated dependencies

## 9.2.2

### Patch Changes

- [`131cee6d7a`](https://bitbucket.org/atlassian/atlassian-frontend/commits/131cee6d7a) - Add missing tslib dependency

## 9.2.1

### Patch Changes

- Updated dependencies

## 9.2.0

### Minor Changes

- [`4c56e0f25c`](https://bitbucket.org/atlassian/atlassian-frontend/commits/4c56e0f25c) - Add support for config with new Editor Extension API, add quick insert module to manifests and add testing

### Patch Changes

- Updated dependencies

## 9.1.1

### Patch Changes

- [`739b113b8e`](https://bitbucket.org/atlassian/atlassian-frontend/commits/739b113b8e) - Marking xen-editor-provider as a scheduled releases package

## 9.1.0

### Minor Changes

- [`404aac8cc8`](https://bitbucket.org/atlassian/atlassian-frontend/commits/404aac8cc8) - Dynamically create manifests for each Macro

### Patch Changes

- Updated dependencies

## 9.0.2

### Patch Changes

- [`a016cf9a28`](https://bitbucket.org/atlassian/atlassian-frontend/commits/a016cf9a28) - Rename variables, remove tests & refactor inner workings of components- Updated dependencies

## 9.0.1

### Patch Changes

- Updated dependencies

## 9.0.0

### Major Changes

- [`4e6d57601b`](https://bitbucket.org/atlassian/atlassian-frontend/commits/4e6d57601b) - Change signature of ForgeRendererIntegration, ForgeEditorIntegration and getForgeEditorExtension to now consume environment, product and page for metalClient creation

### Patch Changes

- Updated dependencies

## 8.12.5

### Patch Changes

- Updated dependencies

## 8.12.4

### Patch Changes

- Updated dependencies

## 8.12.3

### Patch Changes

- [patch][f45c19a96e](https://bitbucket.org/atlassian/atlassian-frontend/commits/f45c19a96e):

  Remove unused dependencies- Updated dependencies [f45c19a96e](https://bitbucket.org/atlassian/atlassian-frontend/commits/f45c19a96e):

  - @atlassian/forge-ui-core@0.17.1
  - @atlassian/forge-ui@11.11.5

## 8.12.2

### Patch Changes

- Updated dependencies [c37e267c51](https://bitbucket.org/atlassian/atlassian-frontend/commits/c37e267c51):
  - @atlassian/forge-ui-core@0.17.0
  - @atlassian/forge-ui-types@16.6.0
  - @atlassian/forge-ui@11.11.4

## 8.12.1

### Patch Changes

- Updated dependencies [2ea16f1f58](https://bitbucket.org/atlassian/atlassian-frontend/commits/2ea16f1f58):
  - @atlassian/forge-ui-core@0.16.0
  - @atlassian/forge-ui-types@16.5.0
  - @atlassian/forge-ui@11.11.3

## 8.12.0

### Minor Changes

- [minor][721eb9834b](https://bitbucket.org/atlassian/atlassian-frontend/commits/721eb9834b):

  Remove allowConfig prop from ForgeEditorIntegration and ForgeRendererIntegration.

## 8.11.2

### Patch Changes

- Updated dependencies [7e4d4a7ed4](https://bitbucket.org/atlassian/atlassian-frontend/commits/7e4d4a7ed4):
- Updated dependencies [999fbf849e](https://bitbucket.org/atlassian/atlassian-frontend/commits/999fbf849e):
- Updated dependencies [b202858f6c](https://bitbucket.org/atlassian/atlassian-frontend/commits/b202858f6c):
- Updated dependencies [9cee2b03e8](https://bitbucket.org/atlassian/atlassian-frontend/commits/9cee2b03e8):
- Updated dependencies [26de083801](https://bitbucket.org/atlassian/atlassian-frontend/commits/26de083801):
- Updated dependencies [d3cc97a424](https://bitbucket.org/atlassian/atlassian-frontend/commits/d3cc97a424):
- Updated dependencies [00f64f4eb8](https://bitbucket.org/atlassian/atlassian-frontend/commits/00f64f4eb8):
- Updated dependencies [4f70380793](https://bitbucket.org/atlassian/atlassian-frontend/commits/4f70380793):
- Updated dependencies [6b8e60827e](https://bitbucket.org/atlassian/atlassian-frontend/commits/6b8e60827e):
- Updated dependencies [449ef134b3](https://bitbucket.org/atlassian/atlassian-frontend/commits/449ef134b3):
- Updated dependencies [5b301bcdf6](https://bitbucket.org/atlassian/atlassian-frontend/commits/5b301bcdf6):
- Updated dependencies [729a4e4960](https://bitbucket.org/atlassian/atlassian-frontend/commits/729a4e4960):
- Updated dependencies [22704db5a3](https://bitbucket.org/atlassian/atlassian-frontend/commits/22704db5a3):
- Updated dependencies [5f075c4fd2](https://bitbucket.org/atlassian/atlassian-frontend/commits/5f075c4fd2):
- Updated dependencies [57c0487a02](https://bitbucket.org/atlassian/atlassian-frontend/commits/57c0487a02):
- Updated dependencies [c8d0ce5b94](https://bitbucket.org/atlassian/atlassian-frontend/commits/c8d0ce5b94):
- Updated dependencies [384791fb2b](https://bitbucket.org/atlassian/atlassian-frontend/commits/384791fb2b):
- Updated dependencies [c6b145978b](https://bitbucket.org/atlassian/atlassian-frontend/commits/c6b145978b):
- Updated dependencies [736507f8e0](https://bitbucket.org/atlassian/atlassian-frontend/commits/736507f8e0):
- Updated dependencies [cf41823165](https://bitbucket.org/atlassian/atlassian-frontend/commits/cf41823165):
- Updated dependencies [9e3646b59e](https://bitbucket.org/atlassian/atlassian-frontend/commits/9e3646b59e):
- Updated dependencies [aec7fbadcc](https://bitbucket.org/atlassian/atlassian-frontend/commits/aec7fbadcc):
- Updated dependencies [e477132440](https://bitbucket.org/atlassian/atlassian-frontend/commits/e477132440):
  - @atlaskit/editor-core@122.0.0
  - @atlaskit/editor-common@45.1.0
  - @atlaskit/button@13.3.11
  - @atlaskit/icon@20.1.1
  - @atlaskit/renderer@58.0.0
  - @atlassian/forge-ui-core@0.15.1

## 8.11.1

### Patch Changes

- Updated dependencies [ecb4d7ca7e](https://bitbucket.org/atlassian/atlassian-frontend/commits/ecb4d7ca7e):
  - @atlassian/forge-ui-core@0.15.0
  - @atlassian/forge-ui-types@16.4.0
  - @atlassian/forge-ui@11.11.2

## 8.11.0

### Minor Changes

- [minor][ba6214d750](https://bitbucket.org/atlassian/atlassian-frontend/commits/ba6214d750):

  Add extensionProvider, given as an argument to the children function, which currently can render old ADF nodes using the new Editor Extension API

## 8.10.13

### Patch Changes

- Updated dependencies [7d8049d99f](https://bitbucket.org/atlassian/atlassian-frontend/commits/7d8049d99f):
  - @atlassian/forge-ui-core@0.14.0
  - @atlassian/forge-ui@11.11.1

## 8.10.12

### Patch Changes

- Updated dependencies [2a87a3bbc5](https://bitbucket.org/atlassian/atlassian-frontend/commits/2a87a3bbc5):
- Updated dependencies [cf7a2d7506](https://bitbucket.org/atlassian/atlassian-frontend/commits/cf7a2d7506):
- Updated dependencies [759f0a5ca7](https://bitbucket.org/atlassian/atlassian-frontend/commits/759f0a5ca7):
- Updated dependencies [c74cc954d8](https://bitbucket.org/atlassian/atlassian-frontend/commits/c74cc954d8):
- Updated dependencies [b4326a7eba](https://bitbucket.org/atlassian/atlassian-frontend/commits/b4326a7eba):
- Updated dependencies [e4076915c8](https://bitbucket.org/atlassian/atlassian-frontend/commits/e4076915c8):
- Updated dependencies [bdb4da1fc0](https://bitbucket.org/atlassian/atlassian-frontend/commits/bdb4da1fc0):
- Updated dependencies [c51f0b4c70](https://bitbucket.org/atlassian/atlassian-frontend/commits/c51f0b4c70):
- Updated dependencies [16c193eb3e](https://bitbucket.org/atlassian/atlassian-frontend/commits/16c193eb3e):
- Updated dependencies [7ec160c0e2](https://bitbucket.org/atlassian/atlassian-frontend/commits/7ec160c0e2):
- Updated dependencies [5d430f7d37](https://bitbucket.org/atlassian/atlassian-frontend/commits/5d430f7d37):
- Updated dependencies [7e26fba915](https://bitbucket.org/atlassian/atlassian-frontend/commits/7e26fba915):
- Updated dependencies [5167f09a83](https://bitbucket.org/atlassian/atlassian-frontend/commits/5167f09a83):
- Updated dependencies [0c270847cb](https://bitbucket.org/atlassian/atlassian-frontend/commits/0c270847cb):
- Updated dependencies [91ff8d36f0](https://bitbucket.org/atlassian/atlassian-frontend/commits/91ff8d36f0):
- Updated dependencies [05539b052e](https://bitbucket.org/atlassian/atlassian-frontend/commits/05539b052e):
- Updated dependencies [a1ee397cbc](https://bitbucket.org/atlassian/atlassian-frontend/commits/a1ee397cbc):
- Updated dependencies [dc84dfa3bc](https://bitbucket.org/atlassian/atlassian-frontend/commits/dc84dfa3bc):
- Updated dependencies [318a1a0f2f](https://bitbucket.org/atlassian/atlassian-frontend/commits/318a1a0f2f):
- Updated dependencies [550c4b5018](https://bitbucket.org/atlassian/atlassian-frontend/commits/550c4b5018):
- Updated dependencies [11ff95c0f0](https://bitbucket.org/atlassian/atlassian-frontend/commits/11ff95c0f0):
- Updated dependencies [03a83cb954](https://bitbucket.org/atlassian/atlassian-frontend/commits/03a83cb954):
- Updated dependencies [ae426d5e97](https://bitbucket.org/atlassian/atlassian-frontend/commits/ae426d5e97):
- Updated dependencies [e21800fd1c](https://bitbucket.org/atlassian/atlassian-frontend/commits/e21800fd1c):
- Updated dependencies [258a36b51f](https://bitbucket.org/atlassian/atlassian-frontend/commits/258a36b51f):
- Updated dependencies [109004a98e](https://bitbucket.org/atlassian/atlassian-frontend/commits/109004a98e):
- Updated dependencies [205b05851a](https://bitbucket.org/atlassian/atlassian-frontend/commits/205b05851a):
- Updated dependencies [1a48183584](https://bitbucket.org/atlassian/atlassian-frontend/commits/1a48183584):
- Updated dependencies [b9903e773a](https://bitbucket.org/atlassian/atlassian-frontend/commits/b9903e773a):
- Updated dependencies [823d80f31c](https://bitbucket.org/atlassian/atlassian-frontend/commits/823d80f31c):
- Updated dependencies [41917f4c16](https://bitbucket.org/atlassian/atlassian-frontend/commits/41917f4c16):
- Updated dependencies [69b678b38c](https://bitbucket.org/atlassian/atlassian-frontend/commits/69b678b38c):
- Updated dependencies [de6548dae5](https://bitbucket.org/atlassian/atlassian-frontend/commits/de6548dae5):
- Updated dependencies [9dd4b9088b](https://bitbucket.org/atlassian/atlassian-frontend/commits/9dd4b9088b):
- Updated dependencies [0b22d3b9ea](https://bitbucket.org/atlassian/atlassian-frontend/commits/0b22d3b9ea):
- Updated dependencies [91304da441](https://bitbucket.org/atlassian/atlassian-frontend/commits/91304da441):
- Updated dependencies [b4ef7fe214](https://bitbucket.org/atlassian/atlassian-frontend/commits/b4ef7fe214):
- Updated dependencies [3644fc1afe](https://bitbucket.org/atlassian/atlassian-frontend/commits/3644fc1afe):
- Updated dependencies [971df84f45](https://bitbucket.org/atlassian/atlassian-frontend/commits/971df84f45):
- Updated dependencies [17a46dd016](https://bitbucket.org/atlassian/atlassian-frontend/commits/17a46dd016):
- Updated dependencies [0ab75c545b](https://bitbucket.org/atlassian/atlassian-frontend/commits/0ab75c545b):
- Updated dependencies [62f1f218d9](https://bitbucket.org/atlassian/atlassian-frontend/commits/62f1f218d9):
- Updated dependencies [67bc25bc3f](https://bitbucket.org/atlassian/atlassian-frontend/commits/67bc25bc3f):
- Updated dependencies [6eb8c0799f](https://bitbucket.org/atlassian/atlassian-frontend/commits/6eb8c0799f):
- Updated dependencies [5f75dd27c9](https://bitbucket.org/atlassian/atlassian-frontend/commits/5f75dd27c9):
- Updated dependencies [f3587bae11](https://bitbucket.org/atlassian/atlassian-frontend/commits/f3587bae11):
- Updated dependencies [287be84065](https://bitbucket.org/atlassian/atlassian-frontend/commits/287be84065):
- Updated dependencies [fb8725beac](https://bitbucket.org/atlassian/atlassian-frontend/commits/fb8725beac):
  - @atlaskit/editor-core@121.0.0
  - @atlaskit/editor-common@45.0.0
  - @atlaskit/renderer@57.0.0
  - @atlaskit/theme@9.5.3
  - @atlaskit/analytics-listeners@6.3.0
  - @atlaskit/analytics-next@6.3.6
  - @atlaskit/button@13.3.10
  - @atlassian/forge-ui-core@0.13.4

## 8.10.11

### Patch Changes

- Updated dependencies [bd8ba049e8](https://bitbucket.org/atlassian/atlassian-frontend/commits/bd8ba049e8):
  - @atlassian/forge-ui-core@0.13.0
  - @atlassian/forge-ui@11.8.0

## 8.10.10

### Patch Changes

- Updated dependencies [4d723c4881](https://bitbucket.org/atlassian/atlassian-frontend/commits/4d723c4881):
  - @atlassian/forge-ui-core@0.12.0
  - @atlassian/forge-ui@11.7.1

## 8.10.9

### Patch Changes

- Updated dependencies [9fd8ba7707](https://bitbucket.org/atlassian/atlassian-frontend/commits/9fd8ba7707):
- Updated dependencies [bc29fbc030](https://bitbucket.org/atlassian/atlassian-frontend/commits/bc29fbc030):
- Updated dependencies [7d80e44c09](https://bitbucket.org/atlassian/atlassian-frontend/commits/7d80e44c09):
- Updated dependencies [4c691c3b5f](https://bitbucket.org/atlassian/atlassian-frontend/commits/4c691c3b5f):
- Updated dependencies [d63513575b](https://bitbucket.org/atlassian/atlassian-frontend/commits/d63513575b):
- Updated dependencies [48f0ecf23e](https://bitbucket.org/atlassian/atlassian-frontend/commits/48f0ecf23e):
- Updated dependencies [130b83ccba](https://bitbucket.org/atlassian/atlassian-frontend/commits/130b83ccba):
- Updated dependencies [5180a51c0d](https://bitbucket.org/atlassian/atlassian-frontend/commits/5180a51c0d):
- Updated dependencies [067febb0a7](https://bitbucket.org/atlassian/atlassian-frontend/commits/067febb0a7):
- Updated dependencies [66cf61863f](https://bitbucket.org/atlassian/atlassian-frontend/commits/66cf61863f):
- Updated dependencies [f83b67a761](https://bitbucket.org/atlassian/atlassian-frontend/commits/f83b67a761):
- Updated dependencies [22d9c96ed2](https://bitbucket.org/atlassian/atlassian-frontend/commits/22d9c96ed2):
- Updated dependencies [a9e9604c8e](https://bitbucket.org/atlassian/atlassian-frontend/commits/a9e9604c8e):
- Updated dependencies [8126e7648c](https://bitbucket.org/atlassian/atlassian-frontend/commits/8126e7648c):
- Updated dependencies [b41beace3f](https://bitbucket.org/atlassian/atlassian-frontend/commits/b41beace3f):
- Updated dependencies [02425bf2d7](https://bitbucket.org/atlassian/atlassian-frontend/commits/02425bf2d7):
- Updated dependencies [953cfadbe3](https://bitbucket.org/atlassian/atlassian-frontend/commits/953cfadbe3):
- Updated dependencies [29b0315dcb](https://bitbucket.org/atlassian/atlassian-frontend/commits/29b0315dcb):
- Updated dependencies [53ebcdb974](https://bitbucket.org/atlassian/atlassian-frontend/commits/53ebcdb974):
- Updated dependencies [aa4dc7f5d6](https://bitbucket.org/atlassian/atlassian-frontend/commits/aa4dc7f5d6):
- Updated dependencies [d63888b5e5](https://bitbucket.org/atlassian/atlassian-frontend/commits/d63888b5e5):
- Updated dependencies [13a0e50f38](https://bitbucket.org/atlassian/atlassian-frontend/commits/13a0e50f38):
- Updated dependencies [0a0a54cb47](https://bitbucket.org/atlassian/atlassian-frontend/commits/0a0a54cb47):
- Updated dependencies [6dcad31e41](https://bitbucket.org/atlassian/atlassian-frontend/commits/6dcad31e41):
- Updated dependencies [6242ec17a2](https://bitbucket.org/atlassian/atlassian-frontend/commits/6242ec17a2):
- Updated dependencies [6b65ae4f04](https://bitbucket.org/atlassian/atlassian-frontend/commits/6b65ae4f04):
- Updated dependencies [fad8a16962](https://bitbucket.org/atlassian/atlassian-frontend/commits/fad8a16962):
- Updated dependencies [cc54ca2490](https://bitbucket.org/atlassian/atlassian-frontend/commits/cc54ca2490):
  - @atlaskit/editor-core@120.0.0
  - @atlaskit/editor-common@44.1.0
  - @atlaskit/renderer@56.0.0
  - @atlaskit/mention@18.18.0
  - @atlaskit/media-core@31.1.0
  - @atlassian/forge-ui-core@0.11.10

## 8.10.8

### Patch Changes

- [patch][4e01da2b5b](https://bitbucket.org/atlassian/atlassian-frontend/commits/4e01da2b5b):

  Moved from usage of styled-components to emotion- Updated dependencies [4e01da2b5b](https://bitbucket.org/atlassian/atlassian-frontend/commits/4e01da2b5b):

  - @atlassian/forge-ui-core@0.11.9

## 8.10.7

### Patch Changes

- Updated dependencies [9809d6e322](https://bitbucket.org/atlassian/atlassian-frontend/commits/9809d6e322):
  - @atlassian/forge-ui-types@16.0.0
  - @atlassian/forge-ui-core@0.11.5
  - @atlassian/forge-ui@11.5.1
  - @atlassian/aux-test-utils@3.1.3

## 8.10.6

### Patch Changes

- Updated dependencies [bc380c30ce](https://bitbucket.org/atlassian/atlassian-frontend/commits/bc380c30ce):
- Updated dependencies [cc0d9f6ede](https://bitbucket.org/atlassian/atlassian-frontend/commits/cc0d9f6ede):
- Updated dependencies [6384746272](https://bitbucket.org/atlassian/atlassian-frontend/commits/6384746272):
- Updated dependencies [956a70b918](https://bitbucket.org/atlassian/atlassian-frontend/commits/956a70b918):
- Updated dependencies [3494940acd](https://bitbucket.org/atlassian/atlassian-frontend/commits/3494940acd):
- Updated dependencies [5bb23adac3](https://bitbucket.org/atlassian/atlassian-frontend/commits/5bb23adac3):
- Updated dependencies [ebee5c7429](https://bitbucket.org/atlassian/atlassian-frontend/commits/ebee5c7429):
- Updated dependencies [680a61dc5a](https://bitbucket.org/atlassian/atlassian-frontend/commits/680a61dc5a):
- Updated dependencies [57096fc043](https://bitbucket.org/atlassian/atlassian-frontend/commits/57096fc043):
- Updated dependencies [b17120e768](https://bitbucket.org/atlassian/atlassian-frontend/commits/b17120e768):
- Updated dependencies [92e0b393f5](https://bitbucket.org/atlassian/atlassian-frontend/commits/92e0b393f5):
- Updated dependencies [fd5292fd5a](https://bitbucket.org/atlassian/atlassian-frontend/commits/fd5292fd5a):
- Updated dependencies [ac8639dfd8](https://bitbucket.org/atlassian/atlassian-frontend/commits/ac8639dfd8):
- Updated dependencies [2f0df19890](https://bitbucket.org/atlassian/atlassian-frontend/commits/2f0df19890):
- Updated dependencies [2475d1c9d8](https://bitbucket.org/atlassian/atlassian-frontend/commits/2475d1c9d8):
- Updated dependencies [0732eedea7](https://bitbucket.org/atlassian/atlassian-frontend/commits/0732eedea7):
- Updated dependencies [113d075684](https://bitbucket.org/atlassian/atlassian-frontend/commits/113d075684):
- Updated dependencies [af8a3763dd](https://bitbucket.org/atlassian/atlassian-frontend/commits/af8a3763dd):
- Updated dependencies [21a1faf014](https://bitbucket.org/atlassian/atlassian-frontend/commits/21a1faf014):
- Updated dependencies [94116c6018](https://bitbucket.org/atlassian/atlassian-frontend/commits/94116c6018):
- Updated dependencies [9fadef064b](https://bitbucket.org/atlassian/atlassian-frontend/commits/9fadef064b):
- Updated dependencies [27fde59914](https://bitbucket.org/atlassian/atlassian-frontend/commits/27fde59914):
- Updated dependencies [f8ffc8320f](https://bitbucket.org/atlassian/atlassian-frontend/commits/f8ffc8320f):
- Updated dependencies [469e9a2302](https://bitbucket.org/atlassian/atlassian-frontend/commits/469e9a2302):
- Updated dependencies [a41d2345eb](https://bitbucket.org/atlassian/atlassian-frontend/commits/a41d2345eb):
- Updated dependencies [4ef23b6a15](https://bitbucket.org/atlassian/atlassian-frontend/commits/4ef23b6a15):
- Updated dependencies [8cc5cc0603](https://bitbucket.org/atlassian/atlassian-frontend/commits/8cc5cc0603):
- Updated dependencies [5d8a0d4f5f](https://bitbucket.org/atlassian/atlassian-frontend/commits/5d8a0d4f5f):
- Updated dependencies [faa96cee2a](https://bitbucket.org/atlassian/atlassian-frontend/commits/faa96cee2a):
- Updated dependencies [535286e8c4](https://bitbucket.org/atlassian/atlassian-frontend/commits/535286e8c4):
- Updated dependencies [c7b205c83f](https://bitbucket.org/atlassian/atlassian-frontend/commits/c7b205c83f):
- Updated dependencies [fd5292fd5a](https://bitbucket.org/atlassian/atlassian-frontend/commits/fd5292fd5a):
- Updated dependencies [703b72cdba](https://bitbucket.org/atlassian/atlassian-frontend/commits/703b72cdba):
- Updated dependencies [025842de1a](https://bitbucket.org/atlassian/atlassian-frontend/commits/025842de1a):
- Updated dependencies [cd662c7e4c](https://bitbucket.org/atlassian/atlassian-frontend/commits/cd662c7e4c):
- Updated dependencies [de64f9373c](https://bitbucket.org/atlassian/atlassian-frontend/commits/de64f9373c):
- Updated dependencies [93ac94a762](https://bitbucket.org/atlassian/atlassian-frontend/commits/93ac94a762):
- Updated dependencies [fd5292fd5a](https://bitbucket.org/atlassian/atlassian-frontend/commits/fd5292fd5a):
- Updated dependencies [172a864d19](https://bitbucket.org/atlassian/atlassian-frontend/commits/172a864d19):
- Updated dependencies [6a417f2e52](https://bitbucket.org/atlassian/atlassian-frontend/commits/6a417f2e52):
- Updated dependencies [5e3aab8e77](https://bitbucket.org/atlassian/atlassian-frontend/commits/5e3aab8e77):
- Updated dependencies [fdf6c939e8](https://bitbucket.org/atlassian/atlassian-frontend/commits/fdf6c939e8):
- Updated dependencies [395739b5ef](https://bitbucket.org/atlassian/atlassian-frontend/commits/395739b5ef):
  - @atlaskit/editor-common@44.0.2
  - @atlaskit/editor-core@119.0.0
  - @atlaskit/icon@20.1.0
  - @atlaskit/renderer@55.0.0
  - @atlaskit/mention@18.17.0
  - @atlassian/forge-ui-core@0.11.3
  - @atlaskit/media-core@31.0.5
  - @atlaskit/button@13.3.9

## 8.10.5

### Patch Changes

- [patch][90aa05226f](https://bitbucket.org/atlassian/atlassian-frontend/commits/90aa05226f):

  Move packages to atlassian-frontend monorepo.- Updated dependencies [90aa05226f](https://bitbucket.org/atlassian/atlassian-frontend/commits/90aa05226f):

  - @atlassian/forge-ui@11.4.4

## 8.10.4

### Patch Changes

- [patch][83e7f1d3](https://bitbucket.org/atlassian/aux/commits/83e7f1d3):

  Bump forge-ui-core dependency- Updated dependencies [83e7f1d3](https://bitbucket.org/atlassian/aux/commits/83e7f1d3):

  - @atlassian/forge-ui@11.4.3

## 8.10.3

### Patch Changes

- [patch][f24ed4cc](https://bitbucket.org/atlassian/aux/commits/f24ed4cc):

  Bump @atlassian/forge-ui-types to ^15.6.0- Updated dependencies [d61e7eaa](https://bitbucket.org/atlassian/aux/commits/d61e7eaa):

- Updated dependencies [f24ed4cc](https://bitbucket.org/atlassian/aux/commits/f24ed4cc):
  - @atlassian/forge-ui-core@0.10.0
  - @atlassian/forge-ui@11.4.2

## 8.10.2

### Patch Changes

- Updated dependencies [a146087c](https://bitbucket.org/atlassian/aux/commits/a146087c):
  - @forge/ui@0.2.0
  - @atlassian/forge-ui@11.4.1

## 8.10.1

### Patch Changes

- [patch][932fa2de](https://bitbucket.org/atlassian/aux/commits/932fa2de):

  Add extensionContext support- Updated dependencies [932fa2de](https://bitbucket.org/atlassian/aux/commits/932fa2de):

  - @atlassian/forge-ui@11.4.0
  - @forge/ui@0.2.0
  - @atlassian/forge-ui-core@0.9.1

## 8.10.0

### Minor Changes

- [minor][b249b816](https://bitbucket.org/atlassian/aux/commits/b249b816):

  pass optional productData through generic extension components

### Patch Changes

- Updated dependencies [b249b816](https://bitbucket.org/atlassian/aux/commits/b249b816):
  - @atlassian/forge-ui@11.3.0
  - @atlassian/forge-ui-core@0.9.0

## 8.9.10

### Patch Changes

- Updated dependencies [fb60d51a](https://bitbucket.org/atlassian/aux/commits/fb60d51a):
  - @forge/ui@0.2.0
  - @atlassian/forge-ui@11.2.13

## 8.9.9

### Patch Changes

- Updated dependencies [c76398f1](https://bitbucket.org/atlassian/aux/commits/c76398f1):
  - @forge/ui@0.2.0
  - @atlassian/forge-ui@11.2.12

## 8.9.8

### Patch Changes

- [patch][41dec6e9](https://bitbucket.org/atlassian/aux/commits/41dec6e9):

  Update forge-ui-types to ^15.2.0- Updated dependencies [41dec6e9](https://bitbucket.org/atlassian/aux/commits/41dec6e9):

- Updated dependencies [15413b26](https://bitbucket.org/atlassian/aux/commits/15413b26):
  - @atlassian/forge-ui@11.2.10
  - @atlassian/forge-ui-core@0.8.0

## 8.9.7

### Patch Changes

- Updated dependencies [b4b10827](https://bitbucket.org/atlassian/aux/commits/b4b10827):
  - @atlassian/forge-ui-core@0.7.0
  - @atlassian/forge-ui@11.2.9

## 8.9.6

### Patch Changes

- [patch][05e21868](https://bitbucket.org/atlassian/aux/commits/05e21868):

  Bump @atlassian/forge-ui-types to 15.1.3- Updated dependencies [05e21868](https://bitbucket.org/atlassian/aux/commits/05e21868):

  - @atlassian/forge-ui-core@0.6.2
  - @atlassian/forge-ui@11.2.8

## 8.9.5

### Patch Changes

- Updated dependencies [aa2da594](https://bitbucket.org/atlassian/aux/commits/aa2da594):
- Updated dependencies [df1e489a](https://bitbucket.org/atlassian/aux/commits/df1e489a):
  - @forge/ui@0.2.0
  - @atlassian/forge-ui-core@0.6.0
  - @atlassian/forge-ui@11.2.7

## 8.9.4

### Patch Changes

- [patch][e7b35610](https://bitbucket.org/atlassian/aux/commits/e7b35610):

  Bump Atlaskit dependencies to match atlassian-frontend versions- Updated dependencies [e7b35610](https://bitbucket.org/atlassian/aux/commits/e7b35610):

  - @atlassian/forge-ui-core@0.5.1
  - @atlassian/forge-ui@11.2.6

## 8.9.3

### Patch Changes

- [patch][49e93901](https://bitbucket.org/atlassian/aux/commits/49e93901):

  The owner of an app is now only returned with the extension metadata when specifically requested. The only place that app owner is used - the QuickInsertProvider - has been updated to make sure it still gets the information.- Updated dependencies [49e93901](https://bitbucket.org/atlassian/aux/commits/49e93901):

  - @atlassian/forge-ui-core@0.5.0
  - @atlassian/forge-ui@11.2.5

## 8.9.2

### Patch Changes

- Updated dependencies [e8368816](https://bitbucket.org/atlassian/aux/commits/e8368816):
  - @forge/ui@0.2.0
  - @atlassian/forge-ui@11.2.2

## 8.9.1

### Patch Changes

- Updated dependencies [389da2b6](https://bitbucket.org/atlassian/aux/commits/389da2b6):
  - @atlassian/forge-ui-core@0.4.0
  - @atlassian/forge-ui-types@15.1.0
  - @forge/ui@0.1.0
  - @atlassian/forge-ui@11.2.1

## 8.9.0

### Minor Changes

- [minor][28cfb264](https://bitbucket.org/atlassian/aux/commits/28cfb264):

  Re-export ProductEnvironment enum from @atlassian/forge-ui for consumers to use instead of passing strings into createMetalClient

### Patch Changes

- Updated dependencies [577453ed](https://bitbucket.org/atlassian/aux/commits/577453ed):
- Updated dependencies [0aaa68d5](https://bitbucket.org/atlassian/aux/commits/0aaa68d5):
- Updated dependencies [3bf66617](https://bitbucket.org/atlassian/aux/commits/3bf66617):
- Updated dependencies [c503140f](https://bitbucket.org/atlassian/aux/commits/c503140f):
  - @atlassian/forge-ui-types@15.0.0
  - @atlassian/forge-ui@11.2.0
  - @atlassian/aux-test-utils@3.1.0
  - @atlassian/forge-ui-core@0.3.1

## 8.8.2

### Patch Changes

- Updated dependencies [6d18cc5a](https://bitbucket.org/atlassian/aux/commits/6d18cc5a):
  - @atlassian/forge-ui-core@0.3.0
  - @atlassian/forge-ui@11.1.0

## 8.8.1

### Patch Changes

- Updated dependencies [948a66d0](https://bitbucket.org/atlassian/aux/commits/948a66d0):
  - @atlassian/forge-ui@11.0.0

## 8.8.0

### Minor Changes

- [minor][fa812d9f](https://bitbucket.org/atlassian/aux/commits/fa812d9f):

  The xen-editor-provider now makes use of the generic extension point components from @atlassian/forge-ui. To do this, addtional components are exported from @atlassian/forge-ui and it was touched up to be more flexible with the inputs it receives to match the xen-editor-provider.

### Patch Changes

- Updated dependencies [fa812d9f](https://bitbucket.org/atlassian/aux/commits/fa812d9f):
  - @atlassian/forge-ui@10.1.0

## 8.7.19

### Patch Changes

- Updated dependencies [eca6b60e](https://bitbucket.org/atlassian/aux/commits/eca6b60e):
  - @atlassian/forge-ui-core@0.2.0

## 8.7.18

### Patch Changes

- [patch][0855b6f5](https://bitbucket.org/atlassian/aux/commits/0855b6f5):

  Change @atlassian/forge-ui-core dependency to caret range.

## 8.7.17

### Patch Changes

- [patch][242df341](https://bitbucket.org/atlassian/aux/commits/242df341):

  Fix config modal closing twice bug.

## 8.7.16

### Patch Changes

- Updated dependencies [61bc69b6](https://bitbucket.org/atlassian/aux/commits/61bc69b6):
  - @atlassian/forge-ui-core@0.1.5

## 8.7.15

### Patch Changes

- [patch][132f1e0d](https://bitbucket.org/atlassian/aux/commits/132f1e0d):

  Remove explicit key prop from definition of internal components- Updated dependencies [132f1e0d](https://bitbucket.org/atlassian/aux/commits/132f1e0d):

  - @atlassian/forge-ui-core@0.1.4

## 8.7.14

### Patch Changes

- Updated dependencies [2db1258f](https://bitbucket.org/atlassian/aux/commits/2db1258f):
  - @atlassian/forge-ui-core@0.1.3

## 8.7.13

### Patch Changes

- [patch][4ea5b094](https://bitbucket.org/atlassian/aux/commits/4ea5b094):

  BUGFIX: Display new config on page publish.- Updated dependencies [4ea5b094](https://bitbucket.org/atlassian/aux/commits/4ea5b094):

  - @atlassian/forge-ui-core@0.1.2

## 8.7.12

### Patch Changes

- Updated dependencies [0b5e8bc6](https://bitbucket.org/atlassian/aux/commits/0b5e8bc6):
  - @forge/ui@0.1.0

## 8.7.11

### Patch Changes

- [patch][2feb8ea0](https://bitbucket.org/atlassian/aux/commits/2feb8ea0):

  Fix some out of sync data from duplicated test/mock app data- Updated dependencies [2feb8ea0](https://bitbucket.org/atlassian/aux/commits/2feb8ea0):

  - @atlassian/forge-ui-core@0.1.1

## 8.7.10

### Patch Changes

- [patch][da876c8c](https://bitbucket.org/atlassian/aux/commits/da876c8c):

  Move component implementations out of Renderer and allow additional components to be injected into WebRuntime. Inject ConfigForm instead of drilling config props to the component.- Updated dependencies [da876c8c](https://bitbucket.org/atlassian/aux/commits/da876c8c):

  - @atlassian/forge-ui-core@0.1.0

## 8.7.9

### Patch Changes

- Updated dependencies [c82fe7a1](https://bitbucket.org/atlassian/aux/commits/c82fe7a1):
  - @atlassian/forge-ui-core@0.0.11

## 8.7.8

### Patch Changes

- Updated dependencies [c4c630e2](https://bitbucket.org/atlassian/aux/commits/c4c630e2):
  - @atlassian/forge-ui-core@0.0.10

## 8.7.7

### Patch Changes

- Updated dependencies [3eb262e6](https://bitbucket.org/atlassian/aux/commits/3eb262e6):
  - @atlassian/forge-ui-core@0.0.9

## 8.7.6

### Patch Changes

- Updated dependencies [7ea77aaf](https://bitbucket.org/atlassian/aux/commits/7ea77aaf):
  - @atlassian/forge-ui-core@0.0.8

## 8.7.5

### Patch Changes

- Updated dependencies [8bdab8f1](https://bitbucket.org/atlassian/aux/commits/8bdab8f1):
  - @atlassian/forge-ui-core@0.0.7

## 8.7.4

### Patch Changes

- [patch][667f3c03](https://bitbucket.org/atlassian/aux/commits/667f3c03):

  Delete AuxWebClient component and inject invokeAuxEffects directly into WebRuntime.- Updated dependencies [667f3c03](https://bitbucket.org/atlassian/aux/commits/667f3c03):

  - @atlassian/forge-ui-core@0.0.6

## 8.7.3

### Patch Changes

- Updated dependencies [a4d7589f](https://bitbucket.org/atlassian/aux/commits/a4d7589f):
  - @atlassian/forge-ui-core@0.0.5

## 8.7.2

### Patch Changes

- [patch][9dfdeca5](https://bitbucket.org/atlassian/aux/commits/9dfdeca5):

  Render portals above modals. Move ProductDataProvider within ForgeExtension. Add key to UserPicker. transformFormData in ConfigForm- [patch][00303db7](https://bitbucket.org/atlassian/aux/commits/00303db7):

  Rename EditorMacro to Macro.- Updated dependencies [1103d768](https://bitbucket.org/atlassian/aux/commits/1103d768):

- Updated dependencies [9dfdeca5](https://bitbucket.org/atlassian/aux/commits/9dfdeca5):
- Updated dependencies [00303db7](https://bitbucket.org/atlassian/aux/commits/00303db7):
  - @forge/ui@0.1.0
  - @atlassian/forge-ui-core@0.0.4
  - @atlassian/aux-test-utils@3.0.5
  - @atlassian/forge-ui-types@14.4.2

## 8.7.1

### Patch Changes

- [patch][6281a292](https://bitbucket.org/atlassian/aux/commits/6281a292):

  Delete aux-web-common and move web-runtime into forge-ui-core.- Updated dependencies [6281a292](https://bitbucket.org/atlassian/aux/commits/6281a292):

  - @atlassian/forge-ui-core@0.0.3

## 8.7.0

### Minor Changes

- [minor][375a9046](https://bitbucket.org/atlassian/aux/commits/375a9046):

  Initial version of forge-ui product integration package. Removed experimental components from xen-editor-provider.

## 8.6.10

### Patch Changes

- [patch][c4785c90](https://bitbucket.org/atlassian/aux/commits/c4785c90):

  Move error-boundary and aux-web-client into forge-ui-core.- Updated dependencies [c4785c90](https://bitbucket.org/atlassian/aux/commits/c4785c90):

  - @atlassian/forge-ui-core@0.0.2
  - @atlassian/aux-web-runtime@3.1.5

## 8.6.9

### Patch Changes

- [patch][1d8af3c8](https://bitbucket.org/atlassian/aux/commits/1d8af3c8):

  Create new forge-ui-core package and move components, renderer, analytics and context into it.- Updated dependencies [1d8af3c8](https://bitbucket.org/atlassian/aux/commits/1d8af3c8):

  - @atlassian/forge-ui-core@0.0.1
  - @atlassian/forge-ui-error-boundary@1.0.5
  - @atlassian/aux-test-utils@3.0.4
  - @atlassian/forge-ui-types@14.4.1
  - @atlassian/aux-web-client@5.0.9
  - @atlassian/aux-web-runtime@3.1.4

## 8.6.8

### Patch Changes

- [patch][efc93a78](https://bitbucket.org/atlassian/aux/commits/efc93a78):

  Makes forge extensions more resiliant to being reinitialized by the editor. This fixes being unable to open config in certain situations.

## 8.6.7

### Patch Changes

- [patch][cec87a9a](https://bitbucket.org/atlassian/aux/commits/cec87a9a):

  Bump @atlaskit dependencies- Updated dependencies [b8cc9d7f](https://bitbucket.org/atlassian/aux/commits/b8cc9d7f):

  - @forge/ui@0.1.0

## 8.6.6

### Patch Changes

- Updated dependencies [916a93ef](https://bitbucket.org/atlassian/aux/commits/916a93ef):
  - @atlassian/forge-ui-types@14.4.0
  - @forge/ui@0.1.0

## 8.6.5

### Patch Changes

- [patch][57958dce](https://bitbucket.org/atlassian/aux/commits/57958dce):

  Fix bug where config modal will not close when submitting unchanged config.

## 8.6.4

### Patch Changes

- [patch][1ae212c3](https://bitbucket.org/atlassian/aux/commits/1ae212c3):

  Removed isEditing from Forge extensions themselves (now in Editor integration)- Updated dependencies [1ae212c3](https://bitbucket.org/atlassian/aux/commits/1ae212c3):

  - @atlassian/aux-web-runtime@3.1.2

## 8.6.3

### Patch Changes

- [patch][6d10f99a](https://bitbucket.org/atlassian/aux/commits/6d10f99a):

  Add page to MetalClientContext- Updated dependencies [6d10f99a](https://bitbucket.org/atlassian/aux/commits/6d10f99a):

  - @atlassian/aux-context@0.6.0
  - @atlassian/aux-web-client@5.0.7
  - @atlassian/aux-web-runtime@3.1.1

## 8.6.2

### Patch Changes

- [patch][e9fcf55d](https://bitbucket.org/atlassian/aux/commits/e9fcf55d):

  Pass the host product to the Metal client

## 8.6.1

### Patch Changes

- Updated dependencies [bede1138](https://bitbucket.org/atlassian/aux/commits/bede1138):
  - @forge/ui@0.1.0

## 8.6.0

### Minor Changes

- [minor][40e7a4e6](https://bitbucket.org/atlassian/aux/commits/40e7a4e6):

  Adds support for editor macro configuration. This feature displays an app's configuration in a modal dialog the edit pencil is clicked on.

### Patch Changes

- Updated dependencies [40e7a4e6](https://bitbucket.org/atlassian/aux/commits/40e7a4e6):
  - @atlassian/forge-ui-types@14.3.0
  - @atlassian/aux-web-runtime@3.1.0

## 8.5.0

### Minor Changes

- [minor][7b8a3a38](https://bitbucket.org/atlassian/aux/commits/7b8a3a38):

  Update Editor integration to enable UserPicker

### Patch Changes

- Updated dependencies [7b8a3a38](https://bitbucket.org/atlassian/aux/commits/7b8a3a38):
  - @atlassian/aux-context@0.5.0
  - @atlassian/aux-web-client@5.0.6
  - @atlassian/aux-web-runtime@3.0.6

## 8.4.0

### Minor Changes

- [minor][4e2ef25e](https://bitbucket.org/atlassian/aux/commits/4e2ef25e):

  Web client lazily loads MetalClient dependency

### Patch Changes

- Updated dependencies [4e2ef25e](https://bitbucket.org/atlassian/aux/commits/4e2ef25e):
  - @atlassian/aux-context@0.4.1
  - @atlassian/aux-web-client@5.0.5

## 8.3.3

### Patch Changes

- Updated dependencies [a53580dc](https://bitbucket.org/atlassian/aux/commits/a53580dc):
  - @forge/ui@0.1.0
  - @atlassian/forge-ui-types@14.2.0

## 8.3.2

### Patch Changes

- Updated dependencies [776f701e](https://bitbucket.org/atlassian/aux/commits/776f701e):
- Updated dependencies [029e7858](https://bitbucket.org/atlassian/aux/commits/029e7858):
  - @forge/ui@0.1.0
  - @atlassian/forge-ui-types@14.1.0

## 8.3.1

### Patch Changes

- Updated dependencies [aa2085c5](https://bitbucket.org/atlassian/aux/commits/aa2085c5):
- Updated dependencies [0ad39030](https://bitbucket.org/atlassian/aux/commits/0ad39030):
  - @atlassian/forge-ui-types@14.0.0
  - @atlassian/aux-web-runtime@3.0.5
  - @atlassian/aux-web-client@5.0.4

## 8.3.0

### Minor Changes

- [minor][330f0538](https://bitbucket.org/atlassian/aux/commits/330f0538):

  Add metalClient prop on ForgeEditorIntegration and ForgeRendererIntegration, and add createMetalClient function

### Patch Changes

- Updated dependencies [a7f73898](https://bitbucket.org/atlassian/aux/commits/a7f73898):
- Updated dependencies [d64c57b7](https://bitbucket.org/atlassian/aux/commits/d64c57b7):
  - @atlassian/aux-web-client@5.0.3
  - @atlassian/aux-context@0.4.0
  - @atlassian/aux-web-runtime@3.0.4

## 8.2.0

### Minor Changes

- [minor][e420977a](https://bitbucket.org/atlassian/aux/commits/e420977a):

  Add Atlassian UserPicker component

### Patch Changes

- Updated dependencies [e420977a](https://bitbucket.org/atlassian/aux/commits/e420977a):
  - @atlassian/aux-context@0.3.0
  - @atlassian/forge-ui-types@13.1.0
  - @forge/ui@0.1.0
  - @atlassian/aux-web-runtime@3.0.3

## 8.1.1

### Patch Changes

- Updated dependencies [d5ccaac4](https://bitbucket.org/atlassian/aux/commits/d5ccaac4):
  - @atlassian/forge-ui-types@13.0.0
  - @atlassian/aux-web-runtime@3.0.2
  - @atlassian/aux-web-client@5.0.2

## 8.1.0

### Minor Changes

- [minor][48e7b030](https://bitbucket.org/atlassian/aux/commits/48e7b030):

  PAPA-30 - Add experimental component support for generic extension points

## 8.0.0

### Major Changes

- [major][796276d5](https://bitbucket.org/atlassian/aux/commits/796276d5):

  Removes useExtensionHandlers and useQuickInsertProvider from the package exports. We removed these because they are implementation details of the ForgeEditorIntegration and the ForgeRendererIntegration.

## 7.3.0

### Minor Changes

- [minor][4fdb5374](https://bitbucket.org/atlassian/aux/commits/4fdb5374):

  Export ForgeContext and ForgeUIAnalyticsContext

## 7.2.0

### Minor Changes

- [minor][6a8d85d3](https://bitbucket.org/atlassian/aux/commits/6a8d85d3):

  Add the app's name to the ‘Allow Access’ user prompt message for 3LO requests

### Patch Changes

- Updated dependencies [6a8d85d3](https://bitbucket.org/atlassian/aux/commits/6a8d85d3):
  - @atlassian/aux-web-runtime@3.0.0
  - @atlassian/aux-context@0.2.0
  - @forge/ui@0.1.0
  - @atlassian/forge-ui-types@12.0.4

## 7.1.0

### Minor Changes

- [minor][1b9a48a3](https://bitbucket.org/atlassian/aux/commits/1b9a48a3):

  Update analytics for forgeUIExtension viewed/errored events

### Patch Changes

- Updated dependencies [1b9a48a3](https://bitbucket.org/atlassian/aux/commits/1b9a48a3):
  - @atlassian/forge-ui-analytics@1.2.0
  - @atlassian/aux-web-runtime@2.2.0

## 7.0.4

### Patch Changes

- [patch][39c8e4bc](https://bitbucket.org/atlassian/aux/commits/39c8e4bc):

  Change forge/ui version to tilde semver version

## 7.0.3

### Patch Changes

- [patch][d84e15b2](https://bitbucket.org/atlassian/aux/commits/d84e15b2):

  Fire error analytics event when an exception is caught by the error boundary- Updated dependencies [d84e15b2](https://bitbucket.org/atlassian/aux/commits/d84e15b2):

  - @atlassian/forge-ui-error-boundary@1.0.3

## 7.0.2

### Patch Changes

- [patch][dcfc75d1](https://bitbucket.org/atlassian/aux/commits/dcfc75d1):

  AUX-411 Ensure app title is used in title of the frame in the editor

## 7.0.1

### Patch Changes

- [patch][cccecb98](https://bitbucket.org/atlassian/aux/commits/cccecb98):

  Depend on @forge/ui and @forge/ui-confluence at 0.1.0- Updated dependencies [cccecb98](https://bitbucket.org/atlassian/aux/commits/cccecb98):

  - @atlassian/forge-ui-types@12.0.2
  - @atlassian/aux-web-client@5.0.1
  - @atlassian/aux-web-runtime@2.1.2

## 7.0.0

### Major Changes

- [major][b6d9662d](https://bitbucket.org/atlassian/aux/commits/b6d9662d):

  Rename references to Xen to Forge. This includes XenEditorIntegration being renamed to ForgeEditorIntegration and XenRendererIntegration being renamed to ForgeRendererIntegration, both of which are externally consumed by Confluence. The xenContext prop on these components has also been changed to forgeContext.

## 6.1.0

### Minor Changes

- [minor][3008d65a](https://bitbucket.org/atlassian/aux/commits/3008d65a):

  Add AnalyticsContext containing forgeUISource around XenEditorIntegration and XenRendererIntegration

### Patch Changes

- Updated dependencies [64d43a39](https://bitbucket.org/atlassian/aux/commits/64d43a39):
- Updated dependencies [c53e5048](https://bitbucket.org/atlassian/aux/commits/c53e5048):
  - @atlassian/aux-web-runtime@2.1.1
  - @atlassian/forge-ui-analytics@1.1.0

## 6.0.0

### Major Changes

- [major][efbec823](https://bitbucket.org/atlassian/aux/commits/efbec823):

  Add required analyticsWebClient prop, and rename client prop to apolloClient. A ForgeUIAnalyticsListener wraps everything within, and AnalyticsContext is used to pass common attributes to analytics events.

### Patch Changes

- Updated dependencies [5d4c0a44](https://bitbucket.org/atlassian/aux/commits/5d4c0a44):
- Updated dependencies [886db4d4](https://bitbucket.org/atlassian/aux/commits/886db4d4):
  - @atlassian/forge-ui-analytics@1.0.0
  - @atlassian/aux-web-runtime@2.1.0

## 5.0.2

### Patch Changes

- Updated dependencies [9380801e](https://bitbucket.org/atlassian/aux/commits/9380801e):
  - @atlassian/forge-ui@12.1.0
  - @atlassian/forge-ui-types@12.0.1

## 5.0.1

### Patch Changes

- [patch][187128dc](https://bitbucket.org/atlassian/aux/commits/187128dc):

  Refactor useExtensionHandlers to prevent app from mounting multiple times

## 5.0.0

### Major Changes

- [major][c1027b23](https://bitbucket.org/atlassian/aux/commits/c1027b23):

  Make major releases of externally consumed packages due to underlying breaking changes

### Patch Changes

- Updated dependencies [eb2c44f0](https://bitbucket.org/atlassian/aux/commits/eb2c44f0):
- Updated dependencies [cab28e93](https://bitbucket.org/atlassian/aux/commits/cab28e93):
- Updated dependencies [c1027b23](https://bitbucket.org/atlassian/aux/commits/c1027b23):
  - @atlassian/forge-ui-types@12.0.0
  - @atlassian/forge-ui@12.0.0
  - @atlassian/aux-web-client@5.0.0
  - @atlassian/aux-web-runtime@2.0.0

## 4.5.2

### Patch Changes

- Updated dependencies [dffb9bf8](https://bitbucket.org/atlassian/aux/commits/dffb9bf8):
  - @atlassian/forge-ui@11.1.0

## 4.5.1

### Patch Changes

- [patch][c34f9766](https://bitbucket.org/atlassian/aux/commits/c34f9766):

  Re-release to fix empty dists

## 4.5.0

### Minor Changes

- [minor][f50c11c9](https://bitbucket.org/atlassian/aux/commits/f50c11c9):

  Move ForgeErrorBoundary around individual extensions, not top-level

## 4.4.0

### Minor Changes

- [minor][0da8ef20](https://bitbucket.org/atlassian/aux/commits/0da8ef20):

  Add compound XenEditorIntegration/XenRendererIntegration components

- Updated dependencies [e2ec25ba](https://bitbucket.org/atlassian/aux/commits/e2ec25ba):
  - @atlassian/forge-ui-error-boundary@1.0.0

## 4.3.2

### Patch Changes

- [patch][f40c6e7b](https://bitbucket.org/atlassian/aux/commits/f40c6e7b):

  Remove styled-components peer dependency

## 4.3.1

### Patch Changes

- [patch][3ae99cc7](https://bitbucket.org/atlassian/aux/commits/3ae99cc7):

  Bumped TS version to 3.6.4 and upgraded some AK dependencies

## 4.3.0

### Minor Changes

- [minor][279e7ba4](https://bitbucket.org/atlassian/aux/commits/279e7ba4):

  AUX-362 - Make Radio and Select API consistent

## 4.2.8

### Patch Changes

- [patch][159be71c](https://bitbucket.org/atlassian/aux/commits/159be71c):

  Add forge:src field to package.json

## 4.2.7

- Updated dependencies [2d3d1eb6](https://bitbucket.org/atlassian/aux/commits/2d3d1eb6):
  - @atlassian/aux-web-client@4.0.5
  - @atlassian/aux-web-runtime@1.1.5
  - @atlassian/forge-ui@10.0.0
  - @atlassian/forge-ui-types@10.0.0

## 4.2.6

### Patch Changes

- [patch][1d002d4b](https://bitbucket.org/atlassian/aux/commits/1d002d4b):

  Fix dependencies and add check in pipeline

## 4.2.5

### Patch Changes

- [patch][d22e0ea5](https://bitbucket.org/atlassian/aux/commits/d22e0ea5):

  Add tsconfig and npmignore

## 4.2.4

### Patch Changes

- [patch][d705cbf0](https://bitbucket.org/atlassian/aux/commits/d705cbf0):

  Rename pragma from Aux to ForgeUI- [patch][7c301533](https://bitbucket.org/atlassian/aux/commits/7c301533):

  AUX-330 - Rename types- [patch][72406ea2](https://bitbucket.org/atlassian/aux/commits/72406ea2):

  Rename @atlassian/aux to @atlassian/forge-ui

- Updated dependencies [ef5760d1](https://bitbucket.org/atlassian/aux/commits/ef5760d1):
  - @atlassian/forge-ui@9.0.0

## 4.2.3

### Patch Changes

- [patch][a48584f2](https://bitbucket.org/atlassian/aux/commits/a48584f2):

  unpin versions

## 4.2.2

- Updated dependencies [ccd4d79e](https://bitbucket.org/atlassian/aux/commits/ccd4d79e):
  - @atlassian/aux@8.0.0

## 4.2.1

### Patch Changes

- [patch][962826b0](https://bitbucket.org/atlassian/aux/commits/962826b0):

  Bump

## 4.2.0

### Minor Changes

- [minor][c3740d88](https://bitbucket.org/atlassian/aux/commits/c3740d88):

  Retrieve appOwner and environmentType from XIS and display this in the quick insert menu item's title and description

### Patch Changes

- [patch][dfc9f94f](https://bitbucket.org/atlassian/aux/commits/dfc9f94f):

  bumping types pkgs

## 4.1.6

- Updated dependencies [4d3410a5](https://bitbucket.org/atlassian/aux/commits/4d3410a5):
  - @atlassian/aux@7.0.0

## 4.1.5

### Patch Changes

- [patch][0918cec](https://bitbucket.org/atlassian/aux/commits/0918cec):

  Fix dependencies

## 4.1.4

### Patch Changes

- [patch][d1aef87](https://bitbucket.org/atlassian/aux/commits/d1aef87):

  Bump

## 4.1.3

### Patch Changes

- [patch][75ee371](https://bitbucket.org/atlassian/aux/commits/75ee371):

  Add potral provider && consume in select- [patch][c5ae816](https://bitbucket.org/atlassian/aux/commits/c5ae816):

  Set priority for xen extensions to the lowest- [patch][1e63e70](https://bitbucket.org/atlassian/aux/commits/1e63e70):

  Hide Editor config button

- Updated dependencies [7b67297](https://bitbucket.org/atlassian/aux/commits/7b67297):
  - @atlassian/aux-web-runtime@1.0.7
  - @atlassian/aux-web-client@3.0.4
  - @atlassian/aux@6.0.0
  - @atlassian/aux-types@8.0.0

## 4.1.2

### Patch Changes

- [patch][97341c1](https://bitbucket.org/atlassian/aux/commits/97341c1):

  Revert portal impl- [patch][38a2a8d](https://bitbucket.org/atlassian/aux/commits/38a2a8d):

  Bump types

## 4.1.1

### Patch Changes

- [patch][7a1655d](https://bitbucket.org/atlassian/aux/commits/7a1655d):

  Add portal prop to XenExtensionHandlers and render Select menu in portal

## 4.1.0

### Minor Changes

- [minor][11ef349](https://bitbucket.org/atlassian/aux/commits/11ef349):

  Pass context from Xen extension handler through web runtime down to backend runtime payload

## 4.0.2

- Updated dependencies [a650aca](https://bitbucket.org/atlassian/aux/commits/a650aca):
  - @atlassian/aux-web-client@3.0.2
  - @atlassian/aux-web-runtime@1.0.2
  - @atlassian/aux@5.0.0
  - @atlassian/aux-types@7.0.0

## 4.0.1

### Patch Changes

- [patch][9cd2f95](https://bitbucket.org/atlassian/aux/commits/9cd2f95):

  Remove redundant dependency- [patch][7ac8c0e](https://bitbucket.org/atlassian/aux/commits/7ac8c0e):

  Make styled-components peer dependency of Textarea and lock to Confluence version

- Updated dependencies [1d616db](https://bitbucket.org/atlassian/aux/commits/1d616db):
  - @atlassian/aux-renderer@3.0.1
  - @atlassian/aux@4.0.1
  - @atlassian/aux-web-client@3.0.1
  - @atlassian/aux-web-runtime@1.0.1
  - @atlassian/aux-types@6.0.0

## 4.0.0

### Major Changes

- [major][51b3988](https://bitbucket.org/atlassian/aux/commits/51b3988):

  Introduce cjs as main and module now points to esm build

## 3.2.0

### Minor Changes

- [minor][290e1cb](https://bitbucket.org/atlassian/aux/commits/290e1cb):

  Dummy release to cover the patch with cjs

## 3.1.1

- Updated dependencies [44c4345](https://bitbucket.org/atlassian/aux/commits/44c4345):
  - @atlassian/aux@3.3.0
  - @atlassian/aux-renderer@2.4.0
  - @atlassian/aux-web-runtime@0.4.0

## 3.1.0

### Minor Changes

- [minor][48a5f2b](https://bitbucket.org/atlassian/aux/commits/48a5f2b):

  adding checkbox component

- Updated dependencies [72a9cbf](https://bitbucket.org/atlassian/aux/commits/72a9cbf):
  - @atlassian/aux@3.1.0
  - @atlassian/aux-web-client@2.4.19
  - @atlassian/aux-renderer@2.2.0
  - @atlassian/aux-web-runtime@0.3.18
  - @atlassian/aux-types@4.0.0

## 3.0.25

- Updated dependencies [358d184](https://bitbucket.org/atlassian/aux/commits/358d184):
  - @atlassian/aux-renderer@2.1.31
  - @atlassian/aux@3.0.1
  - @atlassian/aux-web-client@2.4.18
  - @atlassian/aux-web-runtime@0.3.17
  - @atlassian/aux-types@3.0.0

## 3.0.24

- Updated dependencies [7c4573f](https://bitbucket.org/atlassian/aux/commits/7c4573f):
  - @atlassian/aux-renderer@2.1.30
  - @atlassian/aux-web-client@2.4.17
  - @atlassian/aux-web-runtime@0.3.16
  - @atlassian/aux@3.0.0
  - @atlassian/aux-types@2.0.0

## 3.0.23

- Updated dependencies [9b55364](https://bitbucket.org/atlassian/aux/commits/9b55364):
  - @atlassian/aux-renderer@2.1.29
  - @atlassian/aux-web-client@2.4.16
  - @atlassian/aux-web-runtime@0.3.15
  - @atlassian/aux@2.0.0
  - @atlassian/aux-types@1.0.0

## 3.0.22

### Patch Changes

- [patch][e85b7b7](https://bitbucket.org/atlassian/aux/commits/e85b7b7):

  Migrate to extensionId from definitionId

## 3.0.21

### Patch Changes

- [patch][282b3f6](https://bitbucket.org/atlassian/aux/commits/282b3f6):

  Match Confluence dependencies

## 3.0.20

### Patch Changes

- [patch][b2451d5](https://bitbucket.org/atlassian/aux/commits/b2451d5):

  AUX-78 Markdown support in textual content rendering- [patch][82360c7](https://bitbucket.org/atlassian/aux/commits/82360c7):

  Bump Aux renderer and web runtime

## 3.0.19

- Updated dependencies [5221d48](https://bitbucket.org/atlassian/aux/commits/5221d48):
  - @atlassian/aux@0.10.0

## 3.0.18

- Updated dependencies [a4e30d0](https://bitbucket.org/atlassian/aux/commits/a4e30d0):
  - @atlassian/aux@0.9.0

## 3.0.17

- Updated dependencies [ed26e74](https://bitbucket.org/atlassian/aux/commits/ed26e74):
  - @atlassian/aux-web-client@2.4.13
  - @atlassian/aux-web-runtime@0.3.12
  - @atlassian/aux-types@0.6.0
  - @atlassian/aux@0.8.5
  - @atlassian/aux-renderer@2.1.22

## 3.0.16

### Patch Changes

- [patch][2a9176f](https://bitbucket.org/atlassian/aux/commits/2a9176f):

  Consume ContextID common type rather than using string

## 3.0.15

- Updated dependencies [21687ed](https://bitbucket.org/atlassian/aux/commits/21687ed):
  - @atlassian/aux-renderer@2.1.20
  - @atlassian/aux-web-client@2.4.12
  - @atlassian/aux-web-runtime@0.3.11
  - @atlassian/aux-types@0.5.0
  - @atlassian/aux@0.8.4

## 3.0.14

### Patch Changes

- [patch][63c5519](https://bitbucket.org/atlassian/aux/commits/63c5519):

  Rename invokeAuxEffects mutation types

## 3.0.13

### Patch Changes

- [patch][99b00e2](https://bitbucket.org/atlassian/aux/commits/99b00e2):

  Fix bug in useAction which was causing multiple uses of useAction to behave weirdly

## 3.0.12

### Patch Changes

- [patch][1c40eff](https://bitbucket.org/atlassian/aux/commits/1c40eff):

  Set main field module to es5 for Confluence

## 3.0.11

- Updated dependencies [8cadadb](https://bitbucket.org/atlassian/aux/commits/8cadadb):
  - @atlassian/aux-web-client@2.4.9
  - @atlassian/aux-web-runtime@0.3.5
  - @atlassian/aux@0.8.0
  - @atlassian/aux-types@0.4.0

## 3.0.10

### Patch Changes

- [patch][b06cb0f](https://bitbucket.org/atlassian/aux/commits/b06cb0f):

  Dist updates for Confluence Branch build

## 3.0.9

### Patch Changes

- [patch][cf4562b](https://bitbucket.org/atlassian/aux/commits/cf4562b):

  Move extension / invokeAuxEffects types to @atlassian/aux-types

## 3.0.8

- Updated dependencies [390ac4c](https://bitbucket.org/atlassian/aux/commits/390ac4c):
  - @atlassian/aux-web-client@2.4.2
  - @atlassian/aux@0.7.0
  - @atlassian/aux-web-runtime@0.3.0

## 3.0.7

- Updated dependencies [6f40ef1](https://bitbucket.org/atlassian/aux/commits/6f40ef1):
  - @atlassian/aux-web-client@2.4.0
  - @atlassian/aux-web-runtime@0.2.0

## 3.0.6

### Patch Changes

- [patch][2d18d39](https://bitbucket.org/atlassian/aux/commits/2d18d39):

  Add override to localId generator to fix examples

## 3.0.5

### Patch Changes

- [patch][81231aa](https://bitbucket.org/atlassian/aux/commits/81231aa):

  Update to Confluence versions for scheduled build

## 3.0.4

### Patch Changes

- [patch][453899e](https://bitbucket.org/atlassian/aux/commits/453899e):

  Added a glass pane when extension is rendered in edit mode

## 3.0.3

### Patch Changes

- [patch][6fc9ca0](https://bitbucket.org/atlassian/aux/commits/6fc9ca0):

  No longer expose mock app data in xen-editor-provider dist

## 3.0.2

### Patch Changes

- [patch][0753658](https://bitbucket.org/atlassian/aux/commits/0753658):

  ExtensionContext GraphQL type now has an optional TExtension param

## 3.0.1

### Patch Changes

- [patch][5e3e3f1](https://bitbucket.org/atlassian/aux/commits/5e3e3f1):

  Import mock creators from aux-web-client

## 3.0.0

### Major Changes

- [major][dee4406](https://bitbucket.org/atlassian/aux/commits/dee4406):

  AUX-162 Pass Apollo client as option to avoid conflict

## 2.3.5

### Patch Changes

- [patch][31b8490](https://bitbucket.org/atlassian/aux/commits/31b8490):

  Moved the create localId function from web client to editor provider

## 2.3.4

### Patch Changes

- [patch][fe7596f](https://bitbucket.org/atlassian/aux/commits/fe7596f):

  Updated the package name for the aux web runtime

## 2.3.3

- Updated dependencies [fedd8d1](https://bitbucket.org/atlassian/aux/commits/fedd8d1):
  - @atlassian/aux-web-runtime@0.1.2

## 2.3.2

### Patch Changes

- [patch][78726f5](https://bitbucket.org/atlassian/aux/commits/78726f5):

  Remove obsolete hooks

## 2.3.1

- Updated dependencies [3535613](https://bitbucket.org/atlassian/aux/commits/3535613):
  - @atlassian/aux-web-runtime@0.1.1

## 2.3.0

### Minor Changes

- [minor][29b8165](https://bitbucket.org/atlassian/aux/commits/29b8165):

  AUX-115 Store extensionType, definitionId and key in ADF nodes

## 2.2.11

### Patch Changes

- [patch][6db8120](https://bitbucket.org/atlassian/aux/commits/6db8120):

  Added web runtime

## 2.2.10

### Patch Changes

- [patch][f01fe51](https://bitbucket.org/atlassian/aux/commits/f01fe51):

  Updates to include macro title and description from manifest

## 2.2.9

### Patch Changes

- [patch][29554af](https://bitbucket.org/atlassian/aux/commits/29554af):

  Rename extensionInstanceId to localId

## 2.2.8

### Patch Changes

- [patch][288bb42](https://bitbucket.org/atlassian/aux/commits/288bb42):

  Use Confluence Front End versions for some packages

## 2.2.7

### Patch Changes

- [patch][348bfc6](https://bitbucket.org/atlassian/aux/commits/348bfc6):

  Enabling strict mode for TypeScript

## 2.2.6

### Patch Changes

- [patch][c759d1c](https://bitbucket.org/atlassian/aux/commits/c759d1c):

  Add await to mergeQuickInsertProviders test

## 2.2.5

### Patch Changes

- [patch][340d6a8](https://bitbucket.org/atlassian/aux/commits/340d6a8):

  Fix main for Confluence

## 2.2.4

### Patch Changes

- [patch][6060a3e](https://bitbucket.org/atlassian/aux/commits/6060a3e):

  Change mainField to es2015

## 2.2.3

### Patch Changes

- [patch][eb7c893](https://bitbucket.org/atlassian/aux/commits/eb7c893):

  Updates to mainFields in package.json

## 2.2.2

### Patch Changes

- [patch][91e27c2](https://bitbucket.org/atlassian/aux/commits/91e27c2):

  Now passing in extension instance id to web-client

## 2.2.0

### Minor Changes

- [minor][5881a89](https://bitbucket.org/atlassian/aux/commits/5881a89):

  Use contextIds and type for getExtensionList

### Patch Changes

- [patch][02ffbb1](https://bitbucket.org/atlassian/aux/commits/02ffbb1):

  Bump to new typescript version

- [patch][1ff1f3a](https://bitbucket.org/atlassian/aux/commits/1ff1f3a):

  Change to package.json to use browser
