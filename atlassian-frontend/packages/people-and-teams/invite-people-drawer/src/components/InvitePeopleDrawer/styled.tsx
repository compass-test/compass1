import styled from 'styled-components';
import { gridSize } from '@atlaskit/theme/constants';
import { N0, N10 } from '@atlaskit/theme/colors';

const gridSizeTimes = (n: number) => n * gridSize();

export const Wrapper = styled.div`
  display: inline-flex;
  align-content: center;
  justify-content: center;
  align-self: center;
  width: 100%;
`;

export const ImageWrapper = styled.div`
  align-self: center;
  margin-right: ${gridSizeTimes(10)}px;
  margin-top: ${gridSizeTimes(5)}px;

  height: 100%;
  max-height: 560px;
  width: 50%;
  max-width: 543px;
`;

export const InviteWrapperSpace = styled.div`
  margin-top: ${gridSizeTimes(10)}px;
  align-self: flex-start;
  display: inline-flex;
  width: 50%;
  max-width: 543px;
`;

export const InviteWrapper = styled.div`
  box-sizing: border-box;
  border-radius: ${gridSize() / 2}px;
  box-shadow: 0 0 1px rgba(9, 30, 66, 0.31), 0 3px 5px rgba(9, 30, 66, 0.2);
  background-color: ${N0};
  min-width: 402px;
`;

export const overrideDrawerSidebarStyles = {
  backgroundColor: N10,
  paddingTop: gridSize(),
};

export const overrideDrawerContentStyles = {
  backgroundColor: N10,
  marginTop: 0,
  display: 'flex',
  alignContent: 'center',
  justifyContent: 'center',
};
