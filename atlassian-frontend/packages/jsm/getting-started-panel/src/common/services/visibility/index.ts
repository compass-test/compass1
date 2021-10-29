import { createContainer, createHook, createStore } from 'react-sweet-state';
import { State, VisibilityContainerProps } from './types';
import { computeVisibility } from './util';

export { SdVisibilityKeys, SdVisibilityRoles, VisibilityValues } from './types';
export type {
  VisibilityByTab,
  VisibilityByTaskId,
  VisibilityData,
  VisibilityState,
} from './types';

export { getVisibleTasks, getVisibleActiveTab } from './util';

export const visibilityStore = createStore({
  name: 'getting-started-panel-visibility-store',
  initialState: {} as State,
  actions: {},
});

export const VisibilityContainer = createContainer(visibilityStore, {
  onInit: () => ({ setState }, props: VisibilityContainerProps) => {
    setState(computeVisibility(props));
  },
  onUpdate: () => ({ setState }, props: VisibilityContainerProps) => {
    setState(computeVisibility(props));
  },
});

const getTabVisibility = (state: State) => state.byTab;
const getTaskVisibility = (state: State) => state.byTaskId;
const getSdRole = (state: State) => state.sdRole;
// All users with a JSM project will have access to at least basics
const getHasJsmProject = (state: State) => state.byTab.basics === true;

export const useTabVisibility = createHook(visibilityStore, {
  selector: getTabVisibility,
});

export const useTaskVisibility = createHook(visibilityStore, {
  selector: getTaskVisibility,
});

export const useSdRole = createHook(visibilityStore, { selector: getSdRole });
export const useHasJsmProject = createHook(visibilityStore, {
  selector: getHasJsmProject,
});
