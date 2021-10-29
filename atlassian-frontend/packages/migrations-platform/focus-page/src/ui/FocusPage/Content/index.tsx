import React, { FC } from 'react';

import BannerMessage from '../BannerMessage';
import ContentWidth from '../ContentWidth';
import Footer from '../Footer';
import Header from '../Header';
import Progress from '../Progress';
import Title from '../Title';
import ViewPort from '../ViewPort';

export type Props = {
  progress?: React.ReactNode;
  title?: string;
  subtitle?: string | React.ReactNode;
  bannerMessage?: string | React.ReactNode;
  bannerAppearance?: 'warning' | 'error' | 'announcement';
  width?: 'small' | 'medium' | 'large' | 'xlarge';
  onClose: () => void;
  headerButtons?: React.ReactNode | React.ReactNode[];
  footerButtons?: React.ReactNode | React.ReactNode[];
  footer?: React.ReactNode;
};

const Content: FC<Props> = ({
  children,
  onClose,
  progress,
  title,
  subtitle,
  bannerMessage,
  bannerAppearance = 'announcement',
  headerButtons,
  footerButtons,
  footer,
  width,
}) => {
  return (
    <>
      {bannerMessage && (
        <BannerMessage bannerAppearance={bannerAppearance}>
          {bannerMessage}
        </BannerMessage>
      )}
      <ViewPort>
        <Header onClose={onClose} headerButtons={headerButtons} />
        {progress && <Progress>{progress}</Progress>}
        <ContentWidth contentWidthProps={{ role: 'main' }} width={width}>
          <Title title={title} subtitle={subtitle} />
          {children}
        </ContentWidth>
      </ViewPort>
      {(footerButtons || footer) && (
        <Footer footer={footer} footerButtons={footerButtons} width={width} />
      )}
    </>
  );
};

export default Content;
