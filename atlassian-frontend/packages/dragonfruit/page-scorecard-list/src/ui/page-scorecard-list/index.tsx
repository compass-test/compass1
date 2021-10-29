import React, { useState } from 'react';

import { di } from 'react-magnetic-di';

import Button from '@atlaskit/button';
import EmptyState from '@atlaskit/empty-state';
import PageHeader from '@atlaskit/page-header';
import { Content, LeftSidebar, Main } from '@atlaskit/page-layout';
import Spinner from '@atlaskit/spinner/spinner';
import { CommonMessages } from '@atlassian/dragonfruit-common-messages';
import { MainContainer } from '@atlassian/dragonfruit-common-ui';
import { ErrorIcon } from '@atlassian/dragonfruit-common-ui/assets';
import {
  CompassScorecard,
  CompassScorecardConnection,
} from '@atlassian/dragonfruit-graphql';
import { SettingsNavigation } from '@atlassian/dragonfruit-navigation';
import { useTenantInfo } from '@atlassian/dragonfruit-tenant-context';
import { useIntl, withErrorBoundary } from '@atlassian/dragonfruit-utils';

import { useDeleteDialogController } from '../../controllers/delete-dialog-controller';
import { useScorecardFlags } from '../../services/flags';
import useGetScorecards from '../../services/get-scorecards';
import { CompassScorecardType } from '../../types';

import { NoScorecardsIcon } from './assets';
import CreateScorecardModal from './create-scorecard-modal';
import DeleteConfirmationDialog from './delete-dialog';
import EditScorecardModal from './edit-scorecard-modal';
import messages from './messages';
import ScorecardSummary from './scorecard-summary';
import { BodyWrapper, ErrorStateWrapper, SpinnerWrapper } from './styled';

type ScorecardDashboardProps = {
  /**
   * A `testId` prop is provided for specified elements, which is a unique
   * string that appears as a data attribute `data-testid` in the rendered code,
   * serving as a hook for automated tests */
  testId?: string;
};

const EmptyStateContent = () => {
  const { formatMessage } = useIntl();

  return (
    <Content>
      <Main>
        <ErrorStateWrapper>
          <EmptyState
            header={formatMessage(messages.errorStateTitle)}
            description={formatMessage(messages.errorStateBody)}
            imageUrl={NoScorecardsIcon}
          />
        </ErrorStateWrapper>
      </Main>
    </Content>
  );
};

const ScorecardDashboard = ({ testId }: ScorecardDashboardProps) => {
  di(useGetScorecards);

  const { formatMessage } = useIntl();
  const {
    showScorecardDeleteSuccessFlag,
    showScorecardDeleteErrorFlag,
    showScorecardUpdateSuccessFlag,
  } = useScorecardFlags();

  const [
    isCreateNewScorecardModalOpen,
    setIsCreateNewScorecardModalOpen,
  ] = useState(false);
  const [isEditScorecardModalOpen, setIsEditScorecardModalOpen] = useState(
    false,
  );
  const [currentEditingScorecardId, setCurrentEditingScorecardId] = useState(
    '',
  );

  const { cloudId, isAdmin: isAdministrator } = useTenantInfo();
  const isAdmin = isAdministrator();

  const { data, error, loading, refetch } = useGetScorecards(cloudId);

  const [
    { isDeleteModalOpen, activeScorecard },
    { openDeleteModal, closeDeleteModal, deleteScorecard },
  ] = useDeleteDialogController();

  const handleDeleteScorecardFlags = () => {
    deleteScorecard()
      .then(showScorecardDeleteSuccessFlag)
      .catch(showScorecardDeleteErrorFlag);
  };

  const deleteScorecardData = (
    scorecard: CompassScorecard,
  ): CompassScorecardType => {
    return {
      id: scorecard.id,
      name: scorecard.name,
    };
  };

  const ScrollableContent = () => {
    if (loading) {
      return (
        <>
          <PageHeader>{formatMessage(messages.scorecardPageTitle)}</PageHeader>
          <SpinnerWrapper>
            <Spinner
              size="large"
              testId="dragonfruit-scorecard-templates.loading-spinner"
            />
          </SpinnerWrapper>
        </>
      );
    }

    if (error) {
      return (
        <div data-testid="dragonfruit-scorecard-templates.error-state">
          <PageHeader>{formatMessage(messages.scorecardPageTitle)}</PageHeader>
          <EmptyState
            header={formatMessage(messages.errorStateTitle)}
            description={formatMessage(messages.errorStateBody)}
            imageUrl={ErrorIcon}
            primaryAction={
              <Button appearance="primary" onClick={() => refetch({ cloudId })}>
                {formatMessage(CommonMessages.retry)}
              </Button>
            }
          />
        </div>
      );
    }

    const allData = data?.compass?.scorecards as CompassScorecardConnection;

    const allScorecards = allData.nodes;

    if (allScorecards && allScorecards.length > 0) {
      return (
        <>
          <PageHeader actions={createContent}>
            {formatMessage(messages.scorecardPageTitle)}
          </PageHeader>

          <BodyWrapper>
            {allScorecards
              ?.filter((scorecard: CompassScorecard) => !scorecard._isDeleted)
              .map((scorecard: CompassScorecard) => (
                <ScorecardSummary
                  key={scorecard.id}
                  scorecard={scorecard}
                  isAdmin={isAdmin}
                  onEdit={() => {
                    setIsEditScorecardModalOpen(true);
                    setCurrentEditingScorecardId(scorecard.id);
                  }}
                  onDelete={() =>
                    openDeleteModal(deleteScorecardData(scorecard))
                  }
                  loading={loading}
                />
              ))}
          </BodyWrapper>
        </>
      );
    } else {
      return (
        <>
          <PageHeader>{formatMessage(messages.scorecardPageTitle)}</PageHeader>

          <EmptyState
            header={formatMessage(messages.emptyStateHeader)}
            description={formatMessage(messages.emptyStateBody)}
            imageUrl={NoScorecardsIcon}
            primaryAction={
              <Button
                appearance="primary"
                onClick={() => setIsCreateNewScorecardModalOpen(true)}
              >
                {formatMessage(messages.createScorecard)}
              </Button>
            }
          />
        </>
      );
    }
  };

  const createContent = (
    <Button
      onClick={() => setIsCreateNewScorecardModalOpen(true)}
      testId={messages.createScorecard.id}
    >
      {formatMessage(messages.createScorecard)}
    </Button>
  );
  /*
  This content displays the filtering/search elements for the scorecards settings page

  const barContent = (
    <TopNavWrapper>
      <SearchBar>
        <TextField
          isCompact
          elemAfterInput={
            <EditorSearchIcon
              label={formatMessage(messages.navBarSearchIcon)}
            />
          }
          placeholder={formatMessage(messages.navBarSearch)}
          aria-label={formatMessage(messages.navBarSearch)}
          css={{
            padding: 6,
          }}
        />
      </SearchBar>
      <ScorecardSettings styling="dropdown" />
    </TopNavWrapper>
  );
  */

  return (
    <Content testId="dragonfruit-scorecard-templates.ui.content">
      {isCreateNewScorecardModalOpen && (
        <CreateScorecardModal
          onSubmit={() => setIsCreateNewScorecardModalOpen(false)}
          onCancel={() => setIsCreateNewScorecardModalOpen(false)}
          testId={'dragonfruit-scorecard-templates'}
          isModalOpen={isCreateNewScorecardModalOpen}
        />
      )}

      {isEditScorecardModalOpen && (
        <EditScorecardModal
          scorecardId={currentEditingScorecardId}
          onSubmit={() => {
            setIsEditScorecardModalOpen(false);
            setCurrentEditingScorecardId('');
            showScorecardUpdateSuccessFlag();
          }}
          onCancel={() => {
            setIsEditScorecardModalOpen(false);
            setCurrentEditingScorecardId('');
          }}
          testId={'dragonfruit-scorecard-templates'}
          isModalOpen={isEditScorecardModalOpen}
        />
      )}
      {isDeleteModalOpen && (
        <DeleteConfirmationDialog
          name={activeScorecard?.name}
          onClose={closeDeleteModal}
          onSubmit={handleDeleteScorecardFlags}
        />
      )}

      <LeftSidebar
        testId="dragonfruit-scorecard-templates.ui.left-sidebar"
        id="left-sidebar"
        skipLinkTitle={formatMessage(messages.leftSidebarSkipLinkTitle)}
      >
        <SettingsNavigation />
      </LeftSidebar>

      <Main
        testId="dragonfruit-scorecard-templates.ui.main"
        id="main"
        skipLinkTitle={formatMessage(messages.mainSkipLinkTitle)}
      >
        <MainContainer data-testid={testId}>
          <ScrollableContent />
        </MainContainer>
      </Main>
    </Content>
  );
};

export default withErrorBoundary(ScorecardDashboard, {
  Fallback: EmptyStateContent,
  componentName: 'scorecardDashboard',
});
