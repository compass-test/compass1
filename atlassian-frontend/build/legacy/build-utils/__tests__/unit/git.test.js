const fs = require('fs');
const os = require('os');
const path = require('path');

const {
  branch,
  checkout,
  commit,
  getBaseBranch,
  merge,
  isBranchSpecial,
  getTargetBranch,
} = require('./../../git');
const {
  cleanUp,
  createTmpRemoteRepository,
  createTmpLocalRepository,
} = require('./_utils.git');

let tmpRemotePath = '';
let tmpLocalPath = '';

beforeAll(async () => {
  tmpRemotePath = fs.mkdtempSync(path.join(os.tmpdir(), 'git-origin-'));
  await createTmpRemoteRepository({ cwd: tmpRemotePath });
});

beforeEach(async () => {
  tmpLocalPath = fs.mkdtempSync(path.join(os.tmpdir(), 'git-local-'));
  await createTmpLocalRepository(tmpRemotePath, { cwd: tmpLocalPath });
});

afterEach(async () => {
  cleanUp(tmpLocalPath);
});

afterAll(() => {
  cleanUp(tmpRemotePath);
});

describe('getBaseBranch >', () => {
  test('Master should return master as a parent', async () => {
    const parent = await getBaseBranch('HEAD', { cwd: tmpLocalPath });
    expect(parent).toBe('master');
  });

  test('Develop should return master as a parent', async () => {
    const parent = await getBaseBranch('develop', { cwd: tmpLocalPath });
    expect(parent).toBe('master');
  });

  test('Origin/develop should return master as a parent', async () => {
    const parent = await getBaseBranch('origin/develop', { cwd: tmpLocalPath });
    expect(parent).toBe('master');
  });

  test('A branch tipped off develop should return develop as a parent', async () => {
    await checkout('develop', { cwd: tmpLocalPath });
    await branch('from-develop', { cwd: tmpLocalPath });
    await commit('Initial commit for develop temp origin', {
      cwd: tmpLocalPath,
    });
    const parent = await getBaseBranch('HEAD', { cwd: tmpLocalPath });
    expect(parent).toBe('develop');
  });

  test('A branch tipped off master should return master as a parent', async () => {
    await checkout('master', { cwd: tmpLocalPath });
    await branch('from-master', { cwd: tmpLocalPath });
    await commit('Initial commit for from-master temp origin', {
      cwd: tmpLocalPath,
    });
    const parent = await getBaseBranch('HEAD', { cwd: tmpLocalPath });
    expect(parent).toBe('master');
  });

  test('A branch tipped off develop and you merge master in should return develop as a parent', async () => {
    await checkout('develop', { cwd: tmpLocalPath });
    await branch('from-develop', { cwd: tmpLocalPath });
    await commit('Initial commit for develop temp origin', {
      cwd: tmpLocalPath,
    });
    await merge('master', { cwd: tmpLocalPath });
    const parent = await getBaseBranch('HEAD', { cwd: tmpLocalPath });
    expect(parent).toBe('develop');
  });

  test('Head of feature branch identified as not-special branch', async () => {
    const ref = 'from-develop';
    await checkout('develop', { cwd: tmpLocalPath });
    await branch(ref, { cwd: tmpLocalPath });
    const isSpecial = await isBranchSpecial(ref);
    expect(isSpecial).toBe(false);
  });

  test('Develop identified as special branch', async () => {
    const ref = 'develop';
    const isSpecial = await isBranchSpecial(ref);
    expect(isSpecial).toBe(true);
  });

  test('Master branch identified as special branch', async () => {
    const ref = 'master';
    const isSpecial = await isBranchSpecial(ref);
    expect(isSpecial).toBe(true);
  });

  test('Target branch of master is master', async () => {
    const ref = 'master';
    const target = await getTargetBranch(ref);
    expect(target).toBe('master');
  });

  test('Target branch of develop is master', async () => {
    const ref = 'develop';
    const target = await getTargetBranch(ref);
    expect(target).toBe('master');
  });

  test('Target branch of feature from develop is develop', async () => {
    await checkout('develop', { cwd: tmpLocalPath });
    await commit('Initial commit for develop temp origin', {
      cwd: tmpLocalPath,
    });
    await branch('from-develop', { cwd: tmpLocalPath });
    await commit('Another commit on feature branch', {
      cwd: tmpLocalPath,
    });
    const target = await getTargetBranch(
      'from-develop',
      { cwd: tmpLocalPath },
      true,
    );
    expect(target).toBe('develop');
  });

  test('Target branch of feature from master is master', async () => {
    await checkout('develop', { cwd: tmpLocalPath });
    await commit('Initial commit for develop temp origin', {
      cwd: tmpLocalPath,
    });
    await checkout('master', { cwd: tmpLocalPath });
    await branch('from-master', { cwd: tmpLocalPath });
    await commit('Initial commit for master temp origin', {
      cwd: tmpLocalPath,
    });
    const target = await getTargetBranch(
      'from-master',
      { cwd: tmpLocalPath },
      true,
    );
    expect(target).toBe('master');
  });
});
