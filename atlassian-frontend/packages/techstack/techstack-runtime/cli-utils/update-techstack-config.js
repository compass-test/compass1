const inquirer = require('inquirer');

const getTechStackReport = require('../src/get-techstack-report');
const { getTechstackConfig } = require('../src/utils');

const { addSolution } = require('./add-to-config');
const { removeSolution } = require('./remove-from-config');

const allowedOperations = ['add', 'remove'];

/** Get techstack config */
const techstackrc = getTechstackConfig({ rootPath: process.cwd() });

/** Get techstack report */
const report = getTechStackReport(techstackrc.config);

/** Process the input to the correct function */
const processInput = updateParams => {
  const { operation } = updateParams;
  switch (operation) {
    case 'add':
      addSolution({
        updateParams,
        packageList: Object.keys(report.techstack),
        techstackrc,
      });
      break;
    case 'remove':
      removeSolution({
        updateParams,
        packageList: Object.keys(report.techstack),
        techstackrc,
      });
      break;
    default:
  }
};

/** Get input on techstack definition and type (repository/default-package) to edit */
const getInputOnDefinitionAndType = [
  {
    type: 'list',
    name: 'type',
    message: 'Where would you need to add/remove the use case?',
    choices: ['repository', 'default', 'specific package'],
  },
  {
    type: 'list',
    name: 'definition',
    message: 'Which definition is the use case present?',
    choices: Object.keys(report.definitions),
  },
];

module.exports = operation => {
  if (!allowedOperations.includes(operation)) return;
  /** Inquirer to take CLI Inputs on the techstack definition from which solution has to be added/ removed and whether the operation has to be done on default techstack/ repository techstack or package-level techstack */
  inquirer.prompt(getInputOnDefinitionAndType).then(answers => {
    /** Get input on use case to edit */
    const selectUseCase = {
      type: 'list',
      name: 'useCase',
      message: 'Select the use case',
      choices: report.definitions[answers.definition].map(
        useCase => useCase.id,
      ),
    };
    inquirer.prompt(selectUseCase).then(selectedUseCase => {
      const { solutions } = report.definitions[answers.definition].find(
        useCase => useCase.id === selectedUseCase.useCase,
      );

      /** Get input on solution to edit */
      const selectSolution = {
        type: 'list',
        name: 'solution',
        message: 'Select the solution',
        choices: solutions.map(solution => solution.id),
      };
      inquirer.prompt(selectSolution).then(selectedSolution => {
        processInput({
          definition: answers.definition,
          useCase: selectedUseCase.useCase,
          solution: selectedSolution.solution,
          type: answers.type,
          operation,
        });
      });
    });
  });
};
