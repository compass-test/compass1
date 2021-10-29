import type { FileResult } from '../../types';

abstract class RemoteLinker {
  // Thanks eamodio - basically copied from: https://github.com/eamodio/vscode-gitlens/blob/main/src/git/parsers/remoteParser.ts
  private static URL_REGEX = /^(?:(?:git:\/\/)(.*?)\/|(?:https?:\/\/)(?:.*?@)?(.*?)\/|git@(.*):|(?:ssh:\/\/)(?:.*@)?(.*?)(?::.*?)?(?:\/|(?=~))|(?:.*?@)(.*?):)(.*)$/;

  constructor(protected domain: string, protected path: string) {}

  public abstract linkToFile(fileResult: FileResult): string;

  // Thanks eamodio - basically copied from: https://github.com/eamodio/vscode-gitlens/blob/main/src/git/parsers/remoteParser.ts
  public static parseGitRemote(remote: string): [string, string] {
    const match = RemoteLinker.URL_REGEX.exec(remote);
    if (match === null) {
      // TODO: Should we just fail silently here? How important is it?
      throw new Error(`Couldn't parse git remote`);
    }

    return [
      match[1] || match[2] || match[3] || match[4] || match[5],
      match[6].replace(/\.git\/?$/, ''),
    ];
  }
}

class BitbucketCloud extends RemoteLinker {
  private linesToRangeHash(lines: FileResult['lines']) {
    if (!lines || lines.length === 0) {
      return '';
    }

    const ranges = lines
      .map(({ from, to }) => {
        if (from === to) {
          return `${from}`;
        }
        return `${from}:${to}`;
      })
      .join(',');

    return `#lines-${ranges}`;
  }

  // example: https://<domain>/<path1>/<path2>/src/master/<file>#lines-range:range,single,single
  public linkToFile(fileResult: FileResult) {
    const linesHash = this.linesToRangeHash(fileResult.lines);

    return `https://${this.domain}/${this.path}/src/master/${fileResult.name}${linesHash}`;
  }

  static domainMatches(domain: string) {
    return domain === 'bitbucket.org';
  }
}

class BitbucketServer extends RemoteLinker {
  private splitPath(): [string, string] {
    if (this.path.startsWith('scm/')) {
      return this.path.replace('scm/', '').split('/') as [string, string];
    }

    const index = this.path.indexOf('/');
    return [this.path.substring(0, index), this.path.substring(index + 1)];
  }

  private linesToRangeHash(lines: FileResult['lines']) {
    if (!lines || lines.length === 0) {
      return '';
    }

    const ranges = lines
      .map(({ from, to }) => {
        if (from === to) {
          return `${from}`;
        }
        return `${from}-${to}`;
      })
      .join(',');

    return `#${ranges}`;
  }

  // example: https://<domain>/projects/<path1>/repos/<path2>/browse/<file>#range-range,single,single
  public linkToFile(fileResult: FileResult) {
    const linesHash = this.linesToRangeHash(fileResult.lines);
    const [project, repo] = this.splitPath();

    return `https://${this.domain}/projects/${project}/repos/${repo}/browse/${fileResult.name}${linesHash}`;
  }

  static domainMatches(domain: string) {
    return (
      domain === 'stash.dev.internal.atlassian.com' ||
      domain === 'stash.atlassian.com'
    );
  }
}

export const fromRemote = (remote: string) => {
  const [domain, path] = RemoteLinker.parseGitRemote(remote);
  if (BitbucketCloud.domainMatches(domain)) {
    return new BitbucketCloud(domain, path);
  }

  if (BitbucketServer.domainMatches(domain)) {
    return new BitbucketServer(domain, path);
  }

  throw new Error(`No supported provider found for remote: "${remote}"`);
};
