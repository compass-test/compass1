import React from 'react';

import Button from '@atlaskit/button';
import AddIcon from '@atlaskit/icon/glyph/add';
import {
  CompassRelationshipDirection,
  CompassRelationshipType,
} from '@atlassian/dragonfruit-graphql';
import { useIntl } from '@atlassian/dragonfruit-utils';

import messages from './messages';
import { TitleWrapper, Wrapper } from './styled';

export type SectionHeaderProps = {
  relationshipType: CompassRelationshipType;
  direction: CompassRelationshipDirection;
  isSectionEmpty: boolean;
  isManaged: boolean;
  actionLabel: string;
  onActionClick: () => void;
  testId?: string;
};

const getTitle = (
  relationshipType: CompassRelationshipType,
  direction: CompassRelationshipDirection,
) => {
  if (relationshipType === CompassRelationshipType.DEPENDS_ON) {
    if (direction === CompassRelationshipDirection.OUTWARD) {
      return messages.relationshipsDependsOnTitle;
    }
    if (direction === CompassRelationshipDirection.INWARD) {
      return messages.relationshipsDependendOnByTitle;
    }
  }
  throw Error('Unsupported relationship configuration for title');
};

const shouldShowButton = (
  relationshipType: CompassRelationshipType,
  direction: CompassRelationshipDirection,
  isSectionEmpty: boolean,
  isManaged: boolean,
) => {
  return (
    !isManaged &&
    !isSectionEmpty &&
    relationshipType === CompassRelationshipType.DEPENDS_ON &&
    direction === CompassRelationshipDirection.OUTWARD
  );
};

export const SectionHeader: React.FC<SectionHeaderProps> = ({
  relationshipType,
  direction,
  isSectionEmpty,
  isManaged,
  actionLabel,
  onActionClick,
  testId,
}) => {
  const { formatMessage } = useIntl();

  const showAddButton = shouldShowButton(
    relationshipType,
    direction,
    isSectionEmpty,
    isManaged,
  );

  return (
    <Wrapper>
      <TitleWrapper>
        {formatMessage(getTitle(relationshipType, direction))}
      </TitleWrapper>
      {showAddButton && (
        <Button
          testId={`${testId}--add-action`}
          appearance="subtle"
          iconBefore={<AddIcon size="small" label={actionLabel} />}
          spacing="compact"
          onClick={onActionClick}
        />
      )}
    </Wrapper>
  );
};
