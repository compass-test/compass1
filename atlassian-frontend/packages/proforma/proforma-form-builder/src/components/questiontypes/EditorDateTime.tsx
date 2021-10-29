import React from 'react';

import { FormattedDate, FormattedMessage, FormattedTime } from 'react-intl';
import styled from 'styled-components';

import CalendarIcon from '@atlaskit/icon/glyph/calendar';
import Select from '@atlaskit/select';
import { N20 } from '@atlaskit/theme/colors';
import {
  EditDateMessages,
  EditTimeMessages,
  IntlEditDateMessages,
  IntlEditTimeMessages,
} from '@atlassian/proforma-common-core/form-system'; // TODO[PF-2010]: This seems like an odd import maybe this could be done better ?
import { QuestionParameters } from '@atlassian/proforma-common-core/form-system-models';

export const EditorDateTime: React.FunctionComponent<QuestionParameters> = props => {
  const { id, defaultAnswer } = props;
  return (
    <FlexContainer>
      <SelectFlexContainer>
        <Select
          autoFocus={false}
          instanceId={`pf-fb-questionview-${id}-date`}
          isInvalid={false}
          isDisabled
          placeholder={
            <FormattedMessage
              {...IntlEditDateMessages[EditDateMessages.DatePlaceholder]}
              values={{
                date: <FormattedDate value={new Date()} />,
              }}
            />
          }
          components={{
            DropdownIndicator: () => <></>,
          }}
          value={defaultAnswer?.date || null}
        />
      </SelectFlexContainer>
      <SelectFlexContainer>
        <Select
          autoFocus={false}
          instanceId={`pf-fb-questionview-${id}-time`}
          isInvalid={false}
          isDisabled
          placeholder={
            <FormattedMessage
              {...IntlEditTimeMessages[EditTimeMessages.TimePlaceholder]}
              values={{
                time: <FormattedTime value={new Date()} />,
              }}
            />
          }
          components={{
            DropdownIndicator: () => <CalendarIcon label="Dates" />,
          }}
          value={defaultAnswer?.time || null}
        />
      </SelectFlexContainer>
    </FlexContainer>
  );
};

const FlexContainer = styled.div`
  display: flex;
  border-width: 2px;
  border-style: solid;
  border-color: ${N20};
  border-radius: 3px;
`;

const SelectFlexContainer = styled.div`
  flex-grow: 1;
  & div {
    border-radius: 0;
  }
`;
