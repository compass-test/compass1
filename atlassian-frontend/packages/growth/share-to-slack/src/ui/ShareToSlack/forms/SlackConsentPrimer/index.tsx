import React, { useCallback, useEffect, useRef } from 'react';

import styled from 'styled-components';

import Button, { ButtonGroup } from '@atlaskit/button';

import {
  useSlackConsentPrimerAddSlackTeamClickedEvent,
  useSlackConsentPrimerCloseButtonClickedEvent,
} from '../../../../common/analytics';
import type { AtlassianProduct, MessageKey } from '../../../../common/types';
import useFormattedMessage from '../../../../common/useFormattedMessage';

import confluencePrimer from './assets/confluence-primer.svg';
import jiraPrimer from './assets/jira-primer.svg';

const ImageContainer = styled.div`
  border-top-left-radius: 3px;
  border-top-right-radius: 3px;
  overflow: hidden;
  background: #0052cc;
  width: 100%;
`;

const Image = styled.img`
  display: block;
  width: 100%;
`;

const Content = styled.div`
  box-sizing: border-box;
  text-align: center;
`;

const Heading = styled.h4`
  margin: 0;
  padding: 24px;
  font-size: 24px;
  font-weight: 500;
  text-align: center;
`;

const Paragraph = styled.p`
  margin: 0 auto;
  padding-bottom: 24px;
  width: calc(100% - 48px);
  max-width: 310px;
`;

const ButtonGroupWrapper = styled.div`
  padding: 0 24px 32px;
`;

const headingKey: { [key in AtlassianProduct]: MessageKey } = {
  jira: 'consentPrimerHeadingJira',
  confluence: 'consentPrimerHeadingConfluence',
};

const messageKey: { [key in AtlassianProduct]: MessageKey } = {
  jira: 'consentPrimerMessageJira',
  confluence: 'consentPrimerMessageConfluence',
};

const submitButtonKey: { [key in AtlassianProduct]: MessageKey } = {
  jira: 'consentPrimerSubmitButtonJira',
  confluence: 'consentPrimerSubmitButtonConfluence',
};

const primer: { [key in AtlassianProduct]: string } = {
  jira: jiraPrimer,
  confluence: confluencePrimer,
};

type Props = {
  className?: string;
  product: AtlassianProduct;
  onConfirm: () => void;
  onCancel: () => void;
};

export default function SlackConsentPrimer({
  className,
  product,
  onConfirm,
  onCancel,
}: Props) {
  const heading = useFormattedMessage(headingKey[product]);
  const preamble = useFormattedMessage(messageKey[product]);
  const submitButton = useFormattedMessage(submitButtonKey[product]);
  const cancelButton = useFormattedMessage('consentPrimerCancelButton');

  // Analytics
  const fireSubmitButtonClickedEvent = useSlackConsentPrimerAddSlackTeamClickedEvent();
  const fireCancelButtonClickedEvent = useSlackConsentPrimerCloseButtonClickedEvent();

  const onClickSubmit = useCallback(() => {
    fireSubmitButtonClickedEvent();
    onConfirm();
  }, [fireSubmitButtonClickedEvent, onConfirm]);

  const onClickCancel = useCallback(() => {
    fireCancelButtonClickedEvent();
    onCancel();
  }, [fireCancelButtonClickedEvent, onCancel]);

  // Auto-focus the submit button so *something* in this form is focused,
  // otherwise the page could arbitrarily scroll to some other element.
  const submitButtonRef = useRef<HTMLButtonElement>(null);
  useEffect(() => submitButtonRef.current?.focus(), []);

  return (
    <div data-testid="share-to-slack-primer" className={className}>
      <ImageContainer>
        <Image src={primer[product]} alt="" />
      </ImageContainer>
      <Content>
        <Heading>{heading}</Heading>
        <Paragraph>{preamble}</Paragraph>
        <ButtonGroupWrapper>
          <ButtonGroup>
            <Button
              testId="share-to-slack-primer__cancel"
              onClick={onClickCancel}
            >
              {cancelButton}
            </Button>
            <Button
              ref={submitButtonRef}
              testId="share-to-slack-primer__submit"
              appearance="primary"
              onClick={onClickSubmit}
            >
              {submitButton}
            </Button>
          </ButtonGroup>
        </ButtonGroupWrapper>
      </Content>
    </div>
  );
}
