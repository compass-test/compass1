import React from 'react';

import Avatar from '@atlaskit/avatar';
import Tooltip from '@atlaskit/tooltip';
import { CommonMessages } from '@atlassian/dragonfruit-common-messages';
import { ComponentTypeIcon } from '@atlassian/dragonfruit-components';
import {
  CompassComponentType,
  CompassScorecardImportance,
} from '@atlassian/dragonfruit-graphql';
import { useIntl } from '@atlassian/dragonfruit-utils';

import { ScorecardStandardIcon } from '../../scorecard-standard-icon';

import messages from './messages';
import {
  ComponentName,
  ComponentTypeContent,
  DetailsWrapper,
  ImportanceContent,
  ImportanceDescription,
  LabelCommon,
  NoOwner,
  OwnerContent,
  OwnerName,
  WrapperCommon,
} from './styled';

const Details = ({
  ownerName,
  ownerPicture,
  componentType,
  componentName,
  importance,
  testId = 'scorecard-full-view-details',
}: {
  ownerName?: string;
  ownerPicture?: string;
  componentType: CompassComponentType;
  componentName: string;
  importance: CompassScorecardImportance;
  testId?: string;
}) => {
  const { formatMessage } = useIntl();

  let importanceDescription;
  switch (importance) {
    case CompassScorecardImportance.REQUIRED:
      importanceDescription = formatMessage(CommonMessages.required);
      break;
    case CompassScorecardImportance.RECOMMENDED:
      importanceDescription = formatMessage(CommonMessages.recommended);
      break;
    default:
      importanceDescription = formatMessage(CommonMessages.userDefined);
  }

  let importanceTooltip;
  switch (importance) {
    case CompassScorecardImportance.REQUIRED:
      importanceTooltip = formatMessage(messages.importanceTypeRequiredTooltip);
      break;
    case CompassScorecardImportance.RECOMMENDED:
      importanceTooltip = formatMessage(
        messages.importanceTypeRecommendedTooltip,
      );
      break;
    default:
      importanceTooltip = formatMessage(
        messages.importanceTypeUserDefinedTooltip,
      );
  }

  let componentTypeTooltip;
  switch (componentType) {
    case CompassComponentType.APPLICATION:
      componentTypeTooltip = formatMessage(messages.applicationIconTooltip);
      break;
    case CompassComponentType.LIBRARY:
      componentTypeTooltip = formatMessage(messages.libraryIconTooltip);
      break;
    case CompassComponentType.SERVICE:
      componentTypeTooltip = formatMessage(messages.serviceIconTooltip);
      break;
    case CompassComponentType.OTHER:
      componentTypeTooltip = formatMessage(messages.otherIconTooltip);
      break;
    default:
      throw Error(
        `No tooltip has been defined for component type "${componentType}"`,
      );
  }

  return (
    <DetailsWrapper data-testid={testId}>
      <WrapperCommon>
        <LabelCommon>{formatMessage(messages.ownerLabel)}</LabelCommon>
        <OwnerContent>
          {ownerName ? (
            <>
              <Avatar
                appearance="circle"
                size="small"
                src={ownerPicture}
                testId={`${testId}-owner-picture`}
              />
              <OwnerName data-testid={`${testId}-owner-name`}>
                {ownerName}
              </OwnerName>
            </>
          ) : (
            <NoOwner data-testid={`${testId}-no-owner-name`}>
              {formatMessage(messages.noScorecardOwner)}
            </NoOwner>
          )}
        </OwnerContent>
      </WrapperCommon>

      <WrapperCommon>
        <LabelCommon>{formatMessage(messages.componentLabel)}</LabelCommon>
        <ComponentTypeContent>
          <Tooltip content={componentTypeTooltip}>
            <div>
              <ComponentTypeIcon
                size={'medium'}
                type={componentType}
                testId={`${testId}-component-type-icon`}
              />
            </div>
          </Tooltip>
          <ComponentName data-testid={`${testId}-component-name`}>
            {componentName}
          </ComponentName>
        </ComponentTypeContent>
      </WrapperCommon>

      <WrapperCommon>
        <LabelCommon>{formatMessage(messages.importanceLabel)}</LabelCommon>
        <Tooltip content={importanceTooltip}>
          <ImportanceContent>
            <ScorecardStandardIcon size={'medium'} importance={importance} />
            <ImportanceDescription data-testid={`${testId}-importance`}>
              {importanceDescription}
            </ImportanceDescription>
          </ImportanceContent>
        </Tooltip>
      </WrapperCommon>
    </DetailsWrapper>
  );
};

export default Details;
