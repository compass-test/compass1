# @atlassian/techstack-visualisation

## 0.4.14

### Patch Changes

- Updated dependencies

## 0.4.13

### Patch Changes

- Updated dependencies

## 0.4.12

### Patch Changes

- Updated dependencies

## 0.4.11

### Patch Changes

- Updated dependencies

## 0.4.10

### Patch Changes

- Updated dependencies

## 0.4.9

### Patch Changes

- Updated dependencies

## 0.4.8

### Patch Changes

- Updated dependencies

## 0.4.7

### Patch Changes

- Updated dependencies

## 0.4.6

### Patch Changes

- Updated dependencies

## 0.4.5

### Patch Changes

- Updated dependencies

## 0.4.4

### Patch Changes

- [`6c525a8229`](https://bitbucket.org/atlassian/atlassian-frontend/commits/6c525a8229) - Upgraded to TypeScript 3.9.6 and tslib to 2.0.0

  Since tslib is a dependency for all our packages we recommend that products also follow this tslib upgrade
  to prevent duplicates of tslib being bundled.

## 0.4.3

### Patch Changes

- Updated dependencies

## 0.4.2

### Patch Changes

- Updated dependencies

## 0.4.1

### Patch Changes

- [`0c532edf6e`](https://bitbucket.org/atlassian/atlassian-frontend/commits/0c532edf6e) - Use the 'lodash' package instead of single-function 'lodash.\*' packages

## 0.4.0

### Minor Changes

- [`87f4720f27`](https://bitbucket.org/atlassian/atlassian-frontend/commits/87f4720f27) - Officially dropping IE11 support, from this version onwards there are no warranties of the package working in IE11.
  For more information see: https://community.developer.atlassian.com/t/atlaskit-to-drop-support-for-internet-explorer-11-from-1st-july-2020/39534

### Patch Changes

- Updated dependencies

## 0.3.18

### Patch Changes

- Updated dependencies

## 0.3.17

### Patch Changes

- Updated dependencies

## 0.3.16

### Patch Changes

- Updated dependencies

## 0.3.15

### Patch Changes

- [`cc14956821`](https://bitbucket.org/atlassian/atlassian-frontend/commits/cc14956821) - Update all the theme imports to a path thats tree shakable

## 0.3.14

### Patch Changes

- [`baaad91b65`](https://bitbucket.org/atlassian/atlassian-frontend/commits/baaad91b65) - Updated to use the latest and more performant version of `@atlaskit/avatar`
- Updated dependencies

## 0.3.13

### Patch Changes

- [`a9a49fa33c`](https://bitbucket.org/atlassian/atlassian-frontend/commits/a9a49fa33c) - Fix column width when description is long

## 0.3.12

### Patch Changes

- Updated dependencies

## 0.3.11

### Patch Changes

- Updated dependencies

## 0.3.10

### Patch Changes

- Updated dependencies

## 0.3.9

### Patch Changes

- [`b0dcaf5a9d`](https://bitbucket.org/atlassian/atlassian-frontend/commits/b0dcaf5a9d) - Bump react-sweet-state to 2.1.1- Updated dependencies

## 0.3.8

### Patch Changes

- [patch][f45c19a96e](https://bitbucket.org/atlassian/atlassian-frontend/commits/f45c19a96e):

  Remove unused dependencies- Updated dependencies [f45c19a96e](https://bitbucket.org/atlassian/atlassian-frontend/commits/f45c19a96e):

  - @atlaskit/router@0.8.2

## 0.3.7

### Patch Changes

- [patch][0027675f1d](https://bitbucket.org/atlassian/atlassian-frontend/commits/0027675f1d):

  remove navigation from routes- Updated dependencies [f5b654c328](https://bitbucket.org/atlassian/atlassian-frontend/commits/f5b654c328):

- Updated dependencies [0c270847cb](https://bitbucket.org/atlassian/atlassian-frontend/commits/0c270847cb):
- Updated dependencies [85828e8502](https://bitbucket.org/atlassian/atlassian-frontend/commits/85828e8502):
- Updated dependencies [109004a98e](https://bitbucket.org/atlassian/atlassian-frontend/commits/109004a98e):
- Updated dependencies [0d76bd9e0a](https://bitbucket.org/atlassian/atlassian-frontend/commits/0d76bd9e0a):
- Updated dependencies [b9903e773a](https://bitbucket.org/atlassian/atlassian-frontend/commits/b9903e773a):
- Updated dependencies [719ba9d15d](https://bitbucket.org/atlassian/atlassian-frontend/commits/719ba9d15d):
- Updated dependencies [178f142697](https://bitbucket.org/atlassian/atlassian-frontend/commits/178f142697):
- Updated dependencies [89bf723567](https://bitbucket.org/atlassian/atlassian-frontend/commits/89bf723567):
  - @atlaskit/modal-dialog@10.5.6
  - @atlaskit/theme@9.5.3
  - @atlaskit/router@0.8.0
  - @atlaskit/button@13.3.10
  - @atlaskit/dynamic-table@13.7.3
  - @atlaskit/popup@0.3.4

## 0.3.6

### Patch Changes

- [patch][45b3b28e26](https://bitbucket.org/atlassian/atlassian-frontend/commits/45b3b28e26):

  Fix techstack website to take into account solution as strings

## 0.3.5

### Patch Changes

- Updated dependencies [4d3749c9e6](https://bitbucket.org/atlassian/atlassian-frontend/commits/4d3749c9e6):
- Updated dependencies [6e2dda87f4](https://bitbucket.org/atlassian/atlassian-frontend/commits/6e2dda87f4):
- Updated dependencies [907c9973d7](https://bitbucket.org/atlassian/atlassian-frontend/commits/907c9973d7):
  - @atlaskit/modal-dialog@10.5.5
  - @atlaskit/atlassian-navigation@0.10.0
  - @atlaskit/router@0.7.3

## 0.3.4

### Patch Changes

- [patch][a261bdd93b](https://bitbucket.org/atlassian/atlassian-frontend/commits/a261bdd93b):

  # What have been improved?

  - The `react` and `react-dom` modules were pulled as direct dependencies and it was not needed, only referencing it as `peerDepencies` it is fine in the mono-repository.

  - The `lodash` module is not needed to be pulled in as the package only used `lodash.merge` and `lodash.max`.

## 0.3.3

### Patch Changes

- [patch][bcd2fe4273](https://bitbucket.org/atlassian/atlassian-frontend/commits/bcd2fe4273):

  Support old techstackrc format

## 0.3.2

### Patch Changes

- [patch][40aff4c31e](https://bitbucket.org/atlassian/atlassian-frontend/commits/40aff4c31e):

  Add example for status lozenge

## 0.3.1

### Patch Changes

- [patch][831972f80f](https://bitbucket.org/atlassian/atlassian-frontend/commits/831972f80f):

  bump react-sweet-state to 2.0.2- Updated dependencies [831972f80f](https://bitbucket.org/atlassian/atlassian-frontend/commits/831972f80f):

  - @atlaskit/router@0.7.1

## 0.3.0

### Minor Changes

- [minor][15237ae087](https://bitbucket.org/atlassian/atlassian-frontend/commits/15237ae087):

  Add unstable_batched updates fix to router and bump react-sweet-state to the latest version

### Patch Changes

- Updated dependencies [15237ae087](https://bitbucket.org/atlassian/atlassian-frontend/commits/15237ae087):
  - @atlaskit/router@0.7.0

## 0.2.1

### Patch Changes

- [patch][6548261c9a](https://bitbucket.org/atlassian/atlassian-frontend/commits/6548261c9a):

  Remove namespace imports from React, ReactDom, and PropTypes- Updated dependencies [6548261c9a](https://bitbucket.org/atlassian/atlassian-frontend/commits/6548261c9a):

  - @atlaskit/avatar@17.1.7
  - @atlaskit/button@13.3.7
  - @atlaskit/dynamic-table@13.6.2
  - @atlaskit/icon@20.0.1
  - @atlaskit/inline-dialog@12.1.9
  - @atlaskit/logo@12.3.2
  - @atlaskit/lozenge@9.1.4
  - @atlaskit/modal-dialog@10.5.2
  - @atlaskit/popup@0.3.2
  - @atlaskit/select@11.0.7
  - @atlaskit/spinner@12.1.4
  - @atlaskit/theme@9.5.1
  - @atlaskit/toggle@8.1.4
  - @atlaskit/css-reset@5.0.10
  - @atlaskit/atlassian-navigation@0.9.5
  - @atlaskit/router@0.6.3

## 0.2.0

### Minor Changes

- [minor][37c48b675d](https://bitbucket.org/atlassian/atlassian-frontend/commits/37c48b675d):

  Add routing and sweet state for state management

## 0.1.2

### Patch Changes

- Updated dependencies [602ad2855a](https://bitbucket.org/atlassian/atlassian-frontend/commits/602ad2855a):
- Updated dependencies [5c6a0d9512](https://bitbucket.org/atlassian/atlassian-frontend/commits/5c6a0d9512):
- Updated dependencies [c0102a3ea2](https://bitbucket.org/atlassian/atlassian-frontend/commits/c0102a3ea2):
- Updated dependencies [ca86945834](https://bitbucket.org/atlassian/atlassian-frontend/commits/ca86945834):
- Updated dependencies [b9dc265bc9](https://bitbucket.org/atlassian/atlassian-frontend/commits/b9dc265bc9):
  - @atlaskit/atlassian-navigation@0.9.4
  - @atlaskit/icon@20.0.0
  - @atlaskit/avatar@17.1.6
  - @atlaskit/logo@12.3.1
  - @atlaskit/modal-dialog@10.5.1
  - @atlaskit/button@13.3.6
  - @atlaskit/inline-dialog@12.1.8
  - @atlaskit/select@11.0.6

## 0.1.1

### Patch Changes

- [patch][896fa47db0](https://bitbucket.org/atlassian/atlassian-frontend/commits/896fa47db0):

  Basic techstack visualisation
