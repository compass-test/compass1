import fs, { Stats, Dirent } from 'fs';
import path from 'path';
import { showHelp } from 'yargs';

import program from '../main';

jest.mock('yargs');

import { ArgsvParse } from '../types';

let exitSpy: jest.SpyInstance = jest.fn();

describe('main', () => {
  beforeEach(() => {
    exitSpy = jest
      .spyOn(process, 'exit')
      // @ts-ignore
      .mockImplementation((code?: number | undefined): void => {
        code;
      });
  });

  afterEach(() => {
    jest.restoreAllMocks();
    jest.resetModules();
  });

  it('parses args for config file - invalid', () => {
    const getConfigFileSpy = jest
      .spyOn(program, 'getConfigFile')
      .mockImplementation(() => ({
        targetImports: '',
        filesDirectory: '',
        customLogger: '',
        ignoreDirs: '',
      }));
    const checkRequiredArgsSpy = jest.spyOn(program, 'checkRequiredArgs');
    const consoleLogSpy = jest.spyOn(console, 'log');
    jest.spyOn(program, 'walkSync').mockImplementation(() => []);

    const options: ArgsvParse = {
      c: 'mock/path/to/config.file',
    };
    program.main(options);

    expect(getConfigFileSpy).toBeCalledWith('mock/path/to/config.file');
    expect(checkRequiredArgsSpy).toBeCalledWith('', '');
    expect(showHelp).toBeCalled();
    expect(consoleLogSpy).toBeCalledWith(
      '\n!!! You must supply both a path to a directory to scan and the target packages to track !!!\n',
    );
    expect(exitSpy).toBeCalledWith(1);
  });

  it('parses args for config file - valid', () => {
    const getConfigFileSpy = jest
      .spyOn(program, 'getConfigFile')
      .mockReturnValue({
        targetImports: '@atlaskit/blah',
        filesDirectory: '/path/to/project',
        customLogger: '',
        ignoreDirs: '(__tests__)',
      });
    const checkRequiredArgsSpy = jest.spyOn(program, 'checkRequiredArgs');
    const parseAndTransformSpy = jest.spyOn(program, 'parseAndTransform');
    jest.spyOn(program, 'transformAndLogDetails').mockImplementation(() => {});
    jest
      .spyOn(program, 'walkSync')
      .mockImplementation(() => ['file/to/parse.js']);

    const options: ArgsvParse = {
      c: 'mock/path/to/config.file',
    };
    program.main(options);

    expect(getConfigFileSpy).toBeCalledWith('mock/path/to/config.file');
    expect(checkRequiredArgsSpy).toBeCalledWith(
      '/path/to/project',
      '@atlaskit/blah',
    );
    expect(parseAndTransformSpy).toBeCalledWith(
      '/path/to/project',
      '@atlaskit/blah',
      '',
      '(__tests__)',
    );
    expect(exitSpy).toBeCalledTimes(0);
  });

  it('parses args for cli', () => {
    const getConfigFileSpy = jest.spyOn(program, 'getConfigFile');
    const checkRequiredArgsSpy = jest.spyOn(program, 'checkRequiredArgs');
    const parseAndTransformSpy = jest.spyOn(program, 'parseAndTransform');
    jest.spyOn(program, 'transformAndLogDetails').mockImplementation(() => {});
    jest
      .spyOn(program, 'walkSync')
      .mockImplementation(() => ['file/to/parse.js']);

    const options: ArgsvParse = {
      t: '@atlaskit/blah',
      d: '/path/to/project',
      l: '',
      i: '(__tests__)',
    };
    program.main(options);

    expect(getConfigFileSpy).toBeCalledTimes(0);
    expect(checkRequiredArgsSpy).toBeCalledWith(
      '/path/to/project',
      '@atlaskit/blah',
    );
    expect(parseAndTransformSpy).toBeCalledWith(
      '/path/to/project',
      '@atlaskit/blah',
      '',
      '(__tests__)',
    );
    expect(exitSpy).toBeCalledTimes(0);
  });

  it('walkSync returns array of filenames', () => {
    const readdirSyncSpy = jest
      .spyOn(fs, 'readdirSync')
      .mockImplementation(() => (['test.js'] as unknown) as Dirent[]);
    const statSyncSpy = jest
      .spyOn(fs, 'statSync')
      .mockImplementation(() => ({ isDirectory: () => false } as Stats));
    const readFileSyncSpy = jest
      .spyOn(fs, 'readFileSync')
      .mockImplementation(() => 'file content');
    const extnameSpy = jest.spyOn(path, 'extname');

    const { walkSync } = program;
    const result = walkSync('/path/to/project', '', '', []);

    expect(readdirSyncSpy).toBeCalledWith('/path/to/project/');
    expect(statSyncSpy).toBeCalledWith('/path/to/project/test.js');
    expect(readFileSyncSpy).toBeCalledWith('/path/to/project/test.js', 'utf8');
    expect(extnameSpy).toBeCalledWith('test.js');
    expect(result).toStrictEqual(['/path/to/project/test.js']);
  });

  it('walkSync returns empty array when `node_modules` matches file path', () => {
    const readdirSyncSpy = jest
      .spyOn(fs, 'readdirSync')
      .mockImplementation(() => (['node_modules'] as unknown) as Dirent[]);
    const statSyncSpy = jest
      .spyOn(fs, 'statSync')
      .mockImplementation(() => ({ isDirectory: () => true } as Stats));
    const readFileSyncSpy = jest
      .spyOn(fs, 'readFileSync')
      .mockImplementation(() => 'file content');
    const extnameSpy = jest.spyOn(path, 'extname');

    const { walkSync } = program;
    const result = walkSync('/path/to/project', '', '', []);

    expect(readdirSyncSpy).toBeCalledWith('/path/to/project/');
    expect(readFileSyncSpy).toBeCalledTimes(0);
    expect(statSyncSpy).toBeCalledTimes(0);
    expect(extnameSpy).toBeCalledTimes(0);
    expect(result).toStrictEqual([]);
  });

  it('walkSync returns empty array when `ignoreDirs` matches file path', () => {
    const readdirSyncSpy = jest
      .spyOn(fs, 'readdirSync')
      .mockImplementation(() => (['__tests__'] as unknown) as Dirent[]);
    const statSyncSpy = jest
      .spyOn(fs, 'statSync')
      .mockImplementation(() => ({ isDirectory: () => true } as Stats));
    const readFileSyncSpy = jest
      .spyOn(fs, 'readFileSync')
      .mockImplementation(() => 'file content');
    const extnameSpy = jest.spyOn(path, 'extname');

    const { walkSync } = program;
    const result = walkSync('/path/to/project', '', '(__tests__)', []);

    expect(readdirSyncSpy).toBeCalledWith('/path/to/project/');
    expect(readFileSyncSpy).toBeCalledTimes(0);
    expect(statSyncSpy).toBeCalledTimes(0);
    expect(extnameSpy).toBeCalledTimes(0);
    expect(result).toStrictEqual([]);
  });
});
