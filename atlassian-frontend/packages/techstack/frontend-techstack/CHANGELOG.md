# @atlassian/frontend-techstack

## 0.13.2

### Patch Changes

- Updated dependencies

## 0.13.1

### Patch Changes

- [`4b22eb95a2b`](https://bitbucket.org/atlassian/atlassian-frontend/commits/4b22eb95a2b) - Root path of package now needs to include packages directory.

## 0.13.0

### Minor Changes

- [`b6b2d3d31b`](https://bitbucket.org/atlassian/atlassian-frontend/commits/b6b2d3d31b) - Support `test-utils` project structure

## 0.12.2

### Patch Changes

- Updated dependencies

## 0.12.1

### Patch Changes

- [`6c525a8229`](https://bitbucket.org/atlassian/atlassian-frontend/commits/6c525a8229) - Upgraded to TypeScript 3.9.6 and tslib to 2.0.0

  Since tslib is a dependency for all our packages we recommend that products also follow this tslib upgrade
  to prevent duplicates of tslib being bundled.

## 0.12.0

### Minor Changes

- [`87f4720f27`](https://bitbucket.org/atlassian/atlassian-frontend/commits/87f4720f27) - Officially dropping IE11 support, from this version onwards there are no warranties of the package working in IE11.
  For more information see: https://community.developer.atlassian.com/t/atlaskit-to-drop-support-for-internet-explorer-11-from-1st-july-2020/39534

## 0.11.1

### Patch Changes

- [`7c73b5966f`](https://bitbucket.org/atlassian/atlassian-frontend/commits/7c73b5966f) - The eslint `rule` is also used in a `techstack` solution, namely in the `package-boundaries` use case but because we introduced it to the root config as well, `techstack` detects a “conflict”.

  In order to resolve such conflicts, we have this “resolver” system and we added a resolver for this rule to the resolver system.

  Basically to handle the case, it is at the root and in the techstack solution.

## 0.11.0

### Minor Changes

- [`c4da9a1dde`](https://bitbucket.org/atlassian/atlassian-frontend/commits/c4da9a1dde) - Add loading-code-when-required use case and solution

## 0.10.0

### Minor Changes

- [`936ad8f8f1`](https://bitbucket.org/atlassian/atlassian-frontend/commits/936ad8f8f1) - Add flags and experience-reliability use cases and solutions

## 0.9.2

### Patch Changes

- [patch][ed2a4af0fc](https://bitbucket.org/atlassian/atlassian-frontend/commits/ed2a4af0fc):

  Bump eslint-plugin-import dependency- Updated dependencies [ed2a4af0fc](https://bitbucket.org/atlassian/atlassian-frontend/commits/ed2a4af0fc):

  - @atlassian/eslint-plugin-tangerine@0.6.3

## 0.9.1

### Patch Changes

- [patch][6ca5824707](https://bitbucket.org/atlassian/atlassian-frontend/commits/6ca5824707):

  Add (\*.)test pattern to dev files for tangerine-next

## 0.9.0

### Minor Changes

- [minor][132d01bf54](https://bitbucket.org/atlassian/atlassian-frontend/commits/132d01bf54):

  Extend tangerine-next solution to mark examples as dev files

## 0.8.2

### Patch Changes

- [patch][1265c36ca4](https://bitbucket.org/atlassian/atlassian-frontend/commits/1265c36ca4):

  Update URL for Fx3 documentation

## 0.8.1

### Patch Changes

- [patch][7df0b55307](https://bitbucket.org/atlassian/atlassian-frontend/commits/7df0b55307):

  Change imports to comply with Atlassian conventions; include @af into list of internal scopes for import order- Updated dependencies [7df0b55307](https://bitbucket.org/atlassian/atlassian-frontend/commits/7df0b55307):

  - @atlassian/eslint-plugin-tangerine@0.6.2

## 0.8.0

### Minor Changes

- [minor][4d372cdada](https://bitbucket.org/atlassian/atlassian-frontend/commits/4d372cdada):

  Add feature flagging use case and solution

## 0.7.0

### Minor Changes

- [minor][43f99c10e9](https://bitbucket.org/atlassian/atlassian-frontend/commits/43f99c10e9):

  Change code-structure/tangerine-next solution to only care about 'src' folder

## 0.6.0

### Minor Changes

- [minor][0dd56f70de](https://bitbucket.org/atlassian/atlassian-frontend/commits/0dd56f70de):

  Add resolvers to merge conflicting eslint rules. Add tangerinerc as optional in tangerine-next solution.

## 0.5.0

### Minor Changes

- [minor][9a368c9ddb](https://bitbucket.org/atlassian/atlassian-frontend/commits/9a368c9ddb):

  Introduce tree shaking use case and solution

### Patch Changes

- Updated dependencies [ec666e5e66](https://bitbucket.org/atlassian/atlassian-frontend/commits/ec666e5e66):
  - @atlassian/eslint-plugin-tangerine@0.6.0

## 0.4.4

### Patch Changes

- [patch][f1c38de365](https://bitbucket.org/atlassian/atlassian-frontend/commits/f1c38de365):

  Adds animation to tech stack.

## 0.4.3

### Patch Changes

- [patch][6548261c9a](https://bitbucket.org/atlassian/atlassian-frontend/commits/6548261c9a):

  Remove namespace imports from React, ReactDom, and PropTypes- Updated dependencies [6548261c9a](https://bitbucket.org/atlassian/atlassian-frontend/commits/6548261c9a):

  - @atlassian/eslint-plugin-tangerine@0.5.1
  - @atlassian/stricter-plugin-tangerine@0.1.5

## 0.4.2

### Patch Changes

- [patch][f8df198a57](https://bitbucket.org/atlassian/atlassian-frontend/commits/f8df198a57):

  fix ids and md for few use cases

## 0.4.1

### Patch Changes

- Updated dependencies [cfbca87ae8](https://bitbucket.org/atlassian/atlassian-frontend/commits/cfbca87ae8):
  - @atlassian/eslint-plugin-tangerine@0.5.0

## 0.4.0

### Minor Changes

- [minor][1a48667bce](https://bitbucket.org/atlassian/atlassian-frontend/commits/1a48667bce):

  Introduce import/no-dangling-slash rule

### Patch Changes

- Updated dependencies [1a48667bce](https://bitbucket.org/atlassian/atlassian-frontend/commits/1a48667bce):
  - @atlassian/eslint-plugin-tangerine@0.4.0

## 0.3.0

### Minor Changes

- [minor][c67362b8fd](https://bitbucket.org/atlassian/atlassian-frontend/commits/c67362b8fd):

  Introduce "import structure" use case

## 0.2.1

### Patch Changes

- [patch][7619342dec](https://bitbucket.org/atlassian/atlassian-frontend/commits/7619342dec):

  Stricter supports typescript for all files

## 0.2.0

### Minor Changes

- [minor][debd87bb46](https://bitbucket.org/atlassian/atlassian-frontend/commits/debd87bb46):

  Add circular dependencies use case; add react-sortable-hoc solution

### Patch Changes

- Updated dependencies [debd87bb46](https://bitbucket.org/atlassian/atlassian-frontend/commits/debd87bb46):
  - @atlassian/eslint-plugin-tangerine@0.3.2

## 0.1.2

### Patch Changes

- [patch][d754bd5600](https://bitbucket.org/atlassian/atlassian-frontend/commits/d754bd5600):

  Add team information to package- Updated dependencies [d754bd5600](https://bitbucket.org/atlassian/atlassian-frontend/commits/d754bd5600):

  - @atlassian/eslint-plugin-tangerine@0.3.1
  - @atlassian/stricter-plugin-tangerine@0.1.3

## 0.1.1

### Patch Changes

- [patch][6343b957af](https://bitbucket.org/atlassian/atlassian-frontend/commits/6343b957af):

  Change API and techstack definition resolution technique
