import React from 'react';

import { mount } from 'enzyme';

import { CompassComponentType } from '@atlassian/dragonfruit-graphql';
import { CompassTestProvider } from '@atlassian/dragonfruit-testing';

import { ComponentTypeSelect } from './index';

describe('Create component modal component type field', () => {
  it('should allow a user to select an available option', () => {
    const onChange = jest.fn();

    const wrapper = mount(
      <CompassTestProvider>
        <ComponentTypeSelect
          value={CompassComponentType.SERVICE}
          onChange={onChange}
        />
      </CompassTestProvider>,
    );

    // Click on the dropdown indicator
    const dropdownIndicator = wrapper.find(`[aria-label="open"]`).first();
    dropdownIndicator.simulate('mouseDown', { button: 0 });

    // Get all options in the select
    const options = wrapper.find('Option');
    expect(options.length).toEqual(4);

    // Select an available option
    options.at(1).simulate('click');

    //Check that the onChange function is called with 'Application'
    expect(onChange).toBeCalledWith(CompassComponentType.LIBRARY);
  });
});
