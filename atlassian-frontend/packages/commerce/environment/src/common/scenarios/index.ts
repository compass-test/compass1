import { HttpMethod } from '../types';

import {
  ScenarioBlueprint,
  ScenarioDefinedResponse,
  ScenarioError,
  ScenarioRequest,
  ScenarioResponse,
  ScenarioUndefinedResponse,
} from './types';

export type { Scenario } from './types';
export {
  fetchScenarioMock,
  fullScenarioRequestUrl,
  scenarioToRequestPredicate,
  scenarioToResponse,
} from './utils';
export {
  IG_ID,
  TXA_ID,
  IG_ID_2,
  TXA_ID_2,
  TXA_ID_NO,
  TXA_ID_NO_2,
} from './constants';

/**
 * network scenario mocks helper
 * @param scenarios
 * @see {@link networkScenario} to create a single scenario
 */
export const networksScenarios = <
  K extends {
    [key: string]: ScenarioBlueprint<{}, ScenarioResponse<{}>>;
  }
>(
  scenarios: K,
): K => scenarios;

/**
 * single network scenario creation helper
 * @param scenario
 * @see {@link networksScenarios} to create a single scenario
 */
export const networkScenario = <
  Type extends {},
  Payload extends ScenarioResponse<Type>,
  T extends ScenarioBlueprint<Type, Payload>
>(
  scenario: T,
): T => scenario;

/**
 * Request creation helper
 * @param url
 * @param {HttpMethod}[method]
 * @param headers
 * @param body
 * @see {@link ScenarioRequest}
 */
export const url = (
  url: string,
  method: HttpMethod = 'GET',
  headers?: { [key: string]: string },
  body?: object,
): ScenarioRequest => ({
  method,
  url,
  headers,
  body,
});

/**
 * Response creation helper
 * 200 response with known payload
 * @param body
 * @see {@link ScenarioDefinedResponse}
 */
export const ok = <T>(body: T): ScenarioDefinedResponse<T> => ({
  body,
  status: 200,
  headers: {
    'content-type': 'application/json',
  },
});

/**
 * Response creation helper
 * 201 response with known payload
 * @param body
 * @see {@link ScenarioDefinedResponse}
 */
export const created = <T>(body: T): ScenarioDefinedResponse<T> => ({
  body,
  status: 201,
});

/**
 * Response creation helper
 * 204 without payload
 * @see {@link ScenarioUndefinedResponse}
 */
export const empty = (): ScenarioUndefinedResponse => ({ status: 204 });

/**
 * Response creation helper
 * 400 with payload
 * @see {@link ScenarioDefinedResponse}
 */
export const error = <T>(
  body: T,
  statusCode?: number,
): ScenarioDefinedResponse<T> => ({
  body,
  status: statusCode || 400,
});

/**
 * Response creation helper
 * 404 without payload
 * @see {@link ScenarioUndefinedResponse}
 */
export const notFound = (): ScenarioUndefinedResponse => ({
  status: 404,
});

/**
 * Response creation helper
 * 500 with payload
 * @see {@link ScenarioDefinedResponse}
 */
export const serverFailure = (
  body: any = 'Server Unavailable',
): ScenarioDefinedResponse<any> => ({
  body,
  status: 500,
});

/**
 * Response creation helper
 * client-side error
 */
export const clientFailure = (
  message: string = 'Network error',
): ScenarioError => new Error(message);
