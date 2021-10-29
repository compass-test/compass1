import React, { ComponentType, useContext, createContext } from 'react';
import noop from 'lodash/noop';
import { injectIntl, InjectedIntlProps } from 'react-intl';

import { fireUIAnalytics, SCREEN } from '@atlassian/analytics-bridge';
import { useAnalyticsEvents } from '@atlaskit/analytics-next';

import { walkthroughsSectionScreenName } from '../../../common/analytics/constants';
import {
  ProductTours,
  ProductTourKey,
  HeaderState,
} from '../../../common/types';
import { getComponentTestId } from '../../../common/util';
import { getTourTitle } from '../../../common/ui';

import { TourAvatar } from '../../../common/ui/avatar';
import {
  ExpansionContext,
  Expander,
  ExpansionButton,
} from '../../../common/ui/expansion';
import Navigation from '../../../common/ui/navigation';
import {
  useSdRole,
  SdVisibilityRoles,
} from '../../../common/services/visibility';

import messages from './messages';
import {
  HeaderCardContainer,
  Spacer,
  TourDataContainer,
  TourHeading,
  TourParagraph,
  InactiveTourList,
  InactiveTourContainer,
  ActiveTourContainer,
  Footer,
} from './styled';

const { Expanded, Minimized } = HeaderState;
const { Welcome, IncidentManagement, ChangeManagement } = ProductTourKey;

interface Props {
  productTours: ProductTours;
  onTourSelected: (tourKey: ProductTourKey) => void;
  onHeaderStateChanged: (headerState: HeaderState) => void;
  onBack: () => void;
  onClose: () => void;
}

// Use TourContext as an interim solution while there's no
// sweet state, to reduce wiring in tour-related components.
const TourContext = createContext({
  activeTour: IncidentManagement,
  onTourSelected: noop,
});

// The tour-related components are all obviously cohesive if kept together, but
// they're not good candidates for extraction because it doesn't make sense to
// reuse the components outside the productTour header.
type TourDataBaseProps = {
  tourKey: ProductTourKey;
  children?: JSX.Element;
} & InjectedIntlProps;
const TourDataBase: ComponentType<TourDataBaseProps> = ({
  tourKey,
  intl,
  children = undefined,
}) => (
  <TourDataContainer>
    <TourHeading>{intl.formatMessage(getTourTitle(tourKey))}</TourHeading>
    <TourParagraph>{intl.formatMessage(messages.guidedTour)}</TourParagraph>
    {children}
  </TourDataContainer>
);
export const TourData = injectIntl(TourDataBase);

const ActiveTour = () => {
  const { activeTour } = useContext(TourContext);
  const { isExpanded } = useContext(ExpansionContext);

  return (
    <ActiveTourContainer
      data-testid={getComponentTestId(`productTours-${activeTour}`)}
    >
      <TourAvatar tourKey={activeTour} isActive={isExpanded} />
      <TourData tourKey={activeTour} />
    </ActiveTourContainer>
  );
};

const ClickableTour: ComponentType<{
  tourKey: ProductTourKey;
}> = ({ tourKey }) => {
  const { createAnalyticsEvent } = useAnalyticsEvents();
  const { onTourSelected } = useContext(TourContext);

  const handleClick = () => {
    // TODO: InactiveTourContainer onClick does not give us an Atlaskit event so
    // we have to create it ourselves. Because of this we don't have the context
    // populated automatically from ContextualAnalyticsData
    const event = createAnalyticsEvent({
      action: 'clicked',
      actionSubject: 'productTour',
    });
    event.context.push({
      source: `${walkthroughsSectionScreenName}${SCREEN}`,
    });
    fireUIAnalytics(event, 'jsmGettingStartedPanelProductTour', {
      productTour: tourKey,
    });
    onTourSelected(tourKey);
  };

  return (
    <InactiveTourContainer
      key={tourKey}
      tabIndex={0}
      onClick={handleClick}
      data-testid={getComponentTestId(`productTour-${tourKey}`)}
    >
      <TourAvatar tourKey={tourKey} />
      <TourData tourKey={tourKey} />
    </InactiveTourContainer>
  );
};

export const HeaderCard = ({
  intl,
  productTours,
  onTourSelected,
  onHeaderStateChanged,
  onClose,
  onBack,
}: Props & InjectedIntlProps) => {
  const [sdRole] = useSdRole();

  const headerState =
    productTours.headerState !== undefined
      ? (productTours.headerState as HeaderState)
      : Expanded;
  const activeTour =
    Object.values(ProductTourKey).includes(
      productTours.activeTour as ProductTourKey,
    ) && sdRole !== SdVisibilityRoles.Standard
      ? (productTours.activeTour as ProductTourKey)
      : Welcome;

  // Map from common types to booleans to be compatible with
  // a reusable .
  const isExpanded = headerState === Expanded;
  const toggleExpanded = isExpanded
    ? () => onHeaderStateChanged(Minimized)
    : () => onHeaderStateChanged(Expanded);

  const secondTour = activeTour === Welcome ? IncidentManagement : Welcome;
  const thirdTour =
    activeTour === ChangeManagement ? IncidentManagement : ChangeManagement;

  return (
    <TourContext.Provider
      value={{
        activeTour,
        onTourSelected,
      }}
    >
      <ExpansionContext.Provider value={{ isExpanded, toggleExpanded }}>
        <HeaderCardContainer>
          <Navigation onClose={onClose} onBack={onBack}>
            {intl.formatMessage(messages.walkthroughs)}
          </Navigation>
          <ActiveTour />
          {sdRole === SdVisibilityRoles.Advanced && (
            <>
              <InactiveTourList isExpanded={isExpanded}>
                <Expander>
                  <ClickableTour tourKey={secondTour} />
                  <ClickableTour tourKey={thirdTour} />
                </Expander>
              </InactiveTourList>
              <Footer>
                <Spacer />
                <ExpansionButton />
              </Footer>
            </>
          )}
        </HeaderCardContainer>
      </ExpansionContext.Provider>
    </TourContext.Provider>
  );
};

export default injectIntl(HeaderCard);
