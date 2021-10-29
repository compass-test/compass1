import React from 'react';

import { getActiveSectionConfig, getSectionData } from '../../ui/lozenge/utils';
import IconRocket from '../../common/ui/avatar/assets/Rocket';
import {
  ActiveState,
  BasicsTaskIds,
  ChangesTaskIds,
  HeaderState,
  ChecklistTabKey,
  ProductTourKey,
  GspSectionKey,
  GspState,
  HasSeenReopenSpotlight,
  IncidentsTaskIds,
  SectionState,
  TaskId,
  VisualState,
} from '../../common/types';
import {
  mockTabVisibilityAll,
  mockByTaskVisibility,
  mockVisibilityDataAllKeys,
} from '../../common/services/visibility/mocks';
import { getTabTitle, getTaskTitle, getTourTitle } from '../../common/ui';
import { mockCompletedTasks } from '../../common/mocks';

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

describe('LozengeUtils', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('getActiveSectionConfig', () => {
    const sections = {
      [GspSectionKey.Checklist]: checklistSection(),
      [GspSectionKey.ProductTours]: productToursSection(),
    };
    it.each([
      [GspSectionKey.Checklist, sections[GspSectionKey.Checklist]],
      [GspSectionKey.ProductTours, sections[GspSectionKey.ProductTours]],
    ])(
      'should return the correct active section for %s',
      (sectionKey, data) => {
        const result = getActiveSectionConfig(sectionKey, sections);
        const expected = { type: sectionKey, data };
        expect(result).toEqual(expected);
      },
    );
  });

  describe('getSectionData', () => {
    const formatMessage = jest.fn();

    beforeEach(() => {
      formatMessage.mockImplementation((a) => a.defaultMessage);
    });

    describe('checklist section', () => {
      it.each([
        ChecklistTabKey.Basics,
        ChecklistTabKey.Changes,
        ChecklistTabKey.Incidents,
      ])(
        'should return the correct section data when tabKey is %s',
        (checklistTabKey: ChecklistTabKey) => {
          const sectionState = sampleData(
            GspSectionKey.Checklist,
            checklistTabKey,
          ).sectionState;
          // Expected title
          const result = getSectionData(
            {
              type: GspSectionKey.Checklist,
              data: sectionState.sections.checklist,
            },
            mockCompletedTasks,
            mockByTaskVisibility,
            mockTabVisibilityAll,
            formatMessage,
          );
          const expectedTitle = getTabTitle(checklistTabKey);
          expect(result.title).toBe(expectedTitle.defaultMessage);

          // Expected subtitle
          const task = sectionState.sections.checklist.tabs[checklistTabKey]
            .activeTask as TaskId;
          const expectedSubtitle = getTaskTitle(task);
          expect(result.subtitle).toBe(expectedSubtitle.defaultMessage);
        },
      );

      it('should return checklist as complete if all visible tasks in completedItems', () => {
        const visibleTasks = {
          [TaskId.CreateItsmProject]: true,
          [TaskId.CustomizePortal]: false,
          [TaskId.AddPortalLogo]: false,
        };
        const completedItems = [TaskId.CreateItsmProject];
        const result = getSectionData(
          {
            type: GspSectionKey.Checklist,
            data: checklistSection(),
          },
          completedItems,
          visibleTasks,
          mockTabVisibilityAll,
          formatMessage,
        );
        expect(result.isComplete).toEqual(true);
      });

      it('should return checklist as incomplete if not all visible tasks in completedItems', () => {
        const visibleTasks = {
          [TaskId.CreateItsmProject]: true,
          [TaskId.CustomizePortal]: false,
          [TaskId.AddPortalLogo]: true,
        };
        const completedItems = [TaskId.CreateItsmProject];
        const result = getSectionData(
          {
            type: GspSectionKey.Checklist,
            data: checklistSection(),
          },
          completedItems,
          visibleTasks,
          mockTabVisibilityAll,
          formatMessage,
        );
        expect(result.isComplete).toEqual(false);
      });
    });

    describe('product tours section', () => {
      it.each([
        ProductTourKey.Welcome,
        ProductTourKey.IncidentManagement,
        ProductTourKey.ChangeManagement,
      ])(
        'Should return the correct section data for %s walkthrough',
        (activeTour) => {
          const {
            sections: { productTours },
          } = sampleData(GspSectionKey.ProductTours, activeTour).sectionState;
          const result = getSectionData(
            { type: GspSectionKey.ProductTours, data: productTours },
            mockCompletedTasks,
            mockByTaskVisibility,
            mockTabVisibilityAll,
            formatMessage,
          );

          expect(result.title).toBe(getTourTitle(activeTour).defaultMessage);
          expect(result.subtitle).toBe('Guided tour');
        },
      );
    });

    describe('home section', () => {
      it('Should return the correct section data', () => {
        const result = getSectionData(
          { type: GspSectionKey.Home },
          mockCompletedTasks,
          mockByTaskVisibility,
          mockTabVisibilityAll,
          formatMessage,
        );

        expect(result.title).toBe('Your Coach');
        expect(result.subtitle).toBe(undefined);
        expect(result.icon).toEqual(<IconRocket />);
        expect(result.isComplete).toBe(false);
      });
    });
  });
});
