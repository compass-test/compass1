import { execSync } from 'child_process';

export const executeCommand = (command: string, failure: string) => {
  try {
    return execSync(command, {
      encoding: 'utf8',
    }).trim();
  } catch (error) {
    throw new Error(`${failure} ${error}`);
  }
};
