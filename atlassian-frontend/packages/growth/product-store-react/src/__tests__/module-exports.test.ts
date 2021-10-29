import { ProductStoreIntegration } from '../lib/ProductStoreIntegration';

describe('Module exports', () => {
  it('should have a default export', async () => {
    const srcExports = await import('../index');
    expect(srcExports).toHaveProperty('default', ProductStoreIntegration);
  });
});
