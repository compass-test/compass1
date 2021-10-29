import testEpic from '../../common/util/test-epic';
import * as analyticsClient from '../../common/analytics/analytics-web-client';
import createMockStore from '../../common/util/create-mock-store';
import {
  redirectToConfluenceCreate,
  redirectToConfluenceCreateError,
} from '../actions';

import confluenceCreateDialog from './confluence-create-dialog';

window.open = jest.fn();
jest.mock('../../common/analytics/analytics-web-client');

const mockStoreFactory = (projectSpaceKey: string | null) =>
  createMockStore({
    confluence: {
      connectedSpace: {
        projectSpaceKey,
      },
    },
  });

describe('connect confluence space epic', () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });

  test('should invoke window.open with expected when the linked space key is not null', () =>
    testEpic({
      arrange: (input$: any) =>
        confluenceCreateDialog(input$, mockStoreFactory('SAMPLE')()),
      act: (input$: any) => {
        input$.next(redirectToConfluenceCreate());
        input$.complete();
      },
      assert: (actions: any) => {
        expect(actions).toEqual([]);
        expect(window.open).toHaveBeenCalledTimes(1);
        expect(
          analyticsClient.sendOperationalAnalyticsEvent,
        ).toHaveBeenCalledTimes(1);
        expect(
          analyticsClient.sendOperationalAnalyticsEvent,
        ).toHaveBeenCalledWith(
          expect.objectContaining({
            action: 'success',
            actionSubject: 'fetch',
            source: 'confluence.create.dialog.redirect',
          }),
        );
      },
    }));

  test('should emit redirectToConfluenceCreateError when the linked space key is null', () =>
    testEpic({
      arrange: (input$: any) =>
        confluenceCreateDialog(input$, mockStoreFactory(null)()),
      act: (input$: any) => {
        input$.next(redirectToConfluenceCreate());
        input$.complete();
      },
      assert: (actions: any) => {
        expect(actions).toEqual([redirectToConfluenceCreateError()]);
        expect(window.open).toHaveBeenCalledTimes(0);
        expect(
          analyticsClient.sendOperationalAnalyticsEvent,
        ).toHaveBeenCalledTimes(1);
        expect(
          analyticsClient.sendOperationalAnalyticsEvent,
        ).toHaveBeenCalledWith(
          expect.objectContaining({
            action: 'failed',
            actionSubject: 'fetch',
            source: 'confluence.create.dialog.redirect',
          }),
        );
      },
    }));
});
