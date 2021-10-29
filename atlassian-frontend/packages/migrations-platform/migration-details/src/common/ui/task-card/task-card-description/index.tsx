import React, { FC, ReactNode } from 'react';

import Lozenge from '@atlaskit/lozenge';

import {
  LozengeWrapper,
  SelectionDescription,
  SelectionTitle,
  SelectionWrapper,
} from './styled';

export type Selection = {
  title: string;
  description?: ReactNode;
  isBeta?: boolean;
};

type Props = {
  noSelectionDescription: string;
  selections: Selection[];
  isDisabled?: boolean;
  disabledDescription?: string;
  isError?: boolean;
};

const TaskCardDescription: FC<Props> = ({
  noSelectionDescription,
  selections,
  isDisabled,
  disabledDescription,
  isError,
}) => {
  let descriptionSection = (
    <SelectionWrapper>
      <SelectionTitle>{noSelectionDescription}</SelectionTitle>
    </SelectionWrapper>
  );

  if (selections.length > 0) {
    descriptionSection = (
      <>
        {selections.map((selection, index) => (
          <SelectionWrapper key={index}>
            <SelectionTitle>
              {selection.title}
              {selection.isBeta && (
                <LozengeWrapper>
                  <Lozenge appearance="new" isBold>
                    Beta
                  </Lozenge>
                </LozengeWrapper>
              )}
            </SelectionTitle>
            {selection.description && (
              <SelectionDescription>
                {selection.description}
              </SelectionDescription>
            )}
          </SelectionWrapper>
        ))}
      </>
    );
  }

  if (!isError && isDisabled && disabledDescription) {
    descriptionSection = (
      <SelectionWrapper>
        <SelectionTitle>{disabledDescription}</SelectionTitle>
      </SelectionWrapper>
    );
  }

  return descriptionSection;
};

export default TaskCardDescription;
