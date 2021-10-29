import React from 'react';

import * as S from './styled';
import { InfoCardProps } from './types';

export type { InfoCardProps };

const InfoCard = ({ name, title, imageUrl, children }: InfoCardProps) => (
  <S.Wrapper>
    {name ? <S.Name>{name}</S.Name> : null}
    <S.CardContainer style={{ backgroundImage: `url(${imageUrl})` }}>
      <S.Title>{title}</S.Title>
      <S.Text>{children}</S.Text>
    </S.CardContainer>
  </S.Wrapper>
);

export default InfoCard;
