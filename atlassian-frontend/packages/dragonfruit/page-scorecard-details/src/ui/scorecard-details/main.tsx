import React from 'react';

import { useAnalyticsEvents } from '@atlaskit/analytics-next';
import Breadcrumbs, { BreadcrumbsItem } from '@atlaskit/breadcrumbs';
import Button from '@atlaskit/button';
import { useFlags } from '@atlaskit/flag';
import PageHeader from '@atlaskit/page-header';
import { Content, Main } from '@atlaskit/page-layout';
import { fireUIAnalytics } from '@atlassian/analytics-bridge';
import { CommonMessages } from '@atlassian/dragonfruit-common-messages';
import {
  BaseInfoFlagProps,
  MainContainer,
  useModalControls,
} from '@atlassian/dragonfruit-common-ui';
import { ErrorIcon } from '@atlassian/dragonfruit-common-ui/assets';
import { CompassScorecard } from '@atlassian/dragonfruit-graphql';
import { EditScorecardModal } from '@atlassian/dragonfruit-page-scorecard-list';
import { routes } from '@atlassian/dragonfruit-routes';
import { useGetScorecard } from '@atlassian/dragonfruit-scorecards';
import { useTenantInfo } from '@atlassian/dragonfruit-tenant-context';
import { useIntl } from '@atlassian/dragonfruit-utils';

import { ComponentList } from './component-list';
import messages from './messages';
import { ScorecardMetadata } from './scorecard-metadata';
import {
  ComponentListWrapper,
  Description,
  ErrorStateWrapper,
  Header,
  Image,
} from './styled';
import { PageScorecardDetailsProps } from './types';

const pageScorecardDetailsErrorStateTestId =
  'dragonfruit.page-scorecard-details.error-state';

type ErrorStateProps = {
  scorecardId: string;
};

const PageScorecardDetailsErrorState = ({ scorecardId }: ErrorStateProps) => {
  const { formatMessage } = useIntl();
  return (
    <ErrorStateWrapper data-testid={pageScorecardDetailsErrorStateTestId}>
      <Header data-testid={`${pageScorecardDetailsErrorStateTestId}.header`}>
        {formatMessage(CommonMessages.somethingWentWrongFullStop)}
      </Header>
      <Image
        src={ErrorIcon}
        data-testid={`${pageScorecardDetailsErrorStateTestId}.error-image`}
      />
      <Description
        data-testid={`${pageScorecardDetailsErrorStateTestId}.description`}
      >
        {formatMessage(messages.errorStateBody)}
      </Description>
      <Button appearance="primary" href={routes.SCORECARD_DETAILS(scorecardId)}>
        {formatMessage(CommonMessages.retry)}
      </Button>
    </ErrorStateWrapper>
  );
};

export function PageScorecardDetails({
  scorecardId,
}: PageScorecardDetailsProps) {
  const { formatMessage } = useIntl();
  const { showFlag } = useFlags();
  const { cloudId, workspaceId } = useTenantInfo();
  const [
    { isOpen: isEditScorecardModalOpen },
    { open: openEditScorecardModal, close: closeEditScorecardModal },
  ] = useModalControls();

  const { createAnalyticsEvent } = useAnalyticsEvents();

  const onEditScorecardButtonClicked = () => {
    openEditScorecardModal();
    const event = createAnalyticsEvent({
      action: 'clicked',
      actionSubject: 'button',
    });

    fireUIAnalytics(event, 'editScorecard', { scorecardId: scorecardId });
  };

  const scorecardARI = `ari:cloud:compass:${cloudId}:scorecard/${workspaceId}/${scorecardId}`;
  const { data, error } = useGetScorecard({ id: scorecardARI });

  const scorecard = data?.compass?.scorecard as CompassScorecard;
  const breadcrumbs = (
    <Breadcrumbs>
      <BreadcrumbsItem
        href={routes.SCORECARD_LIST()}
        text={formatMessage(CommonMessages.scorecards)}
      />
    </Breadcrumbs>
  );

  const onSubmit = () => {
    closeEditScorecardModal();
    showFlag({
      ...BaseInfoFlagProps,
      id: 'dragonfruitScorecardDetailsEditScorecardSuccess',
      title: formatMessage(messages.scorecardEditSuccessTitle),
      description: formatMessage(messages.scorecardEditSuccessDescription),
      actions: [
        {
          content: formatMessage(CommonMessages.refresh),
          href: routes.SCORECARD_DETAILS(scorecardId),
        },
      ],
      testId:
        'dragonfruit-page-scorecard-details.ui.scorecard-edit.flag-success',
    });
  };

  return (
    <Content testId="dragonfruit-page-scorecard-details.ui.content">
      <Main
        testId="dragonfruit-page-scorecard-details.ui.main"
        id="main"
        skipLinkTitle={formatMessage(messages.scorecardDetailsSkipLink)}
      >
        <MainContainer>
          {data && (
            <>
              <PageHeader
                breadcrumbs={breadcrumbs}
                actions={
                  <Button
                    onClick={onEditScorecardButtonClicked}
                    testId={
                      'dragonfruit-page-scorecard-details.ui.scorecard-edit.button'
                    }
                  >
                    {formatMessage(messages.scorecardEditButton)}
                  </Button>
                }
                bottomBar={
                  <ScorecardMetadata
                    ownerName={scorecard.owner?.name}
                    ownerId={scorecard.owner?.accountId}
                    importance={scorecard.importance}
                  />
                }
              >
                {scorecard.name}
              </PageHeader>
              <ComponentListWrapper>
                <ComponentList
                  componentType={scorecard.componentType}
                  scorecardARI={scorecardARI}
                />
              </ComponentListWrapper>
              {isEditScorecardModalOpen && (
                <EditScorecardModal
                  onCancel={closeEditScorecardModal}
                  onSubmit={onSubmit}
                  scorecardId={scorecardARI}
                  testId="scorecard-details"
                  isModalOpen={isEditScorecardModalOpen}
                />
              )}
            </>
          )}
          {error && (
            <PageScorecardDetailsErrorState scorecardId={scorecardId} />
          )}
        </MainContainer>
      </Main>
    </Content>
  );
}
