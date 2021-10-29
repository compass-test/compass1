import { useAnalyticsEvents } from '@atlaskit/analytics-next';
import { CompassMutationError } from '@atlassian/dragonfruit-graphql';
import { fireErrorAnalytics } from '@atlassian/error-handling';

export const useErrorAnalytics = () => {
  const { createAnalyticsEvent } = useAnalyticsEvents();

  const fireCompassMutationErrorAnalytics = (props: {
    error: CompassMutationError;
    componentName: string;
    packageName: string;
  }) => {
    const { error, componentName, packageName } = props;

    const analyticEvent = createAnalyticsEvent({});
    const errorType = error.getFirstErrorType();

    fireErrorAnalytics({
      event: analyticEvent,
      attributes: {
        errorType,
      },
      error,
      meta: { id: componentName, packageName: packageName },
    });
  };

  return { fireCompassMutationErrorAnalytics };
};
