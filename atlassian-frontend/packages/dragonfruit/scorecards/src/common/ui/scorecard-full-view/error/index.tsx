import React from 'react';

import { useFlags } from '@atlaskit/flag';
import { BaseErrorFlagProps } from '@atlassian/dragonfruit-common-ui';
import { useIntl } from '@atlassian/dragonfruit-utils';

import messages from './messages';

const Error = ({
  onClose,
  testId = 'scorecard-full-view-error',
}: {
  onClose: Function;
  testId?: string;
}) => {
  const { formatMessage } = useIntl();
  const { showFlag } = useFlags();

  onClose();

  const flag = {
    ...BaseErrorFlagProps,
    id: `dragonfruit-scorecards.common.ui.scorecard-full-view.error`,
    title: formatMessage(messages.title),
    description: formatMessage(messages.description),
    testId: testId,
  };
  showFlag(flag);

  return <></>;
};

export default Error;
