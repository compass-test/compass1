import { useAnalyticsEvents } from '@atlaskit/analytics-next';
import { createContent } from '@atlassian/embedded-confluence';
import { useConfluencePageTree } from '@atlassiansox/confluence-table-tree';
import { useCallback } from 'react';
import {
  OPERATIONAL_EVENT_TYPE,
  PROJECT_PAGES_CHANNEL,
  TRACK_EVENT_TYPE,
} from '../../common/analytics/util';
import { useEmbeddedPage } from '.';
import { createConfluenceDraft } from '../../services/confluence';
import { BlueprintData } from '../../state/ui/blueprints/types';

export const useCreateEmbeddedPage = (spaceKey: string | null) => {
  const { setEmbeddedPage } = useEmbeddedPage();
  const { insertPage } = useConfluencePageTree();
  const { createAnalyticsEvent } = useAnalyticsEvents();
  return useCallback<
    (
      parentContentId: string | undefined,
      isRoot: boolean,
      blueprint?: BlueprintData,
    ) => Promise<void>
  >(
    async (parentContentId, isRoot, blueprint) => {
      if (spaceKey) {
        setEmbeddedPage({
          mode: 'edit',
          isOpen: true,
          isLoading: true,
          page: null,
          pageCreate: {
            error: null,
            parentContentId,
            isRoot,
            blueprint,
          },
        });
        try {
          const contentId = blueprint?.contentBlueprintId
            ? (
                await createConfluenceDraft({
                  projectSpaceKey: spaceKey,
                  projectPageLinkedId: parentContentId || null,
                  templateId: blueprint.contentBlueprintId,
                  isEmbeddedPage: true,
                })
              ).content.id
            : (
                await createContent({
                  spaceKey,
                  parentPageId: parentContentId,
                  parentProduct: 'JSW',
                })
              ).contentId;
          if (contentId) {
            setEmbeddedPage({
              page: {
                id: contentId,
                url: `/wiki/spaces/${spaceKey}/pages/${contentId}`, // we don't have a view url yet, so construct a temporary one (that won't work until published)
                editUrl: '',
                hasEmbeddedEdit: true,
                isDraft: true,
              },
            });
            createAnalyticsEvent({
              analyticsType: TRACK_EVENT_TYPE,
              action: 'created',
              actionSubject: 'embeddedPageDraft',
              template: blueprint?.name || 'blank',
              embeddedPageAction: true,
            }).fire(PROJECT_PAGES_CHANNEL);
            try {
              await insertPage(contentId, parentContentId);
            } catch {
              // ignore error
            }
          } else {
            throw new Error('createContent returned undefined contentId');
          }
        } catch (error) {
          setEmbeddedPage({
            page: null,
            isLoading: false,
            pageCreate: {
              error,
              parentContentId,
              isRoot,
              blueprint,
            },
          });
          createAnalyticsEvent({
            analyticsType: OPERATIONAL_EVENT_TYPE,
            action: 'failed',
            actionSubject: 'createEmbeddedPageDraft',
            template: blueprint?.name || 'blank',
            embeddedPageAction: true,
            errorMessage: String(error) || 'Unknown error',
          }).fire(PROJECT_PAGES_CHANNEL);
          return;
        }
      }
    },
    [createAnalyticsEvent, insertPage, setEmbeddedPage, spaceKey],
  );
};
