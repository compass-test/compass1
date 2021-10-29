import React from 'react';

// eslint-disable-next-line import/no-unresolved
import { AtlassianInternalWarning, Example, md } from '@atlaskit/docs';

export default md`
  ${(<AtlassianInternalWarning />)}

  ## Documentation

  Commerce Payment Method

  ## Examples

  ${(
    <>
      <Example
        packageName="@atlassian/commerce-payment-methods"
        Component={require('../src/ui/examples.tsx').VisaPaymentMethod}
        title="Payment Method"
        source={require('!!raw-loader!../src/ui/examples.tsx')}
      />
      <Example
        packageName="@atlassian/commerce-payment-methods"
        Component={require('../src/ui/examples.tsx').MastercardPaymentMethod}
        title="Payment Method Mastercard"
        source={require('!!raw-loader!../src/ui/examples.tsx')}
      />
      <Example
        packageName="@atlassian/commerce-payment-methods"
        Component={require('../src/ui/examples.tsx').AmexPaymentMethod}
        title="Payment Method Amex"
        source={require('!!raw-loader!../src/ui/examples.tsx')}
      />
      <Example
        packageName="@atlassian/commerce-payment-methods"
        Component={require('../src/ui/examples.tsx').NoNamePaymentMethod}
        title="Payment Method Default Card"
        source={require('!!raw-loader!../src/ui/examples.tsx')}
      />
      <Example
        packageName="@atlassian/commerce-payment-methods"
        Component={
          require('../src/ui/examples.tsx').PaymentMethodWithEditButton
        }
        title="Payment Method with Edit"
        source={require('!!raw-loader!../src/ui/examples.tsx')}
      />
      <Example
        packageName="@atlassian/commerce-payment-methods"
        Component={require('../src/ui/examples.tsx').PaymentMethodWithName}
        title="Payment Method with Name"
        source={require('!!raw-loader!../src/ui/examples.tsx')}
      />
      <Example
        packageName="@atlassian/commerce-payment-methods"
        Component={require('../src/ui/examples.tsx').PaymentMethodWithLongName}
        title="Payment Method with long name"
        source={require('!!raw-loader!../src/ui/examples.tsx')}
      />
      <Example
        packageName="@atlassian/commerce-payment-methods"
        Component={require('../src/ui/examples.tsx').UnrecognizedPaymentMethod}
        title="Not recognized payment method"
        source={require('!!raw-loader!../src/ui/examples.tsx')}
      />
      <Example
        packageName="@atlassian/commerce-payment-methods"
        Component={require('../src/ui/examples.tsx').BorderlessPaymentMethod}
        title="Borderless payment method"
        source={require('!!raw-loader!../src/ui/examples.tsx')}
      />
    </>
  )}

`;
