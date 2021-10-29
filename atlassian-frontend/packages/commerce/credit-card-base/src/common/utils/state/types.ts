export type RequestState = 'loading' | 'error' | 'complete';

/**
 * generic "unspecifited" state
 * all pieces are defined, but might not exists
 * this allow property destruction with later type guard usage
 */
export interface Stated<T> {
  state: RequestState;
  error?: string;
  payload?: T;
}

export interface StateLoading<T> extends Stated<T> {
  state: 'loading';
}

/**
 * error state has error defined
 */
export interface StateError<T> extends Stated<T> {
  state: 'error';
  error: string;
}

/**
 * complete state has payload defined
 */
export interface StateComplete<T> extends Stated<T> {
  state: 'complete';
  payload: T;
}

/**
 * Stateful container for a given <T>
 */
export type StatedResponse<T> =
  | StateLoading<T>
  | StateError<T>
  | StateComplete<T>;
