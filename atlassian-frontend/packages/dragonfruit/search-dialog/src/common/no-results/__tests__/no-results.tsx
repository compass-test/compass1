import React, { ReactElement } from 'react';
import { NoResults, NoPreQueryResults } from '../';
import Button from '@atlaskit/button';
import {
  shallowWithIntl,
  mountWithIntl,
} from '../../../__tests__/__fixtures__/intl-test-helpers';

const shallow = <P extends {}>(
  node: ReactElement<P>,
  additionalOptions: {} = {},
) => {
  return shallowWithIntl(node, additionalOptions).dive();
};

describe('<NoResults />', () => {
  const advancedSearchSelected = jest.fn();
  const clearFilters = jest.fn();

  const commonProps = {
    advancedSearchUrl: 'advanced/search/url',
    linkComponent: () => <div />,
    advancedSearchSelected,
    clearFilters,
    hasFilters: false,
  };

  it('render should match snapshot', () => {
    const wrapper = shallow(<NoResults {...commonProps} />);
    expect(wrapper).toMatchSnapshot();
  });

  describe('with filters', () => {
    it('render should match snapshot', () => {
      const wrapper = shallow(<NoResults {...commonProps} hasFilters />);
      expect(wrapper).toMatchSnapshot();
    });

    it('on clear filter button press should execute the clearFilters callback', () => {
      const wrapper = mountWithIntl(<NoResults {...commonProps} hasFilters />);
      wrapper.find('EmptyState').find(Button).prop('onClick')!(
        {} as any,
        {} as any,
      );
      expect(clearFilters).toBeCalledTimes(1);
    });
  });
});

describe('<NoPreQueryResults />', () => {
  it('render should match snapshot', () => {
    const wrapper = shallow(<NoPreQueryResults />);
    expect(wrapper).toMatchSnapshot();
  });
});
