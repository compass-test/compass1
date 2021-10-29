// eslint-disable-next-line import/no-extraneous-dependencies
import React from 'react';
// AFP-2532 TODO: Fix automatic suppressions below
// eslint-disable-next-line @atlassian/tangerine/import/entry-points
import { colors } from '@atlaskit/theme';
import { CustomThemeButtonProps } from '@atlaskit/button/types';
import Button from '@atlaskit/button/custom-theme-button';

const customButtonTheme: any = (currentTheme: any, themeProps: any) => {
  const { buttonStyles, spinnerStyles } = currentTheme(themeProps);
  return {
    buttonStyles: {
      ...buttonStyles,
      background: colors.P400,
      '&[disabled]': {
        background: colors.N20A,
        color: colors.N70,
      },
    },
    spinnerStyles,
  };
};

export default (
  props: Omit<CustomThemeButtonProps, 'theme' | 'appearance'>,
) => {
  return <Button theme={customButtonTheme} appearance="primary" {...props} />;
};
