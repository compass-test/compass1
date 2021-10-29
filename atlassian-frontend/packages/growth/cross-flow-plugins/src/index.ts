import {
  DataPluginImplementationType,
  GetContainersDataPlugin,
  GetUsersDataPlugin,
  GetSuggestedSiteNamesPlugin,
  GetAvailableSitesPlugin,
  PluginTypes,
} from './types';

export const createGetContainersPlugin = (
  fetch: DataPluginImplementationType<GetContainersDataPlugin>,
): GetContainersDataPlugin => {
  return [PluginTypes.GetContainers, fetch];
};

export const createGetUsersPlugin = (
  fetch: DataPluginImplementationType<GetUsersDataPlugin>,
): GetUsersDataPlugin => {
  return [PluginTypes.GetUsers, fetch];
};

export const createGetSuggestedSiteNamesPlugin = (
  fetch: DataPluginImplementationType<GetSuggestedSiteNamesPlugin>,
): GetSuggestedSiteNamesPlugin => {
  return [PluginTypes.GetSuggestedSiteNames, fetch];
};

export const createGetAvailableSitesPlugin = (
  fetch: DataPluginImplementationType<GetAvailableSitesPlugin>,
): GetAvailableSitesPlugin => {
  return [PluginTypes.GetAvailableSites, fetch];
};

export { PluginTypes, ContainerTypes, UserIdTypes } from './types';
export type {
  PluginCollection,
  GetContainersDataPlugin,
  GetUsersDataPlugin,
  GetSuggestedSiteNamesPlugin,
  GetAvailableSitesPlugin,
  ContainerData,
  ContainerList,
  UserData,
  SuggestedSiteNamesData,
  AvailableSitesResponse,
} from './types';
