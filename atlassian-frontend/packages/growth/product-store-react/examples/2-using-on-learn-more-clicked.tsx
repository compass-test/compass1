/*
DISCLAIMER:
This example fits as a manual test for the deprecated onLearnMoreClicked handle.
It proves that when provided onLearMoreClicked is executed.

IT SHOULD BE REMOVED IN TASK THAT WILL REMOVE THAT METHOD (https://hello.atlassian.net/browse/PRST-71).
*/
import React, { Fragment, useState } from 'react';
import Drawer from '@atlaskit/drawer';
import ProductStoreIntegration, { Routes, ProductKeys } from '../src';

export default () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Fragment>
      <button onClick={() => setIsOpen(!isOpen)}>Toggle frame</button>
      <Drawer isOpen={isOpen} width="full">
        <ProductStoreIntegration
          src="/iframe.html?id=productstorespa--mocked-spa"
          locale="en_US"
          route={Routes.DISCOVERY_PRODUCTS}
          cloudId="some-cloud-id"
          sourceComponent="source-component"
          sourceContext="source-context"
          onClose={() => {
            setIsOpen(false);
          }}
          onTryClicked={(product: ProductKeys) => {
            alert(`Installing: ${product}`);
          }}
          onLearnMoreClicked={(product: ProductKeys) => {
            alert(`"onLearnMore" clicked, it should route to : ${product}`);
          }}
        />
      </Drawer>
    </Fragment>
  );
};
