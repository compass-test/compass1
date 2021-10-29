import { HttpMethod } from '../types';

export type ScenarioRequest = {
  method: HttpMethod;
  url: string;
  queryParams?: { [key: string]: string };
  headers?: { [key: string]: string };
  body?: any;
};

export type ScenarioUndefinedResponse = {
  status: number;
  body?: undefined;
};

export type ScenarioDefinedResponse<T> = {
  status: number;
  body: T;
  headers?: { [key: string]: string };
};

export type ScenarioError = Error;

export type ScenarioResponse<T> =
  | ScenarioDefinedResponse<T>
  | ScenarioUndefinedResponse
  | ScenarioError;

export type ScenarioBlueprint<T, K extends ScenarioResponse<T>> = {
  name?: string;
  request: ScenarioRequest;
  response: K;
};

export type Scenario<T = any> = {
  name?: string;
  request: ScenarioRequest;
  response: ScenarioResponse<T>;
};
