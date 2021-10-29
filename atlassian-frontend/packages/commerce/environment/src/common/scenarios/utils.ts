import { Request, Response } from 'cross-fetch';

import { fetchMock, HttpCallMock, RequestPredicate } from '../fetch-mock';

import { Scenario, ScenarioRequest } from './types';

const jsonResponse = (
  data?: any,
  init: ResponseInit = {
    status: 200,
  },
): Response => {
  const response = new Response(
    data
      ? new Blob([JSON.stringify(data)], {
          type: 'application/json',
        })
      : undefined,
    init,
  );
  // the patch for the unknown bug
  response.clone = () => response;

  // use setTimeout to resolve in the next macro tick as it should
  response.json = () =>
    new Promise((resolve) =>
      setTimeout(resolve, 1, JSON.parse(JSON.stringify(data))),
    );
  return response;
};

const objToEntries = (obj: { [key: string]: string }): [string, string][] =>
  Object.keys(obj).map((key) => [key, obj[key]]);

export const fullScenarioRequestUrl = (sr: ScenarioRequest) =>
  sr.queryParams
    ? `${sr.url}?${new URLSearchParams(objToEntries(sr.queryParams))}`
    : sr.url;

export const scenarioToRequestPredicate = (
  scenario: Scenario,
): RequestPredicate => {
  const sReq = new Request(fullScenarioRequestUrl(scenario.request), {
    method: scenario.request.method,
  });
  return (req) => req.url === sReq.url && req.method === sReq.method;
};

export const scenarioToResponse = (
  scenario: Scenario,
): Promise<Response> | Response => {
  const response = scenario.response;
  if (response instanceof Error) {
    return Promise.reject(scenario);
  }
  return jsonResponse(response.body, { status: response.status });
};

const scenarioToHttpMock = (s: Scenario): HttpCallMock => ({
  request: scenarioToRequestPredicate(s),
  response: scenarioToResponse(s),
});

export const fetchScenarioMock = (scenarios: Scenario[]): typeof window.fetch =>
  fetchMock(scenarios.map(scenarioToHttpMock));
