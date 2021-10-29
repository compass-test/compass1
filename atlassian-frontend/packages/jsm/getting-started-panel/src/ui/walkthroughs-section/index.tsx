import React from 'react';
import { injectIntl, InjectedIntlProps } from 'react-intl';

import {
  ContextualAnalyticsData,
  FireScreenAnalytics,
  fireUIAnalytics,
  SCREEN,
} from '@atlassian/analytics-bridge';
import { useAnalyticsEvents } from '@atlaskit/analytics-next';
import VidPlayIcon from '@atlaskit/icon/glyph/vid-play';

import { SectionContainer } from '../styled';
import HeaderCard from './header-card';
import { getTourDescription } from '../../common/ui';
import { walkthroughsSectionScreenName } from '../../common/analytics/constants';
import { ProductTours, ProductTourKey, HeaderState } from '../../common/types';
import { useUrlData } from '../../common/ui/url-data';
import { useTourReset } from '../../common/services/tour-reset';
import {
  DescriptionWrapper,
  Scrollable,
  TabContainerWrapper,
} from '../../common/ui/section';
import { getComponentTestId } from '../../common/util';
import { messages } from './messages';
import { ActionableItem } from './actionable-item';
import { useSdRole, SdVisibilityRoles } from '../../common/services/visibility';

interface Props {
  state: ProductTours;
  onUserActivity: (updatedState: ProductTours) => void;
  onClose: () => void;
  onBack: () => void;
}

const startMessageMap = {
  [ProductTourKey.Welcome]: messages.startWelcome,
  [ProductTourKey.IncidentManagement]: messages.startIncidentManagement,
  [ProductTourKey.ChangeManagement]: messages.startChangeManagement,
};

export const WalkthroughsSection = ({
  intl,
  state,
  onUserActivity,
  onBack,
  onClose,
}: Props & InjectedIntlProps) => {
  const urlData = useUrlData();
  const [sdRole] = useSdRole();
  const { createAnalyticsEvent } = useAnalyticsEvents();

  const activeTour =
    Object.values(ProductTourKey).includes(
      state.activeTour as ProductTourKey,
    ) && sdRole !== SdVisibilityRoles.Standard
      ? (state.activeTour as ProductTourKey)
      : ProductTourKey.Welcome;
  const resetTour = useTourReset(urlData, activeTour);

  const onTourSelected = (activeTour: ProductTourKey) => {
    const updatedState = {
      ...state,
      activeTour,
    };
    onUserActivity(updatedState);
  };
  const onHeaderStateChanged = (headerState: HeaderState) => {
    const updatedState = {
      ...state,
      headerState,
    };
    onUserActivity(updatedState);
  };

  const handleTourClick = () => {
    // Close the GSP on tour reset
    onClose();
    // ActionableItem onClick does not give us an Atlaskit event so we have
    // to create it ourselves. Because of this we don't have the context
    // populated automatically from ContextualAnalyticsData
    const event = createAnalyticsEvent({
      action: 'clicked',
      actionSubject: 'button',
    });
    event.context.push({
      source: `${walkthroughsSectionScreenName}${SCREEN}`,
    });
    fireUIAnalytics(event, 'jsmGettingStartedPanelResetProductTour', {
      productTour: activeTour,
    });
    resetTour();
  };

  return (
    <ContextualAnalyticsData
      sourceName={walkthroughsSectionScreenName}
      sourceType={SCREEN}
    >
      <SectionContainer>
        <HeaderCard
          productTours={state}
          onTourSelected={onTourSelected}
          onBack={onBack}
          onClose={onClose}
          onHeaderStateChanged={onHeaderStateChanged}
        />
        <Scrollable>
          <TabContainerWrapper
            data-testid={getComponentTestId('walkthroughsTabContainer')}
          >
            <DescriptionWrapper>
              {intl.formatMessage(getTourDescription(activeTour))}
            </DescriptionWrapper>
            <ActionableItem
              testId={getComponentTestId('walkthroughsStartButton')}
              onClick={handleTourClick}
              icon={
                <VidPlayIcon
                  label={intl.formatMessage(messages.startIcon)}
                  size="small"
                />
              }
            >
              {intl.formatMessage(startMessageMap[activeTour])}
            </ActionableItem>
          </TabContainerWrapper>
        </Scrollable>
        <FireScreenAnalytics attributes={{ activeTour }} />
      </SectionContainer>
    </ContextualAnalyticsData>
  );
};

export default injectIntl(WalkthroughsSection);
