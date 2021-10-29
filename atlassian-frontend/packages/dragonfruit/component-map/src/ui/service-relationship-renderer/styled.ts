import styled from 'styled-components';

export const Container = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
`;

export const ViewportButtonsContainer = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: flex-start;

  left: calc(100% - 64px);
  top: calc(100% - 64px);

  z-index: 9999;
`;
