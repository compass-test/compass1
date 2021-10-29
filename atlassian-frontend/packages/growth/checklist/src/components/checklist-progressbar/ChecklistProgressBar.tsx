// eslint-disable-next-line import/no-extraneous-dependencies
import React from 'react';
// AFP-2532 TODO: Fix automatic suppressions below
// eslint-disable-next-line @atlassian/tangerine/import/entry-points
import { colors } from '@atlaskit/theme';
import ProgressBar from '@atlaskit/progress-bar';
// AFP-2532 TODO: Fix automatic suppressions below
// eslint-disable-next-line @atlassian/tangerine/import/entry-points
import { borderRadius as akBorderRadius } from '@atlaskit/theme';

const borderRadius = akBorderRadius();

const progressBarTheme: any = (
  currentTheme: (themeProps: object) => any,
  themeProps: object,
) => {
  const {
    bar,
    container,
    decreasingBar,
    determinateBar,
    increasingBar,
  } = currentTheme(themeProps);
  return {
    bar: {
      ...bar,
      background: colors.G300,
      height: 10,
      borderRadius: 0,
    },
    container: {
      ...container,
      height: 10,
      background: colors.N30,
      borderRadius: `${borderRadius + 1}px ${borderRadius + 1}px 0 0`,
    },
    decreasingBar,
    determinateBar,
    increasingBar,
  };
};

export interface ChecklistProgressBarProps {
  value: number;
  isIndeterminate?: boolean;
}

export default ({
  value = 0,
  isIndeterminate = false,
}: ChecklistProgressBarProps) => {
  return (
    <ProgressBar
      theme={progressBarTheme}
      value={value}
      isIndeterminate={isIndeterminate}
    />
  );
};
