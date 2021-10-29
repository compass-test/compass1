import { renderHook } from '@testing-library/react-hooks';
import fetchMock from 'fetch-mock/cjs/client';

import {
  mockGetCollaborators,
  testCollaboratorsData,
} from '@atlassian/ptc-test-utils';

import { useCollaboratorsService } from '../../../hooks/use-collabs-service';
import { transformCollabsDataToUsers } from '../../../transfomers/collabs';
import { CollaborationGraphResponse } from '../../../types';

describe('useCollaboratorsService', () => {
  afterEach(() => {
    fetchMock.reset();
  });

  it('should init correctly', async () => {
    const { result } = renderHook(() =>
      useCollaboratorsService('test-cloud-id'),
    );

    expect(result.current).toEqual({
      loading: true,
      error: undefined,
      data: [],
      fetchData: expect.any(Function),
    });
  });

  it('should return data if request succeeds', async () => {
    mockGetCollaborators();
    const { result } = renderHook(() =>
      useCollaboratorsService('test-cloud-id'),
    );

    const promise = result.current.fetchData();

    expect(result.current).toEqual({
      loading: true,
      error: undefined,
      data: [],
      fetchData: expect.any(Function),
    });

    await promise;

    expect(result.current).toEqual({
      loading: false,
      error: undefined,
      data: transformCollabsDataToUsers(
        testCollaboratorsData as CollaborationGraphResponse,
      ),
      fetchData: expect.any(Function),
    });
  });

  it('should return error if request fails', async () => {
    // do not call mockGetCollaborators(); to mock returned data
    const { result } = renderHook(() =>
      useCollaboratorsService('test-cloud-id'),
    );

    const promise = result.current.fetchData();

    expect(result.current).toEqual({
      loading: true,
      error: undefined,
      data: [],
      fetchData: expect.any(Function),
    });

    await promise;

    expect(result.current).toEqual({
      loading: false,
      error: expect.any(Error),
      data: [],
      fetchData: expect.any(Function),
    });
  });
});
