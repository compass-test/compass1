import styled from 'styled-components';

import { gridSize } from '@atlaskit/theme/constants';

export const SelectLabelContainer = styled.div`
  display: flex;
  align-items: center;
`;

export const SelectLabel = styled.span`
  padding-left: ${gridSize()}px;
`;

export const SelectContainer = styled.span`
  display: block;
  margin-bottom: 12px;
`;

export const ButtonGroupWrapper = styled.div`
  margin: ${gridSize()}px 0;
`;
