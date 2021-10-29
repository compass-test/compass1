# @atlassian/forge-ui

## 22.6.0

### Minor Changes

- [`91fd642917b`](https://bitbucket.org/atlassian/atlassian-frontend/commits/91fd642917b) - [ux] Update 3LO prompt UI and message for external auth

## 22.5.1

### Patch Changes

- [`1422ac6bca7`](https://bitbucket.org/atlassian/atlassian-frontend/commits/1422ac6bca7) - Modify submitMetric callback to be a stable reference

## 22.5.0

### Minor Changes

- [`0cf508c9c86`](https://bitbucket.org/atlassian/atlassian-frontend/commits/0cf508c9c86) - Add metric for consent failure, refactor metrics and ThreeLOPrompt

## 22.4.0

### Minor Changes

- [`cd34199deca`](https://bitbucket.org/atlassian/atlassian-frontend/commits/cd34199deca) - Remove support for ADF format in Text UI kit component

### Patch Changes

- Updated dependencies

## 22.3.0

### Minor Changes

- [`8e9078cb8c2`](https://bitbucket.org/atlassian/atlassian-frontend/commits/8e9078cb8c2) - [ux] Since we’re adding jira-software to the OAuth2 consent screen, we are updating the Forge-UI to use the Jira Software icon.

## 22.2.5

### Patch Changes

- [`28a782c3821`](https://bitbucket.org/atlassian/atlassian-frontend/commits/28a782c3821) - adds onClick prop to permission components and adjusts a11y labelling

## 22.2.4

### Patch Changes

- [`8d9978f01c2`](https://bitbucket.org/atlassian/atlassian-frontend/commits/8d9978f01c2) - Pass consent state from parent iframe to Custom UI Modal

## 22.2.3

### Patch Changes

- Updated dependencies

## 22.2.2

### Patch Changes

- [`54629bbba7f`](https://bitbucket.org/atlassian/atlassian-frontend/commits/54629bbba7f) - Change operation names to fit Atlassian GraphQL standards

## 22.2.1

### Patch Changes

- [`91e0505550a`](https://bitbucket.org/atlassian/atlassian-frontend/commits/91e0505550a) - [ux] Adjust padding and animation of egress components

## 22.2.0

### Minor Changes

- [`fcba9db1f5c`](https://bitbucket.org/atlassian/atlassian-frontend/commits/fcba9db1f5c) - Add new entrypoint for scope and egress components.

## 22.1.0

### Minor Changes

- [`5a5caafbf2a`](https://bitbucket.org/atlassian/atlassian-frontend/commits/5a5caafbf2a) - Allow camera and microphone access in Custom UI

## 22.0.0

### Major Changes

- [`36e3ca6a76b`](https://bitbucket.org/atlassian/atlassian-frontend/commits/36e3ca6a76b) - Deletes `ConfigForm` export from forge-ui, removes support for `ConfigForm` from xen-editor-provider (Confluence macros). This style of config has been deprecated for 12 months. No code change needed unless you are using `ConfigForm` directly from forge-ui. If you are, please reach out in #eco-dev-loop.
- [`2e310fc85ce`](https://bitbucket.org/atlassian/atlassian-frontend/commits/2e310fc85ce) - Updates `useModalDialog` return value to match atlaskit modal dialog new composable API. Code changes only needed if there are usages of `useModalDialog` from `@atlassian/forge-ui`. See bottom of [this file](https://bitbucket.org/atlassian/atlassian-frontend/src/master/packages/forge/forge-ui/src/components/modalDialog/index.tsx) for a usage example.

### Patch Changes

- [`3b8486af882`](https://bitbucket.org/atlassian/atlassian-frontend/commits/3b8486af882) - Upgrade to the latest version of @atlaskit/modal-dialog.
- Updated dependencies

## 21.8.0

### Minor Changes

- [`1dccb7f52a9`](https://bitbucket.org/atlassian/atlassian-frontend/commits/1dccb7f52a9) - Add submit method to the bridge

## 21.7.0

### Minor Changes

- [`63c404c270b`](https://bitbucket.org/atlassian/atlassian-frontend/commits/63c404c270b) - Switch forge invocations gql mutations to use new Payload format

## 21.6.3

### Patch Changes

- [`d08795053b3`](https://bitbucket.org/atlassian/atlassian-frontend/commits/d08795053b3) - Remove absolute positioning on 3LO prompt container.

## 21.6.2

### Patch Changes

- [`7750b168ad7`](https://bitbucket.org/atlassian/atlassian-frontend/commits/7750b168ad7) - BUGFIX: Add min height to iframe container.

## 21.6.1

### Patch Changes

- [`b3fce86ae79`](https://bitbucket.org/atlassian/atlassian-frontend/commits/b3fce86ae79) - Allowlist confluence|jira products when making API calls

## 21.6.0

### Minor Changes

- [`6d97360e8d2`](https://bitbucket.org/atlassian/atlassian-frontend/commits/6d97360e8d2) - [ux] Using the @atlassian/confluence-space-picker implementation in @atlassian/forge-confluence-components

### Patch Changes

- Updated dependencies

## 21.5.0

### Minor Changes

- [`71a443cafc3`](https://bitbucket.org/atlassian/atlassian-frontend/commits/71a443cafc3) - Add entryPoint property to custom UI Iframe component

## 21.4.1

### Patch Changes

- Updated dependencies

## 21.4.0

### Minor Changes

- [`437680b7aec`](https://bitbucket.org/atlassian/atlassian-frontend/commits/437680b7aec) - Add automatic resizing to Iframe component.

## 21.3.3

### Patch Changes

- Updated dependencies

## 21.3.2

### Patch Changes

- [`5d1fa81868b`](https://bitbucket.org/atlassian/atlassian-frontend/commits/5d1fa81868b) - Default to `User*` component mappings and use `Avatar*` mappings if `User*` mappings do not exist

## 21.3.1

### Patch Changes

- [`5a5693693af`](https://bitbucket.org/atlassian/atlassian-frontend/commits/5a5693693af) - Update text props

## 21.3.0

### Minor Changes

- [`ad423f97fb6`](https://bitbucket.org/atlassian/atlassian-frontend/commits/ad423f97fb6) - Add layout components and add align prop to Text

### Patch Changes

- Updated dependencies

## 21.2.2

### Patch Changes

- [`a32a47838ee`](https://bitbucket.org/atlassian/atlassian-frontend/commits/a32a47838ee) - Removes workaround of an internal theme mixin usage
- Updated dependencies

## 21.2.1

### Patch Changes

- [`e5218b752c6`](https://bitbucket.org/atlassian/atlassian-frontend/commits/e5218b752c6) - Prohibit protocol-relative links

## 21.2.0

### Minor Changes

- [`ed7fc349489`](https://bitbucket.org/atlassian/atlassian-frontend/commits/ed7fc349489) - Add productFetch bridge call to custom UI modules

## 21.1.2

### Patch Changes

- [`efb091632e8`](https://bitbucket.org/atlassian/atlassian-frontend/commits/efb091632e8) - BUGFIX: Remove quotes from 'type' query variable in extension list query.

## 21.1.1

### Patch Changes

- [`85eb0acac62`](https://bitbucket.org/atlassian/atlassian-frontend/commits/85eb0acac62) - Prevents loadingComponent being mounted multiple times when RendererNext loads

## 21.1.0

### Minor Changes

- [`0313831c844`](https://bitbucket.org/atlassian/atlassian-frontend/commits/0313831c844) - Use requiresUserConsent to derive if 3LO prompt is needed for Custom UI apps

### Patch Changes

- Updated dependencies

## 21.0.0

### Major Changes

- [`c6612380fc7`](https://bitbucket.org/atlassian/atlassian-frontend/commits/c6612380fc7) - Removes lots of old UI Kit related exports. In my review, there were no usage of the removed exports in jira-frontend or confluence-frontend.

  Significant bundle size reductions across the board. -25% in main entry point, -67% in iframe entry point, -88% in ui entry point.

## 20.0.1

### Patch Changes

- Updated dependencies

## 20.0.0

### Major Changes

- [`81efc7416bd`](https://bitbucket.org/atlassian/atlassian-frontend/commits/81efc7416bd) - Remove temporaryContext prop from Iframe component.

## 19.21.2

### Patch Changes

- Updated dependencies

## 19.21.1

### Patch Changes

- [`97611c77714`](https://bitbucket.org/atlassian/atlassian-frontend/commits/97611c77714) - add appearance, openNewTab to Link

## 19.21.0

### Minor Changes

- [`88125566ef1`](https://bitbucket.org/atlassian/atlassian-frontend/commits/88125566ef1) - Allow multiple modules to be retrieved in extension list query.

## 19.20.0

### Minor Changes

- [`38d4578d99f`](https://bitbucket.org/atlassian/atlassian-frontend/commits/38d4578d99f) - Add contents of @atlassian/forge-ui-core package.

## 19.19.3

### Patch Changes

- [`b02b35ca15c`](https://bitbucket.org/atlassian/atlassian-frontend/commits/b02b35ca15c) - Add in feature flag logic for xen-editor-provider with egress disclosure consent flow

## 19.19.2

### Patch Changes

- [`0722b629252`](https://bitbucket.org/atlassian/atlassian-frontend/commits/0722b629252) - BUGFIX: Make Forms with action buttons work in ModalDialog.

## 19.19.1

### Patch Changes

- [`6f48d1a81a8`](https://bitbucket.org/atlassian/atlassian-frontend/commits/6f48d1a81a8) - Adding in egress disclosure logic for Custom UI apps

## 19.19.0

### Minor Changes

- [`543695f1f72`](https://bitbucket.org/atlassian/atlassian-frontend/commits/543695f1f72) - Add modal bridge methods

## 19.18.1

### Patch Changes

- [`c17fe6144f8`](https://bitbucket.org/atlassian/atlassian-frontend/commits/c17fe6144f8) - Upgrade to the latest version of `@atlaskit/tabs`
- Updated dependencies

## 19.18.0

### Minor Changes

- [`f8bc1c50714`](https://bitbucket.org/atlassian/atlassian-frontend/commits/f8bc1c50714) - Add router history capability to bridge

## 19.17.0

### Minor Changes

- [`ce450fb04e8`](https://bitbucket.org/atlassian/atlassian-frontend/commits/ce450fb04e8) - [ux] Custom UI Iframes will now reload if Frontend Context is updated after the initial render

## 19.16.2

### Patch Changes

- [`e1c44b542be`](https://bitbucket.org/atlassian/atlassian-frontend/commits/e1c44b542be) - Relax analytics-next dependency to ^8.0.0

## 19.16.1

### Patch Changes

- [`450a257831e`](https://bitbucket.org/atlassian/atlassian-frontend/commits/450a257831e) - Emit a viewed event for custom UI extensions

## 19.16.0

### Minor Changes

- [`9f3bc337a12`](https://bitbucket.org/atlassian/atlassian-frontend/commits/9f3bc337a12) - [ux] Re-enable Learn more about app security link in Forge external link modal

## 19.15.0

### Minor Changes

- [`919589f30fa`](https://bitbucket.org/atlassian/atlassian-frontend/commits/919589f30fa) - Invoke now throws on gql failure

## 19.14.1

### Patch Changes

- [`ac2fecc2bc1`](https://bitbucket.org/atlassian/atlassian-frontend/commits/ac2fecc2bc1) - BUGFIX: 3LO flow in custom UI doesn't retry all invoke requests in an app.

## 19.14.0

### Minor Changes

- [`3713493f022`](https://bitbucket.org/atlassian/atlassian-frontend/commits/3713493f022) - Add allow-downloads and allow-modals to the Forge iframe sandbox

## 19.13.7

### Patch Changes

- [`b1dbf6403d5`](https://bitbucket.org/atlassian/atlassian-frontend/commits/b1dbf6403d5) - Use upload id as resource version

## 19.13.6

### Patch Changes

- [`e060a44d4ba`](https://bitbucket.org/atlassian/atlassian-frontend/commits/e060a44d4ba) - Change wording to Learn _more_ about app security

## 19.13.5

### Patch Changes

- [`dbc54ce7590`](https://bitbucket.org/atlassian/atlassian-frontend/commits/dbc54ce7590) - Pass accountId to Iframe Coredata
- [`e59169dfcd7`](https://bitbucket.org/atlassian/atlassian-frontend/commits/e59169dfcd7) - Expose accountId and license properties as part of the frontend context

## 19.13.4

### Patch Changes

- [`3d5fda58009`](https://bitbucket.org/atlassian/atlassian-frontend/commits/3d5fda58009) - Bump @atlassian/bridge-core to allow hot reloading to work with custom UI tunnel

## 19.13.3

### Patch Changes

- [`6ea161e6358`](https://bitbucket.org/atlassian/atlassian-frontend/commits/6ea161e6358) - Measures duration of resolver invocations

## 19.13.2

### Patch Changes

- [`43865d7cdcf`](https://bitbucket.org/atlassian/atlassian-frontend/commits/43865d7cdcf) - Use correct task format for metrics

## 19.13.1

### Patch Changes

- [`e814faa5d71`](https://bitbucket.org/atlassian/atlassian-frontend/commits/e814faa5d71) - [ux] Temporarily remove the learn about app security link

## 19.13.0

### Minor Changes

- [`4ddba092dca`](https://bitbucket.org/atlassian/atlassian-frontend/commits/4ddba092dca) - Add CoreDataInner that contains moduleKey for context with custom ui

### Patch Changes

- Updated dependencies

## 19.12.3

### Patch Changes

- [`24333210bf0`](https://bitbucket.org/atlassian/atlassian-frontend/commits/24333210bf0) - Don't pass actionSubjectId for useNavigation
- Updated dependencies

## 19.12.2

### Patch Changes

- [`4bf5c56bcd1`](https://bitbucket.org/atlassian/atlassian-frontend/commits/4bf5c56bcd1) - [ux] Bold the app name, and break long URLs in the external link modal.

## 19.12.1

### Patch Changes

- [`6c9f5c5c8ce`](https://bitbucket.org/atlassian/atlassian-frontend/commits/6c9f5c5c8ce) - Use upload id as resource version

## 19.12.0

### Minor Changes

- [`96443ddf7fa`](https://bitbucket.org/atlassian/atlassian-frontend/commits/96443ddf7fa) - Add metrics using metal client for custom UI bridge SLI

## 19.11.1

### Patch Changes

- [`99998bc590b`](https://bitbucket.org/atlassian/atlassian-frontend/commits/99998bc590b) - Add SpacePicker to Storybook examples.

## 19.11.0

### Minor Changes

- [`64a277625f9`](https://bitbucket.org/atlassian/atlassian-frontend/commits/64a277625f9) - Re-export ProductEnvironment from the provider entrypoint

## 19.10.0

### Minor Changes

- [`b3fcad34a68`](https://bitbucket.org/atlassian/atlassian-frontend/commits/b3fcad34a68) - [ux] Add support for Forge app custom UI navigation. A modal will appear if the link is to a different site.

## 19.9.1

### Patch Changes

- Updated dependencies

## 19.9.0

### Minor Changes

- [`7e67a42e5d1`](https://bitbucket.org/atlassian/atlassian-frontend/commits/7e67a42e5d1) - New exports to support overriding of Form, ModalDialog and InlineDialog:

  - `AkForm`, `AkFormFooter`, `useForm`, `AkModalDialog`, `useModalDialog`, `useInlineDialog` and `ButtonSet`

  [ux] Refactors implementation of InlineDialog, ModalDialog and Form components to new component pattern

### Patch Changes

- Updated dependencies

## 19.8.0

### Minor Changes

- [`788871b5941`](https://bitbucket.org/atlassian/atlassian-frontend/commits/788871b5941) - Add getContext method through the bridge

## 19.7.0

### Minor Changes

- [`c857f55ff40`](https://bitbucket.org/atlassian/atlassian-frontend/commits/c857f55ff40) - [ux] Converts Forge button implementation component to composable pattern. Exports `AkButton` and `useButton` from `@atlassian/forge-ui`.

### Patch Changes

- [`6fcd1689ecf`](https://bitbucket.org/atlassian/atlassian-frontend/commits/6fcd1689ecf) - [ux] Updates button implementation in xen editor provider
- Updated dependencies

## 19.6.0

### Minor Changes

- [`dc429d7b033`](https://bitbucket.org/atlassian/atlassian-frontend/commits/dc429d7b033) - [ux] Allow Forge Custom UI apps to serve tunnel content

### Patch Changes

- Updated dependencies

## 19.5.0

### Minor Changes

- [`ba5ce247e3c`](https://bitbucket.org/atlassian/atlassian-frontend/commits/ba5ce247e3c) - Introduce configurable close bridge method for custom UI Iframe component

## 19.4.0

### Minor Changes

- [`70177e150bd`](https://bitbucket.org/atlassian/atlassian-frontend/commits/70177e150bd) - Add extensionData prop to ForgeUIExtension, to enable context migration, in @atlassian/xen-editor-provider only, which is the last known usage of this package (except those not used behind fully rolled out FFs)

### Patch Changes

- Updated dependencies

## 19.3.0

### Minor Changes

- [`9c9cb47726`](https://bitbucket.org/atlassian/atlassian-frontend/commits/9c9cb47726) - Expose getModalDimensions for Custom UI modals.

## 19.2.0

### Minor Changes

- [`2a1fa8ee34`](https://bitbucket.org/atlassian/atlassian-frontend/commits/2a1fa8ee34) - Add onLoad prop to Iframe component to be called when iframe is loaded

## 19.1.0

### Minor Changes

- [`3e02bbb242`](https://bitbucket.org/atlassian/atlassian-frontend/commits/3e02bbb242) - Add customLoading prop to Iframe component to override default loading

## 19.0.0

### Major Changes

- [`22a9f3c924`](https://bitbucket.org/atlassian/atlassian-frontend/commits/22a9f3c924) - Altered iframe component to pass extensionData to extension key instead of extensionContext.
  Also added temporaryContext prop, and made extensionData non-optional.

  When upgrading to this version, use temporaryContext for the old context shape and extensionData for the new context shape.
  If unsure, see https://hello.atlassian.net/wiki/spaces/ECO/pages/954464066

## 18.0.2

### Patch Changes

- [`38c43ef570`](https://bitbucket.org/atlassian/atlassian-frontend/commits/38c43ef570) - add size to parent div of iframe component

## 18.0.1

### Patch Changes

- [`d02b94a9f0`](https://bitbucket.org/atlassian/atlassian-frontend/commits/d02b94a9f0) - Update dependencies

## 18.0.0

### Major Changes

- [`6c718c8917`](https://bitbucket.org/atlassian/atlassian-frontend/commits/6c718c8917) - Remove context prop from Iframe component and add required coreData and optional extensionData props.

## 17.0.4

### Patch Changes

- [`d3265f19be`](https://bitbucket.org/atlassian/atlassian-frontend/commits/d3265f19be) - Transpile packages using babel rather than tsc

## 17.0.3

### Patch Changes

- [`fd9e0fafef`](https://bitbucket.org/atlassian/atlassian-frontend/commits/fd9e0fafef) - Add allow-forms to Forge iframe sandbox

## 17.0.2

### Patch Changes

- [`08e62663ca`](https://bitbucket.org/atlassian/atlassian-frontend/commits/08e62663ca) - Proper context to bridge for custom UI

## 17.0.1

### Patch Changes

- Updated dependencies

## 17.0.0

### Major Changes

- [`f394d9a149`](https://bitbucket.org/atlassian/atlassian-frontend/commits/f394d9a149) - [ux] Supports Custom UI apps calling authenticated resolver Forge functions. Requires apolloClient and contextIds as new props on the Iframe component.

### Patch Changes

- Updated dependencies

## 16.8.1

### Patch Changes

- [`29b9963ac8`](https://bitbucket.org/atlassian/atlassian-frontend/commits/29b9963ac8) - Update publishConfig registry URL

## 16.8.0

### Minor Changes

- [`c37795cfa3`](https://bitbucket.org/atlassian/atlassian-frontend/commits/c37795cfa3) - add height and width to iframe

## 16.7.3

### Patch Changes

- [`40dafa2a10`](https://bitbucket.org/atlassian/atlassian-frontend/commits/40dafa2a10) - Add a test-id to Iframe.

  Also change development forge iframe to point to staging cdn.

## 16.7.2

### Patch Changes

- [`e3435c147a`](https://bitbucket.org/atlassian/atlassian-frontend/commits/e3435c147a) - Add sandboxing to hosted resource iframe

## 16.7.1

### Patch Changes

- [`5f58283e1f`](https://bitbucket.org/atlassian/atlassian-frontend/commits/5f58283e1f) - Export types using Typescript's new "export type" syntax to satisfy Typescript's --isolatedModules compiler option.
  This requires version 3.8 of Typescript, read more about how we handle Typescript versions here: https://atlaskit.atlassian.com/get-started
  Also add `typescript` to `devDependencies` to denote version that the package was built with.

## 16.7.0

### Minor Changes

- [`72b4ba6233`](https://bitbucket.org/atlassian/atlassian-frontend/commits/72b4ba6233) - re-export EnvironmentContext Provider from core

## 16.6.0

### Minor Changes

- [`eb5c02ea4a`](https://bitbucket.org/atlassian/atlassian-frontend/commits/eb5c02ea4a) - Add temporary_QueryParams to pass query to hosted resource iframe

## 16.5.1

### Patch Changes

- [`4ca8902178`](https://bitbucket.org/atlassian/atlassian-frontend/commits/4ca8902178) - Minor build config change - no effect on consumers

## 16.5.0

### Minor Changes

- [`3adb50f645`](https://bitbucket.org/atlassian/atlassian-frontend/commits/3adb50f645) - Add environmentId to iframe src URL

### Patch Changes

- Updated dependencies

## 16.4.0

### Minor Changes

- [`e2f68c0e22`](https://bitbucket.org/atlassian/atlassian-frontend/commits/e2f68c0e22) - [ux] Render an unsupported browser warning (section message) in the Iframe component if the user agent does not support CSP.

## 16.3.2

### Patch Changes

- [`0017b82f6f`](https://bitbucket.org/atlassian/atlassian-frontend/commits/0017b82f6f) - Refactor iframe src building

## 16.3.1

### Patch Changes

- [`6c525a8229`](https://bitbucket.org/atlassian/atlassian-frontend/commits/6c525a8229) - Upgraded to TypeScript 3.9.6 and tslib to 2.0.0

  Since tslib is a dependency for all our packages we recommend that products also follow this tslib upgrade
  to prevent duplicates of tslib being bundled.

## 16.3.0

### Minor Changes

- [`7928924d2d`](https://bitbucket.org/atlassian/atlassian-frontend/commits/7928924d2d) - Add iframe entrypoint with v1 iframe

### Patch Changes

- Updated dependencies

## 16.2.2

### Patch Changes

- Updated dependencies

## 16.2.1

### Patch Changes

- [`f7a0e324e5`](https://bitbucket.org/atlassian/atlassian-frontend/commits/f7a0e324e5) - Added an additional suspense boundary in the ForgeUIExtension
- Updated dependencies

## 16.2.0

### Minor Changes

- [`929f94990e`](https://bitbucket.org/atlassian/atlassian-frontend/commits/929f94990e) - Export makeThreeLOPrompt

### Patch Changes

- Updated dependencies

## 16.1.0

### Minor Changes

- [`e40fce16da`](https://bitbucket.org/atlassian/atlassian-frontend/commits/e40fce16da) - Updated type to support config being declared in the manifest

### Patch Changes

- Updated dependencies

## 16.0.0

### Major Changes

- [`87f4720f27`](https://bitbucket.org/atlassian/atlassian-frontend/commits/87f4720f27) - Officially dropping IE11 support, from this version onwards there are no warranties of the package working in IE11.
  For more information see: https://community.developer.atlassian.com/t/atlaskit-to-drop-support-for-internet-explorer-11-from-1st-july-2020/39534

### Patch Changes

- Updated dependencies

## 15.1.0

### Minor Changes

- [`584c9ac77d`](https://bitbucket.org/atlassian/atlassian-frontend/commits/584c9ac77d) - Export modal versions of ErrorPanel and ThreeLOPrompt

### Patch Changes

- Updated dependencies

## 15.0.0

### Major Changes

- [`ce5bef6b34`](https://bitbucket.org/atlassian/atlassian-frontend/commits/ce5bef6b34) - Change API of getForgeUIExtensionsAsync to return an object, containing errors, as well as extensions.

### Patch Changes

- Updated dependencies

## 14.4.0

### Minor Changes

- [`cca6ee4fd6`](https://bitbucket.org/atlassian/atlassian-frontend/commits/cca6ee4fd6) - Add ForgeUIExtensionAnalyticsContext, ForgeUIExtensionPointProvider for use with the new web runtime

### Patch Changes

- Updated dependencies

## 14.3.1

### Patch Changes

- [`a1972dd757`](https://bitbucket.org/atlassian/atlassian-frontend/commits/a1972dd757) - Remove MetalClientProvider `id` prop

## 14.3.0

### Minor Changes

- [`5025e63245`](https://bitbucket.org/atlassian/atlassian-frontend/commits/5025e63245) - Adds useWebRuntime and RendererNext and related types. These two exports the intended replacements for the current way extension points are developed.

### Patch Changes

- Updated dependencies

## 14.2.2

### Patch Changes

- Updated dependencies

## 14.2.1

### Patch Changes

- [`8bc9d18a41`](https://bitbucket.org/atlassian/atlassian-frontend/commits/8bc9d18a41) - The current implementation/usage of ForgeUI Extension context resides in `forge-ui package`, which limits its usage inside other components.
  Re-allocating the package into the forge-ui-core would resolve this issue and assist implementing other components which require to consume ForgeUIExtension context for their implementaion.
- Updated dependencies

## 14.2.0

### Minor Changes

- [`faaaec4f46`](https://bitbucket.org/atlassian/atlassian-frontend/commits/faaaec4f46) - Add Range component to Forge UI

### Patch Changes

- Updated dependencies

## 14.1.5

### Patch Changes

- [`98fd19b1af`](https://bitbucket.org/atlassian/atlassian-frontend/commits/98fd19b1af) - Rename current effects/Job with Legacy and introduce new types (no behaviour change)
- Updated dependencies

## 14.1.4

### Patch Changes

- [`1fac72e04a`](https://bitbucket.org/atlassian/atlassian-frontend/commits/1fac72e04a) - Add error reporting and move ForgeUIExtensionType to @atlassian/forge-ui-types
- Updated dependencies

## 14.1.3

### Patch Changes

- Updated dependencies

## 14.1.2

### Patch Changes

- [`01ba51949e`](https://bitbucket.org/atlassian/atlassian-frontend/commits/01ba51949e) - Fixed typo in ContentByLineItem => ContentBylineItem
- Updated dependencies

## 14.1.1

### Patch Changes

- [`c0c6e6b57d`](https://bitbucket.org/atlassian/atlassian-frontend/commits/c0c6e6b57d) - Bumped new version of @forge/ui. Added examples for new top level components: HomepageFeed, SpaceSettings, ContentByLineItem
- Updated dependencies

## 14.1.0

### Minor Changes

- [`057b74eea2`](https://bitbucket.org/atlassian/atlassian-frontend/commits/057b74eea2) - Tag metrics with host product and export ProductEnvironment from @atlassian/forge-ui

### Patch Changes

- Updated dependencies

## 14.0.3

### Patch Changes

- [`a1de55bf57`](https://bitbucket.org/atlassian/atlassian-frontend/commits/a1de55bf57) - Added `loading` and `error` params for `render` function for `ForgeUIExtensions` component

## 14.0.2

### Patch Changes

- [`131cee6d7a`](https://bitbucket.org/atlassian/atlassian-frontend/commits/131cee6d7a) - Add missing tslib dependency

## 14.0.1

### Patch Changes

- Updated dependencies

## 14.0.0

### Major Changes

- [`abb5f14efd`](https://bitbucket.org/atlassian/atlassian-frontend/commits/abb5f14efd) - getForgeUIExtensionsAsync now accepts a single options argument.
  Moved EXTENSION_NAMESPACE constant in xen-editor-provider.

## 13.0.0

### Major Changes

- [`2a04e2d535`](https://bitbucket.org/atlassian/atlassian-frontend/commits/2a04e2d535) - Skip bad version 12 of this package

## 12.0.0

### Major Changes

- [`b425415e2f`](https://bitbucket.org/atlassian/atlassian-frontend/commits/b425415e2f) - Move metalClient creation to forge-ui-core and ProductEnvironmnet to forge-ui-types and change ForgeUIExtensionProivder's signature to include props needed for a MetalClientProvider

### Patch Changes

- Updated dependencies

## 11.11.6

### Patch Changes

- Updated dependencies

## 11.11.5

### Patch Changes

- [patch][f45c19a96e](https://bitbucket.org/atlassian/atlassian-frontend/commits/f45c19a96e):

  Remove unused dependencies- Updated dependencies [f45c19a96e](https://bitbucket.org/atlassian/atlassian-frontend/commits/f45c19a96e):

  - @atlassian/forge-ui-core@0.17.1

## 11.11.4

### Patch Changes

- Updated dependencies [c37e267c51](https://bitbucket.org/atlassian/atlassian-frontend/commits/c37e267c51):
  - @atlassian/forge-ui-core@0.17.0
  - @atlassian/forge-ui-types@16.6.0

## 11.11.3

### Patch Changes

- Updated dependencies [2ea16f1f58](https://bitbucket.org/atlassian/atlassian-frontend/commits/2ea16f1f58):
  - @atlassian/forge-ui-core@0.16.0
  - @atlassian/forge-ui-types@16.5.0

## 11.11.2

### Patch Changes

- Updated dependencies [ecb4d7ca7e](https://bitbucket.org/atlassian/atlassian-frontend/commits/ecb4d7ca7e):
  - @atlassian/forge-ui-core@0.15.0
  - @atlassian/forge-ui-types@16.4.0

## 11.11.1

### Patch Changes

- Updated dependencies [7d8049d99f](https://bitbucket.org/atlassian/atlassian-frontend/commits/7d8049d99f):
  - @atlassian/forge-ui-core@0.14.0

## 11.11.0

### Minor Changes

- [minor][d2cc495ff4](https://bitbucket.org/atlassian/atlassian-frontend/commits/d2cc495ff4):

  PAPA-82 Add entry points for ui and provider

## 11.10.2

### Patch Changes

- [patch][6c49c4e728](https://bitbucket.org/atlassian/atlassian-frontend/commits/6c49c4e728):

  Remove ReadonlyArray in some places- Updated dependencies [6c49c4e728](https://bitbucket.org/atlassian/atlassian-frontend/commits/6c49c4e728):

  - @atlassian/forge-ui-core@0.13.2

## 11.10.1

### Patch Changes

- [patch][ad57fdce37](https://bitbucket.org/atlassian/atlassian-frontend/commits/ad57fdce37):

  Replace readonly X[] with ReadonlyArray<X> for TypeScript < 3.4 compatibility

## 11.10.0

### Minor Changes

- [minor][47d3f58b83](https://bitbucket.org/atlassian/atlassian-frontend/commits/47d3f58b83):

  Adds a promise-based way to list extensions in the generic extension point package. Refactored existing extension listing to enable code reuse.

### Patch Changes

- Updated dependencies [47d3f58b83](https://bitbucket.org/atlassian/atlassian-frontend/commits/47d3f58b83):
  - @atlassian/forge-ui-core@0.13.1

## 11.9.0

### Minor Changes

- [minor][1128bc128c](https://bitbucket.org/atlassian/atlassian-frontend/commits/1128bc128c):

  Introduces async versions of the generic extension point components.

## 11.8.3

### Patch Changes

- [patch][2093560ccc](https://bitbucket.org/atlassian/atlassian-frontend/commits/2093560ccc):

  Sorts extensions in alphabetical order in UI when using generic extension point components.

## 11.8.2

### Patch Changes

- [patch][b26a8c7f3a](https://bitbucket.org/atlassian/atlassian-frontend/commits/b26a8c7f3a):

  Sanitize extensionId so it can be used in a Confluence content property

## 11.8.1

### Patch Changes

- [patch][54c180923c](https://bitbucket.org/atlassian/atlassian-frontend/commits/54c180923c):

  Composes generic extension point components together for better code reuse. No external impact, has the same behaviour.

## 11.8.0

### Minor Changes

- [minor][bd8ba049e8](https://bitbucket.org/atlassian/atlassian-frontend/commits/bd8ba049e8):

  Show error panels in a modal dialog for confluence:contentAction and confluence:contextMenu

### Patch Changes

- Updated dependencies [bd8ba049e8](https://bitbucket.org/atlassian/atlassian-frontend/commits/bd8ba049e8):
  - @atlassian/forge-ui-core@0.13.0

## 11.7.1

### Patch Changes

- Updated dependencies [4d723c4881](https://bitbucket.org/atlassian/atlassian-frontend/commits/4d723c4881):
  - @atlassian/forge-ui-core@0.12.0

## 11.7.0

### Minor Changes

- [minor][595c66703f](https://bitbucket.org/atlassian/atlassian-frontend/commits/595c66703f):

  Adds environment type support to generic extension point.

## 11.6.0

### Minor Changes

- [minor][767dcb836e](https://bitbucket.org/atlassian/atlassian-frontend/commits/767dcb836e):

  Added optional on mount callback to ForgeUIExtension

## 11.5.1

### Patch Changes

- Updated dependencies [9809d6e322](https://bitbucket.org/atlassian/atlassian-frontend/commits/9809d6e322):
  - @atlassian/forge-ui-types@16.0.0
  - @atlassian/forge-ui-core@0.11.5
  - @atlassian/aux-test-utils@3.1.3

## 11.5.0

### Minor Changes

- [minor][ed837b6c14](https://bitbucket.org/atlassian/atlassian-frontend/commits/ed837b6c14):

  Add tearDown to ForgeUIExtension

## 11.4.4

### Patch Changes

- [patch][90aa05226f](https://bitbucket.org/atlassian/atlassian-frontend/commits/90aa05226f):

  Move packages to atlassian-frontend monorepo.

## 11.4.3

### Patch Changes

- [patch][83e7f1d3](https://bitbucket.org/atlassian/aux/commits/83e7f1d3):

  Bump forge-ui-core dependency

## 11.4.2

### Patch Changes

- [patch][f24ed4cc](https://bitbucket.org/atlassian/aux/commits/f24ed4cc):

  Bump @atlassian/forge-ui-types to ^15.6.0- Updated dependencies [d61e7eaa](https://bitbucket.org/atlassian/aux/commits/d61e7eaa):

- Updated dependencies [f24ed4cc](https://bitbucket.org/atlassian/aux/commits/f24ed4cc):
  - @atlassian/forge-ui-core@0.10.0

## 11.4.1

### Patch Changes

- Updated dependencies [a146087c](https://bitbucket.org/atlassian/aux/commits/a146087c):
  - @forge/ui@0.2.0

## 11.4.0

### Minor Changes

- [minor][932fa2de](https://bitbucket.org/atlassian/aux/commits/932fa2de):

  Add extensionContext support

### Patch Changes

- Updated dependencies [932fa2de](https://bitbucket.org/atlassian/aux/commits/932fa2de):
  - @forge/ui@0.2.0
  - @atlassian/forge-ui-core@0.9.1

## 11.3.0

### Minor Changes

- [minor][b249b816](https://bitbucket.org/atlassian/aux/commits/b249b816):

  pass optional productData through generic extension components

### Patch Changes

- Updated dependencies [b249b816](https://bitbucket.org/atlassian/aux/commits/b249b816):
  - @atlassian/forge-ui-core@0.9.0

## 11.2.13

### Patch Changes

- Updated dependencies [fb60d51a](https://bitbucket.org/atlassian/aux/commits/fb60d51a):
  - @forge/ui@0.2.0

## 11.2.12

### Patch Changes

- Updated dependencies [c76398f1](https://bitbucket.org/atlassian/aux/commits/c76398f1):
  - @forge/ui@0.2.0

## 11.2.11

### Patch Changes

- [patch][6485451b](https://bitbucket.org/atlassian/aux/commits/6485451b):

  Export ForgeUIExtensionType

## 11.2.10

### Patch Changes

- [patch][41dec6e9](https://bitbucket.org/atlassian/aux/commits/41dec6e9):

  Update forge-ui-types to ^15.2.0- Updated dependencies [15413b26](https://bitbucket.org/atlassian/aux/commits/15413b26):

  - @atlassian/forge-ui-core@0.8.0

## 11.2.9

### Patch Changes

- Updated dependencies [b4b10827](https://bitbucket.org/atlassian/aux/commits/b4b10827):
  - @atlassian/forge-ui-core@0.7.0

## 11.2.8

### Patch Changes

- [patch][05e21868](https://bitbucket.org/atlassian/aux/commits/05e21868):

  Bump @atlassian/forge-ui-types to 15.1.3- Updated dependencies [05e21868](https://bitbucket.org/atlassian/aux/commits/05e21868):

  - @atlassian/forge-ui-core@0.6.2

## 11.2.7

### Patch Changes

- Updated dependencies [aa2da594](https://bitbucket.org/atlassian/aux/commits/aa2da594):
- Updated dependencies [df1e489a](https://bitbucket.org/atlassian/aux/commits/df1e489a):
  - @forge/ui@0.2.0
  - @atlassian/forge-ui-core@0.6.0

## 11.2.6

### Patch Changes

- [patch][e7b35610](https://bitbucket.org/atlassian/aux/commits/e7b35610):

  Bump Atlaskit dependencies to match atlassian-frontend versions- Updated dependencies [e7b35610](https://bitbucket.org/atlassian/aux/commits/e7b35610):

  - @atlassian/forge-ui-core@0.5.1

## 11.2.5

### Patch Changes

- Updated dependencies [49e93901](https://bitbucket.org/atlassian/aux/commits/49e93901):
  - @atlassian/forge-ui-core@0.5.0

## 11.2.4

### Patch Changes

- [patch][0a4139be](https://bitbucket.org/atlassian/aux/commits/0a4139be):

  PAPA-95 - Fix queryOptions not working for ForgeUIExtensionPoint

## 11.2.3

### Patch Changes

- Updated dependencies [e8368816](https://bitbucket.org/atlassian/aux/commits/e8368816):
  - @forge/ui@0.2.0

## 11.2.2

### Patch Changes

- [patch][91c0b9b8](https://bitbucket.org/atlassian/aux/commits/91c0b9b8):

  Replace readonly X[]`with`ReadonlyArray<X> for Typescript < 3.4 compatibility

## 11.2.1

### Patch Changes

- Updated dependencies [389da2b6](https://bitbucket.org/atlassian/aux/commits/389da2b6):
  - @atlassian/forge-ui-core@0.4.0
  - @atlassian/forge-ui-types@15.1.0
  - @forge/ui@0.1.0

## 11.2.0

### Minor Changes

- [minor][0aaa68d5](https://bitbucket.org/atlassian/aux/commits/0aaa68d5):

  Use PerformanceMarkPlugin in metal client and add localId to app info

### Patch Changes

- Updated dependencies [577453ed](https://bitbucket.org/atlassian/aux/commits/577453ed):
- Updated dependencies [3bf66617](https://bitbucket.org/atlassian/aux/commits/3bf66617):
- Updated dependencies [c503140f](https://bitbucket.org/atlassian/aux/commits/c503140f):
  - @atlassian/forge-ui-types@15.0.0
  - @atlassian/aux-test-utils@3.1.0
  - @atlassian/forge-ui-core@0.3.1

## 11.1.2

### Patch Changes

- [patch][5aab3aa3](https://bitbucket.org/atlassian/aux/commits/5aab3aa3):

  Map over children and apply default config values within the ConfigForm component

## 11.1.1

### Patch Changes

- [patch][5a372bb9](https://bitbucket.org/atlassian/aux/commits/5a372bb9):

  Add type annotation to createMetalClient.

## 11.1.0

### Minor Changes

- [minor][6d18cc5a](https://bitbucket.org/atlassian/aux/commits/6d18cc5a):

  PAPA-95 Allow query options to be defined in Forge extension point context

### Patch Changes

- Updated dependencies [6d18cc5a](https://bitbucket.org/atlassian/aux/commits/6d18cc5a):
  - @atlassian/forge-ui-core@0.3.0

## 11.0.0

### Major Changes

- [major][948a66d0](https://bitbucket.org/atlassian/aux/commits/948a66d0):

  Change return type of RenderForgeExtensions to ReactElement (instead of ReactNode)

## 10.1.0

### Minor Changes

- [minor][fa812d9f](https://bitbucket.org/atlassian/aux/commits/fa812d9f):

  The xen-editor-provider now makes use of the generic extension point components from @atlassian/forge-ui. To do this, addtional components are exported from @atlassian/forge-ui and it was touched up to be more flexible with the inputs it receives to match the xen-editor-provider.

## 10.0.14

### Patch Changes

- Updated dependencies [eca6b60e](https://bitbucket.org/atlassian/aux/commits/eca6b60e):
  - @atlassian/forge-ui-core@0.2.0

## 10.0.13

### Patch Changes

- [patch][0855b6f5](https://bitbucket.org/atlassian/aux/commits/0855b6f5):

  Change @atlassian/forge-ui-core dependency to caret range.

## 10.0.12

### Patch Changes

- [patch][9487b3fb](https://bitbucket.org/atlassian/aux/commits/9487b3fb):

  PAPA-91 - Bug fix to ensure apollo context is defined at the right point

## 10.0.11

### Patch Changes

- Updated dependencies [0b5e8bc6](https://bitbucket.org/atlassian/aux/commits/0b5e8bc6):
  - @forge/ui@0.1.0

## 10.0.10

### Patch Changes

- Updated dependencies [da876c8c](https://bitbucket.org/atlassian/aux/commits/da876c8c):
  - @atlassian/forge-ui-core@0.1.0

## 10.0.9

### Patch Changes

- Updated dependencies [c82fe7a1](https://bitbucket.org/atlassian/aux/commits/c82fe7a1):
  - @atlassian/forge-ui-core@0.0.11

## 10.0.8

### Patch Changes

- Updated dependencies [c4c630e2](https://bitbucket.org/atlassian/aux/commits/c4c630e2):
  - @atlassian/forge-ui-core@0.0.10

## 10.0.7

### Patch Changes

- Updated dependencies [3eb262e6](https://bitbucket.org/atlassian/aux/commits/3eb262e6):
  - @atlassian/forge-ui-core@0.0.9

## 10.0.6

### Patch Changes

- Updated dependencies [7ea77aaf](https://bitbucket.org/atlassian/aux/commits/7ea77aaf):
  - @atlassian/forge-ui-core@0.0.8

## 10.0.5

### Patch Changes

- Updated dependencies [8bdab8f1](https://bitbucket.org/atlassian/aux/commits/8bdab8f1):
  - @atlassian/forge-ui-core@0.0.7

## 10.0.4

### Patch Changes

- [patch][667f3c03](https://bitbucket.org/atlassian/aux/commits/667f3c03):

  Delete AuxWebClient component and inject invokeAuxEffects directly into WebRuntime.- Updated dependencies [667f3c03](https://bitbucket.org/atlassian/aux/commits/667f3c03):

  - @atlassian/forge-ui-core@0.0.6

## 10.0.3

### Patch Changes

- Updated dependencies [a4d7589f](https://bitbucket.org/atlassian/aux/commits/a4d7589f):
  - @atlassian/forge-ui-core@0.0.5

## 10.0.2

### Patch Changes

- Updated dependencies [1103d768](https://bitbucket.org/atlassian/aux/commits/1103d768):
- Updated dependencies [9dfdeca5](https://bitbucket.org/atlassian/aux/commits/9dfdeca5):
- Updated dependencies [00303db7](https://bitbucket.org/atlassian/aux/commits/00303db7):
  - @forge/ui@0.1.0
  - @atlassian/forge-ui-core@0.0.4
  - @atlassian/aux-test-utils@3.0.5
  - @atlassian/forge-ui-types@14.4.2

## 10.0.1

### Patch Changes

- Updated dependencies [6281a292](https://bitbucket.org/atlassian/aux/commits/6281a292):
  - @atlassian/forge-ui-core@0.0.3

## 10.0.0

### Major Changes

- [major][375a9046](https://bitbucket.org/atlassian/aux/commits/375a9046):

  Initial version of forge-ui product integration package. Removed experimental components from xen-editor-provider.
