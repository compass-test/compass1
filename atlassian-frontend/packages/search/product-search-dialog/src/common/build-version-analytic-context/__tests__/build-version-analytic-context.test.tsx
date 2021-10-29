import React from 'react';
import { shallow } from 'enzyme';
import { BuildVersionAnalyticContext } from '../build-version-analytic-context';

describe('<BuildVersionAnalyticContext />', () => {
  it('render matches snapshot', () => {
    const wrapper = shallow(
      <BuildVersionAnalyticContext>
        <div />
      </BuildVersionAnalyticContext>,
    );

    expect(wrapper.find('div').exists()).toBeTruthy();
    expect(wrapper).toMatchSnapshot();
  });
});
