import React, { ReactElement } from 'react';

import { action } from '@storybook/addon-actions';
import { boolean, radios } from '@storybook/addon-knobs';

import { mockDataManager } from '@atlassian/dragonfruit-external-component-management';
import { CompassLinkType } from '@atlassian/dragonfruit-graphql';
import { CompassTestProvider } from '@atlassian/dragonfruit-testing';

import { compassLinkTypes } from '../../../../common/test-utils';

import { AddLinkEmptyState, Props } from './index';

export default {
  decorators: [
    (storyFn: () => ReactElement) => {
      return <div>{storyFn()}</div>;
    },
  ],
  excludeStories: 'AddLinkEmptyStateTemplate',
};

export const AddLinkEmptyStateTemplate = ({
  type = CompassLinkType.REPOSITORY,
  onClick = () => {},
  dataManager,
}: Partial<Props>) => (
  <CompassTestProvider>
    <AddLinkEmptyState
      type={type}
      onClick={onClick}
      dataManager={dataManager}
    />
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

  const isExternallyManaged = boolean('Externally managed', false);
  const dataManager = isExternallyManaged ? mockDataManager : undefined;

  return (
    <div
      style={{
        width: '700px',
        display: 'flex',
        flexDirection: 'column',
        gap: '10px',
      }}
    >
      <AddLinkEmptyStateTemplate
        type={compassLinkType}
        onClick={action('clicked')}
        dataManager={dataManager}
      />
    </div>
  );
};
