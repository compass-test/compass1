import React from 'react';
import styled from '@emotion/styled';
import { gridSize } from '@atlaskit/theme/constants';
import { N900 } from '@atlaskit/theme/colors';

const GRID_UNIT = gridSize();

const AkGrid = (num: number = 1) => ({
  px: `${num * GRID_UNIT}px`,
  unitless: num * GRID_UNIT,
  multiple: (multiplier: number) => AkGrid(multiplier * num),
  half: () => AkGrid(0.5 * num),
  twice: () => AkGrid(2 * num),
});

export const grid = AkGrid(1);

export const primaryTextColour = N900;

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

export const TitleStyled = styled.div`
  margin-top: 30px;
`;

export interface Props {
  /**
   * An image that is shown above the text. This should be used to communicate what the page is for.
   */
  Image: React.ComponentType;
  /**
   * A summary of why the page is shown.
   */
  title: string | JSX.Element;
  /**
   * Details on why the page is shown including any call to actions.
   */
  content?: JSX.Element;
}

export const EmptyState: React.FC<Props> = ({ title, content, Image }) => (
  <Wrapper>
    <Image />
    <TitleStyled>
      <Title>{title}</Title>
    </TitleStyled>
    <Content>{content}</Content>
  </Wrapper>
);
