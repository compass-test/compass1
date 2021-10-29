import {
  CreatableProps,
  Label,
  LabelPickerProps,
  useNonCreatableLabelPicker,
  ValueType,
} from './useNonCreatableLabelPicker';

export * from './useNonCreatableLabelPicker';

export function useCreatableLabelPicker<IsMulti extends boolean>(
  props: LabelPickerProps<IsMulti>,
): Partial<CreatableProps<IsMulti>> {
  const { isCreatable } = props;

  const selectProps = useNonCreatableLabelPicker<IsMulti>(props);
  if (!isCreatable) {
    return selectProps;
  }

  return {
    ...selectProps,
    getNewOptionData,
    isValidNewOption,
  };
}

export const getNewOptionData = (inputValue: string): Label => ({
  id: '',
  name: inputValueToLabelNames(inputValue)?.[0],
  prefix: 'global',
});

const inputValueToLabelNames = (inputValue: string) =>
  inputValue ? inputValue.split(/[\s,]+/).filter(Boolean) : [];

function isValidNewOption<IsMulti extends boolean>(
  inputValue: string,
  value: ValueType<IsMulti>,
  options: ReadonlyArray<Label>,
) {
  // Is inputValue an acceptable label name?
  const labelNames = inputValueToLabelNames(inputValue);
  if (labelNames.length < 1) {
    return false;
  }
  inputValue = labelNames[0].toLowerCase();

  // Is inputValue in value already?
  const equalsInputValue = ({ name }: Label) =>
    inputValue === name?.toLowerCase();
  if (
    value &&
    (Array.isArray(value)
      ? value.some(equalsInputValue)
      : equalsInputValue(value as Label))
  ) {
    return false;
  }

  // Is inputValue in options already?
  if (options.some(equalsInputValue)) {
    return false;
  }

  return true;
}
