import React from 'react';

import { render } from '@testing-library/react';

import useLoadingValue from './index';

jest.useFakeTimers();

describe('useLoadingValue', () => {
  const provider = jest.fn();
  const Component = () => {
    const [value, status] = useLoadingValue(provider);
    return <>{`value: '${value}',\n status: '${status}'`}</>;
  };

  describe('when called for the first time', () => {
    beforeEach(() => {
      provider
        .mockResolvedValueOnce('fakeResult')
        .mockResolvedValueOnce('newResult');
    });

    it('returns correct value once loaded', async () => {
      const { container, rerender } = render(<Component />);
      await provider.mock.results[0];
      rerender(<Component />);
      expect(container.innerHTML).toContain('fakeResult');
    });

    it('returns correct value when provider instance is updated', async () => {
      const { container, rerender } = render(<Component />);
      await provider.mock.results[1];
      rerender(<Component />);
      expect(container.innerHTML).toContain('newResult');
    });
  });
});
