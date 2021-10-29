import React from 'react';
import { AtlassianNavigation } from '@atlaskit/atlassian-navigation';

import { ProductHome } from './ProductHome';
import { Avatar } from './Avatar';
import { ServiceSelector } from './ServiceSelector';

export const Header: React.FC = () => (
  <AtlassianNavigation
    label="site"
    renderProductHome={() => <ProductHome />}
    renderProfile={Avatar}
    primaryItems={[<ServiceSelector />]}
  />
);
