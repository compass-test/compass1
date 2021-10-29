import { BackendSettings } from '@atlassian/proforma-common-core/jira-common-models';

export function createBackendSettings<ContextType>(
  context: ContextType,
): BackendSettings<ContextType> {
  return {
    analytics: {
      userId: 'user-id',
      hostId: 'cloud-id',
    },
    flags: {},
    urls: {
      api: 'api.url',
      jira: 'jira.url',
      templatesService: 'templatesService.url',
    },
    context: context,
  };
}
