import { renderHook } from '@testing-library/react-hooks';

import { useFlags } from './index';

describe('flag-service', () => {
  describe('useFlags', () => {
    it('should expose show and dismiss flag functions', async () => {
      const { result } = renderHook(() => useFlags());

      expect(result.current).toEqual({
        showFlag: expect.any(Function),
      });
    });
  });
});
