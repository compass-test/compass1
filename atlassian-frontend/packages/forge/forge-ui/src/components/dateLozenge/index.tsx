import React from 'react';
import { DateLozengeProps } from '@atlassian/forge-ui-types';
import { Props } from '..';

const AkDateLozenge = React.lazy(() =>
  import('@atlaskit/date').then((module) => ({
    default: module.Date,
  })),
);

const DateLozenge: React.FunctionComponent<DateLozengeProps> = ({ value }) => (
  <AkDateLozenge value={value} />
);

export default DateLozenge;

export const DateLozengeFn: React.FunctionComponent<Props> = ({ props }) => {
  const { value } = props as DateLozengeProps;
  return <DateLozenge value={value} />;
};
