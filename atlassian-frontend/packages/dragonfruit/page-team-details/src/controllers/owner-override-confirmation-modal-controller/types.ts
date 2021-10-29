import { CompassComponentType } from '@atlassian/dragonfruit-graphql';

export type onFormSubmitType = (
  componentId: string,
  componentName: string,
  componentType: CompassComponentType,
) => Promise<void>;
