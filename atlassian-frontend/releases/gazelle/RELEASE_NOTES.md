# Gazelle Release

## Summary

| Package                                 | Type  | Change             | Number of changes |
| --------------------------------------- | ----- | ------------------ | ----------------: |
| @atlaskit/editor-mobile-bridge          | major | 22.0.0 -> 23.0.0   |                 6 |
| @atlaskit/legacy-mobile-macros          | major | 0.1.1 -> 1.0.0     |                 1 |
| @atlaskit/adf-schema                    | minor | 13.6.0 -> 13.7.0   |                 1 |
| @atlaskit/adf-utils                     | minor | 11.6.0 -> 11.7.0   |                 1 |
| @atlaskit/collab-provider               | minor | 5.1.0 -> 5.2.0     |                 3 |
| @atlaskit/editor-core                   | minor | 136.1.0 -> 136.2.0 |                 9 |
| @atlaskit/media-ui                      | minor | 15.0.1 -> 15.1.0   |                 1 |
| @atlaskit/renderer                      | minor | 73.0.0 -> 73.1.0   |                 1 |
| @atlaskit/editor-common                 | patch | 55.1.0 -> 55.1.1   |                 1 |
| @atlaskit/icon                          | patch | 21.2.0 -> 21.2.1   |                 1 |
| @atlaskit/icon-file-type                | patch | 6.1.0 -> 6.1.1     |                 1 |
| @atlaskit/icon-object                   | patch | 6.1.0 -> 6.1.1     |                 1 |
| @atlaskit/icon-priority                 | patch | 6.1.0 -> 6.1.1     |                 1 |
| @atlaskit/inline-edit                   | patch | 11.0.9 -> 11.0.10  |                 1 |
| @atlaskit/media-card                    | patch | 70.3.1 -> 70.3.2   |                 3 |
| @atlaskit/media-common                  | patch | 2.5.0 -> 2.5.1     |                 1 |
| @atlaskit/media-picker                  | patch | 57.1.2 -> 57.1.3   |                 1 |
| @atlaskit/media-test-helpers            | patch | 28.5.1 -> 28.5.2   |                 1 |
| @atlaskit/modal-dialog                  | patch | 11.2.4 -> 11.2.5   |                 1 |
| @atlaskit/reduced-ui-pack               | patch | 13.0.5 -> 13.0.6   |                 1 |
| @atlaskit/smart-card                    | patch | 14.8.1 -> 14.8.2   |                 1 |
| @atlassian/commerce-billing-details     | patch | 1.0.1 -> 1.0.2     |                 1 |
| @atlassian/commerce-billing-history     | patch | 1.0.0 -> 1.0.1     |                 1 |
| @atlassian/commerce-environment         | patch | 1.0.0 -> 1.0.1     |                 1 |
| @atlassian/commerce-payment-flow        | patch | 2.1.0 -> 2.1.1     |                 1 |
| @atlassian/commerce-payment-methods     | patch | 1.1.1 -> 1.1.2     |                 1 |
| @atlassian/pipelines-editor             | patch | 0.10.12 -> 0.10.13 |                 0 |
| @atlassian/pipelines-runners-management | patch | 0.1.1 -> 0.1.2     |                 0 |
| @atlassian/pipelines-runners-wizard     | patch | 3.4.0 -> 3.4.1     |                 0 |

## Details

---

### @atlaskit/editor-mobile-bridge@23.0.0

#### Major Changes

- [`658184c615`](https://bitbucket.org/atlassian/atlassian-frontend/commits/658184c615) - [ED-11630] Removes the usage of Query Parameter for Predictable List and Makes the Predictable List reconfigurable via the bridge.configureEditor method. All the clients setting allowPredictableList from query parameter should use bridge.configureEditor and pass in the allowPredictableList flag.
  Example: bridge.configureEditor("{\"allowPredictableList\": true}")

#### Minor Changes

- [`2fe88ab389`](https://bitbucket.org/atlassian/atlassian-frontend/commits/2fe88ab389) - [ED-11642] Remove "window.resize" listner and "ClickArea" for compact editor. Include padding calculation in onRenderedContentHeightChanged.
- [`951aa0b3da`](https://bitbucket.org/atlassian/atlassian-frontend/commits/951aa0b3da) - TWISTA-638 Expose `setPlaceholder` API for mobile
- [`7d8f1facfc`](https://bitbucket.org/atlassian/atlassian-frontend/commits/7d8f1facfc) - [ME-300](https://product-fabric.atlassian.net/browse/ME-300) Introduced a toolbarBridge to support data-driven editing capabilities.

  By default, implementation is not required and native side won't be impacted. Once the implementation is done
  on the native side, this will work out of the box. Data-driven approach listens the floating toolbar state
  changes and relay the editing capabilities to the native side. Native mobile displays these capabilities with
  the native widgets in the main toolbar. Once the user performs an action, responsibility of the execution is
  delegated to the editor-core which is the shared components across all platforms. Native mobile doesn't know
  about the details of how to perform an action.

- [`2181a4c181`](https://bitbucket.org/atlassian/atlassian-frontend/commits/2181a4c181) - ED-11468 - 1. Introduced new folder structure with POM and fragments. 2. Added tests for validating quick insert related features.

#### Patch Changes

- [`7a66ee7c88`](https://bitbucket.org/atlassian/atlassian-frontend/commits/7a66ee7c88) - Add url params support for captions in mobile bridge
- Updated dependencies

---

### @atlaskit/legacy-mobile-macros@1.0.0

#### Major Changes

- [`08ee9b7b87`](https://bitbucket.org/atlassian/atlassian-frontend/commits/08ee9b7b87) - legacy macros tests added

#### Patch Changes

- Updated dependencies

---

### @atlaskit/adf-schema@13.7.0

#### Minor Changes

- [`714fd9e922`](https://bitbucket.org/atlassian/atlassian-frontend/commits/714fd9e922) - Promote media link mark to full schema

---

### @atlaskit/adf-utils@11.7.0

#### Minor Changes

- [`549740c01d`](https://bitbucket.org/atlassian/atlassian-frontend/commits/549740c01d) - Exported the validator errors map
  Convert nodes that are after an invalid length to be unsupported

#### Patch Changes

- Updated dependencies

---

### @atlaskit/collab-provider@5.2.0

#### Minor Changes

- [`360a14b1d2`](https://bitbucket.org/atlassian/atlassian-frontend/commits/360a14b1d2) - fix issue with empty string for title and editor width
- [`2ef9970ee2`](https://bitbucket.org/atlassian/atlassian-frontend/commits/2ef9970ee2) - add analytics for collab provider
- [`1c0473e050`](https://bitbucket.org/atlassian/atlassian-frontend/commits/1c0473e050) - Collab provider to support custom share token for embedded confluence page

---

### @atlaskit/editor-core@136.2.0

#### Minor Changes

- [`658184c615`](https://bitbucket.org/atlassian/atlassian-frontend/commits/658184c615) - [ED-11630] Removes the usage of Query Parameter for Predictable List and Makes the Predictable List reconfigurable via the bridge.configureEditor method. All the clients setting allowPredictableList from query parameter should use bridge.configureEditor and pass in the allowPredictableList flag.
  Example: bridge.configureEditor("{\"allowPredictableList\": true}")
- [`2fe88ab389`](https://bitbucket.org/atlassian/atlassian-frontend/commits/2fe88ab389) - [ED-11642] Remove "window.resize" listner and "ClickArea" for compact editor. Include padding calculation in onRenderedContentHeightChanged.
- [`951aa0b3da`](https://bitbucket.org/atlassian/atlassian-frontend/commits/951aa0b3da) - TWISTA-638 Expose `setPlaceholder` API for mobile
- [`7d8f1facfc`](https://bitbucket.org/atlassian/atlassian-frontend/commits/7d8f1facfc) - [ME-300](https://product-fabric.atlassian.net/browse/ME-300) Introduced a toolbarBridge to support data-driven editing capabilities.

  By default, implementation is not required and native side won't be impacted. Once the implementation is done
  on the native side, this will work out of the box. Data-driven approach listens the floating toolbar state
  changes and relay the editing capabilities to the native side. Native mobile displays these capabilities with
  the native widgets in the main toolbar. Once the user performs an action, responsibility of the execution is
  delegated to the editor-core which is the shared components across all platforms. Native mobile doesn't know
  about the details of how to perform an action.

#### Patch Changes

- [`a4e37d0df4`](https://bitbucket.org/atlassian/atlassian-frontend/commits/a4e37d0df4) - Fix EDM-1636 again
- [`c2901e028c`](https://bitbucket.org/atlassian/atlassian-frontend/commits/c2901e028c) - ED-11672 Fix divider input rule when triggered at the end of a page
- [`3e42092709`](https://bitbucket.org/atlassian/atlassian-frontend/commits/3e42092709) - ED-11635 Avoid expensive nodesBetween in predictable lists if list is not selected to impove typing performance
- [`9203b21230`](https://bitbucket.org/atlassian/atlassian-frontend/commits/9203b21230) - Rename locale from fabric.editor.emoji to fabric.editor.panel.emoji
- [`0c2ec01050`](https://bitbucket.org/atlassian/atlassian-frontend/commits/0c2ec01050) - revert EDM-1636 fix
- Updated dependencies

---

### @atlaskit/media-ui@15.1.0

#### Minor Changes

- [`78e3c951c8`](https://bitbucket.org/atlassian/atlassian-frontend/commits/78e3c951c8) - [ux] Making the inline video player able to play/pause from anywhere on card

---

### @atlaskit/renderer@73.1.0

#### Minor Changes

- [`949c7174a4`](https://bitbucket.org/atlassian/atlassian-frontend/commits/949c7174a4) - [ux] ED-11625: scope select all to renderer document

#### Patch Changes

- Updated dependencies

---

### @atlaskit/editor-common@55.1.1

#### Patch Changes

- [`549740c01d`](https://bitbucket.org/atlassian/atlassian-frontend/commits/549740c01d) - Exported the validator errors map
  Convert nodes that are after an invalid length to be unsupported
- Updated dependencies

---

### @atlaskit/icon@21.2.1

#### Patch Changes

- [`b9f0d16300`](https://bitbucket.org/atlassian/atlassian-frontend/commits/b9f0d16300) - Re-generated icons using a newer version of the build process

---

### @atlaskit/icon-file-type@6.1.1

#### Patch Changes

- [`b9f0d16300`](https://bitbucket.org/atlassian/atlassian-frontend/commits/b9f0d16300) - Re-generated icons using a newer version of the build process

---

### @atlaskit/icon-object@6.1.1

#### Patch Changes

- [`b9f0d16300`](https://bitbucket.org/atlassian/atlassian-frontend/commits/b9f0d16300) - Re-generated icons using a newer version of the build process

---

### @atlaskit/icon-priority@6.1.1

#### Patch Changes

- [`b9f0d16300`](https://bitbucket.org/atlassian/atlassian-frontend/commits/b9f0d16300) - Re-generated icons using a newer version of the build process

---

### @atlaskit/inline-edit@11.0.10

#### Patch Changes

- [`f5cf9fc9e9`](https://bitbucket.org/atlassian/atlassian-frontend/commits/f5cf9fc9e9) - #### General conversion for inline-edit

  There is no breaking change in this conversion, only some mechanical changes applied:

  - replaced `styled-components` to `emotion`
  - converted class component to function component
  - restructured the folder
  - updated examples (using `emotion` and function component too)
  - added more virtual regression test cases for more scenario
  - shifted to `react-testing-library` from `enzyme` for unit tests

---

### @atlaskit/media-card@70.3.2

#### Patch Changes

- [`1f4d55e86a`](https://bitbucket.org/atlassian/atlassian-frontend/commits/1f4d55e86a) - Minor syntax fix
- [`7e990a036d`](https://bitbucket.org/atlassian/atlassian-frontend/commits/7e990a036d) - Removed Feature Flag Control from Card View Matrix example
- [`63bff65641`](https://bitbucket.org/atlassian/atlassian-frontend/commits/63bff65641) - [ux] Making the VidPlayButton bigger
- Updated dependencies

---

### @atlaskit/media-common@2.5.1

#### Patch Changes

- [`ab112f3020`](https://bitbucket.org/atlassian/atlassian-frontend/commits/ab112f3020) - Updated media-common analytics exports

---

### @atlaskit/media-picker@57.1.3

#### Patch Changes

- [`a4e37d0df4`](https://bitbucket.org/atlassian/atlassian-frontend/commits/a4e37d0df4) - Fix EDM-1636 again
- Updated dependencies

---

### @atlaskit/media-test-helpers@28.5.2

#### Patch Changes

- [`a4e37d0df4`](https://bitbucket.org/atlassian/atlassian-frontend/commits/a4e37d0df4) - Fix EDM-1636 again
- Updated dependencies

---

### @atlaskit/modal-dialog@11.2.5

#### Patch Changes

- [`d94d90714b`](https://bitbucket.org/atlassian/atlassian-frontend/commits/d94d90714b) - Modal will retain full-width at viewports < 320px. This makes it consistent with < 480px beahviour.

---

### @atlaskit/reduced-ui-pack@13.0.6

#### Patch Changes

- [`bd2fa06042`](https://bitbucket.org/atlassian/atlassian-frontend/commits/bd2fa06042) - Re-generated icons using newer version of build process, and added missing 'archive' and 'mobile' buttons

---

### @atlaskit/smart-card@14.8.2

#### Patch Changes

- [`eda409bf20`](https://bitbucket.org/atlassian/atlassian-frontend/commits/eda409bf20) - Handle network errors in smart-card client
- Updated dependencies

---

### @atlassian/commerce-billing-details@1.0.2

#### Patch Changes

- [`4ed36bdb03`](https://bitbucket.org/atlassian/atlassian-frontend/commits/4ed36bdb03) - Add underlaying api docs to services

---

### @atlassian/commerce-billing-history@1.0.1

#### Patch Changes

- [`4ed36bdb03`](https://bitbucket.org/atlassian/atlassian-frontend/commits/4ed36bdb03) - Add underlaying api docs to services

---

### @atlassian/commerce-environment@1.0.1

#### Patch Changes

- [`4ed36bdb03`](https://bitbucket.org/atlassian/atlassian-frontend/commits/4ed36bdb03) - Add underlaying api docs to services

---

### @atlassian/commerce-payment-flow@2.1.1

#### Patch Changes

- [`4ed36bdb03`](https://bitbucket.org/atlassian/atlassian-frontend/commits/4ed36bdb03) - Add underlaying api docs to services

---

### @atlassian/commerce-payment-methods@1.1.2

#### Patch Changes

- [`4ed36bdb03`](https://bitbucket.org/atlassian/atlassian-frontend/commits/4ed36bdb03) - Add underlaying api docs to services

---

### @atlassian/pipelines-editor@0.10.13

#### Patch Changes

- Updated dependencies

---

### @atlassian/pipelines-runners-management@0.1.2

#### Patch Changes

- Updated dependencies

---

### @atlassian/pipelines-runners-wizard@3.4.1

#### Patch Changes

- Updated dependencies
