import React, { ReactNode } from 'react';

import { RenewalFrequency } from '@atlassian/commerce-types';

import { LegalNote } from '../../common/ui/commerce-legal-notes/styled';

interface Props {
  totalCost?: ReactNode;
  startingDate?: ReactNode;
  renewalFrequency?: RenewalFrequency;
}

export const CommercePolicyAgreementSubscription: React.FC<Props> = ({
  totalCost,
  startingDate,
  renewalFrequency = 'monthly',
}) => {
  const getDate = (date: ReactNode) => <> starting on {date}</>;

  return (
    <LegalNote data-testid="commerce-legal-notes.legal-note">
      {renewalFrequency === 'monthly' ? (
        totalCost ? (
          <>
            Upon subscribing, you’ll be charged {totalCost} per month
            {startingDate && getDate(startingDate)}.{' '}
          </>
        ) : (
          <>
            Upon subscribing, you’ll be charged accordingly to the usage per
            month{startingDate && getDate(startingDate)}.{' '}
          </>
        )
      ) : totalCost ? (
        <>
          Upon subscribing, you’ll be charged {totalCost} per year
          {startingDate && getDate(startingDate)}.{' '}
        </>
      ) : (
        <>
          Upon subscribing, you’ll be charged accordingly to the plan per year
          {startingDate && getDate(startingDate)}.{' '}
        </>
      )}
      Atlassian will also use these credit card details to automatically renew
      your subscription going forward.
    </LegalNote>
  );
};
