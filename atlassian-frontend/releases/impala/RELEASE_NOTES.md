# Impala Release

## Summary

| Package                                       | Type  | Change             | Number of changes |
| --------------------------------------------- | ----- | ------------------ | ----------------: |
| @atlaskit/comment                             | none  | 10.0.6 -> 10.0.6   |                 0 |
| @atlaskit/editor-bitbucket-transformer        | none  | 7.1.6 -> 7.1.6     |                 0 |
| @atlaskit/editor-confluence-transformer       | none  | 8.1.6 -> 8.1.6     |                 0 |
| @atlaskit/editor-jira-transformer             | none  | 8.1.6 -> 8.1.6     |                 0 |
| @atlaskit/editor-json-transformer             | none  | 8.4.4 -> 8.4.4     |                 0 |
| @atlaskit/editor-markdown-transformer         | none  | 4.1.6 -> 4.1.6     |                 0 |
| @atlaskit/editor-wikimarkup-transformer       | none  | 9.0.0 -> 9.0.0     |                 0 |
| @atlaskit/page-header                         | none  | 10.0.7 -> 10.0.7   |                 0 |
| @atlaskit/profilecard                         | none  | 14.3.0 -> 14.3.0   |                 0 |
| @atlaskit/task-decision                       | none  | 17.0.9 -> 17.0.9   |                 0 |
| @atlassian/xen-editor-provider                | none  | 11.0.0 -> 11.0.0   |                 0 |
| @atlaskit/chunkinator                         | major | 2.1.2 -> 3.0.0     |                 1 |
| @atlaskit/editor-core                         | major | 137.0.0 -> 138.0.0 |                27 |
| @atlaskit/editor-mobile-bridge                | major | 24.0.0 -> 25.0.0   |                 6 |
| @atlaskit/inline-edit                         | major | 11.0.11 -> 12.0.0  |                 1 |
| @atlaskit/renderer                            | major | 73.2.0 -> 74.0.0   |                 2 |
| @atlaskit/smart-card                          | major | 14.8.4 -> 15.0.0   |                 4 |
| @atlaskit/avatar                              | minor | 20.1.1 -> 20.2.0   |                 2 |
| @atlaskit/calendar                            | minor | 10.2.0 -> 10.3.0   |                 4 |
| @atlaskit/editor-common                       | minor | 55.2.0 -> 55.3.0   |                 5 |
| @atlaskit/icon                                | minor | 21.2.4 -> 21.3.0   |                 5 |
| @atlaskit/legacy-mobile-macros                | minor | 0.1.4 -> 0.2.0     |                 1 |
| @atlaskit/locale                              | minor | 2.2.0 -> 2.3.0     |                 1 |
| @atlaskit/logo                                | minor | 13.0.8 -> 13.1.0   |                 1 |
| @atlaskit/media-ui                            | minor | 15.2.0 -> 15.3.0   |                 5 |
| @atlaskit/mention                             | minor | 19.2.0 -> 19.3.0   |                 2 |
| @atlaskit/reduced-ui-pack                     | minor | 13.0.8 -> 13.1.0   |                 1 |
| @atlaskit/section-message                     | minor | 5.0.9 -> 5.1.0     |                 1 |
| @atlaskit/adf-schema                          | patch | 13.7.1 -> 13.7.2   |                 2 |
| @atlaskit/breadcrumbs                         | patch | 11.0.0 -> 11.0.1   |                 1 |
| @atlaskit/conversation                        | patch | 16.0.17 -> 16.0.18 |                 0 |
| @atlaskit/embedded-document                   | patch | 0.7.15 -> 0.7.16   |                 0 |
| @atlaskit/emoji                               | patch | 63.1.0 -> 63.1.1   |                 1 |
| @atlaskit/icon-file-type                      | patch | 6.1.3 -> 6.1.4     |                 2 |
| @atlaskit/icon-object                         | patch | 6.1.3 -> 6.1.4     |                 2 |
| @atlaskit/icon-priority                       | patch | 6.1.3 -> 6.1.4     |                 2 |
| @atlaskit/media-card                          | patch | 70.3.2 -> 70.3.3   |                 1 |
| @atlaskit/media-client                        | patch | 12.4.0 -> 12.4.1   |                 1 |
| @atlassian/atlassian-frontend-repo-docs       | patch | 3.0.21 -> 3.0.22   |                 1 |
| @atlassian/forge-ui-text-renderer             | patch | 2.0.16 -> 2.0.17   |                 0 |
| @atlassian/mpt-plan-configuration             | patch | 1.2.1 -> 1.2.2     |                 0 |
| @atlassian/pipelines-editor                   | patch | 0.10.18 -> 0.10.19 |                 0 |
| @atlassian/pipelines-runners-management       | patch | 0.2.2 -> 0.2.3     |                 0 |
| @atlassian/pipelines-runners-wizard           | patch | 3.7.1 -> 3.7.2     |                 0 |
| @atlassian/pipelines-variables                | patch | 0.1.9 -> 0.1.10    |                 0 |
| @atlassiansox/confluence-free-plan-info-modal | patch | 3.0.0 -> 3.0.1     |                 0 |

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

---

---

### @atlaskit/chunkinator@3.0.0

#### Major Changes

- [`dfc79cafa6c`](https://bitbucket.org/atlassian/atlassian-frontend/commits/dfc79cafa6c) - Breaking change: Chunkinator is now returning an Observable to consumers. You can control cancellation of chunks upload by unsubscribing this Observable.

---

### @atlaskit/editor-core@138.0.0

#### Minor Changes

- [`5ee57944f46`](https://bitbucket.org/atlassian/atlassian-frontend/commits/5ee57944f46) - ED-11948 Fix issue with table resize logic not retaining original node selection.
  Refactor table resize logic to retain selection after table resize.
- [`70fecd78610`](https://bitbucket.org/atlassian/atlassian-frontend/commits/70fecd78610) - [ux] This commit includes UX changes to Cmd+K link toolbar

  - MouseLeave will now correctly cancel the highlight of the item
  - Press Enter will now always submit things in the input fields. Previously we were allowing MouseOver + Enter to submit selected item. This had caused many misoperations that user
    would accidently insert the link their mouse hovers on.
  - When a user iterate through result items with ArrowUp/ArrowDown, the URL field will be automatically populated with selected item's content. This is so that the ArrowKeys + Enter
    to select still works as expected.

  Refer to this RFC for more details of the decision https://product-fabric.atlassian.net/wiki/spaces/EM/pages/2168883953/EDM-RFC-18+Improve+mouseover+selection+experience+with+Link+Toolbar

- [`e0ec7e79fce`](https://bitbucket.org/atlassian/atlassian-frontend/commits/e0ec7e79fce) - [ED-11251] Close editor undo history buffer every time the user press enter
- [`d335911aa2c`](https://bitbucket.org/atlassian/atlassian-frontend/commits/d335911aa2c) - The `ToolbarMention` component now includes a `testId` prop.
- [`b1faca325ab`](https://bitbucket.org/atlassian/atlassian-frontend/commits/b1faca325ab) - [ux] Add Undo Redo buttons under feature flag
- [`2cde1293d9f`](https://bitbucket.org/atlassian/atlassian-frontend/commits/2cde1293d9f) - [ux] `useAlternativePreloader` prop was added to `CardOptions`, which is type of editor prop `UNSAFE_cards`. Default value is true (if not defined). When `useAlternativePreloader` is true preloader experience for smart link components in editor will be different: there won't be normal smart link skeleton (border and a shaddow) and spinner is located on the right (compare to left as before). Note: renderer experience won't change.
- [`30b83e21da4`](https://bitbucket.org/atlassian/atlassian-frontend/commits/30b83e21da4) - ED-11870 Update Element Browser category item analytics to use fireAnalyticsEvent helper
- [`00b5f1d1beb`](https://bitbucket.org/atlassian/atlassian-frontend/commits/00b5f1d1beb) - ED-11220 Fix element browser item tooltip hitbox area
- [`54e3474f640`](https://bitbucket.org/atlassian/atlassian-frontend/commits/54e3474f640) - [ux] EDM-1420: Smart Links: Floating toolbar visible after display state change
- [`e18fc27f970`](https://bitbucket.org/atlassian/atlassian-frontend/commits/e18fc27f970) - [ux] ED-11902 Fix bug with adding emoji via plus menu not working
- [`848d9fb54a3`](https://bitbucket.org/atlassian/atlassian-frontend/commits/848d9fb54a3) - ED-11875 align renderer to editor tab size in code-block
- [`56e5ed87897`](https://bitbucket.org/atlassian/atlassian-frontend/commits/56e5ed87897) - [ux] ED-11981 Update config panel boolean (Checkbox) fields to autosave onchange instead of only onblur

#### Patch Changes

- [`e07a815d377`](https://bitbucket.org/atlassian/atlassian-frontend/commits/e07a815d377) - ED-11807 performance optimization for table sticky headers plugin
- [`5216ebed3b6`](https://bitbucket.org/atlassian/atlassian-frontend/commits/5216ebed3b6) - Expose and use atlassian-icon, jira-icon entry points
- [`b36f8119df5`](https://bitbucket.org/atlassian/atlassian-frontend/commits/b36f8119df5) - Add in keymap for moving to gap cursor from caption
- [`c3961b9d90f`](https://bitbucket.org/atlassian/atlassian-frontend/commits/c3961b9d90f) - EDM-1679: add tooltip to smart link appearance switcher when options are disabled
- [`c6eb10bea9e`](https://bitbucket.org/atlassian/atlassian-frontend/commits/c6eb10bea9e) - Fix `@atlaskit/calendar` typings
- [`b48fddb0c83`](https://bitbucket.org/atlassian/atlassian-frontend/commits/b48fddb0c83) - Internal usage of icon now points to its new entrypoint instead of deep importing from dist.
- [`b94ee70e7d1`](https://bitbucket.org/atlassian/atlassian-frontend/commits/b94ee70e7d1) - ED-12008 Fix empty number field to resolve to 0 in config panel
- [`98309150746`](https://bitbucket.org/atlassian/atlassian-frontend/commits/98309150746) - Use spec based validator for the renderer in kitchen sink
- [`61e73eb1bad`](https://bitbucket.org/atlassian/atlassian-frontend/commits/61e73eb1bad) - ED-11994 add integration test to code block pasting from renderer
- [`ef52e0b0b5f`](https://bitbucket.org/atlassian/atlassian-frontend/commits/ef52e0b0b5f) - [ED-11387] Adds analytics redo event for toolbar button
- [`18d183a9db5`](https://bitbucket.org/atlassian/atlassian-frontend/commits/18d183a9db5) - [ED-11372] Add analytics event for ToolbarButton
- [`cf5909ab062`](https://bitbucket.org/atlassian/atlassian-frontend/commits/cf5909ab062) - [ux] Replaced the search icon with add icon in the invite item in the mention typeahead inside fabric-editor for invite from mention experiment (Growth)
- [`d8b3bb5ab78`](https://bitbucket.org/atlassian/atlassian-frontend/commits/d8b3bb5ab78) - ED-10656 Implement generic solution for handling paragraph block marks
- [`152056bc522`](https://bitbucket.org/atlassian/atlassian-frontend/commits/152056bc522) - NO-ISSUE refetch items when getItems reference changes
- [`43b2f925f0b`](https://bitbucket.org/atlassian/atlassian-frontend/commits/43b2f925f0b) - Add optional attributes to mentionProvider analytics callback
- Updated dependencies

---

### @atlaskit/editor-mobile-bridge@25.0.0

#### Major Changes

- [`709a28ee803`](https://bitbucket.org/atlassian/atlassian-frontend/commits/709a28ee803) - Add setContentPayload / resolvePromisePayload methods to speed up native to bridge data transportation by fetching the json payload from a predefined url.
- [`3d81784c978`](https://bitbucket.org/atlassian/atlassian-frontend/commits/3d81784c978) - ED-12005 Added API to check if ADF is empty or only has whitespace

#### Minor Changes

- [`f89a714e454`](https://bitbucket.org/atlassian/atlassian-frontend/commits/f89a714e454) - ED-11940 remove unused query params - Locale and Enable-Quick-Insert for the editor
- [`b0e8a310624`](https://bitbucket.org/atlassian/atlassian-frontend/commits/b0e8a310624) - Remove background-color from renderer and editor html templates. This to fix an issue with page flashing when in dark mode.
- [`5142c23bfea`](https://bitbucket.org/atlassian/atlassian-frontend/commits/5142c23bfea) - [ED-11864] Add allowIndentation to TRUE for mobile editor

#### Patch Changes

- [`afa1378d22e`](https://bitbucket.org/atlassian/atlassian-frontend/commits/afa1378d22e) - Remove unsused query-param methods which are transitioned to Renderer Configurations
- Updated dependencies

---

### @atlaskit/inline-edit@12.0.0

#### Major Changes

- [`b9987e84f3f`](https://bitbucket.org/atlassian/atlassian-frontend/commits/b9987e84f3f) - In this version we bring significant performance improvements as well as improving the experience of using `inline-edit`.

  - removed dynamic loading of inline dialog allowing consumers to compose their own experiences
  - merged controlled & uncontrolled inline edit components
  - split `InlineEditableTextfield` to its own entry-point

  #### Handling errors with inline edit

  You can now customise `editView` when its content is invalid. For example, use the `errorMessage` and `isInvalid` props to show errors with inline dialog:

  ```jsx
  editView={({ errorMessage, ...fieldProps }) => (
    <InlineDialog
      isOpen={fieldProps.isInvalid}
      content={<div>{errorMessage}</div>}
      placement="right"
    >
      <TextField {...fieldProps} autoFocus />
    </InlineDialog>
  )}
  ```

  #### Controlled and uncontrolled component

  From this version, inline edit will act as either controlled or uncontrolled based on the props passed in. Please refer to [the example here](https://atlaskit.atlassian.com/packages/design-system/inline-edit/example/stateless) for more details.

  When in controlled, you can control the state by set `isEditing` through `onCancel`, `onConfirm` and `onEdit` callbacks.

  #### InlineEditableTextfield

  From this version, `InlineEditableTextfield` now has its own entrypoint so you can import only what you use. Like so:

  ```jsx
  import InlineEditableTextfield from '@atlaskit/inline-edit/inline-editable-textfield';
  ```

  **Running the codemod cli**
  To run the codemod: **You first need to have the latest version installed before you can run the codemod**

  `yarn upgrade @atlaskit/inline-edit@^12.0.0`

  Once upgraded, use the Atlaskit codemod-cli;

  `npx @atlaskit/codemod-cli --parser [PARSER] --extensions [FILE_EXTENSIONS] [TARGET_PATH]`

  The CLI will show a list of components and versions so select `@atlaskit/inline-edit@^12.0.0` and you will automatically be upgraded. If your usage of PACKAGE cannot be upgraded a comment will be left that a manual change is required.

  Run `npx @atlaskit/codemod-cli -h` for more details on usage.
  For Atlassians, refer to [this doc](https://developer.atlassian.com/cloud/framework/atlassian-frontend/codemods/01-atlassian-codemods/) for more details on the codemod CLI.

#### Patch Changes

- Updated dependencies

---

### @atlaskit/renderer@74.0.0

#### Minor Changes

- [`848d9fb54a3`](https://bitbucket.org/atlassian/atlassian-frontend/commits/848d9fb54a3) - ED-11875 align renderer to editor tab size in code-block

#### Patch Changes

- [`a2d44651925`](https://bitbucket.org/atlassian/atlassian-frontend/commits/a2d44651925) - ED-11161: Track unsupported content levels severity in renderer
- Updated dependencies

---

### @atlaskit/smart-card@15.0.0

#### Major Changes

- [`08c624ac7b8`](https://bitbucket.org/atlassian/atlassian-frontend/commits/08c624ac7b8) - [ux] `inlinePreloaderStyle` prop was added to SmartCard. It can be either `'on-left-with-skeleton'` or a `'on-right-without-skeleton'`

#### Patch Changes

- [`5fb017ec308`](https://bitbucket.org/atlassian/atlassian-frontend/commits/5fb017ec308) - feat: EDM-1692, add Smart Links showcase
- [`5216ebed3b6`](https://bitbucket.org/atlassian/atlassian-frontend/commits/5216ebed3b6) - Expose and use atlassian-icon, jira-icon entry points
- [`8f0196da8a2`](https://bitbucket.org/atlassian/atlassian-frontend/commits/8f0196da8a2) - NO-ISSUE opimtise bottleneck import for size
- Updated dependencies

---

### @atlaskit/avatar@20.2.0

#### Minor Changes

- [`1a8fcbf9878`](https://bitbucket.org/atlassian/atlassian-frontend/commits/1a8fcbf9878) - [ux] Avatar and AvatarItem now accept a label prop which allows the components to be accessible when viewed in a screen reader. The isDisabled prop now correctly generates the appropriate markup (was a span, now a disabled button) for screen reader users.

#### Patch Changes

- [`8308fe23b9b`](https://bitbucket.org/atlassian/atlassian-frontend/commits/8308fe23b9b) - Removing incorrect cursor styles from non-interactive AvatarItems
- Updated dependencies

---

### @atlaskit/calendar@10.3.0

#### Minor Changes

- [`d069f7834ef`](https://bitbucket.org/atlassian/atlassian-frontend/commits/d069f7834ef) - Calendar now accepts a `weekStartDay` prop that controls which day of the week should be used at the start. This prop accepts the following values:

  - `0` sunday (default value)
  - `1` monday
  - `2` tuesday
  - `3` wednesday
  - `4` thursday
  - `5` friday
  - `6` saturday

- [`ccde1b6b939`](https://bitbucket.org/atlassian/atlassian-frontend/commits/ccde1b6b939) - Convert all styles of Calendar from styled-components to emotion CSS and apply different styles via data-attributes.
  Internally theme mode is now accessed via Global theme context and used to generate colors.
- [`e20f4c2806e`](https://bitbucket.org/atlassian/atlassian-frontend/commits/e20f4c2806e) - Improvement in internal analytics performance

  **Dev changes**

  - Migrated from `@atlaskit/analytics-next` React HOC to React hooks. This improved re-rendering quite a bit.

#### Patch Changes

- [`aedbf4ed383`](https://bitbucket.org/atlassian/atlassian-frontend/commits/aedbf4ed383) - **Internal change**

  We have removed [calendar-base](https://www.npmjs.com/package/calendar-base) dependency which was not maintained for quite sometime and moved its logic internally. This will help us fixing any issue we might get or any new functionality we might want to support.

- Updated dependencies

---

### @atlaskit/editor-common@55.3.0

#### Minor Changes

- [`2cde1293d9f`](https://bitbucket.org/atlassian/atlassian-frontend/commits/2cde1293d9f) - [ux] `useAlternativePreloader` prop was added to `CardOptions`, which is type of editor prop `UNSAFE_cards`. Default value is true (if not defined). When `useAlternativePreloader` is true preloader experience for smart link components in editor will be different: there won't be normal smart link skeleton (border and a shaddow) and spinner is located on the right (compare to left as before). Note: renderer experience won't change.

#### Patch Changes

- [`ad4bc282c53`](https://bitbucket.org/atlassian/atlassian-frontend/commits/ad4bc282c53) - Fix media click issue for center layout images
- [`e07a815d377`](https://bitbucket.org/atlassian/atlassian-frontend/commits/e07a815d377) - ED-11807 performance optimization for table sticky headers plugin
- [`89a358773d2`](https://bitbucket.org/atlassian/atlassian-frontend/commits/89a358773d2) - Don't wrap unsupportedBlock again after an INVALID_CONTENT_LENGTH error
- [`a2d44651925`](https://bitbucket.org/atlassian/atlassian-frontend/commits/a2d44651925) - ED-11161: Track unsupported content levels severity in renderer
- Updated dependencies

---

### @atlaskit/icon@21.3.0

#### Minor Changes

- [`b9265389fa0`](https://bitbucket.org/atlassian/atlassian-frontend/commits/b9265389fa0) - Icon now exposes a base icon via the `@atlaskit/icon/base` entrypoint. This is used in all generated glyphs inside the icon package.
- [`83944ca2cf2`](https://bitbucket.org/atlassian/atlassian-frontend/commits/83944ca2cf2) - Icon now ships with cjs, esm, and es2019 bundles for components and utils exported in the icon package. Glyphs unfortunately aren't included and still only export cjs bundles.
- [`6ef8824baee`](https://bitbucket.org/atlassian/atlassian-frontend/commits/6ef8824baee) - - Icon now uses React.memo() to stop unnecessary re-renders.

  - A bug in the types for icon sizes has been resolved

  This change also includes a number of quality of life fixes as part of lite mode.

  #### Internal changes

  - class components have been changed to functional components
  - styled-components has been removed as a peer dependency
  - @emotion/core has been added a direct dependency, base components now use emotion for styling
  - An internal gradient function `insertDynamicGradientId` has been removed from the runtime
  - Enzyme removed in favour of RTL

  #### Updating tests

  Tests that rely on `enzyme` may have issues with this update.
  We've mostly seen issues with one of the following cases.

  ##### Can't find internal react test id

  Because icon is now wrapped in `memo` you won't be able to easily find it.
  This code will fail:

  ```js
  import BookIcon from '@atlaskit/icon/glyph/book';

  <BookIcon />;

  wrapper.find('BookIcon');
  ```

  As a fix you can add memo to the target:

  ```js
  wrapper.find('Memo(BookIcon)');
  ```

  Even better, use the test id.

  ```js
  <BookIcon testId="book-icon" />;

  wrapper.find('[data-testid="book-icon"]');
  ```

  ##### Treating the icon as a button

  Icon hasn't had an `onClick` handler since many major versions.
  This code will fail:

  ```js
  const Example = () => <Button testId="test-id" iconBefore={<SomeGlyph />} />;

  // in some teat
  wrapper.find(SomeGlyph).click();
  // OR
  wrapper.find('SomeGlyph').click();
  ```

  As a fix you can target the button instead:

  ```jsx
  wrapper.find('[data-testid="test-id"]').click();
  ```

#### Patch Changes

- [`0741b1556f6`](https://bitbucket.org/atlassian/atlassian-frontend/commits/0741b1556f6) - All icon glpyhs are now built without inline extends helpers, reducing their bundlesize.
- [`8d6c79b9055`](https://bitbucket.org/atlassian/atlassian-frontend/commits/8d6c79b9055) - Typedefs of glyphs have been updated to reflect an API change that occured in version 15. For context, `onClick` was removed as a functional prop but it was still supported by the types. This may have resulted in a confusing developer experience although the fundamental behaviour has been consistent since version 15.

---

### @atlaskit/legacy-mobile-macros@0.2.0

#### Minor Changes

- [`5a657f8d9fb`](https://bitbucket.org/atlassian/atlassian-frontend/commits/5a657f8d9fb) - [ux] Google and Trello macros will now render as links on mobile instead of using the mobile macro fallback

#### Patch Changes

- Updated dependencies

---

### @atlaskit/locale@2.3.0

#### Minor Changes

- [`ec026e28730`](https://bitbucket.org/atlassian/atlassian-frontend/commits/ec026e28730) - `#getDaysShort` function now accepts new `#weekStartDay` parameter that controls which day of the week should be used at the start. This parameter accepts the following values:

  - `0` sunday (default value)
  - `1` monday
  - `2` tuesday
  - `3` wednesday
  - `4` thursday
  - `5` friday
  - `6` saturday

---

### @atlaskit/logo@13.1.0

#### Minor Changes

- [`5216ebed3b6`](https://bitbucket.org/atlassian/atlassian-frontend/commits/5216ebed3b6) - Expose and use atlassian-icon, jira-icon entry points

---

### @atlaskit/media-ui@15.3.0

#### Minor Changes

- [`504119cfbe2`](https://bitbucket.org/atlassian/atlassian-frontend/commits/504119cfbe2) - [ux] `InlinePreloaderStyle` type is added as part of `@atlaskit/media-ui/types` entry point.
- [`8a148bfb609`](https://bitbucket.org/atlassian/atlassian-frontend/commits/8a148bfb609) - EDM-855: add underline styles for inline smart links

#### Patch Changes

- [`e6a61a55325`](https://bitbucket.org/atlassian/atlassian-frontend/commits/e6a61a55325) - Updated react-video-renderer to 2.4.7
- [`0d11733c9e3`](https://bitbucket.org/atlassian/atlassian-frontend/commits/0d11733c9e3) - fix volume controls for inline video player
- [`b7e84781856`](https://bitbucket.org/atlassian/atlassian-frontend/commits/b7e84781856) - [ux] Prevent saving current media play time when the media is less than a minute long
- Updated dependencies

---

### @atlaskit/mention@19.3.0

#### Minor Changes

- [`cafde5bbe21`](https://bitbucket.org/atlassian/atlassian-frontend/commits/cafde5bbe21) - [ux] Added Team prefix to teams in the mention list to increase clarity.
- [`43b2f925f0b`](https://bitbucket.org/atlassian/atlassian-frontend/commits/43b2f925f0b) - Add optional attributes to mentionProvider analytics callback

#### Patch Changes

- Updated dependencies

---

### @atlaskit/reduced-ui-pack@13.1.0

#### Minor Changes

- [`b9265389fa0`](https://bitbucket.org/atlassian/atlassian-frontend/commits/b9265389fa0) - Icon now exposes a base icon via the `@atlaskit/icon/base` entrypoint. This is used in all generated glyphs inside the icon package.

---

### @atlaskit/section-message@5.1.0

#### Minor Changes

- [`ecced7fd8e2`](https://bitbucket.org/atlassian/atlassian-frontend/commits/ecced7fd8e2) - [ux] The linkComponent prop has been fixed to only apply to Actions with an href to align with docs. Previously it would apply to Actions with href or onClick.

#### Patch Changes

- Updated dependencies

---

### @atlaskit/adf-schema@13.7.2

#### Patch Changes

- [`b36f8119df5`](https://bitbucket.org/atlassian/atlassian-frontend/commits/b36f8119df5) - Add in keymap for moving to gap cursor from caption
- [`d01a017e81e`](https://bitbucket.org/atlassian/atlassian-frontend/commits/d01a017e81e) - fixed schema node type definitions to be more consistent

---

### @atlaskit/breadcrumbs@11.0.1

#### Patch Changes

- [`a0c2212596a`](https://bitbucket.org/atlassian/atlassian-frontend/commits/a0c2212596a) - Adds a build time flag that lets consumers drop tooltips from their SSR bundles

---

### @atlaskit/conversation@16.0.18

#### Patch Changes

- Updated dependencies

---

### @atlaskit/embedded-document@0.7.16

#### Patch Changes

- Updated dependencies

---

### @atlaskit/emoji@63.1.1

#### Patch Changes

- [`18820a0a9a1`](https://bitbucket.org/atlassian/atlassian-frontend/commits/18820a0a9a1) - Internal changes to break up internal component structure of EmojiPicker
- Updated dependencies

---

### @atlaskit/icon-file-type@6.1.4

#### Patch Changes

- [`0741b1556f6`](https://bitbucket.org/atlassian/atlassian-frontend/commits/0741b1556f6) - All icon glpyhs are now built without inline extends helpers, reducing their bundlesize.
- [`8d6c79b9055`](https://bitbucket.org/atlassian/atlassian-frontend/commits/8d6c79b9055) - Typedefs of glyphs have been updated to reflect an API change that occured in version 15. For context, `onClick` was removed as a functional prop but it was still supported by the types. This may have resulted in a confusing developer experience although the fundamental behaviour has been consistent since version 15.

---

### @atlaskit/icon-object@6.1.4

#### Patch Changes

- [`0741b1556f6`](https://bitbucket.org/atlassian/atlassian-frontend/commits/0741b1556f6) - All icon glpyhs are now built without inline extends helpers, reducing their bundlesize.
- [`8d6c79b9055`](https://bitbucket.org/atlassian/atlassian-frontend/commits/8d6c79b9055) - Typedefs of glyphs have been updated to reflect an API change that occured in version 15. For context, `onClick` was removed as a functional prop but it was still supported by the types. This may have resulted in a confusing developer experience although the fundamental behaviour has been consistent since version 15.

---

### @atlaskit/icon-priority@6.1.4

#### Patch Changes

- [`0741b1556f6`](https://bitbucket.org/atlassian/atlassian-frontend/commits/0741b1556f6) - All icon glpyhs are now built without inline extends helpers, reducing their bundlesize.
- [`8d6c79b9055`](https://bitbucket.org/atlassian/atlassian-frontend/commits/8d6c79b9055) - Typedefs of glyphs have been updated to reflect an API change that occured in version 15. For context, `onClick` was removed as a functional prop but it was still supported by the types. This may have resulted in a confusing developer experience although the fundamental behaviour has been consistent since version 15.

---

### @atlaskit/media-card@70.3.3

#### Patch Changes

- [`5380459f37b`](https://bitbucket.org/atlassian/atlassian-frontend/commits/5380459f37b) - [ux] Play icon on media video player has been adjusted in size to better match ADG
- Updated dependencies

---

### @atlaskit/media-client@12.4.1

#### Patch Changes

- [`dfc79cafa6c`](https://bitbucket.org/atlassian/atlassian-frontend/commits/dfc79cafa6c) - Fixed failures on /upload/createWithFiles not aborting upload
- Updated dependencies

---

### @atlassian/atlassian-frontend-repo-docs@3.0.22

#### Patch Changes

- [`265c9a52ad9`](https://bitbucket.org/atlassian/atlassian-frontend/commits/265c9a52ad9) - Updates icon build docs to use the new build script.

---

### @atlassian/forge-ui-text-renderer@2.0.17

#### Patch Changes

- Updated dependencies

---

### @atlassian/mpt-plan-configuration@1.2.2

#### Patch Changes

- Updated dependencies

---

### @atlassian/pipelines-editor@0.10.19

#### Patch Changes

- Updated dependencies

---

### @atlassian/pipelines-runners-management@0.2.3

#### Patch Changes

- Updated dependencies

---

### @atlassian/pipelines-runners-wizard@3.7.2

#### Patch Changes

- Updated dependencies

---

### @atlassian/pipelines-variables@0.1.10

#### Patch Changes

- Updated dependencies

---

### @atlassiansox/confluence-free-plan-info-modal@3.0.1

#### Patch Changes

- Updated dependencies
