import React, { FC } from 'react';

import { getLinkTo } from '@atlassian/commerce-links';

import {
  DetailsContainer,
  PaymentContainer,
  PaymentMethodText,
  PaymentMethodTitle,
} from '../../common/ui/styled';

import { DeferredPayment } from './deferred-icon';
import { DeferredIconWrapper } from './styled';

export const DeferredPanel: FC = () => (
  <PaymentContainer data-testid="commerce-payment-methods.deferred-content">
    <DeferredIconWrapper>
      <DeferredPayment />
    </DeferredIconWrapper>
    <DetailsContainer>
      <PaymentMethodTitle>Net-30 Terms</PaymentMethodTitle>
      <PaymentMethodText>
        Pay with bank transfer or check.{' '}
        <a
          aria-label="Know more"
          target="blank"
          href={getLinkTo('purchasingLicense', 'en')}
        >
          Know more
        </a>
      </PaymentMethodText>
    </DetailsContainer>
  </PaymentContainer>
);
