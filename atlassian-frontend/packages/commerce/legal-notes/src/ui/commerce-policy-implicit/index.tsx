import React from 'react';

import { getLinkTo } from '@atlassian/commerce-links';

import { LegalNote } from '../../common/ui/commerce-legal-notes/styled';

export const CommercePolicyAgreementImplicit: React.FC = () => (
  <LegalNote data-testid="commerce-legal-notes.legal-note">
    By clicking Save you accept the{' '}
    <a
      aria-label="Atlassian Customer Agreement"
      href={getLinkTo('customerAgreement', 'en')}
    >
      Atlassian Customer Agreement
    </a>
    ,{' '}
    <a
      target="blank"
      aria-label="Atlassian Customer Agreement"
      href={getLinkTo('privacyPolicy', 'en')}
    >
      Privacy Policy
    </a>{' '}
    and agree to pay fees charged in accordance with our{' '}
    <a
      target="blank"
      aria-label="Atlassian Customer Agreement"
      href={getLinkTo('cloudPricing', 'en')}
    >
      pricing
    </a>
    .
  </LegalNote>
);
