import fetchMock from 'fetch-mock/cjs/client';

import { OptionType } from '@atlaskit/select/src';

import { Field, RankedFieldsRequest } from '../../common/types';
import fetchRankedFields from '../../services/ranker';

const DEFAULT_OPTS = {
  method: 'post',
  credentials: 'include',
  headers: {
    'content-type': 'application/json',
  },
};

function apiWillReturn(state: any) {
  fetchMock.once(
    '/gateway/api/fields/v2/recommendations/',
    state,
    DEFAULT_OPTS,
  );
}

describe('ranker', () => {
  beforeEach(() => {
    //fetch = jest.fn();
  });

  afterEach(() => {
    jest.clearAllMocks();
    fetchMock.restore();
  });

  const options: OptionType[] = [
    {
      value: 'value1',
      label: 'label1',
    },
    {
      value: 'value2',
      label: 'label2',
    },
    {
      value: 'value3',
      label: 'label3',
    },
  ];
  const rankedOptions: OptionType[] = [
    {
      value: 'value2',
      label: 'label2',
    },
    {
      value: 'value3',
      label: 'label3',
    },
    {
      value: 'value1',
      label: 'label1',
    },
  ];
  const mockResponse = {
    fieldObjects: [
      {
        id: 'd38723f345997c5bdf2862c6874227dab1f67a34',
        value: { label: 'label2', value: 'value2' },
        attributes: {},
      },
      {
        id: 'db1ed9b494f49b7b1229b20bae1791c0570722da',
        value: { label: 'label3', value: 'value3' },
        attributes: {},
      },
      {
        id: '46a58cb234009d5170a01fee25ddadfc8beb5bd1',
        value: { label: 'label1', value: 'value1' },
        attributes: {},
      },
    ],
    fieldId: 'labels-test',
  };
  const rankFieldsRequest: RankedFieldsRequest<OptionType> = {
    objectId: 'object123',
    containerId: 'container123',
    hashKey: 'hash123',
    principalId: 'principal123',
    product: 'jira',
    requiresHashing: true,
    tenantId: 'tenant123',
    sessionId: 'session123',
    fieldId: 'fields123',
    values: options.map((option) => {
      return {
        id: option.value,
        value: option,
      } as Field<OptionType>;
    }),
  };

  it('should return ranked fields on success', async () => {
    apiWillReturn(mockResponse);
    const rankedOptionsResponse = await fetchRankedFields(rankFieldsRequest);
    expect(rankedOptionsResponse).toEqual(rankedOptions);
  });
});
