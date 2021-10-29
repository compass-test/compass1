/**
 * Generates an aggregated set of release notes for a release based on changesets of the current branch
 * since the time the release started.
 *
 * Writes to stdout by default unless --write flag is passed.
 *
 * NOTE: Does not work for prior releases and only works using changesets on the current branch.
 *
 * Usage: bolt w @atlaskit/scheduled-releases generate-release-notes <release-name>
 *
 * where release-name is the name of the release.
 *
 * Options:
 *   --include-private        Include private packages in the release notes
 *   --root-dir (default=cwd) The root dir of the repo
 *   --write                  Writes the release notes to the /releases directory rather than stdout
 */
import path from 'path';
import { getNewChangelogEntry } from '@changesets/apply-release-plan';
import { read as readChangesetsConfig } from '@changesets/config';
import getReleasePlan from '@changesets/get-release-plan';
import { ReleasePlan, ModCompWithPackage } from '@changesets/types';
import { getPackages } from '@manypkg/get-packages';
import { Default } from '@atlaskit/build-utils/types';
import meow from 'meow';
import fse from 'fs-extra';

type Options = {
  /** Root directory of the repo */
  rootDir: string;
  /** Whether to include private packages */
  includePrivate: boolean;
  /** Write notes to a file in the root releases dir */
  write: boolean;
};

const defaultOptions = {
  rootDir: process.cwd(),
  includePrivate: false,
  write: false,
};

type UserOptions = Default<Options, keyof typeof defaultOptions>;

type FullRelease = ModCompWithPackage & {
  changelog?: string;
};

function printPackage(release: FullRelease) {
  let strOutput = '';

  if (typeof release.changelog === 'string') {
    strOutput += `### ${release.name}@${release.newVersion}`;

    const transformedChangelog = release.changelog
      // Get rid of the version headings
      .replace(/^##\s[\d.]+$\n/m, '')
      // Add an extra heading depth to remaining headings
      .replace(/(#+)\s/g, '#$1 ');

    strOutput += `\n${transformedChangelog}`;
  }

  return strOutput;
}

function printDetails(releases: FullRelease[]) {
  let strOutput = '';
  for (const release of releases) {
    const packageOutput = printPackage(release);
    strOutput += `\n---\n\n${packageOutput}`;
  }

  return strOutput;
}

function printSummary(releases: FullRelease[]) {
  const summary = releases.map(release => ({
    name: release.name,
    type: release.type,
    change: `${release.oldVersion} -> ${release.newVersion}`,
    num_changes: release.changesets.length,
  }));

  const config = {
    fields: [
      { key: 'name', title: 'Package' },
      { key: 'type', title: 'Type' },
      { key: 'change', title: 'Change' },
      { key: 'num_changes', title: 'Number of changes', alignRight: true },
    ] as const,
    rows: summary,
  };

  return printTable(config);
}

type TableConfig<K extends string> = {
  fields: Readonly<
    Array<{
      key: K;
      title: string;
      alignRight?: boolean;
    }>
  >;
  rows: Array<Record<K, string | number>>;
};

function printTable<K extends string>(config: TableConfig<K>) {
  let strOutput = '';
  // We set a min length of 2 to ensure each column has a - and is rendered in markdown properly
  const minLength = 2;

  const maxWidths = config.fields.map(field =>
    Math.max(minLength, ...config.rows.map(row => `${row[field.key]}`.length)),
  );

  strOutput += `|${config.fields
    .map((f, i) => f.title.padEnd(maxWidths[i]))
    .join('|')}|`;

  strOutput += `\n|${maxWidths
    .map((n, i) => {
      if (config.fields[i].alignRight) {
        return '-'.repeat(n - 1) + ':';
      }
      return '-'.repeat(n);
    })
    .join('|')}|`;

  for (const row of config.rows) {
    strOutput += '\n';
    strOutput += `|${config.fields
      .map((field, i) => {
        const padFn = field.alignRight ? 'padStart' : 'padEnd';
        return `${row[field.key]}`[padFn](maxWidths[i]);
      })
      .join('|')}|`;
  }

  return strOutput;
}

function printTitle(name?: string) {
  let title = 'Releases';

  if (name && name.length > 0) {
    title = `${name[0].toUpperCase() + name.substr(1)} Release`;
  }

  return `# ${title}`;
}

function printNotes(releaseName: string, releases: FullRelease[]) {
  const title = printTitle(releaseName);
  const summary = printSummary(releases);
  const details = printDetails(releases);

  return `
${title}

## Summary

${summary}

## Details
${details}
`;
}

async function processReleases(releasePlan: ReleasePlan, options: Options) {
  const packages = await getPackages(options.rootDir);
  const changesetsConfig = await readChangesetsConfig(
    options.rootDir,
    packages,
  );

  const packagesByName = new Map(
    packages.packages.map(x => [x.packageJson.name, x]),
  );

  const releasesWithPackages = releasePlan.releases.map(release => {
    let pkg = packagesByName.get(release.name);
    if (!pkg) {
      throw new Error(
        `Could not find matching package for release of: ${release.name}`,
      );
    }
    return {
      ...release,
      ...pkg,
    };
  });
  // TODO: Remove any[] after new version of changesets published
  const releasesWithChangelogs: any[] = await getNewChangelogEntry(
    releasesWithPackages,
    releasePlan.changesets,
    changesetsConfig,
    options.rootDir,
  );
  return releasesWithChangelogs
    .filter(release => {
      if (options.includePrivate) {
        return true;
      }

      return !release.packageJson.private;
    })
    .sort((a, b) => {
      const versions = ['major', 'minor', 'patch'] as const;
      const [aSortKey, bSortKey] = [a, b].map(
        release => `${versions.indexOf(release.type)}${release.name}`,
      );
      return aSortKey < bSortKey ? -1 : aSortKey > bSortKey ? 1 : 0;
    });
}

export default async function main(
  releaseName: string,
  userOptions: UserOptions,
) {
  const options: Options = { ...defaultOptions, ...userOptions };

  options.rootDir = path.resolve(options.rootDir);

  if (!releaseName) {
    throw Error('Missing release name');
  }

  const sinceRef = `next-release-start-${releaseName}`;

  const releasePlan = await getReleasePlan(options.rootDir, sinceRef);

  const releases = await processReleases(releasePlan, options);

  if (releases.length === 0) {
    throw new Error(
      `Could not find any releasable changesets on current branch since "${sinceRef}"`,
    );
  }

  const notes = printNotes(releaseName, releases);

  const releaseDirPath = path.join(options.rootDir, 'releases', releaseName);
  const releaseNotesPath = path.join(releaseDirPath, 'RELEASE_NOTES.md');
  if (options.write) {
    await fse.outputFile(releaseNotesPath, notes);
  }

  return { notes, releaseNotesPath: options.write ? releaseNotesPath : false };
}

if (require.main === module) {
  const cli = meow('', {
    description: 'Generates release notes for a release',
    flags: {
      cwd: {
        type: 'string',
      },
      includePrivate: {
        type: 'boolean',
      },
      write: {
        type: 'boolean',
      },
    },
  });

  main(cli.input[0], cli.flags as UserOptions)
    .then(({ notes }) => {
      if (!cli.flags.write) {
        // Print notes to stdout
        console.log(notes);
      }
    })
    .catch(e => {
      console.error(e);
      process.exit(1);
    });
}
