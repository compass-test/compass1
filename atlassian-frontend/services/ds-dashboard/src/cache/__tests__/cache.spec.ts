import * as cache from '..';

jest.mock('../fs', () => {
  const mocked = {
    readFile: () => '{}', // serialized empty object
    writeFile: () => {}, // noop
    mkdir: () => {}, // noop
  };

  return mocked;
});

const testKey = '__test';

describe('cache', () => {
  beforeEach(async () => {
    await cache.removeEntry(testKey);
  });

  afterAll(async () => {
    await cache.removeEntry(testKey);
  });

  it('should not error if an entry does not exist', async () => {
    const entry = await cache.getEntry(testKey);
    expect(entry).toBe(undefined);
  });

  it('should allow writing entries', async () => {
    const data = { a: [], b: 3, c: {} };
    await cache.putEntry(testKey, data);
    const entry = await cache.getEntry(testKey);
    expect(entry).toMatchObject(data);
  });

  it('should correctly report missing entries', async () => {
    const hasEntry = await cache.hasEntry(testKey);
    expect(hasEntry).toBe(false);
  });

  it('should correctly report existing entries', async () => {
    const data = 42;
    await cache.putEntry(testKey, data);
    const hasEntry = await cache.hasEntry(testKey);
    expect(hasEntry).toBe(true);
  });

  it('should be able to remove entries', async () => {
    const data = [123];
    await cache.putEntry(testKey, data);
    await cache.removeEntry(testKey);
    const entry = await cache.getEntry(testKey);
    expect(entry).toBe(undefined);
  });
});
