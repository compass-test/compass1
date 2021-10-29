import { ATLASSIAN_ID_REQUIRED_ERROR_MESSAGE } from '../../common/constants';
import { IntegrationsDataMap } from '../../common/types';
import {
  getIntegrations,
  getIntegrationsInstallRequestStatus,
  getIntegrationsInstallStatus,
} from '../integrations';

// onUserSegError is an optional callback that is called if there is an error retrieving the teamType from getManageProfile
// It is passed the Error object from the catch
export const getIntegrationsData = async (
  fetchInstallRequestStatus: boolean = false,
  productName: string,
  cloudId: string,
  aaid: string | null,
  onUserSegError?: (err: Error) => void,
) => {
  // prevent fetch if no atlassian account id
  if (!aaid) {
    throw new Error(ATLASSIAN_ID_REQUIRED_ERROR_MESSAGE);
  }
  const integrationsKeys = await getIntegrations(aaid, onUserSegError);

  const installStatusesMap: IntegrationsDataMap = await getIntegrationsInstallStatus(
    integrationsKeys,
  );

  if (fetchInstallRequestStatus) {
    const notInstalledIntegrations = Object.keys(installStatusesMap).filter(
      (key) => installStatusesMap[key].installed === false,
    );

    const requestsStatus = await getIntegrationsInstallRequestStatus(
      notInstalledIntegrations,
      productName,
      cloudId,
      aaid,
    );

    requestsStatus.forEach((status) => {
      installStatusesMap[status.key].requested = status.requested;
    });
  }

  return Object.values(installStatusesMap);
};
