import React, {
  ReactElement,
  useContext,
  useState,
  useEffect,
  useMemo,
  useCallback,
  useRef,
} from 'react';
import { injectIntl, InjectedIntlProps } from 'react-intl';
import { ExternalUser } from '@atlaskit/user-picker';
import {
  SlackWorkspace,
  Cohort,
  AccountInfo,
  GenericShowFlag,
} from '../../types';
import {
  WithAnalyticsEventsProps,
  useAnalyticsEvents,
} from '@atlaskit/analytics-next';
import {
  FUSE_OPTIONS,
  SLACK_SERVICE,
  MICROSOFT_SERVICE,
  GOOGLE_SERVICE,
  MAX_USERS,
  GOOGLE_MAIL_DOMAINS,
} from '../ThirdParty/constants';
import {
  defaultThirdPartyInvitesClient,
  exusThirdPartyInvitesClient,
  defaultAccountInfoClient,
} from '../../clients';
import {
  triggerAnalyticsForExposedINFI,
  triggerAnalyticsForIntegrationConnected,
  triggerAnalyticsForIntegrationFailed,
  triggerAnalyticsForClickConnectButton,
  triggerAnalyticsSLOThirdPartyInitSuccess,
  triggerAnalyticsSLOThirdPartyInitFail,
} from '../analytics';
import { isMobile } from '../../utils';
import {
  mergeExternalUsers,
  manageSlackWorkspaces,
  beginThirdPartyOauth,
} from '../ThirdParty/utils';
import {
  getSuccessIntegrationFlag,
  getSlackDisconnectedFlag,
} from '../Flags/getFlag';
import Fuse, { FuseOptions } from 'fuse.js';
import {
  disconnectSlackWorkSpace,
  getConnectedSlackWorkSpace,
  setConnectedSlackWorkSpace,
} from '../ThirdParty/localStorageUtils';
import type { SlackService } from '@atlassian/integrations';
import {
  slackServiceFactory,
  isAtlassianSlackProduct,
} from '@atlassian/integrations';
import { AuthError } from '@atlaskit/outbound-auth-flow-client';

export type ThirdPartyState = {
  isLoading: boolean;
  isOk?: boolean;
  slackWorkspaces: SlackWorkspace[];
  selectedSlackWorkspace: SlackWorkspace | null;
  loggedInEmailDomain: string | undefined;
  isSlackConnectDialogOpen: boolean;
  integrations: string[];
  enabledIntegrations: string[];
  closeSlackConnectDialog: () => void;
  openSlackConnectDialog: () => void;
  onChangeSelectedSlackWorkspace: (
    selectedSlackWorkspace: SlackWorkspace,
  ) => void;
  onDisconnectSlackWorkspace: () => void;
  onThirdPartyIntegrationsChange: () => void;
  queryThirdParty: (searchText: string | undefined) => Promise<any[]>;
  onConnectProvider: (serviceKey: string, forceConnect?: boolean) => void;
  enableSlackv2?: boolean;
  abortThirdPartyRequests: () => void;
};

const ThirdPartyStateContext = React.createContext<ThirdPartyState | undefined>(
  undefined,
);

export interface ThirdPartyContextProps {
  thirdPartyApiV2: boolean;
  cloudId: string | undefined;
  productId: string;
  cohort?: 'experiment' | 'control' | 'not-enrolled';
  enableSlackv2?: boolean;
  enableThirdParty?: boolean;
  showFlag?: GenericShowFlag<any>;
  onCancelButtonClick?: () => void;
  children: ReactElement;
}

export const ThirdPartyContext = injectIntl(
  ({
    thirdPartyApiV2,
    cloudId,
    productId,
    cohort,
    enableSlackv2,
    enableThirdParty,
    showFlag,
    children,
    intl,
    onCancelButtonClick,
  }: ThirdPartyContextProps & WithAnalyticsEventsProps & InjectedIntlProps) => {
    const thirdPartyInvitesClient = thirdPartyApiV2
      ? exusThirdPartyInvitesClient
      : defaultThirdPartyInvitesClient;
    const { createAnalyticsEvent } = useAnalyticsEvents();
    const [isLoading, setIsLoading] = useState(true);
    const [isAfterConnect, setIsAfterConnect] = useState(false);
    const [isOk, setIsOk] = useState<boolean | undefined>(undefined);
    const [slackService, setSlackService] = useState<SlackService | undefined>(
      undefined,
    );
    const [
      enabledThirdPartyIntegrations,
      setEnabledThirdPartyIntegrations,
    ] = useState<string[]>([]);
    const [slackWorkspaces, setSlackWorkspaces] = useState<SlackWorkspace[]>(
      [],
    );
    const [
      selectedSlackWorkspace,
      setSelectedSlackWorkspace,
    ] = useState<SlackWorkspace | null>(null);

    const [integrations, setIntegrations] = useState<string[] | null>(null);

    const [loggedInEmailDomain, setLoggedInEmailDomain] = useState<
      string | undefined
    >(undefined);

    const [isSlackConnectDialogOpen, setIsSlackConnectDialogOpen] = useState(
      false,
    );

    const abortThirdPartyRequests = useCallback(() => {
      if (slackService) {
        slackService.abort();
      }
    }, [slackService]);

    const slackUserSearcher = useRef<Fuse<
      ExternalUser,
      FuseOptions<ExternalUser>
    > | null>(null);

    const resolveCohort = useCallback((cohort: Cohort): [
      Cohort,
      Array<string>,
    ] => {
      let finalCohort = cohort;
      const reasons = [];

      if (isMobile()) {
        reasons.push('notDesktop');
        finalCohort = Cohort.NOT_ENROLLED;
      }

      return [finalCohort, reasons];
    }, []);

    useEffect(() => {
      async function onSetWorkspace() {
        if (!cloudId || !productId) {
          return;
        }

        slackUserSearcher.current = null;

        if (selectedSlackWorkspace) {
          let users: ExternalUser[] = [];
          if (enableSlackv2) {
            if (slackService) {
              const slackUsers = await slackService.getUsers(
                selectedSlackWorkspace.id,
              );
              if (slackUsers.ok) {
                users = slackUsers.result;
              }
            }
          } else {
            users = await thirdPartyInvitesClient.fetchSlackUsers(
              cloudId,
              productId,
              selectedSlackWorkspace.id,
            );
          }

          slackUserSearcher.current = new Fuse<
            ExternalUser,
            FuseOptions<ExternalUser>
          >(users, FUSE_OPTIONS);
        }
      }

      onSetWorkspace();
    }, [
      selectedSlackWorkspace,
      cloudId,
      productId,
      enableSlackv2,
      slackService,
      thirdPartyInvitesClient,
    ]);

    const enabledIntegrations = useMemo(() => {
      const result = enabledThirdPartyIntegrations.filter(
        (serviceKey) =>
          (serviceKey !== SLACK_SERVICE ||
            isAtlassianSlackProduct(productId)) &&
          (serviceKey !== GOOGLE_SERVICE ||
            (loggedInEmailDomain &&
              !GOOGLE_MAIL_DOMAINS.includes(loggedInEmailDomain))),
      );

      return result;
    }, [productId, loggedInEmailDomain, enabledThirdPartyIntegrations]);

    const connectedIntegrations = useMemo(() => {
      if (!integrations) {
        return [];
      }

      return [
        ...integrations,
        ...(selectedSlackWorkspace ? [SLACK_SERVICE] : []),
      ];
    }, [integrations, selectedSlackWorkspace]);

    useEffect(() => {
      async function getThirdPartyIntegrations() {
        if (!cloudId || !productId) {
          setIsLoading(false);
          return;
        }

        const initialCohort = cohort || Cohort.NOT_ENROLLED;
        let integrations: string[] = [];
        let slackWorkspaceIds: string[] = [];
        let slackWorkspacesPromise = Promise.resolve([] as SlackWorkspace[]);

        let [cohortValue, ineligibilityReasons] = resolveCohort(
          initialCohort as Cohort,
        );

        try {
          if (cohortValue === Cohort.EXPERIMENT || enableThirdParty === true) {
            setIsLoading(true);
            const integrationsPromise = thirdPartyInvitesClient.getExistingIntegrations();

            if (isAtlassianSlackProduct(productId)) {
              if (enableSlackv2) {
                const productSlackService = slackServiceFactory(
                  cloudId,
                  productId,
                  createAnalyticsEvent,
                );

                const slackEnabledResult = await productSlackService.isSlackEnabled();
                if (slackEnabledResult.ok && slackEnabledResult.result) {
                  setSlackService(productSlackService);
                  slackWorkspacesPromise = productSlackService
                    .getTeams()
                    .then((response) => {
                      if (response.ok) {
                        return response.result;
                      } else {
                        throw new Error('Faield fetching slack workspaces');
                      }
                    });
                }
              } else {
                slackWorkspacesPromise = thirdPartyInvitesClient.fetchSlackWorkspaces(
                  cloudId,
                  productId,
                );
              }
            }

            const [
              accountInfo,
              integrationsResponse,
              slackWorkspaces,
            ] = await Promise.all<
              AccountInfo,
              {
                enabledIntegrations: string[];
                connectedIntegrations: string[];
              },
              SlackWorkspace[]
            >([
              defaultAccountInfoClient.getAccountInfo(),
              integrationsPromise,
              slackWorkspacesPromise,
            ]);

            integrations = integrationsResponse.enabledIntegrations;

            setIntegrations(integrationsResponse.connectedIntegrations);
            setEnabledThirdPartyIntegrations(integrations);
            setSlackWorkspaces(slackWorkspaces);

            slackWorkspaceIds = slackWorkspaces.map((w) => w.id);
            const [, emailDomain] = accountInfo.email.split('@');
            setLoggedInEmailDomain(emailDomain);

            if (isAtlassianSlackProduct(productId)) {
              const connectedSlackWorkspace = getConnectedSlackWorkSpace(
                productId,
              );
              if (slackWorkspaces.length > 0 && connectedSlackWorkspace) {
                const filteredSlackWorkspace = slackWorkspaces.find(
                  (slackWorkspace) =>
                    slackWorkspace.id === connectedSlackWorkspace,
                );
                if (filteredSlackWorkspace) {
                  setSelectedSlackWorkspace(filteredSlackWorkspace);
                }
              }
            }
            setIsOk(true);
            triggerAnalyticsSLOThirdPartyInitSuccess(createAnalyticsEvent);
          } else {
            setIsOk(false);
          }
        } catch (err) {
          cohortValue = Cohort.NOT_ENROLLED;
          ineligibilityReasons.push('error');
          setIsOk(false);
          triggerAnalyticsSLOThirdPartyInitFail(
            createAnalyticsEvent,
            String(err),
          );
        } finally {
          setIsLoading(false);
          if (cohort) {
            triggerAnalyticsForExposedINFI(
              createAnalyticsEvent,
              productId,
              initialCohort,
              cohortValue,
              integrations,
              slackWorkspaceIds,
              enableSlackv2,
              ineligibilityReasons,
            );
          }
        }
      }
      getThirdPartyIntegrations();
    }, [
      thirdPartyInvitesClient,
      cohort,
      cloudId,
      productId,
      createAnalyticsEvent,
      intl.locale,
      resolveCohort,
      enableSlackv2,
      enableThirdParty,
    ]);

    const onChangeSelectedSlackWorkspace = useCallback(
      (selectedSlackWorkspace: SlackWorkspace) => {
        setSelectedSlackWorkspace(selectedSlackWorkspace);
        setConnectedSlackWorkSpace(productId, selectedSlackWorkspace.id);

        triggerAnalyticsForIntegrationConnected(
          createAnalyticsEvent,
          SLACK_SERVICE,
          selectedSlackWorkspace.id,
        );

        if (showFlag) {
          showFlag(
            getSuccessIntegrationFlag(
              SLACK_SERVICE,
              selectedSlackWorkspace.name,
            ),
          );
        }
      },
      [productId, showFlag, createAnalyticsEvent],
    );

    const onDisconnectSlackWorkspace = useCallback(() => {
      if (showFlag) {
        showFlag(getSlackDisconnectedFlag());
      }
      setSelectedSlackWorkspace(null);
      disconnectSlackWorkSpace(productId);
    }, [productId, showFlag]);

    const onThirdPartyIntegrationsChange = useCallback(async () => {
      const integrationsResponse = await thirdPartyInvitesClient.getExistingIntegrations();
      setIntegrations(integrationsResponse.connectedIntegrations);
    }, [thirdPartyInvitesClient]);

    const closeSlackConnectDialog = () => setIsSlackConnectDialogOpen(false);
    const openSlackConnectDialog = () => setIsSlackConnectDialogOpen(true);

    const queryThirdParty = useCallback(
      async (searchText: string | undefined): Promise<any[]> => {
        if (!searchText || connectedIntegrations.length === 0) {
          return [];
        }

        // query backend for users on if MS/Workspace are connected
        let users = connectedIntegrations.find(
          (e) => e === GOOGLE_SERVICE || e === MICROSOFT_SERVICE,
        )
          ? await thirdPartyInvitesClient.search(searchText)
          : [];

        if (slackUserSearcher.current) {
          const slackUsers = slackUserSearcher.current.search(
            searchText,
          ) as ExternalUser[];
          users = mergeExternalUsers(
            users,
            slackUsers.slice(0, Math.min(slackUsers.length, MAX_USERS)),
          );
        }

        const fuse = new Fuse<ExternalUser, FuseOptions<ExternalUser>>(
          users,
          FUSE_OPTIONS,
        );
        const searchResult = fuse.search(searchText);
        return searchResult.slice(0, Math.min(searchResult.length, MAX_USERS));
      },
      [connectedIntegrations, thirdPartyInvitesClient],
    );

    const openSlackSettings = useCallback(
      (closeModal?: () => void, forceOpenDialog?: boolean) => {
        manageSlackWorkspaces(
          Boolean(selectedSlackWorkspace),
          slackWorkspaces,
          isSlackConnectDialogOpen,
          openSlackConnectDialog,
          onChangeSelectedSlackWorkspace,
          productId,
          closeModal,
          forceOpenDialog,
        );
      },
      [
        isSlackConnectDialogOpen,
        onChangeSelectedSlackWorkspace,
        slackWorkspaces,
        selectedSlackWorkspace,
        productId,
      ],
    );

    useEffect(() => {
      // Do nothing if user did not manually conncet
      if (!isAfterConnect) {
        return;
      }

      setIsAfterConnect(false);
      openSlackSettings(onCancelButtonClick);
    }, [
      isAfterConnect,
      openSlackSettings,
      onCancelButtonClick,
      slackWorkspaces,
    ]);

    const onConnectProvider = useCallback(
      (serviceKey: string, forceConnect?: boolean) => {
        triggerAnalyticsForClickConnectButton(serviceKey, createAnalyticsEvent);

        if (serviceKey === SLACK_SERVICE) {
          if (
            enableSlackv2 &&
            (slackWorkspaces.length < 1 || forceConnect) &&
            slackService
          ) {
            slackService.getConsent(async () => {
              const teamsResult = await slackService.getTeams();
              if (teamsResult.ok) {
                const teams = teamsResult.result;
                setSlackWorkspaces(teams);
                setIsAfterConnect(true);
              }
            });
            return;
          }

          openSlackSettings(onCancelButtonClick);
          return;
        }

        beginThirdPartyOauth(
          serviceKey,
          thirdPartyApiV2,
          (success: boolean, error?: AuthError) => {
            onThirdPartyIntegrationsChange();

            if (success) {
              triggerAnalyticsForIntegrationConnected(
                createAnalyticsEvent,
                serviceKey,
                undefined,
              );

              if (showFlag) {
                showFlag(getSuccessIntegrationFlag(serviceKey));
              }
            } else {
              triggerAnalyticsForIntegrationFailed(
                createAnalyticsEvent,
                serviceKey,
                error,
              );
            }
          },
        );
      },
      [
        createAnalyticsEvent,
        slackService,
        openSlackSettings,
        onCancelButtonClick,
        enableSlackv2,
        slackWorkspaces,
        onThirdPartyIntegrationsChange,
        showFlag,
        thirdPartyApiV2,
      ],
    );

    return (
      <ThirdPartyStateContext.Provider
        value={{
          isLoading,
          isOk,
          slackWorkspaces,
          selectedSlackWorkspace,
          loggedInEmailDomain,
          isSlackConnectDialogOpen,
          integrations: connectedIntegrations,
          enabledIntegrations,
          openSlackConnectDialog,
          closeSlackConnectDialog,
          onDisconnectSlackWorkspace,
          onThirdPartyIntegrationsChange,
          onChangeSelectedSlackWorkspace,
          queryThirdParty,
          onConnectProvider,
          enableSlackv2,
          abortThirdPartyRequests,
        }}
      >
        {children}
      </ThirdPartyStateContext.Provider>
    );
  },
);

export const useThirdPartyState = () => {
  const state = useContext(ThirdPartyStateContext);

  if (state === undefined) {
    throw new Error(
      'useThirdPartyState must be used within a ThirdPartyStateProvider',
    );
  }

  return state;
};
