import React, { FC, ReactElement } from 'react';

import { FormattedMessage, InjectedIntlProps, injectIntl } from 'react-intl';

import CheckIcon from '@atlaskit/icon/glyph/check-circle';
import ErrorIcon from '@atlaskit/icon/glyph/error';
import WarningIcon from '@atlaskit/icon/glyph/warning';
import Spinner from '@atlaskit/spinner';
import { G400, R400, Y500 } from '@atlaskit/theme/colors';
import { AnalyticsButton } from '@atlassian/mpt-elements';

import type { CurrentChecksStatus } from '../../../common/types';

import messages from './messages';
import { Wrapper } from './styled';

type Props = {
  checksStatus: CurrentChecksStatus;
  onViewChecks: () => void;
};

type ChecksContentMessagesWithIcons = {
  analyticsId?: string;
  icon: ReactElement;
  title: FormattedMessage.MessageDescriptor;
};

const preflightChecksStatusToMessages: Record<
  CurrentChecksStatus,
  ChecksContentMessagesWithIcons
> = {
  Running: {
    icon: <Spinner />,
    title: messages.currentChecksStatusRunningTitle,
  },
  Warning: {
    analyticsId: 'viewDetailsLink',
    icon: <WarningIcon label="Warning icon" primaryColor={Y500} />,
    title: messages.currentChecksStatusWarningTitle,
  },
  Error: {
    analyticsId: 'viewErrorsLink',
    icon: <ErrorIcon label="Error icon" primaryColor={R400} />,
    title: messages.currentChecksStatusErrorTitle,
  },
  BlockingExecutionError: {
    analyticsId: 'viewDetailsLink',
    icon: <WarningIcon label="Warning icon" primaryColor={Y500} />,
    title: messages.currentChecksStatusBlockingExecutionErrorTitle,
  },
  ExecutionError: {
    analyticsId: 'viewDetailsLink',
    icon: <WarningIcon label="Warning icon" primaryColor={Y500} />,
    title: messages.currentChecksStatusExecutionErrorTitle,
  },
  Success: {
    icon: <CheckIcon label="Check icon" primaryColor={G400} />,
    title: messages.currentChecksStatusSuccessTitle,
  },
};

const getMessages = (
  status: CurrentChecksStatus,
): ChecksContentMessagesWithIcons => {
  return preflightChecksStatusToMessages[status];
};

const ChecksContent: FC<InjectedIntlProps & Props> = ({
  checksStatus,
  onViewChecks,
  intl,
}) => {
  const { icon, title, analyticsId } = getMessages(checksStatus);
  const shouldShowChecksLink =
    checksStatus !== 'Running' && checksStatus !== 'Success';

  return (
    <Wrapper>
      {icon}
      &nbsp;
      {shouldShowChecksLink ? (
        <AnalyticsButton
          appearance="link"
          spacing="none"
          onClick={onViewChecks}
          analyticsId={analyticsId}
        >
          {intl.formatMessage(title)}
        </AnalyticsButton>
      ) : (
        intl.formatMessage(title)
      )}
    </Wrapper>
  );
};

export default injectIntl(ChecksContent);
