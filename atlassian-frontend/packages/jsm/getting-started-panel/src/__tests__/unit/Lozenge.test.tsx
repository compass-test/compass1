import React from 'react';
import {
  fireUIAnalytics,
  ANALYTICS_BRIDGE_CHANNEL,
} from '@atlassian/analytics-bridge';
import { AnalyticsListener } from '@atlaskit/analytics-next';
import Button from '@atlaskit/button';

import { InitialiseFeatureFlagsProps } from '../../ui/initialise-feature-flags';
import Lozenge from '../../ui/lozenge';
import { ChecklistIcon } from '../../ui/lozenge/utils';
import {
  CloseButton,
  Props as CloseButtonProps,
} from '../../ui/lozenge/close-button';
import { Outer, TabName, TaskName, Title } from '../../ui/lozenge/styled';
import { mount, ReactWrapper } from 'enzyme';
import { IntlProvider } from 'react-intl';
import {
  ActiveState,
  BasicsTaskIds,
  ChangesTaskIds,
  HeaderState,
  ChecklistTabKey,
  ProductTourKey,
  Environment,
  GspSectionKey,
  GspState,
  HasSeenReopenSpotlight,
  IncidentsTaskIds,
  Product,
  PropertyKey,
  SectionState,
  VisualState,
} from '../../common/types';
import { mockVisibilityDataAllKeys } from '../../common/services/visibility/mocks';
import { ZoomIn } from '@atlaskit/motion';
import {
  mockCompletedTasks,
  mockServiceDeskBaseUrl,
  mockOpsgenieBaseUrl,
} from '../../common/mocks';

jest.mock('../../ui/initialise-feature-flags', () => ({
  InitialiseFeatureFlags: ({ children }: InitialiseFeatureFlagsProps) =>
    children,
}));

jest.mock('@atlassian/analytics-bridge', () => ({
  ...jest.requireActual<Object>('@atlassian/analytics-bridge'),
  fireUIAnalytics: jest.fn(),
}));

const checklistSection = (
  tabKey: ChecklistTabKey = ChecklistTabKey.Basics,
  hasActiveTask: boolean = true,
) => ({
  headerState: HeaderState.Expanded,
  activeTab: tabKey,
  tabs: {
    basics: {
      activeTask: (hasActiveTask && BasicsTaskIds[0]) || undefined,
    },
    changes: {
      activeTask: (hasActiveTask && ChangesTaskIds[0]) || undefined,
    },
    incidents: {
      activeTask: (hasActiveTask && IncidentsTaskIds[0]) || undefined,
    },
  },
});

const productToursSection = (
  tourKey: ProductTourKey = ProductTourKey.ChangeManagement,
) => ({
  headerState: HeaderState.Expanded,
  activeTour: tourKey,
});

const sampleData = (
  section: GspSectionKey | undefined,
  tabKey: ChecklistTabKey | ProductTourKey = ChecklistTabKey.Basics,
  isComplete: boolean = false,
  hasActiveTask: boolean = true,
): { state: GspState; sectionState: SectionState } => {
  const sectionState = {
    version: 2,
    activeSection: section,
    sections: {
      checklist:
        section === GspSectionKey.Checklist &&
        Object.values(ChecklistTabKey).includes(tabKey as ChecklistTabKey)
          ? checklistSection(tabKey as ChecklistTabKey, hasActiveTask)
          : checklistSection(),
      productTours:
        section === GspSectionKey.ProductTours &&
        Object.values(ProductTourKey).includes(tabKey as ProductTourKey)
          ? productToursSection(tabKey as ProductTourKey)
          : productToursSection(),
    },
  };
  return {
    state: {
      completedItems: isComplete
        ? [...BasicsTaskIds, ...ChangesTaskIds, ...IncidentsTaskIds]
        : mockCompletedTasks,
      properties: {
        containers: [],
        user: {
          activeState: ActiveState.On,
          visualState: VisualState.Lozenge,
          projectId: '1234',
          sectionState: JSON.stringify(sectionState),
          hasSeenReopenSpotlight: HasSeenReopenSpotlight.Yes,
          ...mockVisibilityDataAllKeys.user,
        },
        workspace: mockVisibilityDataAllKeys.workspace,
      },
    },
    sectionState,
  };
};

describe('Lozenge', () => {
  const onUserActivity = jest.fn();
  // Needed to test for screen analytics events
  const onAnalyticsEvent = jest.fn();

  afterEach(() => {
    jest.clearAllMocks();
  });

  const renderLozengeWithState = (state: GspState) => {
    return mount(
      <IntlProvider locale="en">
        <AnalyticsListener
          channel={ANALYTICS_BRIDGE_CHANNEL}
          onEvent={onAnalyticsEvent}
        >
          <Lozenge
            onUserActivity={onUserActivity}
            state={state}
            serviceDeskBaseUrl={mockServiceDeskBaseUrl}
            opsgenieBaseUrl={mockOpsgenieBaseUrl}
            product={Product.ServiceDesk}
            environment={Environment.Staging}
            cloudId="some-cloud-id"
          />
        </AnalyticsListener>
      </IntlProvider>,
    );
  };

  describe('Lozenge (Component)', () => {
    it('should render the title if there is no active section', () => {
      const wrapper = renderLozengeWithState(
        sampleData(undefined, ChecklistTabKey.Basics).state,
      );
      const title = wrapper.find(Title);
      const tabName = wrapper.find(TabName);
      const taskName = wrapper.find(TaskName);
      expect(title.exists()).toBe(true);
      expect(tabName.exists()).toBe(false);
      expect(taskName.exists()).toBe(false);
    });

    it('should render the title if the active section is Home', () => {
      const wrapper = renderLozengeWithState(
        sampleData(GspSectionKey.Home, ChecklistTabKey.Basics).state,
      );
      const title = wrapper.find(Title);
      const tabName = wrapper.find(TabName);
      const taskName = wrapper.find(TaskName);
      expect(title.exists()).toBe(true);
      expect(tabName.exists()).toBe(false);
      expect(taskName.exists()).toBe(true);
    });

    it.each([
      ChecklistTabKey.Basics,
      ChecklistTabKey.Changes,
      ChecklistTabKey.Incidents,
    ])(
      'should render only the tabname and taskname when active section is %s',
      (tabKey: ChecklistTabKey) => {
        const wrapper = renderLozengeWithState(
          sampleData(GspSectionKey.Checklist, tabKey).state,
        );
        const title = wrapper.find(Title);
        const tabName = wrapper.find(TabName);
        const taskName = wrapper.find(TaskName);
        expect(title.exists()).toBe(false);
        expect(tabName.exists()).toBe(true);
        expect(taskName.exists()).toBe(true);
      },
    );

    describe('close button', () => {
      describe.each([
        ['no active section', undefined],
        ['checklist active section', GspSectionKey.Checklist],
      ])('%s', (_, activeSection) => {
        let closeButton: ReactWrapper<CloseButtonProps>;
        beforeEach(() => {
          const wrapper = renderLozengeWithState(
            sampleData(activeSection, ChecklistTabKey.Basics).state,
          );
          closeButton = wrapper.find(CloseButton).find(Button);
        });

        it('should render close button', () => {
          expect(closeButton.exists()).toBe(true);
        });

        it('onClick should call `onUserActivity` with correct args', () => {
          const akButton = closeButton.find(Button);
          akButton.simulate('click');
          expect(onUserActivity).toHaveBeenCalledWith({
            key: PropertyKey.ActiveState,
            value: ActiveState.Off,
          });
        });

        it('onClick should call `onUserActivity` 1 time only', () => {
          const akButton = closeButton.find(Button);
          akButton.simulate('click');
          expect(onUserActivity).toHaveBeenCalledTimes(1);
        });

        it('onClick should fire UI analytics', () => {
          const akButton = closeButton.find(Button);
          akButton.simulate('click');
          expect(fireUIAnalytics).toHaveBeenCalledTimes(1);
          expect(fireUIAnalytics).toHaveBeenCalledWith(
            expect.objectContaining({
              payload: expect.objectContaining({
                action: 'clicked',
                actionSubject: 'button',
              }),
            }),
            'jsmGettingStartedPanelLozengeCloseButton',
          );
        });
      });
    });

    it('should update the visual state on click', () => {
      const wrapper = renderLozengeWithState(
        sampleData(GspSectionKey.Checklist, ChecklistTabKey.Basics).state,
      );
      wrapper.find(Outer).simulate('click');

      expect(onUserActivity).toHaveBeenCalledWith({
        key: PropertyKey.VisualState,
        value: VisualState.FullPanel,
      });
    });

    it.each([
      [
        'no attributes when there is no section',
        sampleData(undefined).state,
        undefined,
      ],
      [
        'activeSection attribute when there is a section',
        sampleData(GspSectionKey.ProductTours).state,
        { activeSection: 'productTours' },
      ],
    ])(
      'should fire screen analytics event when mounted with %s',
      (_, state, expectedAttributes) => {
        expect(onAnalyticsEvent).toHaveBeenCalledTimes(0);

        renderLozengeWithState(state);

        expect(onAnalyticsEvent).toHaveBeenCalledTimes(1);
        expect(onAnalyticsEvent).toHaveBeenCalledWith(
          expect.objectContaining({
            context: [{ source: 'jsmGettingStartedPanelLozengeScreen' }],
            payload: expect.objectContaining({
              action: 'viewed',
              actionSubject: 'screen',
              analyticsType: 'SCREEN',
              attributes: expectedAttributes,
            }),
          }),
          ANALYTICS_BRIDGE_CHANNEL,
        );
      },
    );

    type Cases = [
      string,
      GspState,
      { activeTab: string | undefined; activeTask: string | undefined },
    ][];
    const tempAttributes = { activeTab: undefined, activeTask: undefined };

    const cases: Cases = [
      [
        'checklist section with basics task expanded',
        sampleData(GspSectionKey.Checklist, ChecklistTabKey.Basics, false, true)
          .state,
        { activeTab: 'basics', activeTask: 'servicedesk-itsm-project-created' },
      ],
      [
        'checklist section with changes task expanded',
        sampleData(
          GspSectionKey.Checklist,
          ChecklistTabKey.Changes,
          false,
          true,
        ).state,
        {
          activeTab: 'changes',
          activeTask: 'servicedesk-change-management-pipeline-connected',
        },
      ],
      [
        'checklist section with all tasks collapsed',
        sampleData(
          GspSectionKey.Checklist,
          ChecklistTabKey.Incidents,
          false,
          false,
        ).state,
        { activeTab: 'incidents', activeTask: undefined },
      ],
      [
        'non-checklist section',
        sampleData(
          GspSectionKey.ProductTours,
          ChecklistTabKey.Basics,
          false,
          true,
        ).state,
        tempAttributes,
      ],
      [
        'no section',
        sampleData(undefined, ChecklistTabKey.Basics, false, true).state,
        tempAttributes,
      ],
    ];

    it.each(cases)(
      'should fire appropriate UI analytics event when clicked as %s',
      (_, state, expectedAttributes) => {
        const wrapper = renderLozengeWithState(state);
        wrapper.find(Outer).simulate('click');

        expect(fireUIAnalytics).toHaveBeenCalledTimes(1);
        expect(fireUIAnalytics).toHaveBeenCalledWith(
          expect.objectContaining({
            payload: expect.objectContaining({
              action: 'clicked',
              actionSubject: 'lozenge',
              attributes: expectedAttributes,
            }),
          }),
          'jsmGettingStartedPanelLozenge',
        );
      },
    );

    it.each([
      [false, ChecklistIcon, ZoomIn],
      [true, ZoomIn, ChecklistIcon],
    ])(
      'should render the correct icon component when complete == %s',
      (isComplete, IconComponent, IncorrectIconComponent) => {
        const wrapper = renderLozengeWithState(
          sampleData(
            GspSectionKey.Checklist,
            ChecklistTabKey.Basics,
            isComplete,
          ).state,
        );
        const icon = wrapper.find(IconComponent);
        expect(icon.exists()).toBe(true);
        const incorrectIcon = wrapper.find(IncorrectIconComponent);
        expect(incorrectIcon.exists()).toBe(false);
      },
    );
  });
});
