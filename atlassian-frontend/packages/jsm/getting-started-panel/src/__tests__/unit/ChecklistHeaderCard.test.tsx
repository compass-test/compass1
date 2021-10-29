import React from 'react';
import { IntlProvider } from 'react-intl';
import { mount, ReactWrapper } from 'enzyme';

import { fireUIAnalytics } from '@atlassian/analytics-bridge';
import Button from '@atlaskit/button';
import MediaServicesFitToPageIcon from '@atlaskit/icon/glyph/media-services/fit-to-page';
import ArrowLeftIcon from '@atlaskit/icon/glyph/arrow-left';
import ProgressBar from '@atlaskit/progress-bar';

import {
  mockGspState,
  mockOpsgenieBaseUrl,
  mockServiceDeskBaseUrl,
} from '../../common/mocks';
import {
  Checklist,
  ChecklistTabKey,
  HeaderState,
  BasicsTaskIds,
  ChangesTaskIds,
  IncidentsTaskIds,
} from '../../common/types';
import {
  VisibilityContainer,
  VisibilityData,
} from '../../common/services/visibility';
import {
  mockVisibilityDataStandard,
  mockVisibilityDataAdvanced,
  mockVisibilityDataSomeOg,
  mockVisibilityDataNothing,
  mockVisibilityDataEmpty,
} from '../../common/services/visibility/mocks';
import { ChecklistAvatar } from '../../common/ui/avatar';
import { InactiveTabList } from '../../ui/checklist-section/header-card/styled';
import HeaderCard, {
  actionSubjectIds,
} from '../../ui/checklist-section/header-card';

jest.mock('@atlassian/analytics-bridge', () => ({
  ...jest.requireActual<Object>('@atlassian/analytics-bridge'),
  fireUIAnalytics: jest.fn(),
}));

const { Basics, Incidents, Changes } = ChecklistTabKey;
const { Expanded, Minimized } = HeaderState;

const sampleData = (
  activeTab: ChecklistTabKey,
  headerState: HeaderState,
): Checklist => ({
  activeTab,
  headerState,
  tabs: {
    basics: {
      activeTask: undefined,
    },
    incidents: {
      activeTask: undefined,
    },
    changes: {
      activeTask: undefined,
    },
  },
});

const actionMocks = {
  onTabSelected: jest.fn(),
  onHeaderStateChanged: jest.fn(),
  onBack: jest.fn(),
  onClose: jest.fn(),
};

const getTotalTaskCountFor = (key: ChecklistTabKey) => {
  switch (key) {
    case ChecklistTabKey.Basics:
      return BasicsTaskIds.length;
    case ChecklistTabKey.Incidents:
      return IncidentsTaskIds.length;
    case ChecklistTabKey.Changes:
      return ChangesTaskIds.length;
  }
};

const mountHeaderCardWithCounts = (
  tabKey: ChecklistTabKey,
  headerState: HeaderState = Expanded,
  counts: { basics?: number; incidents?: number; changes?: number },
  visibilityData: VisibilityData,
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
        <HeaderCard
          checklist={sampleData(tabKey, headerState)}
          completedItems={[
            ...BasicsTaskIds.slice(0, counts.basics),
            ...ChangesTaskIds.slice(0, counts.changes),
            ...IncidentsTaskIds.slice(0, counts.incidents),
          ]}
          {...actionMocks}
        />
      </VisibilityContainer>
    </IntlProvider>,
  );
};

describe('HeaderCard', () => {
  afterEach(() => {
    jest.resetAllMocks();
  });

  describe.each([
    [
      Minimized,
      Basics,
      Incidents,
      BasicsTaskIds.length,
      mockVisibilityDataEmpty,
      BasicsTaskIds.length,
      getTotalTaskCountFor(Basics),
    ],
    [
      Expanded,
      Basics,
      Changes,
      0,
      mockVisibilityDataEmpty,
      0,
      getTotalTaskCountFor(Basics),
    ],
    [
      Minimized,
      Incidents,
      Changes,
      1,
      mockVisibilityDataEmpty,
      1,
      getTotalTaskCountFor(Incidents),
    ],
    [
      Expanded,
      Incidents,
      Basics,
      IncidentsTaskIds.length,
      mockVisibilityDataEmpty,
      IncidentsTaskIds.length,
      getTotalTaskCountFor(Incidents),
    ],
    [
      Minimized,
      Changes,
      Basics,
      2,
      mockVisibilityDataEmpty,
      2,
      getTotalTaskCountFor(Changes),
    ],
    [
      Expanded,
      Changes,
      Incidents,
      ChangesTaskIds.length,
      mockVisibilityDataEmpty,
      ChangesTaskIds.length,
      getTotalTaskCountFor(Changes),
    ],
    [Minimized, Basics, Changes, 2, mockVisibilityDataStandard, 0, 1],
    [Minimized, Changes, Basics, 2, mockVisibilityDataAdvanced, 2, 3],
    [Minimized, Incidents, Basics, 2, mockVisibilityDataSomeOg, 0, 2],
  ])(
    'in the %s state with the %s tab active',
    (
      headerState,
      activeTab,
      inactiveTab,
      numberOfTaskIdsToPassAsCompleted,
      visibilityData,
      completedTasksCount,
      totalTasksCountOptional,
    ) => {
      const totalTasksCount =
        totalTasksCountOptional === null
          ? getTotalTaskCountFor(activeTab)
          : totalTasksCountOptional;
      let headerCard: ReactWrapper;

      beforeEach(() => {
        headerCard = mountHeaderCardWithCounts(
          activeTab,
          headerState,
          {
            [activeTab]: numberOfTaskIdsToPassAsCompleted,
          },
          visibilityData,
        );
      });

      it('should show the active tab at the top', () => {
        expect(headerCard.find(ChecklistAvatar).first().prop('tabKey')).toBe(
          activeTab,
        );
      });

      it('should show a progress bar', () => {
        expect(headerCard.find(ProgressBar)).toHaveLength(1);
      });

      it('should have its progress bar value depend on the active tab', () => {
        headerCard = mountHeaderCardWithCounts(
          activeTab,
          headerState,
          {
            ...{ basics: 1, changes: 1, incidents: 1 },
            [activeTab]: 0,
          },
          visibilityData,
        );

        expect(headerCard.find(ProgressBar).prop('value')).toBe(0);
      });

      it('should have its progress bar value depend on the number of completed tasks', () => {
        expect(headerCard.find(ProgressBar).prop('value')).toBe(
          completedTasksCount / totalTasksCount,
        );
      });

      it('should call onBack when the back button is clicked', () => {
        const button = headerCard
          .find(Button)
          .filterWhere((b) => b.find(ArrowLeftIcon).exists());
        button.prop('onClick')();
        expect(actionMocks.onBack).toHaveBeenCalled();
      });

      it('should fire a back UI event when the close button is clicked', () => {
        const button = headerCard
          .find(Button)
          .filterWhere((b) => b.find(ArrowLeftIcon).exists());

        button.prop('onClick')();

        expect(fireUIAnalytics).toHaveBeenCalledTimes(1);
        expect(fireUIAnalytics).toHaveBeenCalledWith(
          // undefined because a click with enzyme does not set the event
          // object as a regular browser would.
          undefined,
          'jsmGettingStartedPanelBackButton',
        );
      });

      it('should call onClose when the close button is clicked', () => {
        const button = headerCard
          .find(Button)
          .filterWhere((b) => b.find(MediaServicesFitToPageIcon).exists());

        button.prop('onClick')();

        expect(actionMocks.onClose).toHaveBeenCalledTimes(1);
      });

      it('should fire a close UI event when the close button is clicked', () => {
        const button = headerCard
          .find(Button)
          .filterWhere((b) => b.find(MediaServicesFitToPageIcon).exists());

        button.prop('onClick')();

        expect(fireUIAnalytics).toHaveBeenCalledTimes(1);
        expect(fireUIAnalytics).toHaveBeenCalledWith(
          // undefined because a click with enzyme does not set the event
          // object as a regular browser would.
          undefined,
          'jsmGettingStartedPanelCloseButton',
        );
      });

      it('should not call onTabSelected when an active tab is clicked', () => {
        const avatar = headerCard
          .find(ChecklistAvatar)
          .filterWhere((a) => a.prop('tabKey') === activeTab);

        avatar.simulate('click');

        expect(actionMocks.onTabSelected).not.toHaveBeenCalled();
      });

      it('should report the task count for at least the active tab', () => {
        expect(headerCard.text()).toContain(
          `${completedTasksCount} of ${totalTasksCount}`,
        );
      });

      if (headerState === Minimized) {
        it('should include only one tab', () => {
          expect(headerCard.find(ChecklistAvatar)).toHaveLength(1);
        });

        it('should not show an avatar border for the active tab', () => {
          expect(headerCard.find(ChecklistAvatar).prop('isActive')).toBeFalsy();
        });

        it('should report the task count for only the active tab', () => {
          const text = mountHeaderCardWithCounts(
            activeTab,
            headerState,
            {
              ...{ basics: 1, incidents: 2, changes: 2 },
              [activeTab]: 3,
            },
            mockVisibilityDataEmpty,
          ).text();

          expect(text).toContain(`3 of ${getTotalTaskCountFor(activeTab)}`);
          expect(text).not.toContain('1 of');
          expect(text).not.toContain('2 of');
        });

        it('should expand the header when show more is clicked', () => {
          const button = headerCard
            .find(Button)
            .filterWhere((b) => b.text() === 'Show More');

          button.simulate('click');

          expect(actionMocks.onHeaderStateChanged).toHaveBeenCalledWith(
            Expanded,
          );
        });
      }

      if (headerState === Expanded) {
        it('should show all three tabs', () => {
          expect(headerCard.find(ChecklistAvatar)).toHaveLength(3);
        });

        it('should show an avatar border for the active tab', () => {
          const avatar = headerCard
            .find(ChecklistAvatar)
            .filterWhere((a) => a.prop('tabKey') === activeTab);

          expect(avatar.prop('isActive')).toBeTruthy();
        });

        it('should not show an avatar border for inactive tabs', () => {
          const avatar = headerCard
            .find(ChecklistAvatar)
            .filterWhere((a) => a.prop('tabKey') === inactiveTab);

          expect(avatar.prop('isActive')).toBeFalsy();
        });

        it('should report the task count for all tabs when expanded', () => {
          const text = mountHeaderCardWithCounts(
            activeTab,
            headerState,
            {
              basics: 1,
              incidents: 2,
              changes: 3,
            },
            visibilityData,
          ).text();

          expect(text).toContain(`1 of ${BasicsTaskIds.length}`);
          expect(text).toContain(`2 of ${IncidentsTaskIds.length}`);
          expect(text).toContain(`3 of ${ChangesTaskIds.length}`);
        });

        it('should minimize the header when show less is clicked', () => {
          const button = headerCard
            .find(Button)
            .filterWhere((b) => b.text() === 'Show Less');

          button.simulate('click');

          expect(actionMocks.onHeaderStateChanged).toHaveBeenCalledWith(
            Minimized,
          );
        });

        it('should call onTabSelected when an inactive tab is clicked', () => {
          const avatar = headerCard
            .find(ChecklistAvatar)
            .filterWhere((a) => a.prop('tabKey') === inactiveTab);

          avatar.simulate('click');

          expect(actionMocks.onTabSelected).toHaveBeenCalledWith(inactiveTab);
        });

        it('should fire a checklist tab clicked UI event when an inactive tab is clicked', () => {
          const avatar = headerCard
            .find(ChecklistAvatar)
            .filterWhere((a) => a.prop('tabKey') === inactiveTab);

          avatar.simulate('click');

          expect(fireUIAnalytics).toHaveBeenCalledTimes(1);
          expect(fireUIAnalytics).toHaveBeenCalledWith(
            expect.objectContaining({
              payload: expect.objectContaining({
                action: 'clicked',
                actionSubject: 'checklistTab',
              }),
            }),
            actionSubjectIds[inactiveTab],
          );
        });
      }
    },
  );

  describe('shows Basics tab when no permissions to view Incidents tab', () => {
    let headerCard: ReactWrapper;
    beforeEach(() => {
      headerCard = mountHeaderCardWithCounts(
        Incidents,
        Minimized,
        {
          [Incidents]: 2,
          [Basics]: 0,
        },
        mockVisibilityDataStandard,
      );
    });

    it('should show the active tab at the top', () => {
      expect(headerCard.find(ChecklistAvatar).first().prop('tabKey')).toBe(
        Basics,
      );
    });

    it('should show a progress bar', () => {
      expect(headerCard.find(ProgressBar)).toHaveLength(1);
    });

    it('should have its progress bar value depend on the number of completed tasks', () => {
      expect(headerCard.find(ProgressBar).prop('value')).toBe(0);
    });
  });

  describe('shows nothing when no permissions', () => {
    let headerCard: ReactWrapper;
    beforeEach(() => {
      headerCard = mountHeaderCardWithCounts(
        Incidents,
        Minimized,
        {
          [Incidents]: 2,
        },
        mockVisibilityDataNothing,
      );
    });

    it('should not show the active tab', () => {
      expect(headerCard.find(ChecklistAvatar).length).toBe(0);
    });

    it('should not show a progress bar', () => {
      expect(headerCard.find(ProgressBar)).toHaveLength(0);
    });

    it('should not show InactiveTabList', () => {
      expect(headerCard.find(InactiveTabList)).toHaveLength(0);
    });
  });
});
