// eslint-disable-next-line import/no-extraneous-dependencies
import styled from 'styled-components';

// AFP-2532 TODO: Fix automatic suppressions below
// eslint-disable-next-line @atlassian/tangerine/import/entry-points
import { colors, gridSize } from '@atlaskit/theme';

export const SelectWrapper = styled.div`
  margin-top: 20px;
  width: 30%;
`;

export const Subsection = styled.div`
  margin-top: 24px;
  h5 {
    color: ${colors.N200};
  }
`;

export const Row = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 5px 0;
`;

export const NameCol = styled.div`
  width: 50%;
  margin-top: 15px;
`;

export const DescriptionCol = styled.div`
  width: 47%;
  margin-top: 15px;
`;

export const CopyButtonCol = styled.div`
  width: 3%;
  margin-top: 7px;
  padding-left: 10px;
`;

export const Hr = styled.hr`
  margin-top: 7px;
  width: 99.5%;
  left: 0px;
  position: absolute;
  border: solid 1px ${colors.N40};
`;

export const AccordionButton = styled.div<{ isExpanded: boolean }>`
  transform: translate3d(0, 0, 0);
  transform: ${props => props.isExpanded && 'rotateZ(90deg)'};
  transition: transform 0.2s ease-in-out;
  height: 32px;
  margin-top: 9px;
`;

export const ButtonContentWrapper = styled.div`
  display: flex;
  flex-direction: row;
  margin: -8px 0px 7px -10px;
`;

export const CopyTextIconContainer = styled.div`
  border-radius: 3px;
  width: ${gridSize() * 3}px;
  height: ${gridSize() * 3}px;
  cursor: pointer;
  margin-top: 3px;
  margin-right: 3px;
`;

export const CopyTextIcon = styled.div`
  padding-top: ${gridSize() * 0.7}px;
  padding-left: ${gridSize() * 0.5}px;
`;

export const Code = styled.div`
  margin: 14px 0;
  display: flex;
  justify-content: space-between;
  background-color: ${colors.N20};
`;
