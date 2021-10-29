# @af/smart-select

## 0.3.0

### Minor Changes

- [`1a0fab75d4d`](https://bitbucket.org/atlassian/atlassian-frontend/commits/1a0fab75d4d) - Support grouped labels Select component

## 0.2.0

### Minor Changes

- [`72b99167d59`](https://bitbucket.org/atlassian/atlassian-frontend/commits/72b99167d59) - - Fix analytics firing too repetitively
  - reset session on every click to simulate Jira's select
  - fire option changed event on label create
  - fix bug where FRS was not being called when options prop changes
  - add loading prop so that the field shows a loading circle when fetching results from FRS
  - add debounce with a default time of 150ms
  - hash selectedOptionIds if shouldHash is set to true

## 0.1.0

### Minor Changes

- [`1dfc276fa55`](https://bitbucket.org/atlassian/atlassian-frontend/commits/1dfc276fa55) - Expose InputActionMeta in atlaskit/select. Convert withSmarts from class to function component. Fix analytics.

### Patch Changes

- Updated dependencies

## 0.0.8

### Patch Changes

- Updated dependencies

## 0.0.7

### Patch Changes

- [`0a76c05d7c2`](https://bitbucket.org/atlassian/atlassian-frontend/commits/0a76c05d7c2) - Remove unnecessary dependencies

## 0.0.6

### Patch Changes

- [`f5b12572af4`](https://bitbucket.org/atlassian/atlassian-frontend/commits/f5b12572af4) - Validate actionMeta exists. Even though it is required here, In jira which uses flow, some tests do not pass it in. We'll make the hoc safe to reduce friction of adoption.

## 0.0.5

### Patch Changes

- [`adc940bf575`](https://bitbucket.org/atlassian/atlassian-frontend/commits/adc940bf575) - Add tests for GroupedOptionsType

## 0.0.4

### Patch Changes

- [`1f493e1dc65`](https://bitbucket.org/atlassian/atlassian-frontend/commits/1f493e1dc65) - Bump `react-select` to v4.
- Updated dependencies

## 0.0.3

### Patch Changes

- [`66a6d5611a7`](https://bitbucket.org/atlassian/atlassian-frontend/commits/66a6d5611a7) - Rerank on options update

## 0.0.2

### Patch Changes

- [`08af4eb0d17`](https://bitbucket.org/atlassian/atlassian-frontend/commits/08af4eb0d17) - Upgrade @atlassiansox/analytics-web-client dependency to ^2.1.6 and import via main entry point instead of with-deps where applicable.

## 0.0.1

### Patch Changes

- [`a717280cd79`](https://bitbucket.org/atlassian/atlassian-frontend/commits/a717280cd79) - Smart Field Picker - smart-select HOC for ranking and smart analytics around any select

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
