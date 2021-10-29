import os from 'os';
import chalk from 'chalk';
import pLimit from 'p-limit';
import fs from 'fs';
// Allows for different types of repository (yarn, bolt etc) to use this tool
import { getPackages } from '@manypkg/get-packages';
import { getCommits, getAuthors, getCloc } from './statistics';
import { RepoStats, ExtraStats, RepoStatsEvent, Config } from './types';
import { sendAnalytics } from './util/analytics';

const getWorkspaceStatistics = async (
  workspace: { dir: string; packageJson: { name: string } },
  {
    cwd,
    since,
    until,
  }: {
    cwd: string;
    since: number;
    until: number;
  },
  tick?: (workspace: string) => void,
): Promise<RepoStats> => {
  let dir = workspace.dir.replace(`${cwd}/`, '');

  let [
    commits,
    recentCommits,
    authors,
    recentAuthors,
    clocStatistics,
  ] = await Promise.all([
    getCommits({ cwd, until, dir: workspace.dir }),
    getCommits({ cwd, since, until, dir: workspace.dir }),
    getAuthors({ cwd, until, dir: workspace.dir }),
    getAuthors({ cwd, since, until, dir: workspace.dir }),
    getCloc({ cwd, dir }),
  ]);

  if (tick) {
    tick(workspace.packageJson.name);
  }

  return {
    name: workspace.packageJson.name,
    timestamp: until,
    commits,
    recentCommits,
    authors,
    recentAuthors,
    ...clocStatistics,
  };
};

const getTotalGitStatistics = async (
  cwd: string,
  timestamp: number,
  recentTimestamp: number,
) => {
  const commits = await getCommits({ cwd, until: timestamp });
  const recentCommits = await getCommits({
    cwd,
    since: recentTimestamp,
    until: timestamp,
  });
  const authors = await getAuthors({ cwd, until: timestamp });
  const recentAuthors = await getAuthors({
    cwd,
    since: recentTimestamp,
    until: timestamp,
  });
  return {
    commits,
    recentCommits,
    authors,
    recentAuthors,
  };
};

const getStepCount = (workspaces: boolean) => {
  const steps = workspaces ? 5 : 4;
  return steps;
};

const getExtraStatistics = async (cwd: string, config: Config) => {
  let extraStatistics: ExtraStats = {};
  if (config.extras && typeof config.extras === 'object') {
    const promises = Object.entries(config.extras).map(
      ([key, func]: [string, any]) => {
        return new Promise(async (resolve, reject) => {
          try {
            extraStatistics[key] = await func(cwd, config);
            console.log(`  ${chalk.green('success')} ${key}`);
          } catch (error) {
            console.log(`  ${chalk.red('failed')} ${key}`);
            console.log(`    ${error.message}`);
          }
          resolve();
        });
      },
    );
    await Promise.all(promises);
  }
  return extraStatistics;
};

export default async (cwd: string, config: Config) => {
  const timestamp = config.timestamp || Math.floor(Date.now() / 1000);
  const recentTimestamp = timestamp - config.recent;

  const steps = getStepCount(config.workspaces);
  console.log(`${chalk.dim('getting repo stats of')} ${cwd}\n`);

  console.log(`${chalk.dim(`[1/${steps}]`)} Getting total git statistics...`);
  const gitTotalStatistics = await getTotalGitStatistics(
    cwd,
    timestamp,
    recentTimestamp,
  );

  console.log(`${chalk.dim(`[2/${steps}]`)} Getting total cloc statistics...`);
  const clocTotalStatistics = await getCloc({ cwd });

  console.log(`${chalk.dim(`[3/${steps}]`)} Getting extra statistics...`);
  const extraStatistics = await getExtraStatistics(cwd, config);

  let totalStatistics: RepoStats = {
    name: 'total',
    timestamp,
    ...gitTotalStatistics,
    ...clocTotalStatistics,
    extras: extraStatistics,
  };

  let statistics = [totalStatistics];

  if (config.workspaces) {
    console.log(
      `${chalk.dim(`[${steps - 1}/${steps}]`)} Getting workspace statistics...`,
    );

    let { packages: workspaces } = await getPackages(cwd);
    const workspaceCount = workspaces.length;
    totalStatistics.workspaces = workspaceCount;

    let complete = 0;
    const tick = (workspace: string) => {
      complete++;
      process.stdout.write(
        `  ${chalk.dim(`[${complete}/${workspaceCount}]`)} ${workspace}\r`,
      );
    };

    process.stdout.write(`  ${chalk.dim(`[${complete}/${workspaceCount}]`)}\r`);
    let limit = pLimit(os.cpus().length - 1);

    let workspaceStats: RepoStats[] = await Promise.all(
      workspaces.map(workspace =>
        limit(() =>
          getWorkspaceStatistics(
            workspace,
            {
              cwd,
              since: recentTimestamp,
              until: timestamp,
            },
            tick,
          ),
        ),
      ),
    );
    console.log();
    statistics = statistics.concat(workspaceStats);
  }

  // convert to json blobs for sending to analytics
  let events = statistics.map(statistic => {
    let event: RepoStatsEvent = {
      ...statistic,
      cloc: JSON.stringify(statistic.cloc),
      clocHeader: JSON.stringify(statistic.clocHeader),
      extras: JSON.stringify(statistic.extras),
    };
    return event;
  });

  if (config.dryRun) {
    console.log(`${chalk.dim(`[${steps}/${steps}]`)} Saving statistics...`);
    let filename = `repo-stats-${timestamp}.json`;
    fs.writeFileSync(filename, JSON.stringify(events, null, 2));
    console.log(`  ${chalk.green('success')} saved to ${filename}`);
  } else {
    console.log(`${chalk.dim(`[${steps}/${steps}]`)} Sending statistics...`);
    await sendAnalytics(events, config);
    console.log(`  ${chalk.green('success')} sent to analytics`);
  }
  return events;
};
