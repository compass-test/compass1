import { generateData } from '../utils/data';
import type { Insight } from '../types/insights';

import { getAllPackages, hasStyledComponents } from '../utils/package';
import { getRegistryData, findLatestVersion } from '../utils/registry';
import { getVersionReleaseDate, getVersionAfter } from '../utils/version';

const getInsightData = async () => {
  const allPackages = await getAllPackages({
    shouldHidePrivate: true,
    shouldHideDeprecated: true,
  });

  const registryData = await Promise.all(
    allPackages.map((pkg) =>
      getRegistryData(pkg).then((maybe) => maybe.some()),
    ),
  );

  const migrationDates = await Promise.all(
    registryData.map(async (data) => {
      return findLatestVersion(hasStyledComponents)(data)
        .chain((version) => getVersionAfter(version)(data))
        .chain((version) => getVersionReleaseDate(version)(data));
    }),
  ).then((times) =>
    times.reduce<string[]>(
      (acc, cur) => (cur.isSome() ? acc.concat(cur.some()) : acc),
      [],
    ),
  );

  const referenceLine = {
    type: 'y',
    y: registryData.filter(({ versions }) =>
      Object.values(versions).some(hasStyledComponents),
    ).length,
  };

  return { data: generateData(migrationDates), references: [referenceLine] };
};

const getInsight = async () => {
  const { data, references } = await getInsightData();
  return {
    title: 'Styled-components removal',
    data,
    references,
  } as Insight;
};

export default getInsight;
