# Package Dragonfruit Common UI

This package contains common UI elements which are used throughout Compass and
don't belong to a specific package. All components should be generic and
reuseable. Components in this package must have no dependencies on other
Dragonfruit packages.

## Storybook Examples

```shell
$ bolt storybook @atlassian/dragonfruit-common-ui
```

## Visual Regression Test

This package contains visual regression tests for the components that override the styles of the smartlinks smart card.

This is to ensure that our overrides still work if the component we're overriding is ever changed.

These tests run in docker containers, so make sure that you've followed the instructions to setup your environment
before you run these tests https://hello.atlassian.net/wiki/spaces/AF/pages/136113035/How%2Bto%2Badd%2Bvisual%2Bregression%2Btests%2Bin%2BAtlassian%2BFrontend

```shell
# Run all VR tests in this package
$ yarn test:vr packages/dragonfruit/common-ui

# Run a specific VR test
$ yarn test:vr packages/dragonfruit/common-ui/__tests__/visual-regression/smartLinkListSnapshotTest.ts

# Update a specific VR test
$ yarn test:vr packages/dragonfruit/common-ui/__tests__/visual-regression/smartLinkListSnapshotTest.ts -u
```
