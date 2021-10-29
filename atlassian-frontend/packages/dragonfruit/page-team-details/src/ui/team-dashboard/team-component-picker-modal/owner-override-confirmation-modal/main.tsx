import React from 'react';

import { ConfirmationModal } from '@atlassian/dragonfruit-common-ui';
import { useIntl } from '@atlassian/dragonfruit-utils';

import messages from './messages';

type ConfirmationModalProps = React.ComponentProps<typeof ConfirmationModal>;
type Props = Pick<
  ConfirmationModalProps,
  'isOpen' | 'onClose' | 'onSubmit' | 'isBlanketHidden'
>;

export const OwnerOverrideConfirmationModal = (props: Props) => {
  const { formatMessage } = useIntl();

  return (
    <ConfirmationModal
      {...props}
      appearance="warning"
      heading={formatMessage(messages.heading)}
      closeButton={formatMessage(messages.closeButton)}
      submitButton={formatMessage(messages.submitButton)}
      testId="dragonfruit-team-owner-override-confirmation-modal"
    >
      {formatMessage(messages.content)}
    </ConfirmationModal>
  );
};
