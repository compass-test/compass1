
import {
  Environment, XID, XIDItem, XIDItemType, XIDState
} from '@atlassian/atl-cross-domain-tracking/dist/esm';

import { envType } from './analyticsWebTypes';

const mapAWCEnvironmentToXid = (productEnvironment: string): Environment | undefined => {
  switch (productEnvironment) {
    case envType.DEV:
      return <Environment.DEV>'dev';
    case envType.LOCAL:
      return <Environment.LOCAL>'local';
    case envType.PROD:
      return <Environment.PROD>'prod';
    case envType.STAGING:
      return <Environment.STAGE>'stage';
    default:
      // eslint-disable-next-line no-console
      console.warn('Unexpected Product Environment provided.');
      return undefined;
  }
}

export type XIDCallback = () => XIDItem[];
export type DeferredXIDPromise = () => Promise<XIDCallback>;

const timeoutXidCallback: XIDCallback = () => [
  { type: XIDItemType.XC, state: 'TIMEOUT' as XIDState.TIMEOUT },
  { type: XIDItemType.UID, state: 'TIMEOUT' as XIDState.TIMEOUT },
];

export const unknownXidCallback: XIDCallback = () => [
  { type: XIDItemType.XC, state: 'UNKNOWN' as XIDState.UNKNOWN },
  { type: XIDItemType.UID, state: 'UNKNOWN' as XIDState.UNKNOWN },
];

const XID_TIMEOUT: number = 5000;

export const XIDPromise = (awcProductEnvironment: string, xidConsent?: boolean): Promise<XIDCallback> | undefined => {
  const xidProductEnvironment = mapAWCEnvironmentToXid(awcProductEnvironment);

  if (xidProductEnvironment && xidConsent) {
    const timeoutPromise: DeferredXIDPromise = () => {
      return new Promise(resolve => {
        setTimeout(() => resolve(timeoutXidCallback), XID_TIMEOUT);
      });
    }

    const xidPromise: DeferredXIDPromise = () => {
      return new XID(xidProductEnvironment, XID_TIMEOUT)
        .getXidCallbackForPromise()
        .catch(() => unknownXidCallback);
    }

    return Promise.race([xidPromise(), timeoutPromise()]);
  }

  return undefined;
}
