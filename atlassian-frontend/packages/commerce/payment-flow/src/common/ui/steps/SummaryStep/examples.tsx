import React, { PropsWithChildren } from 'react';

import { fullBillingDetails } from '@atlassian/commerce-billing-details/mocks';
import { CCPCreditCardFormState } from '@atlassian/commerce-credit-card-ccp';
import {
  scenarios as ccpCreditCardScenarios,
  stripeConfirmCardSetupErrorOverride,
  stripeOverride,
} from '@atlassian/commerce-credit-card-ccp/mocks';
import {
  CommerceMockedEnvironment,
  IG_ID,
  Scenario,
  TXA_ID,
} from '@atlassian/commerce-environment/mocks';
import { TaskLayout } from '@atlassian/commerce-layout';
import {
  paymentMethodSuccessScenarios,
  paymentMethodUpdateErrorScenarios,
  visaPaymentMethod,
} from '@atlassian/commerce-payment-methods/mocks';

import { defineFlow } from '../../Flow';
import { FlowControlButtons } from '../../Flow/flow-control-buttons';
import { TestFlow } from '../../Flow/mocks';
import { FlowStep } from '../../Flow/step';

import { summaryStep, SummaryStepIn } from './index';

const mockedState: SummaryStepIn = {
  txa: TXA_ID,
  ig: IG_ID,
  renewalFrequency: 'monthly',
  manualSubscription: false,
  paymentMethod: visaPaymentMethod,
  paymentMethods: [],
  stripePaymentMethodId: 'Stripe payment method ID',
  billingDetails: fullBillingDetails,
};

const scenarios: Scenario[] = [
  ccpCreditCardScenarios.success,
  ...paymentMethodSuccessScenarios,
];
const overrides = [stripeOverride];
const errorOverrides = [stripeConfirmCardSetupErrorOverride];

const TestCCPCreditCardFormState = ({ children }: PropsWithChildren<{}>) => (
  <CCPCreditCardFormState accountId={TXA_ID}>{children}</CCPCreditCardFormState>
);

export const Summary = () => (
  <CommerceMockedEnvironment scenarios={[...scenarios]} overrides={overrides}>
    <TestCCPCreditCardFormState>
      <TestFlow definition={defineFlow(mockedState, summaryStep)} />
    </TestCCPCreditCardFormState>
  </CommerceMockedEnvironment>
);

export const SummaryWithPaymentUpdateError = () => (
  <CommerceMockedEnvironment
    scenarios={[
      ccpCreditCardScenarios.success,
      ...paymentMethodUpdateErrorScenarios,
    ]}
    overrides={overrides}
  >
    <TestCCPCreditCardFormState>
      <TestFlow definition={defineFlow(mockedState, summaryStep)} />
    </TestCCPCreditCardFormState>
  </CommerceMockedEnvironment>
);

const fakePaymentStep: FlowStep<{}, object> = {
  caption: 'fake payment step',
  component: ({ flowControl }) => (
    <TaskLayout
      title="Payment step"
      actions={
        <FlowControlButtons
          nextButtonTestId="commerce.fake-payment-step.submit-button"
          flowControl={flowControl}
          loading={false}
          failed={false}
          onNext={({ moveForward }) => {
            moveForward({ step1Data: true });
          }}
          entityName="SomethingThatDescribesWhatEditingOrAdding"
        />
      }
    >
      <p>This is a fake payment screen</p>
      <p>Press 'next' to go to the summary screen</p>
    </TaskLayout>
  ),
};

export const SummaryWithStripeError = () => (
  <CommerceMockedEnvironment
    scenarios={[
      ccpCreditCardScenarios.success,
      ...paymentMethodSuccessScenarios,
    ]}
    overrides={errorOverrides}
  >
    <TestCCPCreditCardFormState>
      <TestFlow
        definition={defineFlow(mockedState, fakePaymentStep, summaryStep)}
      />
    </TestCCPCreditCardFormState>
  </CommerceMockedEnvironment>
);

export const SummaryForManualAnnualSubscription = () => (
  <CommerceMockedEnvironment scenarios={[...scenarios]} overrides={overrides}>
    <TestCCPCreditCardFormState>
      <TestFlow
        definition={defineFlow(
          {
            ...mockedState,
            renewalFrequency: 'annual',
            manualSubscription: true,
          },
          summaryStep,
        )}
      />
    </TestCCPCreditCardFormState>
  </CommerceMockedEnvironment>
);
