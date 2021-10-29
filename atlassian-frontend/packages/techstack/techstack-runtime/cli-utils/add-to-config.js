const {
  getUpdatedTechstack,
  writeToTechstackRC,
  confirmAdditionIfSolutionAbsent,
  addEmptyEntryToPackage,
  updatePackageTechStack,
  getPackageToChange,
} = require('./add-utils');

/**
 * A solution can be added to a repository, default or package techstack.
 * For repository, adding a solution is straightforward. We need to add an entry to the repository key of techstackrc config.
 * For default techstack/ repository techstack, we need to check if the solution/usecase is present in the repository techstack since a default-package techstack can only be subset of repository techstack.
 * Also, once a usecase/solution is added to default techstack, an empty entry for the use case has to be added to packages which doesn't have that use case present. This has to be done to override the effect of changing default techstack.
 */
const addSolution = async ({ updateParams, packageList, techstackrc }) => {
  const { type, definition, useCase, solution } = updateParams;
  if (type === 'repository') {
    writeToTechstackRC(getUpdatedTechstack({ updateParams, techstackrc }));
  } else {
    const {
      shouldAddSolutionInRepository,
      isSolutionPresentInRepository,
    } = await confirmAdditionIfSolutionAbsent(
      techstackrc.repository,
      updateParams,
    );

    if (!isSolutionPresentInRepository && !shouldAddSolutionInRepository)
      return; // Return since solution is not present in repository techstack and user didn't want to add it too.

    if (type === 'default') {
      writeToTechstackRC(
        getUpdatedTechstack({
          updateParams,
          techstackrc: getUpdatedTechstack({
            updateParams: {
              ...updateParams,
              type: 'repository',
            },
            techstackrc,
          }),
        }),
      );

      addEmptyEntryToPackage({
        config: techstackrc.config,
        definition,
        useCase,
      });
    } else {
      const packageToEdit = await getPackageToChange(
        packageList,
        techstackrc.config,
      );

      writeToTechstackRC(
        getUpdatedTechstack({
          updateParams: {
            ...updateParams,
            type: 'repository',
          },
          techstackrc,
        }),
      );

      updatePackageTechStack({
        packageToEdit,
        definition,
        useCase,
        solution,
      });
    }
  }
};

module.exports = {
  addSolution,
};
