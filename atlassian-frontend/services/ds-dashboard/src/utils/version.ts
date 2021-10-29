import { Maybe } from 'monet';

import * as packageUtils from './package';

import type { PackageRegistryData } from '../types/package';

export const getVersionReleaseDate = (version: string) => (
  data: PackageRegistryData,
): Maybe<string> => Maybe.fromUndefined(data.time[version]);

export const getVersion = (version: string) => ({
  versions,
}: PackageRegistryData) => Maybe.fromUndefined(versions[version]);

export const isLiteModed = (version: string) => (data: PackageRegistryData) =>
  getVersion(version)(data).map(packageUtils.isLiteModed);

export const getStyling = (version: string) => (data: PackageRegistryData) =>
  getVersion(version)(data).chain(packageUtils.getStyling);

export const getTheming = (version: string) => (data: PackageRegistryData) =>
  getVersion(version)(data).chain(packageUtils.getTheming);

export const getDocumentation = (version: string) => (
  data: PackageRegistryData,
) => getVersion(version)(data).chain(packageUtils.getDocumentation);

export const isLaterVersionThan = (version: string) => (pkg: {
  version: string;
}) => {
  return pkg.version < version;
};

export const getVersionAfter = (version: string) => (
  data: PackageRegistryData,
): Maybe<string> => {
  const allVersions = Object.keys(data.versions);
  const index = allVersions.indexOf(version);
  return Maybe.fromUndefined(allVersions[index + 1]);
};
