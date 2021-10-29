import styled from 'styled-components';

import * as colors from '@atlaskit/theme/colors';
import {
  borderRadius as akBorderRadius,
  gridSize as akGridSize,
} from '@atlaskit/theme/constants';
import * as elevation from '@atlaskit/theme/elevation';
import * as typography from '@atlaskit/theme/typography';

const borderRadius = akBorderRadius();
const gridSize = akGridSize();

export const Wrapper = styled.div`
  background: ${colors.N0};
  margin-bottom: ${3 * gridSize}px;
  padding: ${2 * gridSize}px;
  border-radius: ${borderRadius + 1}px;
  line-height: 20px;
  ${elevation.e100};
  transition: height 2000ms;

  &:last-child {
    margin-bottom: 0;
  }
`;

export const HeadingWrapper = styled.div`
  position: relative;
  padding: 0 ${5 * gridSize}px;
  ${typography.h400()};
  margin-top: 0;
`;

export const Heading = styled.h4`
  ${typography.h400()};
  color: ${colors.N800};
  font-weight: 500;
  margin-top: 0;
`;

export const StatusIconWrapper = styled.div`
  display: block;
  width: ${3 * gridSize}px;
  height: ${3 * gridSize}px;
  position: absolute;
  left: 0;
  top: 50%;
  border-radius: 12px;
  transform: translateY(-50%);
`;

export const ButtonWrapper = styled.div`
  display: block;
  position: absolute;
  right: 0;
  top: 50%;
  transform: translateY(-50%);
`;
