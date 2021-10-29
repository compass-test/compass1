import styled from 'styled-components';

// AFP-2532 TODO: Fix automatic suppressions below
// eslint-disable-next-line import/no-extraneous-dependencies
// eslint-disable-next-line @atlassian/tangerine/import/entry-points
import { colors, gridSize } from '@atlaskit/theme';

export const NameRow = styled.div`
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
  padding: ${gridSize() * 1.25}px 0;
`;

export const ActionWrapper = styled.div`
  padding: ${gridSize()}px ${gridSize() * 1.5}px ${gridSize()}px
    ${gridSize() * 1.5}px;
  height: 24px;
  width: 24px;
  border-radius: 3px;
  :hover {
    background-color: ${colors.N20A};
  }
`;

export const TagGroupWrapper = styled.div`
  background: ${colors.backgroundHover};
  opacity: 100%;
  border-radius: 4px;
  padding: ${gridSize() * 0.5}px;
`;

export const LabelPopupContainer = styled.div`
  width: 230px;
  overflow: auto;
  padding: 10px 16px;
`;

export const LabelPopupHeading = styled.div`
  display: flex;
  p {
    color: ${colors.N200};
    font-size: 11px;
    line-height: 16px;
    margin-top: 5px;
  }
`;

export const LabelWrapper = styled.div`
  p {
    margin-top: 6px;
    color: ${colors.N200};
    font-size: 14px;
    line-height: 20px;
  }
`;

export const CopyButtonWrapper = styled.div`
  margin-left: 210px;
  position: absolute;
  float: right;
`;

export const ActionButton = styled.div`
  :hover {
    background-color: ${colors.backgroundHover};
  }
  margin: ${gridSize() * 0.4}px 0px;
  width: ${gridSize() * 9}px;
  padding: ${gridSize() * 0.5}px 14px;
`;

export const ButtonGroup = styled.div`
  margin: -${gridSize() * 2}px 0px -${gridSize() * 2}px -${gridSize() * 3}px;
  width: ${gridSize() * 9.5}px;
`;

export const CopyTextIconContainer = styled.div`
  border-radius: 3px;
  width: ${gridSize() * 3}px;
  height: ${gridSize() * 3}px;
  cursor: pointer;
  background-color: ${colors.N30};
`;

export const CopyTextIcon = styled.div`
  padding-top: ${gridSize() * 0.5}px;
  padding-left: ${gridSize() * 0.5}px;
`;
