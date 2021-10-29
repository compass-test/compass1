import React from 'react';

import { getColorForProgress } from '../../utils/get-color-for-progress';

import { Bar, ProgressBarWrapper } from './styled';

type Size = 'small' | 'medium';

interface ProgressBarProps {
  progress: number;
  size?: Size;
  testId?: String;
}

function ProgressBar({
  progress,
  size = 'small',
  testId = 'dragonfruit-scorecards.common.ui.progress-bar',
}: ProgressBarProps) {
  progress = Math.max(0, Math.min(progress, 100));

  const progressColor = getColorForProgress(progress);

  return (
    <ProgressBarWrapper data-testid={testId} size={size}>
      <Bar
        width={progress}
        background={progressColor}
        size={size}
        data-testid={`${testId}-${progress}`}
      />
    </ProgressBarWrapper>
  );
}

export default ProgressBar;
