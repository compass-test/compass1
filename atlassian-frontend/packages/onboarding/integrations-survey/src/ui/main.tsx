import React, { useEffect, useMemo, useState } from 'react';

import { AnalyticsContext, useAnalyticsEvents } from '@atlaskit/analytics-next';
import { ButtonGroup } from '@atlaskit/button';
import LoadingButton from '@atlaskit/button/loading-button';
import { Checkbox } from '@atlaskit/checkbox';

import {
  getIntegrationRequestedSuccessfulEventDetails,
  isConnectOnlyIntegration,
} from '../common/utils';
import {
  createUserSegmentationBasedIntegrationList,
  saveIntegrationListToLocalStorage,
  sendIntegrationsInstallRequests,
} from '../services/integrations';
import { defaultIntegrationKeys } from '../services/integrations/constants';
import {
  name as packageName,
  version as packageVersion,
} from '../version.json';

import { IntegrationPicker } from './integration-picker';
import {
  ButtonsFooter,
  CheckboxContainer,
  IntegrationPickerContainer,
  IntegrationPickerFlexWrapper,
  IntegrationSurveyContainer,
} from './styled';
import {
  AnalyticsEventWithType,
  CheckBoxGroupProps,
  IntegrationsSurveyPresentationalProps,
  IntegrationsSurveyProps,
} from './types';
import {
  getAllIntegrationInstallRequestSettledDurationEvent,
  getDefaultSelectedIntegrationMap,
  getInstallRequestCheckboxToggledEvent,
  getIntegrationPickerClickedEvent,
  getIntegrationRequestedApiErrorEvent,
  getIsNextButtonDisabled,
  getNextButtonClickedEvent,
  getSelectedIntegrationList,
  getSkipButtonClickedEvent,
} from './utils';

export const IntegrationsSurvey = ({
  onUserSegError,
  ...commonProps
}: IntegrationsSurveyProps) => {
  const [integrationList, setIntegrationList] = useState<string[]>([]);

  useEffect(() => {
    const getData = async () => {
      const userSegmentationBasedIntegrationList = await createUserSegmentationBasedIntegrationList(
        onUserSegError,
      );

      if (userSegmentationBasedIntegrationList) {
        setIntegrationList(userSegmentationBasedIntegrationList);
      } else {
        setIntegrationList(defaultIntegrationKeys);
      }
    };
    getData();
  }, [onUserSegError]);

  if (integrationList.length < 1) {
    return null;
  }

  return (
    <AnalyticsContext data={{ attributes: { packageName, packageVersion } }}>
      <IntegrationsSurveyPresentational
        {...commonProps}
        integrationList={integrationList}
      />
    </AnalyticsContext>
  );
};

const CheckBoxGroup = ({
  testId,
  isChecked,
  setIsChecked,
  createAnalyticsEvent,
  sendProductAnalytics,
  checkboxLabel,
}: CheckBoxGroupProps) => {
  const onChange = () => {
    const isCheckedAfterClick = !isChecked;
    setIsChecked(isCheckedAfterClick);
    const installRequestCheckboxToggled = getInstallRequestCheckboxToggledEvent(
      createAnalyticsEvent,
      isCheckedAfterClick,
    );
    sendProductAnalytics(installRequestCheckboxToggled);
  };

  return (
    <CheckboxContainer>
      <Checkbox
        testId={testId ? `${testId}-request-to-admin-checkbox` : undefined}
        isChecked={isChecked}
        onChange={onChange}
        label={checkboxLabel}
      />
    </CheckboxContainer>
  );
};

export const IntegrationsSurveyPresentational = ({
  integrationList,
  productName,
  baseUrl,
  cloudId,
  aaid,
  skipButtonLabel = 'Skip',
  skipButtonHandler,
  nextButtonLabel = 'Next',
  nextButtonHandler,
  checkboxLabel = 'Notify your admin about these tools',
  checkboxDefaultValue = false,
  fireAnalytics,
  isSiteAdmin = false,
  testId,
  onMount,
}: IntegrationsSurveyPresentationalProps) => {
  const { createAnalyticsEvent } = useAnalyticsEvents();

  useEffect(() => {
    if (typeof onMount !== 'function') {
      return;
    }

    onMount(integrationList);
  }, [integrationList, onMount]);

  // Integration selection state
  const defaultSelectedIntegrationMap = useMemo(
    () => getDefaultSelectedIntegrationMap(integrationList),
    [integrationList],
  );
  const [selectedIntegration, setSelectedIntegration] = useState({
    map: defaultSelectedIntegrationMap,
  });

  // Checkbox state
  const [isChecked, setIsChecked] = useState(checkboxDefaultValue);

  const sendProductAnalytics = ({
    analyticsEvent,
    eventType,
  }: AnalyticsEventWithType) =>
    fireAnalytics(analyticsEvent, eventType, analyticsEvent.payload);

  // Button state
  const [isNextButtonDisabled, setIsNextButtonDisabled] = useState(
    getIsNextButtonDisabled(selectedIntegration.map),
  );

  const [isSkipButtonDisabled, setIsSkipButtonDisabled] = useState(false);

  const [isNextButtonLoading, setIsNextButtonLoading] = useState(false);

  const nextButtonOnClick = async () => {
    setIsNextButtonLoading(true);
    setIsSkipButtonDisabled(true);

    const selectedIntegrationList = getSelectedIntegrationList(
      selectedIntegration.map,
    );

    if (!isSiteAdmin && isChecked && !isNextButtonDisabled) {
      // KURO-712: Integrations that can be requested for "install" (anything but Slack right now).
      const selectedInstallableIntegrationList = selectedIntegrationList.filter(
        (key) => !isConnectOnlyIntegration(key),
      );

      if (selectedInstallableIntegrationList.length > 0) {
        const startTime = new Date().getTime();

        const results = await sendIntegrationsInstallRequests({
          productName,
          baseUrl,
          cloudId,
          aaid,
          integrationList: selectedInstallableIntegrationList,
        });

        // KURO-712 send event to track duration of sendIntegrationsInstallRequests
        const duration = new Date().getTime() - startTime;
        const durationEvent = getAllIntegrationInstallRequestSettledDurationEvent(
          createAnalyticsEvent,
          selectedInstallableIntegrationList,
          duration,
        );
        fireAnalytics(
          durationEvent.analyticsEvent,
          durationEvent.eventType,
          durationEvent.analyticsEvent.payload,
        );

        // KURO-712 send track event for successful requests
        let hasError = false;
        results.forEach((result, i) => {
          if (result.status === 'fulfilled') {
            const appRequestedEventDetails = getIntegrationRequestedSuccessfulEventDetails(
              // Note: part of the source should be depending on the product used.
              'jiraOnboarding',
              selectedInstallableIntegrationList[i],
            );
            const appRequestedAnalyticsEvent = createAnalyticsEvent(
              appRequestedEventDetails.payload,
            );
            sendProductAnalytics({
              analyticsEvent: appRequestedAnalyticsEvent,
              eventType: appRequestedEventDetails.eventType,
            });
          } else {
            // We do not try to find out which specific request failed.
            hasError = true;
          }
        });

        if (hasError) {
          const integrationRequestedApiErrorEvent = getIntegrationRequestedApiErrorEvent(
            createAnalyticsEvent,
            selectedInstallableIntegrationList,
          );
          sendProductAnalytics(integrationRequestedApiErrorEvent);
          setIsNextButtonLoading(false);
          setIsSkipButtonDisabled(false);
        }

        // Loading is not set to false if there is no error with sending the installation request. This is to ensure the button is only clicked once.
      }
    }

    if (selectedIntegrationList.length > 0 && aaid) {
      saveIntegrationListToLocalStorage(aaid, selectedIntegrationList);
    }

    if (typeof nextButtonHandler !== 'function') {
      return;
    }

    const nextButtonEvent = getNextButtonClickedEvent(
      createAnalyticsEvent,
      selectedIntegrationList,
      isChecked,
    );
    sendProductAnalytics(nextButtonEvent);
    // The analyticsEvent is passed to the handler in case it is desired to fire more than just an UI event
    nextButtonHandler(nextButtonEvent.analyticsEvent);
  };

  const skipButtonOnClick = () => {
    // Skip should only be allowed to be clicked once
    setIsSkipButtonDisabled(true);
    setIsNextButtonDisabled(true);

    if (typeof skipButtonHandler !== 'function') {
      return;
    }

    const skipButtonEvent = getSkipButtonClickedEvent(createAnalyticsEvent);
    sendProductAnalytics(skipButtonEvent);
    // The analyticsEvent is passed to the handler in case it is desired to fire more than just an UI event
    skipButtonHandler(skipButtonEvent.analyticsEvent);
  };

  const pickerOnChangeActions = ({
    isSelected,
    integration,
  }: {
    isSelected: boolean;
    integration: string;
  }) => {
    const isSelectedAfterClick = !isSelected;
    selectedIntegration.map.set(integration, isSelectedAfterClick);
    setSelectedIntegration({
      map: selectedIntegration.map,
    });

    setIsNextButtonDisabled(getIsNextButtonDisabled(selectedIntegration.map));
    const integrationPickerClickedEvent = getIntegrationPickerClickedEvent(
      createAnalyticsEvent,
      integration,
      isSelectedAfterClick,
    );
    sendProductAnalytics(integrationPickerClickedEvent);
  };

  return (
    <IntegrationSurveyContainer data-testid={testId}>
      <IntegrationPickerContainer>
        {integrationList.map((integration) => {
          const isSelected = selectedIntegration.map.get(integration);

          return (
            <IntegrationPickerFlexWrapper key={integration}>
              <IntegrationPicker
                id={integration}
                isSelected={isSelected}
                onChange={() => {
                  pickerOnChangeActions({ isSelected, integration });
                }}
              />
            </IntegrationPickerFlexWrapper>
          );
        })}
      </IntegrationPickerContainer>
      {!isSiteAdmin && (
        <CheckBoxGroup
          // Note: this is used in the unit test, we should update the name
          // as it gives us duplicate test ids now.
          testId={testId}
          isChecked={isChecked}
          setIsChecked={setIsChecked}
          createAnalyticsEvent={createAnalyticsEvent}
          sendProductAnalytics={sendProductAnalytics}
          checkboxLabel={checkboxLabel}
        />
      )}
      <ButtonsFooter>
        <ButtonGroup>
          <LoadingButton
            appearance="subtle"
            onClick={skipButtonOnClick}
            isDisabled={isSkipButtonDisabled}
            testId="integrations-survey-presentational-skip-button"
          >
            {skipButtonLabel}
          </LoadingButton>
          <LoadingButton
            appearance="primary"
            onClick={nextButtonOnClick}
            isDisabled={isNextButtonDisabled}
            isLoading={isNextButtonLoading}
            testId="integrations-survey-presentational-next-button"
          >
            {nextButtonLabel}
          </LoadingButton>
        </ButtonGroup>
      </ButtonsFooter>
    </IntegrationSurveyContainer>
  );
};
