import React from 'react';

import Button from '@atlaskit/button/standard-button';
import Drawer from '@atlaskit/drawer';
import { getMockData } from '@atlassian/switcher-test-utils';
import { AvailableProductsResponse } from '@atlassian/switcher/types';

import AtlassianSwitcherIframe from '../src/ui/atlassian-switcher-iframe';

const DrawerIframeSwitcherExample = () => {
  const [drawerOpen, setDrawerOpen] = React.useState(true);

  const openDrawer = () => {
    setDrawerOpen(true);
  };

  const onClose = () => {
    setDrawerOpen(false);
  };

  const availableProductsPromise = () =>
    new Promise<AvailableProductsResponse>(resolve =>
      resolve(
        getMockData().AVAILABLE_PRODUCTS_DATA as AvailableProductsResponse,
      ),
    );

  return (
    <div style={{ padding: '2rem' }}>
      <Drawer onClose={() => onClose()} isOpen={drawerOpen}>
        <AtlassianSwitcherIframe
          availableProductsPromise={availableProductsPromise}
          testId={'atlassian-switcher-iframe'}
          bridgeProps={{
            product: 'jira',
            cloudId: 'mock-cloud-id',
          }}
        />
      </Drawer>
      <Button type="button" onClick={() => openDrawer()}>
        Open drawer
      </Button>
    </div>
  );
};

export default DrawerIframeSwitcherExample;
