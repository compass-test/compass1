import { Pipe } from '../types';

export const getPipeReadme = async (pipe: Pipe) => {
  if (!pipe.repositoryPath || !pipe.version) {
    return Promise.reject();
  }
  const response = await fetch(
    `https://api.bitbucket.org/2.0/repositories/${pipe.repositoryPath}/src/${pipe.version}/README.md?format=rendered`,
  );
  const json = await response.json();
  return json.raw;
};
