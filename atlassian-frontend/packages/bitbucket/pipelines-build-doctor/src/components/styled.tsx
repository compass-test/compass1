// eslint-disable-next-line import/no-extraneous-dependencies
import styled from '@emotion/styled';

import * as colors from '@atlaskit/theme/colors';
import { gridSize } from '@atlaskit/theme/constants';

export const Wrapper = styled.div`
  color: ${colors.N800};
`;

export const Icon = styled.div`
  position: absolute;
  height: 100%;
  margin: -2px 0 0 -10px;
  color: ${colors.Y300};
`;

export const ContentWrapper = styled.div`
  margin-left: ${gridSize() * 2}px;
`;

export const LinksWrapper = styled.ul`
  padding-left: 0;
  margin-left: ${gridSize() * 2}px;
`;

export const FeedbackFooter = styled.div`
  height: ${gridSize() * 3}px;
  padding-top: ${gridSize() * 2}px;
`;

export const FeedbackText = styled.div`
  display: ${(props: any) => (props.isFeedbackSent ? 'block' : 'none')};
`;

export const FeedbackButtons = styled.div`
  display: ${(props: any) => (props.isFeedbackSent ? 'none' : 'block')};
  button {
    margin-left: ${gridSize()}px;
  }
`;

export const HighlightButton = {
  subtle: {
    background: {
      default: { light: colors.P300, dark: colors.P300 },
      hover: { light: colors.P400, dark: colors.P400 },
      selected: { light: colors.P500, dark: colors.P500 },
    },
    color: {
      default: { light: colors.Y200, dark: colors.Y200 },
    },
  },
};
