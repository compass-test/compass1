import React, { useState } from 'react';

import { openInvoice } from '@atlassian/commerce-billing-history/mocks';
import {
  stripeConfirmCardPaymentErrorOverride,
  stripeOverride,
} from '@atlassian/commerce-credit-card-ccp/mocks';
import {
  CommerceMockedEnvironment,
  TXA_ID,
} from '@atlassian/commerce-environment/mocks';

import {
  offSession3DSChallengeConfirmationNotRequired,
  offSession3DSChallengeHappyPathScenarios,
  offSession3DSChallengeInvalidPaymentMethod,
  offSession3DSChallengeInvoiceNotPayable,
  offSession3DSChallengeInvoicePaidScenarios,
  offSession3DSChallengePaymentMethodChanged,
} from '../../mocks';

import { OffSessionPaymentMethodConfirm } from './index';

export const HappyPath = () => {
  const [success, setSuccess] = useState(false);

  return (
    <CommerceMockedEnvironment
      scenarios={offSession3DSChallengeHappyPathScenarios}
      overrides={[stripeOverride]}
    >
      {!success ? (
        <OffSessionPaymentMethodConfirm
          txa={TXA_ID}
          invoiceId={openInvoice.id}
          onSuccess={() => {
            setSuccess(true);
          }}
        />
      ) : (
        <h1>Success</h1>
      )}
    </CommerceMockedEnvironment>
  );
};

export const HappyPathWithStripeConfirmPaymentError = () => {
  const [success, setSuccess] = useState(false);

  return (
    <CommerceMockedEnvironment
      scenarios={offSession3DSChallengeHappyPathScenarios}
      overrides={[stripeConfirmCardPaymentErrorOverride]}
    >
      {!success ? (
        <OffSessionPaymentMethodConfirm
          txa={TXA_ID}
          invoiceId={openInvoice.id}
          onSuccess={() => {
            setSuccess(true);
          }}
        />
      ) : (
        <h1>Success</h1>
      )}
    </CommerceMockedEnvironment>
  );
};

export const InvoicePaid = () => (
  <CommerceMockedEnvironment
    scenarios={offSession3DSChallengeInvoicePaidScenarios}
  >
    <OffSessionPaymentMethodConfirm
      txa={TXA_ID}
      invoiceId={openInvoice.id}
      onSuccess={() => {
        alert('Hooray!');
      }}
    />
  </CommerceMockedEnvironment>
);

export const ConfirmationNotRequired = () => (
  <CommerceMockedEnvironment
    scenarios={offSession3DSChallengeConfirmationNotRequired}
    overrides={[stripeOverride]}
  >
    <OffSessionPaymentMethodConfirm
      txa={TXA_ID}
      invoiceId={openInvoice.id}
      onSuccess={() => {
        alert('Hooray!');
      }}
    />
  </CommerceMockedEnvironment>
);
export const InvoiceNotPayable = () => (
  <CommerceMockedEnvironment
    scenarios={offSession3DSChallengeInvoiceNotPayable}
  >
    <OffSessionPaymentMethodConfirm
      txa={TXA_ID}
      invoiceId={openInvoice.id}
      onSuccess={() => {
        alert('Hooray!');
      }}
    />
  </CommerceMockedEnvironment>
);

export const PaymentMethodChanged = () => (
  <CommerceMockedEnvironment
    scenarios={offSession3DSChallengePaymentMethodChanged}
  >
    <OffSessionPaymentMethodConfirm
      txa={TXA_ID}
      invoiceId={openInvoice.id}
      onSuccess={() => {
        alert('Hooray!');
      }}
    />
  </CommerceMockedEnvironment>
);

export const InvalidPaymentMethod = () => (
  <CommerceMockedEnvironment
    scenarios={offSession3DSChallengeInvalidPaymentMethod}
  >
    <OffSessionPaymentMethodConfirm
      txa={TXA_ID}
      invoiceId={openInvoice.id}
      onSuccess={() => {
        alert('Hooray!');
      }}
    />
  </CommerceMockedEnvironment>
);
