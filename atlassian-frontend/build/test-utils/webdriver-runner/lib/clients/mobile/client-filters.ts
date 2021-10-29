import { MobileTestCaseOptions } from '../../../types';

export type ClientsFilter = (
  options: MobileTestCaseOptions,
) => (client: any) => boolean;

export const filterClientsByPlatform: ClientsFilter = (
  skipOptions: MobileTestCaseOptions,
) => (client: any) => {
  const { skipPlatform } = skipOptions || {};
  if (!client || !skipOptions || !skipPlatform || !skipPlatform.length) {
    // When unspecified don't filter out.
    return true;
  }
  const { os } = client.options.capabilities;
  const shouldSkipPlatform = skipPlatform.some(
    platform => os.toLowerCase() === platform.toLowerCase(),
  );
  return !shouldSkipPlatform;
};

export const filterClientsByPlatformVersion: ClientsFilter = (
  skipOptions: MobileTestCaseOptions,
) => (client: any) => {
  const { versions } = skipOptions || {};
  if (
    !client ||
    !skipOptions ||
    !versions ||
    !versions.length ||
    // It's expected that default gets replaced before being passed into this method
    (versions.length === 1 && versions.includes('DEFAULT'))
  ) {
    // When unspecified don't filter out.
    return true;
  }
  const { capabilities } = client.options;
  const { os, os_version: osVersion } = capabilities;

  let d = osVersion.indexOf('.');
  const majorOsVersion = d !== -1 ? osVersion.substr(0, d) : osVersion;

  const shouldIncludeVersion = versions
    // It's expected that default gets replaced before being passed into this method
    .filter(version => version !== 'DEFAULT')
    // Filter based on version
    .some(target => {
      const [platform, version] = target.split(' ');
      d = version.indexOf('.');
      const majorOpIntVersion = d !== -1 ? version.substr(0, d) : version;
      const isSameOS = os.toLowerCase() === platform.toLowerCase();
      const isSameMajorVersion = majorOsVersion === majorOpIntVersion;
      return isSameOS && isSameMajorVersion;
    });
  return shouldIncludeVersion;
};

export const filterClientsByFormFactor: ClientsFilter = (
  skipOptions: MobileTestCaseOptions,
) => (client: any) => {
  const { formFactors } = skipOptions || {};
  if (!client || !skipOptions || !formFactors || !formFactors.length) {
    // When unspecified don't filter out.
    return true;
  }
  const { device_form_factor: formFactor } = client.options.capabilities;
  const shouldIncludeFormFactor = formFactors.some(type => type === formFactor);
  return shouldIncludeFormFactor;
};

export const filterClientsByKeyboard: ClientsFilter = (
  skipOptions: MobileTestCaseOptions,
) => (client: any) => {
  const { keyboards } = skipOptions || {};
  if (!client || !skipOptions || !keyboards || !keyboards.length) {
    // When unspecified don't filter out.
    return true;
  }
  const { device_keyboard: keyboard } = client.options.capabilities;
  const shouldIncludeKeyboard = keyboards.some(kb => kb === keyboard);
  return shouldIncludeKeyboard;
};
