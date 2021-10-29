import styled from 'styled-components';
// AFP-2532 TODO: Fix automatic suppressions below
// eslint-disable-next-line @atlassian/tangerine/import/entry-points
import { colors, gridSize } from '@atlaskit/theme';

export const InfoIconWrapper = styled.span`
  color: ${colors.B500};
`;

export const LearnMoreBannerContainer = styled.div`
  display: flex;
  justify-content: space-between;
  border-bottom: 2px solid ${colors.N20};
  padding: ${gridSize() * 1.5}px 0px;
`;

export const CrossIconWrapper = styled.div`
  display: flex;
  align-items: center;
  cursor: pointer;
  fill: ${colors.N500};
`;

export const Body = styled.div`
  display: flex;
  align-items: center;
`;

export const TextContainer = styled.div`
  margin-left: 10px;
  margin-right: 4px;
`;

export const Link = styled.a`
  cursor: pointer;
`;
