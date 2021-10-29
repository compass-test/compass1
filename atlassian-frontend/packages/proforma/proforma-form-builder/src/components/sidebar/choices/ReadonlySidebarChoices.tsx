/* eslint-disable react/jsx-props-no-spreading */

import React, { useState } from 'react';

import { FormattedMessage } from 'react-intl';
import styled from 'styled-components';

import Button from '@atlaskit/button/standard-button';
import ChevronDownCircleIcon from '@atlaskit/icon/glyph/chevron-down-circle';
import { N100, N20, N30 } from '@atlaskit/theme/colors';
import { FormChoice } from '@atlassian/proforma-common-core/form-system-models';

import {
  IntlQuestionSidebarMessages,
  QuestionSidebarMessage,
} from '../QuestionSidebarMessages.intl';

import { ChoiceMessage, IntlChoiceMessages } from './ChoiceMessages.intl';

interface ReadonlySidebarChoicesProps {
  choices: FormChoice[];
  hasMoreChoices?: boolean;
}

/**
 * Lists readonly choices in the form builder sidebar, ie choices that cannot be edited in the form builder like linked Jira fields.
 */
export const ReadonlySidebarChoices: React.FunctionComponent<ReadonlySidebarChoicesProps> = ({
  choices,
  hasMoreChoices,
}) => {
  // If there are more than four choices then only show the first few choices
  const maximumInitialChoices = 4;
  const [showAll, setShowAll] = useState<boolean>(
    choices.length <= maximumInitialChoices,
  );

  return (
    <OuterDiv>
      {choices.length === 0 && (
        <FormattedMessage
          {...IntlChoiceMessages[ChoiceMessage.NoChoicesToDisplay]}
        />
      )}
      {showAll &&
        choices.map(choice => (
          <ChoiceDiv key={choice.id}>{choice.label}</ChoiceDiv>
        ))}
      {!showAll && (
        <RestrictionDiv>
          <ExpandIconDiv>
            <Button
              appearance="subtle"
              iconAfter={<ChevronDownCircleIcon label="Show all" />}
              onClick={() => setShowAll(true)}
            >
              <FormattedMessage
                {...IntlQuestionSidebarMessages[
                  hasMoreChoices
                    ? QuestionSidebarMessage.ShowFirstChoices
                    : QuestionSidebarMessage.ShowAllChoices
                ]}
                values={{ choicesLength: choices.length }}
              />
            </Button>
          </ExpandIconDiv>
          {choices.slice(0, maximumInitialChoices).map(choice => (
            <ChoiceDiv key={choice.id}>{choice.label}</ChoiceDiv>
          ))}
        </RestrictionDiv>
      )}
    </OuterDiv>
  );
};

const OuterDiv = styled.div`
  padding: 8px 0 0 0;
}
`;

const RestrictionDiv = styled.div`
  max-height: 150px;
  overflow: hidden;
  position: relative;

  :before {
    content: '';
    width: 100%;
    height: 100%;
    position: absolute;
    left: 0;
    top: 0;
    background: linear-gradient(rgba(255,255,255,0) 120px, ${N20});
  }
}
`;

const ExpandIconDiv = styled.div`
  bottom: 0;
  right: -4px;
  position: absolute;
`;

const ChoiceDiv = styled.div`
  background-color: ${N20};
  border-radius: 3px;
  border-color: ${N30};
  border-style: solid;
  border-width: 2px;
  color: ${N100};
  align-items: center;
  padding: 8px 6px;
  margin: 0 0 4px 0;
  overflow: hidden;
`;
