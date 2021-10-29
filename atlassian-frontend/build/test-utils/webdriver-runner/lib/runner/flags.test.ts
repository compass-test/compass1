import { getDefaultFlags } from './flags';

describe('getDefaultFlags', () => {
  it('should return default flags', () => {
    const flags = getDefaultFlags();
    expect(flags).toMatchObject(
      expect.objectContaining({
        retry: 1,
        testDir: expect.any(String),
        gracefulExit: false,
        return: false,
        port: 9000,
        host: '0.0.0.0',
        changed: expect.any(String),
        testEnv: expect.any(String),
        watch: false,
      }),
    );
  });
});
