# @atlassian/smart-user-picker

## 2.1.4

### Patch Changes

- [`b85e7ce12cd`](https://bitbucket.org/atlassian/atlassian-frontend/commits/b85e7ce12cd) - Internal upgrade of memoize-one to 6.0.0

## 2.1.3

### Patch Changes

- [`a92e3bdb515`](https://bitbucket.org/atlassian/atlassian-frontend/commits/a92e3bdb515) - Relaxed product enum typing to take in any string

## 2.1.2

### Patch Changes

- [`93c8a8f0bd5`](https://bitbucket.org/atlassian/atlassian-frontend/commits/93c8a8f0bd5) - Expose types from @atlaskit/user-picker from smart-user-picker

## 2.1.1

### Patch Changes

- [`4ac918aad80`](https://bitbucket.org/atlassian/atlassian-frontend/commits/4ac918aad80) - Added helper documentation for easier onboarding onto Atlaskit Editor

## 2.1.0

### Minor Changes

- [`674d31d565e`](https://bitbucket.org/atlassian/atlassian-frontend/commits/674d31d565e) - Added default value hydration for non-jira/conf products, team default value hydration, and changed default debounce time to 150ms

## 2.0.0

### Major Changes

- [`ccda387eede`](https://bitbucket.org/atlassian/atlassian-frontend/commits/ccda387eede) - smart-user-picker extracted out from user-picker to smart-user-picker package. smart-user-picker in user-picker is now deprecated but still backwards compatible. Please use @atlassian/smart-user-picker for smart-user-picker.

### Patch Changes

- [`5ac7831fc59`](https://bitbucket.org/atlassian/atlassian-frontend/commits/5ac7831fc59) - updating UP dependency
- Updated dependencies

## 1.0.1

### Patch Changes

- [`869e1fdef2f`](https://bitbucket.org/atlassian/atlassian-frontend/commits/869e1fdef2f) - [ux] Prioritize filterOptions prop over onEmpty. Now, filterOptions is called AFTER onEmpty is applied to URS suggestions. This means that SUP can show empty results if filterOptions filters out all results. This fixes a bug where updated filterOptions does not get applied to suggestions.
