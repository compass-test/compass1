import React from 'react';

import SectionMessage, {
  SectionMessageAction,
} from '@atlaskit/section-message';
import { getLinkTo } from '@atlassian/commerce-links';

export type ErrorAction = {
  text: React.ReactNode;
  onClick?: () => void;
  href?: string;
  key: string;
  testId?: string;
};

type ErrorMessageAction = {
  text: React.ReactNode;
  onClick?: () => void;
  href?: string;
  key: string;
  testId?: string;
};

export const tryAgainAction = (
  onClick: () => void,
  testId: string = 'error-message--try-again',
): ErrorMessageAction => ({
  key: 'try-again',
  text: 'Try again',
  onClick,
  testId: testId,
});

export const contactSupportAction = (): ErrorMessageAction => ({
  key: 'support',
  href: getLinkTo('support', 'en'),
  text: 'Contact support',
});

type Props = {
  title?: string;
  actions?: ErrorAction[];
  testId?: string;
};
export const ErrorMessage: React.FC<Props> = ({
  children,
  title,
  actions = [contactSupportAction()],
  testId = 'error-message',
}) => (
  <div role="alert">
    <SectionMessage
      testId={testId}
      appearance="error"
      title={title}
      actions={actions.map(({ text, ...restAction }) => (
        <SectionMessageAction {...restAction}>{text}</SectionMessageAction>
      ))}
    >
      <p>{children}</p>
    </SectionMessage>
  </div>
);
