import React from 'react';
import { useRouterActions } from 'react-resource-router';
import { ProductHome as NavProductHome } from '@atlaskit/atlassian-navigation';
import { AtlassianIcon, AtlassianLogo } from '@atlaskit/logo';

export const ProductHome: React.FC = () => {
  const { push } = useRouterActions();

  return (
    <NavProductHome
      onClick={() => push('/')}
      siteTitle="AF Services"
      icon={AtlassianIcon}
      logo={AtlassianLogo}
    />
  );
};
