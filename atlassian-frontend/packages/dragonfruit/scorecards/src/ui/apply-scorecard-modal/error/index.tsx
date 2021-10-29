import React from 'react';

import { FormattedMessage } from 'react-intl';

import { useFlags } from '@atlaskit/flag';
import { CommonMessages } from '@atlassian/dragonfruit-common-messages';
import { BaseErrorFlagProps } from '@atlassian/dragonfruit-common-ui';

const Error = ({
  onClose,
  testId = 'dragonfruit-scorecards.apply-scorecard-modal.flags.general-error-flag',
}: {
  onClose: Function;
  testId?: string;
}) => {
  const { showFlag } = useFlags();

  onClose();

  showFlag({
    ...BaseErrorFlagProps,
    id:
      'dragonfruit-scorecards.apply-scorecard-modal.flags.general-error-flag-id',
    title: <FormattedMessage {...CommonMessages.somethingWentWrongFullStop} />,
    description: (
      <FormattedMessage
        {...CommonMessages.somethingWentWrongPleaseTryAgainFullStop}
      />
    ),
    testId,
  });

  return <></>;
};

export default Error;
