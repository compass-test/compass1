import React, { ReactElement } from 'react';

import { action } from '@storybook/addon-actions';
import { select } from '@storybook/addon-knobs';

import { CompassLinkType } from '@atlassian/dragonfruit-graphql';
import { CompassTestProvider } from '@atlassian/dragonfruit-testing';

import { compassLinkTypes } from '../../../../../common/test-utils';

import { AddLinkEmptyEnabledState, Props } from './index';

export default {
  decorators: [(storyFn: () => ReactElement) => <div>{storyFn()}</div>],
  excludeStories: 'AddLinkEmptyEnabledStateTemplate',
};

export const AddLinkEmptyEnabledStateTemplate = ({
  type = CompassLinkType.REPOSITORY,
  onClick = () => {},
}: Partial<Props>) => (
  <CompassTestProvider>
    <AddLinkEmptyEnabledState type={type} onClick={onClick} />
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

  return (
    <AddLinkEmptyEnabledStateTemplate
      type={linkType}
      onClick={action('clicked')}
    />
  );
};
