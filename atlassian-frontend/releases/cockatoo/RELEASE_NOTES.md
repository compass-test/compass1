# Cockatoo Release

## Summary

| Package                                 | Type  | Change             | Number of changes |
| --------------------------------------- | ----- | ------------------ | ----------------: |
| @atlaskit/comment                       | none  | 10.0.5 -> 10.0.5   |                 0 |
| @atlaskit/task-decision                 | none  | 17.0.8 -> 17.0.8   |                 0 |
| @atlaskit/editor-common                 | major | 52.0.0 -> 53.0.0   |                 8 |
| @atlaskit/editor-core                   | major | 133.0.0 -> 134.0.0 |                24 |
| @atlaskit/renderer                      | major | 69.1.0 -> 70.0.0   |                 8 |
| @atlaskit/adf-schema                    | minor | 13.2.0 -> 13.3.0   |                 5 |
| @atlaskit/collab-provider               | minor | 4.0.0 -> 4.1.0     |                 2 |
| @atlaskit/editor-mobile-bridge          | minor | 20.0.1 -> 20.1.0   |                 3 |
| @atlaskit/media-card                    | minor | 70.0.0 -> 70.1.0   |                 3 |
| @atlaskit/media-client                  | minor | 12.0.0 -> 12.1.0   |                 1 |
| @atlaskit/media-common                  | minor | 2.3.0 -> 2.4.0     |                 1 |
| @atlaskit/media-test-helpers            | minor | 28.3.1 -> 28.4.0   |                 1 |
| @atlaskit/media-ui                      | minor | 14.2.1 -> 14.3.0   |                 2 |
| @atlaskit/mention                       | minor | 19.0.9 -> 19.1.0   |                 1 |
| @atlaskit/select                        | minor | 13.0.6 -> 13.1.0   |                 1 |
| @atlaskit/smart-card                    | minor | 14.5.0 -> 14.6.0   |                 3 |
| @atlaskit/tabs                          | minor | 12.0.6 -> 12.1.0   |                 1 |
| @atlaskit/util-data-test                | minor | 14.0.4 -> 14.1.0   |                 1 |
| @atlaskit/atlassian-navigation          | patch | 0.12.2 -> 0.12.3   |                 1 |
| @atlaskit/avatar                        | patch | 20.0.6 -> 20.0.7   |                 1 |
| @atlaskit/conversation                  | patch | 16.0.11 -> 16.0.12 |                 0 |
| @atlaskit/editor-bitbucket-transformer  | patch | 7.1.2 -> 7.1.3     |                 0 |
| @atlaskit/editor-confluence-transformer | patch | 8.1.2 -> 8.1.3     |                 1 |
| @atlaskit/editor-extension-dropbox      | patch | 0.2.8 -> 0.2.9     |                 0 |
| @atlaskit/editor-jira-transformer       | patch | 8.1.2 -> 8.1.3     |                 1 |
| @atlaskit/editor-json-transformer       | patch | 8.4.2 -> 8.4.3     |                 1 |
| @atlaskit/editor-markdown-transformer   | patch | 4.1.2 -> 4.1.3     |                 0 |
| @atlaskit/editor-shared-styles          | patch | 1.1.5 -> 1.1.6     |                 1 |
| @atlaskit/editor-wikimarkup-transformer | patch | 8.3.3 -> 8.3.4     |                 1 |
| @atlaskit/embedded-document             | patch | 0.7.9 -> 0.7.10    |                 0 |
| @atlaskit/media-viewer                  | patch | 45.5.0 -> 45.5.1   |                 1 |
| @atlassian/bitbucket-pipelines-filters  | patch | 0.2.2 -> 0.2.3     |                 0 |
| @atlassian/forge-ui-text-renderer       | patch | 2.0.11 -> 2.0.12   |                 0 |
| @atlassian/search-provider              | patch | 2.1.6 -> 2.1.7     |                 0 |
| @atlassian/synchrony-delta-to-steps     | patch | 2.0.2 -> 2.0.3     |                 1 |
| @atlassian/xen-editor-provider          | patch | 10.5.2 -> 10.5.3   |                 0 |

## Details

---

---

---

### @atlaskit/editor-common@53.0.0

#### Major Changes

- [`9f81260dd5`](https://bitbucket.org/atlassian/atlassian-frontend/commits/9f81260dd5) - ED-10683 Serialize number fields to Number instead of String
- [`835810cac7`](https://bitbucket.org/atlassian/atlassian-frontend/commits/835810cac7) - ED-10646 prevent nested Fieldset definitions

#### Minor Changes

- [`318b6a8f52`](https://bitbucket.org/atlassian/atlassian-frontend/commits/318b6a8f52) - ED-10612 Use strategy as absolute to fix the inconsistency in tooltip position in ios for unsupported content.
- [`28e97db5a7`](https://bitbucket.org/atlassian/atlassian-frontend/commits/28e97db5a7) - TWISTA-407 Expose the Confluence index match API to native. On applying draft mode, the bridge will call `annotationIndexMatch` with the `numMatch`, `matchIndex`, `originalSelection` tuple that is required by Confluence.

#### Patch Changes

- [`0175a00afc`](https://bitbucket.org/atlassian/atlassian-frontend/commits/0175a00afc) - [ED-10670] Update prosemirror-model type to use posAtIndex methods
- [`09394e2986`](https://bitbucket.org/atlassian/atlassian-frontend/commits/09394e2986) - EDM-668: exporting types for better typings support in Editor Core
- [`d6c23f1886`](https://bitbucket.org/atlassian/atlassian-frontend/commits/d6c23f1886) - Added dark mode support to table cell background colors
- [`619b3234fa`](https://bitbucket.org/atlassian/atlassian-frontend/commits/619b3234fa) - Improve the contrast of inline annotation styling in dark mode
- Updated dependencies

---

### @atlaskit/editor-core@134.0.0

#### Major Changes

- [`9f81260dd5`](https://bitbucket.org/atlassian/atlassian-frontend/commits/9f81260dd5) - ED-10683 Serialize number fields to Number instead of String

#### Minor Changes

- [`af832a83e8`](https://bitbucket.org/atlassian/atlassian-frontend/commits/af832a83e8) - [ED-10671] Predictable Lists: Fix Paste Lists inside of panels

  ### Before

  Insert lists inside of at the begin of a panel was removing the panel

  ### Now

  It is adding the lists right before the current content

- [`22791ceed0`](https://bitbucket.org/atlassian/atlassian-frontend/commits/22791ceed0) - [ux] - added new properites in MentionResource interface to support invite from mention experiment

  - updated util-data-test/mention to enable invite from mention experiment
  - added invite from mention experiment logic into editor-core

- [`125571bf8e`](https://bitbucket.org/atlassian/atlassian-frontend/commits/125571bf8e) - ED-10725: Add an experimental support of a modern analytics context to editor core

#### Patch Changes

- [`386ef3f839`](https://bitbucket.org/atlassian/atlassian-frontend/commits/386ef3f839) - ED-10759 Refactor click area block & mobile
- [`0175a00afc`](https://bitbucket.org/atlassian/atlassian-frontend/commits/0175a00afc) - [ED-10670] Update prosemirror-model type to use posAtIndex methods
- [`53e72c45d1`](https://bitbucket.org/atlassian/atlassian-frontend/commits/53e72c45d1) - [ux] [ED-10879] Fix pasting invalid nodes into panel
- [`ff4b80f248`](https://bitbucket.org/atlassian/atlassian-frontend/commits/ff4b80f248) - [ux] [ED-10675] Fix conversion when selection contains a list but has a paragraph on one or both ends
- [`23ad8adc0e`](https://bitbucket.org/atlassian/atlassian-frontend/commits/23ad8adc0e) - ED-10555 Add ContextIdentifierProvider to performance analytics
- [`af0d9c0965`](https://bitbucket.org/atlassian/atlassian-frontend/commits/af0d9c0965) - EDM-668: fixes a bug wherein pasting too many Smart Links causes the event loop to become overwhelmed.

  The fix is documented below for future reference.

  #### Cause

  When pasting a large number of Smart Links, a ProseMirror transaction is created for each link paste. This kicks off an asynchronous JavaScript task, in which the ADF representation of the link is fetched from the `EditorCardProvider`.

  As a consequence, when pasting 10/50/100 links, the macrotask queue is overwhelmed with asynchronous tasks.

  #### Solution

  To resolve this issue, a queuing mechanism separate to the macrotask queue is utilised, to ensure each asynchronous call is non-blocking and does not cause the browser to lock up with an overwhelmed macrotask queue.

  The mechanism utilised is `requestAnimationFrame`, using the `raf-schd` library. This is a common technique in the `@atlaskit/editor-core` codebase, which allows for asynchronous transactions to be invoked in quick succession without blocking interactivity.

  ***

  Thanks to @Vijay for being a legend in pairing on this one!

- [`33b8b7d85b`](https://bitbucket.org/atlassian/atlassian-frontend/commits/33b8b7d85b) - ED-9860: Unskip and fix editor-core media unit tests
- [`d48b343171`](https://bitbucket.org/atlassian/atlassian-frontend/commits/d48b343171) - [ED-10670] Predictable-List: Make sure if you copy a list into different list type it considers the target list
- [`50066eafe6`](https://bitbucket.org/atlassian/atlassian-frontend/commits/50066eafe6) - ED-10764 fix title field behaviour in full page example
- [`db4e6ab0d4`](https://bitbucket.org/atlassian/atlassian-frontend/commits/db4e6ab0d4) - EDM-1388: Toggle link mark on media and not mediaSingle
- [`be5392f4a4`](https://bitbucket.org/atlassian/atlassian-frontend/commits/be5392f4a4) - EDM-1395: Update analytic subject names for image linking
- [`815038b225`](https://bitbucket.org/atlassian/atlassian-frontend/commits/815038b225) - [ux] ED-10796 Fix selection changes over multiple paragraphs being ignored in expands
- [`691edb5246`](https://bitbucket.org/atlassian/atlassian-frontend/commits/691edb5246) - [ux] [ED-10479] Copy & Paste for Lists: Prevent empty list item insertion when pasting into a text selection across nested levels
- [`9d3a706bb8`](https://bitbucket.org/atlassian/atlassian-frontend/commits/9d3a706bb8) - Ignore search when input is a URL
- [`48c56025fa`](https://bitbucket.org/atlassian/atlassian-frontend/commits/48c56025fa) - move selection based node view into new file
- [`3c263cb2df`](https://bitbucket.org/atlassian/atlassian-frontend/commits/3c263cb2df) - Added error handling when calling media client getCurrentState()
- [`b9b9d2aad2`](https://bitbucket.org/atlassian/atlassian-frontend/commits/b9b9d2aad2) - TED-558: improved invite item selection by space pressed
- [`24a0f89239`](https://bitbucket.org/atlassian/atlassian-frontend/commits/24a0f89239) - [ED-10992] Predictable Lists: Add analytics to fix sibling list appendTransaction
- [`5fb3d63c3f`](https://bitbucket.org/atlassian/atlassian-frontend/commits/5fb3d63c3f) - Bump dompurify to prevent XSS vulnerability and prefer alternative architecture
- [`f50e5d16b1`](https://bitbucket.org/atlassian/atlassian-frontend/commits/f50e5d16b1) - CMB-2438: Added dark mode VR tests for tables in both Editor and Renderer
- Updated dependencies

---

### @atlaskit/renderer@70.0.0

#### Minor Changes

- [`28e97db5a7`](https://bitbucket.org/atlassian/atlassian-frontend/commits/28e97db5a7) - TWISTA-407 Expose the Confluence index match API to native. On applying draft mode, the bridge will call `annotationIndexMatch` with the `numMatch`, `matchIndex`, `originalSelection` tuple that is required by Confluence.
- [`d13ccbd6c3`](https://bitbucket.org/atlassian/atlassian-frontend/commits/d13ccbd6c3) - [ux][twista-523] Fixed a bug in Safari/iOS where inline comment overlapping link would open url into current webView

#### Patch Changes

- [`0175a00afc`](https://bitbucket.org/atlassian/atlassian-frontend/commits/0175a00afc) - [ED-10670] Update prosemirror-model type to use posAtIndex methods
- [`d6c23f1886`](https://bitbucket.org/atlassian/atlassian-frontend/commits/d6c23f1886) - Added dark mode support to table cell background colors
- [`7ba05e4164`](https://bitbucket.org/atlassian/atlassian-frontend/commits/7ba05e4164) - EDM-1372: Default to akEditorFullPageMaxWidth when WidthConsumer is 0
- [`be5392f4a4`](https://bitbucket.org/atlassian/atlassian-frontend/commits/be5392f4a4) - EDM-1395: Update analytic subject names for image linking
- [`3c263cb2df`](https://bitbucket.org/atlassian/atlassian-frontend/commits/3c263cb2df) - Added error handling when calling media client getCurrentState()
- [`f50e5d16b1`](https://bitbucket.org/atlassian/atlassian-frontend/commits/f50e5d16b1) - CMB-2438: Added dark mode VR tests for tables in both Editor and Renderer
- Updated dependencies

---

### @atlaskit/adf-schema@13.3.0

#### Minor Changes

- [`4fdb9762af`](https://bitbucket.org/atlassian/atlassian-frontend/commits/4fdb9762af) - ED-10792: allow shouldExclude() to work on enum values

#### Patch Changes

- [`0175a00afc`](https://bitbucket.org/atlassian/atlassian-frontend/commits/0175a00afc) - [ED-10670] Update prosemirror-model type to use posAtIndex methods
- [`a242048609`](https://bitbucket.org/atlassian/atlassian-frontend/commits/a242048609) - Re-enable adf schema backwards compatibility check
- [`d6c23f1886`](https://bitbucket.org/atlassian/atlassian-frontend/commits/d6c23f1886) - Added dark mode support to table cell background colors
- [`db4e6ab0d4`](https://bitbucket.org/atlassian/atlassian-frontend/commits/db4e6ab0d4) - EDM-1388: Toggle link mark on media and not mediaSingle

---

### @atlaskit/collab-provider@4.1.0

#### Minor Changes

- [`c3ce422cd4`](https://bitbucket.org/atlassian/atlassian-frontend/commits/c3ce422cd4) - COLLAB-11-trigger-catchup-5s
- [`474b09e4c0`](https://bitbucket.org/atlassian/atlassian-frontend/commits/474b09e4c0) - COLLAB-11 steps rejected error handler

#### Patch Changes

- Updated dependencies

---

### @atlaskit/editor-mobile-bridge@20.1.0

#### Minor Changes

- [`277c2d52d3`](https://bitbucket.org/atlassian/atlassian-frontend/commits/277c2d52d3) - [ux] ED-10815 Enable localization in hybrid renderer
- [`474b09e4c0`](https://bitbucket.org/atlassian/atlassian-frontend/commits/474b09e4c0) - COLLAB-11 steps rejected error handler
- [`28e97db5a7`](https://bitbucket.org/atlassian/atlassian-frontend/commits/28e97db5a7) - TWISTA-407 Expose the Confluence index match API to native. On applying draft mode, the bridge will call `annotationIndexMatch` with the `numMatch`, `matchIndex`, `originalSelection` tuple that is required by Confluence.

#### Patch Changes

- Updated dependencies

---

### @atlaskit/media-card@70.1.0

#### Minor Changes

- [`aac7ffcb97`](https://bitbucket.org/atlassian/atlassian-frontend/commits/aac7ffcb97) - [ux] While a file has a 'processing' filestate, we now alert the user that we are creating the preview. This signifies to the user that they can download & view a file while the preview is being generated (i.e they don't have to wait). Also added a 'Failed Processing' UI state, for when a preview cannot be generated and is thus unavailable

#### Patch Changes

- [`b124464476`](https://bitbucket.org/atlassian/atlassian-frontend/commits/b124464476) - Fixing bug. Text should be "Preview unavailable" not "Preview Unavailable"
- [`a1c2bf2e45`](https://bitbucket.org/atlassian/atlassian-frontend/commits/a1c2bf2e45) - pass originalDimensions to inline video player
- Updated dependencies

---

### @atlaskit/media-client@12.1.0

#### Minor Changes

- [`3c263cb2df`](https://bitbucket.org/atlassian/atlassian-frontend/commits/3c263cb2df) - Added error handling when calling media client getCurrentState()

#### Patch Changes

- Updated dependencies

---

### @atlaskit/media-common@2.4.0

#### Minor Changes

- [`f2b871e61d`](https://bitbucket.org/atlassian/atlassian-frontend/commits/f2b871e61d) - expose NumericalCardDimensions from media-common

---

### @atlaskit/media-test-helpers@28.4.0

#### Minor Changes

- [`d6f279ecaa`](https://bitbucket.org/atlassian/atlassian-frontend/commits/d6f279ecaa) - Add support for video files in MediaMock

#### Patch Changes

- Updated dependencies

---

### @atlaskit/media-ui@14.3.0

#### Minor Changes

- [`0c0de3acae`](https://bitbucket.org/atlassian/atlassian-frontend/commits/0c0de3acae) - [EDM-341]: Add playback speed control to inline video player

#### Patch Changes

- [`b124464476`](https://bitbucket.org/atlassian/atlassian-frontend/commits/b124464476) - Fixing bug. Text should be "Preview unavailable" not "Preview Unavailable"
- Updated dependencies

---

### @atlaskit/mention@19.1.0

#### Minor Changes

- [`22791ceed0`](https://bitbucket.org/atlassian/atlassian-frontend/commits/22791ceed0) - [ux] - added new properites in MentionResource interface to support invite from mention experiment

  - updated util-data-test/mention to enable invite from mention experiment
  - added invite from mention experiment logic into editor-core

---

### @atlaskit/select@13.1.0

#### Minor Changes

- [`c3d2088249`](https://bitbucket.org/atlassian/atlassian-frontend/commits/c3d2088249) - expose GroupedOptionsType type

---

### @atlaskit/smart-card@14.6.0

#### Minor Changes

- [`950ed4f24c`](https://bitbucket.org/atlassian/atlassian-frontend/commits/950ed4f24c) - [ux] The embed card will now fallback to a inlineCard instead of blockCard in mobile

#### Patch Changes

- [`09394e2986`](https://bitbucket.org/atlassian/atlassian-frontend/commits/09394e2986) - EDM-668: exporting types for better typings support in Editor Core
- [`f5f91bc98d`](https://bitbucket.org/atlassian/atlassian-frontend/commits/f5f91bc98d) - ED-10417 Unskip smart link hooks tests
- Updated dependencies

---

### @atlaskit/tabs@12.1.0

#### Minor Changes

- [`98c957d889`](https://bitbucket.org/atlassian/atlassian-frontend/commits/98c957d889) - [ux] Content of tabs will be preserved on the DOM while switching between tabs

---

### @atlaskit/util-data-test@14.1.0

#### Minor Changes

- [`22791ceed0`](https://bitbucket.org/atlassian/atlassian-frontend/commits/22791ceed0) - [ux] - added new properites in MentionResource interface to support invite from mention experiment

  - updated util-data-test/mention to enable invite from mention experiment
  - added invite from mention experiment logic into editor-core

#### Patch Changes

- Updated dependencies

---

### @atlaskit/atlassian-navigation@0.12.3

#### Patch Changes

- [`cadfec2b52`](https://bitbucket.org/atlassian/atlassian-frontend/commits/cadfec2b52) - [ux] Introduced a new prop value in search field so that user can control it from outside and can change the value of search field.

---

### @atlaskit/avatar@20.0.7

#### Patch Changes

- [`5c1b4d64ef`](https://bitbucket.org/atlassian/atlassian-frontend/commits/5c1b4d64ef) - [ux] There were two browser specific issues in avatar component. 1- Misalignment in firefox (Interactive button avatar is incorrectly aligned) — To fix this we added font-size and font-family to button element. 2- Hover issue in safari (On hover avatar was showing rectangular background) — To fix this we have added border radius to avatar on hover.

---

### @atlaskit/conversation@16.0.12

#### Patch Changes

- Updated dependencies

---

### @atlaskit/editor-bitbucket-transformer@7.1.3

#### Patch Changes

- Updated dependencies

---

### @atlaskit/editor-confluence-transformer@8.1.3

#### Patch Changes

- [`0175a00afc`](https://bitbucket.org/atlassian/atlassian-frontend/commits/0175a00afc) - [ED-10670] Update prosemirror-model type to use posAtIndex methods
- Updated dependencies

---

### @atlaskit/editor-extension-dropbox@0.2.9

#### Patch Changes

- Updated dependencies

---

### @atlaskit/editor-jira-transformer@8.1.3

#### Patch Changes

- [`0175a00afc`](https://bitbucket.org/atlassian/atlassian-frontend/commits/0175a00afc) - [ED-10670] Update prosemirror-model type to use posAtIndex methods
- Updated dependencies

---

### @atlaskit/editor-json-transformer@8.4.3

#### Patch Changes

- [`0175a00afc`](https://bitbucket.org/atlassian/atlassian-frontend/commits/0175a00afc) - [ED-10670] Update prosemirror-model type to use posAtIndex methods
- Updated dependencies

---

### @atlaskit/editor-markdown-transformer@4.1.3

#### Patch Changes

- Updated dependencies

---

### @atlaskit/editor-shared-styles@1.1.6

#### Patch Changes

- [`d6c23f1886`](https://bitbucket.org/atlassian/atlassian-frontend/commits/d6c23f1886) - Added dark mode support to table cell background colors

---

### @atlaskit/editor-wikimarkup-transformer@8.3.4

#### Patch Changes

- [`0175a00afc`](https://bitbucket.org/atlassian/atlassian-frontend/commits/0175a00afc) - [ED-10670] Update prosemirror-model type to use posAtIndex methods
- Updated dependencies

---

### @atlaskit/embedded-document@0.7.10

#### Patch Changes

- Updated dependencies

---

### @atlaskit/media-viewer@45.5.1

#### Patch Changes

- [`b130ee1234`](https://bitbucket.org/atlassian/atlassian-frontend/commits/b130ee1234) - handle non-200 responses for codeViewer
- Updated dependencies

---

### @atlassian/bitbucket-pipelines-filters@0.2.3

#### Patch Changes

- Updated dependencies

---

### @atlassian/forge-ui-text-renderer@2.0.12

#### Patch Changes

- Updated dependencies

---

### @atlassian/search-provider@2.1.7

#### Patch Changes

- Updated dependencies

---

### @atlassian/synchrony-delta-to-steps@2.0.3

#### Patch Changes

- [`0175a00afc`](https://bitbucket.org/atlassian/atlassian-frontend/commits/0175a00afc) - [ED-10670] Update prosemirror-model type to use posAtIndex methods

---

### @atlassian/xen-editor-provider@10.5.3

#### Patch Changes

- Updated dependencies
