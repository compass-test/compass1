import React, { FC } from 'react';

import CustomThemeButton, {
  CustomThemeButtonProps,
} from '@atlaskit/button/custom-theme-button';
import { useCallbackWithUIEventController } from '@atlassian/mpt-analytics';

export type AnalyticsButtonProps = CustomThemeButtonProps & {
  analyticsLink?: boolean;
  analyticsId?: string;
  analyticsAttributes?: Record<string, string | number | boolean | undefined>;
};

/**
 * @deprecated AK button has splitted to three variants, Button, LoadingButton and CustomThemeButton
 * For the maximum compatability purpose, the AnalyticsButton wrap CustomThemeButton but it's not performance friendly at all.
 * Stop using AnalyticsButton and should use the Button package directly when you can
 */
const AnalyticsButton: FC<AnalyticsButtonProps> = ({
  /** @deprecated Communicate with the analytic specialist to see whether the link type is still applied. Maybe it can be replaced by using `appearance` link */
  analyticsLink = false,
  onClick = () => {},
  analyticsAttributes,
  analyticsId,
  testId,
  ...props
}) => {
  const wrappedOnClick = useCallbackWithUIEventController(onClick, {
    actionSubject: analyticsLink ? 'link' : 'button',
    actionSubjectId: analyticsId,
    attributes: analyticsAttributes,
  });

  return (
    <CustomThemeButton
      {...props}
      onClick={wrappedOnClick}
      testId={testId || analyticsId}
    />
  );
};

export default AnalyticsButton;
