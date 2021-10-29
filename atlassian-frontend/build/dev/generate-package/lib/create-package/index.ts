import { promises as fs } from 'fs';
import globby from 'globby';
import path from 'path';

import { getPackageJson } from './getPackageJson';
import { getReadme } from './getReadme';
import { getTsConfig } from './getTsConfig';
import { TEMPLATE_VARS } from '../constants';
import { PackageInformation, TemplateVariables } from '../types';

type FileData = {
  inputPath: string;
  outputPath: string;
};

// Takes a string and replaces strings that match one of the
// template variables with the value for that variable.
const applyVarsToTemplate = (str: string, templateVars: TemplateVariables) =>
  Object.entries(templateVars)
    .sort(([kA], [kB]) => kB.length - kA.length)
    .reduce(
      (currStr, [key, val]) =>
        currStr.replace(new RegExp(TEMPLATE_VARS[key], 'g'), val),
      str,
    );

// Copy a template file to a new destination while injecting values.
const copyTemplateFile = async (
  { inputPath, outputPath }: FileData,
  templateVars: TemplateVariables,
) => {
  const contents = await fs.readFile(inputPath, { encoding: 'utf8' });
  const newContents = applyVarsToTemplate(contents, templateVars);
  await fs.writeFile(outputPath, newContents);
};

export const createPackageFromTemplate = async (
  inputDir: string,
  outputDir: string,
  packageInfo: PackageInformation,
) => {
  const { type, ...templateVars } = packageInfo;

  // Glob files in the template dir that we're copying
  const globs = [
    `${inputDir}/**/{.*,*.*}`,
    `!**/node_modules/**`,
    // Don't copy package.json, readme or tsconfig because we'll create our own
    `!${inputDir}/package.json`,
    `!${inputDir}/README.md`,
    `!${inputDir}/tsconfig.json`,
  ];

  // We conditionally ignore some of the files in there
  if (type !== 'public') {
    // Only public packages need docs and a license
    globs.push(`!${inputDir}/docs/**`, `!${inputDir}/LICENSE.md`);
  }
  if (type === 'private') {
    // Private packages don't need an .npmignore file
    globs.push(`!${inputDir}/.npmignore`);
  }

  const paths = await globby(globs);
  const filesToCopy: FileData[] = paths.map(inputPath => {
    // 1. String replace the input dir with the output dir
    // 2. Inject user values into the path if it's a template
    const outputPath = applyVarsToTemplate(
      inputPath.replace(inputDir, outputDir),
      templateVars,
    );

    return { inputPath, outputPath };
  });

  // Create all the destination directories
  await Promise.all(
    filesToCopy.map(({ outputPath }) =>
      fs.mkdir(path.dirname(outputPath), { recursive: true }),
    ),
  );

  // Copy all the files to the destination
  await Promise.all(filesToCopy.map(f => copyTemplateFile(f, templateVars)));

  // Write files that we need to create programmatically
  const packageJson = getPackageJson(packageInfo);
  await fs.writeFile(path.join(outputDir, 'package.json'), packageJson);

  const readme = getReadme(packageInfo);
  await fs.writeFile(path.join(outputDir, 'README.md'), readme);

  const tsConfig = getTsConfig(packageInfo);
  await fs.writeFile(path.join(outputDir, 'tsconfig.json'), tsConfig);
};
