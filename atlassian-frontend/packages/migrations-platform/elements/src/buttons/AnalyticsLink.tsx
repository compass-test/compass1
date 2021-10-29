import React, { forwardRef, HTMLProps } from 'react';

import { useCallbackWithAnalyticsController } from '@atlassian/mpt-analytics';

export type Props = HTMLProps<HTMLAnchorElement> & {
  analyticsAttributes?: Record<string, string | number | boolean | undefined>;
  analyticsId?: string;
  testId?: string;
};

/**
 * @deprecated we should use `<a />` directly in the products
 * Extend <a> component to accept analytics attributes
 * When link if clicked, a "button clicked" event is fired.
 */
export const AnalyticsLink = forwardRef<HTMLAnchorElement, Props>(
  (
    {
      analyticsId = '',
      analyticsAttributes,
      testId,
      children,
      onClick = () => {},
      ...props
    },
    ref,
  ) => {
    const wrappedOnClick = useCallbackWithAnalyticsController(onClick, {
      eventType: 'UI',
      action: 'clicked',
      actionSubject: 'button',
      actionSubjectId: analyticsId,
      attributes: analyticsAttributes,
    });

    // I'm not sure whether the behaviour that
    // "if analyticsId is undefined then should not firing the event"
    // is still valid in the new `analytics-next` context
    return (
      <a
        {...props}
        ref={ref}
        data-testid={testId}
        onClick={analyticsId === '' ? onClick : wrappedOnClick}
      >
        {children}
      </a>
    );
  },
);

export default AnalyticsLink;
