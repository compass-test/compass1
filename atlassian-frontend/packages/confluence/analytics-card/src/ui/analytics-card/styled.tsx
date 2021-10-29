import styled from 'styled-components';

import { ThemeProps, ThemeTokens } from '@atlaskit/button/types';
import { N20, N30, N600, N800 } from '@atlaskit/theme/colors';
import * as elevation from '@atlaskit/theme/elevation';
import { h600 } from '@atlaskit/theme/typography';

export const Container = styled.div`
  ${elevation.e100};
  height: 340px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  border-radius: 3px;
`;

export const Title = styled.h4`
  ${h600()};
  padding-top: 24px;
  padding-bottom: 16px;
  padding-left: 18px;
  color: ${N800};
`;

export const StyledFooter = styled.div`
  border-top: 2px solid ${N30};
`;

export const StyledFormattedMessage = styled.div`
  text-align: center;
  width: 50%;
  white-space: initial;
  color: ${N600};
`;

export const StyledNoDataMessage = styled.div`
  margin-top: 94px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const fullWidthTheme: (
  current: (props: ThemeProps) => ThemeTokens,
  props: ThemeProps,
) => ThemeTokens = (
  currentTheme: (props: ThemeProps) => ThemeTokens,
  themeProps: ThemeProps,
) => {
  const { buttonStyles, spinnerStyles } = currentTheme(themeProps);
  return {
    buttonStyles: {
      ...buttonStyles,
      width: '100%',
      height: '48px',
      paddingTop: '8px',
      '&:hover': {
        backgroundColor: `${N20}`,
      },
    },
    spinnerStyles,
  };
};
