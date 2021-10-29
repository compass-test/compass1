import styled from 'styled-components';

// AFP-2532 TODO: Fix automatic suppressions below
// eslint-disable-next-line @atlassian/tangerine/import/entry-points
import { colors, elevation, gridSize, typography } from '@atlaskit/theme';

const spacing = gridSize() * 2;
const imageWidth = 62;

export const CardContainer = styled.div`
  ${elevation.e200()}
  background-color: ${colors.N0};
  background-position: ${spacing}px center;
  background-repeat: no-repeat;
  background-size: ${imageWidth}px;
  min-width: 300px;
  border-radius: 3px;
  position: relative;
  padding: ${spacing * 1.5}px;
  padding-left: ${imageWidth + spacing * 2}px;
`;

export const Title = styled.strong`
  ${typography.h400()}
  display: block;
  margin: 0 0 ${spacing / 2}px 0;
`;

export const Text = styled.span`
  color: ${colors.text};
  margin: ${spacing / 2}px 0 0;
`;

export const Name = styled.strong`
  ${typography.h100()}
  display: block;
  margin: 0 0 ${gridSize()}px 0;
`;

export const Wrapper = styled.div`
  margin-top: ${spacing}px;
  &:first-of-type {
    margin: 0;
  }
`;
