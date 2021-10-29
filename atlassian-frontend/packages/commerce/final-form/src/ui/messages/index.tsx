import React, { ReactNode } from 'react';

import SuccessIcon from '@atlaskit/icon/glyph/editor/success';
import ErrorIcon from '@atlaskit/icon/glyph/error';

import { IconWrapper, Message } from './styled';

interface Props {
  /** The content of the message */
  children: ReactNode;
  /** A testId prop is provided for specified elements, which is a unique string
   *  that appears as a data attribute data-testid in the rendered code,
   *  serving as a hook for automated tests
   */
  testId?: string;
  /** A fieldId prop is should be provided either through fieldProps or context
   */
  fieldId?: string;
}

export const HelperMessage = ({ children, testId, fieldId }: Props) => (
  <Message id={fieldId ? `${fieldId}-helper` : undefined} data-testid={testId}>
    {children}
  </Message>
);

export const ErrorMessage = ({ children, testId, fieldId }: Props) => (
  <Message
    error
    id={fieldId ? `${fieldId}-error` : undefined}
    data-testid={testId}
  >
    <IconWrapper>
      <ErrorIcon size="small" label="error" />
    </IconWrapper>
    {children}
  </Message>
);

export const ValidMessage = ({ children, testId, fieldId }: Props) => (
  <Message
    valid
    id={fieldId ? `${fieldId}-valid` : undefined}
    data-testid={testId}
  >
    <IconWrapper>
      <SuccessIcon size="small" label="success" />
    </IconWrapper>
    {children}
  </Message>
);
