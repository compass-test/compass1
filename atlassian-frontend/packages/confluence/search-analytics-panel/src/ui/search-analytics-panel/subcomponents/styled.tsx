import styled from 'styled-components';

import { ThemeProps, ThemeTokens } from '@atlaskit/button/types';
import { N20, N200, N800 } from '@atlaskit/theme/colors';
import { fontSizeSmall } from '@atlaskit/theme/constants';
import * as elevation from '@atlaskit/theme/elevation';
import { h300 } from '@atlaskit/theme/typography';

export const Container = styled.div`
  ${elevation.e100};
  width: 400px;
  padding-bottom: 24px;
`;

export const Title = styled.h4`
  ${h300()};
  padding: 24px;
  padding-bottom: 16px;
  color: ${N800};
  text-transform: uppercase;
`;

export const buttonTheme:
  | ((
      current: (props: ThemeProps) => ThemeTokens,
      props: ThemeProps,
    ) => ThemeTokens)
  | undefined = (
  currentTheme: (props: ThemeProps) => ThemeTokens,
  themeProps: ThemeProps,
) => {
  const { buttonStyles, spinnerStyles } = currentTheme(themeProps);
  return {
    buttonStyles: {
      ...buttonStyles,
      height: '36px',
      width: '100%',
      '&:hover': {
        backgroundColor: `${N20}`,
      },
    },
    spinnerStyles,
  };
};

export const StyledFormattedMessage = styled.div`
  text-align: center;
  width: 50%;
  white-space: initial;
  color: ${N200};
  font-size: ${fontSizeSmall()};
  line-height: 14px;
`;
