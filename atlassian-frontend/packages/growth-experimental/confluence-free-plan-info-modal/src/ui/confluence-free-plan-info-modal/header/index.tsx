import React from 'react';

import { FormattedMessage } from 'react-intl';

import CloseIcon from '@atlaskit/icon/glyph/editor/close';
// eslint-disable-next-line @atlassian/tangerine/import/entry-points
import { colors } from '@atlaskit/theme';

import heroImage from './assets/header-hero.png';
import messages from './messages';
import {
  CloseIconButton,
  ContentWrapper,
  HeroImg,
  SubText,
  Title,
  Wrapper,
} from './styled';

interface HeaderProps {
  onCloseClick: () => void;
}

const Header = ({ onCloseClick }: HeaderProps) => {
  return (
    <Wrapper>
      <ContentWrapper>
        <Title>
          <FormattedMessage {...messages.title} />
        </Title>
        <SubText>
          <FormattedMessage {...messages.subText} />
        </SubText>
      </ContentWrapper>
      <HeroImg src={heroImage} alt="Confluence hero" />
      <CloseIconButton onClick={onCloseClick}>
        <CloseIcon primaryColor={colors.N0} label="close" size="large" />
      </CloseIconButton>
    </Wrapper>
  );
};

export default Header;
