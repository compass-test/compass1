import React, { useEffect, useState, useCallback, useRef } from 'react';
import { useAnalyticsEvents } from '@atlaskit/analytics-next';
import {
  triggerAnalyticsForGetDirectAccessSettingSucceeded,
  triggerAnalyticsForGetDirectAccessSettingFailure,
  triggerAnalyticsForGetUserInvitesSettingsSucceeded,
  triggerAnalyticsForGetUserInvitesSettingsFailure,
  triggerAnalyticsForHISIFlagFetchFailed,
  triggerAnalyticsForHISIFlagFetched,
  qualifiesForViralSettings,
} from '../analytics';
import {
  RejectedResult,
  FulfilledResult,
  makeAri,
  waitForAllPromises,
} from '../../utils';
import { ViralSettingsProps } from './types';
import {
  defaultInviteApiClient,
  defaultOpenInviteClient,
  defaultHaveISeenItClient,
  createHISIDomainFlagKey,
  createHISIOpenInviteFlagKey,
} from '../../clients';
import {
  ViralSettingsByDomain,
  ViralSettingsByDomainValue,
  ViralSettingsByDomainValueObject,
  GetDirectAccessSettingRequest,
  GetDirectAccessSettingSuccessResponse,
  GetDirectAccessSettingSuccessResponseValue,
  GetDirectAccessSettingFailureResponse,
  GetOpenInviteInfo,
  ViralSettingsHookProps,
  GetFlagResponse,
} from '../../types';
import ViralSettingsComponent from './ViralSettingsComponent';
import {
  createViralSettingsMapWithDefaultValues,
  getDomainFromResults,
  getGetDirectAccessSettingSuccessResponses,
  createViralSettingMap,
  getViralSettingsByDomainValueObjectFromResponse,
} from './utils';
const EMPTY_DOMAINS = {};

// Custom Hook that keeps track of all data required for the viral settings experiments.
export const useViralSettings = (props: ViralSettingsHookProps) => {
  const {
    domains,
    cloudId,
    productId,
    products,
    viralSettingsCohort,
    viralOptionsDefaultToCheckedFeatureFlagEnabled,
    role,
    focusedSelect,
    selectEnabled,
  } = props;
  const { createAnalyticsEvent } = useAnalyticsEvents();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [enableOpenInvite, setEnableOpenInvite] = useState<boolean>(false);
  const hasSetEnableOpenInvite = useRef<boolean>(false);

  const [showViralSettings, setShowViralSettings] = useState<boolean>(false);
  const [showOpenInvite, setShowOpenInvite] = useState<boolean>(false);
  const [viralSettingsByDomain, setViralSettingsByDomain] = useState<
    ViralSettingsByDomain
  >({});
  const product = products && products.length === 1 ? products[0] : productId;
  // Async function getting the current Open Invite state
  const getUserInvitesSetting = useCallback(
    async (product: string, cloudId: string) => {
      const ari = makeAri(product, cloudId);
      try {
        const {
          response,
          cached,
        } = await defaultOpenInviteClient.getOpenInviteState(product, cloudId);
        if (!cached) {
          triggerAnalyticsForGetUserInvitesSettingsSucceeded(
            ari,
            createAnalyticsEvent,
          );
        }
        return response;
      } catch (err) {
        triggerAnalyticsForGetUserInvitesSettingsFailure(
          ari,
          createAnalyticsEvent,
        );
      }
    },
    [createAnalyticsEvent],
  );
  // Async function to get the DES settings for a specific domain.
  const getDirectAccessEligibility = useCallback(
    async (
      request: GetDirectAccessSettingRequest,
    ): Promise<undefined | GetDirectAccessSettingSuccessResponseValue> => {
      const response = await defaultInviteApiClient.getDirectAccessSetting(
        request,
      );

      if ((response as GetDirectAccessSettingFailureResponse).errorMessage) {
        triggerAnalyticsForGetDirectAccessSettingFailure(
          request,
          createAnalyticsEvent,
        );
        return undefined;
      }

      const {
        response: successResponse,
        cached,
      } = response as GetDirectAccessSettingSuccessResponse;
      if (!cached) {
        triggerAnalyticsForGetDirectAccessSettingSucceeded(
          request,
          createAnalyticsEvent,
        );
      }
      return {
        ...successResponse,
        desPromotionEligible: successResponse?.desPromotionEligible
          ? successResponse.desPromotionEligible
          : false,
      };
    },
    [createAnalyticsEvent],
  );
  // Function to call all the settings (open invite and DES for each domain) in parallel and return the resolved responses in an array
  const getAllViralSettings = useCallback(
    (product: string, cloudId: string) =>
      waitForAllPromises<
        | GetDirectAccessSettingSuccessResponseValue
        | undefined
        | GetOpenInviteInfo,
        GetDirectAccessSettingFailureResponse
      >([
        getUserInvitesSetting(product, cloudId),
        ...domains.map((domain) => {
          const request: GetDirectAccessSettingRequest = {
            domain,
            productAri: makeAri(product, cloudId),
            setting: 'DIRECT_ACCESS',
          };
          return getDirectAccessEligibility(request);
        }),
      ]),
    [domains, getDirectAccessEligibility, getUserInvitesSetting],
  );

  // Gets the default value for the open invite checkbox. Uses HISI and fallbacks to true
  const userInviteDefaultValue = useCallback(
    async (product: string, cloudId: string, shouldShowOpenInvite: boolean) => {
      // if the invite checkbox isnt being shown it should default to false
      if (!shouldShowOpenInvite) {
        return false;
      }
      const openInviteKey = createHISIOpenInviteFlagKey(product, cloudId);
      return defaultHaveISeenItClient.getFlag(openInviteKey).then(
        ({ response, cached }: GetFlagResponse) => {
          if (!cached) {
            triggerAnalyticsForHISIFlagFetched(
              {
                flagKey: openInviteKey,
                product,
                cloudId,
                value: response.status,
              },
              createAnalyticsEvent,
            );
          }
          return !response.status;
        },
        (_: any) => {
          triggerAnalyticsForHISIFlagFetchFailed(
            {
              flagKey: openInviteKey,
              product,
              cloudId,
            },
            createAnalyticsEvent,
          );
          // Will default to checked in the case that HISI fails
          return Promise.reject(true);
        },
      );
    },
    [createAnalyticsEvent],
  );

  // Get the default value for a domain using HISI, fallbacks to isChecked true if elligible for promotion
  const getDesDefaultValue = useCallback(
    async (
      product: string,
      cloudId: string,
      domainResponse:
        | RejectedResult<GetDirectAccessSettingFailureResponse>
        | FulfilledResult<GetDirectAccessSettingSuccessResponseValue>,
    ): Promise<ViralSettingsByDomainValueObject> => {
      const domain = getDomainFromResults(domainResponse);
      const defaultValue: ViralSettingsByDomainValue = {
        isChecked: false,
        desPromotionEligible: false,
      };
      // in the case that the domain is eligible for promotion
      if (
        domainResponse.status === 'fulfilled' &&
        domain &&
        (domainResponse.value as GetDirectAccessSettingSuccessResponseValue)
          .desPromotionEligible
      ) {
        const successResponse = domainResponse.value as GetDirectAccessSettingSuccessResponseValue;
        const domainKey = createHISIDomainFlagKey(product, cloudId, domain);
        try {
          const { response, cached } = await defaultHaveISeenItClient.getFlag(
            domainKey,
          );
          if (!cached) {
            triggerAnalyticsForHISIFlagFetched(
              {
                flagKey: domainKey,
                product,
                cloudId,
                domain,
                value: response.status,
              },
              createAnalyticsEvent,
            );
          }
          const viralSettingsDomainValue: ViralSettingsByDomainValue = {
            // Have not seen the flag before
            isChecked: !response.status,
            desPromotionEligible: !!successResponse.desPromotionEligible,
          };
          return { key: domain, value: viralSettingsDomainValue };
        } catch (_) {
          triggerAnalyticsForHISIFlagFetchFailed(
            {
              flagKey: domainKey,
              product,
              cloudId,
              domain,
            },
            createAnalyticsEvent,
          );
          // In the case of HISI failing it will default isChecked to true.
          return {
            key: domain,
            value: {
              isChecked: true,
              desPromotionEligible: !!successResponse.desPromotionEligible,
            },
          };
        }
      }
      // is not eligible for promotion
      return { key: domain, value: defaultValue };
    },
    [createAnalyticsEvent],
  );

  // Gets all the HISI settings (open invite and domain) in parallel and retuns in an array
  const getAllHISISettings = useCallback(
    (shouldShowOpenInvite, domainResponses) =>
      waitForAllPromises<boolean | ViralSettingsByDomainValueObject, undefined>(
        [
          userInviteDefaultValue(product, cloudId, shouldShowOpenInvite),
          ...domainResponses.map(
            (
              domainResponse:
                | RejectedResult<GetDirectAccessSettingFailureResponse>
                | FulfilledResult<GetDirectAccessSettingSuccessResponseValue>,
            ) => {
              return getDesDefaultValue(product, cloudId, domainResponse);
            },
          ),
        ],
      ),
    [cloudId, product, getDesDefaultValue, userInviteDefaultValue],
  );
  useEffect(() => {
    defaultInviteApiClient.clearDESCache();
    defaultOpenInviteClient.clearCache();
    defaultHaveISeenItClient.clearCache();
  }, []);
  useEffect(() => {
    const showViralSettings =
      qualifiesForViralSettings(viralSettingsCohort, role) &&
      products &&
      products.length === 1 &&
      focusedSelect &&
      selectEnabled;
    setShowViralSettings(showViralSettings);
    // reset value to false on change
    if (!showViralSettings) {
      setEnableOpenInvite(false);
      setViralSettingsByDomain(EMPTY_DOMAINS);
    }
  }, [products, focusedSelect, selectEnabled, viralSettingsCohort, role]);

  useEffect(() => {
    if (!cloudId) {
      return;
    }
    if (showViralSettings) {
      setIsLoading(true);
      getAllViralSettings(product, cloudId).then(
        ([openInviteState, ...domainResults]: (
          | RejectedResult<GetDirectAccessSettingFailureResponse>
          | FulfilledResult<
              | GetDirectAccessSettingSuccessResponseValue
              | GetOpenInviteInfo
              | undefined
            >
        )[]) => {
          let shouldShowOpenInvite = false;
          if (
            openInviteState.status === 'fulfilled' &&
            openInviteState?.value &&
            (openInviteState.value as GetOpenInviteInfo).getOpenInvite
          ) {
            shouldShowOpenInvite =
              (openInviteState.value as GetOpenInviteInfo).mode ===
              'REQUEST_ACCESS';
          }
          if (viralOptionsDefaultToCheckedFeatureFlagEnabled) {
            getAllHISISettings(shouldShowOpenInvite, domainResults).then(
              ([openInviteDefaultValue, ...domainResultsWithDefaultValue]: (
                | RejectedResult<boolean | undefined>
                | FulfilledResult<boolean | ViralSettingsByDomainValueObject>
              )[]) => {
                // Only update if it hasn't already been updated.
                if (!hasSetEnableOpenInvite.current) {
                  // will be default false if shouldShowOpenInvite is false
                  setEnableOpenInvite(
                    openInviteDefaultValue.status === 'fulfilled'
                      ? (openInviteDefaultValue.value as boolean)
                      : (openInviteDefaultValue.errorDetails as boolean),
                  );
                  hasSetEnableOpenInvite.current = true;
                }
                setShowOpenInvite(shouldShowOpenInvite);
                const viralSettingsByDomainValueObjectFromResponse = getViralSettingsByDomainValueObjectFromResponse(
                  domainResultsWithDefaultValue,
                );
                setViralSettingsByDomain((previousViralSettingMap) =>
                  // Create a map using the completed domain object with defaultValues
                  createViralSettingsMapWithDefaultValues(
                    previousViralSettingMap,
                    viralSettingsByDomainValueObjectFromResponse,
                  ),
                );
                setIsLoading(false);
              },
            );
          } else {
            setShowOpenInvite(shouldShowOpenInvite);
            const desResults = getGetDirectAccessSettingSuccessResponses(
              domainResults,
            );
            setViralSettingsByDomain((previousViralSettingMap) => {
              const viralSettingsMa = createViralSettingMap(
                previousViralSettingMap,
                desResults,
              );

              return viralSettingsMa;
            });
            setIsLoading(false);
          }
        },
      );
    }
  }, [
    cloudId,
    getDesDefaultValue,
    domains,
    getAllViralSettings,
    product,
    showViralSettings,
    viralOptionsDefaultToCheckedFeatureFlagEnabled,
    getAllHISISettings,
  ]);
  const handleViralSettingsByDomainCheckbox = (
    newDomainState: ViralSettingsByDomain,
  ) => {
    setViralSettingsByDomain(newDomainState);
  };
  if (products && products.length > 1) {
    return {
      isLoading,
      viralSettingsByDomain,
      showOpenInvite: false,
      handleViralSettingsByDomainCheckbox,
      enableOpenInvite: false,
      setEnableOpenInvite,
      showViralSettings: false,
    };
  }
  return {
    isLoading,
    viralSettingsByDomain: viralSettingsByDomain,
    showOpenInvite: showOpenInvite,
    handleViralSettingsByDomainCheckbox,
    enableOpenInvite: !!enableOpenInvite,
    setEnableOpenInvite,
    showViralSettings,
  };
};

export const ViralSettings = (props: ViralSettingsProps) => {
  const {
    product = '',
    onOpenInviteChange,
    isLoading: isDataLoading,
    viralSettingsByDomain,
    showOpenInvite,
    handleViralSettingsByDomainCheckbox,
    openInviteEnabled,
  } = props;

  return (
    <ViralSettingsComponent
      product={product}
      isDataLoading={isDataLoading}
      viralSettingsByDomain={viralSettingsByDomain}
      showOpenInvite={showOpenInvite}
      onOpenInviteChange={onOpenInviteChange}
      openInviteEnabled={openInviteEnabled}
      handleViralSettingsByDomainCheckbox={handleViralSettingsByDomainCheckbox}
    />
  );
};

export default ViralSettings;
