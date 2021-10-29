import React from 'react';

import { render } from '@testing-library/react';

import Example from '../examples/1-listening-to-breadcrumbs-being-mounted';

it('Breadcrumb gets moutned and the emitted event is logged', () => {
  // Breadcrumb events get logged
  const mockedLog = jest.fn();
  // eslint-disable-next-line no-console
  console.log = mockedLog;

  render(<Example />);
  expect(mockedLog).toBeCalledTimes(1);
});
