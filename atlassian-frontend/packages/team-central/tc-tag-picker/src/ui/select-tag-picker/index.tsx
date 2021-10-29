import React, { useRef, useState } from 'react';

import debounce from 'debounce';

import { AsyncCreatableSelect } from '@atlaskit/select';
import { fontSize } from '@atlaskit/theme/constants';
import { token } from '@atlaskit/tokens';

import {
  backgroundColors,
  DisabledWrapper,
  labelColors,
  removeHoverColors,
} from '../../common/ui/styled';
import { getTagColor } from '../../common/utils/coloring';
import { sanitizeInput } from '../../common/utils/sanitize-input';
import { formatLabelOption } from '../../common/utils/select-options';
import { SelectCommonProps, TagSelectOptions } from '../../types';

type Props = {
  isDisabled?: boolean;
  placeholder?: React.ReactNode;
} & SelectCommonProps;

export const TagPicker = (props: Props) => {
  const [currentInput, setCurrentInput] = useState('');
  const [isCreating, setIsCreating] = useState(false);

  const loadOptions = (
    inputValue: string,
    callback: (options: TagSelectOptions) => void,
  ) => {
    props.queryTagList(inputValue).then(tags => callback(tags));
  };

  const debouncedLoadOptions = useRef(debounce(loadOptions, 200));

  const onInputChange = (input: string) => {
    setCurrentInput(sanitizeInput(input));
  };

  const onChange = (options: TagSelectOptions) => {
    props.setTags(options.map(option => option));
  };

  const onCreateOption = async () => {
    setIsCreating(true);

    try {
      const newTag = await props.createTag(currentInput);
      if (newTag) {
        props.setTags([...props.tags, newTag]);
      }
    } catch {
      //
    }

    setIsCreating(false);
  };

  return (
    <DisabledWrapper isDisabled={!!props.isDisabled} data-testid={props.testId}>
      <AsyncCreatableSelect
        value={props.tags}
        onChange={onChange}
        className="select-tag-picker"
        classNamePrefix="react-select"
        defaultOptions
        loadOptions={debouncedLoadOptions.current}
        inputValue={currentInput}
        onInputChange={onInputChange}
        onCreateOption={onCreateOption}
        isDisabled={props.isDisabled}
        isLoading={isCreating}
        isMulti
        isSearchable={true}
        placeholder={props.placeholder}
        formatOptionLabel={formatLabelOption}
        styles={{
          input: styles => ({
            ...styles,
            ':before': {
              ...styles[':before'],
              content: currentInput ? '"#"' : undefined,
            },
          }),
          multiValue: (styles, { data }) => ({
            ...styles,
            backgroundColor: backgroundColors[getTagColor(data.label)],
          }),
          multiValueLabel: (styles, { data }) => ({
            ...styles,
            color: labelColors[getTagColor(data.label)],
            fontSize: `${fontSize()}px`,
            ':before': {
              ...styles[':before'],
              content: '"# "',
            },
          }),
          multiValueRemove: (styles, { data }) => ({
            ...styles,
            color: labelColors[getTagColor(data.label)],
            ':hover': {
              backgroundColor: removeHoverColors[getTagColor(data.label)],
              color: token('color.text.onBold', 'white'),
            },
          }),
        }}
      />
    </DisabledWrapper>
  );
};

export default TagPicker;
