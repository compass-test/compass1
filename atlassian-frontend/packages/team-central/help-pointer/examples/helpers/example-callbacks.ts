import { LinkAnalyticsAttributes, SelectOption } from '../../src';
import { TagSelectOption } from '../../src/ui/help-pointer-editor/editor-form/types';

export const queryTagList = async (
  inputValue: string,
): Promise<TagSelectOption[]> => {
  return Promise.resolve(
    [
      {
        label: 'label-1',
        value: 'value-1',
        usage: { projects: 10, goals: 3, helpLinks: 5 },
      },
      {
        label: 'label-2',
        value: 'value-2',
        usage: { projects: 5, goals: 0, helpLinks: 0 },
      },
      {
        label: 'label-3',
        value: 'value-3',
      },
      {
        label: 'label-4',
        value: 'value-4',
        usage: { projects: 0, goals: 0, helpLinks: 4 },
      },
      {
        label: 'label-5',
        value: 'value-5',
        usage: { projects: 0, goals: 3, helpLinks: 0 },
      },
    ].filter((option) => option.label.indexOf(inputValue) !== -1),
  );
};

export const createTag = async (
  inputValue: string,
): Promise<SelectOption | undefined> => {
  const newTag = {
    label: inputValue,
    value: 'mock-value',
  };
  return Promise.resolve(newTag);
};

export const linkClickCallback = (
  linkAnalyticsAttributes: LinkAnalyticsAttributes,
) => {
  console.log('Link clicked:', linkAnalyticsAttributes);
};
