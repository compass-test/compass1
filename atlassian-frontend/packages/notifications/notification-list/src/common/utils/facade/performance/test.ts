import PerformanceFacade from './index';

describe('Performance Facade', () => {
  describe('when constructed with undefined', () => {
    let performance: PerformanceFacade;

    beforeAll(() => {
      performance = new PerformanceFacade(undefined);
    });

    test('isAvailable should return false when window.performance does not exist', () => {
      expect(performance.isAvailable).toBe(false);
    });

    test('getEntriesByName() should return empty array if performance doesnt exist', () => {
      expect(performance.getEntriesByName('mark').length).toBe(0);
    });
  });

  describe('when constructed with a performance object', () => {
    let performance: PerformanceFacade;
    const mockPerformance = {
      now() {
        return 1;
      },
      getEntriesByName(name: string) {
        return [1];
      },
    };

    beforeAll(() => {
      performance = new PerformanceFacade(mockPerformance as any);
    });

    test('.isAvailable should return true', () => {
      expect(performance.isAvailable).toBe(true);
    });

    test('now() should return a value', () => {
      expect(performance.now()).toBe(1);
    });

    test('getEntriesByName() should return empty array', () => {
      expect(performance.getEntriesByName('mark').length).toBe(1);
    });
  });
});
