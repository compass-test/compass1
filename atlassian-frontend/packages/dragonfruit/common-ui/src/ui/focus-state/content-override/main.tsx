import React from 'react';

import { Wrapper } from './styled';

export const ContentOverride: React.FC = ({ children }) => {
  return <Wrapper>{children}</Wrapper>;
};
