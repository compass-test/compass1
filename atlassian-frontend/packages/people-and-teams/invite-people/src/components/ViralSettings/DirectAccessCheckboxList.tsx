import React, { Fragment, ChangeEvent, useEffect, ReactNode } from 'react';
import { injectIntl, FormattedMessage } from 'react-intl';
import { useAnalyticsEvents } from '@atlaskit/analytics-next';
import Checkbox from '@atlaskit/checkbox';
import { FadeIn } from '@atlaskit/motion';
import {
  triggerAnalyticsForRenderDirectAccessCheckbox,
  triggerAnalyticsForClickedDirectAccessCheckbox,
} from '../analytics';
import { DirectAccessCheckboxListProps } from './types';
import {
  CheckboxDescription,
  CheckboxExtendedDescription,
  CheckboxItem,
} from './styled';
import { messages } from './../i18n/messages';
import { ViralSettingsByDomain } from './types';

const CheckboxWithAnalytics = ({
  children,
  domain,
  value,
  container,
}: {
  children: ReactNode;
  domain: string;
  value: boolean;
  container: string;
}) => {
  const { createAnalyticsEvent } = useAnalyticsEvents();

  useEffect(() => {
    triggerAnalyticsForRenderDirectAccessCheckbox(
      { domain, container, value },
      createAnalyticsEvent,
    );
  }, [createAnalyticsEvent, domain, container, value]);

  return <Fragment>{children}</Fragment>;
};

export const DirectAccessCheckboxList = (
  props: DirectAccessCheckboxListProps,
) => {
  const { createAnalyticsEvent } = useAnalyticsEvents();
  const {
    viralSettingsByDomain,
    checkboxTheme = 'DEFAULT',
    onChange,
    intl: { formatMessage },
  } = props;

  const onChangeWrapper = (
    updatedViralSettingsByDomain: ViralSettingsByDomain,
    domain: string,
  ) => {
    triggerAnalyticsForClickedDirectAccessCheckbox(
      {
        value: updatedViralSettingsByDomain[domain].isChecked,
        domain,
        container: checkboxTheme,
      },
      createAnalyticsEvent,
    );
    onChange(updatedViralSettingsByDomain);
  };

  return (
    <Fragment>
      {Object.keys(viralSettingsByDomain)
        .filter((domain) => viralSettingsByDomain[domain].desPromotionEligible)
        .map((domain) => {
          const value = !!viralSettingsByDomain?.[domain].isChecked;
          return (
            <FadeIn
              entranceDirection="top"
              key={`viral-settings-direct-access-checkbox-fade-in${domain}`}
            >
              {(animationProps) => (
                <CheckboxWithAnalytics
                  domain={domain}
                  value={value}
                  container={checkboxTheme}
                >
                  <CheckboxItem theme={checkboxTheme} {...animationProps}>
                    <Checkbox
                      testId={`testId-invite-people-viral-settings-direct-access-${domain}`}
                      key={`viral-settings-direct-access-checkbox-${domain}`}
                      isChecked={value}
                      onChange={(e: ChangeEvent<HTMLInputElement>) => {
                        onChangeWrapper(
                          {
                            ...viralSettingsByDomain,
                            [domain]: {
                              ...viralSettingsByDomain[domain],
                              isChecked: e.target.checked,
                            },
                          },
                          domain,
                        );
                      }}
                      label={
                        <div>
                          <CheckboxDescription>
                            <FormattedMessage
                              {...messages.directAccessDescription}
                              values={{ domainWithStyling: <b>@{domain}</b> }}
                            />
                          </CheckboxDescription>
                          {checkboxTheme === 'MODAL' && (
                            <CheckboxExtendedDescription>
                              {formatMessage(
                                messages.directAccessExtendedDescription,
                              )}
                            </CheckboxExtendedDescription>
                          )}
                        </div>
                      }
                    />
                  </CheckboxItem>
                </CheckboxWithAnalytics>
              )}
            </FadeIn>
          );
        })}
    </Fragment>
  );
};

export default injectIntl(DirectAccessCheckboxList);
