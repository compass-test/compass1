import React, { ComponentType, ReactNode } from 'react';
import {
  InstructionsContainer,
  Instruction,
  Description,
  NoteText,
  ItemCardContentWrapper,
} from './styled';
import { useLinkClickedEvent } from '../../../../common/analytics';
import { TaskId } from '../../../../common/types';
import { getComponentTestId } from '../../../../common/util';
import { LinkWithFullClickEvents } from '../../../link-utility';

interface Props {
  description: string;
  learnMore?: {
    url: string;
    text: string;
    inProductHelpArticleId?: string;
    taskId: TaskId;
  };
  instructions: { key: string; element: ReactNode }[];
  noteText?: string;
}

export const ItemCardContent: ComponentType<Props> = ({
  description,
  learnMore,
  instructions,
  noteText,
}: Props) => {
  const onLearnMoreClicked = useLinkClickedEvent(
    'jsmGettingStartedPanelChecklistTaskLearnMoreLink',
    {
      attributes: {
        taskId: learnMore?.taskId,
      },
    },
  );

  return (
    <ItemCardContentWrapper onClick={(e) => e.stopPropagation()}>
      <Description>{description}</Description>
      <InstructionsContainer
        data-testid={getComponentTestId('checklistItemCardInstructions')}
      >
        {instructions.map(({ key, element }) => (
          <Instruction key={key}>{element}</Instruction>
        ))}
      </InstructionsContainer>
      {noteText && <NoteText>{noteText}</NoteText>}
      {!!learnMore && (
        <LinkWithFullClickEvents
          href={learnMore.url}
          target="_blank"
          inProductHelpArticleId={learnMore.inProductHelpArticleId}
          onLinkClick={onLearnMoreClicked}
          data-testid={getComponentTestId('checklistItemCardLearnMoreLink')}
        >
          {learnMore.text}
        </LinkWithFullClickEvents>
      )}
    </ItemCardContentWrapper>
  );
};
