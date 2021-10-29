import React, { useCallback, useState } from 'react';

import { IntlProvider } from 'react-intl';

import { AnalyticsListener, UIAnalyticsEvent } from '@atlaskit/analytics-next';
import Button from '@atlaskit/button';

import DefaultFlagsProvider from '../helpers/DefaultFlagsProvider';
import type { AtlassianProduct } from '../src/common/types';

import Dialog, { DialogShareToSlack } from './helpers/Dialog';
import FakeSlackService from './helpers/FakeSlackService';
import ProductSelector from './helpers/ProductSelector';

export default function Example() {
  const [isOpen, setIsOpen] = useState(false);
  const closeDialog = useCallback(() => setIsOpen(false), []);
  const openDialog = useCallback(() => setIsOpen(true), []);
  const [selectedProduct, setSelectedProduct] = useState<AtlassianProduct>(
    'jira',
  );

  const onEvent = useCallback((event: UIAnalyticsEvent) => {
    console.log(JSON.stringify(event.payload, null, 2));
  }, []);

  return (
    <IntlProvider locale="en">
      <>
        <ProductSelector
          name="01-basic-product"
          selectedProduct={selectedProduct}
          onChangeSelectedProduct={setSelectedProduct}
        />
        <Button
          appearance="subtle"
          onClick={openDialog}
          testId="share-to-slack"
        >
          Share to Slack
        </Button>
        <AnalyticsListener channel="growth" onEvent={onEvent}>
          <DefaultFlagsProvider>
            {(showFlag) => (
              <Dialog isOpen={isOpen} onClose={closeDialog}>
                <DialogShareToSlack
                  showFlag={showFlag}
                  product={selectedProduct}
                  createSlackService={createFakeSlackService}
                  channel="growth"
                  onClose={closeDialog}
                />
              </Dialog>
            )}
          </DefaultFlagsProvider>
        </AnalyticsListener>
      </>
    </IntlProvider>
  );
}

let fakeSlackService: FakeSlackService;

function createFakeSlackService() {
  if (fakeSlackService === undefined) {
    console.log('Creating FakeSlackService');

    fakeSlackService = new FakeSlackService();
  }

  return fakeSlackService;
}
