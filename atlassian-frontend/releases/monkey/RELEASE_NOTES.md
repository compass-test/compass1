# Monkey Release

## Summary

| Package                                 | Type  | Change             | Number of changes |
| --------------------------------------- | ----- | ------------------ | ----------------: |
| @af/dropdown-menu                       | major | 10.1.3 -> 11.0.0   |                 1 |
| @atlaskit/tabs                          | major | 12.1.3 -> 13.0.0   |                 2 |
| @atlaskit/adf-schema                    | minor | 15.0.0 -> 15.1.0   |                 2 |
| @atlaskit/adf-utils                     | minor | 11.9.0 -> 11.10.0  |                 1 |
| @atlaskit/blanket                       | minor | 11.1.1 -> 11.2.0   |                 1 |
| @atlaskit/ds-lib                        | minor | 1.0.0 -> 1.1.0     |                 4 |
| @atlaskit/editor-core                   | minor | 140.0.0 -> 140.1.0 |                18 |
| @atlaskit/editor-mobile-bridge          | minor | 25.4.1 -> 25.5.0   |                 6 |
| @atlaskit/logo                          | minor | 13.2.0 -> 13.3.0   |                 1 |
| @atlaskit/mention                       | minor | 19.4.0 -> 19.5.0   |                 1 |
| @atlaskit/modal-dialog                  | minor | 11.2.9 -> 11.3.0   |                 3 |
| @atlaskit/renderer                      | minor | 75.0.0 -> 75.1.0   |                 2 |
| @atlaskit/section-message               | minor | 5.1.0 -> 5.2.0     |                 2 |
| @atlaskit/theme                         | minor | 11.0.3 -> 11.1.0   |                 1 |
| @atlaskit/calendar                      | patch | 11.0.0 -> 11.0.1   |                 1 |
| @atlaskit/code                          | patch | 13.2.1 -> 13.2.2   |                 1 |
| @atlaskit/codemod-utils                 | patch | 2.1.1 -> 2.1.2     |                 2 |
| @atlaskit/editor-common                 | patch | 55.4.3 -> 55.4.4   |                 3 |
| @atlaskit/editor-json-transformer       | patch | 8.5.0 -> 8.5.1     |                 1 |
| @atlaskit/editor-shared-styles          | patch | 1.4.0 -> 1.4.1     |                 1 |
| @atlaskit/legacy-mobile-macros          | patch | 0.3.0 -> 0.3.1     |                 0 |
| @atlaskit/media-ui                      | patch | 15.3.2 -> 15.3.3   |                 1 |
| @atlaskit/side-navigation               | patch | 0.8.3 -> 0.8.4     |                 1 |
| @atlaskit/spinner                       | patch | 15.0.7 -> 15.0.8   |                 1 |
| @atlaskit/tag-group                     | patch | 10.0.5 -> 10.0.6   |                 1 |
| @atlaskit/user-picker                   | patch | 7.9.0 -> 7.9.1     |                 1 |
| @atlassian/commerce-billing-details     | patch | 2.6.1 -> 2.6.2     |                 0 |
| @atlassian/commerce-billing-history     | patch | 2.1.4 -> 2.1.5     |                 0 |
| @atlassian/commerce-credit-card-base    | patch | 3.4.1 -> 3.4.2     |                 0 |
| @atlassian/commerce-credit-card-ccp     | patch | 2.1.3 -> 2.1.4     |                 0 |
| @atlassian/commerce-credit-card-hams    | patch | 5.0.5 -> 5.0.6     |                 0 |
| @atlassian/commerce-layout              | patch | 1.1.6 -> 1.1.7     |                 0 |
| @atlassian/commerce-payment-flow        | patch | 5.4.4 -> 5.4.5     |                 0 |
| @atlassian/commerce-payment-methods     | patch | 1.8.2 -> 1.8.3     |                 0 |
| @atlassian/commerce-ui                  | patch | 2.2.22 -> 2.2.23   |                 0 |
| @atlassian/editor-referentiality        | patch | 1.0.0 -> 1.0.1     |                 1 |
| @atlassian/forge-ui                     | patch | 19.14.0 -> 19.14.1 |                 1 |
| @atlassian/forge-ui-core                | patch | 4.6.1 -> 4.6.2     |                 2 |
| @atlassian/invite-people                | patch | 4.0.0 -> 4.0.1     |                 1 |
| @atlassian/notification-list            | patch | 0.0.5 -> 0.0.6     |                 1 |
| @atlassian/pipelines-editor             | patch | 0.10.23 -> 0.10.24 |                 0 |
| @atlassian/pipelines-runners-management | patch | 0.4.1 -> 0.4.2     |                 0 |
| @atlassian/product-search-dialog        | patch | 7.16.4 -> 7.16.5   |                 1 |
| @atlassian/search-dialog                | patch | 7.4.2 -> 7.4.3     |                 1 |
| @atlassian/xen-editor-provider          | patch | 12.0.6 -> 12.0.7   |                 1 |

## Details

---

### @af/dropdown-menu@11.0.0

#### Major Changes

- [`25dcb7ad3d6`](https://bitbucket.org/atlassian/atlassian-frontend/commits/25dcb7ad3d6) - [ux] rewrite dropdown menu with popup and menu

#### Patch Changes

- Updated dependencies

---

### @atlaskit/tabs@13.0.0

#### Major Changes

- [`c17fe6144f8`](https://bitbucket.org/atlassian/atlassian-frontend/commits/c17fe6144f8) - #### Major Changes

  In this version, `Tabs` has had a pretty substantial rewrite. As well as now being dramatically faster and more lightweight, it has a brand new flexible composable API and a bunch of accessibility improvements.

  #### Composable API

  The old version of `Tabs` had a `tabs` prop that would map to `TabItem`'s and `TabContent`'s.

  ```
  import Tabs from '@atlaskit/tabs';

  const ComponentUsingTabs = () => (
    <Tabs tabs={
      { label: 'Tab 1', content: 'One' },
      { label: 'Tab 2', content: 'Two' },
      { label: 'Tab 3', content: 'Three' },
    ]} />
  );
  ```

  We've changed the language to match the W3 spec so a `TabItem` is now a `Tab` and a `TabContent` is a `TabPanel`. We now export these components as well as a `TabList` so consumers use a composable API that matches the DOM structure.

  ```
  import Tabs, { Tab, TabList, TabPanel } from '@atlaskit/tabs';

  const ComponentUsingTabs = () => (
    <Tabs
      id="component-using-tabs"
    >
      <TabList>
        <Tab>Tab 1</Tab>
        <Tab>Tab 2</Tab>
        <Tab>Tab 3</Tab>
      </TabList>
      <TabPanel>
        One
      </TabPanel>
      <TabPanel>
        Two
      </TabPanel>
      <TabPanel>
        Three
      </TabPanel>
    </Tabs>
  );
  ```

  This allows you to easily customise your usage, for example if you want to add a tooltip.

  ```
  import Tabs, { Tab, TabList, TabPanel } from '@atlaskit/tabs';
  import Tooltip from '@atlaskit/tooltip';

  const TooltipTab = ({ label, tooltip }: { label: string; tooltip: string }) => (
    <Tooltip content={tooltip}>
      <Tab>{label}</Tab>
    </Tooltip>
  );

  const ComponentUsingTabs = () => (
    <Tabs
      id="component-using-tabs"
    >
      <TabList>
        <TooltipTab label="Tab 1" tooltip="Tooltip for tab 1" />
        <TooltipTab label="Tab 2" tooltip="Tooltip for tab 2" />
        <TooltipTab label="Tab 3" tooltip="Tooltip for tab 3" />
      </TabList>
      <TabPanel>
        One
      </TabPanel>
      <TabPanel>
        Two
      </TabPanel>
      <TabPanel>
        Three
      </TabPanel>
    </Tabs>
  );
  ```

  #### Hooks replacing Component prop

  The `component` prop allowed you to customise the `Tab` and `TabPanel`. This approach seemed counter-intuitive and had a performance impact regardless of whether you were using it. Instead with composability we have have added two hooks, `useTab` and `useTabPanel`.

  To create a custom `Tab`, call `useTab` and spread those attributes onto the custom tab. From there you can use it in place of a `Tab`. For example if you want to change the font size you would do so like this.

  ```
  import { useTab } from '@atlaskit/tabs';

  const CustomTab = ({ label }: { label: string }) => {
    const tabAttributes = useTab();

    return (
      <div
        style={{
          fontSize: 16;
        }}
        {...tabAttributes}
      >
        {label}
      </div>
    );
  };
  ```

  Likewise, to create a custom `TabPanel`, call `useTabPanel` and spread those attributes onto the custom tab panel.

  ```
  import { useTab } from '@atlaskit/tabs';

  const CustomTabPanel = ({ body }: { body: string }) => {
    const tabPanelAttributes = useTabPanel();

    return (
      <div
        style={{
          margin: 12
        }}
        {...tabPanelAttributes}
      >
        {body}
      </div>
    );
  };
  ```

  #### onSelect -> onChange

  The `onSelect` prop has been renamed to `onChange` to be consistent with other design system components. Internal state has now changed to keep track of the selected index. Previously the object in the `tabs` prop array of type `TabData` was passed as well as the index. If you were using this object you will have to change to use the index.

  The type has changed from
  `(selected: TabData, selectedIndex: number, analyticsEvent: UIAnalyticsEvent) => void;`
  to
  `(index: number, analyticsEvent: UIAnalyticsEvent) => void;`

  This also means if you are using the `selected` prop you will have to ensure you are using the index of the selected tab instead of the object of type `TabData`.

  #### isSelectedTest

  Previously you could provide the prop `isSelectedTest` to `Tabs` and it would determine what tab is selected by seeing what tab returns true when `isSelectedTest` is called. This is a messy API that effectively means there were two ways of making `Tabs` controlled. If you are using `isSelectedTest` you should swap to using the `selected` prop to indicate that a tab is selected.

  #### Accessibility and required ID

  According to the w3 spec each tab should be linked to its corresponding tab panel. We have added the `aria-controls` attribute to tabs and the `aria-labelledby` attribute to tab panels. In order to do this we needed to generate a unique id for each tab and tab panel. To ensure these id's are unique if there are multiple `Tabs` components on the same page there is now a required `id` prop.

  #### shouldUnmountTabPanelOnChange

  There was previously a prop `isContentPersisted` which defaults to false. When true it would render all tab panels. The new default behaviour of `Tabs` is to leave each tab panel mounted on the page after it has been selected. This means that tab panels will only mount if selected and will not unmount and remount when changing tabs. In light of this change, `isContentPersisted` has been removed and `shouldUnmountTabPanelOnChange` has been introduced. It defaults to false and if it is set to true it will unmount a `TabPanel` when it is not selected. Effectively `shouldUnmountTabPanelOnChange` is the inverse of `isContentPersisted`.

  #### Other changes

  - Remove `TabItem` and `TabContent` export.
  - Remove the types: `TabItemElementProps`, `TabItemComponentProvided`, `TabContentComponentProvided`, `TabItemType`, `TabContentType`, `SelectedProp`, `IsSelectedTestFunction`, `OnSelectCallback`, `TabsState`, `TabsNavigationProps` and `Mode`.

  #### Automatic upgrading

  There is a codemod that assists you in upgrading most of the changes from above.
  Depending on your usage, you will most likely have to do a manual step as this is a fairly big change in API. The codemod will do its best job at making sure everything functions but you may want to clean up your usage of `@atlaskit/tabs`. It does these following changes:

  - Adds a randomly generated ID
  - Changes `onSelect` to `onChange` and defines a new inline function that will functionally work the same as it used to. It is however a messy solution and you may want to change the function to only use the selected index.
  - Remove the `TabItem` and `TabContent` imports.
  - Map the array you supplied as a `tabs` prop to create `Tab`'s and `TabPanel`'s.
  - Remove the `component` and `isSelectedTest` prop.
  - Removes types that no longer exist.
  - Migrates your usage of `isContentPersisted` to one of `shouldUnmountTabPanelOnChange`.

  To run the codemod: **You first need to have the latest version installed**

  ```bash
  yarn upgrade @atlaskit/tabs@^13.0.0
  ```

  Once upgraded,
  use `@atlaskit/codemod-cli`:

  ```bash
  npx @atlaskit/codemod-cli --parser babel --extensions ts,tsx,js [relativePath]
  ```

  The CLI will show a list of components and versions so select `@atlaskit/tabs@^13.0.0` and you will automatically be upgraded.

  Run `npx @atlaskit/codemod-cli -h` for more details on usage.
  For Atlassians,
  refer to the [documentation](https://developer.atlassian.com/cloud/framework/atlassian-frontend/codemods/01-atlassian-codemods/) for more details on the codemod CLI.

#### Patch Changes

- [`1adf9a493f5`](https://bitbucket.org/atlassian/atlassian-frontend/commits/1adf9a493f5) - Fix codemod issue
- Updated dependencies

---

### @atlaskit/adf-schema@15.1.0

#### Minor Changes

- [`653093877f8`](https://bitbucket.org/atlassian/atlassian-frontend/commits/653093877f8) - Update data-consumer behaviour for json transforming
- [`357edf7b4a1`](https://bitbucket.org/atlassian/atlassian-frontend/commits/357edf7b4a1) - ED-12266 Extend code block to support UnsupportedInline content.

---

### @atlaskit/adf-utils@11.10.0

#### Minor Changes

- [`357edf7b4a1`](https://bitbucket.org/atlassian/atlassian-frontend/commits/357edf7b4a1) - ED-12266 Extend code block to support UnsupportedInline content.

#### Patch Changes

- Updated dependencies

---

### @atlaskit/blanket@11.2.0

#### Minor Changes

- [`990aefd838b`](https://bitbucket.org/atlassian/atlassian-frontend/commits/990aefd838b) - Blanket now accepts testId prop to be used for automated testing purposes.

#### Patch Changes

- Updated dependencies

---

### @atlaskit/ds-lib@0.2.0

#### Minor Changes

- [`a2924ae3e4f`](https://bitbucket.org/atlassian/atlassian-frontend/commits/a2924ae3e4f) - **Add DS lib package with reusable utils and hooks**

  - We are introducing a new package which contains reusable utils and hooks specific to design system.

  - Following **hooks** are available:

    - `useLazyRef`: Which will only run passed expensive function once and save the result into the returned `ref`.

  - Following **utils** are available:

    - `noop`: An empty function which returns nothing.

- [`14396cae929`](https://bitbucket.org/atlassian/atlassian-frontend/commits/14396cae929) - Add warnOnce helper function

#### Patch Changes

- [`e56d6be0379`](https://bitbucket.org/atlassian/atlassian-frontend/commits/e56d6be0379) - A new utility to calculate scrollbar width is added for re-use.
- [`27570643ef2`](https://bitbucket.org/atlassian/atlassian-frontend/commits/27570643ef2) - Adds use lazy callback and use state ref hooks.

---

### @atlaskit/editor-core@140.1.0

#### Minor Changes

- [`262e3b64547`](https://bitbucket.org/atlassian/atlassian-frontend/commits/262e3b64547) - [ux] ED-12492 Remove blue overlay on selected extension to allow better visibility of extension content and improve accessibility.
- [`357edf7b4a1`](https://bitbucket.org/atlassian/atlassian-frontend/commits/357edf7b4a1) - ED-12266 Extend code block to support UnsupportedInline content.
- [`f042eac9bf1`](https://bitbucket.org/atlassian/atlassian-frontend/commits/f042eac9bf1) - Add SmartMentionResource to mentions with editor-core example
- [`818ad5911c9`](https://bitbucket.org/atlassian/atlassian-frontend/commits/818ad5911c9) - [ux] ED-12552 Add ability to clear optional Select fields in config panel

#### Patch Changes

- [`8aed23756e2`](https://bitbucket.org/atlassian/atlassian-frontend/commits/8aed23756e2) - Change to injected version information for analytics
- [`df1da03ac3d`](https://bitbucket.org/atlassian/atlassian-frontend/commits/df1da03ac3d) - define interface for api extension
- [`0919b985b3d`](https://bitbucket.org/atlassian/atlassian-frontend/commits/0919b985b3d) - [ux] [ED-12525] Fix regression caused by changing inline nodes to display inline-block. Pressing cmd + shift + arrow left was not working as expected but by adding user-select: all solves this. Integration tests added for this too.
- [`864bae0214b`](https://bitbucket.org/atlassian/atlassian-frontend/commits/864bae0214b) - Removed old methods for inserting a link as they were only being used by mobile. Fix hyperlink text removal on editor mobile bridge.
- [`14050fe1345`](https://bitbucket.org/atlassian/atlassian-frontend/commits/14050fe1345) - Incorrect use of modal dialog types has been fixed.
- [`5e75045be8a`](https://bitbucket.org/atlassian/atlassian-frontend/commits/5e75045be8a) - Turn off CustomSelect create animation in Config Panel
- [`5a6e9efd99b`](https://bitbucket.org/atlassian/atlassian-frontend/commits/5a6e9efd99b) - ED-12508 implement api stub
- [`573567c0132`](https://bitbucket.org/atlassian/atlassian-frontend/commits/573567c0132) - [ux] [ED-12493] Made redo button tooltip have the Cmd icon instead of 'Mod' text by swapping mod for either Ctrl of Cmd in the makeKeymap function
- [`a1711bcd0c1`](https://bitbucket.org/atlassian/atlassian-frontend/commits/a1711bcd0c1) - [ux] ED-12409 fixed issue with inline comment toolbar appearing on empty selection
- [`5c835144ef0`](https://bitbucket.org/atlassian/atlassian-frontend/commits/5c835144ef0) - [ME-741][me-743] Remove PX references in editor packages and modify code block font size.
- [`7044e6988ac`](https://bitbucket.org/atlassian/atlassian-frontend/commits/7044e6988ac) - Updated card toolbar snapshots to include id property
- [`fcec9613a7e`](https://bitbucket.org/atlassian/atlassian-frontend/commits/fcec9613a7e) - Fix extension selection issue
- [`d09597db582`](https://bitbucket.org/atlassian/atlassian-frontend/commits/d09597db582) - ED-12505 Fix scoping of predictable lists input rule handlers
- [`b4d175f5b2d`](https://bitbucket.org/atlassian/atlassian-frontend/commits/b4d175f5b2d) - ED-12075: hide plus button for empty lists
- Updated dependencies

---

### @atlaskit/editor-mobile-bridge@25.5.0

#### Minor Changes

- [`865761dd8f8`](https://bitbucket.org/atlassian/atlassian-frontend/commits/865761dd8f8) - ME-1154 Introduced an allowed list API to filter adaptive toolbar capabilities.
  Native mobile can use this new bridge API to provide an allowed list.
  When allowed is set, floating toolbar items will be filtered out based on the given list.
  This will prevent to have capabilities enabled on the native side accidently.

#### Patch Changes

- [`48de89b4b54`](https://bitbucket.org/atlassian/atlassian-frontend/commits/48de89b4b54) - Add smart-link mobile test cases
- [`864bae0214b`](https://bitbucket.org/atlassian/atlassian-frontend/commits/864bae0214b) - Removed old methods for inserting a link as they were only being used by mobile. Fix hyperlink text removal on editor mobile bridge.
- [`9e0d05b6e6b`](https://bitbucket.org/atlassian/atlassian-frontend/commits/9e0d05b6e6b) - reuse MediaMock from media-test-helpers
- [`7513497739b`](https://bitbucket.org/atlassian/atlassian-frontend/commits/7513497739b) - fixed a bug where the native bridge wasn't being notified when user taps on a smartlink
- [`44414d3dd1e`](https://bitbucket.org/atlassian/atlassian-frontend/commits/44414d3dd1e) - Adds media group test
- Updated dependencies

---

### @atlaskit/logo@13.3.0

#### Minor Changes

- [`c8afaa49d34`](https://bitbucket.org/atlassian/atlassian-frontend/commits/c8afaa49d34) - Add `OpsgenieIcon`, `OpsgenieLogo` and `OpsgenieWordmark` in order to rename `OpsGenie` to `Opsgenie`, and deprecate the following logos:

  - `JiraCoreIcon`, `JiraCoreLogo`, `JiraCoreWordmark`
  - `JiraServiceDeskIcon`, `JiraServiceDeskLogo`, `JiraServiceDeskWordmark`
  - `StrideIcon`, `StrideLogo`, `StrideWordmark`
  - `HipchatIcon`, `HipchatLogo`, `HipchatWordmark`

#### Patch Changes

- Updated dependencies

---

### @atlaskit/mention@19.5.0

#### Minor Changes

- [`f042eac9bf1`](https://bitbucket.org/atlassian/atlassian-frontend/commits/f042eac9bf1) - Add SmartMentionResource to mentions with editor-core example

#### Patch Changes

- Updated dependencies

---

### @atlaskit/modal-dialog@11.3.0

#### Minor Changes

- [`0e0b2148d48`](https://bitbucket.org/atlassian/atlassian-frontend/commits/0e0b2148d48) - Modal dialog now attaches data-testid to its header and footer.

#### Patch Changes

- [`a9dc147612a`](https://bitbucket.org/atlassian/atlassian-frontend/commits/a9dc147612a) - [litemode] Internal nested modal components have been re-written as hooks.
- [`910c7744256`](https://bitbucket.org/atlassian/atlassian-frontend/commits/910c7744256) - Internal restructure of files and folders.
- Updated dependencies

---

### @atlaskit/renderer@75.1.0

#### Minor Changes

- [`23de387a004`](https://bitbucket.org/atlassian/atlassian-frontend/commits/23de387a004) - ED-12183 - add top margin to extension wrapper

#### Patch Changes

- [`5c835144ef0`](https://bitbucket.org/atlassian/atlassian-frontend/commits/5c835144ef0) - [ME-741][me-743] Remove PX references in editor packages and modify code block font size.
- Updated dependencies

---

### @atlaskit/section-message@5.2.0

#### Minor Changes

- [`190c2c66087`](https://bitbucket.org/atlassian/atlassian-frontend/commits/190c2c66087) - **Internal change from class to functional components**

  - Converted all the components from class to functional. This improved performance quite a bit. Initial rendering, hydration and re-rendering all have been improved.
  - Stopped exporting unused `theme` variable.
  - Added `ref` support which points to the top level element. Earlier it was not officially supported.
  - Dev changes includes: folder restructuring and cleanup, memoizing components, adding `techstack` in `package.json`, moving to declarative entry points, removing deprecated `version.json` etc.

#### Patch Changes

- [`f10bc0d79f1`](https://bitbucket.org/atlassian/atlassian-frontend/commits/f10bc0d79f1) - Migrated from styled components to emotion
- Updated dependencies

---

### @atlaskit/theme@11.1.0

#### Minor Changes

- [`bc02e5ad605`](https://bitbucket.org/atlassian/atlassian-frontend/commits/bc02e5ad605) - Theme now exposes an additional custom hook for consumption of the theme that behave the same as the `Consumer` component. `useTheme` is returned in addition to the `Provider` and `Consumer` in the `createTheme` function.

  For ease of consumption of the global theme, a pre-configured usage of `useTheme` hook has been also been exported
  as `useGlobalTheme`.

---

### @atlaskit/calendar@11.0.1

#### Patch Changes

- [`4eb2615652c`](https://bitbucket.org/atlassian/atlassian-frontend/commits/4eb2615652c) - Internal refactor to use common utils.
- Updated dependencies

---

### @atlaskit/code@13.2.2

#### Patch Changes

- [`900819ca759`](https://bitbucket.org/atlassian/atlassian-frontend/commits/900819ca759) - Update to VR test suite, to make diffs easier to reason about.
- Updated dependencies

---

### @atlaskit/codemod-utils@2.1.2

#### Patch Changes

- [`1300c88e2cc`](https://bitbucket.org/atlassian/atlassian-frontend/commits/1300c88e2cc) - Add shouldApplyTransform to createTransformer so there is a check before transforms are run.
- [`1b6bf93be84`](https://bitbucket.org/atlassian/atlassian-frontend/commits/1b6bf93be84) - Migrate helper functions into codemod-utils

---

### @atlaskit/editor-common@55.4.4

#### Patch Changes

- [`df1da03ac3d`](https://bitbucket.org/atlassian/atlassian-frontend/commits/df1da03ac3d) - define interface for api extension
- [`5a6e9efd99b`](https://bitbucket.org/atlassian/atlassian-frontend/commits/5a6e9efd99b) - ED-12508 implement api stub
- [`5c835144ef0`](https://bitbucket.org/atlassian/atlassian-frontend/commits/5c835144ef0) - [ME-741][me-743] Remove PX references in editor packages and modify code block font size.
- Updated dependencies

---

### @atlaskit/editor-json-transformer@8.5.1

#### Patch Changes

- [`653093877f8`](https://bitbucket.org/atlassian/atlassian-frontend/commits/653093877f8) - Update data-consumer behaviour for json transforming
- Updated dependencies

---

### @atlaskit/editor-shared-styles@1.4.1

#### Patch Changes

- [`5c835144ef0`](https://bitbucket.org/atlassian/atlassian-frontend/commits/5c835144ef0) - [ME-741][me-743] Remove PX references in editor packages and modify code block font size.
- Updated dependencies

---

### @atlaskit/legacy-mobile-macros@0.3.1

#### Patch Changes

- Updated dependencies

---

### @atlaskit/media-ui@15.3.3

#### Patch Changes

- [`78c54a8761f`](https://bitbucket.org/atlassian/atlassian-frontend/commits/78c54a8761f) - Rewording some comments/types/descriptions to remove unnecessarily gendered phrasing
- Updated dependencies

---

### @atlaskit/side-navigation@0.8.4

#### Patch Changes

- [`240c4120435`](https://bitbucket.org/atlassian/atlassian-frontend/commits/240c4120435) - Side navigation now uses the new common utility to calculate scrollbar width for offsetting keylines.
- Updated dependencies

---

### @atlaskit/spinner@15.0.8

#### Patch Changes

- [`7be17d84c4a`](https://bitbucket.org/atlassian/atlassian-frontend/commits/7be17d84c4a) - Fix performance degradation caused by styles being continually re-calculated for the SVG animation. Fix a bug in which the Spinner was set to inline instead of inline-block. This reverts the component's layout behavior to version 12.
- Updated dependencies

---

### @atlaskit/tag-group@10.0.6

#### Patch Changes

- [`30a7d113d24`](https://bitbucket.org/atlassian/atlassian-frontend/commits/30a7d113d24) - Workaround to force a build of tag-group on Confluence

---

### @atlaskit/user-picker@7.9.1

#### Patch Changes

- [`78c54a8761f`](https://bitbucket.org/atlassian/atlassian-frontend/commits/78c54a8761f) - Rewording some comments/types/descriptions to remove unnecessarily gendered phrasing
- Updated dependencies

---

### @atlassian/commerce-billing-details@2.6.2

#### Patch Changes

- Updated dependencies

---

### @atlassian/commerce-billing-history@2.1.5

#### Patch Changes

- Updated dependencies

---

### @atlassian/commerce-credit-card-base@3.4.2

#### Patch Changes

- Updated dependencies

---

### @atlassian/commerce-credit-card-ccp@2.1.4

#### Patch Changes

- Updated dependencies

---

### @atlassian/commerce-credit-card-hams@5.0.6

#### Patch Changes

- Updated dependencies

---

### @atlassian/commerce-layout@1.1.7

#### Patch Changes

- Updated dependencies

---

### @atlassian/commerce-payment-flow@5.4.5

#### Patch Changes

- Updated dependencies

---

### @atlassian/commerce-payment-methods@1.8.3

#### Patch Changes

- Updated dependencies

---

### @atlassian/commerce-ui@2.2.23

#### Patch Changes

- Updated dependencies

---

### @atlassian/editor-referentiality@1.0.1

#### Patch Changes

- [`bd792d92a43`](https://bitbucket.org/atlassian/atlassian-frontend/commits/bd792d92a43) - ED-12473: referentiality example page
- Updated dependencies

---

### @atlassian/forge-ui@19.14.1

#### Patch Changes

- [`c17fe6144f8`](https://bitbucket.org/atlassian/atlassian-frontend/commits/c17fe6144f8) - Upgrade to the latest version of `@atlaskit/tabs`
- Updated dependencies

---

### @atlassian/forge-ui-core@4.6.2

#### Patch Changes

- [`14050fe1345`](https://bitbucket.org/atlassian/atlassian-frontend/commits/14050fe1345) - Incorrect use of modal dialog types has been fixed.
- [`c17fe6144f8`](https://bitbucket.org/atlassian/atlassian-frontend/commits/c17fe6144f8) - Upgrade to the latest version of `@atlaskit/tabs`
- Updated dependencies

---

### @atlassian/invite-people@4.0.1

#### Patch Changes

- [`78c54a8761f`](https://bitbucket.org/atlassian/atlassian-frontend/commits/78c54a8761f) - Rewording some comments/types/descriptions to remove unnecessarily gendered phrasing
- Updated dependencies

---

### @atlassian/notification-list@0.0.6

#### Patch Changes

- [`c17fe6144f8`](https://bitbucket.org/atlassian/atlassian-frontend/commits/c17fe6144f8) - Upgrade to the latest version of `@atlaskit/tabs`
- Updated dependencies

---

### @atlassian/pipelines-editor@0.10.24

#### Patch Changes

- Updated dependencies

---

### @atlassian/pipelines-runners-management@0.4.2

#### Patch Changes

- Updated dependencies

---

### @atlassian/product-search-dialog@7.16.5

#### Patch Changes

- [`c17fe6144f8`](https://bitbucket.org/atlassian/atlassian-frontend/commits/c17fe6144f8) - Upgrade to the latest version of `@atlaskit/tabs`
- Updated dependencies

---

### @atlassian/search-dialog@7.4.3

#### Patch Changes

- [`13157ec1638`](https://bitbucket.org/atlassian/atlassian-frontend/commits/13157ec1638) - Small changeset to trigger a build
- Updated dependencies

---

### @atlassian/xen-editor-provider@12.0.7

#### Patch Changes

- [`5a6e9efd99b`](https://bitbucket.org/atlassian/atlassian-frontend/commits/5a6e9efd99b) - ED-12508 implement api stub
- Updated dependencies
