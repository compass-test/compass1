import releases from './index';
import * as typeorm from 'typeorm';
import { Release } from '../../../db/entities/Release';

const mockReleases = (releases: Array<Partial<Release>>) => {
  const fakeQueryBuilder = jest.fn().mockReturnValue({
    orderBy: jest.fn().mockReturnThis(),
    limit: jest.fn().mockReturnThis(),
    where: jest.fn().mockReturnThis(),
    getMany: jest.fn().mockReturnValue(releases),
  });
  jest
    .spyOn(typeorm, 'getRepository')
    .mockReturnValue({ createQueryBuilder: fakeQueryBuilder } as any);
};

beforeEach(() => {
  jest.clearAllMocks();
});

describe('releases', () => {
  describe('findAllWithAverages', () => {
    it('return average development duration for a single release', async () => {
      const releaseMockData: Array<Partial<Release>> = [
        {
          name: 'calcite',
          developmentDate: new Date('2020-11-01T02:24:43.756Z'),
          stabilizingDate: new Date('2020-11-04T06:20:05.165Z'),
        },
      ];
      mockReleases(releaseMockData);
      const result = await releases.findAllWithAverages();
      expect(result.averageDevelopmentDurationInDays).toEqual(3);
    });
    it('returns average development duration for multiple release', async () => {
      const releaseMockData: Array<Partial<Release>> = [
        {
          name: 'diamond',
          developmentDate: new Date('2020-10-01T02:24:43.756Z'),
          stabilizingDate: new Date('2020-10-05T06:20:05.165Z'),
        },
        {
          name: 'emerald',
          developmentDate: new Date('2020-11-01T02:24:43.756Z'),
          stabilizingDate: new Date('2020-11-04T06:20:05.165Z'),
        },
      ];
      mockReleases(releaseMockData);
      const result = await releases.findAllWithAverages();
      expect(result.averageDevelopmentDurationInDays).toEqual(3.5);
    });
    it('returns average development duration for multiple releases with missing data', async () => {
      const releaseMockData: Array<Partial<Release>> = [
        {
          name: 'diamond',
          developmentDate: new Date('2020-11-01T02:24:43.756Z'),
          stabilizingDate: new Date('2020-11-04T06:20:05.165Z'),
        },
        {
          name: 'emerald',
          developmentDate: new Date('2020-11-01T02:24:43.756Z'),
          stabilizingDate: undefined,
        },
      ];
      mockReleases(releaseMockData);
      const result = await releases.findAllWithAverages();
      expect(result.averageDevelopmentDurationInDays).toEqual(3);
    });
    it('returns undefined average development duration if all data is incomplete', async () => {
      const releaseMockData: Array<Partial<Release>> = [
        {
          name: 'diamond',
          developmentDate: new Date('2020-11-01T02:24:43.756Z'),
          stabilizingDate: undefined,
        },
        {
          name: 'emerald',
          developmentDate: new Date('2020-11-01T02:24:43.756Z'),
          stabilizingDate: undefined,
        },
      ];
      mockReleases(releaseMockData);
      const result = await releases.findAllWithAverages();
      expect(result.averageDevelopmentDurationInDays).toEqual(undefined);
    });
    it('returns a list of release names that average was calculated from', async () => {
      const releaseMockData: Array<Partial<Release>> = [
        {
          name: 'diamond',
          developmentDate: new Date('2020-11-01T02:24:43.756Z'),
          stabilizingDate: new Date('2020-11-04T06:20:05.165Z'),
        },
        {
          name: 'emerald',
          developmentDate: new Date('2020-11-01T02:24:43.756Z'),
          stabilizingDate: undefined,
        },
      ];
      mockReleases(releaseMockData);
      const result = await releases.findAllWithAverages();
      expect(result.averageDevelopmentDurationInDaysReleases).toEqual([
        'diamond',
      ]);
    });
    it('returns average stabilisation duration for multiple releases', async () => {
      const releaseMockData: Array<Partial<Release>> = [
        {
          name: 'diamond',
          stabilizingDate: new Date('2020-10-01T02:24:43.756Z'),
          releaseToNPMDate: new Date('2020-10-05T06:20:05.165Z'),
        },
        {
          name: 'emerald',
          stabilizingDate: new Date('2020-11-01T02:24:43.756Z'),
          releaseToNPMDate: new Date('2020-11-04T06:20:05.165Z'),
        },
      ];
      mockReleases(releaseMockData);
      const result = await releases.findAllWithAverages();
      expect(result.averageStabilisationDurationInDays).toEqual(3.5);
      expect(result.averageStabilisationDurationInDaysReleases).toEqual([
        'diamond',
        'emerald',
      ]);
    });
    it('returns average time to be adopted for multiple releases', async () => {
      const releaseMockData: Array<Partial<Release>> = [
        {
          name: 'diamond',
          releaseToNPMDate: new Date('2020-10-01T02:24:43.756Z'),
          adoptedByOneProductDate: new Date('2020-10-05T06:20:05.165Z'),
        },
        {
          name: 'emerald',
          releaseToNPMDate: new Date('2020-11-01T02:24:43.756Z'),
          adoptedByOneProductDate: new Date('2020-11-04T06:20:05.165Z'),
        },
      ];
      mockReleases(releaseMockData);
      const result = await releases.findAllWithAverages();
      expect(result.averageAdoptionByOneProductDurationInDays).toEqual(3.5);
      expect(result.averageAdoptionByOneProductDurationInDaysReleases).toEqual([
        'diamond',
        'emerald',
      ]);
    });
  });
});
