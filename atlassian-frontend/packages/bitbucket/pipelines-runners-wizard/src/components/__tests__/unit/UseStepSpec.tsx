import React from 'react';

import { shallow, ShallowWrapper } from 'enzyme';
// eslint-disable-next-line import/no-extraneous-dependencies
import toJson from 'enzyme-to-json';

import CopyButton from '../../CopyButton';
import UseStep from '../../UseStep';

describe('<UseStep />', () => {
  let component: ShallowWrapper<{}>;

  const defaultProps = { labels: ['self.hosted', 'label.1', 'label.2'] };

  function render(props: any) {
    component = shallow(<UseStep {...props} />);
  }

  it('should render component', () => {
    render({ ...defaultProps });
    expect(toJson(component)).toMatchSnapshot();
    expect(component.find(CopyButton).length).toBe(1);
    expect(component.find(CopyButton).prop('name')).toBe('labels');
    expect(component.find(CopyButton).prop('content')).toBe(
      `- self.hosted\n- label.1\n- label.2`,
    );
    expect(component.find(CopyButton).prop('analyticEventId')).toBe(
      'runnerWizardCopyLabels',
    );
  });
});
