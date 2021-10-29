# @atlassian/exposure-events-compressor

## 11.0.0

### Patch Changes

- Updated dependencies

## 10.0.0

### Patch Changes

- Updated dependencies

## 9.0.0

### Patch Changes

- Updated dependencies

## 8.0.0

### Patch Changes

- Updated dependencies

## 7.0.0

### Patch Changes

- Updated dependencies

## 6.0.0

### Patch Changes

- Updated dependencies

## 5.0.0

### Patch Changes

- Updated dependencies

## 4.0.0

### Patch Changes

- Updated dependencies

## 3.0.0

### Major Changes

- [`2e3ef7bbcc0`](https://bitbucket.org/atlassian/atlassian-frontend/commits/2e3ef7bbcc0) - Upgrade @atlassiansox/analytics-web-client peer dependency to ^2.1.6 and import via main entry point instead of with-deps where applicable.

### Patch Changes

- Updated dependencies

## 2.0.0

### Major Changes

- [`6a0fdb6362`](https://bitbucket.org/atlassian/atlassian-frontend/commits/6a0fdb6362) - Removed the explicit dependency on @atlassiansox/analytics-web-client. As a result, the default exported 'buildCompressorForBatchSize' function has also been removed. Callers will now need to construct their own instances of CompressionRule using the exported 'canCompress' and 'buildCompressionFunction' methods.

## 1.0.0

### Major Changes

- [`3d6406f68d`](https://bitbucket.org/atlassian/atlassian-frontend/commits/3d6406f68d) - No significant changes. This is a re-release of the previous artefact for the first major release of this package.

## 0.0.2

### Patch Changes

- [`5e36c2221c`](https://bitbucket.org/atlassian/atlassian-frontend/commits/5e36c2221c) - Created this package and added the first compressor and criteria for compressing feature exposed events. For more context, refer to this confluence page: https://hello.atlassian.net/wiki/spaces/MEASURE/pages/938861811/TAC+-+Jira+FE+-+Compressed+Exposure+Events
- [`4a69d128e4`](https://bitbucket.org/atlassian/atlassian-frontend/commits/4a69d128e4) - Update analytics-web-client dependency to version 1.14.0

## 0.0.2

### Patch Changes

- [`5f58283e1f`](https://bitbucket.org/atlassian/atlassian-frontend/commits/5f58283e1f) - Export types using Typescript's new "export type" syntax to satisfy Typescript's --isolatedModules compiler option.
  This requires version 3.8 of Typescript, read more about how we handle Typescript versions here: https://atlaskit.atlassian.com/get-started
  Also add `typescript` to `devDependencies` to denote version that the package was built with.

## 0.0.1

### Patch Changes

- [`b443b5a60f`](https://bitbucket.org/atlassian/atlassian-frontend/commits/b443b5a60f) - Renamed template package
