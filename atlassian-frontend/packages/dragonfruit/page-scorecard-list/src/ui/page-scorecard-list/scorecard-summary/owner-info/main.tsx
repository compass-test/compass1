import React from 'react';

import { CommonMessages } from '@atlassian/dragonfruit-common-messages';
import { useIntl } from '@atlassian/dragonfruit-utils';

import { useScorecardFlags } from '../../../../services/flags';

import { OwnerLink, OwnerText } from './styled';

interface Props {
  ownerName: string | undefined;
  ownerAccountId: string;
  loading: boolean;
}

const OwnerInfo = ({ ownerName, ownerAccountId, loading }: Props) => {
  const { formatMessage } = useIntl();
  const { showScorecardOwnerErrorFlag } = useScorecardFlags();

  const profileUrl = `${window.location.origin}/people/${ownerAccountId}`;

  if (!loading && !ownerName) {
    showScorecardOwnerErrorFlag();
  }

  return ownerName ? (
    <OwnerText>
      {formatMessage(CommonMessages.owner)}
      <OwnerLink
        href={profileUrl}
        data-testid="page-scorecard-templates.ui.scorecard-summary.owner-link"
      >
        {ownerName}
      </OwnerLink>
    </OwnerText>
  ) : null;
};

export default OwnerInfo;
