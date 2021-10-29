import React, { ReactNode } from 'react';

import { FormattedMessage } from 'react-intl';

import Button, { ButtonProps } from '@atlaskit/button/standard-button';
import ModalDialog, {
  ModalBody,
  ModalFooter,
  ModalHeader,
  ModalTitle,
} from '@atlaskit/modal-dialog';
import { MessageDescriptor } from '@atlassian/proforma-translations';

import { PfLink } from '../links';
import { ModalTitleContainer } from '../styled';

import { ErrorSection } from './ErrorSection';
import { IntlNoticeMessages, NoticeMessage } from './NoticeMessages.intl';

interface NoticeProps {
  title: MessageDescriptor;
  titleVars?: { [varName: string]: string };
  message: MessageDescriptor;
  messageVars?: { [varName: string]: string };
  confirmText: MessageDescriptor;
  confirmLink?: string;
  handleClose: (confirmed?: boolean) => void;
  isErrorNotice?: boolean;
  errorDetails?: string;
  isWarningNotice?: boolean;
  // Used in server to force our notices to pop over the Issue Forms dialog
  overrideZIndex?: boolean;
}

export const NoticeDialog: React.FC<NoticeProps> = ({
  title,
  titleVars,
  message,
  messageVars,
  confirmText,
  confirmLink,
  handleClose,
  isErrorNotice,
  errorDetails,
  isWarningNotice,
  overrideZIndex,
}) => {
  const appearance = isErrorNotice
    ? 'danger'
    : isWarningNotice
    ? 'warning'
    : undefined;

  const actions: Array<ButtonProps & { text: ReactNode }> = [];
  if (isErrorNotice || isWarningNotice) {
    // No unconfirmed close button.
  } else if (confirmLink) {
    actions.push({
      text: <FormattedMessage {...IntlNoticeMessages[NoticeMessage.Close]} />,
      onClick: (): void => handleClose(false),
      appearance: 'subtle',
    });
  } else {
    actions.push({
      text: <FormattedMessage {...IntlNoticeMessages[NoticeMessage.Cancel]} />,
      onClick: (): void => handleClose(false),
      appearance: 'subtle',
    });
  }

  const primaryButtonAppearance = appearance || 'primary';
  if (confirmLink) {
    actions.push({
      // @ts-ignore
      text: <FormattedMessage {...confirmText} />,
      href: confirmLink,
      target: '_blank',
      rel: 'noopener noreferrer',
      appearance: primaryButtonAppearance,
    });
  } else {
    actions.push({
      // @ts-ignore
      text: <FormattedMessage {...confirmText} />,
      onClick: (): void => handleClose(true),
      appearance: primaryButtonAppearance,
    });
  }

  let onOpenCompleteF:
    | ((node: HTMLElement, isAppearing: boolean) => void)
    | undefined;
  if (overrideZIndex) {
    onOpenCompleteF = (node, isAppearing) => {
      overrideZIndex && node.parentElement
        ? (node.parentElement.style.zIndex = '5000')
        : undefined;
    };
  }

  return (
    <ModalDialog
      onOpenComplete={onOpenCompleteF}
      onClose={() => handleClose()}
      shouldCloseOnOverlayClick={false}
    >
      <ModalHeader>
        <ModalTitleContainer>
          <ModalTitle appearance={appearance}>
            {
              // @ts-ignore
              <FormattedMessage {...title} values={titleVars} />
            }
          </ModalTitle>
        </ModalTitleContainer>
      </ModalHeader>

      <ModalBody>
        <div>
          {
            // @ts-ignore
            <FormattedMessage {...message} values={messageVars} />
          }
        </div>
        {isErrorNotice && (
          <p>
            <FormattedMessage
              {...IntlNoticeMessages[NoticeMessage.ErrorExplanations1]}
            />{' '}
            <PfLink
              href="http://links.thinktilt.net/error-explanations"
              message={IntlNoticeMessages[NoticeMessage.ErrorExplanations2]}
            />{' '}
            <FormattedMessage
              {...IntlNoticeMessages[NoticeMessage.ErrorExplanations3]}
            />{' '}
            <PfLink
              href="https://support.thinktilt.com/"
              message={IntlNoticeMessages[NoticeMessage.ErrorExplanations4]}
            />
            .
          </p>
        )}
        {!!errorDetails && <ErrorSection errorDetails={errorDetails} />}
      </ModalBody>
      <ModalFooter>
        {actions.map(({ text, ...props }) => (
          <Button {...props}>{text}</Button>
        ))}
      </ModalFooter>
    </ModalDialog>
  );
};
