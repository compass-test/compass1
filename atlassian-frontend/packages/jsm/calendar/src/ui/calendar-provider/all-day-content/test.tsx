import React from 'react';

import { shallow } from 'enzyme';

import { AllDayContentProps, useAllDayContent } from './index';

describe('useAllDayContent', () => {
  const render = (props: AllDayContentProps) => {
    const Component = () => {
      const AllDayContent = useAllDayContent();
      return <AllDayContent {...props} />;
    };

    return shallow(<Component />).dive();
  };

  it('should render a all day slot text correctly', () => {
    const wrapper = render({
      text: 'all-day',
    });

    expect(wrapper).toMatchInlineSnapshot(`
      <Fragment>
        all-day
      </Fragment>
    `);
  });
});
