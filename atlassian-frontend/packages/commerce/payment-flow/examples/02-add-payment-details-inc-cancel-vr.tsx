import React, { useState } from 'react';

import {
  CommerceMockedEnvironment,
  IG_ID,
  TXA_ID,
} from '@atlassian/commerce-environment/mocks';

import { PaymentDetailsFlow } from '../src';
import {
  GasV3Integration,
  MetalIntegration,
  SentryBrowserIntegration,
} from '../src/common/utils/telemetry-integrations';
import {
  paymentFlowAddSuccessScenarios,
  paymentFlowOverrides,
} from '../src/mocks';

export const AddPaymentDetailsWithCancelFlowExample = () => {
  const [isCancel, setIsCancel] = useState(false);

  if (!isCancel) {
    return (
      <GasV3Integration
        client={{
          sendUIEvent: (e) => console.log('ui', e),
          sendTrackEvent: (e) => console.log('track', e),
          sendScreenEvent: (e) => console.log('screen', e),
          sendOperationalEvent: (e) => console.log('operational', e),
        }}
      >
        <MetalIntegration
          client={{
            metric: {
              submit: (e) => console.warn('metal', e),
            },
          }}
        >
          <SentryBrowserIntegration
            client={{
              captureException: (payload) => console.log('sentry', payload),
            }}
          >
            <CommerceMockedEnvironment
              scenarios={paymentFlowAddSuccessScenarios}
              overrides={paymentFlowOverrides}
            >
              <PaymentDetailsFlow
                onComplete={() => alert('success')}
                onCancel={() => setIsCancel(!isCancel)}
                txa={TXA_ID}
                ig={IG_ID}
              />
            </CommerceMockedEnvironment>
          </SentryBrowserIntegration>
        </MetalIntegration>
      </GasV3Integration>
    );
  }
  return <>Flow Cancelled!!!</>;
};

export default AddPaymentDetailsWithCancelFlowExample;
