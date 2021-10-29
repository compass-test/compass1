/* eslint-disable no-console */

const fs = require('fs');
const path = require('path');

const chalk = require('chalk');
const inquirer = require('inquirer');

const {
  getAllPackagesInProject,
  getTechStackFromPackage,
} = require('../src/utils');

/** This function returns the update techstackrc */
const getUpdatedTechstack = ({ updateParams, techstackrc }) => {
  const { type, definition, useCase, solution } = updateParams;
  const definitionToUpdate = techstackrc[type][definition];
  const solutions =
    definitionToUpdate && definitionToUpdate[useCase]
      ? [...definitionToUpdate[useCase], solution]
      : solution;
  const updatedTechstack = {
    ...techstackrc,
    [type]: {
      ...techstackrc[type],
      [definition]: {
        ...definitionToUpdate,
        [useCase]: Array.isArray(solutions)
          ? [...new Set(solutions)]
          : solutions,
      },
    },
  };

  return updatedTechstack;
};

/** This function writes the updated techstackrc to techstackrc file */
const writeToTechstackRC = techstackrc => {
  const content = `module.exports=${JSON.stringify(techstackrc, null, 4)}`;
  fs.writeFileSync(path.resolve('.', '.techstackrc.js'), content);
  console.log(chalk.green.bold(`Solution updated in techstackrc.`));
};

/** This function adds an empty entry to the usecase passed as arg */
const addEmptyEntryToPackage = ({ config, definition, useCase }) => {
  const allPackages = getAllPackagesInProject(config);
  allPackages.forEach(packagePath => {
    const { content, techstack, name } = getTechStackFromPackage({
      packagePath,
    });
    if (techstack && techstack[definition]) {
      if (!techstack[definition][useCase]) {
        techstack[definition][useCase] = 'off';
        fs.writeFileSync(
          packagePath,
          JSON.stringify({ ...content, techstack }, null, 4),
        );
        console.log(
          chalk.green.bold(
            `Added an empty entry for usecase ${useCase} in package ${name}.`,
          ),
        );
      }
    }
  });
};

/** This function updates the package techstack */
const updatePackageTechStack = ({
  packageToEdit,
  definition,
  useCase,
  solution,
}) => {
  const { techstack = {}, content, name } = getTechStackFromPackage({
    packagePath: packageToEdit,
  });
  if (techstack[definition]) {
    const solutions =
      Array.isArray(techstack[definition][useCase]) &&
      techstack[definition][useCase]
        ? [...techstack[definition][useCase], solution]
        : solution;
    techstack[definition] = {
      ...techstack[definition],
      [useCase]: solutions,
    };
  } else {
    techstack[definition] = {
      [useCase]: solution,
    };
  }
  fs.writeFileSync(
    packageToEdit,
    JSON.stringify({ ...content, techstack }, null, 4),
  );
  console.log(
    chalk.green.bold(
      `Solution ${solution} added in package ${name} techstack.`,
    ),
  );
};

const confirmAdditionIfSolutionAbsent = async (
  repositoryTechstack,
  updateParams,
) => {
  const { definition, useCase, solution } = updateParams;
  const solutionAbsentInRepository =
    !repositoryTechstack[definition][useCase] ||
    (repositoryTechstack[definition][useCase] &&
      !repositoryTechstack[definition][useCase].includes(solution));
  if (!solutionAbsentInRepository) {
    return {
      isSolutionPresentInRepository: true,
      shouldAddSolutionInRepository: false,
    };
  }
  const checkIfSolutionCanBeAdded = {
    type: 'confirm',
    name: 'confirmationToAddSolution',
    message:
      'This use case/solution is not present in repository techstack. Default package techstack can only be subset of repository tech stack. Do you want to add the use case/solution to repository techstack as well?',
    default: true,
  };
  const { confirmationToAddSolution } = await inquirer.prompt(
    checkIfSolutionCanBeAdded,
  );

  return {
    isSolutionPresentInRepository: false,
    shouldAddSolutionInRepository: confirmationToAddSolution,
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

module.exports = {
  getUpdatedTechstack,
  writeToTechstackRC,
  addEmptyEntryToPackage,
  updatePackageTechStack,
  confirmAdditionIfSolutionAbsent,
  getPackageToChange,
};
