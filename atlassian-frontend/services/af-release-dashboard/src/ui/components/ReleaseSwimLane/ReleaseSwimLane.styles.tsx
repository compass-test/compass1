import styled from 'styled-components';
import { B400, N10, N30, N800 } from '@atlaskit/theme/colors';

export const SwimLaneComponentContainer = styled.div`
  display: flex;
  flex-direction: column;
  border-radius: 1em;
  flex-grow: 1;
  max-width: 30vw;
  min-width: 300px;
  flex-basis: auto;
  flex-shrink: 0;
  margin: 0 5px;
  padding: 5px 0;
  background: ${N10};
  border: 1px solid ${N30};
  height: 100%;
  align-items: start;
  width: calc(100% - 10px);
  overflow: auto;
`;

export const LaneHeader = styled.a`
  display: flex;
  top: 25%;
  bottom: 100%;
  color: ${N800};
  font-size: 17px;
  line-height: 20px;
  padding: 5px 10px 10px;
  font-weight: bold;
  align-items: center;
  outline: none !important;

  &:hover {
    color: ${B400};
    text-decoration: none;
  }
`;
export const ScrollableContainer = styled.div`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  flex-basis: auto;
  flex-shrink: 0;
  padding: 0px 5px;
  align-self: center;
  height: calc(100% - 66px);
  overflow-y: auto;
  width: calc(100% - 10px);
  border-radius: 6px;

  ::-webkit-scrollbar {
    width: 5px;
  }

  ::-webkit-scrollbar-track {
    background: #fff;
  }

  ::-webkit-scrollbar-thumb {
    background: #bbb;
    border-radius: 1px;
  }

  ::-webkit-scrollbar-thumb:hover {
    background: #555;
  }
`;

export const ColumnHeadingContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: calc(100% - 30px);
  font-size: 12px;
  padding: 5px 15px;
`;

export const ColumnHeading = styled.div`
  font-weight: bold;
`;
