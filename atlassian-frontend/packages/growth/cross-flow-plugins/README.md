# `@atlassiansox/cross-flow-plugins`

This package defines utility types and functions for creating cross flow plugins.

Context for what a Cross Flow Plugin is - https://hello.atlassian.net/wiki/spaces/PGT/pages/697282676/Cross+Flow+Support+-+Documentation#Cross-Flow-Plugins

## Example Usage

Please see https://hello.atlassian.net/wiki/spaces/PGT/pages/717306976/Example+uses+of+Plugins+atlassiansox+cross-flow-plugins

```typescript
import {
  createGetContainersPlugin,
  createGetUsersPlugin,
  createGetSuggestedSiteNamesPlugin,
  UserIdTypes,
  ContainerTypes,
} from '@atlassiansox/cross-flow-plugins';

const fetchContainers = () =>
  Promise.resolve({
    type: ContainerTypes.BITBUCKET_WORKSPACE,
    containers: [
      {
        id: '123',
        displayName: 'My Container',
        type: ContainerTypes.BITBUCKET_WORKSPACE,
      },
      {
        id: '234',
        displayName: 'My Other Container',
        type: ContainerTypes.BITBUCKET_WORKSPACE,
      },
    ],
  });

const ExampleGetContainersPlugin = createGetContainersPlugin(fetchContainers);

const fetchUsers = () =>
  Promise.resolve([
    {
      id: '123',
      displayName: 'Neo',
      idType: UserIdTypes.ATLASSIAN_ACCOUNT_ID,
      avatarUrl: '/user/thomas-anderson/avatar?size=48&s=48',
    },
    {
      id: '234',
      displayName: 'Trinity',
      idType: UserIdTypes.ATLASSIAN_ACCOUNT_ID,
    },
  ]);
const ExampleGetUsersPlugin = createGetUsersPlugin(fetchUsers);

const fetchSuggestedSiteNames = () =>
  Promise.resolve(['sample-first-name', 'sample-team-name']);
const ExampleGetSetSuggestedSiteNamesPlugin = createGetSuggestedSiteNamesPlugin(
  fetchSuggestedSiteNames,
);
```

## How to maintain flow typing

If there is any typing changes that requires flow typing changes, it should fail the build because `flow-src/0-type-compat.ts` checking

When that scenario happens, fix the typing by comparing the typing in the `index.ts` file and the `index.js.flow`.

`index.js.flow` should always be updated accordingly when there are typing changes that affect our public API (`index.ts` file)

Once you have updated the typing inside `index.js.flow`, go to the root of the package and run `sh ./flow-src/flow-compat-test.sh`, this will generate the Typescript typing that will be used inside `0-type-compat.ts`
