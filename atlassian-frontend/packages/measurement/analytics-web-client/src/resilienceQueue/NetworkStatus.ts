import {
  NetworkStatusChangeCallback,
  NetworkStatusEnum,
} from './types';

export default class NetworkStatus {

  constructor(networkChangeCallback: NetworkStatusChangeCallback) {
    window.addEventListener('offline', () => networkChangeCallback(NetworkStatusEnum.OFFLINE));
    window.addEventListener('online', () => networkChangeCallback(NetworkStatusEnum.ONLINE));
  }

  getNetworkStatus(): NetworkStatusEnum {
    if (window.navigator.onLine) {
      return NetworkStatusEnum.ONLINE;
    }
    return NetworkStatusEnum.OFFLINE;
  }
}
