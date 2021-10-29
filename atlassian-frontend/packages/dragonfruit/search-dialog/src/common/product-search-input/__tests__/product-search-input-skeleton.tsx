import React from 'react';
import { shallow } from 'enzyme';
import { ProductSearchInputSkeleton } from '../../product-search-input-skeleton';
import { SearchCSS } from '@atlaskit/atlassian-navigation';

jest.mock('@atlassian/search-dialog', () => ({ SearchInput: () => <div /> }));

describe('<ProductSearchInputSkeleton />', () => {
  it('should render a dummy skeleton', () => {
    const wrapper = shallow(<ProductSearchInputSkeleton />);
    expect(wrapper).toMatchSnapshot();
  });

  it('should render a dummy skeleton with theme provider', () => {
    const defaultTheme: SearchCSS = {
      default: {
        backgroundColor: 'white',
        color: 'white',
        borderColor: 'white',
      },
      focus: {
        backgroundColor: 'white',
        color: 'white',
        borderColor: 'white',
      },
      hover: {
        backgroundColor: 'white',
        color: 'white',
        borderColor: 'white',
      },
    };

    const wrapper = shallow(
      <ProductSearchInputSkeleton theme={defaultTheme} />,
    );
    expect(wrapper).toMatchSnapshot();
  });
});
