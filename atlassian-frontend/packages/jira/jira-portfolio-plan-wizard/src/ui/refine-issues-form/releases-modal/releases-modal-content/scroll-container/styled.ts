import styled from 'styled-components';

import * as colors from '@atlaskit/theme/colors';

export const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  overflow: hidden;
  position: relative;
`;

export const ScrollContainer = styled.div`
  height: 100%;
  overflow-y: auto;
  position: relative;
`;

export const ScrollHint = styled.hr<{ visible: boolean }>`
  position: absolute;
  bottom: -10px;
  box-shadow: ${(props) =>
    props.visible ? `0px -4px 8px 0px ${colors.N80A}` : 'none'};
  width: 100%;
  box-sizing: border-box;
  border: 0.5px solid ${colors.N30A};
  transition: box-shadow 350ms ease;
`;
