import React from 'react';

import { render } from '@testing-library/react';
import { IntlProvider } from 'react-intl';

import { buildConfluenceNotification } from '../../../../../../common/mocks/notifications-factory';
import { LoadingState } from '../../../../../../common/types';
import { createMockProviders } from '../../../../../../common/utils/test-helpers';

import DocumentContainer from './index';

jest.mock('./document', () => {
  return () => {
    throw new Error('expected error for test');
  };
});

const baseNotification = buildConfluenceNotification({
  id: 'abcdef',
});

describe('DocumentContainer Component', () => {
  describe('ErrorHandling', () => {
    test('should show an error message when there is an error in the children', async () => {
      const { MockProviders, onAnalyticEventFired } = createMockProviders({
        shouldTrackAnalyticsPayload: (payload) =>
          payload.action === 'rendered' &&
          payload.actionSubject === 'errorBoundary',
      });

      const { findByText } = render(
        <IntlProvider locale="en">
          <MockProviders>
            <DocumentContainer
              loadingState={LoadingState.COMPLETE}
              onToggleExpand={() => {}}
              notificationContext={baseNotification}
              notificationPosition={1}
              isExpanded={false}
            />
          </MockProviders>
        </IntlProvider>,
      );

      const errorMessage = await findByText('Unable to load');
      expect(errorMessage).toBeTruthy();

      expect(onAnalyticEventFired).toHaveBeenCalledWith({
        action: 'rendered',
        actionSubject: 'errorBoundary',
        actionSubjectId: 'adf',
        attributes: {
          readStateFilter: 'any',
          categoryFilter: 'direct',
          errorBoundaryType: 'adf',
          isCritical: true,
          userHourOfDay: expect.any(Number),
          cloudId: 'c89df6e4-6019-4a28-ae77-0e64b2789c7d',
          notificationCategory: 'watching',
          notificationReadState: 'unread',
          listIndex: 1,
          notificationAgeInSeconds: 627106,
          registrationName: 'streamhub-confluence-page-like',
          registrationOwner: 'streamhub-confluence',
          registrationProduct: 'confluence',
          product: 'unset',
        },
        containers: {
          notification: {
            id: 'abcdef',
          },
        },
        eventType: 'operational',
        tenantIdType: 'none',
      });
    });

    test('should show an error message when loadingState === ERROR', async () => {
      const { findByText } = render(
        <IntlProvider locale="en">
          <DocumentContainer
            loadingState={LoadingState.ERROR}
            onToggleExpand={() => {}}
            notificationContext={baseNotification}
            notificationPosition={1}
            isExpanded={false}
          />
        </IntlProvider>,
      );

      const errorMessage = await findByText('Unable to load');
      expect(errorMessage).toBeTruthy();
    });
  });
});
