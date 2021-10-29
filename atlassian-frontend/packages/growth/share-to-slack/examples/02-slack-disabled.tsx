import React, { useCallback, useState } from 'react';

import { IntlProvider } from 'react-intl';

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

  return (
    <IntlProvider locale="en">
      <>
        <ProductSelector
          name="01-slack-disabled-product"
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
        <DefaultFlagsProvider>
          {(showFlag) => (
            <Dialog isOpen={isOpen} onClose={closeDialog}>
              <DialogShareToSlack
                showFlag={showFlag}
                product={selectedProduct}
                createSlackService={createFakeSlackService}
                onClose={closeDialog}
              />
            </Dialog>
          )}
        </DefaultFlagsProvider>
      </>
    </IntlProvider>
  );
}

let fakeSlackService: FakeSlackService;

function createFakeSlackService() {
  if (fakeSlackService === undefined) {
    console.log('Creating FakeSlackService');

    fakeSlackService = new FakeSlackService(false);
  }

  return fakeSlackService;
}
