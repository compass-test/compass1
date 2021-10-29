import React, { FC } from 'react';

import Helmet from 'react-helmet';

import * as S from '../styled';

type Props = {
  subtitle?: string | React.ReactNode;
  title?: string;
};

const Title: FC<Props> = ({ subtitle, title }) => {
  return (
    <>
      {title && (
        <Helmet>
          <title>{title}</title>
        </Helmet>
      )}
      <S.TitleContainer>
        {title && <S.Title id="focus-page-title">{title}</S.Title>}
        {subtitle && <S.SubTitle id="focus-page-desc">{subtitle}</S.SubTitle>}
      </S.TitleContainer>
    </>
  );
};

export default Title;
