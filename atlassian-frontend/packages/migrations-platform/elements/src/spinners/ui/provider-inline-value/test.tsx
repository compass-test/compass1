import React from 'react';

import { render } from '@testing-library/react';

import ProviderInlineValue from './index';

describe('ProviderInlineValue', () => {
  const provider = jest.fn().mockResolvedValue('fakeProviderResult');
  const reducer = jest
    .fn()
    .mockImplementation((data) => (data ? 'reduced value' : 'default value'));
  afterEach(() => {
    provider.mockClear();
    reducer.mockClear();
  });

  it('should render LoadingInlineValue', () => {
    const { getByText } = render(
      <ProviderInlineValue provider={provider} reducer={reducer} />,
    );
    expect(getByText('default value')).toBeInTheDocument();
  });

  it('should update LoadingInlineValue on provider result', async () => {
    const { getByText, rerender } = render(
      <ProviderInlineValue provider={provider} reducer={reducer} />,
    );
    expect(provider).toHaveBeenCalledTimes(1);
    expect(reducer).toHaveBeenCalledTimes(1);
    await provider.mock.results[0].value;
    rerender(<ProviderInlineValue provider={provider} reducer={reducer} />);
    expect(getByText('reduced value')).toBeInTheDocument();
  });
});
