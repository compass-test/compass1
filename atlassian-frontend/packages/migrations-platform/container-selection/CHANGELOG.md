# @af/mpt-container-selection

## 2.1.2

### Patch Changes

- Updated dependencies

## 2.1.1

### Patch Changes

- [`4218a1bf652`](https://bitbucket.org/atlassian/atlassian-frontend/commits/4218a1bf652) - Fixing the event types for MPT events
- Updated dependencies

## 2.1.0

### Minor Changes

- [`1540f05317b`](https://bitbucket.org/atlassian/atlassian-frontend/commits/1540f05317b) - Refactor analytics

### Patch Changes

- Updated dependencies

## 2.0.4

### Patch Changes

- Updated dependencies

## 2.0.3

### Patch Changes

- Updated dependencies

## 2.0.2

### Patch Changes

- Updated dependencies

## 2.0.1

### Patch Changes

- Updated dependencies

## 2.0.0

### Major Changes

- [`5e8aefcb8fb`](https://bitbucket.org/atlassian/atlassian-frontend/commits/5e8aefcb8fb) - Fix a bug where the PlanSelectionTable does not update when the selectedItems property changes.

  To facilitate this change, the selectedItems property is renamed to selectedPlans and a new setSelectedPlans property (the corresponding updater function for selectedPlans) is added to the component.

## 1.1.1

### Patch Changes

- Updated dependencies

## 1.1.0

### Minor Changes

- [`0a842d2c55c`](https://bitbucket.org/atlassian/atlassian-frontend/commits/0a842d2c55c) - Convert plan name in plan selection table to a link

## 1.0.0

### Major Changes

- [`08980119265`](https://bitbucket.org/atlassian/atlassian-frontend/commits/08980119265) - Added container selection table for plans

## 0.0.3

### Patch Changes

- [`d3265f19be`](https://bitbucket.org/atlassian/atlassian-frontend/commits/d3265f19be) - Transpile packages using babel rather than tsc

## 0.0.2

### Patch Changes

- [`5f58283e1f`](https://bitbucket.org/atlassian/atlassian-frontend/commits/5f58283e1f) - Export types using Typescript's new "export type" syntax to satisfy Typescript's --isolatedModules compiler option.
  This requires version 3.8 of Typescript, read more about how we handle Typescript versions here: https://atlaskit.atlassian.com/get-started
  Also add `typescript` to `devDependencies` to denote version that the package was built with.

## 0.0.1

### Patch Changes

- [`b443b5a60f`](https://bitbucket.org/atlassian/atlassian-frontend/commits/b443b5a60f) - Renamed template package
