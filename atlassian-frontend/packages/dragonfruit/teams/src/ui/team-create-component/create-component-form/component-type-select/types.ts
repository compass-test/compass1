import { OptionType, SelectProps } from '@atlaskit/select';
import { Modify } from '@atlassian/dragonfruit-utils';

type BaseProps = SelectProps<OptionWithIcon>;

export interface OptionWithIcon extends OptionType {
  icon: JSX.Element;
}

export type ComponentTypesProps = Modify<
  BaseProps,
  {
    defaultValue?: readonly OptionWithIcon[] | OptionWithIcon | null;
  }
>;
