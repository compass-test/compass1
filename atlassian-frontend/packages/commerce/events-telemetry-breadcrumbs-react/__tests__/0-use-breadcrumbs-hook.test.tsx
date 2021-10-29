import React from 'react';

import { render } from '@testing-library/react';

import Example, {
  BREADCRUMBED_BUTTON_TEST_ID,
  BREADCRUMBLESS_BUTTON_TEST_ID,
  INNER_BREADCRUMB_ATTRIBUTES,
  INNER_BREADCRUMB_NAME,
  OUTTER_BREADCRUMB_ATTRIBUTES,
  OUTTER_BREADCRUMB_NAME,
} from '../examples/0-use-breadcrumbs-hook';

it('Correct breadcrumbs get logged in the correct order', () => {
  const mockedLog = jest.fn();
  // Breadcrumbs get logged
  // eslint-disable-next-line no-console
  console.log = mockedLog;

  expect(mockedLog).not.toBeCalled();

  const { getByTestId } = render(<Example />);

  getByTestId(BREADCRUMBED_BUTTON_TEST_ID).click();
  expect(mockedLog).toBeCalledTimes(1);
  expect(mockedLog).toBeCalledWith({
    breadcrumbs: [
      {
        name: OUTTER_BREADCRUMB_NAME,
        attributes: OUTTER_BREADCRUMB_ATTRIBUTES,
      },
      {
        name: INNER_BREADCRUMB_NAME,
        attributes: INNER_BREADCRUMB_ATTRIBUTES,
      },
    ],
    payload: {
      name: INNER_BREADCRUMB_NAME,
      attributes: INNER_BREADCRUMB_ATTRIBUTES,
    },
  });

  getByTestId(BREADCRUMBLESS_BUTTON_TEST_ID).click();
  expect(mockedLog).toBeCalledTimes(2);
  expect(mockedLog).toBeCalledWith(undefined);
});
