import styled from '@emotion/styled';

export const LegendContainer = styled.div`
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
`;

export const LegendItem = styled.div`
  display: flex;
  align-items: center;
  cursor: pointer;
  margin-left: 8px;
  margin-right: 8px;
  margin-bottom: 8px;
`;

export const LegendSvg = styled.div`
  width: 24px;
  height: 24px;
`;
export const LegendLabel = styled.div`
  flex: 1;
  display: inline-flex;
  flex-direction: column;
  user-select: none;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
  margin-left: 8px;
`;

export const LegendLabelText = styled.div<{ bold: boolean }>`
  font-weight: ${(props) => (props.bold ? 500 : 'normal')};
  user-select: none;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
`;

export const HiddenLegendLabelTextToReserveBoldWidthOnly = styled.div`
  font-weight: 500;
  user-select: none;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
  visibility: hidden;
  height: 0;
  @media speech {
    display: none;
  }
`;
