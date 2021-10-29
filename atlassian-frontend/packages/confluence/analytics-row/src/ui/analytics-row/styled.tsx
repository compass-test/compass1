import React, { Ref } from 'react';

import styled from 'styled-components';

import { ThemeProps, ThemeTokens } from '@atlaskit/button/types';
import { N20, N200, N20A, N30, N600 } from '@atlaskit/theme/colors';
import { fontSize, fontSizeSmall } from '@atlaskit/theme/constants';
import * as elevation from '@atlaskit/theme/elevation';
import { h300 } from '@atlaskit/theme/typography';

export const ExampleContainer = styled.div`
  ${elevation.e100};
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  border-radius: 3px;
`;

export const MetricsCellValue = styled.div`
  ${h300()};
  margin-top: 0;
  display: flex;
  flex-direction: row-reverse;
  align-items: center;
  padding-left: 54px;
`;

export const MetricsCellUnit = styled.div`
  display: flex;
  flex-direction: row-reverse;
  font-size: ${fontSizeSmall()}px;
  font-weight: 400;
  line-height: 14px;
  color: ${props => props.color};
`;

export const MetricsColumn = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const EntityColumn = styled.div`
  display: flex;
  flex-direction: column;
  height: 48px;
  margin-top: 12px;
  min-width: 0px;
`;

export const EntityRow = styled.div`
  display: flex;
  align-items: center;
  min-width: 0;
`;

export const EntityName = styled.p`
  display: block;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
  font-size: ${fontSize()}px;
  font-weight: 400;
  line-height: 20px;
  text-align: left;
  color: ${props => props.color};
`;

export const EntitySubname = styled.p`
  display: flex;
  font-weight: 400;
  line-height: 14px;
  font-size: ${fontSizeSmall()}px;
  font-weight: 400;
  color: ${N200};
  margin-top: 0;
`;

export const Row = styled.div`
  display: flex;
  flex-direction: row;
  border-radius: 3px;
  margin: 0 8px;
`;

export const StyledFooter = styled.div`
  border-top: 2px solid ${N30};
`;

export const StyledAvatar = styled.div`
  display: flex;
  align-items: center;
  padding-right: 12px !important;
  min-width: 24px;
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

export const StyledRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  min-width: 0;
`;

export const ReadOnlyRow = styled.div`
  padding: 0px 12px;
  height: 48px;
  width: 100%;
  display: grid;
`;

export const StyledAnalyticsIconOnHover = styled.div`
  background-color: ${N20A};
  width: 36px;
  height: 36px;
`;

export const StyledAnalyticsIcon = styled.span`
  & > span {
    display: contents;
  }
`;

export const rowTheme: (
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
      height: '48px',
      width: '100%',
      alignItems: 'center',
      '&:hover': {
        backgroundColor: `${N20}`,
      },
    },
    spinnerStyles,
  };
};

export const ForwardedRefToolTipTag = React.forwardRef(
  (props, ref: Ref<any>) => {
    const { children, ...rest } = props;
    return (
      <div {...rest} style={{ minWidth: 0, alignContent: 'center' }} ref={ref}>
        {children}
      </div>
    );
  },
);
