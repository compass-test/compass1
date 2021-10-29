import { defineMessages, FormattedMessage } from 'react-intl';

type MessageType =
  | 'legalOptInModalHeading'
  | 'legalOptInDescription'
  | 'legalOptInPrivacyPolicy'
  | 'legalOptInCustomerAgreement'
  | 'legalOptInDescriptionWithLinks'
  | 'legalOptInAllow'
  | 'legalOptInFooterCancelButton'
  | 'legalOptInFooterAllowButton';

type Messages = Record<MessageType, FormattedMessage.MessageDescriptor>;

export const messages = defineMessages<Messages>({
  legalOptInModalHeading: {
    id: 'com.atlassian.migrations-platform.legal-opt-in.heading',
    defaultMessage: 'Allow Atlassian to access migration data',
    description: 'Heading for legal opt-in modal',
  },
  legalOptInDescription: {
    id: 'com.atlassian.migrations-platform.legal-opt-in.description',
    defaultMessage:
      'To migrate your data, Atlassian needs permission to copy it from your server instance and transfer it to your linked cloud site.',
    description: 'Description for legal opt-in modal',
  },
  legalOptInPrivacyPolicy: {
    id: 'com.atlassian.migrations-platform.legal-opt-in.privacy-policy',
    defaultMessage: 'Privacy Policy',
    description: 'Link for privacy policy',
  },
  legalOptInCustomerAgreement: {
    id: 'com.atlassian.migrations-platform.legal-opt-in.customer-agreement',
    defaultMessage: 'Customer Agreement',
    description: 'Link for customer agreement',
  },
  legalOptInDescriptionWithLinks: {
    id: 'com.atlassian.migrations-platform.legal-opt-in.description-with-links',
    defaultMessage:
      "By choosing {message} you also agree to Atlassian's {privacyPolicy} and {customerAgreement}",
    description: 'Link for customer agreement',
  },
  legalOptInAllow: {
    id: 'com.atlassian.migrations-platform.legal-opt-in.allow',
    defaultMessage: 'Allow',
    description: 'Allow text for legal opt-in',
  },
  legalOptInFooterCancelButton: {
    id: 'com.atlassian.migrations-platform.legal-opt-in.cancel-footer-button',
    defaultMessage: 'Cancel',
    description: 'Footer cancel button for legal opt-in',
  },
  legalOptInFooterAllowButton: {
    id: 'com.atlassian.migrations-platform.legal-opt-in.allow-footer-button',
    defaultMessage: 'Allow',
    description: 'Footer allow button for legal opt-in',
  },
});
