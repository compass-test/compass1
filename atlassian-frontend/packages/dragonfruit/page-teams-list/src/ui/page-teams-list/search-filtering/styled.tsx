import styled from '@emotion/styled';

import { gridSize } from '@atlaskit/theme/constants';

export const Container = styled.div`
  display: flex;
  flex-direction: row;
  padding-bottom: ${gridSize() * 4}px;
`;

export const SearchFieldWrapper = styled.div`
  width: ${gridSize() * 40}px;
`;

export const YourTeamsWrapper = styled.div`
  margin-left: ${gridSize()}px;
`;
