import { EXISTS_STATUS_CODE } from '../../common/constants';
import { getInstallStatusUrlForIntegrationKey } from '../../common/utils';

export const isIntegrationInstalled = (result: Response) =>
  result.status === EXISTS_STATUS_CODE;

export const makeInstallStatusPromises = (integrationsKeys: string[]) =>
  integrationsKeys.map((integrationKey) =>
    fetch(getInstallStatusUrlForIntegrationKey(integrationKey)),
  );

export const INTEGRATION_LIST_LOCAL_STORAGE_KEY = (aaid: string) =>
  `integration-survey.${aaid}.integrations-keys`;
