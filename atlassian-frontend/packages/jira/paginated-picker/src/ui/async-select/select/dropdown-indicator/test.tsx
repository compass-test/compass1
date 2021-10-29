import React from 'react';

import { shallow } from 'enzyme';

import { IndicatorProps } from '@atlaskit/select/src';

import { SingleOption } from '../../../../common/types';
import { CloseIconWrapper } from '../../../../common/ui/picker/styled';

import DropdownIndicator from './index';

describe('DropdownIndicator', () => {
  it('triggers onInputChange when clicked', () => {
    const props: IndicatorProps<SingleOption, true> = {
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
        onInputChange: jest.fn(),
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
      children: {
        type: '',
        props: {},
        key: null,
      },
      innerProps: {},
      isFocused: true,
      isDisabled: false,
    };
    const preventDefaultMock = jest.fn();

    const component = shallow(<DropdownIndicator {...props} />);
    const closeButton = component.find(CloseIconWrapper);

    expect(props.selectProps.onInputChange).toHaveBeenCalledTimes(0);
    expect(preventDefaultMock).toHaveBeenCalledTimes(0);

    closeButton.simulate('click', {
      preventDefault: preventDefaultMock,
    });

    expect(props.selectProps.onInputChange).toHaveBeenCalledTimes(1);
    expect(preventDefaultMock).toHaveBeenCalledTimes(1);
  });
});
