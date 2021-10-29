import { createAndFireEvent } from '@atlaskit/analytics-next';
import { OptionType } from '@atlaskit/select';

import { SmartAnalyticsEvent } from './types';
import {
  getOptionIdsForAnalytics,
  getOptionsLengths,
  getSafeOptionsForAnalytics,
  hashString,
  isGrouped,
} from './utils';

const createAndFireEventInElementsChannel = createAndFireEvent(
  'fabric-elements',
);

const fireEvent = (event: SmartAnalyticsEvent<OptionType>) => {
  const {
    action,
    actionSubject,
    additionalAttributes,
    containerId,
    eventType,
    principalId,
  } = event;
  const elapsedTime = event.sessionStartedAt
    ? performance.now() - event.sessionStartedAt
    : 0;
  if (event.createAnalyticsEvent) {
    const payload = {
      action,
      actionSubject,
      eventType,
      userId: principalId,
      containerId,
      attributes: {
        ...additionalAttributes,
        ...getDefaultAnalyticsAttributes(event),
        elapsedTime,
      },
    };
    createAndFireEventInElementsChannel(payload)(event.createAnalyticsEvent);
  }
};

const getDefaultAnalyticsAttributes = (
  event: SmartAnalyticsEvent<OptionType>,
) => {
  const {
    fieldId,
    componentName,
    hashKey,
    query,
    isLoading,
    journeyId,
    packageName,
    packageVersion,
    principalId,
    options,
    product,
    selectedOptions,
    sessionId,
    tenantId,
  } = event;
  const MAX_OPTIONS = 19;

  const trimmedOptions = options.slice(0, MAX_OPTIONS);
  const trimmedSelectedOptions = selectedOptions.slice(0, MAX_OPTIONS);

  return {
    fieldId,
    componentName,
    isLoading,
    groupingSize: isGrouped(options) ? options?.length : 0,
    journeyId,
    packageName,
    packageVersion,
    product,
    options: getSafeOptionsForAnalytics(
      hashKey || tenantId,
      trimmedOptions,
      !!event.requiresHashing,
    ),
    optionsLengths: getOptionsLengths(options),
    optionIds: getOptionIdsForAnalytics(
      hashKey || tenantId,
      trimmedOptions,
      !!event.requiresHashing,
    ),
    optionValuesSafeForAnalytics: !event.requiresHashing,
    queryLength: event.query?.length,
    queryHash: hashString(hashKey || tenantId, query),
    selectedOptions: getSafeOptionsForAnalytics(
      hashKey || tenantId,
      trimmedSelectedOptions,
      !!event.requiresHashing,
    ),
    selectedOptionIds: getOptionIdsForAnalytics(
      hashKey || tenantId,
      trimmedSelectedOptions,
      !!event.requiresHashing,
    ),
    selectedOptionsLengths: getOptionsLengths(selectedOptions),
    sessionId,
    tenantId,
    userId: principalId,
  };
};

export default fireEvent;
