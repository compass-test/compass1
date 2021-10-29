import { isBrowser, isMobileOnly } from 'react-device-detect';

export function isNativeApp(): boolean {
  return !isBrowser;
}

export function isMobile(): boolean {
  return isMobileOnly;
}
