import React, { useCallback, useEffect, useState } from 'react';

import debounce from 'debounce';

import { PopupSelect, PopupSelectProps } from '@atlaskit/select';

import { sanitizeInput } from '../../common/utils/sanitize-input';
import { formatLabelOption } from '../../common/utils/select-options';
import {
  SelectCommonProps,
  TagSelectOption,
  TagSelectOptions,
} from '../../types';

import { getNewOptionData, isValidNewOption } from './utils';

type RPopupSelectProps = Required<PopupSelectProps<TagSelectOption>>;
type PopupTagPickerProps = SelectCommonProps & {
  target: PopupSelectProps['target'];
  popperProps?: PopupSelectProps['popperProps'];
  maxMenuWidth?: PopupSelectProps['maxMenuWidth'];
  closeMenuOnSelect?: PopupSelectProps['closeMenuOnSelect'];
};

const PopupTagPicker = (props: PopupTagPickerProps) => {
  const [options, setOptions] = useState<TagSelectOptions>([]);
  const [newOption, setNewOption] = useState<TagSelectOption>();
  const [queryString, setQueryString] = useState('');

  useEffect(() => {
    props.queryTagList(queryString).then(tags => {
      let newOption: TagSelectOption;
      if (isValidNewOption(queryString, props.tags)) {
        newOption = getNewOptionData(queryString);
        setNewOption(newOption);
        return setOptions(tags.concat([newOption]));
      }

      setOptions(tags);
    });
  }, [props, queryString]);

  const onInputChange: RPopupSelectProps['onInputChange'] = (
    inputString,
    { action },
  ) => {
    if (action === 'input-change') {
      setQueryString(sanitizeInput(inputString));
    }
  };

  const onChange = useCallback<RPopupSelectProps['onChange']>(
    async (value, actionMeta) => {
      if (actionMeta.action !== 'select-option') {
        return;
      }

      const valueArray = Array.isArray(value) ? value : [value];
      if (valueArray[valueArray.length - 1] === newOption) {
        setQueryString('');
        const newTag = await props.createTag(queryString);
        if (newTag) {
          props.setTags([...props.tags, newTag]);
          return;
        }

        return;
      }

      if (value) {
        props.setTags([...props.tags, value]);
      }
    },
    [props, queryString, newOption],
  );

  const mergedPopperProps: PopupSelectProps['popperProps'] = {
    placement: 'top-end',
    ...(props.popperProps ?? {}),
  };

  return (
    <PopupSelect<TagSelectOption>
      hideSelectedOptions
      target={props.target}
      placeholder="Search tags"
      inputValue={queryString}
      value={props.tags}
      options={options}
      searchThreshold={0}
      onChange={onChange}
      maxMenuWidth={props.maxMenuWidth ?? 220}
      closeMenuOnSelect={props.closeMenuOnSelect}
      onClose={() => setQueryString('')}
      popperProps={mergedPopperProps}
      formatOptionLabel={formatLabelOption}
      onInputChange={debounce(onInputChange, 500, true)}
    />
  );
};

export default PopupTagPicker;
