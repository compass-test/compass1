import React from 'react';

import NotificationList from '../src';
import { buildConfluenceNotification } from '../src/common/mocks/notifications-factory';

import ExamplePopup from './utils/examplePopup';
import { mockEndpoints } from './utils/mock-endpoints';
import { adfs } from './utils/mocks/mock-notifications-various-lengths';
import Providers from './utils/providers';

mockEndpoints({
  paginationLength: 50,
  override: {
    mockDataDirectWithContent: {
      notifications: [...Array(1000)].map((_, i) =>
        buildConfluenceNotification((original) => ({
          ...original,
          id: `mock_id_direct_${i}`,
          category: 'direct',
          bodyItemCount: 2,
          content: {
            ...original.content,
            body: {
              items: [
                {
                  type: 'RICH_TEXT_CONTENT',
                  appearance: 'QUOTED',
                  document: {
                    format: 'ADF',
                    data: adfs.long,
                  },
                  author: {
                    ari: 'ari:cloud:identity::user/5fb4ff6c0dd553006f374da6',
                  },
                },
                {
                  type: 'RICH_TEXT_CONTENT',
                  appearance: 'PRIMARY',
                  document: {
                    format: 'ADF',
                    data: adfs.short,
                  },
                },
              ],
            },
          },
        })),
      ),
    },
    mockDataWithContent: {
      notifications: [...Array(1000)].map((_, i) =>
        buildConfluenceNotification((original) => ({
          ...original,
          id: `mock_id_nd_${i}`,
          category: undefined,
          bodyItemCount: 2,
          content: {
            ...original.content,
            body: {
              items: [
                {
                  type: 'RICH_TEXT_CONTENT',
                  appearance: 'QUOTED',
                  document: {
                    format: 'ADF',
                    data: adfs.long,
                  },
                  author: {
                    ari: 'ari:cloud:identity::user/5fb4ff6c0dd553006f374da6',
                  },
                },
                {
                  type: 'RICH_TEXT_CONTENT',
                  appearance: 'PRIMARY',
                  document: {
                    format: 'ADF',
                    data: adfs.short,
                  },
                },
              ],
            },
          },
        })),
      ),
    },
  },
});

export default function LongList() {
  return (
    <Providers>
      <ExamplePopup>
        <NotificationList product="jira" testId="notification-list" />
      </ExamplePopup>
    </Providers>
  );
}
