import React from 'react';
import { mount } from 'enzyme';
import { IntlProvider } from 'react-intl';

import {
  FireScreenAnalytics,
  fireUIAnalytics,
} from '@atlassian/analytics-bridge';

import { isAdvancedUser } from '../_testUtils';

import {
  mockGspState,
  mockOpsgenieBaseUrl,
  mockServiceDeskBaseUrl,
  mockProductTours,
} from '../../common/mocks';
import { ProductTourKey } from '../../common/types';
import WalkthroughsSection from '../../ui/walkthroughs-section';
import { HeaderCard } from '../../ui/walkthroughs-section/header-card';
import { useTourReset } from '../../common/services/tour-reset';
import {
  VisibilityContainer,
  VisibilityData,
} from '../../common/services/visibility';
import {
  mockVisibilityDataStandard,
  mockVisibilityDataAdvanced,
  mockVisibilityDataEmpty,
} from '../../common/services/visibility/mocks';

import { ActionableItem } from '../../ui/walkthroughs-section/actionable-item';

const { Welcome, ChangeManagement, IncidentManagement } = ProductTourKey;

jest.mock('@atlassian/analytics-bridge', () => ({
  ...jest.requireActual<Object>('@atlassian/analytics-bridge'),
  fireUIAnalytics: jest.fn(),
}));

jest.mock('../../common/services/tour-reset', () => ({
  useTourReset: jest.fn(),
}));

const getVisibilityData = (visibilityDataStr: string) =>
  (visibilityDataStr === 'advanced' && mockVisibilityDataAdvanced) ||
  (visibilityDataStr === 'standard' && mockVisibilityDataStandard) ||
  (visibilityDataStr === 'empty' && mockVisibilityDataEmpty) ||
  mockVisibilityDataAdvanced;

describe('WalkthroughsSection', () => {
  const onBackMock = jest.fn();
  const onCloseMock = jest.fn();
  const onUserActivityMock = jest.fn();

  const mountWalkthroughsSection = (
    activeTour: ProductTourKey = IncidentManagement,
    visibilityData: VisibilityData = mockVisibilityDataAdvanced,
  ) => {
    const gspState = {
      ...mockGspState,
      properties: {
        ...mockGspState.properties,
        user: {
          ...mockGspState.properties.user,
          ...visibilityData.user,
        },
        workspace: visibilityData.workspace,
      },
    };

    return mount(
      <IntlProvider locale="en">
        <VisibilityContainer
          gspState={gspState}
          serviceDeskBaseUrl={mockServiceDeskBaseUrl}
          opsgenieBaseUrl={mockOpsgenieBaseUrl}
        >
          <WalkthroughsSection
            state={{
              ...mockProductTours,
              activeTour,
            }}
            onUserActivity={onUserActivityMock}
            onBack={onBackMock}
            onClose={onCloseMock}
          />
        </VisibilityContainer>
      </IntlProvider>,
    );
  };

  const innerCallback = jest.fn();

  beforeEach(() => {
    (useTourReset as any).mockImplementation(
      (_: any, tour: ProductTourKey) => () => innerCallback(tour),
    );
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should mount a screen event component with current tour as an attribute', () => {
    const wrapper = mountWalkthroughsSection();

    const analytics = wrapper.find(FireScreenAnalytics);
    expect(analytics).toHaveLength(1);
    expect(analytics.prop('attributes')).toEqual({
      activeTour: 'incident-management',
    });
  });

  it('should call onClose callback prop for header card onClose callback', () => {
    const wrapper = mountWalkthroughsSection();
    wrapper.find(HeaderCard).props().onClose();

    expect(onCloseMock).toBeCalledTimes(1);
  });

  it('should call onBack callback prop for header card onBack callback', () => {
    const wrapper = mountWalkthroughsSection();
    wrapper.find(HeaderCard).props().onBack();

    expect(onBackMock).toBeCalledTimes(1);
  });

  it('should fire a UI event when the tour reset button is clicked', () => {
    const wrapper = mountWalkthroughsSection();

    wrapper.find(ActionableItem).simulate('click');

    expect(fireUIAnalytics).toHaveBeenCalledTimes(1);
    expect(fireUIAnalytics).toHaveBeenCalledWith(
      expect.any(Object),
      'jsmGettingStartedPanelResetProductTour',
      {
        productTour: 'incident-management',
      },
    );
  });

  describe.each([
    [Welcome, 'standard'],
    [Welcome, 'empty'],
    [IncidentManagement, 'advanced'],
    [IncidentManagement, 'standard'],
    [ChangeManagement, 'empty'],
    [ChangeManagement, 'standard'],
  ])(
    'for %s tour and for %s visibility data',
    (activeTour, visibilityDataStr) => {
      it('passed callback is called with the right active tour', () => {
        const visibilityData = getVisibilityData(visibilityDataStr);
        const wrapper = mountWalkthroughsSection(
          activeTour as ProductTourKey,
          visibilityData,
        );

        wrapper.find(ActionableItem).simulate('click');

        if (isAdvancedUser(visibilityData)) {
          expect(innerCallback).toHaveBeenCalledWith(activeTour);
        } else {
          expect(innerCallback).toHaveBeenCalledWith(Welcome);
        }
        expect(onCloseMock).toBeCalledTimes(1);
      });
    },
  );
});
