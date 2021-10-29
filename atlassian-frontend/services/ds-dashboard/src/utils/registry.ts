import { Maybe } from 'monet';

import last from 'lodash/last';
import mapValues from 'lodash/mapValues';
import pick from 'lodash/pick';

import memoize from 'lodash/memoize';

import * as cache from '../cache';

import type { Predicate } from '../types/util';
import type { PackageJSON, PackageRegistryData } from '../types/package';

import { isPublic, trimPackageJSON } from './package';

const trimRegistryData = (data: PackageRegistryData): PackageRegistryData => {
  return {
    'dist-tags': pick(data['dist-tags'], 'latest'),
    versions: mapValues(data.versions, trimPackageJSON),
    time: data.time,
  };
};

export const getRegistryData = memoize(
  async (pkg: PackageJSON): Promise<Maybe<PackageRegistryData>> => {
    if (!isPublic(pkg)) {
      return Maybe.none();
    }

    const cacheKey = `registry:${pkg.name}@${pkg.version}`;
    if (await cache.hasEntry(cacheKey)) {
      return cache.getEntry(cacheKey).then((value) => Maybe.some(value));
    }

    const registryResponse = await fetch(
      `https://registry.npmjs.org/${pkg.name}`,
    );
    const data: PackageRegistryData = await registryResponse.json();

    const trimmedData = trimRegistryData(data);

    await cache.putEntry(cacheKey, trimmedData);
    return Maybe.some(trimmedData);
  },
  (pkg: PackageJSON) => `${pkg.name}@${pkg.version}`,
);

export const getAllRegistryData = memoize(
  async (
    packages: PackageJSON[],
  ): Promise<Record<string, PackageRegistryData>> =>
    Promise.all(
      packages.map(
        async (pkg) =>
          [pkg.name, await getRegistryData(pkg)] as [
            string,
            Maybe<PackageRegistryData>,
          ],
      ),
    )
      .then((allData) =>
        allData
          .filter(([_, data]) => data.isSome())
          .map(
            ([name, data]) =>
              [name, data.some()] as [string, PackageRegistryData],
          ),
      )
      .then(Object.fromEntries),
  (packages: PackageJSON[]) =>
    packages.map((pkg) => `${pkg.name}@${pkg.version}`).join('-'),
);

export const getLatestPublishedVersion = (data: PackageRegistryData) => {
  const version = data['dist-tags'].latest;
  const time = data.time[version];
  return { version, time };
};

export const findLatestVersion = (predicate: Predicate<PackageJSON>) => (
  data: PackageRegistryData,
): Maybe<string> => {
  const matchingVersions = Object.entries(data.versions).filter(([_, pkg]) =>
    predicate(pkg),
  );
  return Maybe.fromUndefined(last(matchingVersions)?.[0]);
};

export const findEarliestVersion = (predicate: Predicate<PackageJSON>) => (
  data: PackageRegistryData,
): Maybe<string> => {
  const matchingVersions = Object.entries(data.versions).filter(([_, pkg]) =>
    predicate(pkg),
  );
  return Maybe.fromUndefined(matchingVersions[0]?.[0]);
};

/**
 * Returns a UTC date string of when the package was first
 * published to npm.
 */
export const getDateCreated = ({ time }: PackageRegistryData) => time.created;

/**
 * Returns a UTC date string of when the most recent version
 * was published to npm.
 */
export const getDateModified = ({ time }: PackageRegistryData) => time.modified;
