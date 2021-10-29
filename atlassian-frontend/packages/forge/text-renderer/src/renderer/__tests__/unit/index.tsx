import React from 'react';
import { render } from '@testing-library/react';
// eslint-disable-next-line import/no-extraneous-dependencies
import { IntlProvider } from 'react-intl';

import { ReactRenderer } from '../..';

import { exampleDoc } from './_test-data';
test('it renders the example doc without throwing errors', () => {
  expect(() => {
    render(
      <IntlProvider locale="en">
        <ReactRenderer document={exampleDoc} />
      </IntlProvider>,
    );
  }).not.toThrow();
});
