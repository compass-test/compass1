import React, { ReactElement } from 'react';

import { select, text } from '@storybook/addon-knobs';

import { CompassLinkType } from '@atlassian/dragonfruit-graphql';
import { CompassTestProvider } from '@atlassian/dragonfruit-testing';

import { compassLinkTypes } from '../../../../../common/test-utils';

import { AddLinkEmptyDisabledState, Props } from './index';

export default {
  decorators: [(storyFn: () => ReactElement) => <div>{storyFn()}</div>],
  excludeStories: 'AddLinkEmptyDisabledStateTemplate',
};

const MOCK_HREF = 'https://atlaskit.atlassian.com/';

export const AddLinkEmptyDisabledStateTemplate = ({
  type = CompassLinkType.REPOSITORY,
  href = MOCK_HREF,
}: Partial<Props>) => (
  <CompassTestProvider>
    <AddLinkEmptyDisabledState type={type} href={href} />
  </CompassTestProvider>
);

export const Example = () => {
  const label = 'Link type';
  const defaultValue = CompassLinkType.REPOSITORY;
  const linkType: CompassLinkType = select(
    label,
    compassLinkTypes,
    defaultValue,
  );

  const href: string = text('href', MOCK_HREF);

  return <AddLinkEmptyDisabledStateTemplate type={linkType} href={href} />;
};
