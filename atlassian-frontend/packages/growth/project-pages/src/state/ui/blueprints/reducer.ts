import { freeze } from 'icepick';
import { SET } from './actions';
import { BlueprintsState } from './types';
import { AnyAction } from 'redux';

const initialState: BlueprintsState = {
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
  ],
};

for (let i = 0; i < 7; i += 1) {
  const fillerTemplate = {
    name: 'Filler Template',
    itemModuleCompleteKey: '',
    contentBlueprintId: `filler${i}`,
  };
  initialState.defaultBlueprints.push(fillerTemplate);
}

export default (
  state: BlueprintsState = initialState,
  action: AnyAction,
): BlueprintsState => {
  switch (action.type) {
    case SET: {
      return freeze(action.payload);
    }
    default:
      return state;
  }
};
