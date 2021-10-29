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

type ErrorMessageProps = {
  title?: string;
  actions?: ErrorAction[];
  contactActionText?: string;
};

export const ErrorMessage: React.FC<ErrorMessageProps> = ({
  children,
  title,
  actions = [],
  contactActionText = 'Contact support',
}) => {
  const messageActions = [
    ...actions,
    {
      key: 'support',
      href: getLinkTo('support', 'en'),
      text: contactActionText,
    },
  ];

  return (
    <div role="alert">
      <SectionMessage
        appearance="error"
        title={title}
        actions={messageActions.map(({ text, ...restAction }) => (
          <SectionMessageAction {...restAction}>{text}</SectionMessageAction>
        ))}
      >
        <p>{children}</p>
      </SectionMessage>
    </div>
  );
};
