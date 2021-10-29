import { getBranchName } from './branch';

describe('branch', () => {
  it('should return branch name for package with scope prefix', () => {
    const name = getBranchName('@atlaskit/foo-bar');
    expect(name).toEqual(`auto-skipped-tests/2017-08-16/foo-bar_T000000`);
  });
  it('should return branch name for package without scope prefix', () => {
    const name = getBranchName('foo-bar');
    expect(name).toEqual(`auto-skipped-tests/2017-08-16/foo-bar_T000000`);
  });
});
