import React, { ReactElement } from 'react';

import { action } from '@storybook/addon-actions';
import { radios } from '@storybook/addon-knobs';

import { CompassLinkType } from '@atlassian/dragonfruit-graphql';
import { CompassTestProvider } from '@atlassian/dragonfruit-testing';

import { compassLinkTypes } from '../../../../common/test-utils';

import { AddLink, Props } from './index';

export default {
  decorators: [
    (storyFn: () => ReactElement) => {
      return <div>{storyFn()}</div>;
    },
  ],
  excludeStories: 'AddLinkTemplate',
};

export const AddLinkTemplate = ({
  type = CompassLinkType.REPOSITORY,
  onClick = () => {},
}: Partial<Props>) => (
  <CompassTestProvider>
    <AddLink type={type} onClick={onClick} />
  </CompassTestProvider>
);

export const Example = () => {
  const label = 'Link type';
  const defaultValue = CompassLinkType.REPOSITORY;
  const compassLinkType: CompassLinkType = radios(
    label,
    compassLinkTypes,
    defaultValue,
  );

  return <AddLinkTemplate type={compassLinkType} onClick={action('clicked')} />;
};
