/*
Util function to merge json files under folder provided as input
*/

import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';

const input = path.join(process.cwd(), process.argv[2]);

const mergeJSONFiles = () => {
  const output = path.join(input, 'merged.json');
  if (exists(output)) {
    console.log('remove file if exist', output);
    try {
      execSync(`rm -rf ${output}`);
    } catch (e) {
      console.error(`${e}`);
    }
  }

  const files = fs.readdirSync(input);

  const jsonFiles = files.reduce((acc: string[], filename: string) => {
    if (filename.includes('.json')) {
      const content = JSON.parse(
        fs.readFileSync(path.join(input, filename), 'utf-8'),
      );
      acc.push(...content);
    }
    return acc;
  }, []);

  fs.writeFileSync(output, JSON.stringify(jsonFiles), 'utf-8');
};

function exists(filePath: string) {
  try {
    fs.accessSync(filePath);
    return true;
  } catch (e) {
    return false;
  }
}

(() => mergeJSONFiles())();
