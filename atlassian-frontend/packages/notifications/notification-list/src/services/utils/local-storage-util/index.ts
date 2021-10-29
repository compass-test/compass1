import { RequestReadState } from '../../../common/types';

const READ_STATE_FILTER_KEY = 'notification-list.readStateFilter';

const saveToLocalStorage = (key: string, value: string) => {
  try {
    localStorage.setItem(key, value);
  } catch (e) {}
};

const loadFromLocalStorage = (key: string): string => {
  try {
    return localStorage.getItem(key) ?? '';
  } catch (e) {
    return '';
  }
};

export const saveReadStateFilterToLocalStorage = (
  readState: RequestReadState,
) => {
  saveToLocalStorage(READ_STATE_FILTER_KEY, readState);
};

export const loadReadStateFilterFromLocalStorage = (): RequestReadState => {
  const loadedReadState = loadFromLocalStorage(READ_STATE_FILTER_KEY);
  return Object.values(RequestReadState).includes(
    loadedReadState as RequestReadState,
  )
    ? (loadedReadState as RequestReadState)
    : RequestReadState.ANY;
};
