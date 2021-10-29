import React from 'react';

import SectionMessage, {
  SectionMessageAction,
} from '@atlaskit/section-message';
import { getLinkTo } from '@atlassian/commerce-links';

export const InsecureIframeErrorMessage = () => (
  <SectionMessage
    appearance="error"
    title="Unable to continue"
    actions={[
      {
        key: 'support',
        href: getLinkTo('support', 'en'),
        text: 'Contact support',
      },
    ].map(({ text, ...restAction }) => (
      <SectionMessageAction {...restAction}>{text}</SectionMessageAction>
    ))}
  >
    We've detected an insecure environment and not able to display the credit
    card form.
  </SectionMessage>
);

const isSecureEnvironment = () =>
  // top frame
  self === top ||
  (window &&
    // dev mode - storybook env
    (window.location.pathname.startsWith('/iframe') ||
      // dev mode - site env
      window.location.pathname.startsWith('/examples.html')));

export const FrameBreaker: React.FC<{
  disabled?: boolean;
}> = ({ children, disabled }) =>
  disabled || isSecureEnvironment() ? (
    (children as any)
  ) : (
    <InsecureIframeErrorMessage />
  );
