import { CompassComponentInRelationshipViewFragment } from '@atlassian/dragonfruit-graphql';

export type ComponentOption = {
  value: CompassComponentInRelationshipViewFragment;
};

export type ComponentSearchPickerProps = {
  onChange?: (value: ComponentOption['value']) => void;
};
