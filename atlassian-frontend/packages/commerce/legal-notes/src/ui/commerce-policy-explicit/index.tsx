import React, { Ref, useState } from 'react';

import { Checkbox } from '@atlaskit/checkbox';
import { getLinkTo } from '@atlassian/commerce-links';

import { LegalCheckboxText } from '../../common/ui/commerce-legal-notes/styled';

interface PolicyAgreementExplicitProps {
  onAgreedChanged(agreed: boolean): void;
}

export const CommercePolicyAgreementExplicit = React.forwardRef<
  HTMLInputElement,
  PolicyAgreementExplicitProps
>(({ onAgreedChanged }, ref: Ref<HTMLInputElement>) => {
  const [isChecked, setIsChecked] = useState(false);
  const onChange = (): void => {
    const value: boolean = !isChecked;
    setIsChecked(value);
    onAgreedChanged(value);
  };

  return (
    <Checkbox
      testId="policy-checkbox"
      ref={ref}
      isChecked={isChecked}
      onChange={onChange}
      label={
        <LegalCheckboxText>
          I agree to the{' '}
          <a
            target="blank"
            aria-label="Atlassian Customer Agreement"
            href={getLinkTo('customerAgreement', 'en')}
          >
            Atlassian Cloud Terms of Service
          </a>{' '}
          and{' '}
          <a
            target="blank"
            aria-label="Atlassian Customer Agreement"
            href={getLinkTo('privacyPolicy', 'en')}
          >
            Privacy Policy
          </a>
          .
        </LegalCheckboxText>
      }
    />
  );
});
