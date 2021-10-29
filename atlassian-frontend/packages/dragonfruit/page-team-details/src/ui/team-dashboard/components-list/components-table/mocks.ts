import { ComponentRow } from '@atlassian/dragonfruit-components';
import { CompassComponentType } from '@atlassian/dragonfruit-graphql';

export const resultsMock: ComponentRow[] = [
  {
    component: {
      description: 'sample description',
      id: 'sample id',
      name: 'sample name',
      ownerId: 'sample owner id',
      ownerName: 'sample owner name',
      type: CompassComponentType.APPLICATION,
      __typename: 'CompassComponent',
      _isDeleted: false,
      _isOptimistic: false,
    },
    link: 'sample link',
    __typename: 'CompassSearchComponentResult',
  },
];
