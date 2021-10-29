import {
  validateActionEventType,
  validateContainers,
  validateContainersObject,
} from '../src/eventValidation';

describe('EventValidation', () => {
  describe('validateContainers', () => {
    test('should not throw if valid', () => {
      const containers = {
        project: {
          id: '1234',
          type: 'software',
        },
        sprint: {
          id: '0987',
        },
      };

      expect(() => validateContainers(containers)).not.toThrow();
    });

    test('should throw if not an Object', () => {
      const containers: any = [];

      expect(() => validateContainers(containers)).toThrow(
        'properties.containers must be an Object',
      );
    });

    test('should throw if invalid container exists', () => {
      const containers = {
        project: {
          id: null,
          type: 'software',
        },
        sprint: {
          id: '0987',
        },
      };

      expect(() => validateContainers(containers)).toThrow(
        'properties.containers.id must be of type String',
      );
    });
  });

  describe('validateContainersObject', () => {
    test('should not throw if required keys are set', () => {
      const container = {
        id: '1234',
        type: 'software',
      };

      expect(() => validateContainersObject(container)).not.toThrow();
    });

    test("should not throw if 'type' key is not set", () => {
      const container = {
        id: '1234',
      };

      expect(() => validateContainersObject(container)).not.toThrow();
    });

    test("should throw if 'id' key is missing", () => {
      const container = {
        type: 'software',
      };

      expect(() => validateContainersObject(container)).toThrow(
        "properties.containers is missing field 'id'",
      );
    });

    test("should throw if 'id' is null", () => {
      const container = {
        id: null,
      };

      expect(() => validateContainersObject(container)).toThrow(
        'properties.containers.id must be of type String',
      );
    });

    test("should throw if 'id' key is not a String", () => {
      const container = {
        id: 1234,
        type: 'software',
      };

      expect(() => validateContainersObject(container)).toThrow(
        'properties.containers.id must be of type String',
      );
    });

    test("should throw if 'type' key is null", () => {
      const container = {
        id: '1234',
        type: null,
      };

      expect(() => validateContainersObject(container)).toThrow(
        'properties.containers.type must be of type String',
      );
    });
  });

  describe('validateActionEventType', () => {
    test('should throw if the argument is null', () => {
      // @ts-ignore Test
      expect(() => validateActionEventType(null)).toThrow(
        'Invalid action event type: null, must be one of: [operational,track,ui]',
      );
    });

    test('should throw if the argument is undefined', () => {
      // @ts-ignore Test
      expect(() => validateActionEventType(undefined)).toThrow(
        'Invalid action event type: undefined, must be one of: [operational,track,ui]',
      );
    });

    test('should throw if the argument is a valid event type, but not one of the action event types', () => {
      // @ts-ignore Test
      expect(() => validateActionEventType('screen')).toThrow(
        'Invalid action event type: screen, must be one of: [operational,track,ui]',
      );
    });

    test('should throw if the argument is not a valid event type', () => {
      // @ts-ignore Test
      expect(() => validateActionEventType('foo')).toThrow(
        'Invalid action event type: foo, must be one of: [operational,track,ui]',
      );
    });

    test('should not throw if the argument is one of the action event types', () => {
      // @ts-ignore Test
      expect(() => validateActionEventType('ui')).not.toThrow();
    });
  });
});
