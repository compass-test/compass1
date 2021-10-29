import React from 'react';

import { cleanup, render } from '@testing-library/react';
import { axe, toHaveNoViolations } from 'jest-axe';

import Layout from '../../layout';

expect.extend(toHaveNoViolations);

// As we're testing on the JSDOM, color-contrast testing can't run.
// The types of results fetched are limited for performance reasons
const axeRules = {
  rules: {
    'color-contrast': { enabled: false },
  },
  resultTypes: ['violations', 'incomplete'],
};

it('layout should not fail an aXe audit', async () => {
  const { container } = render(
    <Layout>
      <p>Hello World</p>
    </Layout>,
  );
  const results = await axe(container, axeRules);

  expect(results).toHaveNoViolations();

  // Only tests we explicitly skip can be incomplete
  expect(results.incomplete).toHaveLength(0);
  cleanup();
});
