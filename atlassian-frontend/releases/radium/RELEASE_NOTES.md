# Radium Release

## Summary

| Package                                 | Type  | Change             | Number of changes |
| --------------------------------------- | ----- | ------------------ | ----------------: |
| @atlaskit/editor-core                   | major | 121.0.0 -> 122.0.0 |                10 |
| @atlaskit/renderer                      | major | 57.0.0 -> 58.0.0   |                 2 |
| @atlaskit/codemod-cli                   | minor | 0.2.0 -> 0.3.0     |                 1 |
| @atlaskit/editor-common                 | minor | 45.0.0 -> 45.1.0   |                 5 |
| @atlaskit/editor-mobile-bridge          | minor | 12.1.0 -> 12.2.0   |                 2 |
| @atlaskit/editor-wikimarkup-transformer | minor | 5.3.1 -> 5.4.0     |                 1 |
| @atlaskit/flag                          | minor | 12.3.10 -> 12.4.0  |                 1 |
| @atlaskit/router                        | minor | 0.8.0 -> 0.9.0     |                 1 |
| @atlaskit/task-decision                 | minor | 16.0.10 -> 16.1.0  |                 1 |
| @atlaskit/comment                       | patch | 9.3.3 -> 9.3.4     |                 0 |
| @atlaskit/conversation                  | patch | 15.7.2 -> 15.7.3   |                 0 |
| @atlaskit/editor-bitbucket-transformer  | patch | 6.3.2 -> 6.3.3     |                 0 |
| @atlaskit/editor-confluence-transformer | patch | 7.3.17 -> 7.3.18   |                 0 |
| @atlaskit/editor-extension-dropbox      | patch | 0.1.5 -> 0.1.6     |                 1 |
| @atlaskit/editor-jira-transformer       | patch | 7.2.23 -> 7.2.24   |                 0 |
| @atlaskit/editor-json-transformer       | patch | 7.0.10 -> 7.0.11   |                 0 |
| @atlaskit/editor-markdown-transformer   | patch | 3.1.21 -> 3.1.22   |                 0 |
| @atlaskit/embedded-document             | patch | 0.6.18 -> 0.6.19   |                 0 |
| @atlaskit/icon                          | patch | 20.1.0 -> 20.1.1   |                 1 |
| @atlaskit/media-card                    | patch | 67.2.0 -> 67.2.1   |                 1 |
| @atlaskit/media-ui                      | patch | 12.1.0 -> 12.1.1   |                 1 |
| @atlaskit/pagination                    | patch | 12.0.19 -> 12.0.20 |                 1 |
| @atlaskit/portal                        | patch | 3.1.7 -> 3.1.8     |                 1 |
| @atlaskit/progress-bar                  | patch | 0.2.7 -> 0.2.8     |                 1 |
| @atlaskit/progress-indicator            | patch | 7.0.13 -> 7.0.14   |                 1 |
| @atlaskit/radio                         | patch | 3.2.0 -> 3.2.1     |                 1 |
| @atlaskit/section-message               | patch | 4.1.7 -> 4.1.8     |                 1 |
| @atlaskit/tag-group                     | patch | 9.0.6 -> 9.0.7     |                 1 |
| @atlaskit/textarea                      | patch | 2.2.7 -> 2.2.8     |                 1 |
| @atlaskit/textfield                     | patch | 3.1.9 -> 3.1.10    |                 1 |
| @atlassian/forge-ui-core                | patch | 0.13.4 -> 0.13.5   |                 0 |
| @atlassian/xen-editor-provider          | patch | 8.10.12 -> 8.10.13 |                 0 |

## Details

---

### @atlaskit/editor-core@122.0.0

#### Major Changes

- [`e97f14eade`](https://bitbucket.org/atlassian/atlassian-frontend/commits/e97f14eade) - ED-9155: Rename prop `extensionParams` to `node` in the extensions api v2

#### Minor Changes

- [`d16adc8554`](https://bitbucket.org/atlassian/atlassian-frontend/commits/d16adc8554) - ED-8988 Add new selection plugin which will be responsible for managing selection styles
- [`8bc9f3e9af`](https://bitbucket.org/atlassian/atlassian-frontend/commits/8bc9f3e9af) - ED-8942: Changed default font size for full width editor and renderer

  - Previously default font size for full page editor was 14px. Now, when `allowDynamicTextSizing` is disabled it equals to 16px.
  - Font size in table was 14px, ignoring dynamic text sizing font size, after this change it follows the same rules as the rest of the editor, namely it will get updated font size.

#### Patch Changes

- [`cd68434a24`](https://bitbucket.org/atlassian/atlassian-frontend/commits/cd68434a24) - Enable shouldOpenMediaViewer property for ReactRenderer in Kitchen Sink example
- [`4b4a969816`](https://bitbucket.org/atlassian/atlassian-frontend/commits/4b4a969816) - ED-9140 validate inline comment selection only when entering draft mode
- [`51ce392f61`](https://bitbucket.org/atlassian/atlassian-frontend/commits/51ce392f61) - ED-8358 Change decision to use a grey background
- [`4cac8c6496`](https://bitbucket.org/atlassian/atlassian-frontend/commits/4cac8c6496) - ED-9093 Fix date picker not closing when selecting other nodes
- [`abc9b1df18`](https://bitbucket.org/atlassian/atlassian-frontend/commits/abc9b1df18) - ED-9116 inline-comments: draft comment analytics - fill in overlaps and inputMethod data
- [`db7f76a26c`](https://bitbucket.org/atlassian/atlassian-frontend/commits/db7f76a26c) - ED-9144: Keep context panel open when cursor is inside a bodied extension
- [`12cd8f8c1b`](https://bitbucket.org/atlassian/atlassian-frontend/commits/12cd8f8c1b) - ED-9048: Allow consumers to open the config after inserting an extension
- Updated dependencies

---

### @atlaskit/renderer@58.0.0

#### Major Changes

- [`e97f14eade`](https://bitbucket.org/atlassian/atlassian-frontend/commits/e97f14eade) - ED-9155: Rename prop `extensionParams` to `node` in the extensions api v2

#### Minor Changes

- [`8bc9f3e9af`](https://bitbucket.org/atlassian/atlassian-frontend/commits/8bc9f3e9af) - ED-8942: Changed default font size for full width editor and renderer

  - Previously default font size for full page editor was 14px. Now, when `allowDynamicTextSizing` is disabled it equals to 16px.
  - Font size in table was 14px, ignoring dynamic text sizing font size, after this change it follows the same rules as the rest of the editor, namely it will get updated font size.

#### Patch Changes

- Updated dependencies

---

### @atlaskit/codemod-cli@0.3.0

#### Minor Changes

- [`332a418dd1`](https://bitbucket.org/atlassian/atlassian-frontend/commits/332a418dd1) - Adds the concept of presets to act as a library of codemods relevant to an entire library or repo rather than specific component codemods. Also introduces the styled-to-emotion codemod

---

### @atlaskit/editor-common@45.1.0

#### Minor Changes

- [`e97f14eade`](https://bitbucket.org/atlassian/atlassian-frontend/commits/e97f14eade) - ED-9155: Rename prop `extensionParams` to `node` in the extensions api v2
- [`d16adc8554`](https://bitbucket.org/atlassian/atlassian-frontend/commits/d16adc8554) - ED-8988 Export more selection style variables
- [`8bc9f3e9af`](https://bitbucket.org/atlassian/atlassian-frontend/commits/8bc9f3e9af) - ED-8942: Changed default font size for full width editor and renderer

  - Previously default font size for full page editor was 14px. Now, when `allowDynamicTextSizing` is disabled it equals to 16px.
  - Font size in table was 14px, ignoring dynamic text sizing font size, after this change it follows the same rules as the rest of the editor, namely it will get updated font size.

#### Patch Changes

- [`51ce392f61`](https://bitbucket.org/atlassian/atlassian-frontend/commits/51ce392f61) - ED-8358 Change decision to use a grey background
- [`12cd8f8c1b`](https://bitbucket.org/atlassian/atlassian-frontend/commits/12cd8f8c1b) - ED-9048: Allow consumers to open the config after inserting an extension
- Updated dependencies

---

### @atlaskit/editor-mobile-bridge@12.2.0

#### Minor Changes

- [`e7f20b8b8f`](https://bitbucket.org/atlassian/atlassian-frontend/commits/e7f20b8b8f) - Adding support for `locale` provided through query params and loading proper translations in hybrid editor
- [`02a2790b28`](https://bitbucket.org/atlassian/atlassian-frontend/commits/02a2790b28) - Introduce new `getElementScrollOffset` method that supports heading and returns x/y offset coordinates as a string.
  Old method `getElementScrollOffsetY` is now deprecated.

#### Patch Changes

- Updated dependencies

---

### @atlaskit/editor-wikimarkup-transformer@5.4.0

#### Minor Changes

- [`d0051d49a6`](https://bitbucket.org/atlassian/atlassian-frontend/commits/d0051d49a6) - Conversion mapping has been made case insensitive

#### Patch Changes

- Updated dependencies

---

### @atlaskit/flag@12.4.0

#### Minor Changes

- [`958b2bf6f8`](https://bitbucket.org/atlassian/atlassian-frontend/commits/958b2bf6f8) - FIX: Screen reader text won't be rendered when there is no flag
  FIX: FlagGroup screen reader text defaults to `h2` tag now. Was previously h1.
  NEW: Customize screen reader text and the tag that renders the text

#### Patch Changes

- Updated dependencies

---

### @atlaskit/router@0.9.0

#### Minor Changes

- [`75269bbcec`](https://bitbucket.org/atlassian/atlassian-frontend/commits/75269bbcec) - Remove history listeners on unmount and bump react-sweet-state to 2.1.1

---

### @atlaskit/task-decision@16.1.0

#### Minor Changes

- [`51ce392f61`](https://bitbucket.org/atlassian/atlassian-frontend/commits/51ce392f61) - ED-8358 Change decision to use a grey background

#### Patch Changes

- Updated dependencies

---

### @atlaskit/comment@9.3.4

#### Patch Changes

- Updated dependencies

---

### @atlaskit/conversation@15.7.3

#### Patch Changes

- Updated dependencies

---

### @atlaskit/editor-bitbucket-transformer@6.3.3

#### Patch Changes

- Updated dependencies

---

### @atlaskit/editor-confluence-transformer@7.3.18

#### Patch Changes

- Updated dependencies

---

### @atlaskit/editor-extension-dropbox@0.1.6

#### Patch Changes

- [`d7c0ccbb4e`](https://bitbucket.org/atlassian/atlassian-frontend/commits/d7c0ccbb4e) - ED-9173 Update Dropbox extension description
- Updated dependencies

---

### @atlaskit/editor-jira-transformer@7.2.24

#### Patch Changes

- Updated dependencies

---

### @atlaskit/editor-json-transformer@7.0.11

#### Patch Changes

- Updated dependencies

---

### @atlaskit/editor-markdown-transformer@3.1.22

#### Patch Changes

- Updated dependencies

---

### @atlaskit/embedded-document@0.6.19

#### Patch Changes

- Updated dependencies

---

### @atlaskit/icon@20.1.1

#### Patch Changes

- [`eae51ceead`](https://bitbucket.org/atlassian/atlassian-frontend/commits/eae51ceead) - Add mobile icon
- Updated dependencies

---

### @atlaskit/media-card@67.2.1

#### Patch Changes

- [`128b80c4ba`](https://bitbucket.org/atlassian/atlassian-frontend/commits/128b80c4ba) - Changing the way error analytics are fired for unpreviewable files, as an undefined mediatype is classified as 'unpreviewable'
- Updated dependencies

---

### @atlaskit/media-ui@12.1.1

#### Patch Changes

- [`08ae8cdf2f`](https://bitbucket.org/atlassian/atlassian-frontend/commits/08ae8cdf2f) - Update styling for unauthorised inline cards
- Updated dependencies

---

### @atlaskit/pagination@12.0.20

#### Patch Changes

- [`83dad3770b`](https://bitbucket.org/atlassian/atlassian-frontend/commits/83dad3770b) - Change imports to comply with Atlassian conventions
- Updated dependencies

---

### @atlaskit/portal@3.1.8

#### Patch Changes

- [`4069606178`](https://bitbucket.org/atlassian/atlassian-frontend/commits/4069606178) - Change imports to comply with Atlassian conventions
- Updated dependencies

---

### @atlaskit/progress-bar@0.2.8

#### Patch Changes

- [`974d594a23`](https://bitbucket.org/atlassian/atlassian-frontend/commits/974d594a23) - Change imports to comply with Atlassian conventions

---

### @atlaskit/progress-indicator@7.0.14

#### Patch Changes

- [`daca23ef29`](https://bitbucket.org/atlassian/atlassian-frontend/commits/daca23ef29) - Change imports to comply with Atlassian conventions

---

### @atlaskit/radio@3.2.1

#### Patch Changes

- [`966efe3f95`](https://bitbucket.org/atlassian/atlassian-frontend/commits/966efe3f95) - Change imports to comply with Atlassian conventions
- Updated dependencies

---

### @atlaskit/section-message@4.1.8

#### Patch Changes

- [`229d05754b`](https://bitbucket.org/atlassian/atlassian-frontend/commits/229d05754b) - Change imports to comply with Atlassian conventions
- Updated dependencies

---

### @atlaskit/tag-group@9.0.7

#### Patch Changes

- [`e1f57427e0`](https://bitbucket.org/atlassian/atlassian-frontend/commits/e1f57427e0) - Change imports to comply with Atlassian conventions

---

### @atlaskit/textarea@2.2.8

#### Patch Changes

- [`7aa4756beb`](https://bitbucket.org/atlassian/atlassian-frontend/commits/7aa4756beb) - Change imports to comply with Atlassian conventions
- Updated dependencies

---

### @atlaskit/textfield@3.1.10

#### Patch Changes

- [`83f4f94df3`](https://bitbucket.org/atlassian/atlassian-frontend/commits/83f4f94df3) - Change imports to comply with Atlassian conventions
- Updated dependencies

---

### @atlassian/forge-ui-core@0.13.5

#### Patch Changes

- Updated dependencies

---

### @atlassian/xen-editor-provider@8.10.13

#### Patch Changes

- Updated dependencies
