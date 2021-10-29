import React from 'react';

import { HeadingWrapper } from '../styled';

const FooterSection: React.FC<{ heading: string }> = ({
  heading,
  children,
}) => (
  <>
    <HeadingWrapper>{heading}</HeadingWrapper>
    {children}
  </>
);

export default FooterSection;
