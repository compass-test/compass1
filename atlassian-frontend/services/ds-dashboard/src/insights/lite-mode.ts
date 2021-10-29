import { generateData } from '../utils/data';
import type { Insight } from '../types/insights';

import { getAllPackages, isLiteModed } from '../utils/package';
import { getRegistryData, findEarliestVersion } from '../utils/registry';
import { getVersionReleaseDate } from '../utils/version';

const getInsightData = async () => {
  const allPackages = await getAllPackages({
    shouldHidePrivate: true,
    shouldHideDeprecated: true,
  });

  const migrationDates = await Promise.all(
    allPackages.map(async (pkg) => {
      const data = await (await getRegistryData(pkg)).some();
      return findEarliestVersion(isLiteModed)(data).chain((version) =>
        getVersionReleaseDate(version)(data),
      );
    }),
  ).then((times) =>
    times.reduce<string[]>(
      (acc, cur) => (cur.isSome() ? acc.concat(cur.some()) : acc),
      [],
    ),
  );

  return generateData(migrationDates);
};

const getInsight = async () => {
  const data = await getInsightData();
  return {
    title: 'Lite mode',
    data,
  } as Insight;
};

export default getInsight;
