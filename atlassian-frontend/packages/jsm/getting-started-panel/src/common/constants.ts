import {
  ActiveState,
  HeaderState,
  ChecklistTabKey,
  ProductTourKey,
  GspSectionKey,
  GspState,
  HasSeenReopenSpotlight,
  SectionState,
  TaskId,
  VisualState,
} from './types';

// This is duplicated to avoid importing from section-state
// to attempt to keep bundle size down.
// These values must be manually kept in sync.
const defaultSectionStateV2: SectionState = {
  version: 2,
  activeSection: GspSectionKey.Home,
  sections: {
    checklist: {
      headerState: HeaderState.Expanded,
      activeTab: ChecklistTabKey.Basics,
      tabs: {
        basics: { activeTask: undefined },
        incidents: { activeTask: undefined },
        changes: { activeTask: undefined },
      },
    },
    productTours: {
      headerState: HeaderState.Expanded,
      activeTour: ProductTourKey.Welcome,
    },
  },
};

// For use in JFE/OG as the default initial state
export const defaultGspState: GspState = {
  completedItems: [TaskId.CreateItsmProject],
  properties: {
    containers: [],
    user: {
      activeState: ActiveState.On,
      visualState: VisualState.FullPanel,
      sectionState: JSON.stringify(defaultSectionStateV2),
      hasSeenReopenSpotlight: HasSeenReopenSpotlight.No,
    },
  },
};
