import React from 'react';

import styled from 'styled-components';

import * as colors from '@atlaskit/theme/colors';
import { gridSize } from '@atlaskit/theme/constants';

export const PopupContentContainer = styled.div`
  width: 100%;
  height: 280px;
  padding: 1em;
  margin-top: ${gridSize()}px;
  box-sizing: border-box;
  box-shadow: rgba(9, 30, 66, 0.25) 0px 4px 8px -2px,
    rgba(9, 30, 66, 0.31) 0px 0px 1px;
  border-radius: 3px;

  &:focus {
    outline: 'none';
  }
`;

export const PopupComponent = (width: number = 0) => {
  const Component: React.FC<{}> = ({ children }) => (
    <PopupContentContainer
      style={{
        width: `${width}px`,
        background: 'white',
        padding: '0',
      }}
    >
      {children}
    </PopupContentContainer>
  );

  return Component;
};

export const ListContainer = styled.div`
  position: relative;
  height: 200px;
`;

export const List = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
  overflow: auto;
  max-height: 200px;
`;

export const ListItem = styled.li`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 0.5em;
  padding: 0.1em;
`;

export const ExcludedFromPlanTitle = styled.p`
  margin: 1em 0.5em !important;
`;

export const LoadingContainer = styled.div`
  display: flex;
  width: 100%;
  align-items: center;
  justify-content: center;
  padding: 1em;
  color: ${colors.N80};
`;

export const TriggerLoading = styled.div`
  display: flex;
  align-items: center;
`;
