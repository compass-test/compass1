import styled from 'styled-components';

import * as colors from '@atlaskit/theme/colors';

// AKSelect/ReactSelect is just very hard to style
export const CONTROLS_HEIGHT = 32;
export const AK_SELECT_PADDING_ADJUST = 4;
const CONTROLS_PADDING = '1.8rem';

export const Container = styled.div`
  width: 100%;
  height: 100%;
  overflow: hidden;
  position: relative;
`;

export const Description = styled.p`
  box-sizing: border-box;
  padding: ${CONTROLS_PADDING};
`;

export const ControlsContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: white;
  height: ${CONTROLS_HEIGHT}px;
  position: -webkit-sticky;
  position: sticky;
  top: 0;
  z-index: 2;
  padding: ${CONTROLS_PADDING};
  box-sizing: border-box;

  > *:first-child {
    flex: 0.7 !important;
  }
`;

export const SearchContainer = styled.span`
  width: 55%;
  display: flex;

  > *:first-child {
    flex: 0 0 140px !important;
    margin-right: 3px;
  }
`;

export const ProjectSelectContainer = styled.div`
  button {
    width: 140px !important;
    > span:first-child {
      text-align: left;
      width: 100%;
    }
  }
`;

export const Column = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const ProjectTitle = styled(Column)`
  & > img {
    width: 20px;
    height: 20px;
    border-radius: 3px;
    margin-right: 0.5em;
  }

  line-height: 1.5rem;
`;

export const TableTreeContainer = styled.div`
  [role='gridcell'] {
    padding: 10px 25px;
  }
  [aria-controls] {
    padding-top: 2px;
  }
  [role='rowgroup'] {
    max-height: ${({ maxHeight }: { maxHeight?: number }) =>
      maxHeight ? +`${maxHeight}px` : 'auto'};
    overflow: auto;
  }
  [role='treegrid'] {
    /* this is the header */
    > [role='row']:first-child {
      position: -webkit-sticky;
      position: sticky;
      top: calc(${CONTROLS_PADDING}*2);
      z-index: 1;
      background: white;
    }
  }
  z-index: 0;
`;

export const ScrollContainer = styled.div`
  height: 100%;
  overflow-y: auto;
  position: relative;
`;

export const ScrollHint = styled.hr<{ show: boolean }>`
  position: absolute;
  bottom: -10px;
  box-shadow: ${(props) =>
    props.show ? `0px -4px 8px 0px ${colors.N80A}` : 'none'};
  width: 100%;
  box-sizing: border-box;
  border: 0.5px solid ${colors.N30A};
  transition: box-shadow 350ms ease;
`;

export const LoadingContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 5em;
`;
