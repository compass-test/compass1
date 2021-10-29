import React from 'react';

import Button from '@atlaskit/button';
import ButtonGroup from '@atlaskit/button/button-group';
import Tooltip from '@atlaskit/tooltip';
import { parse as parseAri } from '@atlassian/cs-ari';
import { CommonMessages } from '@atlassian/dragonfruit-common-messages';
import { Card, CardBody } from '@atlassian/dragonfruit-common-ui';
import { ComponentTypeIcon } from '@atlassian/dragonfruit-components';
import { useScorecardDetailsPageEnabled } from '@atlassian/dragonfruit-feature-flags';
import {
  CompassComponentType,
  CompassScorecard,
  CompassScorecardImportance,
} from '@atlassian/dragonfruit-graphql';
import { routes } from '@atlassian/dragonfruit-routes';
import { ScorecardStandardIcon } from '@atlassian/dragonfruit-scorecards';
import { useIntl } from '@atlassian/dragonfruit-utils';

import ScorecardMessages from './messages';
import { OwnerInfo } from './owner-info';
import {
  CardWrapper,
  Description,
  FooterWrapper,
  Heading,
  HeadingWrapper,
  ImportanceDescription,
  StandardDescriptionWrapper,
  StandardIconWrapper,
} from './styled';

type Props = {
  scorecard: CompassScorecard;
  isAdmin: boolean;
  onEdit: () => void;
  onDelete: () => void;
  loading: boolean;
};

type ImportanceIntlMessages = {
  iconTooltip: string;
  content: string;
};

const MAX_DESCRIPTION_PREVIEW_LENGTH = 108;

const ScorecardSummary = ({
  scorecard,
  isAdmin,
  onEdit,
  onDelete,
  loading,
}: Props) => {
  const { formatMessage } = useIntl();

  // Only administrators should be able to modify "required" scorecards
  const disableButtonsForNonAdmins: boolean =
    scorecard.importance === CompassScorecardImportance.REQUIRED && !isAdmin;

  const getImportanceTypeMessages = (
    importanceType: CompassScorecardImportance,
  ): ImportanceIntlMessages => {
    switch (importanceType) {
      case CompassScorecardImportance.REQUIRED:
        return {
          iconTooltip: formatMessage(CommonMessages.required),
          content: formatMessage(ScorecardMessages.RequiredImportanceContent),
        };
      case CompassScorecardImportance.RECOMMENDED:
        return {
          iconTooltip: formatMessage(CommonMessages.recommended),
          content: formatMessage(
            ScorecardMessages.RecommendedImportanceContent,
          ),
        };
      default:
        return {
          iconTooltip: formatMessage(CommonMessages.userDefined),
          content: formatMessage(
            ScorecardMessages.UserDefinedImportanceContent,
          ),
        };
    }
  };

  const getComponentTypeTooltip = (componentType: CompassComponentType) => {
    switch (componentType) {
      case CompassComponentType.SERVICE:
        return formatMessage(ScorecardMessages.ServiceIconTooltip);
      case CompassComponentType.APPLICATION:
        return formatMessage(ScorecardMessages.ApplicationIconTooltip);
      case CompassComponentType.LIBRARY:
        return formatMessage(ScorecardMessages.LibraryIconTooltip);
      case CompassComponentType.OTHER:
        return formatMessage(ScorecardMessages.OtherIconTooltip);
      default:
        return formatMessage(ScorecardMessages.UnknownComponentIconTooltip);
    }
  };

  const importanceMessages = getImportanceTypeMessages(scorecard.importance);
  let truncatedDescription = '';

  if (scorecard.description) {
    truncatedDescription =
      scorecard.description.length > MAX_DESCRIPTION_PREVIEW_LENGTH
        ? scorecard.description
            .substring(0, MAX_DESCRIPTION_PREVIEW_LENGTH - 3)
            .concat('...')
        : scorecard.description;
  }

  const getScorecardId = (resourceId: string) => {
    // cannot extract scorecard id directly from parseAri result so this function accomplishes just that from the resourceId which happens to include the workspace id
    const ids = resourceId.split('/');
    return ids[ids.length - 1];
  };

  return (
    <CardWrapper>
      <Card
        shadowOnHover={true}
        data-testid={`page-scorecard-templates.ui.scorecard-summary.summary-card.${scorecard.id}`}
      >
        <CardBody>
          <HeadingWrapper>
            <Heading data-testid="page-scorecard-templates.ui.scorecard-summary.card-heading">
              {scorecard.name}
            </Heading>
            <Tooltip
              content={getComponentTypeTooltip(scorecard.componentType)}
              testId="page-scorecard-templates.ui.scorecard-summary.tooltip.component-type"
            >
              <ComponentTypeIcon type={scorecard.componentType} />
            </Tooltip>
          </HeadingWrapper>
          {scorecard.owner != null && (
            <OwnerInfo
              data-testid="page-scorecard-templates.ui.scorecard-summary.owner-info"
              ownerAccountId={scorecard.owner.accountId}
              ownerName={scorecard!.owner!.name}
              loading={loading}
            />
          )}
          <StandardDescriptionWrapper data-testid="page-scorecard-templates.ui.scorecard-summary.standard-description">
            <Tooltip
              content={importanceMessages.content}
              testId="page-scorecard-templates.ui.scorecard-summary.tooltip.standard"
            >
              <StandardIconWrapper>
                <ScorecardStandardIcon
                  importance={scorecard.importance}
                  size={'small'}
                />

                <ImportanceDescription>
                  {importanceMessages.iconTooltip}
                </ImportanceDescription>
              </StandardIconWrapper>
            </Tooltip>
          </StandardDescriptionWrapper>
          <Description>{truncatedDescription}</Description>
          <FooterWrapper
            scorecardDetailsPageEnabled={useScorecardDetailsPageEnabled()}
          >
            {useScorecardDetailsPageEnabled() && (
              <Button
                appearance="link"
                spacing="none"
                href={routes.SCORECARD_DETAILS(
                  getScorecardId(parseAri(scorecard.id).resourceId!),
                )}
                testId="page-scorecard-templates.ui.scorecard-summary.view-components-button"
              >
                {formatMessage(ScorecardMessages.ViewComponentsButton)}
              </Button>
            )}
            <ButtonGroup>
              <Button
                appearance="subtle"
                isDisabled={disableButtonsForNonAdmins}
                onClick={onDelete}
                testId="page-scorecard-templates.ui.scorecard-summary.remove-button"
              >
                {formatMessage(CommonMessages.delete)}
              </Button>

              <Button
                isDisabled={disableButtonsForNonAdmins}
                onClick={onEdit}
                testId="page-scorecard-templates.ui.scorecard-summary.edit-button"
              >
                {formatMessage(CommonMessages.edit)}
              </Button>
            </ButtonGroup>
          </FooterWrapper>
        </CardBody>
      </Card>
    </CardWrapper>
  );
};

export default ScorecardSummary;
