import React from 'react';
import { render } from '@testing-library/react';
import searchItemsMock from '../__mocks__/search-items-mock';
import { ViewAllLink } from '../view-all-link';

jest.mock('../../query-context', () => ({
  useQuery: () => ({
    query: 'query',
  }),
}));

describe('ViewAllLink', () => {
  it('renders view all link with the correct text', () => {
    const { getByText } = render(
      <ViewAllLink section={searchItemsMock.sections[0]} />,
    );
    expect(getByText('View all results')).toBeInTheDocument();
  });

  it('do not render view all link if there is no viewAllLinkGenerator in the section', () => {
    const section = {
      ...searchItemsMock.sections[0],
      viewAllLinkGenerator: undefined,
    };
    const { queryByText } = render(<ViewAllLink section={section} />);
    expect(queryByText('View all')).not.toBeInTheDocument();
  });
});
