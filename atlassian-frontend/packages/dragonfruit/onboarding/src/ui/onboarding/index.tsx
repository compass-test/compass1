import React, { useCallback, useState } from 'react';

import { useRouterActions } from 'react-resource-router';

import Blanket from '@atlaskit/blanket';
import { Theme as ButtonTheme } from '@atlaskit/button';
import Button from '@atlaskit/button/custom-theme-button';
import { Modal, spotlightButtonTheme } from '@atlaskit/onboarding';
import { ProgressIndicator } from '@atlaskit/progress-indicator';
import {
  ContextualAnalyticsData,
  FireScreenAnalytics,
  fireUIAnalytics,
  MODAL,
} from '@atlassian/analytics-bridge';
import { CreateComponentModal } from '@atlassian/dragonfruit-component-create-modal';
import { useCompassOnboardingModalEnabled } from '@atlassian/dragonfruit-feature-flags';
import { CompassComponent } from '@atlassian/dragonfruit-graphql';
import { Team, TeamCreateDialog } from '@atlassian/dragonfruit-people-teams';
import { useTeamsOfUser } from '@atlassian/dragonfruit-rest';
import { routes } from '@atlassian/dragonfruit-routes';
import { useTenantInfo } from '@atlassian/dragonfruit-tenant-context';
import { useIntl } from '@atlassian/dragonfruit-utils';

import ComponentsBG from '../../../assets/Components BG.svg';
import ScorecardsBG from '../../../assets/Scorecards BG.svg';
import TeamsBG from '../../../assets/Teams BG.svg';
import { useOnboardingState } from '../../services/useOnboardingState';

import messages from './messages';
import { Footer, FooterItem, TextStyled, Wrapper } from './styled';

interface Props {
  selectedIndex: number;
}

export const Onboarding = (props: Props) => {
  const [selectedIndex, setIndex] = useState(props.selectedIndex);
  const [isCreateTeamFormOpen, setIsCreateTeamFormOpen] = useState(false);
  const [isCreateComponentFormOpen, setIsCreateComponentFormOpen] = useState(
    false,
  );
  const onboardingModalEnabled = useCompassOnboardingModalEnabled();

  const state = useOnboardingState('onboarding-modal-v1');
  const [active, setActive] = useState(true);
  const { formatMessage } = useIntl();
  const { cloudId, accountId, orgId } = useTenantInfo();
  const { push } = useRouterActions();
  const result = useTeamsOfUser(accountId, orgId); // shows what teams a user is part of, if any
  const teamsUserIsPartOf = result.data?.entities;
  const creationFormIsOpen = isCreateComponentFormOpen || isCreateTeamFormOpen;

  const onCreateComponentClose = useCallback(
    () => setIsCreateComponentFormOpen(false),
    [setIsCreateComponentFormOpen],
  );

  const onCreateComponentSuccess = useCallback(
    (componentId: CompassComponent['id']) => {
      push(routes.COMPONENT_DETAILS(componentId));
      onCreateComponentClose();
    },
    [push, onCreateComponentClose],
  );

  const onCreateTeamSuccess = useCallback(
    (team: Team) => {
      push(routes.TEAM_DETAILS(team.id));
    },
    [push],
  );

  //Checks if the onboarding feature flag is enabled and if the page has already been viewed
  if (
    !onboardingModalEnabled ||
    (onboardingModalEnabled && state.wasViewed() && !creationFormIsOpen)
  ) {
    return null;
  }

  const headers = [
    formatMessage(messages.header1),
    formatMessage(messages.header2),
    formatMessage(messages.header3),
  ];

  const text = [
    formatMessage(messages.text1),
    formatMessage(messages.text2),
    formatMessage(messages.text3),
  ];

  const images = [ComponentsBG, ScorecardsBG, TeamsBG];

  const handleSkip = () => {
    setActive(false);
    state.markViewed();
  };

  const handleNext = () => {
    if (selectedIndex === headers.length - 1) {
      setActive(false);
      teamsUserIsPartOf && teamsUserIsPartOf?.length > 0
        ? setIsCreateComponentFormOpen(true)
        : setIsCreateTeamFormOpen(true);
      state.markViewed();
    }

    if (selectedIndex < headers.length - 1) {
      setIndex(prevIndex => prevIndex + 1);
    }
  };

  if (!active && !creationFormIsOpen) {
    return null;
  }

  return (
    <ContextualAnalyticsData sourceType={MODAL} sourceName="OnboardingModal">
      <Wrapper data-testid={'dragonfruit-onboarding'}>
        {active && (
          <Modal
            heading={headers[selectedIndex]}
            header={() => (
              <img
                src={images[selectedIndex]}
                height="350px"
                width="600px"
                data-testid={'dragonfruit-onboarding-header'}
              />
            )}
            experimental_shouldShowPrimaryButtonOnRight
          >
            <TextStyled>{text[selectedIndex]}</TextStyled>
            <Footer>
              <FooterItem>
                <Button
                  appearance="subtle"
                  onClick={(event, analyticsEvent) => {
                    fireUIAnalytics(
                      analyticsEvent,
                      'skipButtonOnboardingModal',
                    );
                    handleSkip();
                  }}
                >
                  {formatMessage(messages.skipButton)}
                </Button>
              </FooterItem>
              <FooterItem>
                <ProgressIndicator
                  selectedIndex={selectedIndex}
                  values={headers}
                  appearance={'help'}
                  onSelect={e => setIndex(e.index)}
                />
              </FooterItem>
              <FooterItem>
                <ButtonTheme.Provider value={spotlightButtonTheme}>
                  <Button
                    label="next-button"
                    onClick={(event, analyticsEvent) => {
                      if (selectedIndex === headers.length - 1) {
                        fireUIAnalytics(
                          analyticsEvent,
                          'completedOnboardingModal',
                        );
                      }
                      handleNext();
                    }}
                  >
                    {selectedIndex === headers.length - 1
                      ? teamsUserIsPartOf && teamsUserIsPartOf?.length > 0
                        ? formatMessage(messages.createComponentButton)
                        : formatMessage(messages.startTeamButton)
                      : formatMessage(messages.nextButton)}
                  </Button>
                </ButtonTheme.Provider>
              </FooterItem>
            </Footer>
          </Modal>
        )}
        {!active &&
          teamsUserIsPartOf &&
          teamsUserIsPartOf?.length > 0 &&
          isCreateComponentFormOpen && (
            <CreateComponentModal
              isBlanketHidden={true}
              onSuccess={onCreateComponentSuccess}
              onClose={() => setIsCreateComponentFormOpen(false)}
            />
          )}
        {!active &&
          (!teamsUserIsPartOf || teamsUserIsPartOf?.length === 0) &&
          isCreateTeamFormOpen && (
            <div>
              <TeamCreateDialog
                principalId={accountId}
                cloudId={cloudId}
                orgId={orgId}
                product="compass"
                onCreateTeamSuccess={onCreateTeamSuccess}
                onClose={() => setIsCreateTeamFormOpen(false)}
                isBlanketHidden
              />
              <Blanket isTinted={true} />
            </div>
          )}
        <FireScreenAnalytics />
      </Wrapper>
    </ContextualAnalyticsData>
  );
};

Onboarding.defaultProps = {
  selectedIndex: 0,
};
