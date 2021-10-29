const chalk = require('chalk');

const {
  getAllPackagesInProject,
  getTechStackFromPackage,
  getTechStackDefinition,
  getTechstackConfig,
} = require('./utils');

const formatTechStackDetails = techStackDetails => {
  return techStackDetails.reduce((acc, useCase) => {
    const formattedSolutions = useCase.solutions.reduce(
      (solnArray, solution) => {
        let resolvedChecks = solution.checks;
        if (typeof solution.checks === 'function') {
          const checkArgs = {
            pathToPackages: 'y',
            packageRootPath: { relative: 'a', absolute: '/a/b/c' },
          };
          resolvedChecks = solution.checks(checkArgs);
        }
        return [...solnArray, { ...solution, checks: resolvedChecks }];
      },
      [],
    );
    return [
      ...acc,
      {
        ...useCase,
        solutions: formattedSolutions,
      },
    ];
  }, []);
};

const getTechStackReport = ({ rootPath, pathToPackages, exclusions }) => {
  /* get repository level techstack definitions used from techstackrc config */
  const techstackrc = getTechstackConfig({ rootPath });

  /* get definitions for techstacks used */
  const definitions = Object.keys(techstackrc.repository).reduce(
    (acc, techstackDef) => {
      const techStackDetails = getTechStackDefinition({
        techstackIdentifier: techstackDef,
      });
      const formattedTechStackDetails = formatTechStackDetails(
        techStackDetails,
      );
      return {
        ...acc,
        [techstackDef]: formattedTechStackDetails,
      };
    },
    {},
  );

  /* get use cases for packages within the repository */
  const packageJsonFiles = getAllPackagesInProject({
    rootPath,
    pathToPackages,
    exclusions,
  });
  const pkgContent = packageJsonFiles.reduce((acc, packagePath) => {
    const { techstack, name } = getTechStackFromPackage({ packagePath });
    if (!name) {
      // eslint-disable-next-line no-console
      console.log(
        chalk.yellow(
          `Package in ${packagePath} should have an associated name field`,
        ),
      );
      return acc;
    }
    return {
      ...acc,
      [name]: techstack || {},
    };
  }, {});

  /* return data for the techstack report */
  return {
    definitions,
    techstack: {
      all: techstackrc,
      ...pkgContent,
    },
  };
};

module.exports = getTechStackReport;
