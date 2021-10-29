import React, { FC } from 'react';

import * as S from '../styled';

import CloseButton from './CloseButton';

type Props = {
  onClose: () => void;
  headerButtons?: React.ReactNode | React.ReactNode[];
};

const Header: FC<Props> = ({ onClose, headerButtons }) => {
  return (
    <S.ButtonsBar>
      <CloseButton onClick={onClose} />
      {headerButtons && <S.ButtonGroup>{headerButtons}</S.ButtonGroup>}
    </S.ButtonsBar>
  );
};

export default Header;
