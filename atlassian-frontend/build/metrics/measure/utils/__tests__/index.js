const fs = require('fs');
const path = require('path');
const { getEntryPoints, getPackages } = require('./../entrypoints');

describe('Measure tool', () => {
  test('Should throw an error if not receiving an array of paths as input', async () => {
    const testPkg = 'button';
    try {
      await getPackages(testPkg);
    } catch (err) {
      expect(err.message).toContain('is not a function');
    }
  });
  test('Should return the package name when using no flag (getPackages)', async () => {
    const testPkg = 'button';
    const fullPathTotestPkg = path.join(
      process.cwd(),
      `/packages/design-system/${testPkg}`,
    );
    const packageToMeasure = await getPackages([testPkg]);

    expect(packageToMeasure).toStrictEqual([fullPathTotestPkg]);
  });
  test('Should return an array of full path when using no flag (getPackages) with a filename ', async () => {
    const testPkg = 'button';
    const testFilePath = 'packages/design-system/button';
    const fullPathTotestPkg = path.join(
      process.cwd(),
      `/packages/design-system/${testPkg}`,
    );
    const packageToMeasure = await getPackages([testFilePath]);

    expect(packageToMeasure).toStrictEqual([fullPathTotestPkg]);
  });
  test('Should return an array of filenames when using entrypoint flag (getEntryPoints) with a package ', async () => {
    const testPkg = 'button';
    const fullPathTotestSrcPkg = path.join(
      process.cwd(),
      `/packages/design-system/${testPkg}/src`,
    );
    const entryPoints = fs
      .readdirSync(fullPathTotestSrcPkg)
      .filter(file => file.includes('.ts'))
      .map(file =>
        path.join(
          process.cwd(),
          `/packages/design-system/${testPkg}/src/${file}`,
        ),
      );

    const packageToMeasure = await getEntryPoints([testPkg]);

    expect(packageToMeasure).toStrictEqual(entryPoints);
  });
});
