import React from 'react';
import { mount } from 'enzyme';
import { IntlProvider } from 'react-intl';
import { ANALYTICS_BRIDGE_CHANNEL } from '@atlassian/analytics-bridge';
import { AnalyticsListener } from '@atlaskit/analytics-next';

import {
  GspState,
  GspSectionKey,
  VisualState,
  Checklist,
  HeaderState,
  ChecklistTabKey,
  TaskId,
  ActiveState,
  Product,
  PropertyKey,
  Environment,
} from '../../common/types';
import {
  mockGspState,
  mockChecklist,
  mockSectionState,
  mockOpsgenieBaseUrl,
  mockServiceDeskBaseUrl,
} from '../../common/mocks';
import GettingStartedPanel from '../../ui';
import { ChecklistSection } from '../../ui/checklist-section';
import { InitialiseFeatureFlagsProps } from '../../ui/initialise-feature-flags';
import { PanelFooter } from '../../ui/panel-footer';
import { UrlDataProvider } from '../../common/ui/url-data';

jest.mock('../../ui/initialise-feature-flags', () => ({
  InitialiseFeatureFlags: ({ children }: InitialiseFeatureFlagsProps) =>
    children,
}));

const stateInChecklistWithVisualState = (
  visualState: VisualState,
): GspState => ({
  ...mockGspState,
  properties: {
    ...mockGspState.properties,
    user: {
      ...mockGspState.properties.user,
      visualState,
    },
  },
});

const stateWithActiveSection = (activeSection: GspSectionKey): GspState => ({
  ...mockGspState,
  properties: {
    ...mockGspState.properties,
    user: {
      ...mockGspState.properties.user,
      sectionState: JSON.stringify({
        ...JSON.parse(mockGspState.properties.user.sectionState),
        activeSection,
      }),
    },
  },
});

describe('<GettingStartedPanel />', () => {
  const onUserActivityMock = jest.fn();
  const onTaskComplete = jest.fn();
  // Needed to test for screen analytics events
  const onAnalyticsEvent = jest.fn();

  const mountGettingStartedPanel = (state: GspState) => {
    return mount(
      <IntlProvider locale="en">
        <AnalyticsListener
          channel={ANALYTICS_BRIDGE_CHANNEL}
          onEvent={onAnalyticsEvent}
        >
          <GettingStartedPanel
            state={state}
            serviceDeskBaseUrl={mockServiceDeskBaseUrl}
            opsgenieBaseUrl={mockOpsgenieBaseUrl}
            product={Product.ServiceDesk}
            environment={Environment.Staging}
            onUserActivity={onUserActivityMock}
            onTaskComplete={onTaskComplete}
            cloudId="some-cloud-id"
          />
        </AnalyticsListener>
      </IntlProvider>,
    );
  };

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should show checklist if visual state is FullPanel', () => {
    const state = stateInChecklistWithVisualState(VisualState.FullPanel);
    const wrapper = mountGettingStartedPanel(state);

    expect(wrapper.find(ChecklistSection)).toHaveLength(1);
  });

  it('should not show checklist if visual state is Lozenge', () => {
    const state = stateInChecklistWithVisualState(VisualState.Lozenge);
    const wrapper = mountGettingStartedPanel(state);

    expect(wrapper.find(ChecklistSection)).toHaveLength(0);
  });

  it('should update visualState to lozenge in onClose callback', () => {
    const state = stateInChecklistWithVisualState(VisualState.FullPanel);
    mountGettingStartedPanel(state).find(ChecklistSection).props().onClose();

    expect(onUserActivityMock).toBeCalledTimes(1);
    expect(onUserActivityMock).toBeCalledWith({
      key: PropertyKey.VisualState,
      value: VisualState.Lozenge,
    });
  });

  it('should update activeSection to Home in onBack callback', () => {
    const state = stateInChecklistWithVisualState(VisualState.FullPanel);
    mountGettingStartedPanel(state).find(ChecklistSection).props().onBack();

    expect(onUserActivityMock).toBeCalledTimes(1);
    expect(onUserActivityMock).toBeCalledWith({
      key: PropertyKey.SectionState,
      value: expect.anything(),
    });
    expect(
      JSON.parse(onUserActivityMock.mock.calls[0][0].value).activeSection,
    ).toBe(GspSectionKey.Home);
  });

  it('should not show checklist if active section is Home', () => {
    const state = stateWithActiveSection(GspSectionKey.Home);
    const wrapper = mountGettingStartedPanel(state);

    expect(wrapper.find(ChecklistSection)).toHaveLength(0);
  });

  it('should update checklist section state in onUserActivity callback', () => {
    const state = stateInChecklistWithVisualState(VisualState.FullPanel);
    const newChecklistState: Checklist = {
      ...mockChecklist,
      headerState: HeaderState.Minimized,
      activeTab: ChecklistTabKey.Incidents,
      tabs: {
        ...mockChecklist.tabs,
        basics: {
          ...mockChecklist.tabs.basics,
          activeTask: TaskId.GoBeyondBasics,
        },
      },
    };
    mountGettingStartedPanel(state)
      .find(ChecklistSection)
      .props()
      .onUserActivity(newChecklistState);

    expect(onUserActivityMock).toBeCalledTimes(1);

    // Expected version and documentation to be hardcoded for
    // the upgrade path.
    const expectedSectionState = {
      ...mockSectionState,
      version: 2,
      sections: {
        ...mockSectionState.sections,
        checklist: newChecklistState,
        documentation: undefined,
        productTours: mockSectionState.sections.productTours,
      },
    };
    expect(onUserActivityMock).toBeCalledWith({
      key: PropertyKey.SectionState,
      value: expect.anything(),
    });
    expect(JSON.parse(onUserActivityMock.mock.calls[0][0].value)).toEqual(
      expectedSectionState,
    );
  });

  it("should update active state to 'Off' in onExitQuickStart callback", () => {
    const state = stateInChecklistWithVisualState(VisualState.FullPanel);
    mountGettingStartedPanel(state)
      .find(PanelFooter)
      .props()
      .onExitQuickStart();

    expect(onUserActivityMock).toBeCalledTimes(1);
    expect(onUserActivityMock).toBeCalledWith({
      key: PropertyKey.ActiveState,
      value: ActiveState.Off,
    });
  });

  it('should set up the url data context', () => {
    const state = stateInChecklistWithVisualState(VisualState.FullPanel);
    const props = mountGettingStartedPanel(state).find(UrlDataProvider).props();

    expect(props.projectId).toBe(state.properties.user.projectId);
    expect(props.serviceDeskBaseUrl).toBe(mockServiceDeskBaseUrl);
    expect(props.opsgenieBaseUrl).toBe(mockOpsgenieBaseUrl);
  });

  it('should fire screen analytics events when mounted if visual state is FullPanel', () => {
    expect(onAnalyticsEvent).toHaveBeenCalledTimes(0);

    mountGettingStartedPanel(
      stateInChecklistWithVisualState(VisualState.FullPanel),
    );

    // fires screen event for GSP and for checklist section
    expect(onAnalyticsEvent).toHaveBeenCalledTimes(2);
    // doesn't matter which order these events are fired in
    expect(onAnalyticsEvent).toHaveBeenCalledWith(
      expect.objectContaining({
        context: [{ source: 'jsmGettingStartedPanelScreen' }],
        payload: expect.objectContaining({
          action: 'viewed',
          actionSubject: 'screen',
          analyticsType: 'SCREEN',
        }),
      }),
      ANALYTICS_BRIDGE_CHANNEL,
    );
    expect(onAnalyticsEvent).toHaveBeenCalledWith(
      expect.objectContaining({
        context: expect.arrayContaining([
          { source: 'jsmGettingStartedPanelChecklistBasicsTabScreen' },
        ]),
        payload: expect.objectContaining({
          action: 'viewed',
          actionSubject: 'screen',
          analyticsType: 'SCREEN',
        }),
      }),
      ANALYTICS_BRIDGE_CHANNEL,
    );
  });

  it('should not fire screen analytics event when mounted if visual state is Lozenge', () => {
    expect(onAnalyticsEvent).toHaveBeenCalledTimes(0);

    mountGettingStartedPanel(
      stateInChecklistWithVisualState(VisualState.Lozenge),
    );

    expect(onAnalyticsEvent).toHaveBeenCalledTimes(0);
  });
});
