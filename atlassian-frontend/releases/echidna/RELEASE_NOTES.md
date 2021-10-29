# Echidna Release

## Summary

| Package                                              | Type  | Change             | Number of changes |
| ---------------------------------------------------- | ----- | ------------------ | ----------------: |
| @atlaskit/comment                                    | none  | 10.0.6 -> 10.0.6   |                 0 |
| @atlaskit/dropdown-menu                              | none  | 10.1.2 -> 10.1.2   |                 0 |
| @atlaskit/editor-json-transformer                    | none  | 8.4.4 -> 8.4.4     |                 0 |
| @atlaskit/editor-wikimarkup-transformer              | none  | 8.4.0 -> 8.4.0     |                 0 |
| @atlaskit/task-decision                              | none  | 17.0.9 -> 17.0.9   |                 0 |
| @atlassian/pipelines-metrics                         | none  | 0.8.3 -> 0.8.3     |                 0 |
| @atlaskit/editor-common                              | major | 54.0.0 -> 55.0.0   |                 2 |
| @atlaskit/editor-core                                | major | 135.1.0 -> 136.0.0 |                14 |
| @atlaskit/media-ui                                   | major | 14.4.0 -> 15.0.0   |                 1 |
| @atlaskit/renderer                                   | major | 71.0.0 -> 72.0.0   |                 2 |
| @atlassian/xen-editor-provider                       | major | 10.5.10 -> 11.0.0  |                 2 |
| @atlaskit/adf-schema                                 | minor | 13.4.0 -> 13.5.0   |                 2 |
| @atlaskit/editor-mobile-bridge                       | minor | 21.0.1 -> 21.1.0   |                 3 |
| @atlaskit/flag                                       | minor | 14.0.8 -> 14.1.0   |                 1 |
| @atlaskit/form                                       | minor | 8.1.7 -> 8.2.0     |                 2 |
| @atlaskit/legacy-mobile-macros                       | minor | 0.0.1 -> 0.1.0     |                 1 |
| @atlaskit/media-card                                 | minor | 70.2.0 -> 70.3.0   |                 3 |
| @atlaskit/media-client                               | minor | 12.2.0 -> 12.3.0   |                 1 |
| @atlaskit/media-viewer                               | minor | 45.5.3 -> 45.6.0   |                 1 |
| @atlaskit/smart-card                                 | minor | 14.7.0 -> 14.8.0   |                 3 |
| @atlassian/flow-patch                                | minor | 2.0.3 -> 2.1.0     |                 1 |
| @atlaskit/breadcrumbs                                | patch | 10.0.11 -> 10.0.12 |                 3 |
| @atlaskit/collab-provider                            | patch | 5.0.0 -> 5.0.1     |                 1 |
| @atlaskit/conversation                               | patch | 16.0.14 -> 16.0.15 |                 0 |
| @atlaskit/editor-bitbucket-transformer               | patch | 7.1.5 -> 7.1.6     |                 0 |
| @atlaskit/editor-confluence-transformer              | patch | 8.1.5 -> 8.1.6     |                 0 |
| @atlaskit/editor-extension-dropbox                   | patch | 0.2.11 -> 0.2.12   |                 0 |
| @atlaskit/editor-jira-transformer                    | patch | 8.1.5 -> 8.1.6     |                 0 |
| @atlaskit/editor-markdown-transformer                | patch | 4.1.5 -> 4.1.6     |                 0 |
| @atlaskit/embedded-document                          | patch | 0.7.12 -> 0.7.13   |                 0 |
| @atlaskit/inline-edit                                | patch | 11.0.7 -> 11.0.8   |                 1 |
| @atlaskit/media-avatar-picker                        | patch | 22.1.3 -> 22.1.4   |                 0 |
| @atlaskit/media-editor                               | patch | 38.1.5 -> 38.1.6   |                 0 |
| @atlaskit/media-picker                               | patch | 57.1.0 -> 57.1.1   |                 0 |
| @atlaskit/media-table                                | patch | 8.0.2 -> 8.0.3     |                 0 |
| @atlaskit/media-test-helpers                         | patch | 28.5.0 -> 28.5.1   |                 0 |
| @atlaskit/page                                       | patch | 12.0.3 -> 12.0.4   |                 1 |
| @atlaskit/popup                                      | patch | 1.0.5 -> 1.0.6     |                 1 |
| @atlaskit/range                                      | patch | 5.0.5 -> 5.0.6     |                 1 |
| @atlaskit/tabs                                       | patch | 12.1.1 -> 12.1.2   |                 1 |
| @atlassian/experimental-react-experiment-framework-2 | patch | 0.0.31 -> 0.0.32   |                 1 |
| @atlassian/forge-ui-text-renderer                    | patch | 2.0.14 -> 2.0.15   |                 0 |
| @atlassian/search-provider                           | patch | 2.1.9 -> 2.1.10    |                 0 |

## Details

---

---

---

---

---

---

---

### @atlaskit/editor-common@55.0.0

#### Major Changes

- [`0923d917ef`](https://bitbucket.org/atlassian/atlassian-frontend/commits/0923d917ef) - `MediaSingle` prop 'blockLink' is removed and `width` becomes optional.
  `MediaSingleDimensionHelper` prop `ratio` is removed.

#### Patch Changes

- [`81a5e08f06`](https://bitbucket.org/atlassian/atlassian-frontend/commits/81a5e08f06) - Fix divider not visible in dark mode
- Updated dependencies

---

### @atlaskit/editor-core@136.0.0

#### Major Changes

- [`00ba3076ab`](https://bitbucket.org/atlassian/atlassian-frontend/commits/00ba3076ab) - [ux] Paste hyperlink into selected text will apply link mark to the selected text
  Breaking change on `isNodeTypeParagraph` function, use `isParagraph` instead (requires a schema to be passed as a second param)

#### Minor Changes

- [`c7e408f3c8`](https://bitbucket.org/atlassian/atlassian-frontend/commits/c7e408f3c8) - [ux] Embed smart cart resizing now can dynamically change height when content is coming from a public resolver powered by iframe.
- [`2d80d6e283`](https://bitbucket.org/atlassian/atlassian-frontend/commits/2d80d6e283) - [ED-11464][editor] Introduce onContentRendered method in content bridge. It is called when content is rendered which is set by bridge.setContent

#### Patch Changes

- [`d1e241f90f`](https://bitbucket.org/atlassian/atlassian-frontend/commits/d1e241f90f) - ED-10693 Change tryAutoSave to a function
- [`a3d86f8925`](https://bitbucket.org/atlassian/atlassian-frontend/commits/a3d86f8925) - Fix issue where custom emojis appeared stretched
- [`610cacff4e`](https://bitbucket.org/atlassian/atlassian-frontend/commits/610cacff4e) - ED-11150: added severity to InputPerfSamlingAEP
- [`5f3cf8f7a9`](https://bitbucket.org/atlassian/atlassian-frontend/commits/5f3cf8f7a9) - [ux] Fix bug where resize handlers should be in the middle of image and not image + captions
- [`cc04446cf9`](https://bitbucket.org/atlassian/atlassian-frontend/commits/cc04446cf9) - Enable hyperlink toolbar in captions
- [`81a5e08f06`](https://bitbucket.org/atlassian/atlassian-frontend/commits/81a5e08f06) - Fix divider not visible in dark mode
- [`44b543b221`](https://bitbucket.org/atlassian/atlassian-frontend/commits/44b543b221) - [ux] [ED-10388] Fix height of ContentArea styled component to avoid surplus whitespace at the bottom of the page
  [ux] [ED-9593] Reduce vertical margin of block nodes to 0.75rem
- [`6ae634a53e`](https://bitbucket.org/atlassian/atlassian-frontend/commits/6ae634a53e) - Add analytics to image caption
- [`c6e1acf2ca`](https://bitbucket.org/atlassian/atlassian-frontend/commits/c6e1acf2ca) - ED-11213 Move testing library to devDependency
- [`888fc5ceef`](https://bitbucket.org/atlassian/atlassian-frontend/commits/888fc5ceef) - [ux] When embed resizing is not enabled, wide and full-width embeds won't get bigger then 100% as they shoud
- [`c74a79f30e`](https://bitbucket.org/atlassian/atlassian-frontend/commits/c74a79f30e) - EDM-1529: fix switching link appearance in lists
- Updated dependencies

---

### @atlaskit/media-ui@15.0.0

#### Major Changes

- [`ef4be7212a`](https://bitbucket.org/atlassian/atlassian-frontend/commits/ef4be7212a) - @atlaskit/media-ui/embeds `EmbedCardResolvedView` component now requires iframe ref. And new export `embedHeaderHeight` is introduced

---

### @atlaskit/renderer@72.0.0

#### Minor Changes

- [`c7e408f3c8`](https://bitbucket.org/atlassian/atlassian-frontend/commits/c7e408f3c8) - [ux] Embed smart cart resizing now can dynamically change height when content is coming from a public resolver powered by iframe.

#### Patch Changes

- [`81a5e08f06`](https://bitbucket.org/atlassian/atlassian-frontend/commits/81a5e08f06) - Fix divider not visible in dark mode
- Updated dependencies

---

### @atlassian/xen-editor-provider@11.0.0

#### Major Changes

- [`834139979d`](https://bitbucket.org/atlassian/atlassian-frontend/commits/834139979d) - Add analytics to ForgeEditorExtension and ForgeEditorExtensionNext components. Make analyticsWebClient a required param in getForgeExtensionProvider and getForgeExtensionProviderNext.

#### Patch Changes

- [`16677aa695`](https://bitbucket.org/atlassian/atlassian-frontend/commits/16677aa695) - BUGFIX: Do not return array as default value in non-multi Select config.
- Updated dependencies

---

### @atlaskit/adf-schema@13.5.0

#### Minor Changes

- [`7f7643108f`](https://bitbucket.org/atlassian/atlassian-frontend/commits/7f7643108f) - [ux] EmbedCard node's `width` attribute will have 100% default value now. For UI this means, embeds are 100% wide when inserted (instead of slightly smaller then 100% previously).

#### Patch Changes

- [`aa671045fc`](https://bitbucket.org/atlassian/atlassian-frontend/commits/aa671045fc) - [ux] ED-11300: allowed link mark under actionItem and decisionItem

---

### @atlaskit/editor-mobile-bridge@21.1.0

#### Minor Changes

- [`622ae0dc66`](https://bitbucket.org/atlassian/atlassian-frontend/commits/622ae0dc66) - [ux] added macros and dark theme support with query params configuration
- [`9d91ea2859`](https://bitbucket.org/atlassian/atlassian-frontend/commits/9d91ea2859) - ED-11455 Enable useSpecvalidator flag for hybrid renderer
- [`2d80d6e283`](https://bitbucket.org/atlassian/atlassian-frontend/commits/2d80d6e283) - [ED-11464][editor] Introduce onContentRendered method in content bridge. It is called when content is rendered which is set by bridge.setContent

#### Patch Changes

- Updated dependencies

---

### @atlaskit/flag@14.1.0

#### Minor Changes

- [`f92b240fc3`](https://bitbucket.org/atlassian/atlassian-frontend/commits/f92b240fc3) - Add an optional id attribute to FlagGroup via props

---

### @atlaskit/form@8.2.0

#### Minor Changes

- [`fa4256f9b0`](https://bitbucket.org/atlassian/atlassian-frontend/commits/fa4256f9b0) - Add getState to FormProps for inspecting internal Form state (errors, values, et al)
- [`9552363cb7`](https://bitbucket.org/atlassian/atlassian-frontend/commits/9552363cb7) - [ux] Added a RangeField component to address issues surrounding Range having a different interface to other kinds of inputs. Use a RangeField instead of a Field when using a Range inside of a Form. You must provide a `defaultValue`.

---

### @atlaskit/legacy-mobile-macros@0.1.0

#### Minor Changes

- [`622ae0dc66`](https://bitbucket.org/atlassian/atlassian-frontend/commits/622ae0dc66) - [ux] added macros and dark theme support with query params configuration

#### Patch Changes

- Updated dependencies

---

### @atlaskit/media-card@70.3.0

#### Minor Changes

- [`56693486a3`](https://bitbucket.org/atlassian/atlassian-frontend/commits/56693486a3) - [ux] Rate Limited UI for the MediaViewer. Also moved a MediaCard function into MediaClient so that that functionality can be used across multiple packages

#### Patch Changes

- [`2b7746c631`](https://bitbucket.org/atlassian/atlassian-frontend/commits/2b7746c631) - Disable progress bar while processing in classic card
- [`4c699cc1cb`](https://bitbucket.org/atlassian/atlassian-frontend/commits/4c699cc1cb) - Adding VR tests for Rate Limited UI states
- Updated dependencies

---

### @atlaskit/media-client@12.3.0

#### Minor Changes

- [`56693486a3`](https://bitbucket.org/atlassian/atlassian-frontend/commits/56693486a3) - [ux] Rate Limited UI for the MediaViewer. Also moved a MediaCard function into MediaClient so that that functionality can be used across multiple packages

---

### @atlaskit/media-viewer@45.6.0

#### Minor Changes

- [`56693486a3`](https://bitbucket.org/atlassian/atlassian-frontend/commits/56693486a3) - [ux] Rate Limited UI for the MediaViewer. Also moved a MediaCard function into MediaClient so that that functionality can be used across multiple packages

#### Patch Changes

- Updated dependencies

---

### @atlaskit/smart-card@14.8.0

#### Minor Changes

- [`6bef7adf66`](https://bitbucket.org/atlassian/atlassian-frontend/commits/6bef7adf66) - `Card` component expects optional `embedIframeRef` iframe ref. New `IframelyResizeMessageListener` HOC component export is introduced.

#### Patch Changes

- [`c66e17de46`](https://bitbucket.org/atlassian/atlassian-frontend/commits/c66e17de46) - Add CDN version of Iframely domain names for validation
- [`be5153bf8d`](https://bitbucket.org/atlassian/atlassian-frontend/commits/be5153bf8d) - dont access status of undefined responses
- Updated dependencies

---

### @atlassian/flow-patch@2.1.0

#### Minor Changes

- [`04bd33118b`](https://bitbucket.org/atlassian/atlassian-frontend/commits/04bd33118b) - handle any kind of distributions

---

### @atlaskit/breadcrumbs@10.0.12

#### Patch Changes

- [`4f2b2b5750`](https://bitbucket.org/atlassian/atlassian-frontend/commits/4f2b2b5750) - Internal change from class to function components

  - converted all the class component in the package to function
  - started to use `usePlatformLeafEventHandler` to replace HOCs from `analytics-next`
  - added more visual regression tests

- [`25e8b332bf`](https://bitbucket.org/atlassian/atlassian-frontend/commits/25e8b332bf) - replaced styled-components to emotion
- [`30360b3d28`](https://bitbucket.org/atlassian/atlassian-frontend/commits/30360b3d28) - Internal change from class to function components

---

### @atlaskit/collab-provider@5.0.1

#### Patch Changes

- [`f9cd884b7e`](https://bitbucket.org/atlassian/atlassian-frontend/commits/f9cd884b7e) - Fix issue with emitting noisy empty presence events.
- Updated dependencies

---

### @atlaskit/conversation@16.0.15

#### Patch Changes

- Updated dependencies

---

### @atlaskit/editor-bitbucket-transformer@7.1.6

#### Patch Changes

- Updated dependencies

---

### @atlaskit/editor-confluence-transformer@8.1.6

#### Patch Changes

- Updated dependencies

---

### @atlaskit/editor-extension-dropbox@0.2.12

#### Patch Changes

- Updated dependencies

---

### @atlaskit/editor-jira-transformer@8.1.6

#### Patch Changes

- Updated dependencies

---

### @atlaskit/editor-markdown-transformer@4.1.6

#### Patch Changes

- Updated dependencies

---

### @atlaskit/embedded-document@0.7.13

#### Patch Changes

- Updated dependencies

---

### @atlaskit/inline-edit@11.0.8

#### Patch Changes

- [`9da1032552`](https://bitbucket.org/atlassian/atlassian-frontend/commits/9da1032552) - Adds the onCancel prop as an optional event handler called when a user clicks close, or presses escape. This has no behaviour change but allows users more granularity in how they handle the component's lifecycle.
- Updated dependencies

---

### @atlaskit/media-avatar-picker@22.1.4

#### Patch Changes

- Updated dependencies

---

### @atlaskit/media-editor@38.1.6

#### Patch Changes

- Updated dependencies

---

### @atlaskit/media-picker@57.1.1

#### Patch Changes

- Updated dependencies

---

### @atlaskit/media-table@8.0.3

#### Patch Changes

- Updated dependencies

---

### @atlaskit/media-test-helpers@28.5.1

#### Patch Changes

- Updated dependencies

---

### @atlaskit/page@12.0.4

#### Patch Changes

- [`8047104b93`](https://bitbucket.org/atlassian/atlassian-frontend/commits/8047104b93) - Remove invalid `spacing` attribute in rendered HTML by not passing unused spacing prop to internal Grid component.

---

### @atlaskit/popup@1.0.6

#### Patch Changes

- [`1858f20ac3`](https://bitbucket.org/atlassian/atlassian-frontend/commits/1858f20ac3) - Optimised popup performance as part of the lite-mode project. Changes are internal and have no implications for component API or usage.

---

### @atlaskit/range@5.0.6

#### Patch Changes

- [`3137d05e06`](https://bitbucket.org/atlassian/atlassian-frontend/commits/3137d05e06) - [ux] Fixed rendering bug inside of Range. Now the blue trackbar snaps to a step in the range to align with the position of the thumb.

---

### @atlaskit/tabs@12.1.2

#### Patch Changes

- [`e795d0a849`](https://bitbucket.org/atlassian/atlassian-frontend/commits/e795d0a849) - The `Tabs` component now uses emotion instead of styled-components for it's internal styling.

---

### @atlassian/experimental-react-experiment-framework-2@0.0.32

#### Patch Changes

- [`bf2711678d`](https://bitbucket.org/atlassian/atlassian-frontend/commits/bf2711678d) - Add optional source attribute to Analytics Event type

---

### @atlassian/forge-ui-text-renderer@2.0.15

#### Patch Changes

- Updated dependencies

---

### @atlassian/search-provider@2.1.10

#### Patch Changes

- Updated dependencies
