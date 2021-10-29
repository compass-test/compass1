import React from 'react';

import { render } from '@testing-library/react';

import ProgressBar from './index';

const renderProgressBar = (progress: number) => {
  return render(<ProgressBar progress={progress} />);
};

describe('ProgressBar tests', () => {
  const CLASS_NAME_PREFIX = 'dragonfruit-scorecards.common.ui.progress-bar';

  it('Should display gray for 0%', () => {
    const { getByTestId } = renderProgressBar(0);

    expect(getByTestId(`${CLASS_NAME_PREFIX}-0`)).toBeTruthy();
  });

  it('Should display red for <=40%', () => {
    const { getByTestId } = renderProgressBar(34);

    expect(getByTestId(`${CLASS_NAME_PREFIX}-34`)).toBeTruthy();
  });

  it('Should display yellow for >40% and <=60%', () => {
    const { getByTestId } = renderProgressBar(57);

    expect(getByTestId(`${CLASS_NAME_PREFIX}-57`)).toBeTruthy();
  });

  it('Should display blue for >60% and <=80%', () => {
    const { getByTestId } = renderProgressBar(65);

    expect(getByTestId(`${CLASS_NAME_PREFIX}-65`)).toBeTruthy();
  });

  it('Should display green for >80% and <=100%', () => {
    const { getByTestId } = renderProgressBar(90);

    expect(getByTestId(`${CLASS_NAME_PREFIX}-90`)).toBeTruthy();
  });
});
