# Uranium Release

## Summary

| Package                                 | Type  | Change             | Number of changes |
| --------------------------------------- | ----- | ------------------ | ----------------: |
| @atlaskit/collab-provider               | major | 1.0.1 -> 2.0.0     |                 4 |
| @atlaskit/media-client                  | major | 6.2.0 -> 7.0.0     |                 2 |
| @atlaskit/media-table                   | major | 2.0.0 -> 3.0.0     |                 3 |
| @atlaskit/renderer                      | major | 60.0.0 -> 61.0.0   |                 7 |
| @atlaskit/toggle                        | major | 8.1.8 -> 9.0.0     |                 2 |
| @atlassian/forge-ui                     | major | 14.1.4 -> 15.0.0   |                 1 |
| @atlassian/forge-ui-core                | major | 1.13.0 -> 2.0.0    |                 2 |
| @atlaskit/adf-schema                    | minor | 10.0.0 -> 10.1.0   |                 1 |
| @atlaskit/editor-common                 | minor | 45.3.0 -> 45.4.0   |                 8 |
| @atlaskit/editor-core                   | minor | 124.0.0 -> 124.1.0 |                24 |
| @atlaskit/editor-mobile-bridge          | minor | 14.0.0 -> 14.1.0   |                10 |
| @atlaskit/media-ui                      | minor | 12.3.0 -> 12.4.0   |                 2 |
| @atlaskit/motion                        | minor | 0.2.4 -> 0.3.0     |                 1 |
| @atlaskit/onboarding                    | minor | 9.1.8 -> 9.2.0     |                 1 |
| @atlaskit/width-detector                | minor | 2.1.1 -> 2.2.0     |                 1 |
| @atlassian/xen-editor-provider          | minor | 9.2.4 -> 9.3.0     |                 1 |
| @atlaskit/atlassian-navigation          | patch | 0.10.9 -> 0.10.10  |                 1 |
| @atlaskit/avatar                        | patch | 18.0.0 -> 18.0.1   |                 0 |
| @atlaskit/avatar-group                  | patch | 6.0.0 -> 6.0.1     |                 0 |
| @atlaskit/conversation                  | patch | 15.7.6 -> 15.7.7   |                 0 |
| @atlaskit/datetime-picker               | patch | 9.4.4 -> 9.4.5     |                 1 |
| @atlaskit/dropdown-menu                 | patch | 9.0.4 -> 9.0.5     |                 1 |
| @atlaskit/dynamic-table                 | patch | 13.7.6 -> 13.7.7   |                 2 |
| @atlaskit/editor-wikimarkup-transformer | patch | 5.4.1 -> 5.4.2     |                 0 |
| @atlaskit/embedded-document             | patch | 0.6.21 -> 0.6.22   |                 0 |
| @atlaskit/emoji                         | patch | 62.8.1 -> 62.8.2   |                 0 |
| @atlaskit/form                          | patch | 7.3.0 -> 7.3.1     |                 1 |
| @atlaskit/global-navigation             | patch | 9.0.2 -> 9.0.3     |                 0 |
| @atlaskit/media-card                    | patch | 68.0.0 -> 68.0.1   |                 3 |
| @atlaskit/media-editor                  | patch | 37.0.10 -> 37.0.11 |                 1 |
| @atlaskit/media-filmstrip               | patch | 38.0.2 -> 38.0.3   |                 1 |
| @atlaskit/media-image                   | patch | 16.0.0 -> 16.0.1   |                 1 |
| @atlaskit/media-picker                  | patch | 54.1.4 -> 54.1.5   |                 2 |
| @atlaskit/media-test-helpers            | patch | 27.2.1 -> 27.2.2   |                 0 |
| @atlaskit/media-viewer                  | patch | 44.4.2 -> 44.4.3   |                 2 |
| @atlaskit/modal-dialog                  | patch | 10.6.0 -> 10.6.1   |                 3 |
| @atlaskit/navigation                    | patch | 36.0.5 -> 36.0.6   |                 0 |
| @atlaskit/navigation-next               | patch | 8.0.6 -> 8.0.7     |                 0 |
| @atlaskit/page                          | patch | 11.0.13 -> 11.0.14 |                 0 |
| @atlaskit/page-layout                   | patch | 0.4.0 -> 0.4.1     |                 0 |
| @atlaskit/rating                        | patch | 0.0.5 -> 0.0.6     |                 0 |
| @atlaskit/share                         | patch | 0.14.0 -> 0.14.1   |                 0 |
| @atlaskit/side-navigation               | patch | 0.5.4 -> 0.5.5     |                 0 |
| @atlaskit/smart-card                    | patch | 13.4.0 -> 13.4.1   |                 3 |
| @atlaskit/spinner                       | patch | 13.0.0 -> 13.0.1   |                 0 |
| @atlaskit/table-tree                    | patch | 8.0.4 -> 8.0.5     |                 1 |
| @atlaskit/task-decision                 | patch | 16.1.0 -> 16.1.1   |                 1 |
| @atlaskit/theme                         | patch | 9.5.3 -> 9.5.4     |                 1 |
| @atlassian/aux-test-utils               | patch | 3.3.3 -> 3.3.4     |                 1 |
| @atlassian/forge-ui-text-renderer       | patch | 1.0.1 -> 1.0.2     |                 0 |
| @atlassian/react-render-analyzer        | patch | 1.0.0 -> 1.0.1     |                 1 |

## Details

---

### @atlaskit/collab-provider@2.0.0

#### Major Changes

- [`3eb98cd820`](https://bitbucket.org/atlassian/atlassian-frontend/commits/3eb98cd820) - ED-9367 Add required config argument to `createSocket`

#### Minor Changes

- [`f90d5a351e`](https://bitbucket.org/atlassian/atlassian-frontend/commits/f90d5a351e) - ED-9367 Create entry point with a collab provider factory pre-configured with SocketIO
- [`f80f07b072`](https://bitbucket.org/atlassian/atlassian-frontend/commits/f80f07b072) - ED-9451 Support lifecycle emitter on configuration
- [`8814c0a119`](https://bitbucket.org/atlassian/atlassian-frontend/commits/8814c0a119) - ED-9451 Support for custom storage interface

#### Patch Changes

- Updated dependencies

---

### @atlaskit/media-client@7.0.0

#### Major Changes

- [`6658272d94`](https://bitbucket.org/atlassian/atlassian-frontend/commits/6658272d94) - Remove Promise<string> from FileIdentifier to just be string

  ### Before

  ```
  FileIdentifier {
    id: string | Promise<string>;
  }
  ```

  ### Now

  ```
  FileIdentifier {
    id: string;
  }
  ```

#### Patch Changes

- [`328902687e`](https://bitbucket.org/atlassian/atlassian-frontend/commits/328902687e) - Remove stack traces from media analytic events

---

### @atlaskit/media-table@3.0.0

#### Major Changes

- [`198b19dcc7`](https://bitbucket.org/atlassian/atlassian-frontend/commits/198b19dcc7) - Refactor items to take a FileIdentifier instead of string id

#### Minor Changes

- [`f4b74d89c1`](https://bitbucket.org/atlassian/atlassian-frontend/commits/f4b74d89c1) - Add i18n support to media-table

#### Patch Changes

- [`51aa5587ef`](https://bitbucket.org/atlassian/atlassian-frontend/commits/51aa5587ef) - bump media-client: Remove stack traces from media analytic events
- Updated dependencies

---

### @atlaskit/renderer@61.0.0

#### Major Changes

- [`cd6af0a113`](https://bitbucket.org/atlassian/atlassian-frontend/commits/cd6af0a113) - CEMS-1040: rework sticky headers internally + match visual style to editor

  There is a breaking change to the `stickyHeaders.showStickyHeaders` prop. It has been renamed to `stickyHeaders.show`. You can also show sticky headers by passing a truthy value to `stickyHeaders`.

#### Minor Changes

- [`a4948958c4`](https://bitbucket.org/atlassian/atlassian-frontend/commits/a4948958c4) - [FM-3820] Implements to set annotation state event on Renderer
- [`ea81ff42a0`](https://bitbucket.org/atlassian/atlassian-frontend/commits/ea81ff42a0) - [FM-3819] Implements a subscriber API to allows set focus in an specific annotation

#### Patch Changes

- [`82053beb2d`](https://bitbucket.org/atlassian/atlassian-frontend/commits/82053beb2d) - ED-8944 fix: propagete width updates after scrolling
- [`1508cc97c9`](https://bitbucket.org/atlassian/atlassian-frontend/commits/1508cc97c9) - fix: lazy-rendering, React key, isFrameVisible in @atlaskit/renderer and click handlers for EmbedCard components.
- [`b95b4f6374`](https://bitbucket.org/atlassian/atlassian-frontend/commits/b95b4f6374) - CEMS-1067: fix breakout mode in mobile renderer appearance
- [`71a4de3370`](https://bitbucket.org/atlassian/atlassian-frontend/commits/71a4de3370) - ED-9524 Prevent right side shadow from overlapping product UI elements
- Updated dependencies

---

### @atlaskit/toggle@9.0.0

#### Major Changes

- [`74b9e80533`](https://bitbucket.org/atlassian/atlassian-frontend/commits/74b9e80533) - **BREAKING** - The `label` prop has been removed.
  If wanting to pair your toggle with a `label` element make sure to use the freshly introduced `id` prop!

  Before:

  ```js
  <Toggle label="Allow pull requests" />
  ```

  After (we use Emotion here - but you can use any equivalent library):

  ```js
  /** @jsx jsx */
  import { jsx } from '@emotion/core';
  import { visuallyHidden } from '@atlaskit/theme/constants';

  <label css={visuallyHidden()} htmlFor="my-toggle">Allow pull requests</label>
  <Toggle id="my-toggle" />
  ```

  This now also allows you to visually show a label (just omit the visually hidden mixin) -
  which for the most part you'll want to do.
  Read [the design docs](https://atlassian.design/guidelines/product/components/toggles) for more inspiration.

  Happy toggling!

#### Minor Changes

- [`5ab389c082`](https://bitbucket.org/atlassian/atlassian-frontend/commits/5ab389c082) - Adds an `id` prop for you to use with a pairing label element, for use like so:

  ```js
  import Toggle from '@atlaskit/toggle';

  <label htmlFor="my-toggle">Do the thing</label>
  <Toggle id="my-toggle" />
  ```

---

### @atlassian/forge-ui@15.0.0

#### Major Changes

- [`ce5bef6b34`](https://bitbucket.org/atlassian/atlassian-frontend/commits/ce5bef6b34) - Change API of getForgeUIExtensionsAsync to return an object, containing errors, as well as extensions.

#### Patch Changes

- Updated dependencies

---

### @atlassian/forge-ui-core@2.0.0

#### Major Changes

- [`4831e8e45f`](https://bitbucket.org/atlassian/atlassian-frontend/commits/4831e8e45f) - Breaking changes:

  - Change behaviour of getExtensionsFromGQLResult to return null instead of an empty array if loading or data is not in the right shape

  Other changes:

  - Export createMetalClient, isGQLGatewayError and isGQLUnderlyingServiceError
  - Refactor useExtensionList so that its API is the same despite the change to getExtensionsFromGQLResult
  - Add getForgeExtensionProvider SLI to SLOPlugin options

#### Patch Changes

- [`2b7740f062`](https://bitbucket.org/atlassian/atlassian-frontend/commits/2b7740f062) - Pass forge/toggle aria label prop to design-system/toggle checkedActionLabel & uncheckedActionLabel aria prop.
- Updated dependencies

---

### @atlaskit/adf-schema@10.1.0

#### Minor Changes

- [`01c27cf8cf`](https://bitbucket.org/atlassian/atlassian-frontend/commits/01c27cf8cf) - ED-9552 Move SetAttrsStep into adf-schema

---

### @atlaskit/editor-common@45.4.0

#### Minor Changes

- [`64d75b8f7e`](https://bitbucket.org/atlassian/atlassian-frontend/commits/64d75b8f7e) - Call getFieldsDefinition with extension parameters
- [`a4948958c4`](https://bitbucket.org/atlassian/atlassian-frontend/commits/a4948958c4) - [FM-3820] Implements to set annotation state event on Renderer
- [`ea81ff42a0`](https://bitbucket.org/atlassian/atlassian-frontend/commits/ea81ff42a0) - [FM-3819] Implements a subscriber API to allows set focus in an specific annotation

#### Patch Changes

- [`82053beb2d`](https://bitbucket.org/atlassian/atlassian-frontend/commits/82053beb2d) - ED-8944 fix: propagete width updates after scrolling
- [`73552b28ae`](https://bitbucket.org/atlassian/atlassian-frontend/commits/73552b28ae) - ED-8835 Use selection plugin to style smartlinks
- [`cd6af0a113`](https://bitbucket.org/atlassian/atlassian-frontend/commits/cd6af0a113) - CEMS-1040: rework sticky headers internally + match visual style to editor

  There is a breaking change to the `stickyHeaders.showStickyHeaders` prop. It has been renamed to `stickyHeaders.show`. You can also show sticky headers by passing a truthy value to `stickyHeaders`.

- [`71a4de3370`](https://bitbucket.org/atlassian/atlassian-frontend/commits/71a4de3370) - ED-9524 Prevent right side shadow from overlapping product UI elements
- [`234697357d`](https://bitbucket.org/atlassian/atlassian-frontend/commits/234697357d) - ED-9541 Change editor-common imports to comply with Atlassian conventions
- Updated dependencies

---

### @atlaskit/editor-core@124.1.0

#### Minor Changes

- [`64d75b8f7e`](https://bitbucket.org/atlassian/atlassian-frontend/commits/64d75b8f7e) - Call getFieldsDefinition with extension parameters
- [`a602a1a359`](https://bitbucket.org/atlassian/atlassian-frontend/commits/a602a1a359) - [FM-3814] Enables the mobile bridge to add two new blocks items: divider and expand

#### Patch Changes

- [`a614b880df`](https://bitbucket.org/atlassian/atlassian-frontend/commits/a614b880df) - [FM-3627] Fix bug in editor-mobile-bridge where it required two taps to trigger the 'Toggle Expand' button. Now it works with a single tap, and is consistent with the desktop web experience.
- [`89d31dbb00`](https://bitbucket.org/atlassian/atlassian-frontend/commits/89d31dbb00) - Change card/pm-plugins to render as dumblink with queued inline card
- [`29ffa9c4d0`](https://bitbucket.org/atlassian/atlassian-frontend/commits/29ffa9c4d0) - ED-9357 Fix links replacing text when text hasn't changed
- [`2c174200a5`](https://bitbucket.org/atlassian/atlassian-frontend/commits/2c174200a5) - Fix duplicate smart link and non-smart link analytics emitted from link typeahead menu
- [`5daf66df61`](https://bitbucket.org/atlassian/atlassian-frontend/commits/5daf66df61) - ED-9439: Do not store node in the state - get it from selection to avoid stale data
- [`1508cc97c9`](https://bitbucket.org/atlassian/atlassian-frontend/commits/1508cc97c9) - fix: lazy-rendering, React key, isFrameVisible in @atlaskit/renderer and click handlers for EmbedCard components.
- [`ea24b0ad90`](https://bitbucket.org/atlassian/atlassian-frontend/commits/ea24b0ad90) - ED-9341 restructured annotation plugin commands to avoid redundant dispatches
- [`c3729993fb`](https://bitbucket.org/atlassian/atlassian-frontend/commits/c3729993fb) - Image singles now show selected state when selected in a range
- [`01c27cf8cf`](https://bitbucket.org/atlassian/atlassian-frontend/commits/01c27cf8cf) - ED-9552 Move SetAttrsStep into adf-schema
- [`73552b28ae`](https://bitbucket.org/atlassian/atlassian-frontend/commits/73552b28ae) - ED-8835 Use selection plugin to style smartlinks
- [`ba7242598f`](https://bitbucket.org/atlassian/atlassian-frontend/commits/ba7242598f) - CEMS-378 load macro title from macroMetadata
- [`a1b1dc690e`](https://bitbucket.org/atlassian/atlassian-frontend/commits/a1b1dc690e) - ED-9373 Fix panel being selected when clicking between paragraphs inside
- [`9136a3e011`](https://bitbucket.org/atlassian/atlassian-frontend/commits/9136a3e011) - ED-9542 Change editor-core/plugins/{r-w} imports to comply with Atlassian conventions
- [`63ed17b2bf`](https://bitbucket.org/atlassian/atlassian-frontend/commits/63ed17b2bf) - ED-9343 close view comments component on delete
- [`7696db8259`](https://bitbucket.org/atlassian/atlassian-frontend/commits/7696db8259) - EDM-834: Fix toolbar not moving with aligned embeds
- [`71a4de3370`](https://bitbucket.org/atlassian/atlassian-frontend/commits/71a4de3370) - ED-9524 Prevent right side shadow from overlapping product UI elements
- [`613b7549e6`](https://bitbucket.org/atlassian/atlassian-frontend/commits/613b7549e6) - Element browser smart component, adding unit tests, and replacing element items css grid container with flexbox
- [`770984852a`](https://bitbucket.org/atlassian/atlassian-frontend/commits/770984852a) - add VR test to editor collab + add test-id to collab avatars
- [`d4220ca169`](https://bitbucket.org/atlassian/atlassian-frontend/commits/d4220ca169) - ED-9315: Ensures find/replace picks up partially styled or marked text when determining text matches
- [`bf155d0aa7`](https://bitbucket.org/atlassian/atlassian-frontend/commits/bf155d0aa7) - ED-9003 Use selection plugin to style block and bodied extensions
- [`363e3e6877`](https://bitbucket.org/atlassian/atlassian-frontend/commits/363e3e6877) - ED-9536 Add 'create' and 'delete' events to annotation event emitter
- [`b7a4b99d9c`](https://bitbucket.org/atlassian/atlassian-frontend/commits/b7a4b99d9c) - ED-9546 Add option to disable annotatios on whitespace

  Adds the option to disable creation of annotations on whitespace nodes. Note, this is per provider (see example). It will prevent annotation creation if any node in the current user selection is empty.

  ```
  <FullPageExample
    annotationProviders={{
      inlineComment: {
        ...
        disallowOnWhitespace: true,
      },
    }}
  />
  ```

- Updated dependencies

---

### @atlaskit/editor-mobile-bridge@14.1.0

#### Minor Changes

- [`2725c8ba93`](https://bitbucket.org/atlassian/atlassian-frontend/commits/2725c8ba93) - ED-9451 Pass lifecycle event emitter to colalb provider
- [`cbf6bfb3cb`](https://bitbucket.org/atlassian/atlassian-frontend/commits/cbf6bfb3cb) - ED-9367 Implement bridge integration to new collab service
- [`df5ac71588`](https://bitbucket.org/atlassian/atlassian-frontend/commits/df5ac71588) - ED-9451 Create and pass Native Storage into collab provider
- [`a4948958c4`](https://bitbucket.org/atlassian/atlassian-frontend/commits/a4948958c4) - [FM-3820] Implements to set annotation state event on Renderer
- [`a602a1a359`](https://bitbucket.org/atlassian/atlassian-frontend/commits/a602a1a359) - [FM-3814] Enables the mobile bridge to add two new blocks items: divider and expand
- [`ea81ff42a0`](https://bitbucket.org/atlassian/atlassian-frontend/commits/ea81ff42a0) - [FM-3819] Implements a subscriber API to allows set focus in an specific annotation

#### Patch Changes

- [`095d365eb2`](https://bitbucket.org/atlassian/atlassian-frontend/commits/095d365eb2) - Allow Embeds and Blocks in the Mobile Editor
- [`07d3b6667d`](https://bitbucket.org/atlassian/atlassian-frontend/commits/07d3b6667d) - [FM-3865] Fix: Starts to listen the setContent event before the react component be mounted
- [`29fa2d4985`](https://bitbucket.org/atlassian/atlassian-frontend/commits/29fa2d4985) - Improve global types for editor mobile bridge. Minor refactoring of sendToBridge method to utilise updated types. There shouldn't be any functional change.
- [`7524d31817`](https://bitbucket.org/atlassian/atlassian-frontend/commits/7524d31817) - ED-9367 Prevent from emitting an event with invalid payload
- Updated dependencies

---

### @atlaskit/media-ui@12.4.0

#### Minor Changes

- [`1508cc97c9`](https://bitbucket.org/atlassian/atlassian-frontend/commits/1508cc97c9) - fix: lazy-rendering, React key, isFrameVisible in @atlaskit/renderer and click handlers for EmbedCard components.

#### Patch Changes

- [`39d076a3bd`](https://bitbucket.org/atlassian/atlassian-frontend/commits/39d076a3bd) - fix: smart links inline loading state
- Updated dependencies

---

### @atlaskit/motion@0.3.0

#### Minor Changes

- [`dd275c9b81`](https://bitbucket.org/atlassian/atlassian-frontend/commits/dd275c9b81) - Added the option to animate opacity within `SlideIn`.

  You can now add the property `animateOpacity` which if true, animates the opacity from 0 -> 1 on enter and 1 -> 0 on exit.

---

### @atlaskit/onboarding@9.2.0

#### Minor Changes

- [`2c8d296246`](https://bitbucket.org/atlassian/atlassian-frontend/commits/2c8d296246) - Adds support for the `subtle` button appearance in the Spotlight dialog theme to align more closely with ADG guidelines. Also visually re-orders action items so that the primary item in the actions list appears on the right hand side, but still recieves focus first.

---

### @atlaskit/width-detector@2.2.0

#### Minor Changes

- [`82053beb2d`](https://bitbucket.org/atlassian/atlassian-frontend/commits/82053beb2d) - ED-8944 fix: propagete width updates after scrolling

---

### @atlassian/xen-editor-provider@9.3.0

#### Minor Changes

- [`2e7e4ce49e`](https://bitbucket.org/atlassian/atlassian-frontend/commits/2e7e4ce49e) - Add list app latency and list app success metrics to getForgeExtensionProvider

  - And fix bug in legacyMacroManifest to work with new editor-core

#### Patch Changes

- Updated dependencies

---

### @atlaskit/atlassian-navigation@0.10.10

#### Patch Changes

- [`2221a004ff`](https://bitbucket.org/atlassian/atlassian-frontend/commits/2221a004ff) - Fixed skeleton button not showing correct border color when selected
- Updated dependencies

---

### @atlaskit/avatar@18.0.1

### 18.0.1

---

### @atlaskit/avatar-group@6.0.1

### 6.0.1

---

### @atlaskit/conversation@15.7.7

#### Patch Changes

- Updated dependencies

---

### @atlaskit/datetime-picker@9.4.5

#### Patch Changes

- [`038b0fbb8e`](https://bitbucket.org/atlassian/atlassian-frontend/commits/038b0fbb8e) - fix typings after reverting DST-461 changes. typeof is fixed in ERT repo (https://github.com/atlassian/extract-react-types/pull/126)

---

### @atlaskit/dropdown-menu@9.0.5

#### Patch Changes

- [`a8d5ae5d98`](https://bitbucket.org/atlassian/atlassian-frontend/commits/a8d5ae5d98) - Fix analytics when dropdown menu gets closed. Now passing dropdown-menu analytics instead of droplist.

---

### @atlaskit/dynamic-table@13.7.7

#### Patch Changes

- [`e8b1104637`](https://bitbucket.org/atlassian/atlassian-frontend/commits/e8b1104637) - Previously when sorting the rows weren’t using a stable key - thus they would re-mount unexpectedly! This has been fixed now.
- [`3cac2203ba`](https://bitbucket.org/atlassian/atlassian-frontend/commits/3cac2203ba) - Previously, sorting columns in dynamic table wouldn’t persist the page when table was updated, Now user will be able to apply sorting on dynamic table and page will be remain same even after updating table

---

### @atlaskit/editor-wikimarkup-transformer@5.4.2

#### Patch Changes

- Updated dependencies

---

### @atlaskit/embedded-document@0.6.22

#### Patch Changes

- Updated dependencies

---

### @atlaskit/emoji@62.8.2

#### Patch Changes

- Updated dependencies

---

### @atlaskit/form@7.3.1

#### Patch Changes

- [`2e4000e57b`](https://bitbucket.org/atlassian/atlassian-frontend/commits/2e4000e57b) - Form now fully supports object and array field names.

---

### @atlaskit/global-navigation@9.0.3

### 9.0.3

---

### @atlaskit/media-card@68.0.1

#### Patch Changes

- [`e04c837864`](https://bitbucket.org/atlassian/atlassian-frontend/commits/e04c837864) - File-state-errors should only be fired when the filestate is Error OR failed-processing
- [`5989238f54`](https://bitbucket.org/atlassian/atlassian-frontend/commits/5989238f54) - Reuse existing preview in InlineVideoPlayer to prevent re renders when video is uploading
- [`3879663f8b`](https://bitbucket.org/atlassian/atlassian-frontend/commits/3879663f8b) - Replace use of findDOMNode with React.Ref
- Updated dependencies

---

### @atlaskit/media-editor@37.0.11

#### Patch Changes

- [`51aa5587ef`](https://bitbucket.org/atlassian/atlassian-frontend/commits/51aa5587ef) - bump media-client: Remove stack traces from media analytic events
- Updated dependencies

---

### @atlaskit/media-filmstrip@38.0.3

#### Patch Changes

- [`51aa5587ef`](https://bitbucket.org/atlassian/atlassian-frontend/commits/51aa5587ef) - bump media-client: Remove stack traces from media analytic events
- Updated dependencies

---

### @atlaskit/media-image@16.0.1

#### Patch Changes

- [`51aa5587ef`](https://bitbucket.org/atlassian/atlassian-frontend/commits/51aa5587ef) - bump media-client: Remove stack traces from media analytic events
- Updated dependencies

---

### @atlaskit/media-picker@54.1.5

#### Patch Changes

- [`dfd656e4ec`](https://bitbucket.org/atlassian/atlassian-frontend/commits/dfd656e4ec) - MPT-503: fixed dragndrop of non-natively supported files in editor
- [`51aa5587ef`](https://bitbucket.org/atlassian/atlassian-frontend/commits/51aa5587ef) - bump media-client: Remove stack traces from media analytic events
- Updated dependencies

---

### @atlaskit/media-test-helpers@27.2.2

#### Patch Changes

- Updated dependencies

---

### @atlaskit/media-viewer@44.4.3

#### Patch Changes

- [`51aa5587ef`](https://bitbucket.org/atlassian/atlassian-frontend/commits/51aa5587ef) - bump media-client: Remove stack traces from media analytic events
- [`b8b8a16490`](https://bitbucket.org/atlassian/atlassian-frontend/commits/b8b8a16490) - added action and actionSubject to mediaViewerModal event, so that it won't be filtered out and will fire
- Updated dependencies

---

### @atlaskit/modal-dialog@10.6.1

#### Patch Changes

- [`5be257c6f6`](https://bitbucket.org/atlassian/atlassian-frontend/commits/5be257c6f6) - Fix issue with the way that tabIndex was applied to dialog content. Now the check looks at whether the container is scrollable, rather than the shouldScroll prop.
- [`b2b0b94079`](https://bitbucket.org/atlassian/atlassian-frontend/commits/b2b0b94079) - Reverts breaking test id change.
- [`057d870973`](https://bitbucket.org/atlassian/atlassian-frontend/commits/057d870973) - Fix keyboard scrolling of modal dialog content

---

### @atlaskit/navigation@36.0.6

### 36.0.6

---

### @atlaskit/navigation-next@8.0.7

### 8.0.7

---

### @atlaskit/page@11.0.14

### 11.0.14

---

### @atlaskit/page-layout@0.4.1

#### Patch Changes

- Updated dependencies

---

### @atlaskit/rating@0.0.6

#### Patch Changes

- Updated dependencies

---

### @atlaskit/share@0.14.1

### 0.14.1

---

### @atlaskit/side-navigation@0.5.5

#### Patch Changes

- Updated dependencies

---

### @atlaskit/smart-card@13.4.1

#### Patch Changes

- [`cd9c2500a8`](https://bitbucket.org/atlassian/atlassian-frontend/commits/cd9c2500a8) - EDM-834: Jira Roadmap embeds will now be an embedCard by default and also wide
- [`1508cc97c9`](https://bitbucket.org/atlassian/atlassian-frontend/commits/1508cc97c9) - fix: lazy-rendering, React key, isFrameVisible in @atlaskit/renderer and click handlers for EmbedCard components.
- [`328902687e`](https://bitbucket.org/atlassian/atlassian-frontend/commits/328902687e) - Remove stack traces from media analytic events
- Updated dependencies

---

### @atlaskit/spinner@13.0.1

### 13.0.1

---

### @atlaskit/table-tree@8.0.5

#### Patch Changes

- [`e80d58698b`](https://bitbucket.org/atlassian/atlassian-frontend/commits/e80d58698b) - Fixed alignment of Cell items

---

### @atlaskit/task-decision@16.1.1

#### Patch Changes

- [`d320dccd58`](https://bitbucket.org/atlassian/atlassian-frontend/commits/d320dccd58) - ED-9488 Remove `export *` from @atlaskit/task-decision

---

### @atlaskit/theme@9.5.4

#### Patch Changes

- [`9326de67db`](https://bitbucket.org/atlassian/atlassian-frontend/commits/9326de67db) - fix: return default theme mode if mode is other than 'light' or 'dark'

---

### @atlassian/aux-test-utils@3.3.4

#### Patch Changes

- [`f460c7eb57`](https://bitbucket.org/atlassian/atlassian-frontend/commits/f460c7eb57) - Update temporarilySilenceActAndAtlaskitDeprecationWarnings to override console error and warn immediately

---

### @atlassian/forge-ui-text-renderer@1.0.2

#### Patch Changes

- Updated dependencies

---

### @atlassian/react-render-analyzer@1.0.1

#### Patch Changes

- [`a49a86c519`](https://bitbucket.org/atlassian/atlassian-frontend/commits/a49a86c519) - Handling render props when analysing prop changes
