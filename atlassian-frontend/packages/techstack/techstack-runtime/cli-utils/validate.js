/* eslint-disable no-console */
const chalk = require('chalk');

const {
  getTechstackConfig,
  getAllPackagesInProject,
  getTechStackFromPackage,
} = require('../src/utils');

const validateDefaultTechstack = ({ techstackConfig }) => {
  const errors = [];
  Object.keys(techstackConfig.default).forEach(definition => {
    if (!techstackConfig.repository[definition]) {
      errors.push(
        `Techstack definition ${definition} present in default techastack is not present in repository techstack.`,
      );
    } else {
      Object.keys(techstackConfig.default[definition]).forEach(useCase => {
        if (!techstackConfig.repository[definition][useCase]) {
          errors.push(
            `Usecase ${useCase} present in default techastack not present in repository techstack.`,
          );
        } else {
          techstackConfig.default[definition][useCase].forEach(solution => {
            if (
              !techstackConfig.repository[definition][useCase].includes(
                solution,
              )
            ) {
              errors.push(
                `Solution ${solution} present in default techastack not present in repository techstack.`,
              );
            }
          });
        }
      });
    }
  });
  return errors;
};

const validatePackagesTechstack = ({ techstackConfig }) => {
  const errors = [];
  const allPackages = getAllPackagesInProject(techstackConfig.config);
  allPackages.forEach(packagePath => {
    const { techstack, name } = getTechStackFromPackage({
      packagePath,
    });
    if (!techstack) {
      return;
    }
    Object.keys(techstack).forEach(definition => {
      if (!techstackConfig.repository[definition]) {
        errors.push(
          `Techstack definition ${definition} present in package ${name} is not present in repository techstack.`,
        );
      } else {
        Object.keys(techstack[definition]).forEach(useCase => {
          if (!techstackConfig.repository[definition][useCase]) {
            errors.push(
              `Usecase ${useCase} present in package ${name} techstack is not present in repository techstack.`,
            );
          } else {
            techstack[definition][useCase].forEach(solution => {
              if (
                techstackConfig.repository[definition][useCase] &&
                !techstackConfig.repository[definition][useCase].includes(
                  solution,
                )
              ) {
                errors.push(
                  `Solution ${solution} present in package ${name} techstack is not present in repository techstack.`,
                );
              }
            });
          }
        });
      }
    });
  });
  return errors;
};

module.exports = () => {
  const techstackConfig = getTechstackConfig({ rootPath: process.cwd() });
  const defaultTechstackErrors = validateDefaultTechstack({ techstackConfig });
  const packageTechstackErrors = validatePackagesTechstack({ techstackConfig });
  const errors = [...defaultTechstackErrors, ...packageTechstackErrors];
  if (!errors.length) {
    console.log(chalk.green.bold(`‎✅ Techstack validation checks passed.`));
  } else {
    errors.forEach(error => {
      console.log(chalk.red.bold(error));
    });
  }
};
