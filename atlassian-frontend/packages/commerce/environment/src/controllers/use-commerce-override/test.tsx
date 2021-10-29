// eslint-disable-next-line import/no-extraneous-dependencies
import React from 'react';

// eslint-disable-next-line import/no-extraneous-dependencies
import { render } from '@testing-library/react';

import { OverrideRegistry } from './types';

import {
  addCommerceOverride,
  useCommerceOverride,
  withCommerceOverride,
} from './index';

describe('override', () => {
  it('overrides a given variable', () => {
    const registry: OverrideRegistry = new Map();
    expect(withCommerceOverride(registry, 'test')).toBe('test');
    const remove = addCommerceOverride(registry, 'test', 'overridden');
    expect(withCommerceOverride(registry, 'test')).toBe('overridden');
    remove();
    expect(withCommerceOverride(registry, 'test')).toBe('test');
  });

  it('works without any context provided', () => {
    const Component = () => {
      return <span>{useCommerceOverride('it works')}</span>;
    };
    const { container } = render(<Component />);
    expect(container.innerHTML).toMatch(/it works/);
  });
});
