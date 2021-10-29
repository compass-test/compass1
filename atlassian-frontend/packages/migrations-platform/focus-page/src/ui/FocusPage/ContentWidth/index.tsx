import React, { FC } from 'react';

import * as S from '../styled';

type Props = {
  contentWidthProps?: Record<string, any>;
  width?: 'small' | 'medium' | 'large' | 'xlarge';
};

const ContainerWidth: FC<Props> = ({
  children,
  contentWidthProps,
  width = 'medium',
}) => {
  const ContentWidth = S.ContentWidth[width];

  return <ContentWidth {...contentWidthProps}>{children}</ContentWidth>;
};

export default ContainerWidth;
