import React from 'react';

import { render } from '@testing-library/react';

import { FeatureFlags, FeatureFlagsProvider, useFeatureFlag } from './index';

const FlagConsumer = ({ defaultValue = false }: { defaultValue?: boolean }) => {
  const flag = useFeatureFlag('enableKeyboardNavigation', defaultValue);

  return <p>{flag.toString()}</p>;
};

describe('FeatureFlagsProvider', () => {
  // [flagValue, expectedValue]
  test.each([
    [true, 'true'],
    [false, 'false'],
  ])('should return the correct feature flag value', (value, expected) => {
    const flags: FeatureFlags = {
      enableKeyboardNavigation: value,
    };

    const { getByText } = render(
      <FeatureFlagsProvider flags={flags}>
        <FlagConsumer />
      </FeatureFlagsProvider>,
    );

    expect(getByText(expected)).toBeInTheDocument();
  });

  // [defaultValue, expectedValue]
  test.each([
    [true, 'true'],
    [false, 'false'],
  ])(
    'should return the default value if the flag is undefined',
    (defaultValue, expected) => {
      const flags: FeatureFlags = {};

      const { getByText } = render(
        <FeatureFlagsProvider flags={flags}>
          <FlagConsumer defaultValue={defaultValue} />
        </FeatureFlagsProvider>,
      );

      expect(getByText(expected)).toBeInTheDocument();
    },
  );
});
