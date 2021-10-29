import React from 'react';
import { render } from '@testing-library/react';
import { ProductFabricStatus } from './index';
import { getInDevelopmentReleaseName } from './row/DeployedRelease';
import useAxios from 'axios-hooks';
import MockDate from 'mockdate';
import moment from 'moment-timezone';
import type { ReleaseStatus } from '../../../db/entities/Release';
import { PAGINATION_THRESHOLD_IN_HOURS } from '../../../server/constants';
import { ReleaseRequestPayload } from '../../interfaces/release-request-payload';

moment.tz.setDefault('Australia/Sydney');
jest.setMock('moment', moment);
jest.mock('axios-hooks');

const lemurRelease: ReleaseRequestPayload = {
  createdDate: '2021-03-10T06:53:09.785Z',
  cutDate: '2021-03-31T00:00:00.000Z',
  developmentDate: '2021-03-16T23:48:53.138Z',
  jiraTicket: 'FABDODGEM-57',
  name: 'lemur',
  pullRequests: [],
  startDate: '2021-03-17T00:00:00.000Z',
  status: 'development' as ReleaseStatus,
};

const krakenRelease: ReleaseRequestPayload = {
  createdDate: '2021-02-26T00:30:10.011Z',
  cutDate: '2021-03-16T00:00:00.000Z',
  developmentDate: '2021-03-02T23:05:36.065Z',
  jiraTicket: 'FABDODGEM-56',
  name: 'kraken',
  pullRequests: [],
  stabilizingDate: '2021-03-16T23:38:43.345Z',
  startDate: '2021-03-03T00:00:00.000Z',
  status: 'stabilising' as ReleaseStatus,
};

const mockedReleases = [lemurRelease, krakenRelease];

const mockedDeploymentCommit = 'dc13671722dfd819a3c0e82b84134dd12e04ba10';
const mockedDeploymentTimestamp = '2021-02-20T06:53:39.000Z';

function getMockedDeploymentData(
  stale: boolean,
  prsBehind: number,
  deploymentCommit: string,
  deploymentTimestamp: string,
  latestCommit: string,
  latestTimestamp: string,
) {
  return {
    loading: undefined,
    data: {
      status: 'success',
      payload: {
        lastDeploymentCommitHash: deploymentCommit,
        isAutoRebase: true,
        lastDeploymentTimestamp: deploymentTimestamp,
        isStale: stale,
        latestCommitTimestamp: latestTimestamp,
        latestCommitHash: latestCommit,
        numberOfPullRequestsBehind: prsBehind,
      },
    },
    error: undefined,
  };
}

describe('Branch deploy details', () => {
  it('should show correct text when loading', () => {
    (useAxios as any).mockReturnValue([
      { loading: true, data: undefined, error: undefined },
      jest.fn(),
    ]);
    const { getByText } = render(<ProductFabricStatus />);
    expect(getByText('Loading ..', { exact: false })).not.toBeNull();
  });
  it('should show correct message if error occurs', () => {
    (useAxios as any).mockReturnValue([
      { loading: undefined, data: undefined, error: 'oh no' },
      jest.fn(),
    ]);
    const { getByText } = render(<ProductFabricStatus />);
    expect(getByText('error getting data', { exact: false })).not.toBeNull();
  });
  it('should show correct message if no deployment data is returned', () => {
    (useAxios as any).mockReturnValue([
      {
        loading: undefined,
        data: { status: 'success', payload: {} },
        error: undefined,
      },
      jest.fn(),
    ]);
    const { getAllByText } = render(<ProductFabricStatus />);
    expect(getAllByText('no data', { exact: false })).not.toBeNull();
  });
  describe('correct data', () => {
    beforeEach(() => {
      MockDate.set('2021-03-02');
      (useAxios as any).mockReturnValue([
        getMockedDeploymentData(
          true,
          42,
          mockedDeploymentCommit,
          '2021-02-25T06:53:39.000Z',
          '134dd12e04ba',
          '2021-03-01T12:53:39.000Z',
        ),
        jest.fn(),
      ]);
    });
    afterEach(() => {
      MockDate.reset();
    });
    describe('release name matching', () => {
      it(`should show "Unknown" release name lozenge when the commit timestamp doesn't match release phase dates.`, () => {
        (useAxios as any).mockReturnValue([
          getMockedDeploymentData(
            false,
            0,
            mockedDeploymentCommit,
            mockedDeploymentTimestamp,
            mockedDeploymentCommit,
            mockedDeploymentTimestamp,
          ),
          jest.fn(),
        ]);
        const { getByText } = render(
          <ProductFabricStatus releases={mockedReleases} />,
        );
        expect(getByText('Unknown')).not.toBeNull();
      });

      it(`should show current release name lozenge when the commit timestamp is within the in-development release`, () => {
        const lastDeploymentTimestamp = new Date(lemurRelease.developmentDate!);
        lastDeploymentTimestamp.setDate(lastDeploymentTimestamp.getDate() + 1);
        (useAxios as any).mockReturnValue([
          getMockedDeploymentData(
            false,
            0,
            mockedDeploymentCommit,
            lastDeploymentTimestamp.toUTCString(),
            mockedDeploymentCommit,
            mockedDeploymentTimestamp,
          ),
          jest.fn(),
        ]);
        const { getByText } = render(
          <ProductFabricStatus releases={mockedReleases} />,
        );
        expect(getInDevelopmentReleaseName({ releases: mockedReleases })).toBe(
          'lemur',
        );
        expect(getByText('lemur')).not.toBeNull();
      });

      it(`should show legacy release name lozenge when the commit timestamp aligns to a legacy release`, () => {
        const lastDeploymentTimestamp = new Date(
          krakenRelease.developmentDate!,
        );
        lastDeploymentTimestamp.setDate(lastDeploymentTimestamp.getDate() + 1);
        (useAxios as any).mockReturnValue([
          getMockedDeploymentData(
            false,
            0,
            mockedDeploymentCommit,
            lastDeploymentTimestamp.toUTCString(),
            mockedDeploymentCommit,
            mockedDeploymentTimestamp,
          ),
          jest.fn(),
        ]);
        expect(getInDevelopmentReleaseName({ releases: mockedReleases })).toBe(
          'lemur',
        );
        const { getByText } = render(
          <ProductFabricStatus releases={mockedReleases} />,
        );
        expect(getByText('kraken')).not.toBeNull();
      });
    });

    describe('when up to date', () => {
      beforeEach(() => {
        (useAxios as any).mockReturnValue([
          getMockedDeploymentData(
            false,
            0,
            mockedDeploymentCommit,
            mockedDeploymentTimestamp,
            mockedDeploymentCommit,
            mockedDeploymentTimestamp,
          ),
          jest.fn(),
        ]);
      });

      it('should show "Up to date" text', () => {
        const { getByTestId } = render(<ProductFabricStatus />);
        expect(getByTestId('build-status').textContent).toContain(
          'Product Fabric is up to date with develop',
        );
        expect(getByTestId('testing-status').textContent).toContain(
          'Blitz testing is safe at this time',
        );
      });
    });

    describe('when stale', () => {
      it('should show "Not up to date" test', () => {
        const { getByTestId } = render(<ProductFabricStatus />);
        expect(getByTestId('build-status').textContent).toEqual(
          'Product Fabric is not up to date with develop',
        );
        expect(getByTestId('testing-status').textContent).toContain(
          'Blitz testing is discouraged at this time.Visit #twp-release-managers for updates.',
        );
      });
    });

    it('should show latest commit as 7 character SHA', () => {
      const { getByText } = render(<ProductFabricStatus />);
      expect(
        getByText('dc13671', {
          exact: true,
        }),
      ).not.toBeNull();
    });

    it('should show latest commit timestamp converted to relative time', () => {
      const { getByText } = render(<ProductFabricStatus />);
      expect(getByText('(11 hours ago)')).not.toBeNull();
    });

    it('should show pluralised missing PRs count when data exists for it', () => {
      const latestCommitTimestamp = new Date(mockedDeploymentTimestamp);
      latestCommitTimestamp.setDate(latestCommitTimestamp.getDate() + 1);
      (useAxios as any).mockReturnValue([
        getMockedDeploymentData(
          true,
          12,
          mockedDeploymentCommit,
          mockedDeploymentTimestamp,
          mockedDeploymentCommit,
          latestCommitTimestamp.toUTCString(),
        ),
        jest.fn(),
      ]);
      const { getByText } = render(<ProductFabricStatus />);
      expect(getByText('Behind by 12 merged pull requests.')).not.toBeNull();
    });

    it('should show singular missing PR count when data exists for it', () => {
      const latestCommitTimestamp = new Date(mockedDeploymentTimestamp);
      latestCommitTimestamp.setDate(latestCommitTimestamp.getDate() + 1);
      (useAxios as any).mockReturnValue([
        getMockedDeploymentData(
          true,
          1,
          mockedDeploymentCommit,
          mockedDeploymentTimestamp,
          mockedDeploymentCommit,
          latestCommitTimestamp.toUTCString(),
        ),
        jest.fn(),
      ]);
      const { getByText } = render(<ProductFabricStatus />);
      expect(getByText('Behind by 1 merged pull request.')).not.toBeNull();
    });

    it(`should show missing PRs count with a + suffix when time difference is more than ${PAGINATION_THRESHOLD_IN_HOURS} hours`, () => {
      const latestCommitTimestamp = new Date(mockedDeploymentTimestamp);
      const daysAhead = Math.ceil(PAGINATION_THRESHOLD_IN_HOURS / 24);
      latestCommitTimestamp.setDate(
        latestCommitTimestamp.getDate() + daysAhead,
      );
      (useAxios as any).mockReturnValue([
        getMockedDeploymentData(
          true,
          30,
          mockedDeploymentCommit,
          mockedDeploymentTimestamp,
          mockedDeploymentCommit,
          latestCommitTimestamp.toUTCString(),
        ),
        jest.fn(),
      ]);
      const { getByText } = render(<ProductFabricStatus />);
      expect(getByText('Behind by 30+ merged pull requests.')).not.toBeNull();
    });

    it('should not show missing PRs count if noOfPullRequestsBehind is less than 1', () => {
      const component = <ProductFabricStatus />;
      (useAxios as any).mockReturnValue([
        getMockedDeploymentData(
          true,
          -1,
          mockedDeploymentCommit,
          mockedDeploymentTimestamp,
          mockedDeploymentCommit,
          '2021-03-01T12:53:39.000Z',
        ),
        jest.fn(),
      ]);
      let { queryByText } = render(component);
      expect(queryByText('Behind by', { exact: false })).toBeNull();
      expect(
        queryByText('Behind by -1 merged pull request', { exact: false }),
      ).toBeNull();

      (useAxios as any).mockReturnValue([
        getMockedDeploymentData(
          true,
          0,
          mockedDeploymentCommit,
          mockedDeploymentTimestamp,
          mockedDeploymentCommit,
          '2021-03-01T12:53:39.000Z',
        ),
        jest.fn(),
      ]);
      queryByText = render(component).queryByText;
      expect(queryByText('Behind by', { exact: false })).toBeNull();
      expect(
        queryByText('Behind by 0 merged pull request', { exact: false }),
      ).toBeNull();
    });
  });
});
