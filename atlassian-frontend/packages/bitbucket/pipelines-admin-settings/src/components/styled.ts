// eslint-disable-next-line import/no-extraneous-dependencies
import styled from '@emotion/styled';

import * as colors from '@atlaskit/theme/colors';
import { gridSize } from '@atlaskit/theme/constants';

export const Wrapper = styled.div`
  max-width: ${gridSize() * 85}px;
  padding: ${gridSize() * 2}px 0;
`;

export const ToggleWrapper = styled.div`
  padding: ${gridSize()}px ${gridSize()}px ${gridSize()}px ${gridSize() * 2}px;
  margin: ${gridSize() * 2}px 0;
  position: relative;
  border-top: 1px #ccc solid;
  border-bottom: 1px #ccc solid;

  & > section {
    display: flex;
    align-items: center;
    justify-content: space-between;
    & > span {
      cursor: pointer;
    }
  }
`;

export const ButtonWrapper = styled.div`
  a:hover,
  a:active {
    text-decoration: none;
    color: ${colors.N400};
  }
`;

export const Highlight = styled.p`
  border-left: 3px ${colors.Y500} solid;
  padding: ${gridSize()}px 0 ${gridSize()}px ${gridSize() * 2}px;
  margin-bottom: ${gridSize() * 2}px;
`;

export const Loading = styled.div`
  width: 100%;
  animation: fadein 0.25s ease-out;
  text-align: center !important;
  padding: ${gridSize() * 12}px 0 ${gridSize() * 12}px !important;
`;

export const Title = styled.strong`
  color: ${(props: { isPremium: boolean }) =>
    props.isPremium ? colors.N500 : colors.N70};
  display: block;
  font-size: 10px;
  margin: 0 0 8px;
`;

export const BranchMenuItem = styled.div`
  span {
    position: relative;
    top: 4px;
    margin-right: 4px;
    margin-top: -4px;
  }
`;
