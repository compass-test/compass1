import { Link } from 'react-resource-router';
import styled from 'styled-components';

import { text } from '@atlaskit/theme/colors';
import { gridSize } from '@atlaskit/theme/constants';

export const RowWrapper = styled.li`
  display: flex;
  align-items: center;
  & > :not(:last-child) {
    margin-bottom: ${gridSize() * 1.5}px;
  }
  & > :last-child {
    margin-bottom: ${gridSize() * 1}px;
  }
`;

export const StyledLink = styled(Link)`
  text-decoration: none;
  color: ${text};
  margin-left: ${gridSize()}px;

  &:focus,
  &:hover {
    color: ${text};
  }
`;
