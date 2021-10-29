import styled from 'styled-components';

import { G300, N20, R400 } from '@atlaskit/theme/colors';
import { gridSize } from '@atlaskit/theme/constants';
import { h700 } from '@atlaskit/theme/typography';

export const MainWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: ${gridSize() * 5}px;
`;

export const Heading = styled.div`
  ${h700};
  margin-top: ${gridSize() * 0.5}px;
  margin-bottom: ${gridSize()}px;
`;

export const Description = styled.div`
  margin-bottom: ${gridSize() * 2}px;
`;

export const ProgressBarWrapper = styled.div`
  width: 700px;
  margin-bottom: ${gridSize() * 5}px;
`;

export const SpinnerWrapper = styled.div`
  margin-top: ${gridSize() * 5}px;
  margin-bottom: ${gridSize() * 5}px;
`;

export const Body = styled.div`
  width: 450px;
  border-radius: 4px;
  background-color: ${N20};
  padding: ${gridSize() * 2}px;
  margin-bottom: 40px;
`;

export const ButtonContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  width: 450px;
`;

export const SuccessIconWrapper = styled.span`
  color: ${G300};
`;

export const ErrorIconWrapper = styled.span`
  color: ${R400};
`;
