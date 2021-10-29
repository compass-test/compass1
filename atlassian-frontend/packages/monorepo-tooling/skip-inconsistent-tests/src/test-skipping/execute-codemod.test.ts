import * as io from '../io/io';

import executeCodemod from './execute-codemod';

describe('executeCodemodCommand', () => {
  let execSpy: jest.SpyInstance<Promise<any>, any>;
  const expectedFlags = [
    `--comment='Hello (world)'`,
    `--testName='shouldn'\\''t do a thing (unless)'`,
    `--ancestorLabels=''`,
    '--parser ts',
    '--extensions ts,tsx,js,jsx',
    '--transform OptimusPrime',
    'path/to/file.ts',
  ];

  beforeEach(() => {
    // Mock codemod
    execSpy = jest
      .spyOn(io, 'exec')
      .mockImplementation(() => Promise.resolve({ stdout: '', stderr: '' }));
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  it('should escape input strings', async () => {
    await executeCodemod(
      {
        testName: `shouldn't do a thing (unless)`,
        path: 'path/to/file.ts',
        ancestorLabels: '',
        errors: [],
      },
      'Hello (world)',
      'OptimusPrime',
    );
    const cmd = `npx jscodeshift ${expectedFlags.join(' ')}`;
    expect(execSpy).toHaveBeenCalledWith(cmd);

    // With preceding slash on path
    await executeCodemod(
      {
        testName: `shouldn't do a thing (unless)`,
        path: '/path/to/file.ts',
        ancestorLabels: '',
        errors: [],
      },
      'Hello (world)',
      'OptimusPrime',
    );
    const cmd2 = `npx jscodeshift ${expectedFlags.join(' ')}`;
    expect(execSpy).toHaveBeenCalledWith(cmd2);
  });

  it('should return true if file is modified', async () => {
    execSpy.mockRestore();
    const stdout = `All done.
    Results:
    0 errors
    0 unmodified
    2 skipped
    1 ok
    Time elapsed: 00.000 seconds`;
    execSpy = jest
      .spyOn(io, 'exec')
      .mockImplementation(() => Promise.resolve({ stdout, stderr: '' }));

    const result = await executeCodemod(
      {
        testName: `shouldn't do a thing (unless)`,
        path: 'path/to/file.ts',
        ancestorLabels: '',
        errors: [],
      },
      'Hello (world)',
      'OptimusPrime',
    );
    expect(result).toBe(true);
  });

  it(`should return false if file isn't modified`, async () => {
    execSpy.mockRestore();
    const stdout = `All done.
    Results:
    0 errors
    1 unmodified
    1 skipped
    0 ok
    Time elapsed: 00.000 seconds`;
    execSpy = jest
      .spyOn(io, 'exec')
      .mockImplementation(() => Promise.resolve({ stdout, stderr: '' }));

    // Silence warning log for failed to skip scenario
    jest.spyOn(console, 'warn').mockImplementation((_msg: string) => {});

    const result = await executeCodemod(
      {
        testName: `shouldn't do a thing (unless)`,
        path: 'path/to/file.ts',
        ancestorLabels: '',
        errors: [],
      },
      'Hello (world)',
      'OptimusPrime',
    );
    expect(result).toBe(false);
  });
});
