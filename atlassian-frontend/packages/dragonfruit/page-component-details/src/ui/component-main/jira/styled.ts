import styled from 'styled-components';

import { gridSize } from '@atlaskit/theme/constants';

export const Description = styled.div`
  margin-bottom: ${gridSize() * 4}px;
`;

export const SpinnerWrapper = styled.div`
  display: flex;
  justify-content: center;
  padding-top: ${gridSize() * 2}px;
`;

export const SearchIconWrapper = styled.div`
  margin-left: 5px;
`;

export const IssuesFilterExplanation = styled.div`
  padding-top: 16px;
`;
