import React, { useState, Fragment } from 'react';
import Drawer from '@atlaskit/drawer';
import ProductStoreIntegration, { Routes, ProductKeys } from '../src';
// eslint-disable-next-line import/no-extraneous-dependencies
import styled from '@emotion/styled';

const AlwaysOnTop = styled.div`
  position: fixed;
  top: 0;
  width: 100px;
  right: 0;
  z-index: 9999999;
`;

export default () => {
  const [isOpen, setIsOpen] = useState(false);
  const [route, setRoute] = useState<Routes>(Routes.DISCOVERY_PRODUCTS);

  return (
    <Fragment>
      <AlwaysOnTop>
        <button onClick={() => setIsOpen(!isOpen)}>Toggle frame</button>
        <button onClick={() => setRoute(Routes.JIRA_SOFTWARE)}>
          Navigate to Jira
        </button>
      </AlwaysOnTop>
      <Drawer width="full" isOpen={isOpen}>
        <ProductStoreIntegration
          src="/iframe.html?id=productstorespa--site-scoped"
          locale="en_US"
          route={route}
          cloudId="some-cloud-id"
          sourceComponent="source-component"
          sourceContext="source-context"
          onClose={() => {
            setIsOpen(false);
          }}
          onTryClicked={(product: ProductKeys) => {
            alert(`Installing: ${product}`);
          }}
          onChangeRoute={(route: Routes) => {
            setRoute(route);
          }}
          onAnalyticsEvent={(e) => console.log('Analytic event:', e)}
          onError={(e) => console.log('An error happened:', e)}
        />
      </Drawer>
    </Fragment>
  );
};
