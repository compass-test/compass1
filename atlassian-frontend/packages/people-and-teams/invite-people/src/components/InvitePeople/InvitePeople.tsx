import React, {
  useState,
  useMemo,
  useCallback,
  useEffect,
  ChangeEvent,
  FC,
} from 'react';
import { InjectedIntlProps, injectIntl } from 'react-intl';

import {
  useAnalyticsEvents,
  withAnalyticsContext,
} from '@atlaskit/analytics-next';
import OriginTracer from '@atlassiansox/origin-tracing';
import { SpinnerWrapper } from './styled';
import {
  AnalyticsSource,
  BulkInviteFailureResponse,
  BulkInviteSuccessResponse,
  BulkInviteResponse,
  InvitePeopleProps,
  InvitedUser,
  UserRole,
  InviteApiFailureResponse,
  ProductSelectOption,
  JiraSubProduct,
  ViralSettingsCohort,
  UpdateDirectAccessSettingResponse,
  UpdateOpenInviteResponse,
  UpdateOpenInviteFailureResponse,
  UpdateDirectAccessSettingSuccessResponse,
  UpdateDirectAccessSettingFailureResponse,
  Flag,
  UserRecommendationsCohort,
} from '../../types';
import {
  defaultInviteApiClient,
  defaultPermsApiClient,
  defaultOpenInviteClient,
  defaultHaveISeenItClient,
  createHISIDomainFlagKey,
  createHISIOpenInviteFlagKey,
} from '../../clients';
import InvitePeopleComponent from './InvitePeopleComponent';
import {
  triggerAnalyticsForAccessRequested,
  triggerAnalyticsForFailedInviteRequest,
  triggerAnalyticsForSucceededInviteRequest,
  triggerAnalyticsForUserInvited,
  triggerAnalyticsForFailedGetPerms,
  triggerAnalyticsForSucceededGetPerms,
  triggerAnalyticsForFailedGetAvailableProducts,
  triggerAnalyticsForSucceededGetAvailableProducts,
  triggerAnalyticsForInvitePeopleDrawerMigration,
  triggerAnalyticsForEmailInputChange,
  triggerAnalyticsForExposedViralOptionsDefaultToChecked,
  triggerAnalyticsForHISIFlagCreateFailed,
  triggerAnalyticsForHISIFlagCreated,
  triggerAnalyticsForExposedViralSettings,
  triggerAnalyticsForApprovedDomainsSettingsFailed,
  triggerAnalyticsForApprovedDomainsSettingsSuccess,
  triggerAnalyticsForUserInviteSettingsSuccess,
  triggerAnalyticsForUserInviteSettingsFailure,
  qualifiesForViralSettings,
  triggerAnalyticsSLOInviteFail,
  triggerAnalyticsSLOInviteSuccess,
  triggerAnalyticsForInviteFormLoaded,
  triggerAnalyticsForExposedUserRecommendations,
} from '../analytics';
import {
  getCloudIdFromResource,
  getLandingPathByProduct,
  getProductTitleFromAri,
  normalizeJiraSubProduct,
  getProductIdFromResource,
  createEmptyArray,
  Buggy,
  getUniqueEmailDomains,
  resolveCohort,
  ResultStatus,
  RejectedResult,
  FulfilledResult,
  getProductTitle,
  waitForAllPromises,
  getDirectAccessLocation,
} from '../../utils';
import { EXPERIMENT_PRODUCTS } from '../ThirdParty/constants';
import { ThirdPartyContext, useThirdPartyState } from '../ThirdParty/context';

import Spinner from '@atlaskit/spinner';
import {
  getErrorFlag,
  getFailureFlag,
  getGenericErrorFlag,
  getSuccessFlag,
  getSuccessFlagForInviteToJiraProject,
  getViralSettingsFlags,
} from '../Flags/getFlag';
import { InvitePeopleIntlProvider } from '../i18n';
import { ErrorBoundary } from '../ErrorBoundary';
import { useViralSettings } from '../ViralSettings/ViralSettings';
import {
  filterProductOptions,
  removeJiraCoreIfImplied,
} from '../SelectProduct/SelectProductCustomized';
import { startMeasure, stopMeasure } from '../analytics/performance';

const MAX_NUMBER_OF_INPUTS = 10;

const InvitePeopleContainer: FC<InvitePeopleProps & InjectedIntlProps> = ({
  addMoreButtonLabel,
  alignButtons = 'right',
  allowAddMoreFields = true,
  cancelButtonLabel,
  continueUrl,
  defaultNumberOfInputs = 3,
  hideCancelButton,
  formTitle,
  formDescription,
  maxNumberOfInputs = MAX_NUMBER_OF_INPUTS,
  onSendHandler,
  onCancelHandler,
  experimental_onInviteCompletedHandler,
  resourceAri,
  sendButtonLabel,
  showFlag,
  userRole,
  subProduct,
  productOptions,
  enableCustomizedProductSelect,
  enableInviteeList,
  thirdPartyInvitesCohort,
  thirdPartySlackv2Enabled,
  userRecommendationsCohort,
  viralSettingsCohort,
  viralOptionsDefaultToCheckedFeatureFlag = { value: false },
  invitePeopleDrawerMigrationCohort,
  intl,
  source = 'peopleMenu',
  jiraProjectName,
  jiraProjectKey,
  _hasError,
}: InvitePeopleProps & InjectedIntlProps) => {
  const cloudId = getCloudIdFromResource(resourceAri);
  const productTitle = getProductTitleFromAri(resourceAri);
  const productId = getProductIdFromResource(resourceAri) || '';
  const [uniqueEmailDomains, setUniqueEmailDomains] = useState<string[]>([]);

  const jiraSubProduct =
    productId === 'jira' && subProduct
      ? normalizeJiraSubProduct(subProduct)
      : subProduct;

  const [numberOfInputs, setNumberOfInputs] = useState<number>(
    defaultNumberOfInputs,
  );

  const [inputValues, setInputValues] = useState<string[]>(
    createEmptyArray(defaultNumberOfInputs),
  );

  const [isSendingInvitation, setIsSendingInvitation] = useState<boolean>(
    false,
  );

  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [role, setRole] = useState<UserRole>(userRole || 'basic');

  const [
    resolvedViralSettingsCohort,
    setResolvedViralSettingsCohort,
  ] = useState<ViralSettingsCohort | undefined>(undefined);
  const [
    resolvedViralOptionsDefaultToCheckedValue,
    setResolvedViralOptionsDefaultToCheckedValue,
  ] = useState<boolean>(false);
  const [focusedSelect, setFocusedSelect] = useState<boolean>(false);

  // If productOptions are passed, apply filtering logic to ensure jira-core is handled appropriately
  const [availableProductOptions, setAvailableProductOptions] = useState<
    ProductSelectOption[]
  >(() => filterProductOptions(productOptions, enableCustomizedProductSelect));

  // Jira Core will be displayed in the product selector however,
  // if another Jira product is selected, we do not wish to send an
  // invite to Jira Core. Therefore, selectedProducts in invitePeople
  // should not include Jira Core in this case.
  const [selectedProducts, setSelectedProducts] = useState(() => {
    if (jiraSubProduct) {
      return [jiraSubProduct];
    } else if (productOptions?.length) {
      const initialProductOptions = filterProductOptions(
        productOptions,
        enableCustomizedProductSelect,
      );
      const productsToInvite = enableCustomizedProductSelect
        ? removeJiraCoreIfImplied(initialProductOptions)
        : initialProductOptions;

      return productsToInvite
        .map((product) => product.value)
        .filter((product) => product.includes(productId));
    }
    return productId !== 'platform' ? [productId] : [];
  });

  const { createAnalyticsEvent } = useAnalyticsEvents();
  const {
    isOk: thirdPartyOk,
    isLoading: isThirdPartyLoading,
    abortThirdPartyRequests,
  } = useThirdPartyState();

  // Required for the examples to be able to switch between InviteeList and
  // the old 3-10 fields views, because the `inputValues` are shared between
  // the two modes.
  useEffect(() => {
    if (!enableInviteeList) {
      setInputValues(createEmptyArray(defaultNumberOfInputs));
    }
  }, [enableInviteeList, defaultNumberOfInputs]);

  useEffect(() => {
    if (invitePeopleDrawerMigrationCohort && source === 'peopleMenu') {
      triggerAnalyticsForInvitePeopleDrawerMigration(
        createAnalyticsEvent,
        invitePeopleDrawerMigrationCohort,
      );
    }
  }, [createAnalyticsEvent, invitePeopleDrawerMigrationCohort, source]);

  useEffect(() => {
    async function getUserRole() {
      if (userRole) {
        setRole(userRole);
      } else {
        const perms = await defaultPermsApiClient.getUserRole(
          cloudId as string,
        );
        if (perms.errorMessage) {
          triggerAnalyticsForFailedGetPerms(
            createAnalyticsEvent,
            `ari:cloud:platform::site/${cloudId}`,
            perms.errorMessage,
          );
        } else {
          triggerAnalyticsForSucceededGetPerms(
            createAnalyticsEvent,
            `ari:cloud:platform::site/${cloudId}`,
            perms.isInviteUsersPermitted,
            perms.isManagePermitted,
          );
        }
        setRole(perms.role);
      }
    }
    async function getAvailableProducts() {
      try {
        const resources = await defaultInviteApiClient.inviteCapabilities(
          cloudId as string,
        );

        if (!resources || !resources.length) {
          triggerAnalyticsForFailedGetAvailableProducts(
            createAnalyticsEvent,
            resourceAri,
          );
        } else {
          const resourcesAsOptions = resources.map(({ id, name }) => ({
            label: name,
            value: id,
          }));
          const filteredOptions = filterProductOptions(
            resourcesAsOptions,
            enableCustomizedProductSelect,
          );
          setAvailableProductOptions(filteredOptions);

          triggerAnalyticsForSucceededGetAvailableProducts(
            createAnalyticsEvent,
            resourceAri,
            resources.map(({ id }) => `ari:cloud:${id}::site/${cloudId}`),
          );
        }
      } catch (err) {
        triggerAnalyticsForFailedGetAvailableProducts(
          createAnalyticsEvent,
          resourceAri,
        );
      }
    }

    const fetchDataOnLoad = async () => {
      setIsLoading(true);
      // If product options have been passed in, do not fetch
      if (availableProductOptions.length > 0) {
        await getUserRole();
      } else {
        await Promise.all([getAvailableProducts(), getUserRole()]);
      }
      setIsLoading(false);
    };
    fetchDataOnLoad();
  }, [
    availableProductOptions,
    cloudId,
    createAnalyticsEvent,
    enableCustomizedProductSelect,
    resourceAri,
    userRole,
  ]);

  const handleProductSelect = (selectedProducts?: ProductSelectOption[]) => {
    if (!selectedProducts) {
      return;
    }

    const productsToInvite = enableCustomizedProductSelect
      ? removeJiraCoreIfImplied(selectedProducts)
      : selectedProducts;

    setSelectedProducts(productsToInvite.map((product) => product.value));
  };

  const addInput = useCallback(() => {
    if (numberOfInputs < MAX_NUMBER_OF_INPUTS) {
      setNumberOfInputs(Math.min(numberOfInputs + 1, MAX_NUMBER_OF_INPUTS));
      setInputValues([...inputValues, '']);
    }
  }, [numberOfInputs, inputValues]);

  const onInputChange = useCallback(
    (e, inputIndex: number) => {
      setInputValues((latestInputValues) =>
        latestInputValues.map((value: string, index: number): string => {
          if (index === inputIndex && e.target.value) {
            triggerAnalyticsForEmailInputChange(
              createAnalyticsEvent,
              inputIndex,
              source,
            );
          }
          return index === inputIndex ? e.target.value : value;
        }),
      );
    },
    [source, createAnalyticsEvent],
  );

  const onInviteeListChange = useCallback(
    (emails: string[], validEmails: string[] = []) => {
      setInputValues(emails);
      if (qualifiesForViralSettings(resolvedViralSettingsCohort, role)) {
        setUniqueEmailDomains(getUniqueEmailDomains(validEmails));
      }
    },
    [role, resolvedViralSettingsCohort],
  );

  const getUniqueEmails = useCallback(() => {
    const set = new Set(inputValues.filter((val) => Boolean(val)));
    return Array.from(set);
  }, [inputValues]);

  const handleViralSettingResponses = React.useCallback(
    (
      responses: (
        | RejectedResult<
            | UpdateOpenInviteFailureResponse
            | UpdateDirectAccessSettingFailureResponse
          >
        | FulfilledResult<
            UpdateOpenInviteResponse | UpdateDirectAccessSettingResponse
          >
      )[],
      domains: string[],
      cloudId: string,
      product: string,
    ) => {
      const enabled = 'enabled';
      let openInviteSucceeded: boolean | undefined;
      // someDirectAccessDomainsEnabled - we receive 204 even when direct access was not successfully enabled on some domains.
      let someDirectAccessDomainsEnabled: boolean | undefined;
      responses.forEach((response) => {
        if (response.status === ResultStatus.FULFILLED) {
          if ((response.value as UpdateOpenInviteResponse).enableOpenInvite) {
            openInviteSucceeded = true;
            triggerAnalyticsForUserInviteSettingsSuccess(
              { newState: enabled },
              createAnalyticsEvent,
            );
          } else if (
            (response.value as UpdateDirectAccessSettingSuccessResponse)
              .updateDirectAccessSettings
          ) {
            someDirectAccessDomainsEnabled = true;
            triggerAnalyticsForApprovedDomainsSettingsSuccess(
              { addedDomains: domains },
              createAnalyticsEvent,
            );
          }
        } else if (response.status === ResultStatus.FAILED) {
          if (
            (response.errorDetails as UpdateOpenInviteFailureResponse)
              .updateOpenInviteSettingFailure
          ) {
            openInviteSucceeded = false;
            triggerAnalyticsForUserInviteSettingsFailure(
              { proposedNewState: enabled },
              createAnalyticsEvent,
            );
          } else if (
            (response.errorDetails as UpdateDirectAccessSettingFailureResponse)
              .updateDirectAccessSettingsFailure
          ) {
            someDirectAccessDomainsEnabled = false;
            triggerAnalyticsForApprovedDomainsSettingsFailed(
              { proposedDomains: domains },
              createAnalyticsEvent,
            );
          }
        }
      });
      return {
        viralSettingsFlags: getViralSettingsFlags(
          openInviteSucceeded,
          someDirectAccessDomainsEnabled,
          domains,
          cloudId,
          product,
        ),
      };
    },
    [createAnalyticsEvent],
  );

  const {
    isLoading: isViralSettingsLoading,
    viralSettingsByDomain,
    showOpenInvite,
    handleViralSettingsByDomainCheckbox,
    enableOpenInvite,
    setEnableOpenInvite,
    showViralSettings,
  } = useViralSettings({
    domains: uniqueEmailDomains,
    cloudId: cloudId || '',
    productId: productId,
    products: selectedProducts,
    viralSettingsCohort: resolvedViralSettingsCohort,
    viralOptionsDefaultToCheckedFeatureFlagEnabled: resolvedViralOptionsDefaultToCheckedValue,
    role,
    focusedSelect,
    selectEnabled: enableInviteeList || !!thirdPartyOk,
  });

  const onSubmit = useCallback(async () => {
    setIsSendingInvitation(true);

    const isInviteToJira = selectedProducts.some((product) =>
      product.startsWith('jira'),
    );

    const isInviteToJiraFlow =
      !!source &&
      source !== 'peopleMenu' &&
      !!jiraProjectName &&
      productId === 'jira' &&
      isInviteToJira;

    const instanceUrl = new URL(continueUrl).origin;
    const productContinueUrl =
      !isInviteToJiraFlow && selectedProducts.length === 1
        ? `${instanceUrl}${getLandingPathByProduct(selectedProducts[0])}`
        : continueUrl;
    let flags: Flag[] = [];

    const resources = selectedProducts.map(
      (selectedProduct) => `ari:cloud:${selectedProduct}::site/${cloudId}`,
    );

    if (showViralSettings && selectedProducts.length === 1 && cloudId) {
      const viralSettingsSubmitRequests = [];
      const domains: string[] = [];
      const product = selectedProducts[0];
      // showViralSettings includes all logic to verify that the experiment should be enabled.
      if (enableOpenInvite) {
        viralSettingsSubmitRequests.push(
          defaultOpenInviteClient.enableOpenInvite(product, cloudId),
        );
      } else if (
        // If unchecked and open invite is shown
        showOpenInvite &&
        viralOptionsDefaultToCheckedFeatureFlag.value
      ) {
        const openInviteKey = createHISIOpenInviteFlagKey(product, cloudId);
        defaultHaveISeenItClient
          .postFlag(openInviteKey)
          .then((_: string) =>
            triggerAnalyticsForHISIFlagCreated(
              {
                flagKey: openInviteKey,
                product,
                cloudId,
              },
              createAnalyticsEvent,
            ),
          )
          .catch((_: any) =>
            triggerAnalyticsForHISIFlagCreateFailed(
              {
                flagKey: openInviteKey,
                product,
                cloudId,
              },
              createAnalyticsEvent,
            ),
          );
      }
      if (Object.keys(viralSettingsByDomain).length >= 1) {
        const uncheckedDomains: string[] = [];
        Object.entries(viralSettingsByDomain).forEach(([key, value]) => {
          if (value.desPromotionEligible) {
            if (value.isChecked) {
              domains.push(key);
            } else {
              uncheckedDomains.push(key);
            }
          }
        });
        const location = getDirectAccessLocation(productId);
        // Only add request if there a domains to update
        domains.length >= 1 &&
          viralSettingsSubmitRequests.push(
            defaultInviteApiClient.updateDirectAccessSettings({
              cloudId,
              product: selectedProducts[0],
              domains,
              location,
            }),
          );
        if (viralOptionsDefaultToCheckedFeatureFlag.value) {
          uncheckedDomains.forEach((domain) => {
            const domainKey = createHISIDomainFlagKey(product, cloudId, domain);
            defaultHaveISeenItClient
              .postFlag(domainKey)
              .then((_: string) =>
                triggerAnalyticsForHISIFlagCreated(
                  {
                    flagKey: domainKey,
                    product,
                    cloudId,
                    domain: domain,
                  },
                  createAnalyticsEvent,
                ),
              )
              .catch((_: any) =>
                triggerAnalyticsForHISIFlagCreateFailed(
                  {
                    flagKey: domainKey,
                    product,
                    cloudId,
                    domain: domain,
                  },
                  createAnalyticsEvent,
                ),
              );
          });
        }
      }
      // wait for all requests to resolve (open invite update and/or domain direct access update)
      viralSettingsSubmitRequests.length >= 1 &&
        waitForAllPromises<
          UpdateOpenInviteResponse | UpdateDirectAccessSettingResponse,
          | UpdateOpenInviteFailureResponse
          | UpdateDirectAccessSettingFailureResponse
        >(viralSettingsSubmitRequests).then((responses) => {
          const { viralSettingsFlags } = handleViralSettingResponses(
            responses,
            domains,
            cloudId,
            getProductTitle(selectedProducts[0]),
          );
          flags = flags.concat(viralSettingsFlags);
        });
    }
    try {
      const origin = new OriginTracer({ product: productId });
      const inviteContinueUrl = origin.addToUrl(productContinueUrl);
      const originAttributes: any = origin.toAnalyticsAttributes({
        hasGeneratedId: true,
      });

      const uniqueEmails: string[] = getUniqueEmails();
      const result: BulkInviteResponse = await defaultInviteApiClient.inviteUsers(
        {
          users: uniqueEmails.map((email) => ({ email })),
          continueUrl: inviteContinueUrl,
          resources,
          suppressInviteEmail: false,
        },
      );

      if ((result as BulkInviteFailureResponse).failure) {
        const {
          message,
          code,
          status,
        } = (result as BulkInviteFailureResponse).failure;

        triggerAnalyticsForFailedInviteRequest(
          createAnalyticsEvent,
          source,
          selectedProducts,
          role,
          code,
          message,
        );

        if (status >= 500) {
          triggerAnalyticsSLOInviteFail(
            createAnalyticsEvent,
            source,
            code,
            message,
            status,
          );
        } else {
          triggerAnalyticsSLOInviteSuccess(createAnalyticsEvent, source);
        }

        const failureFlag = getFailureFlag(
          result as BulkInviteFailureResponse,
          cloudId!,
          role,
          uniqueEmails,
          isInviteToJiraFlow,
        );

        experimental_onInviteCompletedHandler &&
          experimental_onInviteCompletedHandler(result);

        if (failureFlag) {
          flags.push(failureFlag);
        }
      } else {
        const {
          invited,
          accessRequested,
          error,
        } = result as BulkInviteSuccessResponse;

        experimental_onInviteCompletedHandler &&
          experimental_onInviteCompletedHandler(result);

        triggerAnalyticsForSucceededInviteRequest(
          createAnalyticsEvent,
          source,
          selectedProducts,
          role,
          {
            invited: invited.map((user: InvitedUser) => user.id!),
            accessRequested: accessRequested.map(
              (user: InvitedUser) => user.id!,
            ),
            error: error.map(({ error }) => error as InviteApiFailureResponse),
          },
        );

        triggerAnalyticsSLOInviteSuccess(createAnalyticsEvent, source);

        invited.forEach((user: InvitedUser) => {
          triggerAnalyticsForUserInvited(
            createAnalyticsEvent,
            source,
            originAttributes,
            user.id!,
            selectedProducts,
            role,
          );
        });

        accessRequested.forEach((user: InvitedUser) => {
          triggerAnalyticsForAccessRequested(
            createAnalyticsEvent,
            source,
            originAttributes,
            user.id!,
            selectedProducts,
            role,
          );
        });

        const successFlag = isInviteToJiraFlow
          ? getSuccessFlagForInviteToJiraProject(
              result as BulkInviteSuccessResponse,
              cloudId!,
              selectedProducts,
              role,
              source,
              intl,
              {
                continueUrl,
                jiraProjectName: jiraProjectName!,
                jiraProjectKey: jiraProjectKey!,
              },
            )
          : getSuccessFlag(
              result as BulkInviteSuccessResponse,
              cloudId!,
              selectedProducts,
              role,
              intl,
            );
        if (successFlag) {
          flags.push(successFlag);
        }

        const errorFlag = getErrorFlag(
          result as BulkInviteSuccessResponse,
          role,
        );
        if (errorFlag) {
          flags.push(errorFlag);
        }
      }
    } catch (err) {
      triggerAnalyticsForFailedInviteRequest(
        createAnalyticsEvent,
        source,
        selectedProducts,
        role,
        err.name,
        err.message,
      );

      triggerAnalyticsSLOInviteFail(
        createAnalyticsEvent,
        source,
        err.name,
        err.message,
        err.status,
      );

      flags.push(getGenericErrorFlag(role));
    }

    setIsSendingInvitation(false);

    if (showFlag) {
      flags.forEach(showFlag);
    }

    onSendHandler && onSendHandler();
  }, [
    selectedProducts,
    source,
    jiraProjectName,
    productId,
    continueUrl,
    showViralSettings,
    cloudId,
    showFlag,
    onSendHandler,
    enableOpenInvite,
    viralSettingsByDomain,
    createAnalyticsEvent,
    handleViralSettingResponses,
    getUniqueEmails,
    role,
    experimental_onInviteCompletedHandler,
    viralOptionsDefaultToCheckedFeatureFlag.value,
    showOpenInvite,
    intl,
    jiraProjectKey,
  ]);

  const onFocusEvent = useCallback(() => {
    setFocusedSelect(true);
  }, []);

  useEffect(() => {
    if (!userRecommendationsCohort || thirdPartyOk === undefined) {
      return;
    }
    const [
      resolvedUserRecommendationsCohort,
      userRecommendationsIneligibilityReasons,
    ] = resolveCohort<UserRecommendationsCohort>(
      userRecommendationsCohort,
      'not-enrolled-control',
      !!enableInviteeList,
      thirdPartyOk,
    );
    triggerAnalyticsForExposedUserRecommendations(
      createAnalyticsEvent,
      productId,
      resolvedUserRecommendationsCohort,
      source,
      userRecommendationsIneligibilityReasons,
      userRole,
    );
  }, [
    createAnalyticsEvent,
    enableInviteeList,
    productId,
    source,
    thirdPartyOk,
    userRecommendationsCohort,
    userRole,
  ]);

  // Experiment: Viral settings useEffect and the extended experiment of viral options default to check.
  useEffect(() => {
    async function getViralSettings() {
      if (
        !cloudId ||
        !productId ||
        !EXPERIMENT_PRODUCTS.includes(productId) ||
        !role ||
        !source ||
        !viralSettingsCohort ||
        !viralOptionsDefaultToCheckedFeatureFlag ||
        thirdPartyOk === undefined
      ) {
        return;
      }

      const [
        resolvedViralOptionsDefaultToCheckedValue,
        defaultToCheckeCohortIneligibilityReasons,
      ] = resolveCohort<boolean>(
        viralOptionsDefaultToCheckedFeatureFlag.value,
        false,
        !!enableInviteeList,
        thirdPartyOk,
      );
      const [resolvedViralSettingsCohort, ineligibilityReasons] = resolveCohort<
        ViralSettingsCohort
      >(
        viralSettingsCohort as ViralSettingsCohort,
        ViralSettingsCohort.NOT_ENROLLED,
        !!enableInviteeList,
        thirdPartyOk,
      );
      setResolvedViralOptionsDefaultToCheckedValue(
        resolvedViralOptionsDefaultToCheckedValue,
      );
      // If ViralOptionsDefaultToChecked is enabled, enable the ViralSettings experiment
      if (resolvedViralOptionsDefaultToCheckedValue) {
        setResolvedViralSettingsCohort(ViralSettingsCohort.VARIATION);
      } else {
        setResolvedViralSettingsCohort(resolvedViralSettingsCohort);
      }
      if (role === 'admin') {
        // Exposure event will fire with resolvedViralSettingsCohort even if enabled by ViralOptionsDefaultToChecked
        triggerAnalyticsForExposedViralSettings(
          createAnalyticsEvent,
          productId,
          resolvedViralSettingsCohort,
          source,
          ineligibilityReasons,
        );
        triggerAnalyticsForExposedViralOptionsDefaultToChecked(
          createAnalyticsEvent,
          productId,
          defaultToCheckeCohortIneligibilityReasons,
          viralOptionsDefaultToCheckedFeatureFlag.value,
          viralOptionsDefaultToCheckedFeatureFlag?.explanation,
          source,
        );
      }
    }

    getViralSettings();
  }, [
    cloudId,
    productId,
    viralSettingsCohort,
    source,
    thirdPartyOk,
    createAnalyticsEvent,
    role,
    viralOptionsDefaultToCheckedFeatureFlag,
    enableInviteeList,
  ]);

  const defaultProductOptions = useMemo(() => {
    // preselect all jira products if subproduct is jira-core
    // this applies only to admins and trusted users
    // since they see the product select dropdown
    if (jiraSubProduct === 'jira-core' && !enableCustomizedProductSelect) {
      return availableProductOptions.filter((product) =>
        product.value.includes('jira'),
      );
    } else if (jiraSubProduct) {
      return availableProductOptions.filter(
        (product) =>
          product.value === jiraSubProduct ||
          (enableCustomizedProductSelect && product.value === 'jira-core'),
      );
    } else if (availableProductOptions.length === 1) {
      // If there's exactly one product subscription, we should use it when sending
      // the invite
      return availableProductOptions;
    }
    return availableProductOptions.filter((product) =>
      product.value.includes(productId),
    );
  }, [
    productId,
    availableProductOptions,
    jiraSubProduct,
    enableCustomizedProductSelect,
  ]);

  useEffect(() => {
    if (defaultProductOptions.length) {
      const productsToInvite = enableCustomizedProductSelect
        ? removeJiraCoreIfImplied(defaultProductOptions)
        : defaultProductOptions;

      setSelectedProducts(productsToInvite.map((product) => product.value));
    }
  }, [defaultProductOptions, enableCustomizedProductSelect]);

  const onOpenInviteChange = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      setEnableOpenInvite(event?.target.checked);
    },
    [setEnableOpenInvite],
  );

  const isFormLoading = isLoading || isThirdPartyLoading;
  if (isFormLoading) {
    startMeasure('inviteFormLoad');
  } else {
    stopMeasure('inviteFormLoad', (duration, _) => {
      triggerAnalyticsForInviteFormLoaded(
        createAnalyticsEvent,
        source,
        duration,
      );
    });
  }

  const onCancelButtonClick = useCallback(() => {
    abortThirdPartyRequests();
    if (onCancelHandler) {
      onCancelHandler();
    }
  }, [onCancelHandler, abortThirdPartyRequests]);

  return (
    <InvitePeopleIntlProvider>
      <ErrorBoundary
        analyticsData={{
          product: productTitle,
          subProduct,
          source,
          viralSettingsCohort: resolvedViralSettingsCohort,
          thirdPartyInvitesCohort,
          invitePeopleDrawerMigrationCohort,
          enableInviteeList,
        }}
      >
        {isLoading || isThirdPartyLoading ? (
          <SpinnerWrapper data-testid="testId-invite-people-spinner">
            <Spinner />
          </SpinnerWrapper>
        ) : (
          <InvitePeopleComponent
            addMoreButtonLabel={addMoreButtonLabel}
            alignButtons={alignButtons}
            allowAddMoreFields={allowAddMoreFields}
            cancelButtonLabel={cancelButtonLabel}
            cloudId={cloudId}
            hideCancelButton={hideCancelButton}
            formTitle={formTitle}
            formDescription={formDescription}
            inputValues={inputValues}
            isSendingInvitation={isSendingInvitation}
            maxNumberOfInputs={maxNumberOfInputs}
            numberOfInputs={numberOfInputs}
            onAddMoreInvitationsButtonClick={addInput}
            onInputChange={onInputChange}
            onInviteButtonClick={onSubmit}
            product={productTitle}
            productId={productId}
            onCancelButtonClick={onCancelButtonClick}
            sendButtonLabel={sendButtonLabel}
            userRole={role}
            enableCustomizedProductSelect={enableCustomizedProductSelect}
            subProduct={jiraSubProduct as JiraSubProduct}
            productOptions={availableProductOptions}
            defaultProductOptions={defaultProductOptions}
            enableInviteeList={enableInviteeList}
            userRecommendationsCohort={userRecommendationsCohort}
            viralSettingsCohort={resolvedViralSettingsCohort}
            viralOptionsDefaultToCheckedFeatureFlag={
              viralOptionsDefaultToCheckedFeatureFlag
            }
            onOpenInviteChange={onOpenInviteChange}
            onInviteeListChange={onInviteeListChange}
            showFlag={showFlag}
            source={source}
            uniqueEmailDomains={uniqueEmailDomains}
            handleProductSelect={handleProductSelect}
            handleViralSettingsByDomainCheckbox={
              handleViralSettingsByDomainCheckbox
            }
            openInviteEnabled={enableOpenInvite}
            isViralSettingsLoading={isViralSettingsLoading}
            viralSettingsByDomain={viralSettingsByDomain}
            showOpenInvite={showOpenInvite}
            selectedProducts={selectedProducts}
            onFocusEvent={onFocusEvent}
            showViralSettings={showViralSettings}
          />
        )}
        {/*we use _hasError to test unhandled error*/}
        {_hasError && <Buggy />}
      </ErrorBoundary>
    </InvitePeopleIntlProvider>
  );
};

const InvitePeople = (props: InvitePeopleProps & InjectedIntlProps) => {
  const {
    thirdPartyApiV2 = false,
    resourceAri,
    showFlag,
    thirdPartyInvitesCohort,
    onCancelHandler,
    enableThirdParty,
    thirdPartySlackv2Enabled,
  } = props;
  const cloudId = getCloudIdFromResource(resourceAri);
  const productId = getProductIdFromResource(resourceAri) || '';

  return (
    <ThirdPartyContext
      thirdPartyApiV2={thirdPartyApiV2}
      enableThirdParty={enableThirdParty}
      cohort={thirdPartyInvitesCohort}
      enableSlackv2={thirdPartySlackv2Enabled}
      showFlag={showFlag}
      cloudId={cloudId}
      productId={productId}
      onCancelButtonClick={onCancelHandler}
    >
      <InvitePeopleContainer {...props} />
    </ThirdPartyContext>
  );
};

const analyticsContextData = {
  source: AnalyticsSource.ADD_PEOPLE,
  componentName: 'addPeople',
};

export const InvitePeopleWithAnalytics = withAnalyticsContext(
  analyticsContextData,
)(injectIntl(InvitePeople));

export default InvitePeople;
