import React from 'react';

import { render } from '@testing-library/react';

import { FlagContainer, Props } from './index';

const defaultProps: Props = {
  id: 'some-flag-id',
  title: 'title',
  description: 'description',
  isAutoDismiss: false,
};

describe('flag-container', () => {
  it('should render title and description', () => {
    const { getByText } = render(<FlagContainer {...defaultProps} />);
    expect(getByText('title')).toBeDefined();
    expect(getByText('description')).toBeDefined();
  });

  it('should render title and description with isAutoDismiss', () => {
    const { getByText } = render(
      <FlagContainer {...defaultProps} isAutoDismiss />,
    );
    expect(getByText('title')).toBeDefined();
    expect(getByText('description')).toBeDefined();
  });

  it('should render success icon', () => {
    const { getByText } = render(
      <FlagContainer {...defaultProps} icon="success" />,
    );
    const successIcon = getByText('success');
    expect(successIcon).toBeDefined();
  });

  it('should render custom icon', () => {
    const { getByText } = render(
      <FlagContainer {...defaultProps} icon={<div>custom</div>} />,
    );
    const customIcon = getByText('custom');
    expect(customIcon).toBeDefined();
  });
});
