import styled from 'styled-components';

// AFP-2532 TODO: Fix automatic suppressions below
// eslint-disable-next-line @atlassian/tangerine/import/entry-points
import { gridSize } from '@atlaskit/theme';
import { B100, N30, N30A, N800 } from '@atlaskit/theme/colors';

export const ItemContainer = styled.button`
  display: flex;
  box-sizing: border-box;
  align-items: baseline;
  width: 100%;
  height: fit-content;
  min-height: ${gridSize() * 6}px;
  padding: ${gridSize()}px;
  margin-bottom: ${gridSize()}px;
  background-color: ${N30};
  border: 2px solid rgba(0, 0, 0, 0);
  outline: none;
  color: ${N800};

  cursor: pointer;

  &:hover,
  &:active {
    background-color: ${N30A};
    border: 2px solid rgba(0, 0, 0, 0);
    color: ${N800};
    text-decoration: none;
  }

  &:focus {
    border: 2px solid ${B100};
    border-radius: 4px;
    box-shadow: none;
  }
`;

export const IconRing = styled.div`
  display: flex;
  flex-shrink: 0;
  align-items: center;
  justify-content: center;
  box-sizing: content-box;
  width: ${gridSize() * 4}px;
  height: ${gridSize() * 4}px;
  border-radius: 50%;
  overflow: hidden;
  background-color: rgba(255, 255, 255, 1);
  text-align: center;
`;

export const Label = styled.p`
  margin: 0;
  padding-left: ${gridSize()}px;
  text-align: left;
  align-self: center;
  font-size: 14px;
`;
