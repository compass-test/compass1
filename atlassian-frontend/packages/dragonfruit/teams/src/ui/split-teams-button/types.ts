import { TriggerProps } from '@atlaskit/popup';

export type LinkButtonProps = {
  isSelected: boolean;
  onClick: () => void;
};

export type DropdownButtonProps = {
  isSelected: boolean;
  onClick: () => void;
  onMouseEnter: () => void;
};

export type SplitButtonProps = {
  triggerProps: TriggerProps;
  linkButtonProps: LinkButtonProps;
  dropdownButtonProps: DropdownButtonProps;
};
