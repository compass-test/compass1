import React, { FC } from 'react';

import Content from './Content';
import Wrapper from './Wrapper';

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
  zIndex?: number;
  children: React.ReactNode;
  // TODO: Ideally we should separate the Portal and the rest of the FocusPage
  // to easier composition
  Container?: React.ElementType;
  containerProps?: Record<string, any>;
};

const FocusPage: FC<Props> = ({
  children,
  onClose,
  progress,
  title,
  subtitle,
  bannerMessage,
  bannerAppearance,
  headerButtons,
  footerButtons,
  footer,
  width,
  zIndex,
  Container,
  containerProps,
}: Props) => {
  return (
    <Wrapper
      zIndex={zIndex}
      Container={Container}
      containerProps={containerProps}
    >
      <Content
        onClose={onClose}
        progress={progress}
        title={title}
        subtitle={subtitle}
        bannerMessage={bannerMessage}
        bannerAppearance={bannerAppearance}
        headerButtons={headerButtons}
        footerButtons={footerButtons}
        footer={footer}
        width={width}
      >
        {children}
      </Content>
    </Wrapper>
  );
};

export default FocusPage;
