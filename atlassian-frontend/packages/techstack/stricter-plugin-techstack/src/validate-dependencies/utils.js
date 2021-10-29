const flatten = require('lodash/flatten');

const isArray = el => Array.isArray(el);

const isUseCaseUsedInTechstack = (
  usedTechstack,
  techstackDefinition,
  useCase,
) =>
  usedTechstack[techstackDefinition] === 'all' ||
  usedTechstack[techstackDefinition][useCase.id];

const isSolutionUsedForUseCase = (
  usedTechstack,
  techstackDefinition,
  useCase,
  solution,
) =>
  usedTechstack[techstackDefinition] === 'all' ||
  (isArray(usedTechstack[techstackDefinition][useCase.id]) &&
    usedTechstack[techstackDefinition][useCase.id].includes(solution.id)) ||
  usedTechstack[techstackDefinition][useCase.id] === solution.id;

const getAllowedLibrariesRegexList = (
  techstackDefinitions,
  repositoryTechstack,
) => {
  const allowedLibrariesRegexList = Object.keys(techstackDefinitions).reduce(
    (lib, definition) => {
      let libraries = [];
      const useCases = techstackDefinitions[definition];
      useCases.forEach(useCase => {
        if (
          isUseCaseUsedInTechstack(repositoryTechstack, definition, useCase) &&
          useCase.solutions
        ) {
          useCase.solutions.forEach(solution => {
            if (
              isSolutionUsedForUseCase(
                repositoryTechstack,
                definition,
                useCase,
                solution,
              ) &&
              solution.checks
            ) {
              libraries = solution.checks.reduce((acc, check) => {
                if (check.type === 'libraries') {
                  return flatten([...acc, check.configuration]);
                }
                return acc;
              }, libraries);
            }
          });
        }
      });
      return [...lib, ...libraries];
    },
    [],
  );
  return allowedLibrariesRegexList;
};

const findMatchInRegexList = (arr, pkg) =>
  arr.some(exp => new RegExp(exp).test(pkg));

module.exports = {
  getAllowedLibrariesRegexList,
  findMatchInRegexList,
};
