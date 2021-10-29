import { defaultLocale } from '../common/constants/supported-locales';

import { CONFLUENCE_LOADING } from './context/types';
import rootReducer from './reducer';
import { State } from './types';
import { NO_ERROR } from './ui/create-space/types';
import { ExternalState } from './external/types';
import { AccessRequestCapabilityType } from './confluence/access-request-capabilities/types';

describe('Root Project Pages reducer', () => {
  test('should provide some sensible default', () => {
    const expectedState: State = {
      context: {
        baseUrl: '',
        isAdmin: false,
        locale: defaultLocale,
        cloudId: '',
        accountId: '',
        confluenceState: CONFLUENCE_LOADING,
        suggestedKey: null,
        origin: null,
        confluenceEdition: undefined,
        jswEdition: undefined,
      },
      project: {
        id: -1,
        key: '',
        type: '',
        name: '',
      },
      confluence: {
        accessRequestCapabilities: {
          capability: AccessRequestCapabilityType.ERROR,
          loaded: false,
        },
        connectedSpace: {
          blueprintsState: 'UNKNOWN',
          blueprints: null,
          connectionState: 'UNKNOWN',
          projectSpaceKey: null,
          projectSpacePageId: null,
          projectPageLinkedId: null,
          projectSpacePageTitle: null,
          projectIsConnectedToPage: false,
          projectSpacePageUrl: null,
          projectSpacePageTitleHasBeenFetched: false,
          projectSpaceIcon: null,
        },
        spaces: {
          availableSpaces: [],
          spacesLoaded: false,
        },
        user: {
          access: 'UNKNOWN',
        },
        collaborators: {
          users: [],
          loaded: false,
        },
      },
      external: {} as ExternalState,
      ui: {
        blueprints: {
          defaultBlueprints: [
            {
              name: 'Blank page',
              itemModuleCompleteKey:
                'com.atlassian.confluence.plugins.confluence-create-content-plugin:create-blank-page',
              contentBlueprintId: '00000000-0000-0000-0000-000000000000',
              skipHowToUse: false,
            },
            {
              name: 'Decision',
              itemModuleCompleteKey:
                'com.atlassian.confluence.plugins.confluence-business-blueprints:decisions-blueprint-item',
              contentBlueprintId: '5f4151a9-31cb-4466-8b9a-4d2797da3d0c',
              skipHowToUse: false,
            },
            {
              name: 'Meeting notes',
              itemModuleCompleteKey:
                'com.atlassian.confluence.plugins.confluence-business-blueprints:meeting-notes-item',
              contentBlueprintId: '8b2245c5-60eb-4ba4-9139-563a4f0a8d9e',
              skipHowToUse: false,
            },
            {
              name: 'Product requirements',
              itemModuleCompleteKey:
                'com.atlassian.confluence.plugins.confluence-software-blueprints:requirements-item',
              contentBlueprintId: 'd436e36c-2779-455b-ad86-adb6398d1a99',
              skipHowToUse: false,
            },
            {
              name: 'Retrospective',
              itemModuleCompleteKey:
                'com.atlassian.confluence.plugins.confluence-software-blueprints:retrospectives-item',
              contentBlueprintId: '5e76e3f2-8835-4568-8848-5b87e0bea05e',
              skipHowToUse: false,
            },
            {
              name: 'Filler Template',
              itemModuleCompleteKey: '',
              contentBlueprintId: 'filler0',
            },
            {
              name: 'Filler Template',
              itemModuleCompleteKey: '',
              contentBlueprintId: 'filler1',
            },
            {
              name: 'Filler Template',
              itemModuleCompleteKey: '',
              contentBlueprintId: 'filler2',
            },
            {
              name: 'Filler Template',
              itemModuleCompleteKey: '',
              contentBlueprintId: 'filler3',
            },
            {
              name: 'Filler Template',
              itemModuleCompleteKey: '',
              contentBlueprintId: 'filler4',
            },
            {
              name: 'Filler Template',
              itemModuleCompleteKey: '',
              contentBlueprintId: 'filler5',
            },
            {
              name: 'Filler Template',
              itemModuleCompleteKey: '',
              contentBlueprintId: 'filler6',
            },
          ],
        },
        connectSpaceDialog: {
          selectedSpace: null,
          connectingSpace: false,
          connectSpaceDialogErrorState: NO_ERROR,
          connectSpaceDialogOpen: false,
          disconnectedTemplatesClick: false,
        },
        createSpaceDialog: {
          createSpaceDialogOpen: false,
          createSpaceDialogErrorState: NO_ERROR,
          userEnteredSpaceNameInvalid: false,
          generatingKey: false,
          creatingSpace: false,
          userEnteredSpaceName: '',
        },
      },
      flags: {
        hasErrors: false,
        showSuccessFlag: false,
        connectedSpaceName: '',
        isConnectedToPage: false,
        title: '',
        description: '',
      },
      featureFlags: {
        isProjectPagesProductionisation: false,
      },
    };

    const returnedState = rootReducer({}, { type: 'UNKNOWN' }) as State;
    expect(returnedState.context).toEqual(expectedState.context);
    expect(returnedState.project).toEqual(expectedState.project);
    expect(returnedState.ui).toEqual(expectedState.ui);
    expect(returnedState.flags).toEqual(expectedState.flags);
    expect(returnedState.confluence).toEqual(expectedState.confluence);
  });
});
