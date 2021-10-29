import styled from 'styled-components';

// eslint-disable-next-line @atlassian/tangerine/import/entry-points
import { colors, gridSize, typography } from '@atlaskit/theme';

export const Wrapper = styled.div`
  display: flex;
  align-items: center;
  position: relative;
  background-color: ${colors.B400};
  padding: ${gridSize() * 2}px ${gridSize() * 4}px ${gridSize() * 2}px;
`;

export const ContentWrapper = styled.div`
  width: 360px;
  padding-right: ${gridSize() * 4}px;
`;

export const Title = styled.h2`
  ${typography.h800()};
  color: ${colors.N0};
`;

export const SubText = styled.p`
  color: ${colors.N0};
`;

export const HeroImg = styled.img`
  width: 248px;
  position: relative;
  top: 42px;
`;

export const CloseIconButton = styled.div`
  cursor: pointer;
  position: absolute;
  top: ${gridSize() * 0.5}px;
  right: ${gridSize() * 0.5}px;
`;
