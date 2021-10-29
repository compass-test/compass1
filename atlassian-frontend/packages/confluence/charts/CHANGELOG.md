# @atlassian/charts

## 12.0.3

### Patch Changes

- [`e0c64b43f46`](https://bitbucket.org/atlassian/atlassian-frontend/commits/e0c64b43f46) - [ux] Add description to aggregate data toggle.

## 12.0.2

### Patch Changes

- [`d5b0ccb34ed`](https://bitbucket.org/atlassian/atlassian-frontend/commits/d5b0ccb34ed) - Fix internal tooling for i18n by moving defineMessages call up.

## 12.0.1

### Patch Changes

- [`8c82ab94023`](https://bitbucket.org/atlassian/atlassian-frontend/commits/8c82ab94023) - [ux] Fix crash when rendering axis without name and remove error message when charting non-numeric values.

## 12.0.0

### Patch Changes

- [`5bbb5d97888`](https://bitbucket.org/atlassian/atlassian-frontend/commits/5bbb5d97888) - CONFDEV-76900 - Added support of referentiality in renderer
- Updated dependencies

## 11.0.0

### Major Changes

- [`519376994af`](https://bitbucket.org/atlassian/atlassian-frontend/commits/519376994af) - [ux] Display an error when charting non-numeric data. Also support datasets with missing values.

## 10.2.0

### Minor Changes

- [`4ce309318e2`](https://bitbucket.org/atlassian/atlassian-frontend/commits/4ce309318e2) - [ux] Show the pie chart % on the slice when showing an unattached legend.

## 10.1.0

### Minor Changes

- [`5c19a7d4e5f`](https://bitbucket.org/atlassian/atlassian-frontend/commits/5c19a7d4e5f) - Support merged cells, refactor some internal methods.

## 10.0.0

### Major Changes

- [`48dab771065`](https://bitbucket.org/atlassian/atlassian-frontend/commits/48dab771065) - [ux] Updates colors, pie chart outline and default placement of legends.

## 9.2.0

### Minor Changes

- [`bdce5196372`](https://bitbucket.org/atlassian/atlassian-frontend/commits/bdce5196372) - [ux] Adds a chart height combobox.

## 9.1.0

### Minor Changes

- [`f77442ff0f8`](https://bitbucket.org/atlassian/atlassian-frontend/commits/f77442ff0f8) - [ux] Adds (approximate) truncation of long series labels

## 9.0.3

### Patch Changes

- [`53a64917ec0`](https://bitbucket.org/atlassian/atlassian-frontend/commits/53a64917ec0) - Fix parsing of macro parameters (always string) so that height works right with renderer

## 9.0.2

### Patch Changes

- [`0edff40bcc1`](https://bitbucket.org/atlassian/atlassian-frontend/commits/0edff40bcc1) - Updated fix for 9.0.1

## 9.0.1

### Patch Changes

- [`37dfe4b6072`](https://bitbucket.org/atlassian/atlassian-frontend/commits/37dfe4b6072) - Support "reference" for current editor-core version and "references" for next editor-core version when rendering extension

## 9.0.0

### Major Changes

- [`1c212569e3a`](https://bitbucket.org/atlassian/atlassian-frontend/commits/1c212569e3a) - [ux] refactor charts to use indexes + add left and right to legends

## 8.0.0

### Patch Changes

- Updated dependencies

## 7.0.1

### Patch Changes

- [`ec3abb0e276`](https://bitbucket.org/atlassian/atlassian-frontend/commits/ec3abb0e276) - CEMS-2113: allow opening the config panel for tables with empty header cells

## 7.0.0

### Patch Changes

- [`b95863772be`](https://bitbucket.org/atlassian/atlassian-frontend/commits/b95863772be) - Support external observers.
  Use better naming for refNode (refNode => reference).
  In favor of further work (supporting multiple references) pass array of references to Extension component.
  Expand node with localId for extentions.
- Updated dependencies

## 6.0.0

### Patch Changes

- [`2aef13b22d8`](https://bitbucket.org/atlassian/atlassian-frontend/commits/2aef13b22d8) - ED-12604: add localId for tables and dataConsumer mark for extensions in full schema
- Updated dependencies

## 5.0.0

### Minor Changes

- [`adccfcdafd8`](https://bitbucket.org/atlassian/atlassian-frontend/commits/adccfcdafd8) - [ux] ED-13043 Add experimental `__hideFrame` option in extension manifest for extension nodes. This removes the border in edit mode to bring it closer to WYSIWYG. This cannot be opted into for the 'mobile' appearance & frames will continue to always show.

### Patch Changes

- Updated dependencies

## 4.0.11

### Patch Changes

- [`1682f043fa6`](https://bitbucket.org/atlassian/atlassian-frontend/commits/1682f043fa6) - NO ISSUE extracted default chart consts to a separate file to avoid circular dependencies

## 4.0.10

### Patch Changes

- [`363d7a05bad`](https://bitbucket.org/atlassian/atlassian-frontend/commits/363d7a05bad) - Fixing color series names to suit confluence renderer.

## 4.0.9

### Patch Changes

- [`9e069c7c6e8`](https://bitbucket.org/atlassian/atlassian-frontend/commits/9e069c7c6e8) - [ux] Adding fix for legends to show correct color selection.

## 4.0.8

### Patch Changes

- [`f6a7e70d460`](https://bitbucket.org/atlassian/atlassian-frontend/commits/f6a7e70d460) - [ux] Adding ability to select data series for a Pie Chart

## 4.0.7

### Patch Changes

- [`e446162d5b1`](https://bitbucket.org/atlassian/atlassian-frontend/commits/e446162d5b1) - [ux] Adding color picker to charts config.

## 4.0.6

### Patch Changes

- [`e59c75523ef`](https://bitbucket.org/atlassian/atlassian-frontend/commits/e59c75523ef) - [ux] Adding data aggregation support and updating config panel changes.
- Updated dependencies

## 4.0.5

### Patch Changes

- [`0ff4bec334e`](https://bitbucket.org/atlassian/atlassian-frontend/commits/0ff4bec334e) - Make editor dependencies peer dependencies, and reduce their version string. Also remove code as a dependency since it never was (it's a devDep).

## 4.0.4

### Patch Changes

- [`5be89c814ad`](https://bitbucket.org/atlassian/atlassian-frontend/commits/5be89c814ad) - [ux] CEMS-1970: pie label and legend fixes + adding chart now displays "Chart" in the frame title.

## 4.0.3

### Patch Changes

- Updated dependencies

## 4.0.2

### Patch Changes

- [`49d41f6e550`](https://bitbucket.org/atlassian/atlassian-frontend/commits/49d41f6e550) - Fixing minor bugs.

## 4.0.1

### Patch Changes

- [`419efadcb4f`](https://bitbucket.org/atlassian/atlassian-frontend/commits/419efadcb4f) - ED-11952 Updated extension example format
- Updated dependencies

## 4.0.0

### Major Changes

- [`d0884919836`](https://bitbucket.org/atlassian/atlassian-frontend/commits/d0884919836) - [ux] Adds borders to bars and markers, fixes spacing and initial legend for pie chart

## 3.0.0

### Major Changes

- [`a58781ef47e`](https://bitbucket.org/atlassian/atlassian-frontend/commits/a58781ef47e) - [ux] Update color scheme, update typography and correctly center axes labels.

## 2.0.2

### Patch Changes

- [`dd211562082`](https://bitbucket.org/atlassian/atlassian-frontend/commits/dd211562082) - [ux] Remove jump to source button

## 2.0.1

### Patch Changes

- [`fea3eb3f273`](https://bitbucket.org/atlassian/atlassian-frontend/commits/fea3eb3f273) - [ux] Provide an warning message when no data is provided.

## 2.0.0

### Major Changes

- [`1abec05d9ca`](https://bitbucket.org/atlassian/atlassian-frontend/commits/1abec05d9ca) - [ux] Add internationalisation support to charts

## 1.0.2

### Patch Changes

- Updated dependencies

## 1.0.1

### Patch Changes

- [`566f674ac8f`](https://bitbucket.org/atlassian/atlassian-frontend/commits/566f674ac8f) - _Removes_ `allowReferentiality` & `UNSAFE_allowDataConsumer` props from editor props.
  These can now be toggled via the feature flags prop, e.g.

  ```tsx
  <Editor
    featureFlags={{
      'allow-local-id-generation-on-tables': true,
      'allow-data-consumer': true,
    }}
  />
  ```

- [`d41e8308e22`](https://bitbucket.org/atlassian/atlassian-frontend/commits/d41e8308e22) - [ux] Charts now support both horizontal and vertical orientations.
- [`9ba1f5a83bf`](https://bitbucket.org/atlassian/atlassian-frontend/commits/9ba1f5a83bf) - [ux] Legends were showing X-axis in legend. Also update defaults for chart.
- [`2e51fbd1db2`](https://bitbucket.org/atlassian/atlassian-frontend/commits/2e51fbd1db2) - [ux] ED-12733 Remove option to clear config panel select fields if there is a default value set.
- [`39f8b5777d0`](https://bitbucket.org/atlassian/atlassian-frontend/commits/39f8b5777d0) - [ux] Fix pie chart graphing
- Updated dependencies

## 1.0.0

### Major Changes

- [`8a6f8ce0c95`](https://bitbucket.org/atlassian/atlassian-frontend/commits/8a6f8ce0c95) - CEMS-1775: unify charts manifest and make charts private

  This is a breaking change. We previously exported `manifest` (both named and as the default export), but we now only export `buildManifest`, which optionally takes an `EditorActions` and returns the manifest of the extension.

  This is needed so that the extension can provide default values based on the parameters.

  This changset also renames the @atlaskit/charts package to the private @atlassian/charts package.

### Patch Changes

- [`ca56f53e6d0`](https://bitbucket.org/atlassian/atlassian-frontend/commits/ca56f53e6d0) - [ux] CEMS-1531: Add support for smoothing lines
- [`1d1873be3be`](https://bitbucket.org/atlassian/atlassian-frontend/commits/1d1873be3be) - [ux] Update margins and add Y-axis label support
- [`667be4983b4`](https://bitbucket.org/atlassian/atlassian-frontend/commits/667be4983b4) - [ux] Updating Chart Icons in Charts Package
- Updated dependencies

## 0.0.9

### Patch Changes

- [`0d3249e4eb4`](https://bitbucket.org/atlassian/atlassian-frontend/commits/0d3249e4eb4) - [ux] Adding new chart icons.
- [`5eab33d9b88`](https://bitbucket.org/atlassian/atlassian-frontend/commits/5eab33d9b88) - ED-12398: referentiality custom fields resolver
- [`47acef70b7f`](https://bitbucket.org/atlassian/atlassian-frontend/commits/47acef70b7f) - [ux] Ui changes to include Adding chart from the toolbar button and moving the edit button location on chart extension, Adding chart options and edit source to the Charts extension toolbar and Making bar chart as the default chart option.
- Updated dependencies

## 0.0.8

### Patch Changes

- [`c84c382f338`](https://bitbucket.org/atlassian/atlassian-frontend/commits/c84c382f338) - [ux] Adding the ability to show Data Points on a Line chart

## 0.0.7

### Patch Changes

- [`ced7ff42642`](https://bitbucket.org/atlassian/atlassian-frontend/commits/ced7ff42642) - [ux] Add repositionable legends

## 0.0.6

### Patch Changes

- [`5c79fa0767b`](https://bitbucket.org/atlassian/atlassian-frontend/commits/5c79fa0767b) - [ux] CEMS-1676: improve support for chart legends

## 0.0.5

### Patch Changes

- [`c59fe03fddb`](https://bitbucket.org/atlassian/atlassian-frontend/commits/c59fe03fddb) - Remove editor-core as dependency (is already a devDependency)

## 0.0.4

### Patch Changes

- [`043b95951cd`](https://bitbucket.org/atlassian/atlassian-frontend/commits/043b95951cd) - [ux] Adding Pie and Bar charts to the charts Package

## 0.0.3

### Patch Changes

- [`007103b93e6`](https://bitbucket.org/atlassian/atlassian-frontend/commits/007103b93e6) - [ux] ED-11993 Change behaviour of context panel so it will not push content if there is enough space to slide out without overlapping.
  Config panel will keep existing behaviour to push content if there isn't enough space to show without overlapping content. Also add width css transition to context panel content to mimic "slide in" animation.

  Add new shared const of `akEditorFullWidthLayoutLineLength` which indicates the line length of a full-width editor

- Updated dependencies

## 0.0.2

### Patch Changes

- [`a1b64d65f86`](https://bitbucket.org/atlassian/atlassian-frontend/commits/a1b64d65f86) - Hookup a configuration panel to the example

## 0.0.1

### Patch Changes

- [`1548e47a94d`](https://bitbucket.org/atlassian/atlassian-frontend/commits/1548e47a94d) - Add chart package
