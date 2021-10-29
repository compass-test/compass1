import React from 'react';

import { HelpPointerType } from '../../../../types';

import { Book, Lobby } from './icons';
import {
  DisabledCursorWrapper,
  HelpPointerTypeButton,
  HelpPointerTypeWrapper,
  RadioButton,
  RadioButtonWrapper,
  TextContainer,
  TextDescription,
  TextHeader,
  TypeIconContainer,
} from './styled';

export type PointerTypeOption = {
  label: string;
  value: HelpPointerType;
};

type Props = {
  selectedPointerType: PointerTypeOption;
  setSelectedPointerType: (pointerType: PointerTypeOption) => void;
  isDisabled?: boolean;
};

export const PointerTypeOptions = {
  requestForm: { label: 'Action', value: HelpPointerType.Action },
  knowledgeArticle: {
    label: 'Information',
    value: HelpPointerType.Information,
  },
};

const pointerTypeButtons = [
  {
    headerText: 'Request',
    descriptionText:
      'Link help seekers to the place where they can request help from your team',
    icon: <Lobby />,
    option: PointerTypeOptions.requestForm,
  },
  {
    headerText: 'Knowledge article',
    descriptionText:
      "Help reduce your team's requests by linking help seekers to a page or article where they can self serve help",
    icon: <Book />,
    option: PointerTypeOptions.knowledgeArticle,
  },
];

const HelpPointerTypePicker = (props: Props) => {
  return (
    <DisabledCursorWrapper isDisabled={!!props.isDisabled}>
      <HelpPointerTypeWrapper isDisabled={!!props.isDisabled}>
        {pointerTypeButtons.map((pointerTypeButton) => {
          const isSelected =
            props.selectedPointerType.value === pointerTypeButton.option.value;
          return (
            <HelpPointerTypeButton
              data-testid={
                'help-pointer-editor-type-' + pointerTypeButton.option.value
              }
              onClick={(e) => {
                e.preventDefault();
                props.setSelectedPointerType(pointerTypeButton.option);
              }}
              isSelected={isSelected}
              key={pointerTypeButton.headerText}
              tabIndex={0}
            >
              <TypeIconContainer isSelected={isSelected}>
                {pointerTypeButton.icon}
              </TypeIconContainer>
              <TextContainer>
                <TextHeader> {pointerTypeButton.headerText}</TextHeader>
                <TextDescription>
                  {pointerTypeButton.descriptionText}
                </TextDescription>
              </TextContainer>
              <RadioButtonWrapper>
                <RadioButton isSelected={isSelected} />
              </RadioButtonWrapper>
            </HelpPointerTypeButton>
          );
        })}
      </HelpPointerTypeWrapper>
    </DisabledCursorWrapper>
  );
};

export default HelpPointerTypePicker;
