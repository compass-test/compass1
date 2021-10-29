import React from 'react';

import { FormattedMessage } from 'react-intl';

import { MessageDescriptor } from '@atlassian/proforma-translations';

import { withIntlProvider } from '../../intl-provider';

import { IntlLinkMessages, LinkMessage } from './LinkMessages.intl';

interface PfLinkProps {
  href: string;
  message: MessageDescriptor;
  onClick?: (event: React.MouseEvent) => void;
  popup?: boolean;
  contentPrefix?: React.ReactNode; // Intended to be used for an icon.
  id?: string;
}

interface LearnMoreLinkProps {
  href: string;
  onClick?: (event: React.MouseEvent) => void;
}

// TODO: Pass in the FormattedMessage as children rather than passing in the MessageDescriptor since the
// messages are not part of this package.
export const PfLink: React.FC<PfLinkProps> = ({
  href,
  message,
  onClick,
  contentPrefix,
  id,
  popup,
}) => {
  return (
    <a
      href={href}
      id={id}
      rel={popup === undefined || popup ? 'noreferrer noopener' : undefined}
      target={popup === undefined || popup ? '_blank' : undefined}
      onClick={onClick}
    >
      {contentPrefix && contentPrefix}
      {
        // @ts-ignore
        <FormattedMessage {...message} />
      }
    </a>
  );
};

export const LearnMoreLink = withIntlProvider<LearnMoreLinkProps>(
  ({ href, onClick }) => {
    return (
      <PfLink
        href={href}
        message={IntlLinkMessages[LinkMessage.LearnMore]}
        onClick={onClick}
      />
    );
  },
);
