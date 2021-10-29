import React from 'react';

import {
  AppSwitcher,
  AtlassianNavigation,
  ProductHome,
} from '@atlaskit/atlassian-navigation';
import { JiraIcon, JiraLogo } from '@atlaskit/logo';
import Popup from '@atlaskit/popup';
import { getMockData } from '@atlassian/switcher-test-utils';
import { AvailableProductsResponse } from '@atlassian/switcher/types';

import AtlassianSwitcherIframe from '../src/ui/atlassian-switcher-iframe';

const ProductHomeExample = () => (
  <ProductHome
    onClick={console.log}
    icon={JiraIcon}
    logo={JiraLogo}
    siteTitle="Hello"
  />
);

function SwitcherContent() {
  const availableSitesPromise = () =>
    new Promise<AvailableProductsResponse>(resolve =>
      resolve(
        getMockData().AVAILABLE_PRODUCTS_DATA as AvailableProductsResponse,
      ),
    );

  return (
    <div style={{ width: 400, maxHeight: 'calc(100vh - 100px)' }}>
      <AtlassianSwitcherIframe
        availableProductsPromise={availableSitesPromise}
        testId={'atlassian-switcher-iframe'}
        bridgeProps={{
          product: 'jira',
          cloudId: 'mock-cloud-id',
          enableDiscoverClickHandler: true,
          enableOnCloseHandler: true,
          enableSlackDiscoveryClickHandler: true,
          enableXflowClickHandler: true,
        }}
      />
    </div>
  );
}

const SwitcherPopup = () => {
  const [isOpen, setIsOpen] = React.useState(true);

  const onClick = () => {
    setIsOpen(!isOpen);
  };

  const onClose = () => {
    setIsOpen(false);
  };

  return (
    <Popup
      placement="bottom-start"
      content={() => <SwitcherContent />}
      isOpen={isOpen}
      onClose={onClose}
      trigger={triggerProps => (
        <AppSwitcher
          onClick={onClick}
          tooltip="Switch to..."
          {...triggerProps}
        />
      )}
    />
  );
};

const GenericIframeSwitcherExample = () => {
  return (
    <AtlassianNavigation
      label="site"
      moreLabel="More"
      primaryItems={[]}
      renderAppSwitcher={SwitcherPopup}
      renderProductHome={ProductHomeExample}
    />
  );
};

export default GenericIframeSwitcherExample;
