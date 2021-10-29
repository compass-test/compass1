import React from 'react';
import { Props } from '..';
import { BadgeProps } from '@atlassian/forge-ui-types';

const AKBadge = React.lazy(() => import('@atlaskit/badge'));

function Badge({ appearance = 'default', text }: BadgeProps) {
  return <AKBadge appearance={appearance}>{text}</AKBadge>;
}

export default Badge;

export function BadgeFn({ props }: Props) {
  const { appearance, text } = props as BadgeProps;
  return <Badge appearance={appearance} text={text} />;
}
