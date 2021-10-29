import React from 'react';
import { mount } from 'enzyme';
import { ProductFilterItem } from '../product-filter-item';
import { onFilterSelect, onFilterUnselect } from '../../analytics';
import { FilterColLabelText, FilterItem } from '@atlassian/search-dialog';
import { FilterType } from '../../../confluence/clients';
import { FilterOptionSource } from '../../../common/filters/types';

jest.mock('@atlassian/search-dialog', () => ({ FilterItem: () => <div /> }));
jest.mock('../../analytics', () =>
  Object.assign({}, jest.requireActual('../../analytics'), {
    useAnalytics: () => ({
      fireAnalyticsEvent: () => {},
    }),
    onFilterSelect: jest.fn(),
    onFilterUnselect: jest.fn(),
  }),
);

describe('<ProductFilterItem />', () => {
  const Icon = () => <div />;

  const commonProps = {
    filterType: 'space' as FilterType,
    icon: <Icon />,
    value: 'some value',
    label: 'some label',
    filterSource: FilterOptionSource.COLLABORATION_GRAPH,
    LabelComponent: FilterColLabelText,
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('matches snapshot', () => {
    const wrapper = mount(<ProductFilterItem {...commonProps} />);
    expect(wrapper).toMatchSnapshot();
  });

  it('fires analytic event when filter is checked', () => {
    const wrapper = mount(<ProductFilterItem {...commonProps} />);
    wrapper.find(FilterItem).prop('onChange')!('some value', true);
    expect(onFilterSelect).toBeCalledWith({
      filterId: 'some value',
      filterType: commonProps.filterType,
      filterSource: FilterOptionSource.COLLABORATION_GRAPH,
    });
  });

  it('fires analytic event when filter is unchecked', () => {
    const wrapper = mount(<ProductFilterItem {...commonProps} />);
    wrapper.find(FilterItem).prop('onChange')!('some value', false);
    expect(onFilterUnselect).toBeCalledWith({
      filterId: 'some value',
      filterType: commonProps.filterType,
      filterSource: FilterOptionSource.COLLABORATION_GRAPH,
    });
  });
});
