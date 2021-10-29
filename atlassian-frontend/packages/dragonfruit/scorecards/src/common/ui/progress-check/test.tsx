import React from 'react';

import { render } from '@testing-library/react';

import { ProgressCheck } from './index';

describe('ProgressCheck', () => {
  let completeIcon: HTMLElement;
  let incompleteIcon: HTMLElement;

  it('should display a green checkmark when complete is true', () => {
    const { getByTestId } = render(
      <ProgressCheck complete={true} testId={'scorecards.ui.progress-check'} />,
    );

    completeIcon = getByTestId('scorecards.ui.progress-check.complete');
    expect(completeIcon).toBeInTheDocument();
  });

  it('should display a greyed circle when complete is false', () => {
    const { getByTestId } = render(
      <ProgressCheck
        complete={false}
        testId={'scorecards.ui.progress-check'}
      />,
    );

    incompleteIcon = getByTestId('scorecards.ui.progress-check.incomplete');
    expect(incompleteIcon).toBeInTheDocument();
  });

  it('should display a greyed circle when complete is empty', () => {
    const { getByTestId } = render(
      <ProgressCheck testId={'scorecards.ui.progress-check'} />,
    );

    incompleteIcon = getByTestId('scorecards.ui.progress-check.incomplete');
    expect(incompleteIcon).toBeInTheDocument();
  });
});
