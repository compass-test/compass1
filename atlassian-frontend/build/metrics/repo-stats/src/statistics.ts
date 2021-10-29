import child_process from 'child_process';
import util from 'util';
import { Cloc, ClocHeader } from './types';

const exec = util.promisify(child_process.exec);

export const getCommits = async ({
  cwd,
  since,
  until,
  dir,
}: {
  cwd: string;
  until: number;
  since?: number;
  dir?: string;
}) => {
  let result = await exec(
    `git rev-list --all --count ${
      since ? `--since=${since}` : ''
    } --until=${until} ${dir ? dir : ''}`,
    { cwd },
  );
  return parseInt(result.stdout.toString(), 10);
};

export const getAuthors = async ({
  cwd,
  since,
  until,
  dir,
}: {
  cwd: string;
  until: number;
  since?: number;
  dir?: string;
}) => {
  let result = await exec(
    `git shortlog --all -s ${
      since ? `--since=${since}` : ''
    } --until=${until} ${dir ? dir : ''} | wc -l`,
    { cwd },
  );
  return parseInt(result.stdout.toString(), 10);
};

export const getCloc = async ({ cwd, dir }: { cwd: string; dir?: string }) => {
  let command = `npx cloc@2.7.0 --vcs=git --quiet --json ${dir ? dir : '.'}`;
  let result = await exec(command, {
    cwd,
  });
  const { header, ...cloc } = JSON.parse(result.stdout.toString());

  return {
    clocHeader: header as ClocHeader,
    cloc: cloc as Cloc,
  };
};
