import { ListLogSummary } from 'simple-git/typings/response';

export const generateLogs = (fileChanges: string[][]): ListLogSummary => {
  /* Hashes in the logs here should refer to the indices of the log for easier mocking/testing */
  const rawLogs = fileChanges.map((files, i) => ({
    hash: `${i}`,
    date: `2020-11-26 0${i}:00:00 +0000`,
    message: `${i}`,
    author_name: 'Foo',
    author_email: 'foo@atlassian.com',
    refs: 'abc',
    body: '',
    diff: {
      files: files.map(f => ({
        file: f,
        before: 0,
        after: 0,
        binary: false,
      })),
      changed: 0,
      insertions: 0,
      deletions: 0,
    },
  }));

  return {
    all: rawLogs,
    total: rawLogs.length,
    latest: rawLogs[rawLogs.length - 1],
  };
};
