import styled from 'styled-components';

import { borderRadius, gridSize } from '@atlaskit/theme/constants';
import { h500 } from '@atlaskit/theme/typography';

export const Wrapper = styled.section`
  border-radius: ${borderRadius()}px;
  padding: ${gridSize() * 2}px ${gridSize() * 2.5}px;
  box-shadow: 0px 0px 1px rgba(9, 30, 66, 0.31),
    0px 1px 1px rgba(9, 30, 66, 0.25);
`;

export const TitleWrapper = styled.div`
  display: flex;
  align-items: center;
  padding-bottom: ${gridSize()}px;
`;

export const TaskName = styled.h1`
  ${h500};
  margin: 0;
`;

export const StatusIcon = styled.div`
  width: ${gridSize() * 5}px;
  line-height: 1;
`;

export const SpinnerWrapper = styled.div`
  margin: ${gridSize() * 4}px 0;
  text-align: center;
`;

export const TaskCardButtonsWrapper = styled.div`
  margin-top: ${gridSize()}px;
`;

export const LozengeWrapper = styled.span`
  margin-left: 0.5em;
`;
