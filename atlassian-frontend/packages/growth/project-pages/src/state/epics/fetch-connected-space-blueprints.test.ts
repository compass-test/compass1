import { of } from 'rxjs/observable/of';
import { _throw } from 'rxjs/observable/throw';

import testEpic from '../../common/util/test-epic';
import * as analyticsClient from '../../common/analytics/analytics-web-client';
import createMockStore from '../../common/util/create-mock-store';
import {
  fetchConnectedSpaceBlueprints,
  fetchConnectedSpaceBlueprintsError,
  updateConnectedSpaceBlueprints,
} from '../actions';

import fetchConnectedSpaceBlueprintsEpic from './fetch-connected-space-blueprints';
import * as requests from './requests';

jest.mock('./requests');
jest.mock('../../common/analytics/analytics-web-client');

const sampleBlueprintResponseData = [
  {
    name: 'Blank page',
    description: 'Start with a blank page.',
    styleClass: 'icon-blank-page-large',
    iconURL:
      '/wiki/s/-511359687/6452/8663f1f5f8d62a9e971433ce78bf09d9fc940f26/1000.0.46/_/download/resources/com.atlassian.confluence.plugins.confluence-create-content-plugin:resources/images/preview-default-template.png',
    itemModuleCompleteKey:
      'com.atlassian.confluence.plugins.confluence-create-content-plugin:create-blank-page',
    contentBlueprintId: '00000000-0000-0000-0000-000000000000',
    skipHowToUse: false,
    isNew: true,
    isPromoted: false,
    new: true,
    promoted: false,
  },
  {
    name: 'Blog post',
    description: 'Share news and announcements with your team.',
    styleClass: 'icon-blogpost-large',
    iconURL:
      '/wiki/s/-511359687/6452/8663f1f5f8d62a9e971433ce78bf09d9fc940f26/1000.0.46/_/download/resources/com.atlassian.confluence.plugins.confluence-create-content-plugin:resources/images/preview-default-template.png',
    itemModuleCompleteKey:
      'com.atlassian.confluence.plugins.confluence-create-content-plugin:create-blog-post',
    contentBlueprintId: '00000000-0000-0000-0000-000000000001',
    skipHowToUse: false,
    isNew: true,
    isPromoted: false,
    new: true,
    promoted: false,
  },
  {
    name: 'Decision',
    description:
      'Record important project decisions and communicate them with your team.',
    styleClass: 'decisions-blueprint-icon large',
    iconURL:
      '/wiki/s/-511359687/6452/8663f1f5f8d62a9e971433ce78bf09d9fc940f26/1000.0.46/_/download/resources/com.atlassian.confluence.plugins.confluence-create-content-plugin:resources/images/preview-default-template.png',
    itemModuleCompleteKey:
      'com.atlassian.confluence.plugins.confluence-business-blueprints:decisions-blueprint-item',
    blueprintModuleCompleteKey:
      'com.atlassian.confluence.plugins.confluence-business-blueprints:decisions-blueprint',
    contentBlueprintId: '438fa370-049f-4f69-a726-0035852767f5',
    skipHowToUse: false,
    wizard: {
      pages: [
        {
          id: 'decisions-page1',
          templateKey: 'Confluence.Blueprints.Decisions.dialogForm',
          title: 'Track a decision',
          descriptionHeaderLink:
            'https://confluence.atlassian.com/display/ConfCloud/Decisions+Blueprint',
          descriptionHeader: 'About decisions',
          descriptionContent:
            "Work with stakeholders to decide important things, such as project scope or schedule changes. Share and track your team's decisions in a central register.",
          last: true,
        },
      ],
    },
    isNew: true,
    isPromoted: false,
    new: true,
    promoted: false,
  },
];

const sampleBlueprintData = sampleBlueprintResponseData.map(
  ({
    name,
    itemModuleCompleteKey,
    blueprintModuleCompleteKey,
    contentBlueprintId,
    skipHowToUse,
  }) => ({
    name,
    itemModuleCompleteKey,
    blueprintModuleCompleteKey,
    contentBlueprintId,
    skipHowToUse,
  }),
);

const mockStoreFactory = (projectSpaceKey: string) =>
  createMockStore({
    confluence: {
      connectedSpace: {
        projectSpaceKey,
      },
    },
  });

describe('fetch connected space blueprints epic', () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });

  test('should emit updateConnectedSpaceBlueprints action with expected payload when spaces are fetched', () =>
    testEpic({
      arrange: (input$: any) => {
        (requests.fetchConnectedSpaceBlueprints$ as jest.Mock).mockReturnValue(
          of(sampleBlueprintResponseData),
        );
        return fetchConnectedSpaceBlueprintsEpic(
          input$,
          mockStoreFactory('SAMPLE')(),
        );
      },
      act: (input$: any) => {
        const nextAction = fetchConnectedSpaceBlueprints();
        input$.next(nextAction);
        input$.complete();
      },
      assert: (actions: any) => {
        expect(actions).toEqual([
          updateConnectedSpaceBlueprints(sampleBlueprintData),
        ]);
        expect(
          analyticsClient.sendOperationalAnalyticsEvent,
        ).toHaveBeenCalledTimes(1);
        expect(
          analyticsClient.sendOperationalAnalyticsEvent,
        ).toHaveBeenCalledWith(
          expect.objectContaining({
            action: 'success',
            actionSubject: 'fetch',
            source: 'connected.space.blueprints',
          }),
        );
      },
    }));

  test('should emit fetchConnectedSpaceBlueprintsError action when spaces fail to be fetched', () =>
    testEpic({
      arrange: (input$: any) => {
        (requests.fetchConnectedSpaceBlueprints$ as jest.Mock).mockReturnValue(
          _throw({ message: 'it all went wrong' }),
        );
        return fetchConnectedSpaceBlueprintsEpic(
          input$,
          mockStoreFactory('SAMPLE')(),
        );
      },
      act: (input$: any) => {
        input$.next(fetchConnectedSpaceBlueprints());
        input$.complete();
      },
      assert: (actions: any) => {
        expect(actions).toEqual([fetchConnectedSpaceBlueprintsError()]);
        expect(
          analyticsClient.sendOperationalAnalyticsEvent,
        ).toHaveBeenCalledTimes(1);
        expect(
          analyticsClient.sendOperationalAnalyticsEvent,
        ).toHaveBeenCalledWith(
          expect.objectContaining({
            action: 'failed',
            actionSubject: 'fetch',
            source: 'connected.space.blueprints',
          }),
        );
      },
    }));
});
