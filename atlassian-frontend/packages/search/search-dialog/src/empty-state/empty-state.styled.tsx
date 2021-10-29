import styled from '@emotion/styled';
import { grid, primaryTextColour } from '../style-utils';

export const Title = styled.div`
  position: relative;
  font-size: 16px;
  line-height: 20px;
  color: ${primaryTextColour};
`;

export const Content = styled.div`
  font-size: 14px;
  line-height: 20px;
  margin-top: ${grid.px};
  color: ${primaryTextColour};
`;

export const Wrapper = styled.div`
  text-align: center;
  padding: ${grid.twice().px};
`;
