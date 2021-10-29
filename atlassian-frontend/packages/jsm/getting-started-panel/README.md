# `Getting Started Panel (GSP)`

The [GSP](https://hello.atlassian.net/wiki/spaces/VPORT/pages/727178915/Getting+Started+Panel+for+JSM) includes onboarding components developed specifically for Jira Service Management (JSM).

The components are embedded in Opsgenie and within an ITSM project in JSM(Jira).

These components are not intended to be used in other scenarios and contain content specific to ITSM onboarding.

### GettingStartedPanel

- A panel rendered in the right-sidebar that includes several onboarding tabs.

### Lozenge

- A minimized version of the GSP that displays the current state and returns the panel when clicked.

## Usage

As the use cases are very specific and still under active development the best documentation

for how to embed the GSP components is in the current implementations:

- [Jira](https://stash.atlassian.com/projects/JIRACLOUD/repos/jira-frontend/browse/src/packages/servicedesk/getting-started-panel)
- [Opsgenie](https://bitbucket.org/opsgenie/opsgenie-web-static/src/master/packages/jsm-getting-started-panel/)

## Developing

#### run the examples

```shell
$ bolt storybook jsm-getting-started-panel
```

#### run all unit tests

```shell
$ bolt test packages/jsm/getting-started-panel/src/__tests__
```

#### build the package

```shell
$ bolt build jsm-getting-started-panel
```

#### local dev loop for jira frontend

1. In AFE (this repo)

```shell
$ bolt build jsm-getting-started-panel
$ bolt link-pkg ../jira-frontend jsm-getting-started-panel
$ bolt link-pkg ../jira-frontend/src/packages/servicedesk/getting-started-panel jsm-getting-started-panel
```

2. In JFE

```shell
$ yarn
```

3. In AFE

```shell
$ bolt watch jsm-getting-started-panel
```

4. In JFE start as normal with your ngrok sudomain

```shell
$ yarn start jira-spa ...
```

## Adding feature flags

Feature flags are implemented differently here than in Jira Frontend. Depending on whether there are other flags in use, you may be able to copy what you see already. Otherwise to add a new feature flag follow these steps:

1. Add the new flag to `FeatureFlagKey`, `FeatureFlagMap` and `featureFlagDefaultValues` in `src/controllers/feature-flags/constants.ts`. A sample flag is provided here as guidance and also to keep Typescript happy.

2. Create the file `src/feature-flags.ts` if needed and add a `useGspFeatureFlag` hook for the new flag.
```ts
import { FeatureFlagKey, useGspFeatureFlag } from './controllers/feature-flags';

// Don't forget to add a mock for your flag in ./__mocks__/feature-flags.ts

export const useIsSampleFeatureFlagEnabled = () =>
  useGspFeatureFlag(FeatureFlagKey.SampleFeatureFlag);
```

3. Create the file `src/__mocks__/feature-flags.ts` if needed and add a mock for the new flag.
```ts
import {
  FeatureFlagKey,
  FeatureFlagMap,
  featureFlagDefaultValues,
} from '../controllers/feature-flags';

const createMockFeatureFlagFn = <T extends FeatureFlagKey>(featureFlagKey: T) =>
  jest
    .fn<FeatureFlagMap[T], []>()
    .mockReturnValue(featureFlagDefaultValues[featureFlagKey]);

export const useIsSampleFeatureFlagEnabled = createMockFeatureFlagFn(
  FeatureFlagKey.SampleFeatureFlag,
);
```

4. Depending on the nature of the feature flag and how much code it touches, you may want to create a test utility to assist in running tests with both the flag on and off. Consider creating the following `describe` wrapper in `src/__tests__/_testUtils.ts`.
```ts
type DescribeWithFeatureFlag = (
  description: string,
  block: (flagValue: boolean) => void,
) => void;

const describeWithFeatureFlag = (
  featureName: string,
): DescribeWithFeatureFlag => (description, block) =>
  describe.each([true, false])(`${description} with ${featureName} %s`, block);

// This file must be imported before any of the code under test.
jest.mock('../feature-flags');

export const describeWithSampleFeatureFlag: DescribeWithFeatureFlag = (
  description,
  block,
) =>
  describeWithFeatureFlag('sample feature flag')(description, (value) => {
    beforeEach(() => {
      (useIsSampleFeatureFlagEnabled as any).mockReturnValue(value);
    });
    afterEach(() => {
      (useIsSampleFeatureFlagEnabled as any).mockClear();
    });
    block(value);
  });
```

5. To use the feature flag, import the feature flag hook from `src/feature-flags.ts` and call it at the top of your component. This is to ensure that the hook is not called conditionally, as the rule of hooks applies.
```ts
const MyComponent = () => {
    const isSampleFeatureFlagEnabled = useIsSampleFeatureFlagEnabled();

    // ... other code that for example might return null if some condition is met

    return isSampleFeatureFlagEnabled ? <NewExperience /> : <OldExperience />
}
```

6. In tests if the feature flag doesn't work as expected try adding `jest.mock('../../feature-flags');` at the top of the test file.

## Deploying

Follow the AFE docs [go/af-docs](https://developer.atlassian.com/cloud/framework/atlassian-frontend/)

## Misc

Feel free to reach out to the Ignition team at #jsd-ignition on slack for further support / questions.
