import React from 'react';

import { FormattedMessage } from 'react-intl';

import ShortcutIcon from '@atlaskit/icon/glyph/shortcut';
import { N500 } from '@atlaskit/theme/colors';
import { ContentSectionEmptyState } from '@atlassian/dragonfruit-common-ui';
import {
  CompassComponentDataManager,
  CompassRelationshipDirection,
  CompassRelationshipType,
} from '@atlassian/dragonfruit-graphql';
import { openInNewTab, useIntl } from '@atlassian/dragonfruit-utils';

import messages from './messages';

export type SectionEmptyStateProps = {
  relationshipType: CompassRelationshipType;
  direction: CompassRelationshipDirection;
  dataManager?: CompassComponentDataManager | null;
  actionLabel: string;
  onClick: () => void;
  testId?: string;
};

export const getMessage = (
  relationshipType: CompassRelationshipType,
  direction: CompassRelationshipDirection,
  isManaged: boolean,
): FormattedMessage.MessageDescriptor | null => {
  switch (relationshipType) {
    case CompassRelationshipType.DEPENDS_ON:
      switch (direction) {
        case CompassRelationshipDirection.OUTWARD:
          return isManaged
            ? messages.relationshipsManagedDependsOnOutward
            : messages.relationshipsDependsOnOutward;
        case CompassRelationshipDirection.INWARD:
          return null;
      }
  }
  throw Error('Unsupported relationship configuration for empty state');
};

export const SectionEmptyState: React.FC<SectionEmptyStateProps> = ({
  relationshipType,
  direction,
  dataManager,
  actionLabel,
  onClick,
  testId,
}) => {
  const { formatMessage } = useIntl();

  const isManaged = Boolean(dataManager);
  const message = getMessage(relationshipType, direction, isManaged);

  const action = dataManager
    ? () => {
        openInNewTab(dataManager.externalSourceURL);
      }
    : onClick;

  const overrideIcon = dataManager ? (
    <ShortcutIcon
      label=""
      size="small"
      primaryColor={N500}
      testId={testId ? `${testId}--icon--shortcut` : undefined}
    />
  ) : undefined;

  return (
    message && (
      <ContentSectionEmptyState
        actionLabel={actionLabel}
        onClick={action}
        icon={overrideIcon}
        testId={testId ? `${testId}--empty-state` : undefined}
      >
        {formatMessage(message)}
      </ContentSectionEmptyState>
    )
  );
};
