import { useMemo, useState, useRef } from 'react';
import { fireErrorAnalytics } from '@atlassian/error-handling';

import {
  GspSectionKey,
  SectionState,
  HeaderState,
  ChecklistTabKey,
  ProductTourKey,
  TaskId,
} from '../common/types';

// This is duplicated to avoid importing this file in common/mocks
// to attempt to keep bundle size down.
// These values must be manually kept in sync.
export const defaultSectionStateV1: SectionState = {
  version: 1,
  activeSection: GspSectionKey.Checklist,
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
    documentation: { activeItem: '' },
    productTours: {
      activeTour: ProductTourKey.Welcome,
    },
  },
};

export const defaultSectionStateV2: SectionState = {
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

type SectionStateResult =
  | {
      type: 'ok';
      value: SectionState;
    }
  | {
      type: 'validation-error';
      error: Error;
    };

const validationError = (field: string, value: any): SectionStateResult => ({
  type: 'validation-error',
  error: Error(
    `Failed to parse sectionState.${field} - unexpected value (${value})`,
  ),
});

// getSectionStateValidator is the function responsible for checking
// versions of incoming section state.
//
// rawState:
// - an object of unspecified type which may have a version property.
//
// Returns the appropriate section state validator for that version.
export const getSectionStateValidator = (rawState: any) =>
  rawState.version !== undefined && rawState.version >= 2
    ? toSectionStateV2
    : toSectionStateV2AllowingV1;

// toSectionStateV2AllowingV1 is the section state validator function
// to allow upgrades to V2.
//
// Ignored and overridden properties include:
// - version: hardcoded to 2
// - sections.productTours: hardcoded to { Welcome, Expanded }
//
// rawState:
// - an object of unspecified type which may have enough correct
//   properties to construct a section state object.
//
// Returns:
// - an error if some values in rawState are incompatible with both
//   V1 section state and V2 section state.
// - otherwise a new SectionState object with matching properties
//   in the V2 shape
export const toSectionStateV2AllowingV1 = (
  rawState: object,
): SectionStateResult => {
  // Top level
  const { activeSection, sections } = rawState as SectionState;
  if (![undefined, ...Object.values(GspSectionKey)].includes(activeSection)) {
    return validationError('activeSection', activeSection);
  }
  if (typeof sections !== 'object' || sections === null) {
    return validationError('sections', sections);
  }

  // Checklist state
  if (typeof sections.checklist !== 'object' || sections.checklist === null) {
    return validationError('sections.checklist', sections.checklist);
  }
  const { activeTab, headerState, tabs } = sections.checklist;

  if (!Object.values(ChecklistTabKey).includes(activeTab)) {
    return validationError('sections.checklist.activeTab', activeTab);
  }
  if (!Object.values(HeaderState).includes(headerState)) {
    return validationError('sections.checklist.headerState', headerState);
  }
  if (typeof tabs !== 'object' || tabs === null) {
    return validationError('sections.checklist.tabs', tabs);
  }
  const { basics, changes, incidents } = tabs;

  if (typeof basics !== 'object' || basics === null) {
    return validationError('sections.checklist.tabs.basics', basics);
  }
  if (![undefined, ...Object.values(TaskId)].includes(basics.activeTask)) {
    return validationError(
      'sections.checklist.tabs.basics.activeTask',
      basics.activeTask,
    );
  }
  if (typeof changes !== 'object' || changes === null) {
    return validationError('sections.checklist.tabs.changes', changes);
  }
  if (![undefined, ...Object.values(TaskId)].includes(changes.activeTask)) {
    return validationError(
      'sections.checklist.tabs.changes.activeTask',
      changes.activeTask,
    );
  }
  if (typeof incidents !== 'object' || incidents === null) {
    return validationError('sections.checklist.tabs.incidents', incidents);
  }
  if (![undefined, ...Object.values(TaskId)].includes(incidents.activeTask)) {
    return validationError(
      'sections.checklist.tabs.incidents.activeTask',
      incidents.activeTask,
    );
  }

  // Product tours section is being upgraded
  return {
    type: 'ok',
    value: {
      version: 2,
      activeSection,
      sections: {
        checklist: {
          headerState,
          activeTab,
          tabs: {
            basics: { activeTask: basics.activeTask },
            incidents: { activeTask: incidents.activeTask },
            changes: { activeTask: changes.activeTask },
          },
        },
        productTours: {
          headerState: HeaderState.Expanded,
          activeTour: ProductTourKey.Welcome,
        },
      },
    },
  };
};

// toSectionStateV2 is the section state validator function for V2.
//
// Ignored and overridden properties include:
// - version: hardcoded to 2
//
// rawState:
// - an object of unspecified type which may have enough correct
//   properties to construct a section state object.
//
// Returns:
// - an error if some values in rawState are incompatible with
//   V2 section state
// - otherwise a new SectionState object with matching properties
//   in the V2 shape
export const toSectionStateV2 = (rawState: object): SectionStateResult => {
  // Top level
  const { activeSection, sections } = rawState as SectionState;
  if (![undefined, ...Object.values(GspSectionKey)].includes(activeSection)) {
    return validationError('activeSection', activeSection);
  }
  if (typeof sections !== 'object' || sections === null) {
    return validationError('sections', sections);
  }

  // Checklist state
  if (typeof sections.checklist !== 'object' || sections.checklist === null) {
    return validationError('sections.checklist', sections.checklist);
  }
  const { activeTab, headerState, tabs } = sections.checklist;

  if (!Object.values(ChecklistTabKey).includes(activeTab)) {
    return validationError('sections.checklist.activeTab', activeTab);
  }
  if (!Object.values(HeaderState).includes(headerState)) {
    return validationError('sections.checklist.headerState', headerState);
  }
  if (typeof tabs !== 'object' || tabs === null) {
    return validationError('sections.checklist.tabs', tabs);
  }
  const { basics, changes, incidents } = tabs;

  if (typeof basics !== 'object' || basics === null) {
    return validationError('sections.checklist.tabs.basics', basics);
  }
  if (![undefined, ...Object.values(TaskId)].includes(basics.activeTask)) {
    return validationError(
      'sections.checklist.tabs.basics.activeTask',
      basics.activeTask,
    );
  }
  if (typeof changes !== 'object' || changes === null) {
    return validationError('sections.checklist.tabs.changes', changes);
  }
  if (![undefined, ...Object.values(TaskId)].includes(changes.activeTask)) {
    return validationError(
      'sections.checklist.tabs.changes.activeTask',
      changes.activeTask,
    );
  }
  if (typeof incidents !== 'object' || incidents === null) {
    return validationError('sections.checklist.tabs.incidents', incidents);
  }
  if (![undefined, ...Object.values(TaskId)].includes(incidents.activeTask)) {
    return validationError(
      'sections.checklist.tabs.incidents.activeTask',
      incidents.activeTask,
    );
  }

  // Product tours section
  const { productTours } = sections;
  if (typeof productTours !== 'object' || productTours === null) {
    return validationError('sections.productTours', productTours);
  }
  const { activeTour, headerState: productToursHeaderState } = productTours;
  if (!Object.values(ProductTourKey).includes(activeTour as ProductTourKey)) {
    return validationError('sections.productTours.activeTour', activeTour);
  }
  if (
    !Object.values(HeaderState).includes(productToursHeaderState as HeaderState)
  ) {
    return validationError(
      'sections.productTours.headerState',
      productToursHeaderState,
    );
  }

  return {
    type: 'ok',
    value: {
      version: 2,
      activeSection,
      sections: {
        checklist: {
          headerState,
          activeTab,
          tabs: {
            basics: { activeTask: basics.activeTask },
            incidents: { activeTask: incidents.activeTask },
            changes: { activeTask: changes.activeTask },
          },
        },
        productTours: {
          headerState: productToursHeaderState,
          activeTour,
        },
      },
    },
  };
};

// Parses incoming section state from silverthrone returns a function
// to update section state.
// This function is meant allow the GSP to keep working even if
// silverthrone's section state is somehow corrupted.
//
// See discussion on JIG-236 at https://jdog.jira-dev.com/browse/JIG-236
//
// During normal operation:
// - the incoming section state is parsed and returned
//   with the correct type,
// - an internal cache is maintained which holds the last
//   valid incoming state, and
// - the returned update callback is the same as what is passed in.
//
// After an invalid section state is received:
// - the cached last valid state is used to set an internal state
//   to our best guess of an up-to-date section state,
// - the internal state is returned instead of the incoming state, and
// - the returned update callback changes the internal state as well
//   as calling the original callback.
//
// Returns: [
//    A valid section state object,
//    A function to update the section state internally and/or externally,
// ]
export const useSectionState = (
  // Unparsed JSON containing the section state from an external service.
  rawSectionState: string,
  // A function used to push updates to the external section state.
  // This function should not be called directly by the consumer.
  setSectionState: (updatedState: SectionState) => void,
): [SectionState, (sectionState: SectionState) => void] => {
  // sectionStateCache tracks the most recent valid state,
  // while we're still receiving valid state.
  const sectionStateCache = useRef(defaultSectionStateV2);
  // didRevert becomes true the first time we receive invalid state.
  // It can never become false after this.
  const didRevert = useRef(false);
  // internalSectionState begins being used after the first revert but
  // is not maintained before hand.
  const [internalSectionState, setInternalSectionState] = useState(
    defaultSectionStateV2,
  );

  const sectionState = useMemo(() => {
    if (didRevert.current) {
      return internalSectionState;
    }

    const handleError = (error: Error) => {
      fireErrorAnalytics({
        meta: {
          packageName: 'jsmGettingStartedPanel',
          id: 'section-state',
        },
        error,
        attributes: {
          errorMsg: error.message,
        },
      });
      didRevert.current = true;
      setInternalSectionState(sectionStateCache.current);
      return sectionStateCache.current;
    };

    try {
      const parsedState: object = JSON.parse(rawSectionState);
      const sectionState: SectionStateResult = getSectionStateValidator(
        parsedState,
      )(parsedState);

      if (sectionState.type === 'ok') {
        sectionStateCache.current = sectionState.value;
        return sectionState.value;
      } else {
        return handleError(sectionState.error);
      }
    } catch (error) {
      return handleError(error);
    }
  }, [rawSectionState, internalSectionState]);

  return [
    sectionState,
    // After reverting to the internal state, still use the external
    // setSectionState because it's important to try to push valid
    // state updates to the API.  This allows corrupted state to
    // recover without manual intervention.
    didRevert.current
      ? (updatedState: SectionState) => {
          setInternalSectionState(updatedState);
          setSectionState(updatedState);
        }
      : // Before reverting, only use the external setSectionState,
        // to prevent double-render problems from calling
        // setInternalSectionState on each re-render.
        setSectionState,
  ];
};
