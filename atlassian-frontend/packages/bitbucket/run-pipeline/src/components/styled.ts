import styled from 'styled-components';

// AFP-2532 TODO: Fix automatic suppressions below
// eslint-disable-next-line @atlassian/tangerine/import/entry-points
import { colors, gridSize } from '@atlaskit/theme';

export const Wrapper = styled.div``;

export const MessageWrapper = styled.div`
  margin: 0 0 ${gridSize() * 2}px;
`;

export const NoBrancheSelectorMessage = styled.div`
  margin: 0 0 ${gridSize() * 2}px;
`;

export const FooterButtons = styled.div`
  margin: ${gridSize() * 2}px 0;
  display: flex;
  justify-content: flex-end;
`;

export const SelectorWrapper = styled.div`
  width: 400px;
  display: inline-block;
  margin-right: ${gridSize}px;
  margin-bottom: ${gridSize() * 2}px;
`;

export const Label = styled.label`
  font-size: 12px;
  color: ${colors.subtleHeading};
  font-weight: 600;
  margin-top: ${gridSize() * 2}px;
  display: inline-block;
  margin-bottom: ${gridSize() * 0.5}px;
  margin-top: 0;
  width: 100%;
`;

export const VariablesWrapper = styled.div`
  margin-top: ${gridSize() * 2}px;

  table {
    border-top: 2px solid rgb(223, 225, 230);
  }

  tr:hover {
    background: ${colors.N10};
  }
`;

export const VariablesKeyColumn = styled.td`
  max-width: 200px;
`;

export const VariableKey = styled.div`
  padding: 0 10px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

export const Header = styled.span`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const Information = styled.div`
  flex: 1 0 auto;
  margin-left: ${gridSize() / 2}px;
  height: 22px;
`;

export const ScheduleGroup = styled.div`
  display: flex;
  align-items: flex-end;
  flex-wrap: wrap;
  & > div:last-of-type {
    width: 144px;
    margin: 0;
  }
  & > *,
  & > *:first-child {
    width: 120px;
    margin-right: ${gridSize()}px;
  }
  p {
    font-size: 11px;
    color: ${colors.N100};
    flex-basis: 100%;
  }
`;
