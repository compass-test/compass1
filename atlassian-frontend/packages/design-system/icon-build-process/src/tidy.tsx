import fs from 'fs-extra';
import type { IconBuildConfig } from './types';

/**
 * Clears out the `processedDir` and `destDir` directories.
 *
 * @param config
 */
export function tidy(config: IconBuildConfig) {
  return fs
    .emptyDir(config.processedDir)
    .then(() => fs.emptyDir(config.destDir));
}
