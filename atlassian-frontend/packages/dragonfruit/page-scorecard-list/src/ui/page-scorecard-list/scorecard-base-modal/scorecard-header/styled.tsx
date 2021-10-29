import styled from 'styled-components';

import { gridSize } from '@atlaskit/theme/constants';

export const DescriptionWrapper = styled.div`
  margin-bottom: ${gridSize() * 3}px;
`;

export const NameWrapper = styled.div`
  margin-bottom: ${gridSize() * 2}px;
  margin-top: ${gridSize() * 3}px;
`;

export const SettingsWrapper = styled.div`
  display: flex;
  width: 100%;

  & > :not(:last-child) {
    margin-right: auto;
  }

  &:last-child {
    margin-right: 0px;
  }
`;

export const ErrorWrapper = styled.div`
  margin-top: 8px;
`;
