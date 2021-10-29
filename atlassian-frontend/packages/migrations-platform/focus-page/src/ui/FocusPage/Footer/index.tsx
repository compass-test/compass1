import React, { FC } from 'react';

import ContentWidth from '../ContentWidth';
import * as S from '../styled';

type Props = {
  footer?: React.ReactNode;
  footerButtons?: React.ReactNode | React.ReactNode[];
  width?: 'small' | 'medium' | 'large' | 'xlarge';
};

const Footer: FC<Props> = ({ footer, footerButtons, width }) => {
  return (
    <S.Footer>
      <ContentWidth width={width}>
        <span>{footer}</span>
        <S.ButtonGroup>{footerButtons}</S.ButtonGroup>
      </ContentWidth>
    </S.Footer>
  );
};

export default Footer;
