import React, { useCallback } from 'react';
import { FormattedMessage } from 'react-intl';
import { useFlags } from '@atlaskit/flag';
import { ActionsType } from '@atlaskit/flag/types';
import SuccessIcon from '@atlaskit/icon/glyph/check-circle';
import {
  G300 as successColor,
  Y300 as primaryColour,
} from '@atlaskit/theme/colors';
import messages from './messages';
import WarningIcon from '@atlaskit/icon/glyph/warning';
import { messages as baseMessages } from '../../../view/flags/index';

const withAutoDismissFlagArgs = {
  isAutoDismiss: true,
};

const baseSuccessFlagArgs = {
  ...withAutoDismissFlagArgs,
  icon: <SuccessIcon label="Success" primaryColor={successColor} />,
};

const baseErrorFlagArgs = {
  ...withAutoDismissFlagArgs,
  icon: <WarningIcon label="Warning" primaryColor={primaryColour} />,
};

export const useEmbeddedPagesFlags = () => {
  const { showFlag } = useFlags();

  const showPagePublishedFlag = useCallback(
    () =>
      showFlag({
        ...baseSuccessFlagArgs,
        id: 'pagePublishedFlag',
        title: <FormattedMessage {...messages.pagePublishedFlagTitle} />,
        analyticsContext: {},
      }),
    [showFlag],
  );

  const showDraftSavedFlag = useCallback(
    (onOpenDraft?: () => void) => {
      const actions: ActionsType = onOpenDraft
        ? [
            {
              content: (
                <FormattedMessage {...messages.draftSavedFlagOpenDraft} />
              ),
              onClick: onOpenDraft,
            },
          ]
        : [];
      return showFlag({
        ...baseSuccessFlagArgs,
        id: 'draftSavedFlag',
        title: <FormattedMessage {...messages.draftSavedFlagTitle} />,
        description: (
          <FormattedMessage {...messages.draftSavedFlagDescription} />
        ),
        actions,
      });
    },
    [showFlag],
  );

  const showPageDeletedFlag = useCallback(
    () =>
      showFlag({
        ...baseSuccessFlagArgs,
        id: 'pageDeletedFlag',
        title: <FormattedMessage {...messages.pageDeletedFlagTitle} />,
      }),
    [showFlag],
  );

  const showErrorFlag = useCallback(
    () =>
      showFlag({
        ...baseErrorFlagArgs,
        id: 'pageErrorFlag',
        title: <FormattedMessage {...baseMessages['generic-error-heading']} />,
        description: (
          <FormattedMessage {...baseMessages['generic-error-description']} />
        ),
      }),
    [showFlag],
  );

  return {
    showPagePublishedFlag,
    showDraftSavedFlag,
    showPageDeletedFlag,
    showErrorFlag,
  };
};
