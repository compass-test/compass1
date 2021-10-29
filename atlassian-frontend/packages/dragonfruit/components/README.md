# Components

This package contains common components for compass "Components".
## Storybook Examples

```shell
$ bolt storybook @atlassian/dragonfruit-components
```

## Visual Regression Test

This package contains visual regression tests for the components that introduces changes to LinkSection.

This is to ensure that our overrides still work if the component we're overriding is ever changed.

These tests run in docker containers, so make sure that you've followed the instructions to setup your environment
before you run these tests https://hello.atlassian.net/wiki/spaces/AF/pages/136113035/How%2Bto%2Badd%2Bvisual%2Bregression%2Btests%2Bin%2BAtlassian%2BFrontend

```shell
# Run all VR tests in this package
$ yarn test:vr packages/dragonfruit/components

# Run a specific VR test
$ yarn test:vr packages/dragonfruit/components/__tests__/visual-regression/smartLinkWithDeleteSnapshotTest.ts

# Update a specific VR test
$ yarn test:vr packages/dragonfruit/components/__tests__/visual-regression/smartLinkWithDeleteSnapshotTest.ts -u
```