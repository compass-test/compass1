# @atlassian/eslint-resolver-plugin-tangerine

## 0.2.0

### Minor Changes

- [`f6bb416317b`](https://bitbucket.org/atlassian/atlassian-frontend/commits/f6bb416317b) - Updates ruleset to include react/button-has-type.

## 0.1.2

### Patch Changes

- [`6c525a8229`](https://bitbucket.org/atlassian/atlassian-frontend/commits/6c525a8229) - Upgraded to TypeScript 3.9.6 and tslib to 2.0.0

  Since tslib is a dependency for all our packages we recommend that products also follow this tslib upgrade
  to prevent duplicates of tslib being bundled.

## 0.1.1

### Patch Changes

- [`7c73b5966f`](https://bitbucket.org/atlassian/atlassian-frontend/commits/7c73b5966f) - The eslint `rule` is also used in a `techstack` solution, namely in the `package-boundaries` use case but because we introduced it to the root config as well, `techstack` detects a “conflict”.

  In order to resolve such conflicts, we have this “resolver” system and we added a resolver for this rule to the resolver system.

  Basically to handle the case, it is at the root and in the techstack solution.
