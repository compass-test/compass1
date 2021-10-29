import React from 'react';
import { alert } from './window';

const MockLinkComponent: React.FC<{ [key: string]: any }> = ({
  children,
  ...rest
}) => (
  <a
    {...rest}
    onClick={(e) => {
      e.preventDefault();
      alert('Clicked LinkComponent');
    }}
  >
    {children}
  </a>
);

export default MockLinkComponent;
