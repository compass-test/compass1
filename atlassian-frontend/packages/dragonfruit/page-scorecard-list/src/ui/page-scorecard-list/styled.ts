import styled from 'styled-components';

import { HORIZONTAL_GLOBAL_NAV_HEIGHT } from '@atlaskit/atlassian-navigation';
import { gridSize } from '@atlaskit/theme/constants';

export const BodyWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(224px, 389px));
  gap: ${gridSize() * 2}px;
`;

export const TopNavWrapper = styled.div`
  display: flex;
  & > :not(:last-child) {
    margin-right: ${gridSize() * 4}px;
  }
`;

export const SearchBar = styled.div`
  flex: 1;
  max-width: 25%;
`;

export const Wrapper = styled.div`
  margin-left: ${gridSize() * 2}px;
  padding-left: ${gridSize() * 2}px;
  padding-top: ${gridSize()}px;
  && {
    margin-top: ${gridSize() * 0.5}px;
  }
  height: calc(100vh - ${HORIZONTAL_GLOBAL_NAV_HEIGHT}px);
`;

export const ErrorStateWrapper = styled.div`
  margin: ${gridSize() * 6}px auto;
  margin-top: 100px;
`;

export const SpinnerWrapper = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  display: flex;
  align-items: center;
  justify-content: center;
`;
