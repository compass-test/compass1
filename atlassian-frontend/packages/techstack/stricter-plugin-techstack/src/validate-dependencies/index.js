const fs = require('fs');
const path = require('path');

const {
  getTechstackReport,
  getTechstackConfig,
} = require('@atlassian/techstack-runtime');

const {
  getAllowedLibrariesRegexList,
  findMatchInRegexList,
} = require('./utils');

module.exports = {
  onProject: ({ config }) => {
    const {
      techstackConfigPath,
      rootPackageJsonPath,
      exclude: EXCLUDED_LIBRARIES = [],
      shouldCheckDevDependencies = false,
      messageOverrideFunction,
    } = config;

    if (!techstackConfigPath || !rootPackageJsonPath) {
      throw new Error(
        'Invalid configuration in the "Validate Dependencies" stricter rule',
      );
    }

    const errors = [];

    // get techstack details from the techstack configuration file
    const techstackRc = getTechstackConfig({
      rootPath: techstackConfigPath,
    });

    const {
      config: techstackConfig,
      repository: repositoryTechstack,
    } = techstackRc;

    // get techstack usecases and solutions from the techstack report
    const report = getTechstackReport(techstackConfig);

    // fetch allowed libraries from techstack usecases and solutions
    const allowedLibrariesRegExpList = getAllowedLibrariesRegexList(
      report.definitions,
      repositoryTechstack,
    );

    // get dependencies and devDependencies from package.json
    const { dependencies = {}, devDependencies = {} } = JSON.parse(
      fs.readFileSync(
        path.resolve(rootPackageJsonPath, 'package.json'),
        'utf8',
      ),
    );

    const devDependenciesToCheck = shouldCheckDevDependencies
      ? devDependencies
      : {};

    const dependenciesToCheck = [
      ...Object.keys(dependencies),
      ...Object.keys(devDependenciesToCheck),
    ].filter(lib => !findMatchInRegexList(EXCLUDED_LIBRARIES, lib));

    dependenciesToCheck.forEach(lib => {
      if (!findMatchInRegexList(allowedLibrariesRegExpList, lib)) {
        if (messageOverrideFunction) {
          errors.push(messageOverrideFunction(lib));
        } else {
          errors.push(
            `Dependency/ DevDependency "${lib}" is not currently part of the techstack. Please think about how it fits into the techstack and spar with the repository management team.`,
          );
        }
      }
    });

    return errors;
  },
};
