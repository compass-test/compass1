import React from 'react';

import { render } from '@testing-library/react';

import { CircularProgress } from './index';

const renderCircularProgress = (progress: number) => {
  return render(
    <CircularProgress
      progress={progress}
      testId={'dragonfruit-scorecard-templates.circular-progress'}
    />,
  );
};

describe('CircularProgress tests', () => {
  it('Should display gray for 0%', async () => {
    const { getByTestId } = renderCircularProgress(0);

    const coloredProgress = await getByTestId(
      'dragonfruit-scorecard-templates.circular-progress.circle',
    );
    const percentage = await getByTestId(
      'dragonfruit-scorecard-templates.circular-progress.percentage',
    );

    expect(coloredProgress.getAttribute('stroke')).toBe('#C4C4C4');
    expect(percentage.textContent).toBe('0%');
  });

  it('Should display red for <=40%', async () => {
    const { getByTestId } = renderCircularProgress(34);

    const coloredProgress = await getByTestId(
      'dragonfruit-scorecard-templates.circular-progress.circle',
    );
    const percentage = await getByTestId(
      'dragonfruit-scorecard-templates.circular-progress.percentage',
    );

    expect(coloredProgress.getAttribute('stroke')).toBe('#FF5630');
    expect(percentage.textContent).toBe('34%');
  });

  it('Should display yellow for >40% and <=60%', async () => {
    const { getByTestId } = renderCircularProgress(57);

    const coloredProgress = await getByTestId(
      'dragonfruit-scorecard-templates.circular-progress.circle',
    );
    const percentage = await getByTestId(
      'dragonfruit-scorecard-templates.circular-progress.percentage',
    );

    expect(coloredProgress.getAttribute('stroke')).toBe('#FFAB00');
    expect(percentage.textContent).toBe('57%');
  });

  it('Should display blue for >60% and <=80%', async () => {
    const { getByTestId } = renderCircularProgress(65);

    const coloredProgress = await getByTestId(
      'dragonfruit-scorecard-templates.circular-progress.circle',
    );
    const percentage = await getByTestId(
      'dragonfruit-scorecard-templates.circular-progress.percentage',
    );

    expect(coloredProgress.getAttribute('stroke')).toBe('#0065FF');
    expect(percentage.textContent).toBe('65%');
  });

  it('Should display green for >80% and <=100%', async () => {
    const { getByTestId } = renderCircularProgress(90);

    const coloredProgress = await getByTestId(
      'dragonfruit-scorecard-templates.circular-progress.circle',
    );
    const percentage = await getByTestId(
      'dragonfruit-scorecard-templates.circular-progress.percentage',
    );

    expect(coloredProgress.getAttribute('stroke')).toBe('#36B37E');
    expect(percentage.textContent).toBe('90%');
  });
});
