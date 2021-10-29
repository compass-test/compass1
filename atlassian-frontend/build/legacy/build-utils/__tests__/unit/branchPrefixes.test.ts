import { containsBranchPrefix } from './../../branchPrefixes';

const noChangeset = ['no-changeset/'];
const skipProduct = ['skip-product/'];

describe('validateBranchPrefixes >', () => {
  describe('no-changeset', () => {
    test('should return true if branch contains `no-changeset/`', async () => {
      expect(
        containsBranchPrefix(
          'no-changeset/skip-product/my-branch',
          noChangeset,
        ),
      ).toBe(true);
      expect(
        containsBranchPrefix(
          'skip-product/no-changeset/my-branch',
          noChangeset,
        ),
      ).toBe(true);
      expect(
        containsBranchPrefix(
          'skip-product/hello/no-changeset/my-branch',
          noChangeset,
        ),
      ).toBe(true);
    });
    test('should return false if a branch does not contain `no-changeset/`', async () => {
      expect(
        containsBranchPrefix(
          'skip-product-hello-no-changeset/my-branch',
          noChangeset,
        ),
      ).toBe(false);
    });
  });

  describe('skip-product', () => {
    test('should return true if branch contains `skip-product/`', async () => {
      expect(
        containsBranchPrefix(
          'no-changeset/skip-product/my-branch',
          skipProduct,
        ),
      ).toBe(true);
      expect(
        containsBranchPrefix(
          'skip-product/no-changeset/my-branch',
          skipProduct,
        ),
      ).toBe(true);
      expect(
        containsBranchPrefix(
          'skip-product/hello/no-changeset/my-branch',
          skipProduct,
        ),
      ).toBe(true);
    });
    test('should return false if a branch does not contain `skip-product/`', async () => {
      expect(
        containsBranchPrefix(
          'skip-product-hello-no-changeset/my-branch',
          skipProduct,
        ),
      ).toBe(false);
    });
  });
});
