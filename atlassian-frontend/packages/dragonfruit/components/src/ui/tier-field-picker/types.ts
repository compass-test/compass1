import {
  CompassComponent,
  CompassEnumField,
  CompassFieldDefinition,
} from '@atlassian/dragonfruit-graphql';

type EnumField = Pick<CompassEnumField, 'value'> & {
  // This should be required, but is currently defined as optional in the schema
  // TODO make this required if schema is updated
  definition?: Pick<CompassFieldDefinition, 'id'> | null;
};

export type Props = {
  component: Pick<CompassComponent, 'id' | 'type'> & {
    fields?: Array<EnumField> | null;
  };
  isDisabled?: boolean;
};
