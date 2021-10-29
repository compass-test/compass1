import styled from 'styled-components';

import * as colors from '@atlaskit/theme/colors';
import { gridSize } from '@atlaskit/theme/constants';
import { h100 } from '@atlaskit/theme/typography';
import { lineClamp } from '@atlassian/dragonfruit-common-ui';

export const DetailsWrapper = styled.div`
  display: flex;

  & > :not(:last-child) {
    margin-right: ${gridSize() * 2}px;
  }
`;

export const LabelCommon = styled.div`
  ${h100()}
  color: ${colors.heading};
`;

export const WrapperCommon = styled.div`
  flex: 1;
`;

export const OwnerContent = styled.div`
  display: flex;
  align-items: center;
  justify-content: start;
  margin-top: ${gridSize()}px;
`;

export const OwnerName = styled.div`
  color: ${colors.N500};
  margin-left: ${gridSize() * 0.5}px;
  font-size: 12px;
`;

export const NoOwner = styled.div`
  color: ${colors.N500};
  font-size: 12px;
`;

export const ComponentTypeContent = styled.div`
  display: flex;
  align-items: center;
  justify-content: start;
  margin-top: ${gridSize()}px;
`;

export const ComponentName = styled.div`
  color: ${colors.N400};
  margin-left: ${gridSize()}px;
  font-size: 12px;
  font-weight: 400;
  ${lineClamp(2)};
`;

export const ImportanceContent = styled.div`
  display: flex;
  align-items: center;
  justify-content: start;
  margin-top: ${gridSize()}px;
  // need this to adjust the spacing that comes inbuilt
  // around the star icon to make it align with the label
  margin-left: -4px;
`;

export const ImportanceDescription = styled.div`
  color: ${colors.N400};
  margin-left: ${gridSize() * 0.25}px;
  font-size: 12px;
  font-weight: 400;
  align-self: center;
`;
