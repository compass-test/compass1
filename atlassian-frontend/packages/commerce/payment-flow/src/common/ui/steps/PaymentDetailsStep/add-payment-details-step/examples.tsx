import React from 'react';

import { CCPCreditCardFormState } from '@atlassian/commerce-credit-card-ccp';
import {
  scenarios as ccpCreditCardScenarios,
  stripeOverride,
} from '@atlassian/commerce-credit-card-ccp/mocks';
import {
  CommerceMockedEnvironment,
  IG_ID,
  TXA_ID,
} from '@atlassian/commerce-environment/mocks';
import {
  paymentMethodSuccessScenarios,
  paymentMethodUpdateErrorScenarios,
} from '@atlassian/commerce-payment-methods/mocks';
import { TransactionAccountId } from '@atlassian/commerce-types';

import { defineFlow, Flow, FlowProps } from '../../../Flow';
import { mockOnComplete, OptionalProps } from '../../../Flow/mocks';

import { addPaymentDetailsStep } from './index';

const overrides = [stripeOverride];

const CreditCardTestFlow = <T extends object = {}>({
  definition,
  onComplete = mockOnComplete,
  onCancel,
  txa,
}: OptionalProps<FlowProps<T>, 'onComplete'> & {
  txa: TransactionAccountId;
}) => (
  // Credit card component requires state wrapper around the form
  <CCPCreditCardFormState accountId={txa}>
    <Flow definition={definition} onComplete={onComplete} onCancel={onCancel} />
  </CCPCreditCardFormState>
);

export const addStep = () => (
  <CommerceMockedEnvironment
    scenarios={[
      ccpCreditCardScenarios.success,
      ...paymentMethodSuccessScenarios,
    ]}
    overrides={overrides}
  >
    <CreditCardTestFlow
      txa={TXA_ID}
      definition={defineFlow(
        { txa: TXA_ID, ig: IG_ID, paymentMethods: [] },
        addPaymentDetailsStep,
      )}
    />
  </CommerceMockedEnvironment>
);

export const errorSettingUpCreditCard = () => (
  <CommerceMockedEnvironment
    scenarios={[ccpCreditCardScenarios.serverFailure]}
    overrides={overrides}
  >
    <CreditCardTestFlow
      txa={TXA_ID}
      definition={defineFlow(
        { txa: TXA_ID, ig: IG_ID, paymentMethods: [] },
        addPaymentDetailsStep,
      )}
    />
  </CommerceMockedEnvironment>
);

export const errorUpdatingDefaultPaymentMethod = () => (
  <CommerceMockedEnvironment
    scenarios={[
      ccpCreditCardScenarios.success,
      ...paymentMethodUpdateErrorScenarios,
    ]}
    overrides={overrides}
  >
    <CreditCardTestFlow
      txa={TXA_ID}
      definition={defineFlow(
        { txa: TXA_ID, ig: IG_ID, paymentMethods: [] },
        addPaymentDetailsStep,
      )}
    />
  </CommerceMockedEnvironment>
);
