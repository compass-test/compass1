import {
  OptionType,
  SelectComponentsConfig,
  ValueType,
} from '@atlaskit/select';
import { CompassComponent } from '@atlassian/dragonfruit-graphql';
import { Modify } from '@atlassian/dragonfruit-utils';

export type TeamSelectOption = Modify<
  OptionType,
  {
    avatarUrl?: string;
    value: CompassComponent['ownerId']; // TODO: Change to Team['id'] when available in AGG
  }
>;

export type TeamSelectValue<IsMulti extends boolean = false> = ValueType<
  TeamSelectOption,
  IsMulti
>;

export type ComponentProps = SelectComponentsConfig<TeamSelectOption>;

export type ErrorWithStatusCode = Error & {
  statusCode: number;
};
