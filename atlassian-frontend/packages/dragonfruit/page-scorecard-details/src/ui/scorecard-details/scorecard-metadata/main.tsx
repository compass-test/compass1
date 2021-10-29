import React from 'react';

import { CommonMessages } from '@atlassian/dragonfruit-common-messages';
import { CompassScorecardImportance } from '@atlassian/dragonfruit-graphql';
import { ScorecardStandardIcon } from '@atlassian/dragonfruit-scorecards';
import { useIntl } from '@atlassian/dragonfruit-utils';

import messages from './messages';
import {
  ImportanceIconWithTextWrapper,
  ImportanceWrapper,
  MetadataWrapper,
  OwnerWrapper,
} from './styled';

type ScorecardMetadataProps = {
  ownerName?: string;
  ownerId?: string;
  importance: CompassScorecardImportance;
  testId?: string;
};

export const ScorecardMetadata = ({
  ownerName,
  ownerId,
  importance,
  testId,
}: ScorecardMetadataProps) => {
  const getImportanceType = (
    importanceType: CompassScorecardImportance,
  ): string => {
    switch (importanceType) {
      case CompassScorecardImportance.REQUIRED:
        return formatMessage(CommonMessages.required);
      case CompassScorecardImportance.RECOMMENDED:
        return formatMessage(CommonMessages.recommended);
      default:
        return formatMessage(CommonMessages.userDefined);
    }
  };
  const profileUrl = `${window.location.origin}/people/${ownerId}`;
  const dataTestId =
    testId || 'dragonfruit-page-scorecard-details.ui.scorecard-metadata';

  const { formatMessage } = useIntl();
  return (
    <MetadataWrapper data-testid={dataTestId}>
      {ownerId && (
        <OwnerWrapper>
          {formatMessage(messages.scorecardOwner)}{' '}
          <a href={profileUrl}>{ownerName}</a>
        </OwnerWrapper>
      )}
      <ImportanceWrapper>
        {formatMessage(messages.scorecardType)}
        <ImportanceIconWithTextWrapper>
          <ScorecardStandardIcon importance={importance} size="small" />
          {getImportanceType(importance)}
        </ImportanceIconWithTextWrapper>
      </ImportanceWrapper>
    </MetadataWrapper>
  );
};
