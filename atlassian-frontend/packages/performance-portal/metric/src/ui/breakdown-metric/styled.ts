import styled from '@emotion/styled';

import * as colors from '@atlaskit/theme/colors';

export const LoadingContainer = styled.div`
  height: 450px;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const DataUnavailableContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  color: ${colors.N200};
`;

export const ErrorImg = styled.img`
  box-sizing: border-box;
  height: 450px;
  width: 100%;
  padding: 50px;
`;

export const ControlsContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  width: 100%;
  & > div,
  & > button {
    margin-left: 4px;
  }
`;
