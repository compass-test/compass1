import React from 'react';

import { render } from '@testing-library/react';

import { iconMap } from './utils';

describe('utils', () => {
  it('should no icon', () => {
    const Component: React.ReactNode = iconMap(undefined);
    const { container } = render(<>{Component}</>);
    expect(container.firstChild).toBeNull();
  });

  it('should render success icon', () => {
    const Component: React.ReactNode = iconMap('success');
    const { findByAltText } = render(<>{Component}</>);
    expect(findByAltText('success')).toBeDefined();
  });

  it('should render info icon', () => {
    const Component: React.ReactNode = iconMap('info');
    const { findByAltText } = render(<>{Component}</>);
    expect(findByAltText('info')).toBeDefined();
  });

  it('should render warning icon', () => {
    const Component: React.ReactNode = iconMap('warning');
    const { findByAltText } = render(<>{Component}</>);
    expect(findByAltText('warning')).toBeDefined();
  });

  it('should render error icon', () => {
    const Component: React.ReactNode = iconMap('error');
    const { findByAltText } = render(<>{Component}</>);
    expect(findByAltText('error')).toBeDefined();
  });
});
