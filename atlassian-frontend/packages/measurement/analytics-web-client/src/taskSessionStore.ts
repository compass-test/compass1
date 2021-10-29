import { originTracingType } from './analyticsWebTypes';
import { mapKeys, omit, pick } from './objectUtils';
import SafeSessionStorage from './storage/SafeSessionStorage';
import urlParamExtractor from './urlUtils';
import uuidv4 from './uuid';

const { parseUrl, stringify } = require('query-string');

const STORAGE_KEY = 'taskSessions';
const INIT_KEY = 'taskSessionsInit';
const AWC_PARAM_PREFIX = 'awc.';
const TASK_SESSION_RELOAD_TIME = 3000;
export default class TaskSessionStore {
  _safeSessionStorage: SafeSessionStorage;

  constructor() {
    const currentTimestamp = Date.now();
    this._safeSessionStorage = new SafeSessionStorage();
    // Wrapping all sessionStorage calls in try catch to stop any error propogation, taskSessions should gracefully fail.
    try {
      if (this._taskSessionsNotRecentlyInitialised(currentTimestamp)) {
        this._writeToSessionStorage({});
        this._safeSessionStorage.setItem(INIT_KEY, currentTimestamp.toString());
      }
      // eslint-disable-next-line no-empty
    } catch (e) {}
  }

  _taskSessionsNotRecentlyInitialised = (currentTimestamp: any) => this._safeSessionStorage.getItem(STORAGE_KEY) === null
    || this._safeSessionStorage.getItem(INIT_KEY) === null
    || parseInt(this._safeSessionStorage.getItem(INIT_KEY) || '0', 10)
      < currentTimestamp - TASK_SESSION_RELOAD_TIME;

  _removeTaskSessionPrefix = (_: any, taskSessionName: any) => taskSessionName.split(AWC_PARAM_PREFIX)[1];

  _isTaskSessionQueryParam = (_: any, taskSessionName: any) => taskSessionName.startsWith(AWC_PARAM_PREFIX);

  getAllTaskSessions = () => {
    try {
      return JSON.parse(this._safeSessionStorage.getItem(STORAGE_KEY) || '');
    } catch (e) {
      return {};
    }
  };

  _writeToSessionStorage = (taskSessions: any) => {
    try {
      this._safeSessionStorage.setItem(
        STORAGE_KEY,
        JSON.stringify(taskSessions),
      );
      // eslint-disable-next-line no-empty
    } catch (e) {}
  };

  _appendTaskSessions = (newTaskSessions: any) => {
    const currentState = this.getAllTaskSessions();
    const newState = currentState === null
      ? newTaskSessions
      : Object.assign(currentState, newTaskSessions);
    this._writeToSessionStorage(newState);
  };

  _safelyRemoveKey = (currentState: any, taskSessionName: any) => {
    if (currentState === null) {
      return {};
    }

    delete currentState[taskSessionName];
    return currentState;
  };

  createTaskSession = (taskSessionName: any) => {
    const taskSessionId = uuidv4();
    const newTaskSessions: any = {};
    newTaskSessions[taskSessionName] = taskSessionId;
    this._appendTaskSessions(newTaskSessions);
    return taskSessionId;
  };

  createTaskSessionWithProvidedId = (
    taskSessionName: any,
    taskSessionId: any,
  ) => {
    if (typeof taskSessionId !== 'string') {
      throw new TypeError('invalid taskSessionId, must be string');
    }
    const newTaskSessions: any = {};
    newTaskSessions[taskSessionName] = taskSessionId;
    this._appendTaskSessions(newTaskSessions);
  };

  completeTaskSession = (taskSessionName: any) => {
    const currentState = this.getAllTaskSessions();
    const updatedState = this._safelyRemoveKey(currentState, taskSessionName);
    this._writeToSessionStorage(updatedState);
  };

  formatTaskSessionQueryString = ({ uri, includedTaskSessions }: any) => {
    const { url, query } = parseUrl(uri);
    const currentState = this.getAllTaskSessions();

    // Use specified task sessions, otherwise all tasksessions excluding originTracing sessions
    const filteredTaskSessions = includedTaskSessions
      ? pick(currentState, includedTaskSessions)
      : omit(currentState, Object.values(originTracingType));

    if (Object.keys(filteredTaskSessions).length === 0) {
      return uri;
    }

    const queryWithTaskSessions = {
      ...mapKeys(
        filteredTaskSessions,
        (_: any, taskSessionName: any) => AWC_PARAM_PREFIX + taskSessionName,
      ),
      ...query,
    };

    return `${url}?${stringify(queryWithTaskSessions)}`;
  };

  stripQueryParameters = () => {
    const extractedTaskSessions = mapKeys(
      urlParamExtractor(this._isTaskSessionQueryParam),
      this._removeTaskSessionPrefix,
    );

    this._appendTaskSessions(extractedTaskSessions);
  };
}
