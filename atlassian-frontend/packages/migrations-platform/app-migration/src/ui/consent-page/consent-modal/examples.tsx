import React, { useState } from 'react';

import { IntlProvider } from 'react-intl';

import Button from '@atlaskit/button/standard-button';
import { ModalTransition } from '@atlaskit/modal-dialog';

import AppConsentModal, { Props } from './index';

export const AppConsentModalNormal = (props: Partial<Props>) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <Button
        appearance="primary"
        onClick={() => {
          setIsOpen(true);
        }}
      >
        Open modal
      </Button>
      <IntlProvider locale="en">
        <ModalTransition>
          {isOpen && (
            <AppConsentModal
              appKey="123"
              name="Maps ProExtra"
              vendorName="KDN Software"
              dataScopes={[
                'APP_DATA_OTHER',
                'APP_DATA_PII',
                'APP_DATA_SECURITY',
              ]}
              contactVendorUrl="https://example.com/#vendorTerms"
              logoUrl="https://pbs.twimg.com/profile_images/907320949762134016/NVTmGzl7_400x400.jpg"
              privacyPolicyUrl="https://example.com/#vendorPrivacyPolicy"
              onClose={() => {
                setIsOpen(false);
              }}
              onConsent={() => {}}
              isVendorHighlighted
              {...props}
            />
          )}
        </ModalTransition>
      </IntlProvider>
    </>
  );
};
