import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { Link } from '../../WrappedLink';
import { loadUrl } from '../../../utils/url';

jest.mock('../../../utils/redirects', () => ({
  getRedirectURL(to: string) {
    if (to === '/avatar') {
      return '/avatar-new';
    }

    return undefined;
  },
}));

jest.mock('../../../utils/url');

performance.mark = () => {};
performance.clearMarks = () => {};

describe('<WrappedLink />', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should do a full page load if there is a redirect', () => {
    const { getByText } = render(
      <MemoryRouter>
        <Link to="/avatar">Go</Link>
      </MemoryRouter>,
    );

    fireEvent.click(getByText('Go'));

    expect(loadUrl).toHaveBeenCalledWith('/avatar-new');
  });

  it('should do nothing if there is no matching redirect', () => {
    const { getByText } = render(
      <MemoryRouter>
        <Link to="/not-there">Go</Link>
      </MemoryRouter>,
    );

    fireEvent.click(getByText('Go'));

    expect(loadUrl).not.toHaveBeenCalled();
  });

  it('should do nothing if link is trigged in development mode', () => {
    const envCache = process.env.NODE_ENV;
    process.env.NODE_ENV = 'development';

    const { getByText } = render(
      <MemoryRouter>
        <Link to="/avatar">Go</Link>
      </MemoryRouter>,
    );

    fireEvent.click(getByText('Go'));

    expect(loadUrl).not.toHaveBeenCalled();

    process.env.NODE_ENV = envCache;
  });
});
