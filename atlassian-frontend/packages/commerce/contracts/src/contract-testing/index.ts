import { Pact, ResponseOptions } from '@pact-foundation/pact';
import { parse, stringify } from 'query-string';
import fetch from 'node-fetch';

import type {
  ScenarioBlueprint,
  ServiceContractScenarios,
} from '@atlassian/commerce-environment/mocks';

const ccpStargatePrefix = '/gateway/api/ccp';

type PactResult = Promise<void>;

type QueryArgs = { [key: string]: string | string[] };

const toSearchParams = (params: QueryArgs | undefined): string => {
  if (!params) {
    return '';
  }

  return `?${stringify(params)}`;
};

const asSearchParams = (
  params: QueryArgs | undefined,
  search: string,
): QueryArgs => {
  if (params && search) {
    throw new Error(
      'searchQuery is defined is request params and request search',
    );
  }

  if (params) {
    return params;
  }

  return search ? (parse(search) as QueryArgs) : {};
};

const generatePact = async (
  provider: Pact,
  interactionDetails: {
    providerState?: string;
    uponReceiving: string;
    withRequest: {
      method: 'GET' | 'PUT' | 'POST' | 'DELETE' | 'PATCH';
      path: string;
      headers?: { [name: string]: string };
      query?: { [name: string]: string | string[] };
      body?: any;
    };
    willRespondWith: ResponseOptions;
  },
): Promise<PactResult> => {
  const request = interactionDetails.withRequest;

  const requestHeader = {
    'x-transaction-account': 'TXA_ID',
    authorization: 'bearer dummy',
    ...(request.headers ?? {}),
  };

  const requestBody = request.body
    ? JSON.stringify(request.body, null, 2)
    : request.body;

  await provider.addInteraction({
    state: interactionDetails.providerState
      ? interactionDetails.providerState
      : `I've a valid TXA id`,
    uponReceiving: `${interactionDetails.uponReceiving}: ${request.method} ${request.path} -> ${interactionDetails.willRespondWith.status}`,
    withRequest: {
      method: request.method,
      path: request.path,
      headers: requestHeader,
      body: request.body,
      query: request.query,
    },
    willRespondWith: interactionDetails.willRespondWith,
  });

  const response = () =>
    fetch(
      `http://localhost:${provider.server.options.port}${
        request.path
      }${toSearchParams(request.query)}`,
      {
        method: request.method,
        headers: requestHeader,
        body: requestBody,
      },
    );

  await response();
};

const generatePactForScenario = async (
  provider: Pact,
  scenario: ScenarioBlueprint<any, any>,
  name: string,
): Promise<PactResult> => {
  const { request, response } = scenario;
  const { url, method, body, queryParams } = request;

  if (!url.startsWith(ccpStargatePrefix)) {
    throw new Error(
      `Pact test are only supported on CCP API Gateway which has urls prefixed with: '${ccpStargatePrefix}' but the pact test used url: '${url}'`,
    );
  }
  if (response.status > 200) {
    // do not verify server errors
    return;
  }

  const [path, search] = url.replace(ccpStargatePrefix, '').split('?');

  return generatePact(provider, {
    providerState: `I've a valid TXA id`,
    uponReceiving: `${name}: ${method} ${path} -> ${response.status}`,
    withRequest: {
      method,
      path,
      headers: request.headers,
      body,
      query: asSearchParams(queryParams, search),
    },
    willRespondWith: {
      status: response.status,
      body: response.body,
      headers: response.headers,
    },
  });
};

/**
 * low level API to generate a PACT contract mock for a given mock scenarios
 * @param targetDir
 * @param consumer
 * @param provider
 * @param contracts
 */
export const generateContractMock = async (
  targetDir: string,
  { consumer, provider, contracts }: ServiceContractScenarios,
) => {
  const pactProvider = new Pact({
    consumer,
    provider,
    dir: targetDir,
    logLevel: 'fatal',
  });

  await pactProvider.setup();

  for (const [name, scenario] of Object.entries(contracts)) {
    const scenarioName = scenario.name ?? name;
    await generatePactForScenario(pactProvider, scenario, scenarioName);
    await pactProvider.verify();
  }

  await pactProvider.finalize();
};
