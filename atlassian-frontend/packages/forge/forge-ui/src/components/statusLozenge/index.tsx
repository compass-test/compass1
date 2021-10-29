import React from 'react';
import { StatusLozengeProps } from '@atlassian/forge-ui-types';
import { Props } from '..';

const AkStatusLozenge = React.lazy(() => import('@atlaskit/lozenge'));

const StatusLozenge: React.FunctionComponent<StatusLozengeProps> = ({
  appearance,
  text,
}) => <AkStatusLozenge appearance={appearance}>{text}</AkStatusLozenge>;

export default StatusLozenge;

export const StatusLozengeFn: React.FunctionComponent<Props> = ({ props }) => {
  const { appearance, text } = props as StatusLozengeProps;
  return <StatusLozenge appearance={appearance} text={text} />;
};
