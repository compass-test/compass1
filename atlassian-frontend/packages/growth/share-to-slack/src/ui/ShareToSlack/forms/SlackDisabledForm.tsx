import React, { useCallback, useEffect, useRef } from 'react';

import styled from 'styled-components';

import Button from '@atlaskit/button';

import { useSlackDisabledDialogCloseButtonClickedEvent } from '../../../common/analytics';
import type { AtlassianProduct, MessageKey } from '../../../common/types';
import useFormattedMessage from '../../../common/useFormattedMessage';

const Content = styled.div`
  display: flex;
  flex-direction: column;
  padding: 2px 24px;

  > button {
    margin: 24px 0 24px auto;
  }
`;

const Heading = styled.h4`
  margin: 0;
  padding: 24px 0 12px;
  font-size: 24px;
  font-weight: 500;
`;

const headingKey: { [key in AtlassianProduct]: MessageKey } = {
  jira: 'slackDisabledHeadingJira',
  confluence: 'slackDisabledHeadingConfluence',
};

const messageKey: { [key in AtlassianProduct]: MessageKey } = {
  jira: 'slackDisabledMessageJira',
  confluence: 'slackDisabledMessageConfluence',
};

type Props = {
  className?: string;
  product: AtlassianProduct;
  onClose: () => void;
};

export default function SlackDisabledForm({
  className,
  product,
  onClose,
}: Props) {
  const heading = useFormattedMessage(headingKey[product]);
  const message = useFormattedMessage(messageKey[product]);
  const closeButton = useFormattedMessage('slackDisabledCloseButton');

  // Analytics
  const fireCancelClickedEvent = useSlackDisabledDialogCloseButtonClickedEvent();

  const onClickClose = useCallback(() => {
    fireCancelClickedEvent();
    onClose();
  }, [fireCancelClickedEvent, onClose]);

  // Auto-focus the close button so *something* in this form is focused,
  // otherwise the page could arbitrarily scroll to some other element.
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  useEffect(() => closeButtonRef.current?.focus(), []);

  return (
    <Content data-testid="share-to-slack-disabled" className={className}>
      <Heading>{heading}</Heading>
      <p>{message}</p>
      <Button
        ref={closeButtonRef}
        testId="share-to-slack-disabled__close"
        appearance="primary"
        onClick={onClickClose}
      >
        {closeButton}
      </Button>
    </Content>
  );
}
