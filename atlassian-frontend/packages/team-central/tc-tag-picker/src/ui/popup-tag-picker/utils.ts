import { TagSelectOption, TagSelectOptions } from '../../types';

export const compareOption = (inputValue = '', option: TagSelectOption) => {
  const candidate = String(inputValue).toLowerCase();
  const optionValue = String(option.value).toLowerCase();
  const optionLabel = String(option.label).toLowerCase();
  return optionValue === candidate || optionLabel === candidate;
};

export const isValidNewOption = (
  inputValue: string,
  selectValue: TagSelectOptions,
  selectOptions?: TagSelectOptions,
) =>
  !(
    !inputValue ||
    selectValue.some(option => compareOption(inputValue, option)) ||
    (selectOptions ?? []).some(option => compareOption(inputValue, option))
  );

export const getNewOptionData = (inputValue: string) => ({
  label: inputValue,
  value: inputValue,
  __isNew__: true,
});
