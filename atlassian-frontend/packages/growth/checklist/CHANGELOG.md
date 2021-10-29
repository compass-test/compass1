# @atlassiansox/checklist

## 5.2.0

### Minor Changes

- [`cede87a7692`](https://bitbucket.org/atlassian/atlassian-frontend/commits/cede87a7692) - [ux] Adds option to the Checklist button component to add a dismiss button and fixes tree-shaking for the package.

## 5.1.1

### Patch Changes

- Updated dependencies

## 5.1.0

### Minor Changes

- [`ded13ab433a`](https://bitbucket.org/atlassian/atlassian-frontend/commits/ded13ab433a) - fix video z-indexing issue for safari

## 5.0.1

### Patch Changes

- Updated dependencies

## 5.0.0

### Major Changes

- [`a3a16e149ed`](https://bitbucket.org/atlassian/atlassian-frontend/commits/a3a16e149ed) - [ux] Custom header support plus dismiss link converted to button and body ui items padding and progress bar location changes

## 4.7.0

### Minor Changes

- [`8c766f57a9a`](https://bitbucket.org/atlassian/atlassian-frontend/commits/8c766f57a9a) - Adds data-testid to simplify selecting elements for integration/e2e tests

## 4.6.0

### Minor Changes

- [`a00b9226d23`](https://bitbucket.org/atlassian/atlassian-frontend/commits/a00b9226d23) - Changed top trigger icon from "close" to "minimised"

## 4.5.0

### Minor Changes

- [`524cc0c718`](https://bitbucket.org/atlassian/atlassian-frontend/commits/524cc0c718) - [ux] Adds an optional prop to checklist which allows user to render whatever component they create right after the ChecklistItems

## 4.4.0

### Minor Changes

- [`1a14a627bf`](https://bitbucket.org/atlassian/atlassian-frontend/commits/1a14a627bf) - [ux] Ignore child portal click events in checklist accordion

## 4.3.0

### Minor Changes

- [`553484cfaa`](https://bitbucket.org/atlassian/atlassian-frontend/commits/553484cfaa) - improved AccordionItemButton styling for disabled state

## 4.2.3

### Patch Changes

- [`d3265f19be`](https://bitbucket.org/atlassian/atlassian-frontend/commits/d3265f19be) - Transpile packages using babel rather than tsc

## 4.2.2

### Patch Changes

- [`5f58283e1f`](https://bitbucket.org/atlassian/atlassian-frontend/commits/5f58283e1f) - Export types using Typescript's new "export type" syntax to satisfy Typescript's --isolatedModules compiler option.
  This requires version 3.8 of Typescript, read more about how we handle Typescript versions here: https://atlaskit.atlassian.com/get-started
  Also add `typescript` to `devDependencies` to denote version that the package was built with.

## 4.2.1

### Patch Changes

- Updated dependencies

## 4.2.0

### Minor Changes

- [`69deafafe0`](https://bitbucket.org/atlassian/atlassian-frontend/commits/69deafafe0) - Add a prop to override the component that wraps the checklist footer.

## 4.1.1

### Patch Changes

- Updated dependencies

## 4.1.0

### Minor Changes

- [`9e04f12359`](https://bitbucket.org/atlassian/atlassian-frontend/commits/9e04f12359) - Add the maxHeight prop

## 4.0.2

### Patch Changes

- [`6c525a8229`](https://bitbucket.org/atlassian/atlassian-frontend/commits/6c525a8229) - Upgraded to TypeScript 3.9.6 and tslib to 2.0.0

  Since tslib is a dependency for all our packages we recommend that products also follow this tslib upgrade
  to prevent duplicates of tslib being bundled.

## 4.0.1

### Patch Changes

- [`5d17455a86`](https://bitbucket.org/atlassian/atlassian-frontend/commits/5d17455a86) - fix checklist accordion arrow direction

## 4.0.0

### Major Changes

- [`87f4720f27`](https://bitbucket.org/atlassian/atlassian-frontend/commits/87f4720f27) - Officially dropping IE11 support, from this version onwards there are no warranties of the package working in IE11.
  For more information see: https://community.developer.atlassian.com/t/atlaskit-to-drop-support-for-internet-explorer-11-from-1st-july-2020/39534

### Patch Changes

- Updated dependencies

## 3.0.0

### Major Changes

- [`8ce05e46d4`](https://bitbucket.org/atlassian/atlassian-frontend/commits/8ce05e46d4) - Migrate checklist component from growth-kit to atlassian-frontend
