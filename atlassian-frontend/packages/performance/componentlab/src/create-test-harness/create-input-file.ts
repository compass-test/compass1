import createHarness from './create-harness';
import uniqueFilename from 'unique-filename';
import { Logger } from 'winston';
import { IUnionFs } from 'unionfs';
import path from 'path';
import { FilePath } from '../../types';

export default async function createInputFile({
  componentPath,
  fs,
  metricsPlugins,
  runnerPlugins,
  logger,
}: {
  componentPath: FilePath;
  fs: IUnionFs;
  metricsPlugins: FilePath[];
  runnerPlugins: FilePath[];
  logger: Logger;
}) {
  const fileWithoutExtension = path.basename(
    componentPath,
    path.extname(componentPath),
  );
  const inputFilePath =
    uniqueFilename(
      path.join(path.dirname(componentPath), '.componentlab'),
      fileWithoutExtension,
    ) + path.extname(componentPath);

  logger.debug('inputFilePath: ' + inputFilePath);

  const suitePath = path.relative(path.dirname(inputFilePath), componentPath);
  const fileContent = createHarness({
    suitePath,
    metricsPlugins,
    runnerPlugins,
  });

  fs.mkdirSync(path.join(path.dirname(componentPath), '.componentlab'), {
    recursive: true,
  });
  logger.debug('fileContent: \n' + fileContent);
  fs.writeFileSync(inputFilePath, fileContent);

  return inputFilePath;
}
