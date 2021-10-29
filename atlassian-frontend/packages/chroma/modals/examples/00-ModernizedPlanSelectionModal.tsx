import React, { useState } from 'react';

import Button from '@atlaskit/button/standard-button';

import { OriginProduct, ProductKeys } from '../src/common/constants';
import { actionAndConsoleAnalyticsClient } from '../src/common/utils/storybook-utils/analytics';
import { ModernizedPlanSelectionModal } from '../src/ui/modernized-plan-selection-container';

const DefaultModal = () => {
  const [isOpen, setIsOpen] = useState(false);

  const open = () => {
    setIsOpen(true);
  };

  return (
    <div>
      <Button onClick={open}>Open Modal</Button>
      {isOpen && (
        <ModernizedPlanSelectionModal
          featureModal={'userLimits'}
          product={ProductKeys.CONFLUENCE}
          onCloseHandler={() => setIsOpen(false)}
          analyticsPlatformClient={actionAndConsoleAnalyticsClient}
          analyticsOriginProduct={OriginProduct.ADMINHUB}
        />
      )}
    </div>
  );
};

export default DefaultModal;
