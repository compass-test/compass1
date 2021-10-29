import styled from '@emotion/styled';

import { N0 } from '@atlaskit/theme/colors';

export const Container = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
`;

export const SpotlightContainer = styled.div`
  display: flex;
  flex-grow: 1;
  flex-direction: row;
  justify-content: flex-start;
`;

export const TrendsLoadingContainer = styled.div`
  height: 81px;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const TrendDetails = styled.div`
  min-width: 90px;
  margin-right: 17px;
  display: flex;
  flex-grow: 0;
  flex-direction: column;
  > * {
    text-align: center;
  }
  > *:not(:first-child) {
    margin-top: 16px;
  }
`;

export const CohortLozengeWrapper = styled.span`
  > span {
    width: 100%;
    color: ${N0};
    background-color: ${(props) => props.color};
  }
`;

export const ErrorImg = styled.img`
  box-sizing: border-box;
  height: 81px;
  width: 100%;
`;
