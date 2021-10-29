import React from 'react';

import {
  CompassComponentDataManager,
  CompassLinkType,
} from '@atlassian/dragonfruit-graphql';

import { AddLinkEmptyDisabledState } from './disabled-ui';
import { AddLinkEmptyEnabledState } from './enabled-ui';

export type Props = {
  type: CompassLinkType;
  onClick: () => void;
  dataManager?: CompassComponentDataManager;
};

export function AddLinkEmptyState(props: Props) {
  const { type, onClick, dataManager } = props;
  return dataManager ? (
    <AddLinkEmptyDisabledState
      type={type}
      href={dataManager.externalSourceURL}
    />
  ) : (
    <AddLinkEmptyEnabledState type={type} onClick={onClick} />
  );
}
