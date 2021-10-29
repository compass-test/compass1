import intersection from 'lodash/intersection';
import isObject from 'lodash/isObject';
import {
  BasicsTaskIds,
  ChangesTaskIds,
  HeaderState,
  ChecklistTabKey,
  GspSectionKey,
  IncidentsTaskIds,
  Product,
  SectionState,
  TaskId,
} from './types';

// these strings get sent in the attribute of the error analytic
// so think twice before changing them, as you'll need to re-register them
// TODO: JIG-236 actually register them
export const ConstructSectionStateFromPayloadErrors = {
  RESPONSE_ACTIVE_SECTION_INVALID: 'activeState is not a GspSectionKey',
  RESPONSE_SECTIONS_NOT_OBJECT: 'sections is not an object',
  RESPONSE_SECTIONS_CHECKLIST_NOT_OBJECT: 'sections.checklist is not an object',
  RESPONSE_SECTIONS_CHECKLIST_HEADER_STATE_INVALID:
    'sections.checklist.headerState is not a HeaderState',
  RESPONSE_SECTIONS_CHECKLIST_ACTIVE_TAB_INVALID:
    'sections.checklist.activeTab is not a ChecklistTabKey',
  RESPONSE_SECTIONS_CHECKLIST_BASICS_NOT_OBJECT:
    'sections.checklist.basics is not an object',
  RESPONSE_SECTIONS_CHECKLIST_BASICS_ACTIVE_TASK_INVALID:
    'sections.checklist.basics.activeTask is not a TaskId',
  RESPONSE_SECTIONS_CHECKLIST_INCIDENTS_NOT_OBJECT:
    'sections.checklist.indicents is not an object',
  RESPONSE_SECTIONS_CHECKLIST_INCIDENTS_ACTIVE_TASK_INVALID:
    'sections.checklist.incidents.activeTask is not a TaskId',
  RESPONSE_SECTIONS_CHECKLIST_CHANGES_NOT_OBJECT:
    'sections.checklist.changes is not an object',
  RESPONSE_SECTIONS_CHECKLIST_CHANGES_ACTIVE_TASK_INVALID:
    'sections.checklist.changes.activeTask is not a TaskId',
  RESPONSE_SECTIONS_DOCUMENTATION_NOT_OBJECT:
    'sections.documentation is not an object',
  RESPONSE_SECTIONS_PRODUCT_TOURS_NOT_OBJECT:
    'sections.productTours is not an object',
  FAILED_SECTION_STATE_JSON_PARSE: 'Failed to parse sectionState as JSON',
};

const parsePayload = (payload: string): any => {
  try {
    return JSON.parse(payload);
  } catch (parseError) {
    throw new Error(
      ConstructSectionStateFromPayloadErrors.FAILED_SECTION_STATE_JSON_PARSE,
    );
  }
};

// TODO: JIG-236 actually validate section state using this
export const validateSectionStatePayload = (payload: string): SectionState => {
  const sectionState = parsePayload(payload);
  if (
    sectionState.activeSection &&
    !Object.values(GspSectionKey).includes(sectionState.activeSection)
  ) {
    throw new Error(
      ConstructSectionStateFromPayloadErrors.RESPONSE_ACTIVE_SECTION_INVALID,
    );
  }

  if (!isObject(sectionState.sections)) {
    throw new Error(
      ConstructSectionStateFromPayloadErrors.RESPONSE_SECTIONS_NOT_OBJECT,
    );
  }

  if (!isObject(sectionState.sections.checklist)) {
    throw new Error(
      ConstructSectionStateFromPayloadErrors.RESPONSE_SECTIONS_CHECKLIST_NOT_OBJECT,
    );
  }

  if (
    sectionState.sections.checklist.headerState &&
    !Object.values(HeaderState).includes(
      sectionState.sections.checklist.headerState,
    )
  ) {
    throw new Error(
      ConstructSectionStateFromPayloadErrors.RESPONSE_SECTIONS_CHECKLIST_HEADER_STATE_INVALID,
    );
  }

  if (
    sectionState.sections.checklist.activeTab &&
    !Object.values(ChecklistTabKey).includes(
      sectionState.sections.checklist.activeTab,
    )
  ) {
    throw new Error(
      ConstructSectionStateFromPayloadErrors.RESPONSE_SECTIONS_CHECKLIST_ACTIVE_TAB_INVALID,
    );
  }

  if (!isObject(sectionState.sections.checklist.basics)) {
    throw new Error(
      ConstructSectionStateFromPayloadErrors.RESPONSE_SECTIONS_CHECKLIST_BASICS_NOT_OBJECT,
    );
  }

  if (
    sectionState.sections.checklist.basics.activeTask &&
    !Object.values(TaskId).includes(
      sectionState.sections.checklist.basics.activeTask,
    )
  ) {
    throw new Error(
      ConstructSectionStateFromPayloadErrors.RESPONSE_SECTIONS_CHECKLIST_BASICS_ACTIVE_TASK_INVALID,
    );
  }

  if (!isObject(sectionState.sections.checklist.incidents)) {
    throw new Error(
      ConstructSectionStateFromPayloadErrors.RESPONSE_SECTIONS_CHECKLIST_INCIDENTS_NOT_OBJECT,
    );
  }

  if (
    sectionState.sections.checklist.incidents.activeTask &&
    !Object.values(TaskId).includes(
      sectionState.sections.checklist.incidents.activeTask,
    )
  ) {
    throw new Error(
      ConstructSectionStateFromPayloadErrors.RESPONSE_SECTIONS_CHECKLIST_INCIDENTS_ACTIVE_TASK_INVALID,
    );
  }

  if (!isObject(sectionState.sections.checklist.changes)) {
    throw new Error(
      ConstructSectionStateFromPayloadErrors.RESPONSE_SECTIONS_CHECKLIST_CHANGES_NOT_OBJECT,
    );
  }

  if (
    sectionState.sections.checklist.changes.activeTask &&
    !Object.values(TaskId).includes(
      sectionState.sections.checklist.changes.activeTask,
    )
  ) {
    throw new Error(
      ConstructSectionStateFromPayloadErrors.RESPONSE_SECTIONS_CHECKLIST_CHANGES_ACTIVE_TASK_INVALID,
    );
  }

  if (!isObject(sectionState.sections.documentation)) {
    throw new Error(
      ConstructSectionStateFromPayloadErrors.RESPONSE_SECTIONS_DOCUMENTATION_NOT_OBJECT,
    );
  }

  if (!isObject(sectionState.sections.productTours)) {
    throw new Error(
      ConstructSectionStateFromPayloadErrors.RESPONSE_SECTIONS_PRODUCT_TOURS_NOT_OBJECT,
    );
  }

  return sectionState as SectionState;
};

export const getTabTaskIds = (tabKey: ChecklistTabKey): TaskId[] => {
  switch (tabKey) {
    case ChecklistTabKey.Basics:
      return BasicsTaskIds;
    case ChecklistTabKey.Changes:
      return ChangesTaskIds;
    case ChecklistTabKey.Incidents:
    default:
      return IncidentsTaskIds;
  }
};

export const getCompletedTasks = (
  completedTasks: TaskId[],
  taskIds: TaskId[],
): TaskId[] => intersection(completedTasks, taskIds);

export const getLinkTarget = (
  linkProduct: Product,
  currentProduct: Product,
): string => (linkProduct === currentProduct ? '_self' : '_blank');

export const getComponentTestId = (testId: string) =>
  `jsm-getting-started-panel--${testId}`;
