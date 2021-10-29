import React from 'react';

import { shallow } from 'enzyme';

import { CheckboxOption, OptionProps, OptionType } from '@atlaskit/select';
import Tooltip from '@atlaskit/tooltip';

import { StyledInvalidCheckboxOption } from '../../../../common/ui/picker/styled';

import Option from './index';

describe('Option', () => {
  it('should render option when is valid', () => {
    const props: OptionProps<OptionType, true> = {
      isDisabled: false,
      isFocused: true,
      isSelected: false,
      clearValue: () => {},
      cx: () => '',
      getStyles: () => {
        return {};
      },
      getValue: () => [],
      hasValue: false,
      isMulti: true,
      isRtl: true,
      options: [],
      selectOption: () => {},
      selectProps: {},
      setValue: () => {},
      theme: {
        borderRadius: 0,
        colors: {},
        spacing: {
          baseUnit: 0,
          controlHeight: 0,
          menuGutter: 0,
        },
      },
      children: null,
      innerRef: null,
      innerProps: {
        id: '',
        key: '',
        onClick: () => {},
        onMouseMove: () => {},
        onMouseOver: () => {},
        tabIndex: 0,
      },
      label: 'Label',
      type: 'option',
      data: {},
    };
    const component = shallow(<Option {...props} />);

    expect(component.find(CheckboxOption)).toHaveLength(1);
    expect(component.find(StyledInvalidCheckboxOption)).toHaveLength(0);
  });

  it('should render invalid option when the field is invalid', () => {
    const props: OptionProps<OptionType, true> = {
      isDisabled: false,
      isFocused: true,
      isSelected: false,
      clearValue: () => {},
      cx: () => '',
      getStyles: () => {
        return {};
      },
      getValue: () => [],
      hasValue: false,
      isMulti: true,
      isRtl: true,
      options: [],
      selectOption: () => {},
      selectProps: {
        fieldKey: 'type',
        fieldLabel: 'type',
        fieldInvalidLabel: 'invalid message',
      },
      setValue: () => {},
      theme: {
        borderRadius: 0,
        colors: {},
        spacing: {
          baseUnit: 0,
          controlHeight: 0,
          menuGutter: 0,
        },
      },
      children: null,
      innerRef: null,
      innerProps: {
        id: '',
        key: '',
        onClick: () => {},
        onMouseMove: () => {},
        onMouseOver: () => {},
        tabIndex: 0,
      },
      label: 'Label',
      type: 'option',
      data: {
        invalid: true,
      },
    };
    const component = shallow(<Option {...props} />);

    expect(component.find(CheckboxOption)).toHaveLength(1);
    expect(component.find(StyledInvalidCheckboxOption)).toHaveLength(1);
    expect(component.find(Tooltip).prop('content')).toEqual(
      props.selectProps.fieldInvalidLabel,
    );
  });
});
