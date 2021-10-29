export interface ResultState<T> {
  isLoading: boolean;
  results: T | null;
}

export enum ActionSubjectId {
  preQuerySearchResults = 'preQuerySearchResults',
  postQuerySearchResults = 'postQuerySearchResults',
  cachedResults = 'cachedResults',
}
