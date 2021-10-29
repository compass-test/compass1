import './bolt.mock';
import { getAllPackages, isDeprecated, isPrivate } from '../package';

describe('package utils', () => {
  describe('getAllPackages', () => {
    it('should only return packages owned by DST', async () => {
      const packages = await getAllPackages();
      const isOnlyDST = packages.every(
        (pkg) => pkg?.atlassian?.team === 'Design System Team',
      );
      expect(isOnlyDST).toBe(true);
    });

    it('should include packages outside of /packages/design-system', async () => {
      const packages = await getAllPackages();
      const hasCSSReset = packages.some(
        (pkg) => pkg.name === '@atlaskit/css-reset',
      );
      expect(hasCSSReset).toBe(true);
    });

    it('should include services', async () => {
      const packages = await getAllPackages();
      const hasDashboard = packages.some(
        (pkg) => pkg.name === '@atlassian/ds-dashboard',
      );
      expect(hasDashboard).toBe(true);
    });

    it('should include private packages by default', async () => {
      const packages = await getAllPackages();
      const hasPrivate = packages.some(isPrivate);
      expect(hasPrivate).toBe(true);
    });

    it('should exclude private packages if requested', async () => {
      const packages = await getAllPackages({ shouldHidePrivate: true });
      const hasPrivate = packages.some(isPrivate);
      expect(hasPrivate).toBe(false);
    });

    it('should include deprecated packages by default', async () => {
      const packages = await getAllPackages();
      const hasDeprecated = packages.some(isDeprecated);
      expect(hasDeprecated).toBe(true);
    });

    it('should exclude deprecated packages if requested', async () => {
      const packages = await getAllPackages({ shouldHideDeprecated: true });
      const hasDeprecated = packages.some(isDeprecated);
      expect(hasDeprecated).toBe(false);
    });
  });
});
