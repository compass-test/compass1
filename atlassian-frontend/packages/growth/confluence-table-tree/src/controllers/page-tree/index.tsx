import React, { useCallback, useContext, useEffect, useState } from 'react';
import {
  withAnalyticsEvents,
  WithAnalyticsEventsProps,
} from '@atlaskit/analytics-next';
import { ConfluenceTableTreeData, getPageTreeItemProperties } from './utils';
import {
  AnalyticsAttributes,
  fireOperationalAnalytics,
} from '@atlassian/analytics-bridge';
import { getPage, getChildren, getDrafts } from '../../services/confluence';
import {
  PageDataWithAncestors,
  Errors,
  PageTreeItem,
  TreeStates,
  PageTreeItemProperties,
} from '../../types';
import {
  ConfluencePageTreeProviderProps,
  PageTree,
  PageTreeContextType,
} from './types';
import { AnalyticsProvider } from '../../common/AnalyticsProvider';
import { useDraftsToggle } from '../drafts-toggle';

const tree = new ConfluenceTableTreeData();

const ConfluencePageTreeContext = React.createContext<PageTreeContextType>({
  treeState: TreeStates.Loading,
  spaceKey: null,
  rootContentId: null,
  items: null,
  errorType: null,
  accountId: '',
  setContent: () => {},
  expandSubtree: () => Promise.reject(),
  collapseSubtree: () => {},
  insertPage: () => Promise.reject(),
  updatePage: () => Promise.reject(),
  removePage: () => Promise.reject(),
});

// a limited export to prevent consumers from accessing internals
export const useConfluencePageTree = (): PageTree => {
  const {
    treeState,
    setContent,
    insertPage,
    updatePage,
    removePage,
  } = useContext<PageTreeContextType>(ConfluencePageTreeContext);
  return {
    treeState,
    setContent,
    insertPage,
    updatePage,
    removePage,
  };
};

export const useConfluencePageTreeContext = (): PageTreeContextType =>
  useContext<PageTreeContextType>(ConfluencePageTreeContext);

export const ConfluencePageTreeContextProvider = withAnalyticsEvents()(
  ({
    onError,
    createAnalyticsEvent,
    accountId,
    children,
  }: Omit<ConfluencePageTreeProviderProps, 'analyticsClient'> &
    WithAnalyticsEventsProps) => {
    const [items, setItems] = useState<PageTreeItem[] | null>(null);
    const [errorType, setErrorType] = useState<Errors | null>(null);
    const [spaceKey, setSpaceKey] = useState<string | null>(null);
    const [rootContentId, setRootContentId] = useState<string | null>(null);
    const [
      { isDraftsShown, isTreeUpdatedForDrafts },
      { loadIsDraftsShownPreference, setIsTreeUpdatedForDrafts },
    ] = useDraftsToggle();

    const setContent = useCallback(
      (spaceKey: string, rootContentId?: string) => {
        setSpaceKey(spaceKey);
        setRootContentId(rootContentId || null);
      },
      [],
    );

    // use this instead of setItems() that may affect root items to ensure Empty state is updated appropriately
    const updateTree = useCallback((items: PageTreeItem[], isRoot: boolean) => {
      if (isRoot) {
        setErrorType(items.length > 0 ? null : Errors.Empty);
      }
      setItems(items);
    }, []);

    const firePageTreeOperationalEvent = useCallback(
      (event: string, attributes: AnalyticsAttributes) => {
        if (createAnalyticsEvent) {
          fireOperationalAnalytics(
            createAnalyticsEvent({}),
            `confluencePageTree ${event}`,
            attributes,
          );
        }
      },
      [createAnalyticsEvent],
    );

    const firePageTreeShownEvent = useCallback(
      (pageCount: number, root: boolean) =>
        firePageTreeOperationalEvent('shown', {
          pageCount,
          root,
        }),
      [firePageTreeOperationalEvent],
    );

    const firePageTreeFailedEvent = useCallback(
      (error: Error, root: boolean) =>
        firePageTreeOperationalEvent('failed', {
          error:
            typeof error === 'string'
              ? 'Failed to fetch'
              : String(error.message),
          root,
        }),
      [firePageTreeOperationalEvent],
    );

    /**
     * Fetch fresh data for published pages (and drafts if necessary) and update the tree in 1 or 2 steps
     *
     * @param parentContentId the subtree under this contentId would be fetched
     * @returns a promise that resolves when the tree is fully updated
     */
    const fetchAndUpdateSubtree = useCallback(
      async (parentContentId: string | null): Promise<void> => {
        const isRoot = parentContentId === rootContentId;

        // if toggle is off, just do a simple fetch and update
        if (!isDraftsShown) {
          const publishedPages = await getChildren(spaceKey, parentContentId);
          const updatedTree = tree.updateChildPages(
            publishedPages,
            isRoot ? undefined : parentContentId || undefined,
          );
          updateTree(updatedTree, isRoot);
          return;
        }

        // if children exists already for the parent, don't progressively update, just replace everything in one hit
        let shouldProgressiveUpdate = true;
        if (isRoot) {
          shouldProgressiveUpdate = tree.getRootPages().length === 0;
        } else if (parentContentId) {
          shouldProgressiveUpdate =
            tree.getPage(parentContentId)?.children === undefined;
        }

        // fire off the drafts call async
        let draftPages: PageDataWithAncestors[] | null = null;
        const draftsPromise = getDrafts(spaceKey, parentContentId);
        draftsPromise.then((drafts: PageDataWithAncestors[]) => {
          draftPages = drafts;
        });

        // but we always want to wait for published pages
        const publishedPages = await getChildren(spaceKey, parentContentId);

        // once we have published pages, update the tree object with what was received
        const updatedTree = tree.updateChildPages(
          publishedPages,
          isRoot ? undefined : parentContentId || undefined,
        );

        // if the drafts fetch has finished at this point, we can do a single update with everything
        if (draftPages !== null) {
          updateTree(tree.injectPages(draftPages), isRoot);
          firePageTreeShownEvent(publishedPages.length, isRoot); // this doesn't count drafts :(
          return;
        }

        // if not, we can progressively update with just the published pages at this point
        if (shouldProgressiveUpdate) {
          updateTree(updatedTree, isRoot);
        }

        // finally we wait for drafts to finish loading and inject them
        updateTree(tree.injectPages(await draftsPromise), isRoot);
        firePageTreeShownEvent(publishedPages.length, isRoot);
      },
      [
        rootContentId,
        firePageTreeShownEvent,
        isDraftsShown,
        spaceKey,
        updateTree,
      ],
    );

    const fetchRootTree = useCallback(async () => {
      if (rootContentId === null && spaceKey === null) {
        return;
      }
      try {
        await fetchAndUpdateSubtree(rootContentId);
        setIsTreeUpdatedForDrafts(true);
      } catch (err) {
        const { message } = err;
        const newErrorState = message.includes('404')
          ? Errors.Empty
          : Errors.Error;
        firePageTreeFailedEvent(err, true);
        setErrorType(newErrorState);
      }
    }, [
      rootContentId,
      fetchAndUpdateSubtree,
      firePageTreeFailedEvent,
      setIsTreeUpdatedForDrafts,
      spaceKey,
    ]);

    const expandSubtree = useCallback(
      async (parentContentId: string) => {
        // expand the subtree from the start to reveal the spinner row first
        setItems(tree.setIsExpanded(parentContentId, true));
        try {
          await fetchAndUpdateSubtree(parentContentId);
        } catch (error) {
          firePageTreeFailedEvent(error, false);
          setItems(tree.markChildError(parentContentId));
          onError?.(error);
        }
        // collapse & prune the subtree if in the end we found no children
        if (tree.getPage(parentContentId)?.children === undefined) {
          setItems(tree.pruneSubtree(parentContentId));
        }
      },
      [fetchAndUpdateSubtree, firePageTreeFailedEvent, onError],
    );

    const collapseSubtree = useCallback((parentContentId: string) => {
      setItems(tree.setIsExpanded(parentContentId, false));
    }, []);

    const updatePage = useCallback(
      async (
        contentId: string,
        status: 'draft' | 'current',
      ): Promise<PageTreeItemProperties | undefined> => {
        try {
          const page = await getPage(contentId, status);
          setItems(tree.injectPages([page]));
          return getPageTreeItemProperties(page);
        } catch (error) {
          firePageTreeFailedEvent(error, false);
          onError?.(error);
        }
      },
      [firePageTreeFailedEvent, onError],
    );

    const insertPage = useCallback(
      async (
        contentId: string,
        parentContentId?: string,
      ): Promise<PageTreeItemProperties | undefined> => {
        try {
          // when inserting a page, we first try to fetch the latest tree
          await fetchAndUpdateSubtree(parentContentId || rootContentId);
          // this subtree may not yet contain the new page, so we fetch it directly as well
          const page = await getPage(contentId, 'draft');
          // and inject it into the tree
          updateTree(
            tree.injectPages([page]),
            parentContentId === undefined || parentContentId === rootContentId,
          );
          return getPageTreeItemProperties(page);
        } catch (error) {
          firePageTreeFailedEvent(error, parentContentId === undefined);
          onError?.(error);
        }
      },
      [
        fetchAndUpdateSubtree,
        firePageTreeFailedEvent,
        onError,
        rootContentId,
        updateTree,
      ],
    );

    const removePage = useCallback(
      async (contentId: string) => {
        const page = tree.getPage(contentId);
        try {
          // try to update the tree, which may reflect the latest changes like child pages shifting up to parent
          await fetchAndUpdateSubtree(page?.parent?.id || rootContentId);
          // forcibly remove page from tree if for some reason it is still in the tree
          updateTree(tree.removePage(contentId), page?.parent === undefined);
        } catch (error) {
          firePageTreeFailedEvent(error, page?.parent === undefined);
          onError?.(error);
        }
      },
      [
        fetchAndUpdateSubtree,
        firePageTreeFailedEvent,
        onError,
        rootContentId,
        updateTree,
      ],
    );

    // initialise the drafts toggle preference on mount
    useEffect(() => {
      loadIsDraftsShownPreference(accountId);
    }, [loadIsDraftsShownPreference, accountId]);

    // initial load: load the page tree when we don't have a page tree
    useEffect(() => {
      if (isDraftsShown === null) {
        // don't start fetching until draft setting is loaded
        return;
      }
      if (items === null) {
        fetchRootTree();
      }
    }, [isDraftsShown, items, setIsTreeUpdatedForDrafts, fetchRootTree]);

    // handle fetching/purging drafts in page tree when the toggle setting changes
    useEffect(() => {
      if (items === null) {
        return;
      }
      if (isTreeUpdatedForDrafts === false) {
        setIsTreeUpdatedForDrafts(null); // put it in a loading state so we don't retrigger it
        if (isDraftsShown) {
          // TODO optimise this to only getDrafts
          fetchRootTree();
        } else {
          const updatedTree = tree.purgeDrafts();
          if (updatedTree.length === 0) {
            setErrorType(Errors.Empty);
          }
          updateTree(updatedTree, true);
          setIsTreeUpdatedForDrafts(true);
        }
      }
    }, [
      isDraftsShown,
      items,
      isTreeUpdatedForDrafts,
      setIsTreeUpdatedForDrafts,
      updateTree,
      fetchRootTree,
    ]);

    // if spaceKey or contentId changes, reload
    useEffect(() => {
      setErrorType(null);
      setItems(null);
      tree.init(rootContentId);
    }, [spaceKey, rootContentId]);

    // tree state is an entirely derived var
    let treeState: TreeStates = TreeStates.Loading;
    if (errorType === Errors.Empty) {
      treeState = TreeStates.Empty;
    } else if (errorType === Errors.Error) {
      treeState = TreeStates.Error;
    } else if (items && items.length > 0) {
      treeState = TreeStates.RenderedChildren;
    }

    return (
      <ConfluencePageTreeContext.Provider
        value={{
          treeState,
          spaceKey,
          errorType,
          rootContentId,
          accountId,
          items,
          setContent,
          expandSubtree,
          collapseSubtree,
          insertPage,
          updatePage,
          removePage,
        }}
      >
        {children}
      </ConfluencePageTreeContext.Provider>
    );
  },
);

export const ConfluencePageTreeProvider = ({
  analyticsClient,
  ...props
}: ConfluencePageTreeProviderProps) => (
  <AnalyticsProvider analyticsClient={analyticsClient}>
    <ConfluencePageTreeContextProvider {...props} />
  </AnalyticsProvider>
);
