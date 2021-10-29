import { OptionType, SelectProps, ValueType } from '@atlaskit/select';

export type Styling = 'select' | 'dropdown' | undefined;

export interface Props extends SelectProps<OptionWithIcon> {
  // `select` renders the component in the style like that of Atlaskit Select component
  // `dropdown` renders the component in a style like that of Atlaskit Dropdown component
  styling?: Styling;
  onChange?: (value: ValueType<OptionWithIcon>) => void;
  isAdmin?: boolean;
}

export interface OptionWithIcon extends OptionType {
  icon: JSX.Element;
}
