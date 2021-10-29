import React, { FC } from 'react';

import Banner from '@atlaskit/banner';
import InfoIcon from '@atlaskit/icon/glyph/info';
import WarningIcon from '@atlaskit/icon/glyph/warning';

import * as S from '../styled';

type Props = {
  bannerAppearance: 'warning' | 'error' | 'announcement';
};

const BannerMessage: FC<Props> = ({ children, bannerAppearance }) => {
  const icon =
    bannerAppearance === 'announcement' ? (
      <InfoIcon label="Info" secondaryColor="inherit" />
    ) : (
      <WarningIcon label="Warning" secondaryColor="inherit" />
    );

  return (
    <S.Wrapper>
      <Banner icon={icon} isOpen appearance={bannerAppearance}>
        {children}
      </Banner>
    </S.Wrapper>
  );
};

export default BannerMessage;
