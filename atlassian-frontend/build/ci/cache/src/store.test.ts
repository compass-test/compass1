import fs, { promises as fsp } from 'fs';
import os from 'os';
import path from 'path';

import rimraf from 'rimraf';

import { Logger } from './logger';
import { Store, RemoteStore } from './store';
import { copyDir } from './util';

jest.mock('./util', () => {
  const actualModule = jest.requireActual('./util');
  return {
    ...actualModule,
    copyDir: jest.fn(actualModule.copyDir),
  };
});

const fixtureDir = path.join(__dirname, '..', '__fixtures__', 'project');

async function addMockDist(dir: string) {
  const distDir = path.join(dir, 'dist');
  await fsp.mkdir(distDir, { recursive: true });
  await Promise.all(
    ['item1.js', 'item2.js'].map(async f =>
      fsp.writeFile(path.join(distDir, f), `// ${f}`),
    ),
  );
}

async function addMockCacheItem(dir: string, writeCommitFile: boolean) {
  await addMockDist(path.join(dir, 'output'));

  await fsp.writeFile(
    path.join(dir, `metadata`),
    '{"version": "2.0.0", "branch": "test-branch", "pipeline": "test-pipeline"}',
  );

  if (writeCommitFile) {
    await fsp.writeFile(path.join(dir, `commit`), 'true');
  }
}

async function addMockLegacyCacheItem(
  cacheDir: string,
  hash: string,
  writeCommitFile: boolean,
) {
  await addMockDist(path.join(cacheDir, hash));

  if (writeCommitFile) {
    await fsp.writeFile(path.join(cacheDir, hash + `.commit`), 'true');
  }
}

const tmpDirs: string[] = [];

async function createTmpDir(prefix: string) {
  const dir = await fsp.mkdtemp(path.join(os.tmpdir(), prefix));
  tmpDirs.push(dir);
  return dir;
}

async function copyFixtureIntoTempDir(fixtureDir: string) {
  const tmpDir = await createTmpDir('af-fixture');
  await copyDir(fixtureDir, tmpDir);

  tmpDirs.push(tmpDir);

  return tmpDir;
}

function createRemoteMockStore(
  writeCommitFile: boolean,
): RemoteStore & { putContents: string[][] } {
  let dirContents: string[][] = [];
  return {
    fetch: jest.fn(async (hash, cacheDir) => {
      await addMockCacheItem(path.join(cacheDir, hash), writeCommitFile);
      return true;
    }),
    put: jest.fn(async (hash, cacheDir) => {
      dirContents.push(
        await fsp.readdir(path.join(cacheDir, hash, 'output', 'dist')),
      );
      return true;
    }),
    putContents: dirContents,
  };
}

afterAll(() => {
  for (const dir of tmpDirs) {
    rimraf.sync(dir);
  }
});

describe('Store', () => {
  let logger: Logger;
  let cacheDirectory: string;
  let tmpFixturePath: string;
  beforeEach(async () => {
    // Change logLevel here to debug tests
    logger = new Logger('off');
    cacheDirectory = await createTmpDir('af-build-cache-test');
    tmpFixturePath = await copyFixtureIntoTempDir(fixtureDir);
    jest.clearAllMocks();
  });
  describe('fetch', () => {
    it('should restore contents from local cache directory if it exists', async () => {
      const store = new Store(logger, cacheDirectory);
      const packageDir = path.join(tmpFixturePath, 'packages', 'foo');
      const hash = 'abcdef123';

      await addMockCacheItem(path.join(cacheDirectory, hash), true);
      await expect(
        fsp.readdir(path.join(packageDir, 'dist')),
      ).rejects.toThrow();

      const res = await store.fetch(packageDir, hash);
      expect(res).toEqual(
        expect.objectContaining({
          version: '2.0.0',
          branch: 'test-branch',
          pipeline: 'test-pipeline',
        }),
      );
      const afterFetch = await fsp.readdir(path.join(packageDir, 'dist'));
      expect(afterFetch).toEqual(['item1.js', 'item2.js']);
    });
    it('should not restore contents from local cache dir if no cache exists', async () => {
      const store = new Store(logger, cacheDirectory);
      const packageDir = path.join(tmpFixturePath, 'packages', 'foo');
      const hash = 'abcdef123';

      await expect(
        fsp.readdir(path.join(packageDir, 'dist')),
      ).rejects.toThrow();

      const res = await store.fetch(packageDir, hash);
      expect(res).toBe(null);
      await expect(
        fsp.readdir(path.join(packageDir, 'dist')),
      ).rejects.toThrow();
    });
    it('should not restore contents from local cache dir if cache exists but no commit file exists', async () => {
      const store = new Store(logger, cacheDirectory);
      const packageDir = path.join(tmpFixturePath, 'packages', 'foo');
      const hash = 'abcdef123';

      await addMockCacheItem(path.join(cacheDirectory, hash), false);
      await expect(
        fsp.readdir(path.join(packageDir, 'dist')),
      ).rejects.toThrow();

      const res = await store.fetch(packageDir, hash);
      expect(res).toBe(null);
      await expect(
        fsp.readdir(path.join(packageDir, 'dist')),
      ).rejects.toThrow();
    });
    it('should restore contents from remote store if provided and no cache exists locally', async () => {
      const mockRemoteStore = createRemoteMockStore(true);
      const store = new Store(logger, cacheDirectory, mockRemoteStore);

      const packageDir = path.join(tmpFixturePath, 'packages', 'foo');
      const hash = 'abcdef123';

      await expect(
        fsp.readdir(path.join(packageDir, 'dist')),
      ).rejects.toThrow();

      const res = await store.fetch(packageDir, hash);
      expect(res).toEqual(
        expect.objectContaining({
          version: '2.0.0',
          branch: 'test-branch',
          pipeline: 'test-pipeline',
        }),
      );
      expect(mockRemoteStore.fetch).toHaveBeenCalled();
      const afterFetch = await fsp.readdir(path.join(packageDir, 'dist'));
      expect(afterFetch).toEqual(['item1.js', 'item2.js']);
    });
    it('should not restore contents from remote store if no commit file is written', async () => {
      const mockRemoteStore = createRemoteMockStore(false);
      const store = new Store(logger, cacheDirectory, mockRemoteStore);

      const packageDir = path.join(tmpFixturePath, 'packages', 'foo');
      const hash = 'abcdef123';

      await expect(
        fsp.readdir(path.join(packageDir, 'dist')),
      ).rejects.toThrow();

      const res = await store.fetch(packageDir, hash);
      expect(res).toBe(null);
      await expect(
        fsp.readdir(path.join(packageDir, 'dist')),
      ).rejects.toThrow();
    });
    it('should not restore contents from remote store if cache already exists locally', async () => {
      const mockRemoteStore = createRemoteMockStore(true);
      const store = new Store(logger, cacheDirectory, mockRemoteStore);

      const packageDir = path.join(tmpFixturePath, 'packages', 'foo');
      const hash = 'abcdef123';

      await addMockCacheItem(path.join(cacheDirectory, hash), true);
      await expect(
        fsp.readdir(path.join(packageDir, 'dist')),
      ).rejects.toThrow();

      const res = await store.fetch(packageDir, hash);
      expect(res).toEqual(
        expect.objectContaining({
          version: '2.0.0',
          branch: 'test-branch',
          pipeline: 'test-pipeline',
        }),
      );
      const afterFetch = await fsp.readdir(path.join(packageDir, 'dist'));
      expect(afterFetch).toEqual(['item1.js', 'item2.js']);
      expect(mockRemoteStore.fetch).not.toHaveBeenCalled();
    });
    it('should not restore contents from remote store if no cache exists locally or remotely', async () => {
      const mockRemoteStore = {
        fetch: jest.fn(async () => {
          return false;
        }),
        put: jest.fn(async () => {
          return false;
        }),
      };
      const store = new Store(logger, cacheDirectory, mockRemoteStore);

      const packageDir = path.join(tmpFixturePath, 'packages', 'foo');
      const hash = 'abcdef123';

      await expect(
        fsp.readdir(path.join(packageDir, 'dist')),
      ).rejects.toThrow();

      const res = await store.fetch(packageDir, hash);
      expect(res).toBe(null);
      expect(mockRemoteStore.fetch).toHaveBeenCalled();
      await expect(
        fsp.readdir(path.join(packageDir, 'dist')),
      ).rejects.toThrow();
    });
    it('should be backwards compatible', async () => {
      const store = new Store(logger, cacheDirectory);
      const packageDir = path.join(tmpFixturePath, 'packages', 'foo');
      const hash = 'abcdef123';

      await addMockLegacyCacheItem(cacheDirectory, hash, true);
      await expect(
        fsp.readdir(path.join(packageDir, 'dist')),
      ).rejects.toThrow();

      const res = await store.fetch(packageDir, hash);
      expect(res).toEqual(expect.objectContaining({}));
      const afterFetch = await fsp.readdir(path.join(packageDir, 'dist'));
      expect(afterFetch).toEqual(['item1.js', 'item2.js']);
    });
  });
  describe('put', () => {
    it('should store cache locally', async () => {
      const store = new Store(logger, cacheDirectory);
      const packageDir = path.join(tmpFixturePath, 'packages', 'foo');
      const hash = 'abcdef123';
      const packageCacheDir = path.join(cacheDirectory, hash);

      await addMockDist(packageDir);
      await expect(fsp.readdir(path.join(packageCacheDir))).rejects.toThrow();

      const res = await store.put(packageDir, hash, ['dist/**']);
      expect(res).toBe(true);
      const afterPut = await fsp.readdir(
        path.join(packageCacheDir, 'output', 'dist'),
      );
      expect(afterPut).toEqual(['item1.js', 'item2.js']);
      expect(
        fs.existsSync(path.join(cacheDirectory, `${hash}`, `commit`)),
      ).toBe(true);
      expect(
        fs.existsSync(path.join(cacheDirectory, `${hash}`, `metadata`)),
      ).toBe(true);
    });
    it('should store cache for multiple output globs', async () => {
      const store = new Store(logger, cacheDirectory);
      const packageDir = path.join(tmpFixturePath, 'packages', 'foo');
      const hash = 'abcdef123';
      const packageOutputCacheDir = path.join(cacheDirectory, hash, `output`);

      await addMockDist(packageDir);
      await expect(
        fsp.readdir(path.join(packageOutputCacheDir)),
      ).rejects.toThrow();

      const res = await store.put(packageDir, hash, [
        'dist/**',
        'package.json',
      ]);
      expect(res).toBe(true);
      const afterPut = await fsp.readdir(packageOutputCacheDir);
      expect(afterPut).toEqual(['dist', 'package.json']);
    });
    it('should only cache files that match specified output globs', async () => {
      const store = new Store(logger, cacheDirectory);
      const packageDir = path.join(tmpFixturePath, 'packages', 'foo');
      const hash = 'abcdef123';
      const packageOutputCacheDir = path.join(cacheDirectory, hash, `output`);

      await addMockDist(packageDir);
      await expect(
        fsp.readdir(path.join(packageOutputCacheDir)),
      ).rejects.toThrow();

      const res = await store.put(packageDir, hash, ['dist/**/item1.js']);
      expect(res).toBe(true);
      const afterPut = await fsp.readdir(
        path.join(packageOutputCacheDir, 'dist'),
      );
      expect(afterPut).toEqual(['item1.js']);
    });
    it('should store cache remotely when remote store provided', async () => {
      const mockRemoteStore = createRemoteMockStore(true);
      const store = new Store(logger, cacheDirectory, mockRemoteStore);
      const packageDir = path.join(tmpFixturePath, 'packages', 'foo');
      const hash = 'abcdef123';
      const packageCacheDir = path.join(cacheDirectory, hash);

      await addMockDist(packageDir);
      await expect(fsp.readdir(path.join(packageCacheDir))).rejects.toThrow();
      const res = await store.put(packageDir, hash, ['dist/**']);
      expect(res).toBe(true);
      expect(mockRemoteStore.put).toHaveBeenCalled();
      expect(mockRemoteStore.putContents[0]).toEqual(['item1.js', 'item2.js']);
    });
    it('should not store cache remotely if local storage failed', async () => {
      const mockRemoteStore = createRemoteMockStore(true);
      const store = new Store(logger, cacheDirectory, mockRemoteStore);
      const packageDir = path.join(tmpFixturePath, 'packages', 'foo');
      const hash = 'abcdef123';
      const packageCacheDir = path.join(cacheDirectory, hash);

      await addMockDist(packageDir);
      await expect(fsp.readdir(path.join(packageCacheDir))).rejects.toThrow();

      (copyDir as jest.Mock).mockImplementationOnce(() => {
        throw new Error();
      });
      const res = await store.put(packageDir, hash, ['dist/**']);
      expect(res).toBe(false);
      expect(mockRemoteStore.put).not.toHaveBeenCalled();
    });
    it('should not write local commit file if local storage failed', async () => {
      const mockRemoteStore = createRemoteMockStore(true);
      const store = new Store(logger, cacheDirectory, mockRemoteStore);
      const packageDir = path.join(tmpFixturePath, 'packages', 'foo');
      const hash = 'abcdef123';
      const packageCacheDir = path.join(cacheDirectory, hash);

      await addMockDist(packageDir);
      await expect(fsp.readdir(path.join(packageCacheDir))).rejects.toThrow();

      (copyDir as jest.Mock).mockImplementationOnce(() => {
        throw new Error();
      });
      const res = await store.put(packageDir, hash, ['dist/**']);
      expect(res).toBe(false);
      expect(fs.existsSync(path.join(cacheDirectory, `${hash}.commit`))).toBe(
        false,
      );
    });
    it('should not throw if no output to store', async () => {
      const store = new Store(logger, cacheDirectory);
      const packageDir = path.join(tmpFixturePath, 'packages', 'foo');
      const hash = 'abcdef123';
      const packageOutputCacheDir = path.join(cacheDirectory, hash, 'output');

      await expect(
        fsp.readdir(path.join(packageOutputCacheDir)),
      ).rejects.toThrow();

      const res = await store.put(packageDir, hash, ['dist/**']);
      expect(res).toBe(true);
      await expect(
        fsp.readdir(path.join(packageOutputCacheDir)),
      ).resolves.toEqual([]);
    });
  });
});
