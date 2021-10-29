import React from 'react';

import { render } from '@testing-library/react';

import { byLabelText, waitTillPresent } from '@atlassian/commerce-test-library';

import { StateFieldComponent } from './examples';

test('StateField is here', async () => {
  render(<StateFieldComponent />);
  await waitTillPresent(byLabelText('state-select'));
});
