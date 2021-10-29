import React from 'react';

import { FormattedMessage, FormattedNumber } from 'react-intl';

import msgs from './messages';
import { IssueCountNumber } from './styled';
import { Props } from './types';

const IssueCount = ({ issueCount, loading, limit }: Props) => {
  return (
    <span>
      <FormattedMessage {...msgs.issuesInPlan} />:{' '}
      <IssueCountNumber
        isOverLimit={limit !== undefined && issueCount > limit}
        loading={loading}
      >
        <FormattedNumber value={issueCount} />
      </IssueCountNumber>
    </span>
  );
};

export default IssueCount;
