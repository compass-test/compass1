import { GasV3Payload } from './analytics-helpers/types';
import { Options } from '@atlassiansox/cross-flow-api-internals';

export const enrichWithRequestOptions = (
  event: GasV3Payload,
  requestOptions?: Options,
): GasV3Payload => {
  if (!requestOptions) {
    return event;
  }

  const attributes = {
    ...(event.attributes || {}),
    sourceComponent: requestOptions.sourceComponent,
    sourceContext: requestOptions.sourceContext,
  };
  return { ...event, attributes };
};
