import React from 'react';

import { mount } from 'enzyme';

import DropdownButton from '../../common/ui/dropdown-button';

import { CollapsibleCloudWithContent } from './examples';

describe('<CollapsibleCloud />', () => {
  it('should reset the dropdown state when status changes from error to warning', () => {
    const wrapper = mount(
      <CollapsibleCloudWithContent
        content="The collapsible content"
        collapseOnChangeOf="error"
      />,
    );

    expect(wrapper.find(DropdownButton)).toHaveLength(1);
    expect(wrapper.find(DropdownButton).prop('isOpen')).toEqual(false);

    // open the collapsible
    wrapper.find(DropdownButton).simulate('click');
    expect(wrapper.find(DropdownButton).prop('isOpen')).toEqual(true);

    // re-render the content to be undefined
    wrapper.setProps({ content: undefined });
    wrapper.update();

    expect(wrapper.find(DropdownButton)).toHaveLength(0);

    // re-render again to show the content
    wrapper.setProps({
      collapseOnChangeOf: 'warning',
      content: 'The collapsible content',
    });
    wrapper.update();

    // collapsible should start with closed state
    expect(wrapper.find(DropdownButton)).toHaveLength(1);
    expect(wrapper.find(DropdownButton).prop('isOpen')).toEqual(false);
  });
});
