import React, { FC } from 'react';

import type { AnalyticsLinkProps } from '@atlassian/mpt-elements';

import * as S from './styled';

export type Props = AnalyticsLinkProps & {
  title: string;
  imageUrl: string;
};

const LinkCard: FC<Props> = ({ title, imageUrl, children, ...linkProps }) => {
  return (
    <S.Link
      {...linkProps}
      title={title}
      style={{ backgroundImage: `url(${imageUrl})` }}
    >
      <S.Title>{title}</S.Title>
      <S.Text>{children}</S.Text>
    </S.Link>
  );
};

export default LinkCard;
