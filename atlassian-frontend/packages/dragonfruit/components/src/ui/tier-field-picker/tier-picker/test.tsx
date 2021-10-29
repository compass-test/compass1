import React from 'react';

import { fireEvent, render, wait } from '@testing-library/react';

import { TierPickerTemplate } from './examples';

describe('TierPicker', () => {
  it('should render with the default tier', async () => {
    const { getByText } = render(<TierPickerTemplate />);

    expect(getByText(/Tier 4/i)).toBeInTheDocument();
  });

  it('should show the new tier on select', async () => {
    const { getByText } = render(<TierPickerTemplate />);

    // find the control and click to open the dropdown
    const control = getByText(/Tier 4/i) as HTMLElement;
    fireEvent.click(control);

    // click the option in the dropdown
    const option = getByText(/Tier 1/i) as HTMLElement;
    fireEvent.click(option);

    // The UI control updated
    await wait(() => expect(getByText(/Tier 1/i)).toBeInTheDocument());
  });

  it('should not react to clicking when disabled', async () => {
    const { getByText, queryByText } = render(
      <TierPickerTemplate isDisabled={true} />,
    );

    // find the control and attempt click to click on it
    const tierElement = getByText(/Tier 4/i) as HTMLElement;
    fireEvent.click(tierElement);

    // see if the other options show up
    const nonexistentOption = queryByText(/Tier 1/i) as HTMLElement;

    expect(nonexistentOption).toBeNull();
  });
});
