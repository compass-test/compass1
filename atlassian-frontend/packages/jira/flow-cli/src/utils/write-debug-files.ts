import path from 'path';
import fs from 'fs';
import { sync as mkdirpSync } from 'mkdirp';

export const writeDebugFiles = (
  files: { [key: string]: string },
  debugFolderPath: string,
) => {
  if (!fs.existsSync(debugFolderPath)) {
    mkdirpSync(debugFolderPath);
  }

  Object.keys(files).forEach((fileName) => {
    fs.writeFileSync(path.join(debugFolderPath, fileName), files[fileName], {
      encoding: 'utf-8',
    });
  });
};
