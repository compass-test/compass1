import React, { Suspense } from 'react';
import { render, waitForElement } from '@testing-library/react';
import Badge from '..';

describe('Badge component', () => {
  const Component = (
    <Suspense fallback={<div>loading</div>}>
      <Badge appearance="important" text="42" />
    </Suspense>
  );

  test('component exists and displays the content', async () => {
    const { getByText } = render(Component);
    const lazyElement = await waitForElement(() => getByText(/42/i));

    expect(lazyElement).toBeInTheDocument();
  });
});
