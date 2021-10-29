import React from 'react';

import { useIntl } from '@atlassian/dragonfruit-utils';

import messages from './messages';
import { FooterContent, FooterLink } from './styled';

const COMPASS_INFO_URL = 'https://www.atlassian.com/software/compass';
const TERMS_OF_SERVICE_URL =
  'https://www.atlassian.com/legal/cloud-terms-of-service';
const PRIVACY_POLICY_URL = 'https://www.atlassian.com/legal/privacy-policy';

export const HelpFooter = () => {
  const { formatMessage } = useIntl();

  return (
    <FooterContent>
      <FooterLink href={COMPASS_INFO_URL}>
        {formatMessage(messages.aboutCompass)}
      </FooterLink>
      <FooterLink href={TERMS_OF_SERVICE_URL}>
        {formatMessage(messages.termsOfService)}
      </FooterLink>
      <FooterLink href={PRIVACY_POLICY_URL}>
        {formatMessage(messages.privacyPolicy)}
      </FooterLink>
    </FooterContent>
  );
};
