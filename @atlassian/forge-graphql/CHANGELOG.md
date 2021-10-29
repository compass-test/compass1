# @atlassian/forge-graphql

## 3.0.4

### Patch Changes

- dfffe46: Remove forge-gql

## 3.0.3

### Patch Changes

- de0c6f5: Return QueryErrors in query requests

## 3.0.2

### Patch Changes

- 2a2ca77: Change the registry to publish to

## 3.0.1

### Patch Changes

- 84c7f57: Adds OSS docs

## 3.0.0

### Major Changes

- 9b9ca12: Change the name of the package to forge-graphql

## 2.0.3

### Patch Changes

- 3d9aec6: Update error shape

## 2.0.2

### Patch Changes

- e1e0da9: Remove fields from component input if not specified

## 2.0.1

### Patch Changes

- a57978e: Adds logging on AGG requests

## 2.0.0

### Major Changes

- f99107c: User facing changes:
  Removed duplicate CompassComponent type from compound types

  Added id, name, description, and fields to the getcomponent payload

  flattened input to create, update, and sync component inputs
  Made update input that not include fields like type that should not be updated
  Same with sync

  Added new input type for link

  Added id to the output for Component types

  Made the enum types take an array like the API does
  this means that tier now needs to be passed in as a single number in an array
  Added special handling for the tier to only take the first value from tier

  Changed the return for getByExternalAlias so that syncByExternalAlias will still work with the new types
  now returns a component not found error rather than relying on extensions which are not a part of the SDK return type

  Non user facing:
  Added versions of the testing contantants the have the ids for fields to match the return of the functions which now have ids.

## 1.2.5

### Patch Changes

- 1218742: Namespace compass requests

## 1.2.4

### Patch Changes

- b5e3bbe: Remove externalAlias in updateComponent requests

## 1.2.3

### Patch Changes

- e937de2: Updates the shape of args/payloads for api methods

## 1.2.2

### Patch Changes

- 0cc8710: Remove occurrences of eventSources in getComponent queries

## 1.2.1

### Patch Changes

- 795219a: Remove calls to events api from createComponent and updateComponent

## 1.2.0

### Minor Changes

- d41c8aa: Added unlinkExternalSource request

## 1.1.8

### Patch Changes

- 43887ad: Regenerate graphql types

## 1.1.7

### Patch Changes

- 530d4fd: Update GQL externalAlias variable name in updateExternalAliasSegment

## 1.1.6

### Patch Changes

- 72a332d: Add createDeploymentEvent request

## 1.1.5

### Patch Changes

- b8e7f47: updateComponent updates external alias and handles undefined fields

## 1.1.4

### Patch Changes

- c8e7bcd: Updated build script for pipelines bot creds
- Updated dependencies [c8e7bcd]
  - @atlassian/forge-gql@1.1.1

## 1.1.3

### Patch Changes

- bc4fe1c: Update readme to display proper package name

## 1.1.2

### Patch Changes

- 472ec5c: Update README for internal developer use

## 1.1.1

### Patch Changes

- 0ae4787: Don't update data manager or event sources if they are not defined in input of updateComponent request

## 1.1.0

### Minor Changes

- 8a3fcd4: Resolves files listing for publication

### Patch Changes

- Updated dependencies [8a3fcd4]
  - @atlassian/forge-gql@1.1.0

## 1.0.3

### Patch Changes

- 5b2b05c: Added tests for compound functions

## 1.0.2

### Patch Changes

- b7fa23a: Testing changeset apply

## 1.0.1

### Patch Changes

- 27d08da: Initial changeset release
- Updated dependencies [27d08da]
  - @atlassian/forge-gql@1.0.1
