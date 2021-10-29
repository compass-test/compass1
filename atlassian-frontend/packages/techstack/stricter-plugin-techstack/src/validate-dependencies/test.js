const { onProject } = require('.');

jest.mock('@atlassian/techstack-runtime', () => ({
  getTechstackConfig: () => ({
    config: {
      rootPath: '.',
      pathToPackages: 'packages',
    },
    repository: {
      '@def1': {
        'use-case-a': ['solution-a'],
      },
      '@def2': 'all',
    },
  }),
  getTechstackReport: () => ({
    definitions: {
      '@def1': [
        {
          id: 'use-case-a',
          solutions: [
            {
              id: 'solution-a',
              checks: [{ type: 'libraries', configuration: '@pkg1' }],
            },
          ],
        },
      ],
      '@def2': [
        {
          id: 'use-case-b',
          solutions: [
            {
              id: 'solution-b',
              checks: [{ type: 'libraries', configuration: '@pkg2' }],
            },
          ],
        },
      ],
    },
    techstack: {
      all: {
        '@def1': 'all',
      },
    },
  }),
}));

jest.mock('fs', () => ({
  readFileSync: jest
    .fn()
    .mockReturnValueOnce(
      JSON.stringify({
        dependencies: { '@pkg1': '1.9.0', '@pkg2': '2.9.0', '@pkg3': '0.1.0' },
        devDependencies: { '@pkg4': '1.0.0' },
      }),
    )
    .mockReturnValue(
      JSON.stringify({
        dependencies: { '@pkg1': '16.9.0' },
        devDependencies: { '@pkg4': '1.0.0' },
      }),
    ),
}));

describe('techstack library validation rule', () => {
  it('should report errors when package.json has libraries outside the valid set', () => {
    const errors = onProject({
      config: {
        techstackConfigPath: '.',
        rootPackageJsonPath: '.',
        shouldCheckDevDependencies: false,
      },
    });
    expect(errors).toEqual([
      'Dependency/ DevDependency "@pkg3" is not currently part of the techstack. Please think about how it fits into the techstack and spar with the repository management team.',
    ]);
  });
  it('should report no errors when package.json has libraries within the valid set', () => {
    const errors = onProject({
      config: {
        techstackConfigPath: '.',
        rootPackageJsonPath: '.',
        shouldCheckDevDependencies: false,
      },
    });
    expect(errors).toEqual([]);
  });

  it('should report errors on devDependencies when "shouldCheckDevDependencies" is set to true and a devDependency is invalid', () => {
    const errors = onProject({
      config: {
        techstackConfigPath: '.',
        rootPackageJsonPath: '.',
        shouldCheckDevDependencies: true,
      },
    });
    expect(errors).toEqual([
      'Dependency/ DevDependency "@pkg4" is not currently part of the techstack. Please think about how it fits into the techstack and spar with the repository management team.',
    ]);
  });

  it('should show custom message when message override function is passed', () => {
    const errors = onProject({
      config: {
        techstackConfigPath: '.',
        rootPackageJsonPath: '.',
        shouldCheckDevDependencies: true,
        messageOverrideFunction: lib =>
          `Dependency/ DevDependency "${lib}" is not currently part of the techstack. Please think about how it fits into the techstack and spar with the repository management or the platform team.`,
      },
    });
    expect(errors).toEqual([
      'Dependency/ DevDependency "@pkg4" is not currently part of the techstack. Please think about how it fits into the techstack and spar with the repository management or the platform team.',
    ]);
  });
});
