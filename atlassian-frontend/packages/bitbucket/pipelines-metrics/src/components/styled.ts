import styled from 'styled-components';

import * as colors from '@atlaskit/theme/colors';
import { gridSize } from '@atlaskit/theme/constants';

export const Wrapper = styled.div`
  border: 1px ${colors.N20} solid;
  border-radius: 4px;
  padding: 20px;
  color: ${colors.N0};
`;

export const Header = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  h3 {
    color: ${colors.N0};
    font-weight: 400;
  }
`;

export const TooltipWrapper = styled.div`
  background: ${colors.N20};
  border-radius: 3px;
  color: ${colors.N800};
  padding: 2px 6px;
`;

export const TooltipItem = styled.div`
  &:first-letter {
    text-transform: capitalize;
  }
`;

export const MetricsChartWrapper = styled.div`
  display: flex;
  height: 280px;
  font-size: 12px;
`;

export const themeAreaColors = [
  colors.B200,
  colors.P200,
  colors.G200,
  colors.T200,
  colors.Y200,
  colors.R200,
  colors.N200,
];

export const themeMetricButton = (currentTheme: any, themeProps: any) => {
  const { buttonStyles, ...rest } = currentTheme(themeProps);
  return {
    buttonStyles: {
      ...buttonStyles,
      color: colors.N0,
      background: themeProps.isSelected ? themeProps.className : colors.N60,
    },
    ...rest,
  };
};

export const ContainerStateWrapper = styled.div`
  display: flex;
  align-items: center;
`;

export const EmptyScreenWrapper = styled.div`
  padding: 20px;
  color: ${colors.N0};
  text-align: center;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;

  h3 {
    color: ${colors.N0};
    width: 100%;
    margin-bottom: ${gridSize() * 3}px;
  }
`;

export const MetricsOnboardingWrapper = styled.div`
  margin: 0 -24px;
`;

export const MetricsOnboardingHeader = styled.div`
  background: ${colors.P50};
  margin-top: -2px;
  border-radius: 3px 3px 0 0;
  height: 213px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const MetricsOnboardingMessage = styled.div`
  padding: ${gridSize() * 8}px ${gridSize() * 4}px 0;
  height: ${gridSize() * 20}px;
  text-align: center;
  h3 {
    margin-bottom: ${gridSize() * 3}px;
  }
`;

export const MetricsOnboardingButtons = styled.div`
  display: flex;
  justify-content: center;

  button[data-testid='metrics-button'] {
    background: ${colors.P400};
  }
`;
