import React, { useEffect, useState } from 'react';

import { FormattedMessage, InjectedIntlProps, injectIntl } from 'react-intl';
import styled from 'styled-components';

import Button from '@atlaskit/button';
import DropdownMenu, {
  DropdownItemCheckbox,
  DropdownItemGroupCheckbox,
} from '@atlaskit/dropdown-menu';
import ChevronDown from '@atlaskit/icon/glyph/chevron-down';
import Textfield from '@atlaskit/textfield';

import { RequestType, TemplateFormIndex } from '../../models/ProjectForm';
import { SearchStore } from '../../stores/domain/Search-store';

import {
  IntlListProjectFormsMessages,
  ListProjectFormsMessage,
} from './ListProjectFormsMessages.intl';
import { RequestTypeDescription } from './RequestTypeComponents';
import { Divider, SmallSearchIcon } from './styled';
import { extractTicketTypeId } from './ticketType';
import { TypeRenderer } from './TypeRenderer';

interface TicketTypeDropdownProps {
  onChange: (t: string[]) => void;
  requestTypes?: boolean;
  store: SearchStore<TemplateFormIndex>;
  typeRenderer: TypeRenderer;
}

const byFormNameAndId = (a: RequestType, b: RequestType): number => {
  return a.name.localeCompare(b.name) || a.id.localeCompare(b.id);
};

export const TicketTypeDropdown = injectIntl(
  ({
    onChange,
    requestTypes,
    store,
    typeRenderer,
    intl,
  }: TicketTypeDropdownProps & InjectedIntlProps) => {
    const label = intl.formatMessage(
      requestTypes
        ? IntlListProjectFormsMessages[ListProjectFormsMessage.RequestType]
        : IntlListProjectFormsMessages[ListProjectFormsMessage.IssueType],
    );

    const [searchText, setSearchText] = useState('');

    const [selectedTypes, setSelectedTypes] = useState<string[]>([]);

    const [ticketTypes, setTicketTypes] = useState<RequestType[]>([]);

    const toggle = (type: RequestType) => {
      const index = selectedTypes.indexOf(type.id);
      const updatedSelectedTypes =
        index >= 0
          ? selectedTypes.filter(t => t !== type.id)
          : [...selectedTypes, type.id];
      updateTypes(updatedSelectedTypes);
    };

    const updateTypes = (types: string[]) => {
      setSelectedTypes(types);
      onChange(types);
    };

    const filteredTypes = !searchText
      ? ticketTypes
      : ticketTypes.filter(
          t => t.name.toLowerCase().indexOf(searchText.toLowerCase()) >= 0,
        );

    useEffect(() => {
      if (!store.loading) {
        const formTicketTypes: { [key: string]: RequestType } = {};
        store.items.forEach(item =>
          item.requesttypes
            .filter(typeRenderer.filter)
            .forEach(t => (formTicketTypes[extractTicketTypeId(t.id)] = t)),
        );
        const sortedTicketTypes = Object.values(formTicketTypes).sort(
          byFormNameAndId,
        );
        const uniqueFormTicketTypes: RequestType[] = [
          ...new Set(sortedTicketTypes),
        ];
        setTicketTypes(uniqueFormTicketTypes);
      }
    }, [store.loading, store.items, typeRenderer.filter]);

    return (
      <DropdownMenu
        trigger={label}
        triggerButtonProps={{ iconAfter: <ChevronDown label="more" /> }}
        triggerType="button"
      >
        <Textfield
          elemAfterInput={<SmallSearchIcon label={''} />}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setSearchText(e.target.value)
          }
          placeholder={intl.formatMessage(
            IntlListProjectFormsMessages[ListProjectFormsMessage.Search],
          )}
          value={searchText}
          appearance="subtle"
        />
        <Divider />
        <DropdownItemGroupCheckbox id="ticket-types">
          {filteredTypes.map(type => {
            const isSelected = selectedTypes.indexOf(type.id) >= 0;
            return (
              <DropdownItemCheckbox
                key={type.id}
                id={type.id}
                isSelected={isSelected}
                onClick={() => toggle(type)}
              >
                <RequestTypeDescription requestType={type} />
              </DropdownItemCheckbox>
            );
          })}
        </DropdownItemGroupCheckbox>
        <Divider />
        <ButtonWrapper>
          <Button appearance="link" onClick={() => updateTypes([])}>
            <FormattedMessage
              {...IntlListProjectFormsMessages[
                ListProjectFormsMessage.ClearAll
              ]}
            />
          </Button>
        </ButtonWrapper>
      </DropdownMenu>
    );
  },
);

const ButtonWrapper = styled.div`
  float: right;
`;
