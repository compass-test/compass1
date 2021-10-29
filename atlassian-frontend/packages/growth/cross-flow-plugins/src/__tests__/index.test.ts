import {
  createGetContainersPlugin,
  createGetUsersPlugin,
  createGetSuggestedSiteNamesPlugin,
  createGetAvailableSitesPlugin,
} from '../index';
import { PluginTypes, ContainerTypes } from '../types';

describe('createGetContainersPlugin', () => {
  it('should return the GetContainers name and provided fetch method', () => {
    const fetchContainers = () =>
      Promise.resolve({
        type: ContainerTypes.BITBUCKET_WORKSPACE,
        containers: [],
      });
    const ContainerPlugin = createGetContainersPlugin(fetchContainers);
    const expected = [PluginTypes.GetContainers, fetchContainers];
    expect(ContainerPlugin).toEqual(expected);
  });
});

describe('createGetUsersPlugin', () => {
  it('should return the GetUsers name and provided fetch method', () => {
    const fetchUsers = () => Promise.resolve([]);
    const UsersPlugin = createGetUsersPlugin(fetchUsers);
    const expected = [PluginTypes.GetUsers, fetchUsers];
    expect(UsersPlugin).toEqual(expected);
  });
});

describe('createGetSuggestedSiteNamesPlugin', () => {
  it('should return the GetSuggestedSiteNames name and provided fetch method', () => {
    const fetchSuggestedSiteNames = () => Promise.resolve([]);
    const SuggestedSiteNamesPlugin = createGetSuggestedSiteNamesPlugin(
      fetchSuggestedSiteNames,
    );
    const expected = [
      PluginTypes.GetSuggestedSiteNames,
      fetchSuggestedSiteNames,
    ];
    expect(SuggestedSiteNamesPlugin).toEqual(expected);
  });
});

describe('createGetAvailableSitesPlugin', () => {
  it('should return the createGetAvailableSites name and provided fetch method', () => {
    const fetchAvailableSites = () => Promise.resolve({ sites: [] });
    const GetAvailableSitesPlugin = createGetAvailableSitesPlugin(
      fetchAvailableSites,
    );
    const expected = [PluginTypes.GetAvailableSites, fetchAvailableSites];
    expect(GetAvailableSitesPlugin).toEqual(expected);
  });
});
