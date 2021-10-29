import { DEFAULT_TAG } from './../../constants';
import chalk from 'chalk';
import { UpgradeEvent } from '../../types';
import {
  PopulateHistoricDataFlags,
  DependencyMap,
  AkPackageChange,
} from './types';
import { createUpgradeEvent, sendAnalytics } from '../../util/analytics';
import {
  getChangesSince,
  tagCommit,
  doesTagExist,
  refetchTag,
  getHash,
} from '../../util/git';
import * as statlas from '../../util/statlas';
import { ListLogSummary } from 'simple-git/typings/response';
import { generateCSV } from './util/generate-csv';
import { assert } from '../../util/assert';
import { DependencyStore } from './lib/dependency-store';

export type PopulateProductFlags = PopulateHistoricDataFlags & {
  csv: boolean;
  product: string;
  reset: boolean;
  statlas?: boolean;
  tag?: string;
};

const getUpgradeEventsFromPkgChange = (
  oldDeps: DependencyMap,
  newDeps: DependencyMap,
  { date, commitHash }: { date: string; commitHash: string },
): UpgradeEvent[] => {
  const addOrUpgradeEvents = Object.entries(newDeps)
    .map(([name, { version, type }]) => {
      const prevDep = oldDeps[name];
      // Only treat a dependency as previous if the dependency type matches
      // Otherwise, we want separate add/remove events
      const prevVersion =
        prevDep && prevDep.type === type ? prevDep.version : undefined;
      return createUpgradeEvent(name, version, prevVersion, date, {
        commitHash,
        dependencyType: type,
        historical: true,
      });
    })
    .filter((e): e is UpgradeEvent => e != null);

  const removeEvents = Object.entries(oldDeps)
    .filter(
      ([name, { type }]) =>
        // Treat the same dep under a different dependency type as a new dep
        newDeps[name] == null || newDeps[name].type !== type,
    )
    .map(([name, { version, type }]) => {
      return createUpgradeEvent(name, undefined, version, date, {
        commitHash,
        dependencyType: type,
        historical: true,
      });
    })
    .filter((e): e is UpgradeEvent => e != null);

  return [...addOrUpgradeEvents, ...removeEvents];
};

const getEventsFromHistory = async (
  packageChangesLog: ListLogSummary,
  prevRunHash: string | undefined,
  { cwd }: { cwd: string },
): Promise<{
  allPackageChanges: AkPackageChange[];
  allUpgradeEvents: UpgradeEvent[];
}> => {
  const allPackageChanges: AkPackageChange[] = [];
  const allUpgradeEvents: UpgradeEvent[] = [];
  assert(packageChangesLog.all.length > 0, '');

  let dependencyStore = new DependencyStore(cwd);
  let dependencies = await dependencyStore.initialise(prevRunHash);
  for (let i = 0; i < packageChangesLog.all.length; i++) {
    let item = packageChangesLog.all[i];

    if (allPackageChanges.length > 0) {
      dependencies = allPackageChanges[allPackageChanges.length - 1].akDeps;
    }
    const newDependencies = await dependencyStore.update(item);

    const packageChange = {
      date: new Date(item.date).toISOString(),
      akDeps: newDependencies,
    };
    const upgradeEvents = getUpgradeEventsFromPkgChange(
      dependencies,
      newDependencies,
      {
        date: packageChange.date,
        commitHash: item.hash,
      },
    );
    if (upgradeEvents.length > 0) {
      allUpgradeEvents.push(...upgradeEvents);
      allPackageChanges.push(packageChange);
    }
  }

  return { allPackageChanges, allUpgradeEvents };
};

async function getSinceRef(
  flags: Pick<PopulateProductFlags, 'tag' | 'statlas' | 'product'>,
) {
  if (flags.statlas) {
    const meta = await statlas.getMeta(flags.product);
    if (!meta || !meta.lastRunHash) {
      throw new Error(
        chalk.red(
          `Missing or invalid metadata file for ${flags.product}. Must use --reset for populating from start of history`,
        ),
      );
    }
    return meta.lastRunHash;
  } else {
    const tag = flags.tag || DEFAULT_TAG;
    await refetchTag(tag);
    const tagExists = await doesTagExist(tag);
    if (!tagExists) {
      throw new Error(
        chalk.red(
          `Tag '${tag}' does not exist. Must use --reset for populating from start of history.`,
        ),
      );
    }
    return tag;
  }
}

export default async function populateProduct(flags: PopulateProductFlags) {
  const cwd = flags.cwd || process.cwd();
  const sinceRef = flags.reset ? undefined : await getSinceRef(flags);
  const log = await getChangesSince(sinceRef);

  if (log.all.length === 0) {
    console.log(`No package.json changes found since '${sinceRef}'.`);
    return;
  }

  const {
    allPackageChanges,
    allUpgradeEvents,
  } = await getEventsFromHistory(log, sinceRef, { cwd });

  if (flags.csv) {
    const csv = generateCSV(allPackageChanges);
    console.log(csv);
    return;
  }

  if (flags.dryRun) {
    console.log(JSON.stringify(allUpgradeEvents));
    return;
  }

  if (allUpgradeEvents.length > 0) {
    await sendAnalytics(allUpgradeEvents, {
      dev: flags.dev,
      limit: flags.limit,
      product: flags.product,
      skipPrompt: !flags.interactive,
    });
  } else {
    console.log(
      `Found no AK dependency changes since last run from ref "${sinceRef}"'`,
    );
  }

  if (flags.statlas) {
    // Upload latest commit to statlas
    const currentCommit = await getHash('HEAD');
    await statlas.uploadMeta(flags.product, currentCommit);
    console.log('Finished');
  } else {
    console.log('Updating tag to current commit...');
    await tagCommit(DEFAULT_TAG);
    console.log(`Finished. Run 'git push origin tag ${sinceRef}'.`);
  }
}
