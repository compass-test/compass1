import { CSSProperties } from 'react';

import styled from 'styled-components';

// AFP-2532 TODO: Fix automatic suppressions below
// eslint-disable-next-line @atlassian/tangerine/import/entry-points
import { gridSize } from '@atlaskit/theme';

import { StateProps } from '../types';

export const Wrapper = styled.div`
  display: flex;
  & > div {
    margin-right: ${gridSize()}px;
  }
`;

export const SearchFieldWrapper = styled.div`
  width: ${gridSize() * 20}px;
  button {
    height: auto;
  }
`;

export const SearchIconWrapper = styled.div`
  display: flex;
  margin-right: 6px;
`;

export const ButtonWrapper = styled.div`
  margin-right: 6px;
`;

export const UsersFilterWrapper = styled.div`
  display: flex;
  align-items: center;
  padding-right: ${gridSize() * 2}px;
  position: relative;
  &::before {
    content: '';
    position: absolute;
    top: 50%;
    height: ${gridSize() * 2}px;
    transform: translateY(-50%);
    width: 1px;
    right: 0;
    background: rgb(223, 225, 230);
  }
`;

export const subtleSelector = (css: CSSProperties, state: StateProps) => ({
  backgroundColor: state.isFocused ? css.backgroundColor : 'transparent',
  borderColor: state.isFocused ? css.borderColor : 'transparent',
});

export const BranchesListWrapper = styled.div`
  margin-left: ${gridSize()}px;
  min-width: 180px;
`;

export const BranchItem = styled.div`
  display: flex;
  align-items: center;
`;

export const BranchName = styled.div`
  flex: 1;
  margin-left: 4px;
`;

export const StyledList = styled.div`
  max-height: ${gridSize() * 38}px;
  min-height: ${gridSize() * 12}px;
  padding: 4px;
  overflow-y: auto;
  overflow-x: hidden;
  position: relative;
  scroll-behavior: smooth;
`;
export const SpinnerWrapper = styled.div`
  display: flex;
  justify-content: center;
  min-height: ${gridSize() * 4}px;
`;
