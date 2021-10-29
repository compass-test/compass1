import React, { Suspense } from 'react';
import { render, waitForElement } from '@testing-library/react';
import Toggle from '..';

describe('Toggle Component', () => {
  const ToggleComponent = (
    <Suspense fallback={<div>...loading</div>}>
      <Toggle
        name="unchecked-toggle"
        label="unchecked-toggle"
        testId="unchecked"
      />
      <Toggle
        name="checked-toggle"
        label="checked-toggle"
        testId="checked"
        defaultChecked={true}
      />
    </Suspense>
  );

  test('should render an unchecked toggle and a checked toggle', async () => {
    const { container } = render(ToggleComponent);
    const toggleUnchecked = (await waitForElement(() =>
      container.querySelector('input[name="unchecked-toggle"]'),
    )) as HTMLInputElement;
    const toggleChecked = (await waitForElement(() =>
      container.querySelector('input[name="checked-toggle"]'),
    )) as HTMLInputElement;

    expect(toggleUnchecked).toBeTruthy();
    expect(toggleChecked).toBeTruthy();
  });

  test('should render correct default value', async () => {
    const { getByTestId } = render(ToggleComponent);

    const toggleChecked = (await waitForElement(() =>
      getByTestId('checked--input'),
    )) as HTMLInputElement;

    const toggleUnchecked = (await waitForElement(() =>
      getByTestId('unchecked--input'),
    )) as HTMLInputElement;

    expect(toggleChecked).toHaveAttribute('checked');
    expect(toggleUnchecked).not.toHaveAttribute('checked');
  });
});
