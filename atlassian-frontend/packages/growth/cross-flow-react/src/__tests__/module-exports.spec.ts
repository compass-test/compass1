import { CrossFlowIntegration } from '../lib/CrossFlowIntegration';

describe('Module exports', () => {
  it('should have a default export', async () => {
    const srcExports = await import('../index');
    expect(srcExports).toHaveProperty('default', CrossFlowIntegration);
  });

  it('root level re-exports should match ./src/index.ts exports', async () => {
    const srcExports = await import('../index');
    const rootExports = await import('./../index');

    expect(rootExports).toEqual(srcExports);
  });
});
