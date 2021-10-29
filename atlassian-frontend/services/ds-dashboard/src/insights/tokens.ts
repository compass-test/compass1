import { generateData } from '../utils/data';
import type { AsideData, Insight, AsideDataRow } from '../types/insights';

import { getAllPackages, hasTokens, getDisplayName } from '../utils/package';
import { findEarliestVersion, getAllRegistryData } from '../utils/registry';
import { getVersionReleaseDate } from '../utils/version';
import { catMaybes } from '../utils/fp';
import type { PackageJSON, PackageRegistryData } from '../types/package';

const getDates = (
  allPackages: PackageJSON[],
  allData: Record<string, PackageRegistryData>,
) =>
  Promise.all(
    allPackages.map(async (pkg) =>
      findEarliestVersion(hasTokens)(allData[pkg.name]).chain((version) =>
        getVersionReleaseDate(version)(allData[pkg.name]),
      ),
    ),
  ).then(catMaybes);

const getAside = (
  allPackages: PackageJSON[],
  allData: Record<string, PackageRegistryData>,
): AsideData => {
  const head = ['Name', 'Package name', 'Version added', 'Release date'];
  const rows = allPackages.map<AsideDataRow>((pkg) => {
    const data = allData[pkg.name];
    const version = findEarliestVersion(hasTokens)(data);
    const release = version
      .chain((v) => getVersionReleaseDate(v)(data))
      .map((s) => new Date(s).valueOf());
    return [
      { type: 'text', value: getDisplayName(pkg) },
      { type: 'code', value: pkg.name },
      { type: 'code', value: version.orNull() },
      { type: 'date', value: release.orNull() },
    ];
  });
  return { head, rows };
};

const getInsightData = async () => {
  const allPackages = await getAllPackages({
    shouldHidePrivate: true,
    shouldHideDeprecated: true,
  }).then((packages) => packages.filter(hasTokens));

  const allData = await getAllRegistryData(allPackages);

  const [data, aside] = await Promise.all([
    getDates(allPackages, allData).then(generateData),
    getAside(allPackages, allData),
  ]);

  return { data, aside };
};

const getInsight = async () => {
  const { data, aside } = await getInsightData();
  return {
    title: 'Tokens',
    data,
    aside,
  } as Insight;
};

export default getInsight;
