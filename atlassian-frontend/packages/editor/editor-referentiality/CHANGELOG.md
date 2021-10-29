# @atlassian/editor-referentiality

## 1.5.0

### Minor Changes

- [`5bbb5d97888`](https://bitbucket.org/atlassian/atlassian-frontend/commits/5bbb5d97888) - CONFDEV-76900 - Added support of referentiality in renderer

## 1.4.1

### Patch Changes

- Updated dependencies

## 1.4.0

### Minor Changes

- [`b95863772be`](https://bitbucket.org/atlassian/atlassian-frontend/commits/b95863772be) - Support external observers.
  Use better naming for refNode (refNode => reference).
  In favor of further work (supporting multiple references) pass array of references to Extension component.
  Expand node with localId for extentions.

### Patch Changes

- Updated dependencies

## 1.3.8

### Patch Changes

- [`2aef13b22d8`](https://bitbucket.org/atlassian/atlassian-frontend/commits/2aef13b22d8) - ED-12604: add localId for tables and dataConsumer mark for extensions in full schema
- Updated dependencies

## 1.3.7

### Patch Changes

- [`524b20aff9a`](https://bitbucket.org/atlassian/atlassian-frontend/commits/524b20aff9a) - Update package.jsons to remove unused dependencies. Also excludes tests from some build tsconfigs
- [`3c0349f272a`](https://bitbucket.org/atlassian/atlassian-frontend/commits/3c0349f272a) - Update package.jsons to remove unused dependencies. Also excludes tests from some build tsconfigs
- [`591d34f966f`](https://bitbucket.org/atlassian/atlassian-frontend/commits/591d34f966f) - Update package.jsons to remove unused dependencies. Also excludes tests from some build tsconfigs

## 1.3.6

### Patch Changes

- Updated dependencies

## 1.3.5

### Patch Changes

- Updated dependencies

## 1.3.4

### Patch Changes

- Updated dependencies

## 1.3.3

### Patch Changes

- [`1abec05d9ca`](https://bitbucket.org/atlassian/atlassian-frontend/commits/1abec05d9ca) - [ux] Add internationalisation support to charts

## 1.3.2

### Patch Changes

- Updated dependencies

## 1.3.1

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

- [`ddecaf6f306`](https://bitbucket.org/atlassian/atlassian-frontend/commits/ddecaf6f306) - ED-12436 remove 'allowLocalIdGeneration' from Editor as extension localId is added to full schema
- [`d5c18c0dafe`](https://bitbucket.org/atlassian/atlassian-frontend/commits/d5c18c0dafe) - add vr tests for referentiality
- Updated dependencies

## 1.3.0

### Minor Changes

- [`8a6f8ce0c95`](https://bitbucket.org/atlassian/atlassian-frontend/commits/8a6f8ce0c95) - CEMS-1775: unify charts manifest and make charts private

  This is a breaking change. We previously exported `manifest` (both named and as the default export), but we now only export `buildManifest`, which optionally takes an `EditorActions` and returns the manifest of the extension.

  This is needed so that the extension can provide default values based on the parameters.

  This changset also renames the @atlaskit/charts package to the private @atlassian/charts package.

### Patch Changes

- [`b0f14fe83a5`](https://bitbucket.org/atlassian/atlassian-frontend/commits/b0f14fe83a5) - ED-12715: set initial value for refNode in ExtensionWithDataSource and emit on table deletion
- [`af4bef6f438`](https://bitbucket.org/atlassian/atlassian-frontend/commits/af4bef6f438) - ED-12779: emit for all data sources on initial load
- Updated dependencies

## 1.2.0

### Minor Changes

- [`3defe8bdf01`](https://bitbucket.org/atlassian/atlassian-frontend/commits/3defe8bdf01) - Fix node mutation bug on extension insertion

### Patch Changes

- [`e047cefd6ee`](https://bitbucket.org/atlassian/atlassian-frontend/commits/e047cefd6ee) - ED-11929: handle table node mutation observation
- [`5eab33d9b88`](https://bitbucket.org/atlassian/atlassian-frontend/commits/5eab33d9b88) - ED-12398: referentiality custom fields resolver
- Updated dependencies

## 1.1.1

### Patch Changes

- [`bd792d92a43`](https://bitbucket.org/atlassian/atlassian-frontend/commits/bd792d92a43) - ED-12473: referentiality example page
- Updated dependencies

## 1.1.0

### Minor Changes

- [`f27507bc838`](https://bitbucket.org/atlassian/atlassian-frontend/commits/f27507bc838) - ED-12237: add editor referentiality plugin

### Patch Changes

- [`58b170725be`](https://bitbucket.org/atlassian/atlassian-frontend/commits/58b170725be) - Renamed @atlaskit/editor-test-helpers/schema-builder to @atlaskit/editor-test-helpers/doc-builder
- Updated dependencies
