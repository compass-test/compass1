import React from 'react';

import { render } from '@testing-library/react';

import { Provider as SmartLinksProvider } from '@atlaskit/smart-card';

import { useSmartLinks } from './index';

const TestWithHookExpectNull = () => {
  const { client } = useSmartLinks();
  expect(client).toBeFalsy();

  return <div data-testid="find-me">Hello</div>;
};

const TestWithHookExpectNotNull = () => {
  const { client } = useSmartLinks();
  expect(client).toBeTruthy();

  return <div data-testid="find-me">Hello</div>;
};

describe('useSmartLinks', () => {
  test('null client and store without provider', () => {
    const { findAllByTestId } = render(<TestWithHookExpectNull />);

    const div = findAllByTestId('find-me');
    expect(div).toBeTruthy();
  });

  test('retrieves SmartLinks from context', () => {
    const { findAllByTestId } = render(
      <SmartLinksProvider>
        <TestWithHookExpectNotNull />
      </SmartLinksProvider>,
    );

    const div = findAllByTestId('find-me');
    expect(div).toBeTruthy();
  });
});
