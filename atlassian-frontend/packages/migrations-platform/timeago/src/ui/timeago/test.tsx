import React from 'react';

import { render } from '@testing-library/react'; // eslint-disable-line import/no-extraneous-dependencies

import {
  TimeAgoDay,
  TimeAgoHour,
  TimeAgoMinute,
  TimeAgoMonth,
  TimeAgoRecent,
  TimeAgoYear,
} from './examples';

describe('TimeAgo', () => {
  it('render just now', () => {
    const { getByText } = render(<TimeAgoRecent />);
    expect(getByText('just now')).toBeInTheDocument();
  });

  it('render minute', () => {
    const { getByText } = render(<TimeAgoMinute />);
    expect(getByText('50 minutes ago')).toBeInTheDocument();
  });

  it('render hour', () => {
    const { getByText } = render(<TimeAgoHour />);
    expect(getByText('5 hours ago')).toBeInTheDocument();
  });

  it('render day', () => {
    const { getByText } = render(<TimeAgoDay />);
    expect(getByText('1 day ago')).toBeInTheDocument();
  });

  it('render month', () => {
    const { getByText } = render(<TimeAgoMonth />);
    expect(getByText('1 month ago')).toBeInTheDocument();
  });

  it('render year', () => {
    const { getByText } = render(<TimeAgoYear />);
    expect(getByText('1 year ago')).toBeInTheDocument();
  });
});
