const packagesConfig = require('./index');

describe('Packages config', () => {
  it('should specify the tangerine plugin', () => {
    expect(packagesConfig.config.plugins).toEqual(['tangerine']);
  });
  it('should configure the import/no-parent-imports rule', () => {
    expect(packagesConfig.config.rules).toHaveProperty(
      'tangerine/import/no-parent-imports',
    );
    const rule =
      packagesConfig.config.rules['tangerine/import/no-parent-imports'];
    expect(rule[0]).toBe('error');
    expect(rule).toMatchSnapshot();
  });

  it('should configure the import/no-restricted-paths rule', () => {
    expect(packagesConfig.config.rules).toHaveProperty(
      'tangerine/import/no-restricted-paths',
    );

    const rule =
      packagesConfig.config.rules['tangerine/import/no-restricted-paths'];
    expect(rule[0]).toBe('error');
    expect(rule).toMatchSnapshot();
  });

  it('should configure the import/no-nested-imports rule', () => {
    expect(packagesConfig.config.rules).toHaveProperty(
      'tangerine/import/no-nested-imports',
    );

    const rule =
      packagesConfig.config.rules['tangerine/import/no-nested-imports'];
    expect(rule[0]).toBe('error');
    expect(rule).toMatchSnapshot();
  });
});
