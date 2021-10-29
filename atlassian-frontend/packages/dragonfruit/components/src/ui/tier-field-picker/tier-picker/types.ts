export type Props = {
  currentValue: string;
  options: string[];
  onChange: (option: string) => void;
  isDisabled?: boolean;
};
