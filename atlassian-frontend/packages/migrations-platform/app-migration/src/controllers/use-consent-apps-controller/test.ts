import { renderHook, RenderHookResult } from '@testing-library/react-hooks';

import useConsentAppsController from './index';

type Return = ReturnType<typeof useConsentAppsController>;

describe('useAppsController()', () => {
  let renderResult: RenderHookResult<void, Return>;

  describe('given all seven statuses are provided', () => {
    it('should count only consent related statuses', () => {
      renderResult = renderHook(() => {
        return useConsentAppsController([
          { status: 'ConsentGiven' },
          { status: 'ConsentNotGiven' },
          { status: 'ConsentOutdated' },
          { status: 'ServerAppOutdated' },
          { status: 'NoMigrationNeeded' },
          { status: 'NoMigratingAlternative' },
          {
            status: 'NoAutomatedMigrationPath',
          },
        ]);
      });
      const { done, total, hasCompleted } = renderResult.result.current;

      expect(done).toBe(1);
      expect(total).toBe(4);
      expect(hasCompleted).toBeFalsy();
    });
  });

  describe('given all statuses are ‘consent givent‘', () => {
    it('should complete the consent process', () => {
      renderResult = renderHook(() => {
        return useConsentAppsController([
          { status: 'ConsentGiven' },
          { status: 'ConsentGiven' },
        ]);
      });
      const { done, total, hasCompleted } = renderResult.result.current;

      expect(done).toBe(2);
      expect(total).toBe(2);
      expect(hasCompleted).toBeTruthy();
    });
  });
});
