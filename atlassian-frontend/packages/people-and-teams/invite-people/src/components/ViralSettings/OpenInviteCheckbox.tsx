import React, { useEffect, ChangeEvent } from 'react';
import { injectIntl } from 'react-intl';
import { useAnalyticsEvents } from '@atlaskit/analytics-next';
import Checkbox from '@atlaskit/checkbox';
import { FadeIn } from '@atlaskit/motion';
import {
  triggerAnalyticsForRenderUserInvitesCheckbox,
  triggerAnalyticsForClickedUserInvitesCheckbox,
} from '../analytics';
import { OpenInviteCheckboxProps } from './types';
import {
  CheckboxDescription,
  CheckboxExtendedDescription,
  CheckboxItem,
} from './styled';
import { messages } from './../i18n/messages';

export const OpenInviteCheckbox = (props: OpenInviteCheckboxProps) => {
  const { createAnalyticsEvent } = useAnalyticsEvents();
  const {
    show,
    onChange,
    checkboxTheme = 'DEFAULT',
    isChecked,
    intl: { formatMessage },
  } = props;

  useEffect(() => {
    show &&
      triggerAnalyticsForRenderUserInvitesCheckbox(
        { container: checkboxTheme, value: isChecked },
        createAnalyticsEvent,
      );
  }, [createAnalyticsEvent, show, checkboxTheme, isChecked]);

  const onChangeWrapper = (event: ChangeEvent<HTMLInputElement>) => {
    const value = event.target.checked;
    triggerAnalyticsForClickedUserInvitesCheckbox(
      { value: value, container: checkboxTheme },
      createAnalyticsEvent,
    );
    onChange(event);
  };

  if (!show) {
    return null;
  }

  return (
    <FadeIn entranceDirection="top">
      {(animationProps) => (
        <CheckboxItem theme={checkboxTheme} {...animationProps}>
          <Checkbox
            testId="testId-invite-people-viral-settings-open-invite"
            onChange={onChangeWrapper}
            isChecked={isChecked}
            label={
              <div>
                <CheckboxDescription>
                  {formatMessage(messages.openInviteDescription)}
                </CheckboxDescription>
                {checkboxTheme === 'MODAL' && (
                  <CheckboxExtendedDescription>
                    {formatMessage(messages.openInviteExtendedDescription)}
                  </CheckboxExtendedDescription>
                )}
              </div>
            }
          />
        </CheckboxItem>
      )}
    </FadeIn>
  );
};

export default injectIntl(OpenInviteCheckbox);
