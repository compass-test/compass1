import React from 'react';

import { CompassIcon } from '@atlaskit/logo';

import { Wrapper } from './styled';

export const SidebarOverride: React.FC = ({ children }) => {
  return (
    <Wrapper>
      <CompassIcon size="large" />
      {children}
    </Wrapper>
  );
};
