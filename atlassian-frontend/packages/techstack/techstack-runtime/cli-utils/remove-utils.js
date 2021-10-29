/* eslint-disable no-console */
const fs = require('fs');
const path = require('path');

const chalk = require('chalk');
const inquirer = require('inquirer');

const {
  getAllPackagesInProject,
  getTechStackFromPackage,
} = require('../src/utils');

const getUpdatedTechstack = ({ updateParams, techstackrc }) => {
  const { type, definition, useCase, solution } = updateParams;
  const filteredSolutions = Array.isArray(
    techstackrc[type][definition][useCase],
  )
    ? techstackrc[type][definition][useCase].filter(
        solutionId => solutionId !== solution,
      )
    : techstackrc[type][definition][useCase];
  const updatedTechstack = {
    ...techstackrc,
    [type]: {
      ...techstackrc[type],
      [definition]: {
        ...techstackrc[type][definition],
        [useCase]: filteredSolutions,
      },
    },
  };
  if (
    (Array.isArray(updatedTechstack[type][definition][useCase]) &&
      !updatedTechstack[type][definition][useCase].length) ||
    updatedTechstack[type][definition][useCase] === solution
  ) {
    delete updatedTechstack[type][definition][useCase];
  }
  return updatedTechstack;
};

const writeToTechstackRC = techstackrc => {
  const content = `module.exports=${JSON.stringify(techstackrc, null, 4)}`;
  fs.writeFileSync(path.resolve('.', '.techstackrc.js'), content);
  console.log(chalk.green.bold(`Solution removed in techstackrc.`));
};

const removeSolutionFromPackages = ({ config, updateParams }) => {
  const { definition, useCase, solution } = updateParams;
  /** Since solution is removed from repository techstack, it must be removed from all packages techstack too */
  const allPackages = getAllPackagesInProject(config);
  allPackages.forEach(packagePath => {
    const { content, techstack, name } = getTechStackFromPackage({
      packagePath,
    });
    if (techstack && techstack[definition]) {
      if (techstack[definition][useCase]) {
        if (
          Array.isArray(techstack[definition][useCase]) &&
          techstack[definition][useCase].includes(solution)
        ) {
          techstack[definition][useCase] = techstack[definition][
            useCase
          ].filter(solutionId => solutionId !== solution);
        }

        if (
          (Array.isArray(techstack[definition][useCase]) &&
            !techstack[definition][useCase].length) ||
          techstack[definition][useCase] === solution ||
          techstack[definition][useCase] === 'off'
        ) {
          delete techstack[definition][useCase];
        }
        content.techstack = techstack;
        fs.writeFileSync(packagePath, JSON.stringify(content, null, 4));
        console.log(
          chalk.green.bold(
            `Solution "${solution}" removed from package "${name}" techstack.`,
          ),
        );
      }
    }
  });
};

const isSolutionPresent = ({ techstackrc, updateParams }) => {
  const { type, definition, useCase, solution } = updateParams;
  /** Check if use-case is present in techstack config */
  if (!techstackrc[type][definition][useCase]) {
    console.log(
      chalk.red.bold(
        `Usecase "${useCase}" not present in "${type}" field of techstack config`,
      ),
    );
    return false;
  }
  /** Check if solution to remove is present in techstack config */
  if (!techstackrc[type][definition][useCase].includes(solution)) {
    console.log(
      chalk.red.bold(
        `Solution "${solution}" not present in "${type}" field of techstack config`,
      ),
    );
    return false;
  }
  return true;
};

const confirmDeletionIfSolutionPresentInDefault = async (
  defaultTechstack,
  updateParams,
) => {
  const { definition, useCase, solution } = updateParams;
  if (
    defaultTechstack[definition] &&
    defaultTechstack[definition][useCase] &&
    defaultTechstack[definition][useCase].includes(solution)
  ) {
    /** Get confirmation to remove solution from repository techstack to adhere to the inheritence model of techstack */
    const checkIfDefaultCanBeRemoved = {
      type: 'confirm',
      name: 'confirmRemove',
      message: `Solution ${solution} present in default-package field of techstack config. Do you want to add the use case/solution to repository techstack as well?`,
      default: false,
    };
    const { confirmRemove } = await inquirer.prompt(checkIfDefaultCanBeRemoved);
    return {
      solutionPresentInDefault: true,
      confirmRemoveFromDefault: confirmRemove,
    };
  }
  return {
    solutionPresentInDefault: false,
    confirmRemoveFromDefault: false,
  };
};

const getPackageToChange = async (packageList, config) => {
  const askForPackageToChange = {
    type: 'list',
    name: 'packageName',
    message: 'Which package`s techstack you want to modify?',
    choices: packageList,
  };
  const { packageName } = await inquirer.prompt(askForPackageToChange);
  const allPackages = getAllPackagesInProject(config);
  const packageToEdit = allPackages.find(packagePath => {
    const { name } = getTechStackFromPackage({
      packagePath,
    });
    return name === packageName;
  });
  return packageToEdit;
};

const updatePackageTechStack = ({
  packageToEdit,
  definition,
  useCase,
  solution,
}) => {
  const { techstack = {}, content, name } = getTechStackFromPackage({
    packagePath: packageToEdit,
  });
  if (techstack[definition] && techstack[definition][useCase]) {
    let solutions =
      techstack[definition][useCase] &&
      Array.isArray(techstack[definition][useCase])
        ? techstack[definition][useCase].filter(
            solutionId => solutionId !== solution,
          )
        : 'off';
    if (Array.isArray(solutions)) {
      if (solutions.length === 1) {
        // eslint-disable-next-line prefer-destructuring
        solutions = solutions[0];
      }
      if (!solutions.length) {
        solutions = 'off';
      }
    }
    techstack[definition][useCase] = solutions;
    fs.writeFileSync(
      packageToEdit,
      JSON.stringify({ ...content, techstack }, null, 4),
    );
  }

  console.log(
    chalk.green.bold(`Removed solution ${solution} in package ${name}`),
  );
};

module.exports = {
  isSolutionPresent,
  getUpdatedTechstack,
  writeToTechstackRC,
  removeSolutionFromPackages,
  confirmDeletionIfSolutionPresentInDefault,
  getPackageToChange,
  updatePackageTechStack,
};
