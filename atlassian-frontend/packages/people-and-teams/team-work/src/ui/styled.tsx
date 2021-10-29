import styled, { css } from 'styled-components';

import * as colors from '@atlaskit/theme/colors';
import { borderRadius } from '@atlaskit/theme/constants';
import * as elevation from '@atlaskit/theme/elevation';
import * as typography from '@atlaskit/theme/typography';

import { gridSizeTimes } from '../utils';

export const PanelContent = styled.div`
  margin-bottom: ${gridSizeTimes(4)}px;
`;

export const PanelContentHeader = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

export const PanelContentTitle = styled.h4`
  ${typography.h500};
  margin-top: 0;
  margin-bottom: ${gridSizeTimes(1)}px;
  word-break: break-all;
`;

export const PanelContentWrapper = styled.div`
  background: ${colors.N20};
  border-radius: ${borderRadius}px;
  padding: ${gridSizeTimes(1)}px;
`;

export const PanelContentBody = styled.div`
  background: ${colors.N0};
  border-radius: ${borderRadius}px;
  ${elevation.e100};
  margin: ${gridSizeTimes(1)}px 1px auto 1px;
  padding: ${gridSizeTimes(2)}px ${gridSizeTimes(1)}px;
`;

export const smallTextTypography = css`
  color: ${colors.N200};
  font-size: 12px;
  line-height: ${14 / 12};
`;

export const PanelInfoText = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  margin-top: ${gridSizeTimes(1)}px;
  ${smallTextTypography};
`;
