import { relative } from 'path';
import { executeCommand } from './shell';

export const getRepositoryUrl = () => {
  return executeCommand(
    'git config --get remote.origin.url',
    'Unable to get repository name.',
  );
};

export const getRepositoryRoot = () => {
  return executeCommand(
    'git rev-parse --show-toplevel',
    'Unable to get repository root.',
  );
};

export const relativeToRepositoryRoot = (filePath: string) => {
  const repoRoot = getRepositoryRoot();
  return relative(repoRoot, filePath);
};
