const {
  isSolutionPresent,
  removeSolutionFromPackages,
  writeToTechstackRC,
  getUpdatedTechstack,
  confirmDeletionIfSolutionPresentInDefault,
  getPackageToChange,
  updatePackageTechStack,
} = require('./remove-utils');

const removeSolution = async ({ updateParams, packageList, techstackrc }) => {
  const { type, definition, useCase, solution } = updateParams;
  if (
    (type === 'repository' || type === 'default') &&
    !isSolutionPresent({
      techstackrc,
      updateParams,
    })
  )
    return;
  if (type === 'repository') {
    const {
      solutionPresentInDefault,
      confirmRemoveFromDefault,
    } = await confirmDeletionIfSolutionPresentInDefault(
      techstackrc.default,
      updateParams,
    );
    if (solutionPresentInDefault && !confirmRemoveFromDefault) return;
    if (!solutionPresentInDefault) {
      writeToTechstackRC(getUpdatedTechstack({ updateParams, techstackrc }));
    } else {
      writeToTechstackRC(
        getUpdatedTechstack({
          updateParams,
          techstackrc: getUpdatedTechstack({
            updateParams: {
              ...updateParams,
              type: 'default',
            },
            techstackrc,
          }),
        }),
      );
    }
    removeSolutionFromPackages({
      config: techstackrc.config,
      updateParams,
    });
  } else if (type === 'default') {
    writeToTechstackRC(getUpdatedTechstack({ updateParams, techstackrc }));
    removeSolutionFromPackages({
      config: techstackrc.config,
      updateParams,
    });
  } else {
    const packageToEdit = await getPackageToChange(
      packageList,
      techstackrc.config,
    );
    updatePackageTechStack({
      packageToEdit,
      definition,
      useCase,
      solution,
    });
  }
};

module.exports = { removeSolution };
