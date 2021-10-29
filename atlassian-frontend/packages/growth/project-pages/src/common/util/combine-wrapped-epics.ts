import { combineEpics } from 'redux-observable';

type OnErrorFunction = (error: any, epicName: string) => void;
const defaultOnErrorHandler = (error: any) => {
  throw error;
};

/**
 * Wrap the specified epic so that any errors invoke an error handler and return the original
 * source stream.
 *
 * By default, the onError handler will bubble errors to the top, so they can be displayed
 * in the console, or captured by error reporting.
 *
 * Note: The onError handler is deferred, to ensure that it can no longer cause further errors
 * in the epic.
 *
 * @param onError - an optional handler which will be called if an epic encounters an error
 */
const wrapEpic = (
  epic: any,
  epicName: string,
  onError: OnErrorFunction = defaultOnErrorHandler,
) => (...args: any[]) =>
  epic(...args).catch((error: any, source: any) => {
    setTimeout(() => onError(error, epicName), 0);
    return source;
  });

/**
 * Combine and wrap all epics, so that errors do not kill the entire action stream.
 *
 * @param epicObject - values are epics and keys are their identifiers
 * @param onError - an optional handler which will be called if any epic encounters an error
 */
export default (epicObject: Object, onError: OnErrorFunction) =>
  combineEpics(
    ...Object.entries(epicObject).map(([name, epic]) =>
      wrapEpic(epic, name, onError),
    ),
  );
