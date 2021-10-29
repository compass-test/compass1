import { GasV3Payload } from './analytics-helpers/types';

const version = process.env._PACKAGE_VERSION_;

export const crossFlowSupportAttributes = {
  version,
};

export const enrichWithPackageDetails = (event: GasV3Payload): GasV3Payload => {
  const attributes = {
    ...(event.attributes || {}),
    crossFlowSupport: crossFlowSupportAttributes,
  };
  return { ...event, attributes };
};
