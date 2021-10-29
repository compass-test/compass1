# @atlaskit/editor-test-helpers

## 15.4.1

### Patch Changes

- Updated dependencies

## 15.4.0

### Minor Changes

- [`68c3a924b0c`](https://bitbucket.org/atlassian/atlassian-frontend/commits/68c3a924b0c) - [ux] ED-13288: fixed ColorPickerField to work with fix color picker transformBefore()

### Patch Changes

- Updated dependencies

## 15.3.5

### Patch Changes

- Updated dependencies

## 15.3.4

### Patch Changes

- Updated dependencies

## 15.3.3

### Patch Changes

- Updated dependencies

## 15.3.2

### Patch Changes

- [`94448f306ed`](https://bitbucket.org/atlassian/atlassian-frontend/commits/94448f306ed) - AK-330 Fix editor toolbar and quick insert menu items pronounced twice by screen readers
- Updated dependencies

## 15.3.1

### Patch Changes

- Updated dependencies

## 15.3.0

### Minor Changes

- [`77751bd59e3`](https://bitbucket.org/atlassian/atlassian-frontend/commits/77751bd59e3) - Generate localIds for existing tables
- [`2fd50f55028`](https://bitbucket.org/atlassian/atlassian-frontend/commits/2fd50f55028) - Updating documentation to inform users that soon picker popup will no longer be available and also getting rid of picker popup references in examples and all the associated dependencies

### Patch Changes

- [`ddecaf6f306`](https://bitbucket.org/atlassian/atlassian-frontend/commits/ddecaf6f306) - ED-12436 remove 'allowLocalIdGeneration' from Editor as extension localId is added to full schema
- [`5d8e5bd7d50`](https://bitbucket.org/atlassian/atlassian-frontend/commits/5d8e5bd7d50) - [ux] Added support for dynamic getFieldsDefinition() in Editor Extensions.

  Made changes to the extension config panel fields so it triggers a submit only if the field is "dirty".

- Updated dependencies

## 15.2.1

### Patch Changes

- Updated dependencies

## 15.2.0

### Minor Changes

- [`0c2f73791da`](https://bitbucket.org/atlassian/atlassian-frontend/commits/0c2f73791da) - [ED-11915] Add useUnpredictableInputRule for editor prosemirror plugins

### Patch Changes

- Updated dependencies

## 15.1.0

### Minor Changes

- [`653093877f8`](https://bitbucket.org/atlassian/atlassian-frontend/commits/653093877f8) - Update data-consumer behaviour for json transforming

### Patch Changes

- Updated dependencies

## 15.0.1

### Patch Changes

- Updated dependencies

## 15.0.0

### Major Changes

- [`58b170725be`](https://bitbucket.org/atlassian/atlassian-frontend/commits/58b170725be) - Renamed @atlaskit/editor-test-helpers/schema-builder to @atlaskit/editor-test-helpers/doc-builder

### Patch Changes

- Updated dependencies

## 14.0.3

### Patch Changes

- [`e6bd5669a53`](https://bitbucket.org/atlassian/atlassian-frontend/commits/e6bd5669a53) - ED-10888 Deduplicate AJV initialization from our codebase
- [`d2e70ebaaa9`](https://bitbucket.org/atlassian/atlassian-frontend/commits/d2e70ebaaa9) - NO-ISSUE: updated editor tests to use 'doc: DocBuilder' instead of 'doc: any'
- [`fe1c96a3d28`](https://bitbucket.org/atlassian/atlassian-frontend/commits/fe1c96a3d28) - added DocBuilder type to @atlaskit/editor-test-helpers, replaced duplicate definitions and DocumentType
- [`b7e61c08ef5`](https://bitbucket.org/atlassian/atlassian-frontend/commits/b7e61c08ef5) - [ux] ED-11916 Extended floating toolbars on table and exension nodes with buttons that can be provided by extensions
- Updated dependencies

## 14.0.2

### Patch Changes

- Updated dependencies

## 14.0.1

### Patch Changes

- Updated dependencies

## 14.0.0

### Major Changes

- [`371c42fb774`](https://bitbucket.org/atlassian/atlassian-frontend/commits/371c42fb774) - ED-12041 - Removes chai as dependency from the repo

## 13.3.3

### Patch Changes

- Updated dependencies

## 13.3.2

### Patch Changes

- [`d361f290d63`](https://bitbucket.org/atlassian/atlassian-frontend/commits/d361f290d63) - NO-ISSUE avoid bundling test data for development

## 13.3.1

### Patch Changes

- [`a4e37d0df4`](https://bitbucket.org/atlassian/atlassian-frontend/commits/a4e37d0df4) - Fix EDM-1636 again
- Updated dependencies

## 13.3.0

### Minor Changes

- [`22c89bff23`](https://bitbucket.org/atlassian/atlassian-frontend/commits/22c89bff23) - [ED-11493][twista-405] Add predictable list at the mobile bridge plugin subscription

### Patch Changes

- Updated dependencies

## 13.2.1

### Patch Changes

- Updated dependencies

## 13.2.0

### Minor Changes

- [`dfd440f4b5`](https://bitbucket.org/atlassian/atlassian-frontend/commits/dfd440f4b5) - [ux] New functionality to add and remove captions to images and videos. Select an image or video in the editor to start using it!
  editor-core now exports dedupe which aids in not having duplicate plugins added when initialising an editor

### Patch Changes

- Updated dependencies

## 13.1.3

### Patch Changes

- [`d3265f19be`](https://bitbucket.org/atlassian/atlassian-frontend/commits/d3265f19be) - Transpile packages using babel rather than tsc

## 13.1.2

### Patch Changes

- [`0175a00afc`](https://bitbucket.org/atlassian/atlassian-frontend/commits/0175a00afc) - [ED-10670] Update prosemirror-model type to use posAtIndex methods
- [`af832a83e8`](https://bitbucket.org/atlassian/atlassian-frontend/commits/af832a83e8) - [ED-10671] Predictable Lists: Fix Paste Lists inside of panels

  ## Before

  Insert lists inside of at the begin of a panel was removing the panel

  ## Now

  It is adding the lists right before the current content

- Updated dependencies

## 13.1.1

### Patch Changes

- [`677744c680`](https://bitbucket.org/atlassian/atlassian-frontend/commits/677744c680) - Add UserSelect field for ConfigPanel, and expose types in SmartUserPicker
- [`703752d487`](https://bitbucket.org/atlassian/atlassian-frontend/commits/703752d487) - ED-10647 Remove caret from prosemirror-model, prosemirror-keymap, prosemirror-state, prosemirror-transform to lock them down to an explicit version
- Updated dependencies

## 13.1.0

### Minor Changes

- [`329fe5625b`](https://bitbucket.org/atlassian/atlassian-frontend/commits/329fe5625b) - Add helper function for creating an editor state with a given document

### Patch Changes

- [`e4abda244e`](https://bitbucket.org/atlassian/atlassian-frontend/commits/e4abda244e) - ED-9912: replace prosemirror-tables with editor-tables
- Updated dependencies

## 13.0.2

### Patch Changes

- [`5f58283e1f`](https://bitbucket.org/atlassian/atlassian-frontend/commits/5f58283e1f) - Export types using Typescript's new "export type" syntax to satisfy Typescript's --isolatedModules compiler option.
  This requires version 3.8 of Typescript, read more about how we handle Typescript versions here: https://atlaskit.atlassian.com/get-started
  Also add `typescript` to `devDependencies` to denote version that the package was built with.

## 13.0.1

### Patch Changes

- Updated dependencies

## 13.0.0

### Major Changes

- [`1fe54fd57e`](https://bitbucket.org/atlassian/atlassian-frontend/commits/1fe54fd57e) - Use real images in VR tests

### Minor Changes

- [`dd849c6a0c`](https://bitbucket.org/atlassian/atlassian-frontend/commits/dd849c6a0c) - [ED-9500] Removes sendDataOnViewUpdated property from EditorProps.

  # BREAKING CHANGE:

  ## WHAT:

  Editor component doesn't need the `sendDataOnViewUpdated` prop anymore.

  ## WHY:

  The test was done and all transaction are using the Public API: `onEditorViewStateUpdated`.

  ## HOW:

  Replace this:

  ```
  <Editor
    collabEdit={{
      sendDataOnViewUpdated: true,
    }}
    />
  ```

  To this:

  ```
  <Editor
    collabEdit={{ }}
    />

  ```

- [`9a39500244`](https://bitbucket.org/atlassian/atlassian-frontend/commits/9a39500244) - Bump ProseMirror packages

  Read more: https://product-fabric.atlassian.net/wiki/spaces/E/pages/1671956531/2020-08

### Patch Changes

- [`2d4bbe5e2e`](https://bitbucket.org/atlassian/atlassian-frontend/commits/2d4bbe5e2e) - [ED-10503] Fix prosemirror-view version at 1.15.4 without carret
- Updated dependencies

## 12.2.1

### Patch Changes

- Updated dependencies

## 12.2.0

### Minor Changes

- [`44d287b640`](https://bitbucket.org/atlassian/atlassian-frontend/commits/44d287b640) - EDM-842: Adding support to the new search provider and activity provider
- [`18f3f69ed9`](https://bitbucket.org/atlassian/atlassian-frontend/commits/18f3f69ed9) - ED-10110: Add support to featured quickinsert items
- [`e4114d7053`](https://bitbucket.org/atlassian/atlassian-frontend/commits/e4114d7053) - ED-9607 - Preserve Unsupported Node attributes

### Patch Changes

- [`e485167c47`](https://bitbucket.org/atlassian/atlassian-frontend/commits/e485167c47) - ED-10018: bump prosemirror-tables to fix copy-pasting merged rows
- [`250b6247ed`](https://bitbucket.org/atlassian/atlassian-frontend/commits/250b6247ed) - ED-8952: Add analytics events for config and element browser
- [`2914e9ec0a`](https://bitbucket.org/atlassian/atlassian-frontend/commits/2914e9ec0a) - Change EditorManifest generic to propagate instead of defaulting to any
- Updated dependencies

## 12.1.3

### Patch Changes

- [`cd32d3a1f4`](https://bitbucket.org/atlassian/atlassian-frontend/commits/cd32d3a1f4) - CS-3048 Embed cards now round trip in wiki<->adf conversions

## 12.1.2

### Patch Changes

- [`6c525a8229`](https://bitbucket.org/atlassian/atlassian-frontend/commits/6c525a8229) - Upgraded to TypeScript 3.9.6 and tslib to 2.0.0

  Since tslib is a dependency for all our packages we recommend that products also follow this tslib upgrade
  to prevent duplicates of tslib being bundled.

## 12.1.1

### Patch Changes

- [`bd1b6db96a`](https://bitbucket.org/atlassian/atlassian-frontend/commits/bd1b6db96a) - ED-9651: Pass intl to plugin constructors
- [`889a2d9486`](https://bitbucket.org/atlassian/atlassian-frontend/commits/889a2d9486) - fix: updated error views for all Inline and Block links
- Updated dependencies

## 12.1.0

### Minor Changes

- [`5524c7095c`](https://bitbucket.org/atlassian/atlassian-frontend/commits/5524c7095c) - Add @atlaskit/editor-test-helpers/smart-card entry point utility
- [`6723d1e7c8`](https://bitbucket.org/atlassian/atlassian-frontend/commits/6723d1e7c8) - ED-9610: Use presets inside create plugins list
- [`cd2bb0b854`](https://bitbucket.org/atlassian/atlassian-frontend/commits/cd2bb0b854) - Add url match to simulate links which are supported by smartlinks in card-provider
- [`faf010cbc3`](https://bitbucket.org/atlassian/atlassian-frontend/commits/faf010cbc3) - ED-9212: Add support for extension auto convert

  ## Breaking changes:

  Renamed the following exports from '@atlaskit/editor-common/extensions':

  - from `ExtensionModuleType` to `ExtensionQuickInsertModule`;
  - from `getItemsFromModule` to `getQuickInsertItemsFromModule`,

  Renamed the following exports from '@atlaskit/editor-common':

  - from `ExtensionModuleType` to `ExtensionQuickInsertModule`;

### Patch Changes

- [`8f2f2422a1`](https://bitbucket.org/atlassian/atlassian-frontend/commits/8f2f2422a1) - EDM-955: Fix error state height for embeds
- Updated dependencies

## 12.0.0

### Major Changes

- [`87f4720f27`](https://bitbucket.org/atlassian/atlassian-frontend/commits/87f4720f27) - Officially dropping IE11 support, from this version onwards there are no warranties of the package working in IE11.
  For more information see: https://community.developer.atlassian.com/t/atlaskit-to-drop-support-for-internet-explorer-11-from-1st-july-2020/39534

### Patch Changes

- Updated dependencies

## 11.3.1

### Patch Changes

- [`ba7242598f`](https://bitbucket.org/atlassian/atlassian-frontend/commits/ba7242598f) - CEMS-378 load macro title from macroMetadata
- Updated dependencies

## 11.3.0

### Minor Changes

- [`0ae829a4ea`](https://bitbucket.org/atlassian/atlassian-frontend/commits/0ae829a4ea) - EDM-648: Adds resizing and alignment to embed cards

### Patch Changes

- [`6113a602e1`](https://bitbucket.org/atlassian/atlassian-frontend/commits/6113a602e1) - ED-9343 Added onClose for annotation view component
- Updated dependencies

## 11.2.0

### Minor Changes

- [`50c333ab3a`](https://bitbucket.org/atlassian/atlassian-frontend/commits/50c333ab3a) - EDM-216: Adds EmbedCards in the Editor under the flag - allowEmbeds in the UNSAFE_cards prop

### Patch Changes

- [`e30894b112`](https://bitbucket.org/atlassian/atlassian-frontend/commits/e30894b112) - [FM-3716] First Inline Comments implementation for Renderer
- [`ae043f4cf2`](https://bitbucket.org/atlassian/atlassian-frontend/commits/ae043f4cf2) - Export DispatchAnalyticsEvent via create-prosemirror-editor.ts. This allows testing of analytics events in unit tests without having to include the analytics plugin in the preset.
- [`68baa7f1a5`](https://bitbucket.org/atlassian/atlassian-frontend/commits/68baa7f1a5) - ED-9246 Remove `pollingInterval` from annotation provider. Add meta for `replaceDocument` actions.

  This change removes the `pollingInterval` property from the `annotationProvider` editor prop. This changes as the annotation provider no longer uses an internal timer, but rather subscribes and listens to a provided `AnnotationEventEmitter`.

  ### Before

  ```
  <Editor
    annotationProviders={{
      inlineComment: {
        pollingInterval: 1000, // <==== This property is being removed
        createComponent: ExampleCreateInlineCommentComponent,
        viewComponent: ExampleViewInlineCommentComponent,
        getState: this.inlineCommentGetState,
      },
    }}
  />
  ```

  ### After

  ```
  <Editor
    annotationProviders={{
      inlineComment: {
        createComponent: ExampleCreateInlineCommentComponent,
        viewComponent: ExampleViewInlineCommentComponent,
        getState: this.inlineCommentGetState,
      },
    }}
  />
  ```

- [`d31f2fd85b`](https://bitbucket.org/atlassian/atlassian-frontend/commits/d31f2fd85b) - ED-8917 Update annotation provider to sync updates with an EventEmitter

  As part of the inflight work of building annotations within the editor, the annotation provider API is being updated to be event based. This is part of the work to make the annotation provider no longer rely on a timer, rather make it rely on pushed updates from the consumer.

  This change also includes

  - Renaming of the Editor Prop `AnnotationProvider` to `AnnotationProviders` (plural).
  - Coupling the UI component with the relevant annotation provider
  - Adding the `updateSubscriber` attribute

  ### Before

  ```
  <Editor
    annotationProvider: {
      createComponent: ExampleCreateInlineCommentComponent,
      viewComponent: ExampleViewInlineCommentComponent,
      providers: {
        inlineComment: {
        getState: getCommentState,
      },
    }
  >
  ```

  ### After

  ```
  <Editor
    annotationProviders: {
      inlineComment: {
        createComponent: ExampleCreateInlineCommentComponent,
        viewComponent: ExampleViewInlineCommentComponent,
        getState: getCommentState,
        updateSubscriber: updateEmitter
      },
    }
  >
  ```

  Where `updateEmitter` is an instance of `AnnotationUpdateEmitter` imported from `@atlaskit/editor-core`. It's a strongly typed `EventEmitter` that should only fire with `resolve` and `unresolve`, passing a single `annotationId`.

  ```
  import {AnnotationUpdateEmitter} from '@atlaskit/editor-core';

  const updateEmitter = new AnnotationUpdateEmitter();
  updateEmitter.emit('resolve', myAnnotationId);
  ```

- [`54d82b49f0`](https://bitbucket.org/atlassian/atlassian-frontend/commits/54d82b49f0) - Remove unused dependencies
- Updated dependencies

## 11.1.2

### Patch Changes

- Updated dependencies

## 11.1.1

### Patch Changes

- Updated dependencies [7e4d4a7ed4](https://bitbucket.org/atlassian/atlassian-frontend/commits/7e4d4a7ed4):
- Updated dependencies [3b776be426](https://bitbucket.org/atlassian/atlassian-frontend/commits/3b776be426):
- Updated dependencies [999fbf849e](https://bitbucket.org/atlassian/atlassian-frontend/commits/999fbf849e):
- Updated dependencies [b202858f6c](https://bitbucket.org/atlassian/atlassian-frontend/commits/b202858f6c):
- Updated dependencies [9cee2b03e8](https://bitbucket.org/atlassian/atlassian-frontend/commits/9cee2b03e8):
- Updated dependencies [26de083801](https://bitbucket.org/atlassian/atlassian-frontend/commits/26de083801):
- Updated dependencies [d3cc97a424](https://bitbucket.org/atlassian/atlassian-frontend/commits/d3cc97a424):
- Updated dependencies [00f64f4eb8](https://bitbucket.org/atlassian/atlassian-frontend/commits/00f64f4eb8):
- Updated dependencies [4f70380793](https://bitbucket.org/atlassian/atlassian-frontend/commits/4f70380793):
- Updated dependencies [6b8e60827e](https://bitbucket.org/atlassian/atlassian-frontend/commits/6b8e60827e):
- Updated dependencies [92d04b5c28](https://bitbucket.org/atlassian/atlassian-frontend/commits/92d04b5c28):
- Updated dependencies [d6eb7bb49f](https://bitbucket.org/atlassian/atlassian-frontend/commits/d6eb7bb49f):
- Updated dependencies [449ef134b3](https://bitbucket.org/atlassian/atlassian-frontend/commits/449ef134b3):
- Updated dependencies [5b301bcdf6](https://bitbucket.org/atlassian/atlassian-frontend/commits/5b301bcdf6):
- Updated dependencies [729a4e4960](https://bitbucket.org/atlassian/atlassian-frontend/commits/729a4e4960):
- Updated dependencies [22704db5a3](https://bitbucket.org/atlassian/atlassian-frontend/commits/22704db5a3):
- Updated dependencies [acc12dba75](https://bitbucket.org/atlassian/atlassian-frontend/commits/acc12dba75):
- Updated dependencies [167a55fd7a](https://bitbucket.org/atlassian/atlassian-frontend/commits/167a55fd7a):
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
  - @atlaskit/smart-card@13.2.0
  - @atlaskit/editor-common@45.1.0
  - @atlaskit/button@13.3.11
  - @atlaskit/adf-schema@9.0.1
  - @atlaskit/icon@20.1.1
  - @atlaskit/avatar@17.1.10

## 11.1.0

### Minor Changes

- [minor][205b05851a](https://bitbucket.org/atlassian/atlassian-frontend/commits/205b05851a):

  ED-8693: Integrate Config Panel to editor- [minor][3644fc1afe](https://bitbucket.org/atlassian/atlassian-frontend/commits/3644fc1afe):

  Enable slash command on editor-mobile-bridge:

  - All changes under `enableQuickInsert` flag consumed from query parameters.
  - This PR introduces basic changes in order to test, _THIS IS NOT PRODUCTION READY!_
  - All quick insert items present under `/` command on web, will be sent to native. Following up with this PR we will implement an opt in approach to define which items will be enabled on mobile only.- [minor][6eb8c0799f](https://bitbucket.org/atlassian/atlassian-frontend/commits/6eb8c0799f):

  UX enhancements for Config Panel

### Patch Changes

- [patch][7e26fba915](https://bitbucket.org/atlassian/atlassian-frontend/commits/7e26fba915):

  ED-8911 Add ability to create annotation on document from annotation component- [patch][823d80f31c](https://bitbucket.org/atlassian/atlassian-frontend/commits/823d80f31c):

  ED-8982 Split annotation UI component into two pieces

  Changed the Editor's `annotationProvider` interface to split the annotation component into two parts. A `createComponent` and `viewComponent`.

  ### Before

  ```
  <Editor
    annotationProvider={
      component: InlineCommentComponent,
      ...
    }
  />
  ```

  ### After

  See example use case at `packages/editor-core/examples/26-annotation-experiment.tsx`

  ```
  <Editor
    annotationProvider={
      createComponent: CreateInlineCommentComponent,
      viewComponent: ViewInlineCommentComponent,
      ...
    }
  />
  ```

  Where `CreateInlineCommentComponent` methods are

  ```
  /**
    * Creates an annotation mark in the document with the given id.
    */
  onCreate: (id: string) => void;

  /**
    * Indicates that a draft comment was discarded/cancelled
    */
  onClose?: () => void;
  ```

  Where `ViewInlineCommentComponent` methods are

  ````
  /**
    * Resolves an annotation with the given ID around the selection.
    */
  onResolve: (id: string) => void;

  /**
    * Removes the annotation from the document
    */
  onDelete?: (id: string) => void;
  ```- [patch] [62f1f218d9](https://bitbucket.org/atlassian/atlassian-frontend/commits/62f1f218d9):

  ED-8910 Add transition to open create comment dialogue from floating toolbar- Updated dependencies [17cc5dde5d](https://bitbucket.org/atlassian/atlassian-frontend/commits/17cc5dde5d):
  ````

- Updated dependencies [2a87a3bbc5](https://bitbucket.org/atlassian/atlassian-frontend/commits/2a87a3bbc5):
- Updated dependencies [6a6a991904](https://bitbucket.org/atlassian/atlassian-frontend/commits/6a6a991904):
- Updated dependencies [9b2570e7f1](https://bitbucket.org/atlassian/atlassian-frontend/commits/9b2570e7f1):
- Updated dependencies [04e54bf405](https://bitbucket.org/atlassian/atlassian-frontend/commits/04e54bf405):
- Updated dependencies [af10890541](https://bitbucket.org/atlassian/atlassian-frontend/commits/af10890541):
- Updated dependencies [cf7a2d7506](https://bitbucket.org/atlassian/atlassian-frontend/commits/cf7a2d7506):
- Updated dependencies [759f0a5ca7](https://bitbucket.org/atlassian/atlassian-frontend/commits/759f0a5ca7):
- Updated dependencies [84f82f7015](https://bitbucket.org/atlassian/atlassian-frontend/commits/84f82f7015):
- Updated dependencies [9f43b9f0ca](https://bitbucket.org/atlassian/atlassian-frontend/commits/9f43b9f0ca):
- Updated dependencies [c74cc954d8](https://bitbucket.org/atlassian/atlassian-frontend/commits/c74cc954d8):
- Updated dependencies [b4326a7eba](https://bitbucket.org/atlassian/atlassian-frontend/commits/b4326a7eba):
- Updated dependencies [6641c9c5b5](https://bitbucket.org/atlassian/atlassian-frontend/commits/6641c9c5b5):
- Updated dependencies [a81ce649c8](https://bitbucket.org/atlassian/atlassian-frontend/commits/a81ce649c8):
- Updated dependencies [e4076915c8](https://bitbucket.org/atlassian/atlassian-frontend/commits/e4076915c8):
- Updated dependencies [bdb4da1fc0](https://bitbucket.org/atlassian/atlassian-frontend/commits/bdb4da1fc0):
- Updated dependencies [c51f0b4c70](https://bitbucket.org/atlassian/atlassian-frontend/commits/c51f0b4c70):
- Updated dependencies [7ec160c0e2](https://bitbucket.org/atlassian/atlassian-frontend/commits/7ec160c0e2):
- Updated dependencies [f061ed6c98](https://bitbucket.org/atlassian/atlassian-frontend/commits/f061ed6c98):
- Updated dependencies [4070d17415](https://bitbucket.org/atlassian/atlassian-frontend/commits/4070d17415):
- Updated dependencies [5d430f7d37](https://bitbucket.org/atlassian/atlassian-frontend/commits/5d430f7d37):
- Updated dependencies [7e26fba915](https://bitbucket.org/atlassian/atlassian-frontend/commits/7e26fba915):
- Updated dependencies [49dbcfa64c](https://bitbucket.org/atlassian/atlassian-frontend/commits/49dbcfa64c):
- Updated dependencies [e9d555132d](https://bitbucket.org/atlassian/atlassian-frontend/commits/e9d555132d):
- Updated dependencies [5167f09a83](https://bitbucket.org/atlassian/atlassian-frontend/commits/5167f09a83):
- Updated dependencies [91ff8d36f0](https://bitbucket.org/atlassian/atlassian-frontend/commits/91ff8d36f0):
- Updated dependencies [05539b052e](https://bitbucket.org/atlassian/atlassian-frontend/commits/05539b052e):
- Updated dependencies [a1ee397cbc](https://bitbucket.org/atlassian/atlassian-frontend/commits/a1ee397cbc):
- Updated dependencies [dc84dfa3bc](https://bitbucket.org/atlassian/atlassian-frontend/commits/dc84dfa3bc):
- Updated dependencies [318a1a0f2f](https://bitbucket.org/atlassian/atlassian-frontend/commits/318a1a0f2f):
- Updated dependencies [550c4b5018](https://bitbucket.org/atlassian/atlassian-frontend/commits/550c4b5018):
- Updated dependencies [9691bb8eb9](https://bitbucket.org/atlassian/atlassian-frontend/commits/9691bb8eb9):
- Updated dependencies [11ff95c0f0](https://bitbucket.org/atlassian/atlassian-frontend/commits/11ff95c0f0):
- Updated dependencies [03a83cb954](https://bitbucket.org/atlassian/atlassian-frontend/commits/03a83cb954):
- Updated dependencies [ae426d5e97](https://bitbucket.org/atlassian/atlassian-frontend/commits/ae426d5e97):
- Updated dependencies [e21800fd1c](https://bitbucket.org/atlassian/atlassian-frontend/commits/e21800fd1c):
- Updated dependencies [109004a98e](https://bitbucket.org/atlassian/atlassian-frontend/commits/109004a98e):
- Updated dependencies [205b05851a](https://bitbucket.org/atlassian/atlassian-frontend/commits/205b05851a):
- Updated dependencies [823d80f31c](https://bitbucket.org/atlassian/atlassian-frontend/commits/823d80f31c):
- Updated dependencies [41917f4c16](https://bitbucket.org/atlassian/atlassian-frontend/commits/41917f4c16):
- Updated dependencies [69b678b38c](https://bitbucket.org/atlassian/atlassian-frontend/commits/69b678b38c):
- Updated dependencies [9dd4b9088b](https://bitbucket.org/atlassian/atlassian-frontend/commits/9dd4b9088b):
- Updated dependencies [0b22d3b9ea](https://bitbucket.org/atlassian/atlassian-frontend/commits/0b22d3b9ea):
- Updated dependencies [91304da441](https://bitbucket.org/atlassian/atlassian-frontend/commits/91304da441):
- Updated dependencies [b4ef7fe214](https://bitbucket.org/atlassian/atlassian-frontend/commits/b4ef7fe214):
- Updated dependencies [3644fc1afe](https://bitbucket.org/atlassian/atlassian-frontend/commits/3644fc1afe):
- Updated dependencies [b2402fc3a2](https://bitbucket.org/atlassian/atlassian-frontend/commits/b2402fc3a2):
- Updated dependencies [971df84f45](https://bitbucket.org/atlassian/atlassian-frontend/commits/971df84f45):
- Updated dependencies [ba8c2c4129](https://bitbucket.org/atlassian/atlassian-frontend/commits/ba8c2c4129):
- Updated dependencies [0ab75c545b](https://bitbucket.org/atlassian/atlassian-frontend/commits/0ab75c545b):
- Updated dependencies [62f1f218d9](https://bitbucket.org/atlassian/atlassian-frontend/commits/62f1f218d9):
- Updated dependencies [67bc25bc3f](https://bitbucket.org/atlassian/atlassian-frontend/commits/67bc25bc3f):
- Updated dependencies [0376c2f4fe](https://bitbucket.org/atlassian/atlassian-frontend/commits/0376c2f4fe):
- Updated dependencies [6eb8c0799f](https://bitbucket.org/atlassian/atlassian-frontend/commits/6eb8c0799f):
- Updated dependencies [5f75dd27c9](https://bitbucket.org/atlassian/atlassian-frontend/commits/5f75dd27c9):
- Updated dependencies [f3587bae11](https://bitbucket.org/atlassian/atlassian-frontend/commits/f3587bae11):
- Updated dependencies [8c8f0099d8](https://bitbucket.org/atlassian/atlassian-frontend/commits/8c8f0099d8):
- Updated dependencies [287be84065](https://bitbucket.org/atlassian/atlassian-frontend/commits/287be84065):
- Updated dependencies [fb8725beac](https://bitbucket.org/atlassian/atlassian-frontend/commits/fb8725beac):
- Updated dependencies [7e363d5aba](https://bitbucket.org/atlassian/atlassian-frontend/commits/7e363d5aba):
  - @atlaskit/smart-card@13.1.0
  - @atlaskit/editor-core@121.0.0
  - @atlaskit/media-test-helpers@27.2.0
  - @atlaskit/adf-schema@9.0.0
  - @atlaskit/editor-common@45.0.0
  - @atlaskit/analytics-listeners@6.3.0
  - @atlaskit/analytics-next@6.3.6
  - @atlaskit/button@13.3.10
  - @atlaskit/textarea@2.2.7

## 11.0.0

### Major Changes

- [major][4bec09aa74](https://bitbucket.org/atlassian/atlassian-frontend/commits/4bec09aa74):

  ED-8875 Remove async method from prosemirror test helper

  BREAKING CHANGE

  Before `createProsemirrorEditorFactory` return an async function, this is no longer true.- [major][bdf25b1c4c](https://bitbucket.org/atlassian/atlassian-frontend/commits/bdf25b1c4c):

  ED-8865 ProseMirror Test Helper deprecated apis and change schema creation

  BREAKING CHANGE

  `plugins` options has been deprecated in favor of `preset`

  Schema is created based on the editor plugins passed- [major][645918eda6](https://bitbucket.org/atlassian/atlassian-frontend/commits/645918eda6):

  ED-8751 Remove 'export \*' from editor test helpers.

### Minor Changes

- [minor][d63888b5e5](https://bitbucket.org/atlassian/atlassian-frontend/commits/d63888b5e5):

  ED-9179: Add support to CQL-like fields

  NOTE: This feature requires the [AbortController|https://developer.mozilla.org/en-US/docs/Web/API/AbortController] which is not supported on IE11.
  Consumers of the editor supporting IE11 should ensure there is a polyfill in place.- [minor][fad8a16962](https://bitbucket.org/atlassian/atlassian-frontend/commits/fad8a16962):

  ED-8799: feat: add InstrumentedPlugin API

### Patch Changes

- Updated dependencies [9fd8ba7707](https://bitbucket.org/atlassian/atlassian-frontend/commits/9fd8ba7707):
- Updated dependencies [bc29fbc030](https://bitbucket.org/atlassian/atlassian-frontend/commits/bc29fbc030):
- Updated dependencies [7d80e44c09](https://bitbucket.org/atlassian/atlassian-frontend/commits/7d80e44c09):
- Updated dependencies [4c691c3b5f](https://bitbucket.org/atlassian/atlassian-frontend/commits/4c691c3b5f):
- Updated dependencies [d63513575b](https://bitbucket.org/atlassian/atlassian-frontend/commits/d63513575b):
- Updated dependencies [1386afaecc](https://bitbucket.org/atlassian/atlassian-frontend/commits/1386afaecc):
- Updated dependencies [48f0ecf23e](https://bitbucket.org/atlassian/atlassian-frontend/commits/48f0ecf23e):
- Updated dependencies [130b83ccba](https://bitbucket.org/atlassian/atlassian-frontend/commits/130b83ccba):
- Updated dependencies [5180a51c0d](https://bitbucket.org/atlassian/atlassian-frontend/commits/5180a51c0d):
- Updated dependencies [584279e2ae](https://bitbucket.org/atlassian/atlassian-frontend/commits/584279e2ae):
- Updated dependencies [067febb0a7](https://bitbucket.org/atlassian/atlassian-frontend/commits/067febb0a7):
- Updated dependencies [66cf61863f](https://bitbucket.org/atlassian/atlassian-frontend/commits/66cf61863f):
- Updated dependencies [f83b67a761](https://bitbucket.org/atlassian/atlassian-frontend/commits/f83b67a761):
- Updated dependencies [22d9c96ed2](https://bitbucket.org/atlassian/atlassian-frontend/commits/22d9c96ed2):
- Updated dependencies [a9e9604c8e](https://bitbucket.org/atlassian/atlassian-frontend/commits/a9e9604c8e):
- Updated dependencies [8126e7648c](https://bitbucket.org/atlassian/atlassian-frontend/commits/8126e7648c):
- Updated dependencies [b41beace3f](https://bitbucket.org/atlassian/atlassian-frontend/commits/b41beace3f):
- Updated dependencies [02425bf2d7](https://bitbucket.org/atlassian/atlassian-frontend/commits/02425bf2d7):
- Updated dependencies [6b4fe5d0e0](https://bitbucket.org/atlassian/atlassian-frontend/commits/6b4fe5d0e0):
- Updated dependencies [953cfadbe3](https://bitbucket.org/atlassian/atlassian-frontend/commits/953cfadbe3):
- Updated dependencies [29b0315dcb](https://bitbucket.org/atlassian/atlassian-frontend/commits/29b0315dcb):
- Updated dependencies [d49ebd7c7a](https://bitbucket.org/atlassian/atlassian-frontend/commits/d49ebd7c7a):
- Updated dependencies [aa4dc7f5d6](https://bitbucket.org/atlassian/atlassian-frontend/commits/aa4dc7f5d6):
- Updated dependencies [d63888b5e5](https://bitbucket.org/atlassian/atlassian-frontend/commits/d63888b5e5):
- Updated dependencies [13a0e50f38](https://bitbucket.org/atlassian/atlassian-frontend/commits/13a0e50f38):
- Updated dependencies [0a0a54cb47](https://bitbucket.org/atlassian/atlassian-frontend/commits/0a0a54cb47):
- Updated dependencies [6dcad31e41](https://bitbucket.org/atlassian/atlassian-frontend/commits/6dcad31e41):
- Updated dependencies [3cbc8a49a2](https://bitbucket.org/atlassian/atlassian-frontend/commits/3cbc8a49a2):
- Updated dependencies [6242ec17a2](https://bitbucket.org/atlassian/atlassian-frontend/commits/6242ec17a2):
- Updated dependencies [6b65ae4f04](https://bitbucket.org/atlassian/atlassian-frontend/commits/6b65ae4f04):
- Updated dependencies [fad8a16962](https://bitbucket.org/atlassian/atlassian-frontend/commits/fad8a16962):
- Updated dependencies [715572f9e5](https://bitbucket.org/atlassian/atlassian-frontend/commits/715572f9e5):
- Updated dependencies [cc54ca2490](https://bitbucket.org/atlassian/atlassian-frontend/commits/cc54ca2490):
  - @atlaskit/editor-core@120.0.0
  - @atlaskit/adf-schema@8.0.0
  - @atlaskit/editor-common@44.1.0
  - @atlaskit/media-test-helpers@27.1.0
  - @atlaskit/media-core@31.1.0

## 10.6.1

### Patch Changes

- [patch][5e3aab8e77](https://bitbucket.org/atlassian/atlassian-frontend/commits/5e3aab8e77):

  pass originalDimensions to media-card- Updated dependencies [bc380c30ce](https://bitbucket.org/atlassian/atlassian-frontend/commits/bc380c30ce):

- Updated dependencies [cc0d9f6ede](https://bitbucket.org/atlassian/atlassian-frontend/commits/cc0d9f6ede):
- Updated dependencies [6384746272](https://bitbucket.org/atlassian/atlassian-frontend/commits/6384746272):
- Updated dependencies [7602615cd4](https://bitbucket.org/atlassian/atlassian-frontend/commits/7602615cd4):
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
- Updated dependencies [0732eedea7](https://bitbucket.org/atlassian/atlassian-frontend/commits/0732eedea7):
- Updated dependencies [113d075684](https://bitbucket.org/atlassian/atlassian-frontend/commits/113d075684):
- Updated dependencies [af8a3763dd](https://bitbucket.org/atlassian/atlassian-frontend/commits/af8a3763dd):
- Updated dependencies [21a1faf014](https://bitbucket.org/atlassian/atlassian-frontend/commits/21a1faf014):
- Updated dependencies [c171660346](https://bitbucket.org/atlassian/atlassian-frontend/commits/c171660346):
- Updated dependencies [94116c6018](https://bitbucket.org/atlassian/atlassian-frontend/commits/94116c6018):
- Updated dependencies [9fadef064b](https://bitbucket.org/atlassian/atlassian-frontend/commits/9fadef064b):
- Updated dependencies [27fde59914](https://bitbucket.org/atlassian/atlassian-frontend/commits/27fde59914):
- Updated dependencies [f8ffc8320f](https://bitbucket.org/atlassian/atlassian-frontend/commits/f8ffc8320f):
- Updated dependencies [b18fc8a1b6](https://bitbucket.org/atlassian/atlassian-frontend/commits/b18fc8a1b6):
- Updated dependencies [196500df34](https://bitbucket.org/atlassian/atlassian-frontend/commits/196500df34):
- Updated dependencies [469e9a2302](https://bitbucket.org/atlassian/atlassian-frontend/commits/469e9a2302):
- Updated dependencies [a41d2345eb](https://bitbucket.org/atlassian/atlassian-frontend/commits/a41d2345eb):
- Updated dependencies [4ef23b6a15](https://bitbucket.org/atlassian/atlassian-frontend/commits/4ef23b6a15):
- Updated dependencies [d7ed7b1513](https://bitbucket.org/atlassian/atlassian-frontend/commits/d7ed7b1513):
- Updated dependencies [41a2496393](https://bitbucket.org/atlassian/atlassian-frontend/commits/41a2496393):
- Updated dependencies [7baff84f38](https://bitbucket.org/atlassian/atlassian-frontend/commits/7baff84f38):
- Updated dependencies [8cc5cc0603](https://bitbucket.org/atlassian/atlassian-frontend/commits/8cc5cc0603):
- Updated dependencies [5d8a0d4f5f](https://bitbucket.org/atlassian/atlassian-frontend/commits/5d8a0d4f5f):
- Updated dependencies [faa96cee2a](https://bitbucket.org/atlassian/atlassian-frontend/commits/faa96cee2a):
- Updated dependencies [535286e8c4](https://bitbucket.org/atlassian/atlassian-frontend/commits/535286e8c4):
- Updated dependencies [fd5292fd5a](https://bitbucket.org/atlassian/atlassian-frontend/commits/fd5292fd5a):
- Updated dependencies [025842de1a](https://bitbucket.org/atlassian/atlassian-frontend/commits/025842de1a):
- Updated dependencies [bbf5eb8824](https://bitbucket.org/atlassian/atlassian-frontend/commits/bbf5eb8824):
- Updated dependencies [6b06a7baa9](https://bitbucket.org/atlassian/atlassian-frontend/commits/6b06a7baa9):
- Updated dependencies [de64f9373c](https://bitbucket.org/atlassian/atlassian-frontend/commits/de64f9373c):
- Updated dependencies [93ac94a762](https://bitbucket.org/atlassian/atlassian-frontend/commits/93ac94a762):
- Updated dependencies [fd5292fd5a](https://bitbucket.org/atlassian/atlassian-frontend/commits/fd5292fd5a):
- Updated dependencies [172a864d19](https://bitbucket.org/atlassian/atlassian-frontend/commits/172a864d19):
- Updated dependencies [a5d0019a5e](https://bitbucket.org/atlassian/atlassian-frontend/commits/a5d0019a5e):
- Updated dependencies [6a417f2e52](https://bitbucket.org/atlassian/atlassian-frontend/commits/6a417f2e52):
- Updated dependencies [8b34c7371d](https://bitbucket.org/atlassian/atlassian-frontend/commits/8b34c7371d):
- Updated dependencies [5e3aab8e77](https://bitbucket.org/atlassian/atlassian-frontend/commits/5e3aab8e77):
- Updated dependencies [fdf6c939e8](https://bitbucket.org/atlassian/atlassian-frontend/commits/fdf6c939e8):
- Updated dependencies [395739b5ef](https://bitbucket.org/atlassian/atlassian-frontend/commits/395739b5ef):
- Updated dependencies [77474b6821](https://bitbucket.org/atlassian/atlassian-frontend/commits/77474b6821):
  - @atlaskit/editor-common@44.0.2
  - @atlaskit/editor-core@119.0.0
  - @atlaskit/adf-schema@7.0.0
  - @atlaskit/icon@20.1.0
  - @atlaskit/media-test-helpers@27.0.0
  - @atlaskit/smart-card@13.0.0
  - @atlaskit/media-core@31.0.5
  - @atlaskit/avatar@17.1.9
  - @atlaskit/button@13.3.9
  - @atlaskit/textarea@2.2.6

## 10.6.0

### Minor Changes

- [minor][9d6b02c04f](https://bitbucket.org/atlassian/atlassian-frontend/commits/9d6b02c04f):

  ED-8005 Use the new provider types directly from provider factory entry point in editor-common

### Patch Changes

- [patch][8183f7c8da](https://bitbucket.org/atlassian/atlassian-frontend/commits/8183f7c8da):

  Remove Karma tests - based on AFP-960- Updated dependencies [6403a54812](https://bitbucket.org/atlassian/atlassian-frontend/commits/6403a54812):

- Updated dependencies [9e90cb4336](https://bitbucket.org/atlassian/atlassian-frontend/commits/9e90cb4336):
- Updated dependencies [e8a31c2714](https://bitbucket.org/atlassian/atlassian-frontend/commits/e8a31c2714):
- Updated dependencies [f46330c0ab](https://bitbucket.org/atlassian/atlassian-frontend/commits/f46330c0ab):
- Updated dependencies [d6f207a598](https://bitbucket.org/atlassian/atlassian-frontend/commits/d6f207a598):
- Updated dependencies [40359da294](https://bitbucket.org/atlassian/atlassian-frontend/commits/40359da294):
- Updated dependencies [151240fce9](https://bitbucket.org/atlassian/atlassian-frontend/commits/151240fce9):
- Updated dependencies [8d09cd0408](https://bitbucket.org/atlassian/atlassian-frontend/commits/8d09cd0408):
- Updated dependencies [088f4f7d1e](https://bitbucket.org/atlassian/atlassian-frontend/commits/088f4f7d1e):
- Updated dependencies [9d6b02c04f](https://bitbucket.org/atlassian/atlassian-frontend/commits/9d6b02c04f):
- Updated dependencies [f709e92247](https://bitbucket.org/atlassian/atlassian-frontend/commits/f709e92247):
- Updated dependencies [8183f7c8da](https://bitbucket.org/atlassian/atlassian-frontend/commits/8183f7c8da):
- Updated dependencies [7aad7888b4](https://bitbucket.org/atlassian/atlassian-frontend/commits/7aad7888b4):
- Updated dependencies [a5c3717d0b](https://bitbucket.org/atlassian/atlassian-frontend/commits/a5c3717d0b):
- Updated dependencies [b924951169](https://bitbucket.org/atlassian/atlassian-frontend/commits/b924951169):
- Updated dependencies [37a79cb1bc](https://bitbucket.org/atlassian/atlassian-frontend/commits/37a79cb1bc):
- Updated dependencies [47d7b34f75](https://bitbucket.org/atlassian/atlassian-frontend/commits/47d7b34f75):
- Updated dependencies [79cabaee0c](https://bitbucket.org/atlassian/atlassian-frontend/commits/79cabaee0c):
- Updated dependencies [5a0167db78](https://bitbucket.org/atlassian/atlassian-frontend/commits/5a0167db78):
- Updated dependencies [ded54f7b9f](https://bitbucket.org/atlassian/atlassian-frontend/commits/ded54f7b9f):
- Updated dependencies [b3b2f413c1](https://bitbucket.org/atlassian/atlassian-frontend/commits/b3b2f413c1):
- Updated dependencies [0603860c07](https://bitbucket.org/atlassian/atlassian-frontend/commits/0603860c07):
- Updated dependencies [8f41931365](https://bitbucket.org/atlassian/atlassian-frontend/commits/8f41931365):
- Updated dependencies [d59113061a](https://bitbucket.org/atlassian/atlassian-frontend/commits/d59113061a):
- Updated dependencies [cedfb7766c](https://bitbucket.org/atlassian/atlassian-frontend/commits/cedfb7766c):
- Updated dependencies [2361b8d044](https://bitbucket.org/atlassian/atlassian-frontend/commits/2361b8d044):
- Updated dependencies [1028ab4db3](https://bitbucket.org/atlassian/atlassian-frontend/commits/1028ab4db3):
- Updated dependencies [57ea6ea77a](https://bitbucket.org/atlassian/atlassian-frontend/commits/57ea6ea77a):
- Updated dependencies [ff6e928368](https://bitbucket.org/atlassian/atlassian-frontend/commits/ff6e928368):
- Updated dependencies [4b3ced1d9f](https://bitbucket.org/atlassian/atlassian-frontend/commits/4b3ced1d9f):
- Updated dependencies [fdc0861682](https://bitbucket.org/atlassian/atlassian-frontend/commits/fdc0861682):
- Updated dependencies [00ddcd52df](https://bitbucket.org/atlassian/atlassian-frontend/commits/00ddcd52df):
- Updated dependencies [e3a8052151](https://bitbucket.org/atlassian/atlassian-frontend/commits/e3a8052151):
- Updated dependencies [c1992227dc](https://bitbucket.org/atlassian/atlassian-frontend/commits/c1992227dc):
- Updated dependencies [198639cd06](https://bitbucket.org/atlassian/atlassian-frontend/commits/198639cd06):
- Updated dependencies [13f0bbc125](https://bitbucket.org/atlassian/atlassian-frontend/commits/13f0bbc125):
- Updated dependencies [d7749cb6ab](https://bitbucket.org/atlassian/atlassian-frontend/commits/d7749cb6ab):
- Updated dependencies [c9842c9ada](https://bitbucket.org/atlassian/atlassian-frontend/commits/c9842c9ada):
- Updated dependencies [02b2a2079c](https://bitbucket.org/atlassian/atlassian-frontend/commits/02b2a2079c):
  - @atlaskit/editor-core@118.0.0
  - @atlaskit/editor-common@44.0.0
  - @atlaskit/adf-schema@6.2.0
  - @atlaskit/smart-card@12.7.0
  - @atlaskit/icon@20.0.2
  - @atlaskit/analytics-listeners@6.2.4
  - @atlaskit/media-test-helpers@26.1.2

## 10.5.1

### Patch Changes

- [patch][6548261c9a](https://bitbucket.org/atlassian/atlassian-frontend/commits/6548261c9a):

  Remove namespace imports from React, ReactDom, and PropTypes- Updated dependencies [6548261c9a](https://bitbucket.org/atlassian/atlassian-frontend/commits/6548261c9a):

  - @atlaskit/analytics-next@6.3.5
  - @atlaskit/avatar@17.1.7
  - @atlaskit/button@13.3.7
  - @atlaskit/icon@20.0.1
  - @atlaskit/textarea@2.2.4
  - @atlaskit/adf-schema@6.1.1
  - @atlaskit/editor-common@43.4.1
  - @atlaskit/editor-core@117.0.2
  - @atlaskit/analytics-gas-types@4.0.13
  - @atlaskit/analytics-listeners@6.2.3
  - @atlaskit/media-core@31.0.4
  - @atlaskit/media-test-helpers@26.1.1
  - @atlaskit/smart-card@12.6.5

## 10.5.0

### Minor Changes

- [minor][fe4eaf06fc](https://bitbucket.org/atlassian/atlassian-frontend/commits/fe4eaf06fc):

  export testMediaGroupFileId and fakeImage

### Patch Changes

- [patch][3b19e30129](https://bitbucket.org/atlassian/atlassian-frontend/commits/3b19e30129):

  EM-32: Adding optional paste event to dispatch paste event- Updated dependencies [06cd97123e](https://bitbucket.org/atlassian/atlassian-frontend/commits/06cd97123e):

- Updated dependencies [07b5311cb9](https://bitbucket.org/atlassian/atlassian-frontend/commits/07b5311cb9):
- Updated dependencies [a4ded5368c](https://bitbucket.org/atlassian/atlassian-frontend/commits/a4ded5368c):
- Updated dependencies [5181c5d368](https://bitbucket.org/atlassian/atlassian-frontend/commits/5181c5d368):
- Updated dependencies [6f16f46632](https://bitbucket.org/atlassian/atlassian-frontend/commits/6f16f46632):
- Updated dependencies [a1f50e6a54](https://bitbucket.org/atlassian/atlassian-frontend/commits/a1f50e6a54):
- Updated dependencies [31558e1872](https://bitbucket.org/atlassian/atlassian-frontend/commits/31558e1872):
- Updated dependencies [6ca6aaa1d7](https://bitbucket.org/atlassian/atlassian-frontend/commits/6ca6aaa1d7):
- Updated dependencies [fe4eaf06fc](https://bitbucket.org/atlassian/atlassian-frontend/commits/fe4eaf06fc):
- Updated dependencies [43e03f1c58](https://bitbucket.org/atlassian/atlassian-frontend/commits/43e03f1c58):
- Updated dependencies [63fe41d5c2](https://bitbucket.org/atlassian/atlassian-frontend/commits/63fe41d5c2):
- Updated dependencies [b01fc0ceef](https://bitbucket.org/atlassian/atlassian-frontend/commits/b01fc0ceef):
- Updated dependencies [d085ab4419](https://bitbucket.org/atlassian/atlassian-frontend/commits/d085ab4419):
- Updated dependencies [64752f2827](https://bitbucket.org/atlassian/atlassian-frontend/commits/64752f2827):
- Updated dependencies [f67dc5ae22](https://bitbucket.org/atlassian/atlassian-frontend/commits/f67dc5ae22):
- Updated dependencies [c0102a3ea2](https://bitbucket.org/atlassian/atlassian-frontend/commits/c0102a3ea2):
- Updated dependencies [555818c33a](https://bitbucket.org/atlassian/atlassian-frontend/commits/555818c33a):
- Updated dependencies [e40acffdfc](https://bitbucket.org/atlassian/atlassian-frontend/commits/e40acffdfc):
- Updated dependencies [0709d95a8a](https://bitbucket.org/atlassian/atlassian-frontend/commits/0709d95a8a):
- Updated dependencies [28dcebde63](https://bitbucket.org/atlassian/atlassian-frontend/commits/28dcebde63):
- Updated dependencies [710897f340](https://bitbucket.org/atlassian/atlassian-frontend/commits/710897f340):
- Updated dependencies [b8da779506](https://bitbucket.org/atlassian/atlassian-frontend/commits/b8da779506):
- Updated dependencies [b9dc265bc9](https://bitbucket.org/atlassian/atlassian-frontend/commits/b9dc265bc9):
- Updated dependencies [bbbe360b71](https://bitbucket.org/atlassian/atlassian-frontend/commits/bbbe360b71):
- Updated dependencies [3b37ec4c28](https://bitbucket.org/atlassian/atlassian-frontend/commits/3b37ec4c28):
- Updated dependencies [655599414e](https://bitbucket.org/atlassian/atlassian-frontend/commits/655599414e):
  - @atlaskit/editor-core@117.0.0
  - @atlaskit/smart-card@12.6.4
  - @atlaskit/editor-common@43.4.0
  - @atlaskit/media-test-helpers@26.1.0
  - @atlaskit/adf-schema@6.1.0
  - @atlaskit/icon@20.0.0
  - @atlaskit/avatar@17.1.6
  - @atlaskit/button@13.3.6

## 10.4.3

### Patch Changes

- [patch][cfcd27b2e4](https://bitbucket.org/atlassian/atlassian-frontend/commits/cfcd27b2e4):

  ED-8384 Extending the annotationProvider prop with a provider object

  **`providers` is for experimental purposes only and is not designed for use in production as of now**

  It is an _optional_ attribute of the `annotationProvider` `EditorProp`. Providing the prop will enable fetching of the state for all inline comments for the current document. Not providing it will disable this feature. By default, there is nothing provided.

  ```
  interface AnnotationProvider {
    providers: {
      inlineComment: { getState: (annotationIds: string[]) => AnnotationState<'inlineComment', InlineCommentState>[] },
      ... // other providers, eg Reaction
    }
  }
  ```

  The intention behind this is to allow consumers to provide a way for the Editor to check the current state of _all_ annotations of a _single type_ in the current document. The `getState` is provided with a list of `annotationId`s of _one_ type (eg, `inlineComment`, `reaction`). It should return a list of associated annotations (eg, comment) and any state (eg, comment is resolved).

  The return type is of an array `AnnotationState` specific to the type. For example,

  ```
  ExampleInlineCommentStates: AnnotationState<
    'inlineComment',
    InlineCommentState
  >[] = [
    {
      annotationType: 'inlineComment',
      id: 'cd0a8588-f7cd-b50c-53a3-f424ee1b3474',
      state: { resolved: false },
    },

    {
      annotationType: 'inlineComment',
      id: 'a31d8b16-7c67-5d01-9eaa-f5504f48bd69',
      state: { resolved: true },
    },
  ];
  ```

  See packages/editor/editor-core/src/plugins/annotation/types.ts for types.- [patch][ec929ab10e](https://bitbucket.org/atlassian/atlassian-frontend/commits/ec929ab10e):

  ED-8535 Add onResolve to component for inline comments experiment.

  Moved the `pollingInterval` to be coupled with the relevant provider call.

  **Before**

  ```
  annotationProvider={{
    component: ...,
    providers: {
      pollingInterval: 15000,
      inlineComment: {
        getState: () => { ... }
      },
    },
  }}
  ```

  **Now**

  ```
  annotationProvider={{
    component: ...,
    providers: {
      inlineComment: {
        pollingInterval: 15000,
        getState: () => { ... }
      },
    },
  }}
  ```

- Updated dependencies [80c1eaa275](https://bitbucket.org/atlassian/atlassian-frontend/commits/80c1eaa275):
- Updated dependencies [2b4ebaf2ed](https://bitbucket.org/atlassian/atlassian-frontend/commits/2b4ebaf2ed):
- Updated dependencies [c64c471564](https://bitbucket.org/atlassian/atlassian-frontend/commits/c64c471564):
- Updated dependencies [966622bd45](https://bitbucket.org/atlassian/atlassian-frontend/commits/966622bd45):
- Updated dependencies [5b8daf1843](https://bitbucket.org/atlassian/atlassian-frontend/commits/5b8daf1843):
- Updated dependencies [3002c015cc](https://bitbucket.org/atlassian/atlassian-frontend/commits/3002c015cc):
- Updated dependencies [c55f8e0284](https://bitbucket.org/atlassian/atlassian-frontend/commits/c55f8e0284):
- Updated dependencies [b4ad0a502a](https://bitbucket.org/atlassian/atlassian-frontend/commits/b4ad0a502a):
- Updated dependencies [7d2c702223](https://bitbucket.org/atlassian/atlassian-frontend/commits/7d2c702223):
- Updated dependencies [6421a97672](https://bitbucket.org/atlassian/atlassian-frontend/commits/6421a97672):
- Updated dependencies [0eb8c5ff5a](https://bitbucket.org/atlassian/atlassian-frontend/commits/0eb8c5ff5a):
- Updated dependencies [3e87f5596a](https://bitbucket.org/atlassian/atlassian-frontend/commits/3e87f5596a):
- Updated dependencies [3160e15523](https://bitbucket.org/atlassian/atlassian-frontend/commits/3160e15523):
- Updated dependencies [3f1d129a79](https://bitbucket.org/atlassian/atlassian-frontend/commits/3f1d129a79):
- Updated dependencies [baa887053d](https://bitbucket.org/atlassian/atlassian-frontend/commits/baa887053d):
- Updated dependencies [2108ee74db](https://bitbucket.org/atlassian/atlassian-frontend/commits/2108ee74db):
- Updated dependencies [f3727d3830](https://bitbucket.org/atlassian/atlassian-frontend/commits/f3727d3830):
- Updated dependencies [dc48763970](https://bitbucket.org/atlassian/atlassian-frontend/commits/dc48763970):
- Updated dependencies [909676b9de](https://bitbucket.org/atlassian/atlassian-frontend/commits/909676b9de):
- Updated dependencies [312feb4a6a](https://bitbucket.org/atlassian/atlassian-frontend/commits/312feb4a6a):
- Updated dependencies [cf9858fa09](https://bitbucket.org/atlassian/atlassian-frontend/commits/cf9858fa09):
- Updated dependencies [26dbe7be6d](https://bitbucket.org/atlassian/atlassian-frontend/commits/26dbe7be6d):
- Updated dependencies [cfcd27b2e4](https://bitbucket.org/atlassian/atlassian-frontend/commits/cfcd27b2e4):
- Updated dependencies [6ee177aeb4](https://bitbucket.org/atlassian/atlassian-frontend/commits/6ee177aeb4):
- Updated dependencies [e0f0654d4c](https://bitbucket.org/atlassian/atlassian-frontend/commits/e0f0654d4c):
- Updated dependencies [ec929ab10e](https://bitbucket.org/atlassian/atlassian-frontend/commits/ec929ab10e):
  - @atlaskit/editor-core@116.2.0
  - @atlaskit/media-test-helpers@26.0.0
  - @atlaskit/smart-card@12.6.3
  - @atlaskit/adf-schema@6.0.0
  - @atlaskit/editor-common@43.3.1
  - @atlaskit/media-core@31.0.3

## 10.4.2

### Patch Changes

- [patch][f97e248127](https://bitbucket.org/atlassian/atlassian-frontend/commits/f97e248127):

  ED-8578: always consume Tab-related events inside actions in full page- Updated dependencies [f97e248127](https://bitbucket.org/atlassian/atlassian-frontend/commits/f97e248127):

  - @atlaskit/editor-core@116.1.2

## 10.4.1

### Patch Changes

- [patch][edc4a4a7ae](https://bitbucket.org/atlassian/atlassian-frontend/commits/edc4a4a7ae):

  ED-8316 Add async support to the Extension v2 insert API- Updated dependencies [761dcd6d19](https://bitbucket.org/atlassian/atlassian-frontend/commits/761dcd6d19):

- Updated dependencies [5816cb91e0](https://bitbucket.org/atlassian/atlassian-frontend/commits/5816cb91e0):
- Updated dependencies [faccb537d0](https://bitbucket.org/atlassian/atlassian-frontend/commits/faccb537d0):
- Updated dependencies [642b2f93ea](https://bitbucket.org/atlassian/atlassian-frontend/commits/642b2f93ea):
- Updated dependencies [4898d64f46](https://bitbucket.org/atlassian/atlassian-frontend/commits/4898d64f46):
- Updated dependencies [8cf20f37ae](https://bitbucket.org/atlassian/atlassian-frontend/commits/8cf20f37ae):
- Updated dependencies [a23aa4e4a8](https://bitbucket.org/atlassian/atlassian-frontend/commits/a23aa4e4a8):
- Updated dependencies [a753b0d6da](https://bitbucket.org/atlassian/atlassian-frontend/commits/a753b0d6da):
- Updated dependencies [b1ce12dffb](https://bitbucket.org/atlassian/atlassian-frontend/commits/b1ce12dffb):
- Updated dependencies [4c4ae93de7](https://bitbucket.org/atlassian/atlassian-frontend/commits/4c4ae93de7):
- Updated dependencies [edc4a4a7ae](https://bitbucket.org/atlassian/atlassian-frontend/commits/edc4a4a7ae):
- Updated dependencies [e4f0ab434f](https://bitbucket.org/atlassian/atlassian-frontend/commits/e4f0ab434f):
- Updated dependencies [3da54e6146](https://bitbucket.org/atlassian/atlassian-frontend/commits/3da54e6146):
- Updated dependencies [94ea01d1d6](https://bitbucket.org/atlassian/atlassian-frontend/commits/94ea01d1d6):
- Updated dependencies [01dc5ed14b](https://bitbucket.org/atlassian/atlassian-frontend/commits/01dc5ed14b):
- Updated dependencies [fdaac966f4](https://bitbucket.org/atlassian/atlassian-frontend/commits/fdaac966f4):
- Updated dependencies [54a499fb7b](https://bitbucket.org/atlassian/atlassian-frontend/commits/54a499fb7b):
  - @atlaskit/adf-schema@5.0.0
  - @atlaskit/editor-core@116.1.0
  - @atlaskit/editor-common@43.3.0
  - @atlaskit/media-test-helpers@25.2.7

## 10.4.0

### Minor Changes

- [minor][46e6693eb3](https://bitbucket.org/atlassian/atlassian-frontend/commits/46e6693eb3):

  ED-8149 Provides an "update" method on the node manifest to deal with the edit button.- [minor][83300f0b6d](https://bitbucket.org/atlassian/atlassian-frontend/commits/83300f0b6d):

  ED-8199 Add new create editor helper on 'create-prosemirror-editor' entry point

### Patch Changes

- [patch][e5dd37f7a4](https://bitbucket.org/atlassian/atlassian-frontend/commits/e5dd37f7a4):

  ED-7966: Promote expand to full schema, update flag and add appropriate tests- Updated dependencies [28f8f0e089](https://bitbucket.org/atlassian/atlassian-frontend/commits/28f8f0e089):

- Updated dependencies [6042417190](https://bitbucket.org/atlassian/atlassian-frontend/commits/6042417190):
- Updated dependencies [26942487d1](https://bitbucket.org/atlassian/atlassian-frontend/commits/26942487d1):
- Updated dependencies [d1055e0e50](https://bitbucket.org/atlassian/atlassian-frontend/commits/d1055e0e50):
- Updated dependencies [8db35852ab](https://bitbucket.org/atlassian/atlassian-frontend/commits/8db35852ab):
- Updated dependencies [2ffdeb5a48](https://bitbucket.org/atlassian/atlassian-frontend/commits/2ffdeb5a48):
- Updated dependencies [97d1245875](https://bitbucket.org/atlassian/atlassian-frontend/commits/97d1245875):
- Updated dependencies [4eefd368a8](https://bitbucket.org/atlassian/atlassian-frontend/commits/4eefd368a8):
- Updated dependencies [9219b332cb](https://bitbucket.org/atlassian/atlassian-frontend/commits/9219b332cb):
- Updated dependencies [99fc6250f9](https://bitbucket.org/atlassian/atlassian-frontend/commits/99fc6250f9):
- Updated dependencies [46e6693eb3](https://bitbucket.org/atlassian/atlassian-frontend/commits/46e6693eb3):
- Updated dependencies [4cd37dd052](https://bitbucket.org/atlassian/atlassian-frontend/commits/4cd37dd052):
- Updated dependencies [1f84cf7583](https://bitbucket.org/atlassian/atlassian-frontend/commits/1f84cf7583):
- Updated dependencies [218fe01736](https://bitbucket.org/atlassian/atlassian-frontend/commits/218fe01736):
- Updated dependencies [985db883ac](https://bitbucket.org/atlassian/atlassian-frontend/commits/985db883ac):
- Updated dependencies [bed9c11960](https://bitbucket.org/atlassian/atlassian-frontend/commits/bed9c11960):
- Updated dependencies [a30fe6c66e](https://bitbucket.org/atlassian/atlassian-frontend/commits/a30fe6c66e):
- Updated dependencies [fdf30da2db](https://bitbucket.org/atlassian/atlassian-frontend/commits/fdf30da2db):
- Updated dependencies [d1c470507c](https://bitbucket.org/atlassian/atlassian-frontend/commits/d1c470507c):
- Updated dependencies [fc1678c70d](https://bitbucket.org/atlassian/atlassian-frontend/commits/fc1678c70d):
- Updated dependencies [2edd170a68](https://bitbucket.org/atlassian/atlassian-frontend/commits/2edd170a68):
- Updated dependencies [e5dd37f7a4](https://bitbucket.org/atlassian/atlassian-frontend/commits/e5dd37f7a4):
- Updated dependencies [5abcab3f7e](https://bitbucket.org/atlassian/atlassian-frontend/commits/5abcab3f7e):
- Updated dependencies [5d13d33a60](https://bitbucket.org/atlassian/atlassian-frontend/commits/5d13d33a60):
- Updated dependencies [1d421446bc](https://bitbucket.org/atlassian/atlassian-frontend/commits/1d421446bc):
- Updated dependencies [4a223473c5](https://bitbucket.org/atlassian/atlassian-frontend/commits/4a223473c5):
  - @atlaskit/icon@19.1.0
  - @atlaskit/editor-core@116.0.0
  - @atlaskit/editor-common@43.2.0
  - @atlaskit/adf-schema@4.4.0
  - @atlaskit/button@13.3.5
  - @atlaskit/media-core@31.0.2
  - @atlaskit/media-test-helpers@25.2.6

## 10.3.2

### Patch Changes

- [patch][36f6e99c5b](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/36f6e99c5b):

  Fix type errors caused when generating declaration files- Updated dependencies [36f6e99c5b](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/36f6e99c5b):

  - @atlaskit/editor-core@115.2.1

## 10.3.1

### Patch Changes

- [patch][768bac6d81](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/768bac6d81):

  Add faux product name to context-identifier-provider- Updated dependencies [768bac6d81](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/768bac6d81):

- Updated dependencies [7bf6a29563](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/7bf6a29563):
- Updated dependencies [fbff0b7e41](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/fbff0b7e41):
- Updated dependencies [7519b2a816](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/7519b2a816):
- Updated dependencies [9902932114](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/9902932114):
- Updated dependencies [768bac6d81](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/768bac6d81):
  - @atlaskit/editor-core@115.1.0
  - @atlaskit/analytics-next@6.3.2

## 10.3.0

### Minor Changes

- [minor][10425b84b4](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/10425b84b4):

  Add support to extensions v2 (using manifests and extension providers)

- [minor][926798632e](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/926798632e):

  ED-7962: Build ADF node from actions - remove "insert" from node

### Patch Changes

- Updated dependencies [271945fd08](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/271945fd08):
- Updated dependencies [a6663b9325](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/a6663b9325):
- Updated dependencies [5e4d1feec3](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/5e4d1feec3):
- Updated dependencies [0f8d5df4cf](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/0f8d5df4cf):
- Updated dependencies [161a30be16](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/161a30be16):
- Updated dependencies [ecfbe83dfb](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/ecfbe83dfb):
- Updated dependencies [ea0e619cc7](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/ea0e619cc7):
- Updated dependencies [5b8a074ce6](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/5b8a074ce6):
- Updated dependencies [93b445dcdc](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/93b445dcdc):
- Updated dependencies [c1d4898af5](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/c1d4898af5):
- Updated dependencies [ded174361e](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/ded174361e):
- Updated dependencies [80eb127904](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/80eb127904):
- Updated dependencies [ef2ba36d5c](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/ef2ba36d5c):
- Updated dependencies [8c84ed470e](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/8c84ed470e):
- Updated dependencies [6e4b678428](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/6e4b678428):
- Updated dependencies [bb164fbd1e](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/bb164fbd1e):
- Updated dependencies [b3fd0964f2](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/b3fd0964f2):
- Updated dependencies [40bec82851](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/40bec82851):
- Updated dependencies [8b652147a5](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/8b652147a5):
- Updated dependencies [0603c2fbf7](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/0603c2fbf7):
- Updated dependencies [72d4c3298d](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/72d4c3298d):
- Updated dependencies [10425b84b4](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/10425b84b4):
- Updated dependencies [5ef337766c](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/5ef337766c):
- Updated dependencies [dc0999afc2](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/dc0999afc2):
- Updated dependencies [6764e83801](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/6764e83801):
- Updated dependencies [553915553f](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/553915553f):
- Updated dependencies [4700477bbe](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/4700477bbe):
- Updated dependencies [9a261337b5](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/9a261337b5):
- Updated dependencies [3a7c0bfa32](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/3a7c0bfa32):
- Updated dependencies [5455e35bc0](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/5455e35bc0):
- Updated dependencies [cc1b89d310](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/cc1b89d310):
- Updated dependencies [2bb3af2382](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/2bb3af2382):
- Updated dependencies [611dbe68ff](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/611dbe68ff):
- Updated dependencies [0ea0587ac5](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/0ea0587ac5):
- Updated dependencies [938f1c2902](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/938f1c2902):
- Updated dependencies [926798632e](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/926798632e):
  - @atlaskit/editor-common@43.0.0
  - @atlaskit/editor-core@115.0.0
  - @atlaskit/adf-schema@4.3.1
  - @atlaskit/smart-card@12.6.1
  - @atlaskit/icon@19.0.11

## 10.2.0

### Minor Changes

- [minor][f1a06fc2fd](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/f1a06fc2fd):

  ED-7876 Implement expand and nestedExpand in Editor and Renderer

  A **work in progress** implementation of the new `expand` and `nestedExpand` nodes. These are currently **disabled** by default, but can be tested by enabling an editor prop.

  `UNSAFE_allowExpand={true}`

  Note, `expand` and `nestedExpand` are only in the `stage-0` ADF schema (as of this changeset).

- [minor][1377a45225](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/1377a45225):

  ED-7492 add support to indent actions

  This version adds support for indenting actions using the keyboard shortcuts Tab and Shift-Tab. You can also unindent items by backspacing them at the start, or deleting forwards within the task.

  There is no new behaviour if the feature flag (`allowNestedTasks`) is turned off.

- Updated dependencies [70e1055b8f](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/70e1055b8f):
  - @atlaskit/editor-core@114.1.0
  - @atlaskit/editor-common@42.0.0

## 10.1.3

- Updated dependencies [f28c191f4a](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/f28c191f4a):
- Updated dependencies [24b8ea2667](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/24b8ea2667):
  - @atlaskit/editor-core@114.0.0
  - @atlaskit/media-test-helpers@25.2.2
  - @atlaskit/editor-common@41.2.1
  - @atlaskit/media-core@31.0.0

## 10.1.2

### Patch Changes

- [patch][cc28419139](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/cc28419139):

  Adding missing license to packages and update to Copyright 2019 Atlassian Pty Ltd.- [patch][ae4f336a3a](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/ae4f336a3a):

**FABDODGEM-13 Editor Damask Release** - [Internal post](http://go.atlassian.com/damask-release)

**BREAKING CHANGES**

- **Media:** Removed deprecated "context" property from media components in favor of "mediaClientConfig". This affects all public media UI components.
  - https://product-fabric.atlassian.net/browse/MS-2038
- **Tasks & Decisions:** Removed containerAri for task-decisions components.
  - https://product-fabric.atlassian.net/browse/ED-7631
- **Renderer:** Adapts to task-decision changes.
- **Editor Mobile Bridge:** Adapts to task-decision changes.
- **Util Data Test:** Adapts to task-decision changes.

---

**Affected Editor Components:**

tables, media, mobile, emoji, tasks & decisions, analytics

**Editor**

- Support nested actions in stage-0 schema; Change DOM representation of actions
  - https://product-fabric.atlassian.net/browse/ED-7674
- Updated i18n translations
  - https://product-fabric.atlassian.net/browse/ED-7750
- Improved analytics & crash reporting (via a new error boundary)
  - https://product-fabric.atlassian.net/browse/ED-7766
  - https://product-fabric.atlassian.net/browse/ED-7806
- Improvements to heading anchor links.
  - https://product-fabric.atlassian.net/browse/ED-7849
  - https://product-fabric.atlassian.net/browse/ED-7860
- Copy/Paste improvements
  - https://product-fabric.atlassian.net/browse/ED-7840
  - https://product-fabric.atlassian.net/browse/ED-7849
- Fixes for the selection state of Smart links.
  - https://product-fabric.atlassian.net/browse/ED-7602?src=confmacro
- Improvements for table resizing & column creation.
  - https://product-fabric.atlassian.net/browse/ED-7698
  - https://product-fabric.atlassian.net/browse/ED-7319
  - https://product-fabric.atlassian.net/browse/ED-7799

**Mobile**

- GASv3 Analytics Events are now relayed from the web to the native context, ready for dispatching.
  - https://product-fabric.atlassian.net/browse/FM-2502
- Hybrid Renderer Recycler view now handles invalid ADF nodes gracefully.
  - https://product-fabric.atlassian.net/browse/FM-2370

**Media**

- Improved analytics
  - https://product-fabric.atlassian.net/browse/MS-2036
  - https://product-fabric.atlassian.net/browse/MS-2145
  - https://product-fabric.atlassian.net/browse/MS-2416
  - https://product-fabric.atlassian.net/browse/MS-2487
- Added shouldOpenMediaViewer property to renderer
  - https://product-fabric.atlassian.net/browse/MS-2393
- Implemented analytics for file copy
  - https://product-fabric.atlassian.net/browse/MS-2036
- New `media-viewed` event dispatched when media is interacted with via the media card or viewer.
  - https://product-fabric.atlassian.net/browse/MS-2284
- Support for `alt` text attribute on media image elements.
  - https://product-fabric.atlassian.net/browse/ED-7776

**i18n-tools**

Bumped dependencies.

## 10.1.1

### Patch Changes

- [patch][a2d0043716](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/a2d0043716):

  Updated version of analytics-next to fix potential incompatibilities with TS 3.6

## 10.1.0

### Minor Changes

- [minor][79c69ed5cd](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/79c69ed5cd):

  ED-7449 Implement sorting inline cards inside tables base on resolved title

## 10.0.0

### Major Changes

- [major][80adfefba2](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/80adfefba2):

  Remove applicationCard node and action mark

### Minor Changes

- [minor][5276c19a41](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/5276c19a41):

  ED-5996: support viewing inline comments within editor

  You can do this with the `annotationProvider` prop. Passing a truthy value to this (e.g. the empty object `{}`) will:

  - enable support for working with the `annotation` ADF mark
  - will render highlights around any annotations, and
  - allow copying and pasting of annotations within the same document, or between documents

  You can also optionally pass a React component to the `component`, so you can render custom components on top of or around the editor when the user's text cursor is inside an annotation.

  Please see [the package documentation](https://atlaskit.atlassian.com/packages/editor/editor-core/docs/annotations) for more information.

  There is an example component called `ExampleInlineCommentComponent` within the `@atlaskit/editor-test-helpers` package. It is currently featured in the full page examples on the Atlaskit website.

  Annotations are styled within the editor using the `fabric-editor-annotation` CSS class.

  Other changes:

  - `Popup` now supports an optional `rect` parameter to direct placement, rather than calculating the bounding client rect around a DOM node.

### Patch Changes

- [patch][9908666d1e](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/9908666d1e):

  Bump prosemirror-tables from 0.9.1 to 0.9.2

- Updated dependencies [1194ad5eb3](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/1194ad5eb3):
- Updated dependencies [166eb02474](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/166eb02474):
  - @atlaskit/editor-common@41.0.0
  - @atlaskit/editor-core@113.0.0
  - @atlaskit/adf-schema@4.0.0

## 9.11.14

### Patch Changes

- [patch][2b158873d1](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/2b158873d1):

  Add linting rule to prevent unsafe usage of setTimeout within React components.

## 9.11.13

- Updated dependencies [08ec269915](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/08ec269915):
  - @atlaskit/editor-core@112.44.2
  - @atlaskit/editor-common@40.0.0

## 9.11.12

### Patch Changes

- [patch][a05133283c](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/a05133283c):

  Add missing dependency in package.json

## 9.11.11

### Patch Changes

- [patch][097b696613](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/097b696613):

  Components now depend on TS 3.6 internally, in order to fix an issue with TS resolving non-relative imports as relative imports

## 9.11.10

### Patch Changes

- [patch][0d7d459f1a](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/0d7d459f1a):

  Fixes type errors which were incompatible with TS 3.6

## 9.11.9

### Patch Changes

- [patch][ecca4d1dbb](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/ecca4d1dbb):

  Upgraded Typescript to 3.3.x

## 9.11.8

### Patch Changes

- [patch][a82d6088e2](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/a82d6088e2):

  ED-4807 Use right cell type when spliting merged header cells

## 9.11.7

### Patch Changes

- [patch][926b43142b](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/926b43142b):

  Analytics-next has been converted to Typescript. Typescript consumers will now get static type safety. Flow types are no longer provided. No behavioural changes.

  **Breaking changes**

  - `withAnalyticsForSumTypeProps` alias has been removed, please use `withAnalyticsEvents`
  - `AnalyticsContextWrappedComp` alias has been removed, please use `withAnalyticsContext`

  **Breaking changes to TypeScript annotations**

  - `withAnalyticsEvents` now infers proptypes automatically, consumers no longer need to provide props as a generic type.
  - `withAnalyticsContext` now infers proptypes automatically, consumers no longer need to provide props as a generic type.
  - Type `WithAnalyticsEventProps` has been renamed to `WithAnalyticsEventsProps` to match source code
  - Type `CreateUIAnalyticsEventSignature` has been renamed to `CreateUIAnalyticsEvent` to match source code
  - Type `UIAnalyticsEventHandlerSignature` has been renamed to `UIAnalyticsEventHandler` to match source code
  - Type `AnalyticsEventsPayload` has been renamed to `AnalyticsEventPayload`
  - Type `ObjectType` has been removed, please use `Record<string, any>` or `[key: string]: any`
  - Type `UIAnalyticsEventInterface` has been removed, please use `UIAnalyticsEvent`
  - Type `AnalyticsEventInterface` has been removed, please use `AnalyticsEvent`
  - Type `CreateAndFireEventFunction` removed and should now be inferred by TypeScript
  - Type `AnalyticsEventUpdater` removed and should now be inferred by TypeScript

## 9.11.6

- Updated dependencies [69586b5353](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/69586b5353):
  - @atlaskit/editor-core@112.41.6
  - @atlaskit/media-core@30.0.10
  - @atlaskit/media-test-helpers@25.0.0

## 9.11.5

### Patch Changes

- [patch][688f2957ca](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/688f2957ca):

  Fixes various TypeScript errors which were previously failing silently

## 9.11.4

### Patch Changes

- [patch][6874801bc0](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/6874801bc0):

  ED-7314 Added test helpers for comparing selections. Includes new builders for gap cursors.

## 9.11.3

- Updated dependencies [6164bc2629](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/6164bc2629):
  - @atlaskit/editor-core@112.39.5
  - @atlaskit/adf-schema@3.0.0
  - @atlaskit/editor-common@39.17.0

## 9.11.2

### Patch Changes

- [patch][0bb88234e6](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/0bb88234e6):

  Upgrade prosemirror-view to 1.9.12

## 9.11.1

### Patch Changes

- [patch][ec8066a555](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/ec8066a555):

  Upgrade `@types/prosemirror-view` Typescript definitions to latest 1.9.x API

## 9.11.0

### Minor Changes

- [minor][d53c3e989f](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/d53c3e989f):

  Add selectCell helper

## 9.10.1

### Patch Changes

- [patch][9f8ab1084b](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/9f8ab1084b):

  Consume analytics-next ts type definitions as an ambient declaration.

## 9.10.0

### Minor Changes

- [minor][c0ba9ee289](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/c0ba9ee289):

  set viewMediaClientConfig when properties change in MediaSingle node

  This fixes [ED-7269] + [FEF-8938]: issue with images not loading when the page transition from view to edit mode

## 9.9.4

### Patch Changes

- [patch][bbff8a7d87](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/bbff8a7d87):

  Fixes bug, missing version.json file

## 9.9.3

### Patch Changes

- [patch][18dfac7332](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/18dfac7332):

  In this PR, we are:

  - Re-introducing dist build folders
  - Adding back cjs
  - Replacing es5 by cjs and es2015 by esm
  - Creating folders at the root for entry-points
  - Removing the generation of the entry-points at the root
    Please see this [ticket](https://product-fabric.atlassian.net/browse/BUILDTOOLS-118) or this [page](https://hello.atlassian.net/wiki/spaces/FED/pages/452325500/Finishing+Atlaskit+multiple+entry+points) for further details

## 9.9.2

### Patch Changes

- [patch][979464019f](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/979464019f):

  ED-7073: fixed table clear cell not working (caused by `prosemirror-utils@0.9.3`)

## 9.9.1

### Patch Changes

- [patch][13ca42c394](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/13ca42c394):

  # use getAuthFromContext from media when a file if pasted from a different collection

  Now products can provide auth using **getAuthFromContext** on MediaClientConfig:

  ```
  import {MediaClientConfig} from '@atlaskit/media-core'
  import Editor from '@atlaskit/editor-core'

  const viewMediaClientConfig: MediaClientConfig = {
    authProvider // already exists
    getAuthFromContext(contextId: string) {
      // here products can return auth for external pages.
      // in case of copy & paste on Confluence, they can provide read token for
      // files on the source collection
    }
  }
  const mediaProvider: = {
    viewMediaClientConfig
  }

  <Editor {...otherNonRelatedProps} media={{provider: mediaProvider}} />
  ```

## 9.9.0

### Minor Changes

- [minor][f60618b0f0](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/f60618b0f0):

  ED-5844 Adding media link UI to editor

## 9.8.0

### Minor Changes

- [minor][4a22a774a6](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/4a22a774a6):

  AUX-36 Add update support for extension handler

## 9.7.0

### Minor Changes

- [minor][d217a12e31](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/d217a12e31):

  ED-7056: Update prosemirror-utils, this enables us to replace selected nodes while inserting
  ED-6668: Adds a selected ring to all extensions

## 9.6.0

### Minor Changes

- [minor][143dcb8704](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/143dcb8704):

  ED-2362 Add keyboard shortcuts for headings and normal text

## 9.5.2

- Updated dependencies [06326ef3f7](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/06326ef3f7):
  - @atlaskit/editor-common@39.13.2
  - @atlaskit/editor-core@112.25.3
  - @atlaskit/media-test-helpers@24.1.2
  - @atlaskit/smart-card@12.2.3
  - @atlaskit/icon@19.0.0

## 9.5.1

### Patch Changes

- [patch][4c0fcec857](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/4c0fcec857):

  ED-7059: fix trailing slashes for hyperlinks being removed, and smart links resolving

## 9.5.0

### Minor Changes

- [minor][d6c31deacf](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/d6c31deacf):

  ED-6701 Upgrade prosemirror-view to 1.9.10 and prosemirror-inputrules to 1.0.4 for composition input improvements

## 9.4.2

### Patch Changes

- [patch][bb64fcedcb](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/bb64fcedcb):

  uploadContext and viewContext fields of MediaProvider (part of Editor and Renderer props) are deprecated. New fields uploadMediaClientConfig and viewMediaClientConfig should be used from now on.

## 9.4.1

- Updated dependencies [393fb6acd2](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/393fb6acd2):
  - @atlaskit/editor-core@112.14.0
  - @atlaskit/smart-card@12.0.0

## 9.4.0

### Minor Changes

- [minor][11a8112851](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/11a8112851):

  ED-6991 Fire analytics event for renderer started

  Set up analytics v3 in renderer

## 9.3.9

- Updated dependencies [cfc3c8adb3](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/cfc3c8adb3):
  - @atlaskit/editor-common@39.7.2
  - @atlaskit/editor-core@112.11.20
  - @atlaskit/media-test-helpers@24.0.3
  - @atlaskit/smart-card@11.1.6
  - @atlaskit/icon@18.0.0

## 9.3.8

### Patch Changes

- [patch][9503b9d220](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/9503b9d220):

  Bump prosemirror table to latest version where performance improvement applies, related to celsInRect helper

## 9.3.7

- [patch][c59bd5d01e](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/c59bd5d01e):

  ED-6349: fix external images (often via copy paste) not having correct dimensions

## 9.3.6

- [patch][b567c44b93](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/b567c44b93):

  ED-6986: put cursor after smart link insertion if skipping macro

## 9.3.5

- [patch][b0ef06c685](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/b0ef06c685):

  - This is just a safety release in case anything strange happened in in the previous one. See Pull Request #5942 for details

## 9.3.4

- [patch][9cbd059bfa](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/9cbd059bfa):

  - Put `media-editor` into separate editor plugin, update `@atlaskit/media-editor` API

  ### Breaking change for `@atlaskit/media-editor`

  - Make `onUploadStart`, `onFinish` optional
  - Add new `onClose` callback for when the user closes the dialog (escape, cancel, error)
  - `onFinish` now only called when the upload itself finishes, not overloaded for other purposes

    - now also passes the `FileIdentifier` of the completed upload

  ### Editor changes

  Adds a new `media-editor` plugin that is enabled if the media plugin is enabled and `allowAnnotation` is enabled on the `media` prop.

  This replaces the implementation inside the existing `media` plugin. The new `media-editor` plugin is _not_ dependent on the `media` plugin.

- Updated dependencies [9ecfef12ac](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/9ecfef12ac):
  - @atlaskit/editor-core@112.11.0
  - @atlaskit/media-core@30.0.3
  - @atlaskit/media-test-helpers@24.0.0

## 9.3.3

- [patch][7eca61edf0](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/7eca61edf0):

  - ED-6965: bump prosemirror-utils to allow safeInsert replacing selected nodes when it conforms to schema

## 9.3.2

- [patch][7ce86bae14](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/7ce86bae14):

  - Shift selection for rows and columns

## 9.3.1

- [patch][ed02efdb94](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/ed02efdb94):

  - [ED-6817] Extract the current toggleHeader logic to prosemirror-table 0.8.0

## 9.3.0

- [minor][79f0ef0601](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/79f0ef0601):

  - Use strict tsconfig to compile editor packages

## 9.2.0

- [minor][dfc7aaa563](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/dfc7aaa563):

  - ED-6863: Fix the rendering of extensions in the renderer when they have breakout layouts.

## 9.1.5

- [patch][5ad66b6d1a](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/5ad66b6d1a):

  - [ED-6860] Revert prosemirror-view 1.8.9 bumps, this version was making the cursor typing slowly. this version is recreating all plugins when we use `EditorView.setProps`

## 9.1.4

- Updated dependencies [5e4ff01e4c](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/5e4ff01e4c):
  - @atlaskit/editor-core@112.0.0

## 9.1.3

- Updated dependencies [ed3f034232](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/ed3f034232):
  - @atlaskit/editor-core@111.0.2
  - @atlaskit/media-core@30.0.1
  - @atlaskit/media-test-helpers@23.0.0

## 9.1.2

- Updated dependencies [154372926b](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/154372926b):
  - @atlaskit/editor-core@111.0.0

## 9.1.1

- [patch][652ef1e6be](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/652ef1e6be):

  - ED-6774: Adds a FF to priortize smart links resolution over Jira Issue Macro

## 9.1.0

- [minor][5a49043dac](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/5a49043dac):

  - Enable strictPropertyInitialization in tsconfig.base

## 9.0.1

- [patch][80cf1c1e82](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/80cf1c1e82):

  - [ED-6654] Update prosemirror-view to 1.8.9 that fixes a few issues with mouse selections on prosemirror like click on table and the controls doesn't show up

## 9.0.0

- [major][7c17b35107](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/7c17b35107):

  - Updates react and react-dom peer dependencies to react@^16.8.0 and react-dom@^16.8.0. To use this package, please ensure you use at least this version of react and react-dom.

## 8.0.8

- Updated dependencies [a1192ef860](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/a1192ef860):
  - @atlaskit/editor-common@38.0.0
  - @atlaskit/editor-core@109.0.0
  - @atlaskit/media-test-helpers@21.4.0
  - @atlaskit/media-core@29.3.0

## 8.0.7

- Updated dependencies [e7292ab444](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/e7292ab444):
  - @atlaskit/editor-common@37.0.0
  - @atlaskit/editor-core@108.0.0
  - @atlaskit/media-test-helpers@21.3.0
  - @atlaskit/media-core@29.2.0

## 8.0.6

- [patch][5d9455978b](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/5d9455978b):

  - ED-5292: add support for custom autoformatting

  You can now use the `customAutoformatting` prop to provide a custom autoformatting handler that replaces on particular regex strings.

  See (Editor RFC 131: Injectable auto-formatting rules, AutoformattingProvider)[https://product-fabric.atlassian.net/wiki/spaces/E/pages/881141566/Editor+RFC+131+Injectable+auto-formatting+rules+AutoformattingProvider] for more details on how this works.

  An example provider `autoformattingProvider` that is used in the storybook example is exported from the `@atlaskit/editor-test-helpers` package. Try typing ED-123.

  A simplified provider might look like:

      export const autoformattingProvider: AutoformattingProvider = {
        getRules: () =>
          Promise.resolve({
            '[Ee][Dd]-(\\d+)': (match: string[]): Promise<ADFEntity> => {
              const ticketNumber = match[1];
              return new Promise.resolve({
                type: 'inlineCard',
                attrs: {
                  url: 'https://www.atlassian.com/',
                },
              });
            },
          }),
      };

  At the moment, only text or `inlineCard` nodes are permitted to be replaced.

## 8.0.5

- [patch][3f28e6443c](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/3f28e6443c):

  - @atlaskit/analytics-next-types is deprecated. Now you can use types for @atlaskit/analytics-next supplied from itself.

## 8.0.4

- [patch][b425ea772b](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/b425ea772b):

  - Revert "ED-5505 add strong as default mark to table header (pull request #5291)"

## 8.0.3

- Updated dependencies [c2c36de22b](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/c2c36de22b):
  - @atlaskit/editor-common@36.0.0
  - @atlaskit/editor-core@107.0.0
  - @atlaskit/media-test-helpers@21.1.0
  - @atlaskit/media-core@29.1.0

## 8.0.2

- [patch][1bcaa1b991](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/1bcaa1b991):

  - Add npmignore for index.ts to prevent some jest tests from resolving that instead of index.js

## 8.0.1

- [patch][205b101e2b](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/205b101e2b):

  - ED-6230: bump prosemirror-view to 1.8.3; workaround Chrome bug with copy paste multiple images

## 8.0.0

- [major][9d5cc39394](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/9d5cc39394):

  - Dropped ES5 distributables from the typescript packages

## 7.0.6

- Updated dependencies [7ab3e93996](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/7ab3e93996):
  - @atlaskit/editor-common@34.0.0
  - @atlaskit/editor-core@105.0.0
  - @atlaskit/media-test-helpers@20.1.8
  - @atlaskit/media-core@28.0.0

## 7.0.5

- Updated dependencies [4d17df92f8](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/4d17df92f8):
  - @atlaskit/editor-core@104.0.0

## 7.0.4

- [patch][60f0ad9a7e](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/60f0ad9a7e):

  - ED-6286: remove StateManager from media plugin and provider

## 7.0.3

- [patch][7a8d8ba656](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/7a8d8ba656):

  - ED-6452: Validate documents on init through collab-editing

  * Add unsupportedInline and unsupportedBlock to test-helpers.

## 7.0.2

- Updated dependencies [4aee5f3cec](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/4aee5f3cec):
  - @atlaskit/editor-common@33.0.0
  - @atlaskit/editor-core@102.0.0
  - @atlaskit/media-test-helpers@20.1.6
  - @atlaskit/media-core@27.2.0

## 7.0.1

- Updated dependencies [4a84fc40e0](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/4a84fc40e0):
  - @atlaskit/editor-core@101.0.0

## 7.0.0

- [major][4af5bd2a58](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/4af5bd2a58):

  - Remove linkCreateContext from MediaProvider

## 6.3.22

- Updated dependencies [fc6164c8c2](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/fc6164c8c2):
  - @atlaskit/editor-common@32.0.0
  - @atlaskit/editor-core@99.0.0
  - @atlaskit/media-test-helpers@20.1.5
  - @atlaskit/media-core@27.1.0

## 6.3.21

- [patch][fa435d11f7](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/fa435d11f7):

  - ED-6155 Fire analytics v3 events for general editor UI events

## 6.3.20

- [patch][09696170ec](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/09696170ec):

  - Bumps prosemirror-utils to 0.7.6

## 6.3.19

- [patch][557a2b5734](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/557a2b5734):

  - ED-5788: bump prosemirror-view and prosemirror-model

## 6.3.18

- [patch][e5a98ed46b](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/e5a98ed46b):

  - ED-6104: refactor createEditor to correctly call editorView.destroy() afterEach test

## 6.3.17

- Updated dependencies [69c8d0c19c](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/69c8d0c19c):
  - @atlaskit/editor-common@31.0.0
  - @atlaskit/editor-core@98.0.0
  - @atlaskit/media-test-helpers@20.1.0
  - @atlaskit/media-core@27.0.0

## 6.3.16

- [patch][4552e804d3](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/4552e804d3):

  - dismiss StatusPicker if status node is not selected

## 6.3.15

- [patch][ccc39ca887](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/ccc39ca887):

  - ED-6094: add table CellSelection test helpers

## 6.3.14

- Updated dependencies [07a187bb30](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/07a187bb30):
  - @atlaskit/editor-core@97.1.3
  - @atlaskit/media-core@26.2.1
  - @atlaskit/media-test-helpers@20.0.0

## 6.3.13

- Updated dependencies [d7ef59d432](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/d7ef59d432):
  - @atlaskit/editor-common@30.0.1
  - @atlaskit/editor-core@97.0.1
  - @atlaskit/media-test-helpers@19.1.1
  - @atlaskit/smart-card@9.4.1
  - @atlaskit/icon@16.0.0

## 6.3.12

- Updated dependencies [85d5d168fd](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/85d5d168fd):
  - @atlaskit/editor-common@30.0.0
  - @atlaskit/editor-core@97.0.0
  - @atlaskit/media-test-helpers@19.1.0
  - @atlaskit/media-core@26.2.0

## 6.3.11

- Updated dependencies [dadef80](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/dadef80):
- Updated dependencies [3ad16f3](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/3ad16f3):
  - @atlaskit/editor-common@29.0.0
  - @atlaskit/editor-core@96.0.0
  - @atlaskit/media-test-helpers@19.0.0
  - @atlaskit/media-core@26.1.0

## 6.3.10

- [patch][8158fe0](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/8158fe0):

  - ED-6059: Extension and inlineExtension should read their content from attrs not the PMNode.

## 6.3.9

- [patch][060f2da](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/060f2da):

  - ED-5991: bumped prosemirror-view to 1.6.8

## 6.3.8

- Updated dependencies [0c116d6](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/0c116d6):
  - @atlaskit/editor-common@28.0.2
  - @atlaskit/editor-core@95.0.0

## 6.3.7

- Updated dependencies [cbb8cb5](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/cbb8cb5):
  - @atlaskit/editor-common@28.0.0
  - @atlaskit/editor-core@94.0.0
  - @atlaskit/media-test-helpers@18.9.1
  - @atlaskit/media-core@26.0.0

## 6.3.6

- Updated dependencies [72d37fb](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/72d37fb):
  - @atlaskit/editor-common@27.0.0
  - @atlaskit/editor-core@93.0.0
  - @atlaskit/media-core@25.0.0
  - @atlaskit/media-test-helpers@18.9.0

## 6.3.5

- Updated dependencies [e858305](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/e858305):
  - @atlaskit/editor-common@26.0.0
  - @atlaskit/editor-core@92.0.19

## 6.3.4

- Updated dependencies [b3738ea](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/b3738ea):
  - @atlaskit/editor-common@25.0.0
  - @atlaskit/editor-core@92.0.0
  - @atlaskit/media-test-helpers@18.7.0
  - @atlaskit/media-core@24.7.0

## 6.3.3

- [patch][1205725](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/1205725):

  - Move schema to its own package

## 6.3.2

- Updated dependencies [80f765b](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/80f765b):
  - @atlaskit/editor-common@23.0.0
  - @atlaskit/editor-core@91.0.0
  - @atlaskit/media-test-helpers@18.6.2
  - @atlaskit/media-core@24.6.0

## 6.3.1

- [patch][0a297ba](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/0a297ba):

  - Packages should not be shown in the navigation, search and overview

## 6.3.0

- [minor][a1b03d0](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/a1b03d0):

  - ED-3890 Adds Indentation support on paragraphs and headings

## 6.2.24

- [patch][94094fe](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/94094fe):

  - Adds support for links around images

## 6.2.23

- Updated dependencies [3a7224a](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/3a7224a):
  - @atlaskit/editor-core@90.0.0

## 6.2.22

- Updated dependencies [df32968](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/df32968):
  - @atlaskit/editor-core@89.0.7
  - @atlaskit/smart-card@9.0.0

## 6.2.21

- Updated dependencies [ab9b69c](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/ab9b69c):
  - @atlaskit/smart-card@8.8.5
  - @atlaskit/editor-common@22.0.2
  - @atlaskit/editor-core@89.0.6
  - @atlaskit/media-test-helpers@18.3.1
  - @atlaskit/icon@15.0.0

## 6.2.20

- [patch][a2cae0c](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/a2cae0c):

  - Fix conversion of pasted urls via macroPlugin with html in clipboard (ED-5786)

## 6.2.19

- Updated dependencies [7e8b4b9](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/7e8b4b9):
  - @atlaskit/editor-common@22.0.0
  - @atlaskit/editor-core@89.0.0
  - @atlaskit/media-test-helpers@18.3.0
  - @atlaskit/media-core@24.5.0

## 6.2.18

- [patch][16ff8d2](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/16ff8d2):

  - Add jira card editor example.

## 6.2.17

- [patch][14477fa](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/14477fa):

  - Adding text alignment to editor and renderer

## 6.2.16

- Updated dependencies [2c21466](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/2c21466):
  - @atlaskit/editor-common@21.0.0
  - @atlaskit/editor-core@88.0.0
  - @atlaskit/media-test-helpers@18.2.12
  - @atlaskit/media-core@24.4.0

## 6.2.15

- [patch][a9eb99f](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/a9eb99f):

  - ED-5510: fix deleting last character in a cell in Safari

## 6.2.14

- [patch][798cff1](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/798cff1):

  - Adds an Import option in full-page example

## 6.2.13

- [patch][7fc0ffb" d](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/7fc0ffb"
  d):

  - ED-5619 Change "Loren ipsun" to "Lorem ipsum" in the example

## 6.2.12

- [patch][44d9c5b" d](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/44d9c5b"
  d):

  - ED-5632: mock Selection API globally; allows dispatching before Editor finishes mounting

## 6.2.11

- [patch][1662ae0" d](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/1662ae0"
  d):

  - ED-5440 convert sections to use percentages

## 6.2.10

- [patch] ED-5439: add block smart cards, toolbar switcher [5f8bdfe](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/5f8bdfe)

## 6.2.9

- [patch] Wrap invalid node with unsupported node [fb60e39](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/fb60e39)

## 6.2.8

- [patch] Updated dependencies [052ce89](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/052ce89)
  - @atlaskit/editor-core@87.0.0
  - @atlaskit/editor-common@20.1.2

## 6.2.7

- [patch] Updated dependencies [b1ce691](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/b1ce691)
  - @atlaskit/editor-common@20.0.0
  - @atlaskit/editor-core@86.0.0
  - @atlaskit/media-core@24.3.0
  - @atlaskit/media-test-helpers@18.2.8

## 6.2.6

- [patch] Updated dependencies [2afa60d](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/2afa60d)
  - @atlaskit/editor-common@19.0.0
  - @atlaskit/editor-core@85.0.0
  - @atlaskit/media-test-helpers@18.2.5
  - @atlaskit/media-core@24.2.0

## 6.2.5

- [patch] Updated dependencies [8b2c4d3](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/8b2c4d3)
- [patch] Updated dependencies [3302d51](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/3302d51)
  - @atlaskit/editor-common@18.0.0
  - @atlaskit/editor-core@84.0.0
  - @atlaskit/media-core@24.1.0
  - @atlaskit/media-test-helpers@18.2.3

## 6.2.4

- [patch] Updated dependencies [23c7eca](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/23c7eca)
  - @atlaskit/editor-core@83.0.0

## 6.2.3

- [patch] change grey to gray to keep consistent across editor pkgs [1b2a0b3](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/1b2a0b3)

## 6.2.2

- [patch] ED-5424: fix telepointers in collab editing [643a860](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/643a860)

## 6.2.1

- [patch] ED-5151 Editor i18n: Floating toolbars [403b547](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/403b547)

## 6.2.0

- [minor] FS-2893 - Creation use cases for full page actions and decisions [c8aa5f5](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/c8aa5f5)

## 6.1.3

- [patch] ED-5150 Editor i18n: Main toolbar [ef76f1f](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/ef76f1f)

## 6.1.2

- [patch] Updated dependencies [927ae63](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/927ae63)
  - @atlaskit/editor-common@17.0.0
  - @atlaskit/editor-core@81.0.0
  - @atlaskit/media-core@24.0.0
  - @atlaskit/media-test-helpers@18.0.0

## 6.1.1

- [patch] ED-5346: prosemirror upgrade [5bd4432](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/5bd4432)

## 6.1.0

- [minor] FS-2961 Introduce status component and status node in editor [7fe2b0a](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/7fe2b0a)

## 6.0.9

- [patch] Updated dependencies [6e1d642](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/6e1d642)
  - @atlaskit/editor-common@16.0.0
  - @atlaskit/editor-core@80.0.0
  - @atlaskit/media-core@23.2.0
  - @atlaskit/media-test-helpers@17.1.0

## 6.0.8

- [patch] Update TS to 3.0 [f68d367](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/f68d367)
- [none] Updated dependencies [f68d367](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/f68d367)
  - @atlaskit/media-test-helpers@17.0.2
  - @atlaskit/media-core@23.1.1
  - @atlaskit/editor-common@15.0.7
  - @atlaskit/editor-core@79.0.12

## 6.0.7

- [patch] ED-4680 add smart card plugin, enable for inline smart cards [b9529e6](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/b9529e6)

## 6.0.6

- [patch] Updated dependencies [7545979](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/7545979)
  - @atlaskit/editor-common@15.0.0
  - @atlaskit/editor-core@79.0.0
  - @atlaskit/media-core@23.1.0

## 6.0.5

- [patch] Remove new upload service feature flag (useNewUploadService). Now new upload service will be used by default. [911a570](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/911a570)
- [patch] Updated dependencies [911a570](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/911a570)
  - @atlaskit/media-test-helpers@17.0.0
  - @atlaskit/media-core@23.0.2
  - @atlaskit/editor-core@78.0.0

## 6.0.4

- [patch] Check current selected nodes before change node selection when interacting with extensions. ED-5199 [bb15908](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/bb15908)

## 6.0.3

- [patch] Updated dependencies [b12f7e6](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/b12f7e6)
  - @atlaskit/editor-common@14.0.11
  - @atlaskit/editor-core@77.1.4

## 6.0.2

- [patch] ED-5178: added card node to default schema [51e7446](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/51e7446)
- [none] Updated dependencies [51e7446](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/51e7446)
  - @atlaskit/editor-core@77.0.13
  - @atlaskit/editor-common@14.0.8

## 6.0.1

- [patch] add useMediaPickerAuthProvider option to storyMediaProviderFactory [16971e9](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/16971e9)
- [none] Updated dependencies [16971e9](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/16971e9)
  - @atlaskit/editor-common@14.0.7

## 6.0.0

- [major] Synchronous property "serviceHost" as part of many Interfaces in media components (like MediaApiConfig) is removed and replaced with asynchronous "baseUrl" as part of Auth object. [d02746f](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/d02746f)
- [none] Updated dependencies [597e0bd](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/597e0bd)
  - @atlaskit/editor-core@77.0.0
  - @atlaskit/editor-common@14.0.0
- [none] Updated dependencies [61df453](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/61df453)
  - @atlaskit/editor-common@14.0.0
  - @atlaskit/editor-core@77.0.0
- [none] Updated dependencies [812a39c](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/812a39c)
  - @atlaskit/editor-core@77.0.0
  - @atlaskit/editor-common@14.0.0
- [none] Updated dependencies [c8eb097](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/c8eb097)
  - @atlaskit/editor-common@14.0.0
  - @atlaskit/editor-core@77.0.0
- [major] Updated dependencies [d02746f](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/d02746f)
  - @atlaskit/media-test-helpers@16.0.0
  - @atlaskit/media-core@23.0.0
  - @atlaskit/editor-common@14.0.0
  - @atlaskit/editor-core@77.0.0

## 5.1.2

- [patch] Updated dependencies [acd86a1](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/acd86a1)
  - @atlaskit/editor-common@13.2.7
  - @atlaskit/editor-core@76.4.5
  - @atlaskit/media-core@22.2.1
  - @atlaskit/media-test-helpers@15.2.1

## 5.1.1

- [patch] Bump prosemirror-model to 1.6 in order to use toDebugString on Text node spec [fdd5c5d](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/fdd5c5d)
- [none] Updated dependencies [fdd5c5d](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/fdd5c5d)
  - @atlaskit/editor-common@13.2.6
  - @atlaskit/editor-core@76.4.2

## 5.1.0

- [minor] Updated dependencies [25ef2e4](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/25ef2e4)
  - @atlaskit/editor-core@76.4.0

## 5.0.3

- [patch] Updated dependencies [fad25ec](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/fad25ec)
  - @atlaskit/media-test-helpers@15.2.0
  - @atlaskit/media-core@22.1.0
  - @atlaskit/editor-common@13.2.1
  - @atlaskit/editor-core@76.2.3

## 5.0.2

- [patch] Fallback to use containerId from MentionResourceConfig if ContextIdentifier promise fails [5ecb9a7](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/5ecb9a7)

- [none] Updated dependencies [5ecb9a7](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/5ecb9a7)
  - @atlaskit/editor-core@76.0.4
  - @atlaskit/editor-common@13.0.4
- [none] Updated dependencies [6e31eb6](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/6e31eb6)
  - @atlaskit/editor-core@76.0.4
  - @atlaskit/editor-common@13.0.4

## 5.0.1

- [none] Updated dependencies [25353c3](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/25353c3)
  - @atlaskit/editor-core@76.0.0
- [patch] Updated dependencies [38c0543](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/38c0543)
  - @atlaskit/editor-core@76.0.0

## 5.0.0

- [major] Updates to React ^16.4.0 [7edb866](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/7edb866)
- [major] Updated dependencies [563a7eb](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/563a7eb)
  - @atlaskit/editor-common@13.0.0
  - @atlaskit/editor-core@75.0.0
  - @atlaskit/media-core@22.0.0
  - @atlaskit/media-test-helpers@15.0.0
- [major] Updated dependencies [7edb866](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/7edb866)
  - @atlaskit/editor-core@75.0.0
  - @atlaskit/editor-common@13.0.0
  - @atlaskit/media-test-helpers@15.0.0
  - @atlaskit/media-core@22.0.0

## 4.2.4

- [none] Updated dependencies [5f6ec84](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/5f6ec84)
  - @atlaskit/editor-core@74.0.17
  - @atlaskit/editor-common@12.0.0
- [patch] Updated dependencies [5958588](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/5958588)
  - @atlaskit/editor-core@74.0.17
  - @atlaskit/editor-common@12.0.0

## 4.2.3

- [none] Updated dependencies [c98857e](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/c98857e)
  - @atlaskit/editor-core@74.0.16
  - @atlaskit/editor-common@11.4.6
- [patch] Updated dependencies [8a125a7](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/8a125a7)
  - @atlaskit/editor-core@74.0.16
  - @atlaskit/editor-common@11.4.6
- [none] Updated dependencies [cacfb53](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/cacfb53)
  - @atlaskit/editor-core@74.0.16
  - @atlaskit/editor-common@11.4.6

## 4.2.2

- [patch] Updated dependencies [af0cde6](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/af0cde6)
  - @atlaskit/editor-core@74.0.0

## 4.2.1

- [none] Updated dependencies [8c711bd](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/8c711bd)
  - @atlaskit/editor-core@73.9.26
  - @atlaskit/editor-common@11.3.12
- [patch] Updated dependencies [42ee1ea](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/42ee1ea)
  - @atlaskit/media-test-helpers@14.0.6
  - @atlaskit/media-core@21.0.0
  - @atlaskit/editor-common@11.3.12
  - @atlaskit/editor-core@73.9.26

## 4.2.0

- [minor] Export 'clean' function from schema-builder to allow converting RefNodes to normal PM nodes [2625ade](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/2625ade)

* [none] Updated dependencies [2625ade](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/2625ade)
  - @atlaskit/editor-core@73.9.8
  - @atlaskit/editor-common@11.3.9
* [none] Updated dependencies [e3c6479](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/e3c6479)
  - @atlaskit/editor-core@73.9.8
  - @atlaskit/editor-common@11.3.9
* [none] Updated dependencies [541341e](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/541341e)
  - @atlaskit/editor-core@73.9.8
  - @atlaskit/editor-common@11.3.9
* [none] Updated dependencies [fe383b4](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/fe383b4)
  - @atlaskit/editor-core@73.9.8
  - @atlaskit/editor-common@11.3.9

## 4.1.9

- [patch] Updated dependencies [8d5053e](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/8d5053e)
  - @atlaskit/editor-common@11.3.8
  - @atlaskit/editor-core@73.9.5

## 4.1.8

- [patch] Updated dependencies [0cf2f52](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/0cf2f52)
  - @atlaskit/editor-core@73.9.2
  - @atlaskit/editor-common@11.3.7

## 4.1.7

- [patch] Updated dependencies [c57e9c1](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/c57e9c1)
  - @atlaskit/media-test-helpers@14.0.4
  - @atlaskit/editor-common@11.3.5
  - @atlaskit/editor-core@73.8.19
  - @atlaskit/media-core@20.0.0

## 4.1.6

- [patch] Introduce regression tests for pasting content from 3rd-party vendors into the editor. `dispatchPasteEvent` now returns the event that was fired when successful, to allow consumers to tell whether it was modified by ProseMirror. (ED-3726) [e358e9f](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/e358e9f)
- [none] Updated dependencies [e358e9f](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/e358e9f)
  - @atlaskit/editor-core@73.8.11

## 4.1.5

- [patch] Remove pinned prosemirror-model@1.4.0 and move back to caret ranges for prosemirror-model@^1.5.0 [4faccc0](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/4faccc0)
- [patch] Updated dependencies [4faccc0](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/4faccc0)
  - @atlaskit/editor-common@11.3.0
  - @atlaskit/editor-core@73.8.6

## 4.1.4

- [patch] Bump prosemirror-view to 1.3.3 to fix issue where newlines in code-blocks would vanish in IE11. (ED-4830) [fc5a082](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/fc5a082)
- [none] Updated dependencies [fc5a082](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/fc5a082)
  - @atlaskit/editor-core@73.8.3
  - @atlaskit/editor-common@11.2.10

## 4.1.3

- [patch] ED-4489 Fix can't submit with enter using Korean and Japanese IME [0274524](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/0274524)
- [none] Updated dependencies [0274524](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/0274524)
  - @atlaskit/editor-core@73.7.8
  - @atlaskit/editor-common@11.2.3

## 4.1.2

- [patch] Clean Changelogs - remove duplicates and empty entries [e7756cd](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/e7756cd)
- [none] Updated dependencies [e7756cd](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/e7756cd)
  - @atlaskit/editor-core@73.7.5
  - @atlaskit/editor-common@11.2.1
  - @atlaskit/media-test-helpers@14.0.3
  - @atlaskit/media-core@19.1.3

## 4.1.1

- [patch] Update changelogs to remove duplicate [cc58e17](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/cc58e17)
- [none] Updated dependencies [cc58e17](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/cc58e17)
  - @atlaskit/editor-core@73.7.1
  - @atlaskit/editor-common@11.1.2
  - @atlaskit/media-test-helpers@14.0.2
  - @atlaskit/media-core@19.1.2

## 4.1.0

- [none] Updated dependencies [7217164](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/7217164)
  - @atlaskit/editor-core@73.5.0
  - @atlaskit/editor-common@11.1.0
- [none] Updated dependencies [9d20f54](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/9d20f54)
  - @atlaskit/editor-common@11.1.0
  - @atlaskit/editor-core@73.5.0
  - @atlaskit/media-core@19.1.1
  - @atlaskit/media-test-helpers@14.0.1

## 4.0.7

- [patch] Update and lock prosemirror-model version to 1.4.0 [febf753](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/febf753)
- [none] Updated dependencies [febf753](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/febf753)
  - @atlaskit/editor-common@11.0.6
  - @atlaskit/editor-core@73.4.4

## 4.0.6

- [patch] Adding breakout to extensions [3d1b0ab](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/3d1b0ab)
- [none] Updated dependencies [3d1b0ab](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/3d1b0ab)
  - @atlaskit/editor-core@73.4.3
  - @atlaskit/editor-common@11.0.5

## 4.0.5

- [patch] ED-4823: added card provider [583ae09](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/583ae09)
- [none] Updated dependencies [583ae09](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/583ae09)
  - @atlaskit/editor-core@73.3.10

## 4.0.4

- [patch] ED-4818: add inlineCard to schema [a303cbd](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/a303cbd)
- [none] Updated dependencies [a303cbd](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/a303cbd)
  - @atlaskit/editor-core@73.3.7
  - @atlaskit/editor-common@11.0.4

## 4.0.3

- [patch] Updated dependencies [1e80619](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/1e80619)
  - @atlaskit/editor-core@73.0.0
  - @atlaskit/editor-common@11.0.0
  - @atlaskit/media-test-helpers@14.0.0
  - @atlaskit/media-core@19.0.0

## 4.0.2

- [patch] Updated dependencies [1c87e5a](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/1c87e5a)
  - @atlaskit/editor-core@72.2.2
  - @atlaskit/editor-common@10.1.9

## 4.0.1

- [patch] Fixing the toolbar for extensions [ef9ccca](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/ef9ccca)
- [none] Updated dependencies [ef9ccca](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/ef9ccca)
  - @atlaskit/editor-core@72.1.4

## 4.0.0

- [none] Updated dependencies [febc44d](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/febc44d)
  - @atlaskit/editor-core@72.0.0
  - @atlaskit/editor-common@10.0.0

## 3.1.9

- [patch] Allow disabling smart-autocompletion (capitalising of Atlassian products, em-dash insert, smart-quotes) via prop `textFormatting={{ disableSmartAutoCompletion: true }}` [cee7a4a](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/cee7a4a)
- [none] Updated dependencies [cee7a4a](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/cee7a4a)
  - @atlaskit/editor-core@71.4.2

## 3.1.8

- [patch] Support external media in bitbucket transformer and image uploader [8fd4dd1](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/8fd4dd1)
- [none] Updated dependencies [8fd4dd1](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/8fd4dd1)
  - @atlaskit/editor-core@71.4.0
  - @atlaskit/editor-common@9.3.9

## 3.1.7

- [patch] Extensions should have text [64e32a2](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/64e32a2)

## 3.1.6

- [patch] Adding support for external images [9935105](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/9935105)

## 3.1.5

- [patch] ED-4431, selecting block extension creates a wrng selection. [c078cf2](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/c078cf2)

## 3.1.4

- [patch] Bump to prosemirror-view@1.3.0 [faea319](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/faea319)

## 3.1.2

- [patch] Handle pasting of page-layouts to prevent unpredictable node-splitting behaviour. Will now 'unwrap' the contents of a layout if the slice is a partial range across page layouts, or if we are attempting to paste a layout inside a layout. We now always handle dispatching the transaction to handle paste ourselves (instead of falling back to PM). [f4ca7ac](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/f4ca7ac)

## 3.1.0

- [minor] Add a generic type ahead plugin [445c66b](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/445c66b)

## 3.0.8

- [patch] ED-4294: fix editing bodiedExtension nodes [35d2648](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/35d2648)

## 3.0.7

- [patch] fix deletion of lists and other elements placed after tables; bump prosemirror-commands to 1.0.7 [162960f](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/162960f)

## 3.0.4

- [patch] Remove old chai reference which does not allow using editor-test-helpers in non-atlaskit TS packages [ea627e4](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/ea627e4)

## 3.0.3

- [patch] Added missing dependencies and added lint rule to catch them all [0672503](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/0672503)

## 3.0.1

- [patch] change table node builder constructor for tests, remove tableWithAttrs [cf43535](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/cf43535)

## 3.0.0

- [major] CFE-1004: Rename anything "macro" to "extension" (i.e: MacroProvider to ExtensionProvider) [453aa52](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/453aa52)

## 2.1.1

- [patch] ED-3476 add table breakout mode [7cd4dfa](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/7cd4dfa)

## 2.0.14

- [patch] Show upload button during recents load in media picker. + Inprove caching for auth provider used in examples [929731a](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/929731a)

## 2.0.13

- [patch] Upgrading ProseMirror Libs [35d14d5](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/35d14d5)

## 2.0.12

- [patch] Remove JSDOM warning in CI [309af83](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/309af83)

## 2.0.9

- [patch] CFE-846: Add support to extension handlers (lite version) [4ea9ffe](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/4ea9ffe)

## 2.0.8

- [patch] restrict nested bodiedExtensions [2583534](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/2583534)

## 2.0.5

- [patch] support \_\_confluenceMetadata property on link mark [b17f847](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/b17f847)

## 2.0.2

- [patch] make colwidth an array of numbers in schema [369b522](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/369b522)

## 2.0.0

- [major] Remove linkCreateContext from default options and add userAuthProvider [fc2ca7a](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/fc2ca7a)

## 1.9.1

- [patch] Enforce minimum version of w3c-keyname to be >= 1.1.8 [dc120b9](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/dc120b9)

## 1.9.0

- [minor] add support for <fab:adf> and confluence decision list transforms [e08eccc](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/e08eccc)
- [minor] add support for <fab:adf> and confluence decision list transforms [f43f928](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/f43f928)
- [minor] advanced features for tables [e0bac20](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/e0bac20)

## 1.8.11

- [patch] Encode and decode for Extension schemaVersion [0335988](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/0335988)

## 1.8.10

- [patch] updated the repository url to https://bitbucket.org/atlassian/atlaskit-mk-2 [1e57e5a](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/1e57e5a)

## 1.8.9

- [patch] Fix issue with having multiple Dropzone elements listening at the same time with Editor and MediaPicker [d37de20](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/d37de20)

## 1.8.8

- [patch] Move media provider and state manager to editor-core [0601da7](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/0601da7)

## 1.8.7

- [patch] bump editor-common to 6.1.2 [bb7802e](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/bb7802e)

## 1.8.6

- [patch] Allow macro provider to handle auto conversion during paste [b2c83f8](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/b2c83f8)

## 1.8.5

- [patch] cket-transformer/**tests**/\_schema-builder.ts [a6e77ff](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/a6e77ff)

## 1.8.3

- [patch] fix extension replacement with empty content [e151446](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/e151446)

## 1.8.1

- [patch] Remove placeholderBaseUrl config option from the Confluence Macro Provider [1583960](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/1583960)

## 1.8.0

- [minor] added date plugin [f7b8a33](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/f7b8a33)

## 1.7.0

- [minor] Add React 16 support. [12ea6e4](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/12ea6e4)

## 1.6.1

- [patch] Use media-test-helpers instead of hardcoded values [f2b92f8](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/f2b92f8)

## 1.4.5

- [patch] Add support for single image wrap left/right layout [59d9a74](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/59d9a74)

## 1.4.0

- [minor] Add Serializer for Single image [03405bf](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/03405bf)

## 1.3.0

- [minor] FS-1461 added ContextIdentifierProvider interface to editor [0aeea41](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/0aeea41)

## 1.2.6

- [patch] Rename singleImage to mediaSingle. Replaced alignment and display attributes with layout. [0b97f0a](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/0b97f0a)

## 1.2.2

- [patch] split extension node [4303d49](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/4303d49)

## 1.1.2

- [patch] added extension node [ec73cb8](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/ec73cb8)

## 1.1.0

- [patch] Fix dependencies [9f9de42](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/9f9de42)

## 0.8.1

- [patch] Restore accessLevel attribute for mention node [a83619f](a83619f)
