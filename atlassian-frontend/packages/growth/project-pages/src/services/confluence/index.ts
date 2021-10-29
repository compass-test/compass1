import { ConfluenceBlueprintPage } from '../../state/confluence/types';

// copied from src/state/epics/requests.ts to avoid having to use Redux
// if productionised, we can remove the redux version in requests.ts
const IGNORE_MAU_HEADER = 'x-atlassian-mau-ignore';

const fetchJson = <T>(url: string, init?: RequestInit): Promise<T> =>
  fetch(url, { credentials: 'include', ...init }).then((response) => {
    if (response.ok) {
      return response.json();
    }
    throw new Error(
      `Unable to fetch ${url} ${response.status} ${response.statusText}`,
    );
  });

export const createConfluenceDraft = ({
  templateId,
  projectSpaceKey,
  projectPageLinkedId,
  pageTitle,
  isEmbeddedPage,
}: {
  templateId: string;
  projectSpaceKey: string;
  projectPageLinkedId: string | null;
  pageTitle?: string;
  isEmbeddedPage: boolean;
}) =>
  fetchJson<ConfluenceBlueprintPage>(
    `/wiki/rest/create-dialog/1.0/content/blueprint/${templateId}/instance`,
    {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
        [IGNORE_MAU_HEADER]: 'true',
      },
      body: JSON.stringify({
        content: {
          type: 'page',
          status: 'draft',
          space: { key: projectSpaceKey },
          ...(projectPageLinkedId && {
            ancestors: [{ id: projectPageLinkedId }],
          }),
          title: pageTitle,
          ...(isEmbeddedPage && {
            metadata: {
              frontend: {
                embedded: true,
              },
            },
          }),
        },
        contentBlueprintSpec: {
          context: {},
          blueprintId: templateId,
        },
      }),
    },
  );
