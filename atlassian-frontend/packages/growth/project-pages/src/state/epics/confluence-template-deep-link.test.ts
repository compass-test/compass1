import { of } from 'rxjs/observable/of';
import testEpic from '../../common/util/test-epic';
import createMockStore from '../../common/util/create-mock-store';
import * as fetchRequestAnalytics from '../../common/fetch-request-analytics';
import {
  redirectToConfluenceTemplateDeepLink,
  redirectToConfluenceTemplateDeepLinkError,
} from '../actions';
import { ConfluenceBlueprintPage, ConfluencePage } from '../confluence/types';
import confluenceTemplateDeepLink from './confluence-template-deep-link';
import * as requests from './requests';

const mockTemplateId = '00000000-0000-0000-0000-000000000000';
const mockSkipHowToUse = false;

const mockStoreFactory = ({
  projectSpaceKey,
  projectPageLinkedId,
}: {
  projectSpaceKey?: string | null;
  projectPageLinkedId?: string | null;
}) =>
  createMockStore({
    confluence: {
      connectedSpace: {
        projectSpaceKey,
        projectPageLinkedId,
      },
    },
  });

const noop = () => {};
window.open = jest.fn();

jest.mock('../../common/fetch-request-analytics', () => ({
  __esModule: true,
  fetchFailed: jest.fn(),
  fetchSuccess: jest.fn(),
}));

jest.mock('./requests', () => ({
  __esModule: true,
  ...jest.requireActual<Object>('./requests'),
  createConfluenceDraft$: jest.fn(),
  createConfluenceBlank$: jest.fn(),
}));

describe('connect confluence space epic', () => {
  let fetchFailedMock = fetchRequestAnalytics.fetchFailed as jest.Mock;
  let fetchSuccessMock = fetchRequestAnalytics.fetchSuccess as jest.Mock;
  let windowOpenMock = window.open as jest.Mock;
  const mockConfluenceDraft$ = requests.createConfluenceDraft$ as jest.Mock;
  const mockConfluenceBlank$ = requests.createConfluenceBlank$ as jest.Mock;

  beforeEach(() => {
    windowOpenMock.mockReturnValue({
      opener: '',
      location: {
        href: '',
      },
      close: noop,
    });
    mockConfluenceDraft$.mockImplementation(() =>
      of<
        Pick<
          ConfluenceBlueprintPage<Pick<ConfluencePage, '_links'>>,
          '_links' | 'content'
        >
      >({
        _links: {
          base: 'https://test-instance.jira-dev.com/wiki',
        },
        content: {
          _links: {
            base: '',
            editui:
              '/pages/resumedraft.action?draftId=TEST-DRAFT-ID&draftShareId=TEST-DRAFT_SHARE-ID',
          },
        },
      }),
    );
    mockConfluenceBlank$.mockImplementation(() =>
      of<Pick<ConfluencePage, '_links'>>({
        _links: {
          base: 'https://test-instance.jira-dev.com/wiki',
          editui:
            '/pages/resumedraft.action?draftId=TEST-DRAFT-ID&draftShareId=TEST-DRAFT_SHARE-ID',
        },
      }),
    );
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('should invoke window.open with expected when the linked space key is not null', () =>
    testEpic({
      arrange: (input$: any) =>
        confluenceTemplateDeepLink(
          input$,
          mockStoreFactory({ projectSpaceKey: 'SAMPLE' })(),
        ),
      act: (input$: any) => {
        input$.next(
          redirectToConfluenceTemplateDeepLink(
            mockTemplateId,
            mockSkipHowToUse,
          ),
        );
        input$.complete();
      },
      assert: (actions: any) => {
        expect(actions).toEqual([]);
        expect(windowOpenMock).toBeCalledTimes(1);
        expect(fetchSuccessMock).toBeCalledTimes(1);
        expect(fetchSuccessMock.mock.calls[0][0]).toBe(
          'confluence.template.redirect',
        );
      },
    }));

  test('should emit redirectToConfluenceCreateError when the linked space key is null', () =>
    testEpic({
      arrange: (input$: any) =>
        confluenceTemplateDeepLink(
          input$,
          mockStoreFactory({ projectSpaceKey: null })(),
        ),
      act: (input$: any) => {
        input$.next(
          redirectToConfluenceTemplateDeepLink(
            mockTemplateId,
            mockSkipHowToUse,
          ),
        );
        input$.complete();
      },
      assert: (actions: any) => {
        expect(actions).toEqual([redirectToConfluenceTemplateDeepLinkError()]);
        expect(windowOpenMock).toBeCalledTimes(0);
        expect(fetchFailedMock).toBeCalledTimes(1);
        expect(fetchFailedMock.mock.calls[0][0]).toBe(
          'confluence.template.redirect',
        );
        expect(fetchFailedMock.mock.calls[0][1]).toMatchObject(
          new Error('missing projectSpaceKey in project-pages state'),
        );
      },
    }));

  test('should emit redirectToConfluenceCreateError when the template id is undefined', () =>
    testEpic({
      arrange: (input$: any) =>
        confluenceTemplateDeepLink(
          input$,
          mockStoreFactory({ projectSpaceKey: 'SAMPLE' })(),
        ),
      act: (input$: any) => {
        input$.next(
          redirectToConfluenceTemplateDeepLink(undefined, mockSkipHowToUse),
        );
        input$.complete();
      },
      assert: (actions: any) => {
        expect(actions).toEqual([redirectToConfluenceTemplateDeepLinkError()]);
        expect(windowOpenMock).toBeCalledTimes(0);
        expect(fetchFailedMock).toBeCalledTimes(1);
        expect(fetchFailedMock.mock.calls[0][0]).toBe(
          'confluence.template.redirect',
        );
        expect(fetchFailedMock.mock.calls[0][1]).toMatchObject(
          new Error('missing templateId'),
        );
      },
    }));

  test('should invoke window.open with expected when the template id is null', () =>
    testEpic({
      arrange: (input$: any) =>
        confluenceTemplateDeepLink(
          input$,
          mockStoreFactory({ projectSpaceKey: 'SAMPLE' })(),
        ),
      act: (input$: any) => {
        input$.next(
          redirectToConfluenceTemplateDeepLink(null, mockSkipHowToUse),
        );
        input$.complete();
      },
      assert: (actions: any) => {
        expect(actions).toEqual([]);
        expect(windowOpenMock).toBeCalledTimes(1);
        expect(fetchSuccessMock).toBeCalledTimes(1);
        expect(fetchSuccessMock.mock.calls[0][0]).toBe(
          'confluence.template.redirect',
        );
      },
    }));

  describe('With linked project pages id', () => {
    const arrangeLinkedPageIdTestEpic = (
      projectPageLinkedId: string | null,
      isBlankPage: boolean,
      assert: any, // TODO type
    ) =>
      testEpic({
        arrange: (input$: any) =>
          confluenceTemplateDeepLink(
            input$,
            mockStoreFactory({
              projectSpaceKey: 'SAMPLE',
              projectPageLinkedId,
            })(),
          ),
        act: (input$: any) => {
          input$.next(
            redirectToConfluenceTemplateDeepLink(
              isBlankPage ? null : mockTemplateId, // blank pages don't have a template id
              true, // required for draft creation functions to be invoked
            ),
          );
          input$.complete();
        },
        assert,
      });

    test('the blueprint draft creation function should be called as expected', async () => {
      await arrangeLinkedPageIdTestEpic(
        'TEST-PAGE-LINKED-ID',
        false,
        (actions: any) => {
          // An empty action is expected on success
          expect(actions).toEqual([]);

          // Check BLUEPRINT draft creation function is called as expected
          expect(mockConfluenceDraft$).toHaveBeenCalledWith(
            expect.objectContaining({
              projectPageLinkedId: 'TEST-PAGE-LINKED-ID',
            }),
          );

          expect(windowOpenMock).toBeCalledTimes(1);

          // Check no failure event is fired
          expect(fetchFailedMock).toBeCalledTimes(0);
        },
      );
    });

    test('the blank page draft creation function should be called as expected', async () => {
      await arrangeLinkedPageIdTestEpic(
        'TEST-PAGE-LINKED-ID',
        true,
        (actions: any) => {
          // An empty action is expected on success
          expect(actions).toEqual([]);

          // Check BLANK PAGE draft creation function is called as expected
          expect(mockConfluenceBlank$).toHaveBeenCalledWith(
            expect.objectContaining({
              projectPageLinkedId: 'TEST-PAGE-LINKED-ID',
            }),
          );

          expect(windowOpenMock).toBeCalledTimes(1);

          // Check no failure event is fired
          expect(fetchFailedMock).toBeCalledTimes(0);
        },
      );
    });

    test('a linked project pages id should not be required', async () => {
      arrangeLinkedPageIdTestEpic(null, true, (actions: any) => {
        // An empty action is expected on success
        expect(actions).toEqual([]);
      });
    });
  });
});
