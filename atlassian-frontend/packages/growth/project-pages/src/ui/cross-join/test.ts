import OriginTracing from '@atlassiansox/origin-tracing';
import { getRequestAccessUrl, getJoinProductUrl } from './utils';

const PLACEHOLDER_DOMAIN = 'http://my-atlassian-site.jira-dev.com';

const arrange = (destUrl: string) => {
  const identityUrl = new URL(`${PLACEHOLDER_DOMAIN}/${destUrl}})`);
  const identityParams = new URLSearchParams(identityUrl.search);
  const betterTogetherUrl = new URL(
    `${PLACEHOLDER_DOMAIN}/${identityParams.get('dest-url')}`,
  );
  return new URLSearchParams(betterTogetherUrl.search);
};

describe('cross-join', () => {
  const baseParams = {
    accountId: 'my-account-id',
    cloudId: '00000000-0000-0000-0000-000000000000',
    origin: new OriginTracing({ product: 'jira' }),
    sourceComponent: 'project-pages',
    sourceContext: 'project-pages',
  };
  describe('requestAccessUrl returns a properly formed cross-join url', () => {
    const params = arrange(
      getRequestAccessUrl({
        ...baseParams,
        projectKey: 'myProjectKey',
      }),
    );
    it('with base params', () => {
      expect(params.get('flow')).toBe('request-access');
      expect(params.get('cloudId')).toEqual(
        '00000000-0000-0000-0000-000000000000',
      );
      expect(params.get('accountId')).toEqual('my-account-id');
      expect(params.get('atlOrigin')).toBeDefined();
      expect(params.get('sourceComponent')).toEqual('project-pages');
      expect(params.get('sourceContext')).toEqual('project-pages');
    });
    it('with a projectKey', () => {
      expect(params.get('projectKey')).toEqual('myProjectKey');
    });
  });

  describe('getJoinProductUrl returns a properly formed cross-join url', () => {
    const projectKey = 'myProjectKey';
    const projectName = 'myProjectName';
    const blueprintModuleCompleteKey =
      'com.atlassian.confluence.plugins.confluence-business-blueprints:decisions-blueprint';

    it('projectKey and projectName params should be retrieved', () => {
      const params = arrange(
        getJoinProductUrl({
          ...baseParams,
          projectKey,
          projectName,
        }),
      );
      expect(params.get('projectKey')).toEqual('myProjectKey');
      expect(params.get('projectName')).toEqual('myProjectName');
    });

    it('a blueprintModuleCompleteKey param should be retrieved', () => {
      const paramsWithTemplate = arrange(
        getJoinProductUrl({
          ...baseParams,
          projectKey,
          projectName,
          blueprintModuleCompleteKey,
        }),
      );
      expect(paramsWithTemplate.get('blueprintModuleCompleteKey')).toEqual(
        blueprintModuleCompleteKey,
      );
      expect(paramsWithTemplate.get('createBlank')).toBe(null);
    });

    it('a createBlank param should be retrieved', () => {
      const paramsWithCreateBlank = arrange(
        getJoinProductUrl({
          ...baseParams,
          projectKey,
          projectName,
          createBlank: true,
        }),
      );
      expect(paramsWithCreateBlank.get('blueprintModuleCompleteKey')).toBe(
        null,
      );
      expect(paramsWithCreateBlank.get('createBlank')).toEqual('true');
    });
  });
});
