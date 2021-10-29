import React from 'react';

import { AtlassianNavigation } from '@atlaskit/atlassian-navigation';

import { Product } from '../../common/types';

import { ExploreDropdown } from './explore-dropdown';
import { Logo } from './logo';

const primaryItems = [<ExploreDropdown />];

export const Navigation = () => {
  return (
    <AtlassianNavigation
      label="site"
      primaryItems={primaryItems}
      renderAppSwitcher={undefined}
      renderCreate={undefined}
      renderHelp={undefined}
      renderNotifications={undefined}
      renderProductHome={() => <Logo product={Product.ATLASSIAN} />}
      renderProfile={undefined}
      renderSearch={undefined}
      renderSettings={undefined}
      moreLabel="More"
    />
  );
};
