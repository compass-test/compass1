import React, {
  Dispatch,
  FunctionComponent,
  SetStateAction,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';

import { ProductSearchDialog } from '../common/product-search-dialog';
import {
  LinkComponent,
  SearchCSS,
  SearchDialog,
} from '@atlassian/search-dialog';

import { ConfluenceRecentsClient, useClients } from '../confluence/clients';
import {
  JiraSearchClient,
  Results as JiraResults,
  useJiraSearchClientContext,
  useJiraCurrentUser,
} from '../jira/clients';
import { Results, Scope as JiraScope } from '../jira/clients/response-types';
import {
  DialogDismissedHandler,
  SearchDialogAnalyticsContext,
  useAnalyticsContext,
} from '../common/analytics';
import { mergeRefCallback } from '../utils/merge-ref-callback';
import {
  ConfluenceFeaturesOverrides,
  ConfluenceFeaturesProvider,
} from '../confluence/confluence-features';
import { JiraFeaturesOverrides, JiraFeaturesProvider } from '../jira/features';

import {
  UserDetails,
  UserProvider,
  useUserContext,
} from '../common/user-context';
import { Site } from '../common/clients';
import { FilterContextProvider as JiraFilterContextProvider } from '../jira/filter-context';
import { CrossProductSearchInput } from './cross-product-search-input';
import { useSearchSessionId } from '../common/search-session-provider';
import { withForwardRef } from '../utils/forward-ref';
import { FilterContextProvider as ConfluenceFilterContextProvider } from '../confluence/filter-context';
import { Results as ConfluenceResults } from '../confluence/clients/response-types';
import { Products } from '../common/product-context';
import { DialogContent } from './dialog-content';
import CancellablePromiseImpl from '../utils/cancellable-promise';
import { FilterOptionSource } from '../common/filters/types';

const INPUT_DEBOUNCE_IN_MS = 250;

type DialogWithInputProps = Omit<
  CrossProductSearchDialogProps & InternalProps,
  'products' | 'jiraFeatures' | 'confluenceFeatures'
> & {
  isPreQueryEmpty: boolean;
  setSelectedTabIndex: (index: number) => void;
};

// only for testing
export const DialogWithInput: FunctionComponent<DialogWithInputProps> = ({
  forwardRef,
  isExpanded,
  onClose,
  onOpen,
  onNavigate,
  disableDefaultNavigationOnInput = false,
  isPreQueryEmpty,
  linkComponent,
  formatDate,
  theme,
  setSelectedTabIndex,
}) => {
  const [query, setQuery] = useState('');

  // Get Jira user and set the user context
  const { user, setUser } = useUserContext();
  const currentUser = useJiraCurrentUser(user);
  setUser(currentUser);

  const {
    isLoading,
    setAdditionalAnalyticsContext,
    addAnalyticContext,
    nonPrivacySafeContext,
    queryVersion,
  } = useAnalyticsContext(query);

  useEffect(() => {
    // When collapsed reset stuff.
    if (!isExpanded) {
      setQuery('');
      setSelectedTabIndex(0);
      setAdditionalAnalyticsContext({ type: 'reset' });
    }
  }, [isExpanded, setAdditionalAnalyticsContext, setSelectedTabIndex]);

  const inputRef = useRef<HTMLInputElement>(null);

  // Store the height of the dialog, so it can be passed between jira and conf on tab change. This is used for styling.
  const dialogHeight = useRef<number | undefined>(undefined);

  // A closure to update the stored height from lower in the tree.
  const onDialogHeightChangedCB = useCallback((newHeight: number) => {
    dialogHeight.current = newHeight;
  }, []);

  const onNavigateCB = useCallback(
    (href: string, event: React.MouseEvent | KeyboardEvent) => {
      onNavigate?.(href, event);
      if (!disableDefaultNavigationOnInput) {
        onClose();
      }
    },
    [onClose, onNavigate, disableDefaultNavigationOnInput],
  );

  const onRetry = () => {
    inputRef?.current?.focus?.();
  };

  return (
    <SearchDialogAnalyticsContext
      analyticContext={addAnalyticContext}
      nonPrivacySafeAnalyticContextGenerator={nonPrivacySafeContext}
    >
      <DialogDismissedHandler isExpanded={isExpanded} />
      <CrossProductSearchInput
        isExpanded={isExpanded}
        onInput={setQuery}
        value={query}
        onNavigate={onNavigateCB}
        disableDefaultNavigationOnInput={disableDefaultNavigationOnInput}
        onOpen={onOpen}
        onBack={onClose}
        isLoading={isLoading}
        debounceTime={INPUT_DEBOUNCE_IN_MS}
        forwardRef={mergeRefCallback(inputRef, forwardRef)}
      />
      <SearchDialog>
        {isExpanded && (!isPreQueryEmpty || query) && (
          <DialogContent
            query={query}
            setSelectedTabIndex={setSelectedTabIndex}
            onRetry={onRetry}
            queryVersion={queryVersion}
            debounceTime={INPUT_DEBOUNCE_IN_MS}
            isExpanded={isExpanded}
            isAnyResultsLoading={isLoading}
            onNavigate={onNavigateCB}
            setAdditionalAnalyticsContext={setAdditionalAnalyticsContext}
            addAnalyticContext={addAnalyticContext}
            nonPrivacySafeContext={nonPrivacySafeContext}
            linkComponent={linkComponent}
            formatDate={formatDate}
            theme={theme}
            setDialogHeight={onDialogHeightChangedCB}
            dialogHeight={dialogHeight.current}
          />
        )}
      </SearchDialog>
    </SearchDialogAnalyticsContext>
  );
};

type PrimaryProductClients = {
  confluenceRecentClient: ConfluenceRecentsClient;
  jiraSearchClient: JiraSearchClient;
  primaryProduct: Products;
  setIsPreQueryEmpty: Dispatch<SetStateAction<boolean>>;
  hasAdvancedRoadmapsAccess: boolean | undefined;
  jiraSites: Site[];
  confluenceSites: Site[];
};

const WarmUpRecentItemsCache: React.FunctionComponent<PrimaryProductClients> = ({
  confluenceRecentClient,
  jiraSearchClient,
  primaryProduct,
  setIsPreQueryEmpty,
  hasAdvancedRoadmapsAccess,
  jiraSites,
  confluenceSites,
}) => {
  const searchSessionId = useSearchSessionId();

  // We don't care which specific scope result it is we just need the count. Hence any.
  let cancellablePromisesArray: Array<Promise<
    JiraResults<any> | ConfluenceResults<any>
  >> = [];

  if (primaryProduct === Products.confluence) {
    cancellablePromisesArray = [
      confluenceRecentClient.getRecentSpaces(),
      confluenceRecentClient.getRecentItems(),
    ].map((cancellablePromise) => cancellablePromise.promise());
  } else {
    const requestedEntities: Array<CancellablePromiseImpl<
      Results<
        | JiraScope.JiraIssue
        | JiraScope.JiraBoardProjectFilter
        | JiraScope.JiraPlan
      >
    >> = [
      jiraSearchClient.getRecentIssues(
        {
          sessionId: searchSessionId,
          referrerId: null,
        },
        jiraSites,
      ),
      jiraSearchClient.getRecentBoardsProjectsFilters(
        {
          sessionId: searchSessionId,
          referrerId: null,
        },
        jiraSites,
      ),
    ];

    if (hasAdvancedRoadmapsAccess) {
      requestedEntities.push(
        jiraSearchClient.getRecentPlans(
          {
            sessionId: searchSessionId,
            referrerId: null,
          },
          confluenceSites,
        ),
      );
    }

    cancellablePromisesArray = requestedEntities.map((cancellablePromise) =>
      cancellablePromise.promise(),
    );
  }

  Promise.all(cancellablePromisesArray)
    .then((results) => {
      const totalResultsLength = results.reduce((sum, { items }) => {
        return sum + items.length;
      }, 0);
      setIsPreQueryEmpty(totalResultsLength === 0);
    })
    .catch(() => {
      // something blew up while fetching
      setIsPreQueryEmpty(true);
    });

  return null;
};

export type CrossProductSearchDialogProps = {
  /**
   * Callback that gets called when the dialog is opened. Typically the isExpanded prop will be to true as part of this callback.
   */
  onOpen: (e?: React.MouseEvent | KeyboardEvent) => void;

  /**
   * Callback that gets called when the dialog is closed. Typically the isExpanded prop will be to false as part of this callback.
   */
  onClose: () => void;

  /**
   * Whether the dialog is open or close. We do not control this state internally instead it's up to the consumers to set this to the appropriate values. Typically
   * this is done in the `onOpen` or `onClose` callbacks and when a certain shortcut key is pressed.
   */
  isExpanded: boolean;

  /**
   * This is called to provide custom routing logic (SPA transitions) outside of link clicks, e.g. when the user presses 'enter'.
   */
  onNavigate: (href: string, event: React.MouseEvent | KeyboardEvent) => void;

  /**
   * This toggles whether a navigation will be triggered when the user presses 'enter' while focused on the input.
   */
  disableDefaultNavigationOnInput?: boolean;

  /**
   * A set of features toggles that is specific to Jira. This will contain features that should only be on when the user has the required permissions.
   * It's up to the consumer of this component to perform the permission check and set the features here as appropriate.
   */
  jiraFeatures?: JiraFeaturesOverrides;

  /**
   * A set of features toggles that is specific to Jira. This will contain features that should only be on when the user has the required permissions.
   * It's up to the consumer of this component to perform the permission check and set the features here as appropriate.
   */
  confluenceFeatures?: ConfluenceFeaturesOverrides;

  /**
   * A date time formatter. An example of a date string would be: 2020-09-29T17:32:10+00:00
   */
  formatDate?: (lastModified: string) => JSX.Element;

  /**
   * The details of the current user. This is used to populate some default filter options.
   */
  user?: UserDetails;

  /**
   * This will replace all links with the given component. This will be used to ensure that results provided will be properly SPA transitioned.
   * Do not use this for styling.
   */
  linkComponent?: LinkComponent;

  /**
   * A list of supported products, if this is empty then no search will be rendered.
   *
   * This list must include the product provided in the `primaryProduct` prop.
   */
  products: Products[];

  /**
   * The product the dialog will be rendered in. This is used for features like determining which products will have SPA transitions.
   *
   * Do not provide any value here if none the products provided in the products prop matches the location that the dialog is rendered in.
   */
  primaryProduct?: string;

  /**
   * Whether to perform a permission check on mount to ensure you have the right permission for the given products
   */
  doProductPermissionsCheck?: boolean;

  /**
   * Theming for search
   */
  theme?: SearchCSS;
};

// These props should not be provided by consumers, there should be a wrapper that provide these without exposing them to consumers
// e.g. forwardRef should be removed by withForwardRef before it gets exported at the root level
// This is here so that we export the right prop type to consumers and is indeed a hack.
export type InternalProps = {
  forwardRef: React.Ref<HTMLInputElement>;
};

export const CrossProductSearchDialog: FunctionComponent<
  CrossProductSearchDialogProps & InternalProps
> = ({ theme, forwardRef, doProductPermissionsCheck = true, ...rest }) => {
  const { searchClient, recentClient, sites: confluenceSites } = useClients();
  const {
    searchClient: jiraSearchClient,
    sites: jiraSites,
  } = useJiraSearchClientContext();
  const [selectedTabIndex, setSelectedTabIndex] = useState(0);
  const {
    isExpanded,
    onClose,
    products,
    primaryProduct,
    jiraFeatures,
    confluenceFeatures,
    user,
  } = rest;
  const hasAdvancedRoadmapsAccess = jiraFeatures?.hasAdvancedRoadmapsAccess;
  const [isPreQueryEmpty, setIsPreQueryEmpty] = useState(false);

  if (products.length === 0) {
    return null;
  }

  const primaryProductSearchClient =
    products[0] === Products.confluence ? searchClient : jiraSearchClient;

  return (
    <ProductSearchDialog
      onClose={onClose}
      isExpanded={isExpanded}
      theme={theme}
      sharedClient={primaryProductSearchClient}
      products={products}
      selectedTabIndex={selectedTabIndex}
      primaryProduct={primaryProduct}
      doProductPermissionsCheck={doProductPermissionsCheck}
    >
      {(setRef) => {
        const ref = mergeRefCallback(setRef, forwardRef);
        return (
          <>
            <JiraFeaturesProvider features={jiraFeatures}>
              <JiraFilterContextProvider
                isEnabled={isExpanded}
                defaultSiteFilters={
                  jiraSites
                    ? jiraSites.map((site, index) => ({
                        ...site,
                        id: site.cloudId,
                        isChecked: false,
                        isVisible: index < 3,
                        filterSource: FilterOptionSource.EXTERNAL,
                      }))
                    : undefined
                }
              >
                <ConfluenceFeaturesProvider features={confluenceFeatures}>
                  <ConfluenceFilterContextProvider
                    isEnabled={isExpanded}
                    defaultSiteFilters={
                      confluenceSites
                        ? confluenceSites.map((site, index) => ({
                            ...site,
                            id: site.cloudId,
                            isChecked: false,
                            isVisible: index < 3,
                            filterSource: FilterOptionSource.EXTERNAL,
                          }))
                        : undefined
                    }
                  >
                    <UserProvider user={user}>
                      <DialogWithInput
                        {...rest}
                        isPreQueryEmpty={isPreQueryEmpty}
                        forwardRef={ref}
                        theme={theme}
                        setSelectedTabIndex={setSelectedTabIndex}
                        doProductPermissionsCheck={!!doProductPermissionsCheck}
                      />
                    </UserProvider>
                  </ConfluenceFilterContextProvider>
                </ConfluenceFeaturesProvider>
              </JiraFilterContextProvider>
            </JiraFeaturesProvider>
            {!isExpanded ? (
              <WarmUpRecentItemsCache
                primaryProduct={products[0]}
                setIsPreQueryEmpty={setIsPreQueryEmpty}
                confluenceRecentClient={recentClient}
                jiraSearchClient={jiraSearchClient}
                hasAdvancedRoadmapsAccess={hasAdvancedRoadmapsAccess}
                jiraSites={jiraSites}
                confluenceSites={confluenceSites}
              />
            ) : null}
          </>
        );
      }}
    </ProductSearchDialog>
  );
};

export default withForwardRef(CrossProductSearchDialog);
