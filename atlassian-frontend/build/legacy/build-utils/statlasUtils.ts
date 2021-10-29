import spawn from 'projector-spawn';

export const tarFolder = async (file: string, dir: string): Promise<string> => {
  const command = await spawn('tar', ['-cvzf', `${file}`, `${dir}`], {
    cwd: process.cwd(),
  });
  return command.stdout.trim();
};

export const uploadToStatlas = async (
  method: string,
  file: string,
  dir: string,
): Promise<string> => {
  try {
    const { STATLAS_NAMESPACE, STATLAS_AUTH_GROUP } = process.env;
    const command = await spawn(
      'atlas',
      [
        'statlas',
        method,
        `--file=${file}`,
        `--subdirectory=${dir}`,
        `--namespace=${STATLAS_NAMESPACE}`,
        `--auth-group=${STATLAS_AUTH_GROUP}`,
      ],
      { cwd: process.cwd() },
    );
    return command.stderr;
  } catch (err) {
    throw new Error(
      `Something went wrong while uploading to Statlas ${err.toString()}`,
    );
  }
};
