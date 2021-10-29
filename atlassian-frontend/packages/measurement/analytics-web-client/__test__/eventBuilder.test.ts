import {
  buildContainersWithName,
  filterAndBuildContainers,
} from '../src/eventBuilder';

describe('EventBuilder', () => {
  describe('filterAndBuildContainers', () => {
    test('should build if valid', () => {
      const containersObj = {
        project: {
          id: '1234',
          type: 'software',
        },
        sprint: {
          id: '0987',
        },
      };

      const result = filterAndBuildContainers(containersObj);
      expect(result).toEqual(containersObj);
    });

    test('should return empty object', () => {
      const containersObj = {};

      const result = filterAndBuildContainers(containersObj);
      expect(result).toEqual(containersObj);
    });

    test('should remove extra fields', () => {
      const containersObj = {
        project: {
          id: '1234',
          type: 'software',
        },
        sprint: {
          id: '0987',
        },
        board: {
          id: '5678',
          somethingExtra: 'true',
        },
      };

      const expectedObj = {
        project: {
          id: '1234',
          type: 'software',
        },
        sprint: {
          id: '0987',
        },
        board: {
          id: '5678',
        },
      };

      const result = filterAndBuildContainers(containersObj);
      expect(result).toEqual(expectedObj);
    });
  });

  describe('buildContainersWithName', () => {
    test('should build if valid', () => {
      const containersObj = {
        project: {
          id: '1234',
          type: 'software',
        },
        sprint: {
          id: '0987',
        },
      };

      const result = buildContainersWithName(containersObj);
      expect(result).toEqual({ containers: containersObj });
    });

    test('should return undefined if not a valid object', () => {
      const containersObj: any = [];

      const result = buildContainersWithName(containersObj);
      expect(result).toEqual(undefined);
    });
  });
});
