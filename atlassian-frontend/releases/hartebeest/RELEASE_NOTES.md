# Hartebeest Release

## Summary

| Package                                 | Type  | Change             | Number of changes |
| --------------------------------------- | ----- | ------------------ | ----------------: |
| @atlaskit/comment                       | none  | 10.0.6 -> 10.0.6   |                 0 |
| @atlaskit/editor-bitbucket-transformer  | none  | 7.1.6 -> 7.1.6     |                 0 |
| @atlaskit/editor-confluence-transformer | none  | 8.1.6 -> 8.1.6     |                 0 |
| @atlaskit/editor-jira-transformer       | none  | 8.1.6 -> 8.1.6     |                 0 |
| @atlaskit/editor-json-transformer       | none  | 8.4.4 -> 8.4.4     |                 0 |
| @atlaskit/editor-markdown-transformer   | none  | 4.1.6 -> 4.1.6     |                 0 |
| @atlaskit/editor-wikimarkup-transformer | none  | 9.0.0 -> 9.0.0     |                 0 |
| @atlaskit/page-header                   | none  | 10.0.7 -> 10.0.7   |                 0 |
| @atlassian/xen-editor-provider          | none  | 10.5.13 -> 10.5.13 |                 0 |
| @atlaskit/breadcrumbs                   | major | 10.1.0 -> 11.0.0   |                 1 |
| @atlaskit/editor-core                   | major | 136.2.0 -> 137.0.0 |                35 |
| @atlaskit/editor-mobile-bridge          | major | 23.0.0 -> 24.0.0   |                10 |
| @atlaskit/adf-utils                     | minor | 11.7.0 -> 11.8.0   |                 1 |
| @atlaskit/calendar                      | minor | 10.0.10 -> 10.1.0  |                 1 |
| @atlaskit/code                          | minor | 13.1.1 -> 13.2.0   |                 6 |
| @atlaskit/dynamic-table                 | minor | 14.1.5 -> 14.2.0   |                 2 |
| @atlaskit/editor-common                 | minor | 55.1.2 -> 55.2.0   |                 7 |
| @atlaskit/emoji                         | minor | 63.0.13 -> 63.1.0  |                 1 |
| @atlaskit/focused-task-close-account    | minor | 0.13.7 -> 0.14.0   |                 1 |
| @atlaskit/media-picker                  | minor | 57.1.3 -> 57.2.0   |                 1 |
| @atlaskit/media-ui                      | minor | 15.1.0 -> 15.2.0   |                 1 |
| @atlaskit/mention                       | minor | 19.1.2 -> 19.2.0   |                 1 |
| @atlaskit/profilecard                   | minor | 14.1.0 -> 14.2.0   |                 1 |
| @atlaskit/reactions                     | minor | 18.1.9 -> 18.2.0   |                 1 |
| @atlaskit/renderer                      | minor | 73.1.0 -> 73.2.0   |                 4 |
| @atlaskit/status                        | minor | 0.10.7 -> 0.11.0   |                 1 |
| @atlassian/calendar                     | minor | 0.7.0 -> 0.8.0     |                 1 |
| @atlaskit/adf-schema                    | patch | 13.7.0 -> 13.7.1   |                 2 |
| @atlaskit/avatar                        | patch | 20.1.0 -> 20.1.1   |                 1 |
| @atlaskit/avatar-group                  | patch | 8.0.13 -> 8.0.14   |                 1 |
| @atlaskit/conversation                  | patch | 16.0.16 -> 16.0.17 |                 0 |
| @atlaskit/datetime-picker               | patch | 10.0.7 -> 10.0.8   |                 1 |
| @atlaskit/embedded-document             | patch | 0.7.14 -> 0.7.15   |                 0 |
| @atlaskit/field-range                   | patch | 9.0.4 -> 9.0.5     |                 1 |
| @atlaskit/flag                          | patch | 14.1.0 -> 14.1.1   |                 1 |
| @atlaskit/icon                          | patch | 21.2.3 -> 21.2.4   |                 1 |
| @atlaskit/legacy-mobile-macros          | patch | 0.1.3 -> 0.1.4     |                 0 |
| @atlaskit/logo                          | patch | 13.0.7 -> 13.0.8   |                 2 |
| @atlaskit/page                          | patch | 12.0.4 -> 12.0.5   |                 1 |
| @atlaskit/page-layout                   | patch | 0.10.11 -> 0.10.12 |                 1 |
| @atlaskit/range                         | patch | 5.0.6 -> 5.0.7     |                 1 |
| @atlaskit/reduced-ui-pack               | patch | 13.0.7 -> 13.0.8   |                 1 |
| @atlaskit/tag                           | patch | 11.0.5 -> 11.0.6   |                 1 |
| @atlassian/mpt-plan-configuration       | patch | 1.1.1 -> 1.1.2     |                 0 |
| @atlassian/pipelines-editor             | patch | 0.10.16 -> 0.10.17 |                 0 |
| @atlassian/pipelines-runners-management | patch | 0.2.1 -> 0.2.2     |                 0 |
| @atlassian/pipelines-runners-wizard     | patch | 3.6.1 -> 3.6.2     |                 0 |

## Details

---

---

---

---

---

---

---

---

---

---

### @atlaskit/breadcrumbs@11.0.0

#### Major Changes

- [`3f80f8a2e4b`](https://bitbucket.org/atlassian/atlassian-frontend/commits/3f80f8a2e4b) - In this version we made breadcrumbs dramatically faster, lighter and easier to use 🤩

  - BreadcrumbsStateless has been merged into the default export
  - Performance improvements
  - Faster internal analytics

  **Migrating from BreadcrumbsStateless**

  When needing to control breadcrumbs you can 1:1 replace the component with the default export from breadcrumbs.

  ```diff
  -import { BreadcrumbsStateless } from '@atlaskit/breadcrumbs';
  +import Breadcrumbs from '@atlaskit/breadcrumbs';

  -<BreadcrumbsStateless isExpanded />
  +<Breadcrumbs isExpanded />
  ```

  When `isExpanded` is provided, the component will act controlled, otherwise uncontrolled.

  **Upgrading with the codemod**

  There exists a codemod to help you upgrade. Make sure to be on the latest version of breadcrumbs before running.

  ```
  yarn upgrade @atlaskit/breadcrumbs@latest
  ```

  Then you can use our cli tool to run the codemod:

  ```
  npx @atlaskit/codemod-cli /path/to/target/directory --parser [tsx | flow | babel]
  ```

  And then follow the prompts to select the breadcrumbs codemod.

---

### @atlaskit/editor-core@137.0.0

#### Major Changes

- [`4d65f8a67f4`](https://bitbucket.org/atlassian/atlassian-frontend/commits/4d65f8a67f4) - [ED-11699] Persist scroll gutter for mobile COMPACT appearance and change mobile scroll gutter to 50px

#### Minor Changes

- [`36480f3c6ee`](https://bitbucket.org/atlassian/atlassian-frontend/commits/36480f3c6ee) - ED-10297 guard catch-all performance tracking with feature flag
- [`8c90794239c`](https://bitbucket.org/atlassian/atlassian-frontend/commits/8c90794239c) - ED-11587: quickInsert for placeholder-text plugin
- [`16dd9a6e934`](https://bitbucket.org/atlassian/atlassian-frontend/commits/16dd9a6e934) - NO-ISSUE clean up with optional chaining
- [`4e4f23da2ee`](https://bitbucket.org/atlassian/atlassian-frontend/commits/4e4f23da2ee) - ED-10585 close feature flag infrastructure gaps
- [`f48db072de7`](https://bitbucket.org/atlassian/atlassian-frontend/commits/f48db072de7) - ED-10585 optimize emoji nodeview
- [`6e854802c33`](https://bitbucket.org/atlassian/atlassian-frontend/commits/6e854802c33) - [ux] ED-11215 Add help icon to new element browser
  Introduce new 'helpUrl' prop to elementBrowser which allow a help url to be passed to element browser component.
  E.g. elementBrowser={{ showModal: true, replaceMenu: true, helpUrl: 'https://examplehelpurl.com'  }}
- [`c330863ef3f`](https://bitbucket.org/atlassian/atlassian-frontend/commits/c330863ef3f) - Update margin and padding for element browser insert menu item
- [`cca3569e236`](https://bitbucket.org/atlassian/atlassian-frontend/commits/cca3569e236) - ED-11647 Remove unnecessary rerender of table component for initial load. This is behind a feature flag `initialRenderOptimization`.
- [`b552334459c`](https://bitbucket.org/atlassian/atlassian-frontend/commits/b552334459c) - [ME-302](https://product-fabric.atlassian.net/browse/ME-302) Introduce table cell options in the floating toolbar for mobile.

  By default table cell options are disabled and hidden for the web.

- [`7ddbf962bd9`](https://bitbucket.org/atlassian/atlassian-frontend/commits/7ddbf962bd9) - [ux] Updated and added new translations
- [`867b61b2698`](https://bitbucket.org/atlassian/atlassian-frontend/commits/867b61b2698) - ED-11692 add defaultOptions to CustomSelect to prevent calling resolver twice on mount.
  Resolve default options array on mount and pass array to AsyncCreatableSelect 'defaultOptions' prop. This prevents defaultOptions from calling the loadOptions / resolver again on mount.
- [`5c075025c14`](https://bitbucket.org/atlassian/atlassian-frontend/commits/5c075025c14) - ED-11640 table performance optimization for table component rendering - avoid extra re-renders on each transaction e.g. when typing
- [`67fd55dd3f1`](https://bitbucket.org/atlassian/atlassian-frontend/commits/67fd55dd3f1) - ME-893 Added a new mobile editor configuration for placeholder text
- [`f48c16eb21d`](https://bitbucket.org/atlassian/atlassian-frontend/commits/f48c16eb21d) - ED-11383 Update extensions sidebar select-item icon vertical alignment
- [`bf8e85f044d`](https://bitbucket.org/atlassian/atlassian-frontend/commits/bf8e85f044d) - Add remove button to inline links

#### Patch Changes

- [`edfb17aaa70`](https://bitbucket.org/atlassian/atlassian-frontend/commits/edfb17aaa70) - [ED-11368] Add feature flag for adding undo/redo buttons in the editor. We will be encapsulating all dev work under this flag. The name of the feature flag type is `undoRedoButtons` and the editor prop is `UNSAFE_allowUndoRedoButtons`. This prop is for development purposes only, please don't turn this on. Only feature leads, can turn this on.
- [`c1633237d16`](https://bitbucket.org/atlassian/atlassian-frontend/commits/c1633237d16) - ED-11639 performance improvement, refactored TableComponent to remove redundant props
- [`5857b17788b`](https://bitbucket.org/atlassian/atlassian-frontend/commits/5857b17788b) - Change the way kitchen sink shows ADF errors
- [`b2d2417de34`](https://bitbucket.org/atlassian/atlassian-frontend/commits/b2d2417de34) - EDM-1590: fix embed & card danger styles
- [`babad0a5038`](https://bitbucket.org/atlassian/atlassian-frontend/commits/babad0a5038) - ED-11145: Add additional attributes to document inserted and text formatted analytic event payloads
- [`359ff24a999`](https://bitbucket.org/atlassian/atlassian-frontend/commits/359ff24a999) - Optimize table mousemove handler by using resizeObserver
- [`9d1bc4dde94`](https://bitbucket.org/atlassian/atlassian-frontend/commits/9d1bc4dde94) - [ux] As part of the bump to @atlaskit/code, the codeBlock element's visual appearance has been modified in renderer and editor-core. Specifically the fontSize and lineHeight have been made more consistent with the DS parent package.
- [`345f2af7da7`](https://bitbucket.org/atlassian/atlassian-frontend/commits/345f2af7da7) - ED-11127 inject defaultValues in deserialize, fixes parameter dependency tests
  ED-11291 fix parameter passing regression, add regression tests
  ED-11127 fix singular CustomSelect serializing [] if defaultValue is omitted
- [`97384a3224c`](https://bitbucket.org/atlassian/atlassian-frontend/commits/97384a3224c) - [ux] Initialise undo redo plugin, add undo button to ui (behind feature flag)
- [`44efa5f3f0f`](https://bitbucket.org/atlassian/atlassian-frontend/commits/44efa5f3f0f) - [ux] Add undo functionality to Undo button
- [`d2bdd96ed83`](https://bitbucket.org/atlassian/atlassian-frontend/commits/d2bdd96ed83) - Fix for backspace deleting entire nodeview
- [`faf98b96883`](https://bitbucket.org/atlassian/atlassian-frontend/commits/faf98b96883) - Removed unused comments in src from package
- [`b11735fd5f1`](https://bitbucket.org/atlassian/atlassian-frontend/commits/b11735fd5f1) - ED-11689: implement 'typeAhead rendered' and 'typeAheadItem viewed'
- [`aba85163bc2`](https://bitbucket.org/atlassian/atlassian-frontend/commits/aba85163bc2) - [ux] Dark mode line text color changed to make it easier to read
- [`a4bcf21a972`](https://bitbucket.org/atlassian/atlassian-frontend/commits/a4bcf21a972) - [ux] Syntax highlighting now uses accessibile colors that meet WCAG 2.0 Level AA guidelines for color contrast
- [`62b30905271`](https://bitbucket.org/atlassian/atlassian-frontend/commits/62b30905271) - Update keymaps on captions to follow design spec
- [`501ca8b3083`](https://bitbucket.org/atlassian/atlassian-frontend/commits/501ca8b3083) - table plugin was ignoring the plugin states requested via WithPluginState
- [`a6c1b0bc5cd`](https://bitbucket.org/atlassian/atlassian-frontend/commits/a6c1b0bc5cd) - ED-11148: Allow valid transactions to be sampled and tracked in analytics
- [`19fa405c2ec`](https://bitbucket.org/atlassian/atlassian-frontend/commits/19fa405c2ec) - [ux] ED-11724 update isEmptyNode to work with non default attrs
- Updated dependencies

---

### @atlaskit/editor-mobile-bridge@24.0.0

#### Major Changes

- [`43f44a3fb3e`](https://bitbucket.org/atlassian/atlassian-frontend/commits/43f44a3fb3e) - [ED-11244] Change Bridge API - configureEditor to configure

#### Minor Changes

- [`b4acdadd949`](https://bitbucket.org/atlassian/atlassian-frontend/commits/b4acdadd949) - [ED-11244] Use locale from renderer bridge configuration
- [`3f428e4b778`](https://bitbucket.org/atlassian/atlassian-frontend/commits/3f428e4b778) - [ME-769] Fix codeblock language change for mobile when used in adaptive toolbar
- [`a3cf6026e33`](https://bitbucket.org/atlassian/atlassian-frontend/commits/a3cf6026e33) - [ME-303](https://product-fabric.atlassian.net/browse/ME-303) Enable expand to be inserted in mobile
- [`b552334459c`](https://bitbucket.org/atlassian/atlassian-frontend/commits/b552334459c) - [ME-302](https://product-fabric.atlassian.net/browse/ME-302) Introduce table cell options in the floating toolbar for mobile.

  By default table cell options are disabled and hidden for the web.

- [`e06b893e288`](https://bitbucket.org/atlassian/atlassian-frontend/commits/e06b893e288) - [ED-11470] - Adding automation tests to validate Block and inline node lozenges and tooltips
- [`67fd55dd3f1`](https://bitbucket.org/atlassian/atlassian-frontend/commits/67fd55dd3f1) - ME-893 Added a new mobile editor configuration for placeholder text
- [`4d65f8a67f4`](https://bitbucket.org/atlassian/atlassian-frontend/commits/4d65f8a67f4) - [ED-11699] Persist scroll gutter for mobile COMPACT appearance and change mobile scroll gutter to 50px
- [`84e096e6ac9`](https://bitbucket.org/atlassian/atlassian-frontend/commits/84e096e6ac9) - ME-304 Enabled some editing capabilities for adaptive toolbar in mobile

#### Patch Changes

- [`32613148067`](https://bitbucket.org/atlassian/atlassian-frontend/commits/32613148067) - Move DisableActions, DisableMediaLinking, allowAnnotaions, allowHeadingAnchorLinks feature flags from query param to rendererConfiguration
- Updated dependencies

---

### @atlaskit/adf-utils@11.8.0

#### Minor Changes

- [`586040bf70b`](https://bitbucket.org/atlassian/atlassian-frontend/commits/586040bf70b) - Ensure that all children are validated in new error path

---

### @atlaskit/calendar@10.1.0

#### Minor Changes

- [`985961ce983`](https://bitbucket.org/atlassian/atlassian-frontend/commits/985961ce983) - Internal change from class to function components

  - We have converted all the components from class to functional. This improved performance quite a bit. Initial rendering, hydration, interaction, bundlesize and re-rendering; all have been improved.
  - We have made all the prop typings optional now. Earlier they were not aligned with the prop values (which were all optional earlier).
  - We have stopped exporting internal `CalendarClassType` and `ArrowKeys` types which were not compatible with functional components. Instead we have exported `CalendarInternalRef` type temporarily for backward compatibility and a new optional prop `internalRef` which consumers can use to access internal api's. Right now only `@atlaskit/datetime-picker` uses `navigate()` api for navigation which will be removed soon. This new type and prop are not recommended. So please don't use them.
  - We have also exported a new type `SelectEvent` along with already exported `ChangeEvent`, which consumers can use with `onSelect` and `onChange` prop.
  - We have also added `ref` support which points to the top level element. Earlier it was not officially supported.
  - Dev changes includes: folder restructuring and cleanup, lodash removal, memoizing components etc.

---

### @atlaskit/code@13.2.0

#### Minor Changes

- [`3c7be954dbd`](https://bitbucket.org/atlassian/atlassian-frontend/commits/3c7be954dbd) - [ux] Line highlighting now meets WCAG 2.1 guidelines. Colors that were failing contrast have been updated and there is now a new visual cue consisting of a left border to the highlighted lines.
- [`23ef692842a`](https://bitbucket.org/atlassian/atlassian-frontend/commits/23ef692842a) - [ux] `Code` and `CodeBlock` now use react-syntax-highlighter@^15 to highlight code. As part of this change
  the fontSize for the line numbers and the code body have been normalised. This will be a breaking visual change for all consumers.
  No action is required other than a callout that this will affect any existing visual regression tests.

  Users can now use the `themeOverride` prop to customise the application of the default theme. This is an escape hatch
  which will likley be removed in a future major version.

  This change also includes:

  - A bugfix for lineHeight that meant linenumbers and code body were not vertically aligned correctly.
  - A bugfix for the SSR'd components not rendering consistently before hydration
  - Improved semantic lines, which can now be properly consumed by screen readers.
  - The `Code` and `CodeBlock` now expose additional options in their `theme` prop. These are `codeFontSize` and `codeLineHeight`
    which allow customisation of the component's rendered font size.

- [`7c2f2056ef7`](https://bitbucket.org/atlassian/atlassian-frontend/commits/7c2f2056ef7) - [ux] Added code syntax highlighting for the following languages: AppleScript, Clojure, Delphi, Diff, FoxPro, Object Pascal, QML, Standard ML, Visual Basic, JSX and TSX

#### Patch Changes

- [`72d19d3f308`](https://bitbucket.org/atlassian/atlassian-frontend/commits/72d19d3f308) - Internal changes relating to types, and tests. Includes a small bugfix to the way Code component had styles applied and adds testId as a prop to both Code and CodeBlock.
- [`a4bcf21a972`](https://bitbucket.org/atlassian/atlassian-frontend/commits/a4bcf21a972) - [ux] Syntax highlighting now uses accessibile colors that meet WCAG 2.0 Level AA guidelines for color contrast
- [`b5873e7bf01`](https://bitbucket.org/atlassian/atlassian-frontend/commits/b5873e7bf01) - [ux] Fixed highlighted line left border alignment.

---

### @atlaskit/dynamic-table@14.2.0

#### Minor Changes

- [`cd41357bdb0`](https://bitbucket.org/atlassian/atlassian-frontend/commits/cd41357bdb0) - Added total number of records for paginated data set to be passed as an optional prop

#### Patch Changes

- [`952019cfd39`](https://bitbucket.org/atlassian/atlassian-frontend/commits/952019cfd39) - Removed extraneous/unnecessary dependencies for design system components.

---

### @atlaskit/editor-common@55.2.0

#### Minor Changes

- [`8c90794239c`](https://bitbucket.org/atlassian/atlassian-frontend/commits/8c90794239c) - ED-11587: quickInsert for placeholder-text plugin
- [`7ddbf962bd9`](https://bitbucket.org/atlassian/atlassian-frontend/commits/7ddbf962bd9) - [ux] Updated and added new translations
- [`586040bf70b`](https://bitbucket.org/atlassian/atlassian-frontend/commits/586040bf70b) - Ensure that all children are validated in new error path

#### Patch Changes

- [`5857b17788b`](https://bitbucket.org/atlassian/atlassian-frontend/commits/5857b17788b) - Change the way kitchen sink shows ADF errors
- [`faf98b96883`](https://bitbucket.org/atlassian/atlassian-frontend/commits/faf98b96883) - Removed unused comments in src from package
- [`3df9d98ef8a`](https://bitbucket.org/atlassian/atlassian-frontend/commits/3df9d98ef8a) - [ux] As part of the bump to @atlaskit/code, the codeBlock element's visual appearance has been modified in renderer and editor-core. Specifically the fontSize, borderRadius, lineHeight and overflow behaviour have been made more consistent with the DS parent package.
- [`07868e5ddc9`](https://bitbucket.org/atlassian/atlassian-frontend/commits/07868e5ddc9) - remove unecessary function from getQuickInsertItemsFromModule()
- Updated dependencies

---

### @atlaskit/emoji@63.1.0

#### Minor Changes

- [`7ddbf962bd9`](https://bitbucket.org/atlassian/atlassian-frontend/commits/7ddbf962bd9) - [ux] Updated and added new translations

---

### @atlaskit/focused-task-close-account@0.14.0

#### Minor Changes

- [`7ddbf962bd9`](https://bitbucket.org/atlassian/atlassian-frontend/commits/7ddbf962bd9) - [ux] Updated and added new translations

---

### @atlaskit/media-picker@57.2.0

#### Minor Changes

- [`52013ecdd24`](https://bitbucket.org/atlassian/atlassian-frontend/commits/52013ecdd24) - Add an ability to create Browser component with children using render props pattern to avoid passing state around in parent components.

#### Patch Changes

- Updated dependencies

---

### @atlaskit/media-ui@15.2.0

#### Minor Changes

- [`7ddbf962bd9`](https://bitbucket.org/atlassian/atlassian-frontend/commits/7ddbf962bd9) - [ux] Updated and added new translations

---

### @atlaskit/mention@19.2.0

#### Minor Changes

- [`7ddbf962bd9`](https://bitbucket.org/atlassian/atlassian-frontend/commits/7ddbf962bd9) - [ux] Updated and added new translations

---

### @atlaskit/profilecard@14.2.0

#### Minor Changes

- [`7ddbf962bd9`](https://bitbucket.org/atlassian/atlassian-frontend/commits/7ddbf962bd9) - [ux] Updated and added new translations

---

### @atlaskit/reactions@18.2.0

#### Minor Changes

- [`7ddbf962bd9`](https://bitbucket.org/atlassian/atlassian-frontend/commits/7ddbf962bd9) - [ux] Updated and added new translations

#### Patch Changes

- Updated dependencies

---

### @atlaskit/renderer@73.2.0

#### Minor Changes

- [`7ddbf962bd9`](https://bitbucket.org/atlassian/atlassian-frontend/commits/7ddbf962bd9) - [ux] Updated and added new translations

#### Patch Changes

- [`32613148067`](https://bitbucket.org/atlassian/atlassian-frontend/commits/32613148067) - Move DisableActions, DisableMediaLinking, allowAnnotaions, allowHeadingAnchorLinks feature flags from query param to rendererConfiguration
- [`5857b17788b`](https://bitbucket.org/atlassian/atlassian-frontend/commits/5857b17788b) - Change the way kitchen sink shows ADF errors
- [`9d1bc4dde94`](https://bitbucket.org/atlassian/atlassian-frontend/commits/9d1bc4dde94) - [ux] As part of the bump to @atlaskit/code, the codeBlock element's visual appearance has been modified in renderer and editor-core. Specifically the fontSize and lineHeight have been made more consistent with the DS parent package.
- Updated dependencies

---

### @atlaskit/status@0.11.0

#### Minor Changes

- [`7ddbf962bd9`](https://bitbucket.org/atlassian/atlassian-frontend/commits/7ddbf962bd9) - [ux] Updated and added new translations

---

### @atlassian/calendar@0.8.0

#### Minor Changes

- [`a7c01b0ff23`](https://bitbucket.org/atlassian/atlassian-frontend/commits/a7c01b0ff23) - [ux] Fix the styling of the placeholder on the jsm calendar

---

### @atlaskit/adf-schema@13.7.1

#### Patch Changes

- [`3405124622e`](https://bitbucket.org/atlassian/atlassian-frontend/commits/3405124622e) - ED-11742 Fix table custom step start position
- [`04649ad9889`](https://bitbucket.org/atlassian/atlassian-frontend/commits/04649ad9889) - ED-10369: fixed table breakout layout when pasted from renderer

---

### @atlaskit/avatar@20.1.1

#### Patch Changes

- [`fe59fc62a58`](https://bitbucket.org/atlassian/atlassian-frontend/commits/fe59fc62a58) - Increased the contrast for the fallback icon of the Avatar package so that it passes WCAG AA contrast requirements.

---

### @atlaskit/avatar-group@8.0.14

#### Patch Changes

- [`952019cfd39`](https://bitbucket.org/atlassian/atlassian-frontend/commits/952019cfd39) - Removed extraneous/unnecessary dependencies for design system components.

---

### @atlaskit/conversation@16.0.17

#### Patch Changes

- Updated dependencies

---

### @atlaskit/datetime-picker@10.0.8

#### Patch Changes

- [`9c020a0e05f`](https://bitbucket.org/atlassian/atlassian-frontend/commits/9c020a0e05f) - Replaced `@atlaskit/calendar` exported types to access its `navigate()` api

  - Replaced `CalendarClassType` & `ArrowKeys` types with `CalendarInternalRef` type.
  - Also replaced `ref` prop with `internalRef` prop for accessing `navigate()` api.

- Updated dependencies

---

### @atlaskit/embedded-document@0.7.15

#### Patch Changes

- Updated dependencies

---

### @atlaskit/field-range@9.0.5

#### Patch Changes

- [`952019cfd39`](https://bitbucket.org/atlassian/atlassian-frontend/commits/952019cfd39) - Removed extraneous/unnecessary dependencies for design system components.

---

### @atlaskit/flag@14.1.1

#### Patch Changes

- [`952019cfd39`](https://bitbucket.org/atlassian/atlassian-frontend/commits/952019cfd39) - Removed extraneous/unnecessary dependencies for design system components.

---

### @atlaskit/icon@21.2.4

#### Patch Changes

- [`37afe4a0fd5`](https://bitbucket.org/atlassian/atlassian-frontend/commits/37afe4a0fd5) - [ux] Update Dropbox icon and arrow-left icon

---

### @atlaskit/legacy-mobile-macros@0.1.4

#### Patch Changes

- Updated dependencies

---

### @atlaskit/logo@13.0.8

#### Patch Changes

- [`952019cfd39`](https://bitbucket.org/atlassian/atlassian-frontend/commits/952019cfd39) - Removed extraneous/unnecessary dependencies for design system components.
- [`dfa1827ecad`](https://bitbucket.org/atlassian/atlassian-frontend/commits/dfa1827ecad) - Fixed the broken "Download the logos" link on https://atlassian.design/components/logo/usage

---

### @atlaskit/page@12.0.5

#### Patch Changes

- [`b30ac8f0656`](https://bitbucket.org/atlassian/atlassian-frontend/commits/b30ac8f0656) - Removes an extraneous development dependency

---

### @atlaskit/page-layout@0.10.12

#### Patch Changes

- [`952019cfd39`](https://bitbucket.org/atlassian/atlassian-frontend/commits/952019cfd39) - Removed extraneous/unnecessary dependencies for design system components.

---

### @atlaskit/range@5.0.7

#### Patch Changes

- [`952019cfd39`](https://bitbucket.org/atlassian/atlassian-frontend/commits/952019cfd39) - Removed extraneous/unnecessary dependencies for design system components.

---

### @atlaskit/reduced-ui-pack@13.0.8

#### Patch Changes

- [`37afe4a0fd5`](https://bitbucket.org/atlassian/atlassian-frontend/commits/37afe4a0fd5) - [ux] Update Dropbox icon and arrow-left icon

---

### @atlaskit/tag@11.0.6

#### Patch Changes

- [`863370c4cab`](https://bitbucket.org/atlassian/atlassian-frontend/commits/863370c4cab) - [ux] Fixes a bug in which Tag's hover state is incorrectly using the removable color palette.

---

### @atlassian/mpt-plan-configuration@1.1.2

#### Patch Changes

- Updated dependencies

---

### @atlassian/pipelines-editor@0.10.17

#### Patch Changes

- Updated dependencies

---

### @atlassian/pipelines-runners-management@0.2.2

#### Patch Changes

- Updated dependencies

---

### @atlassian/pipelines-runners-wizard@3.6.2

#### Patch Changes

- Updated dependencies
