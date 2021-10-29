import React, { useState } from 'react';

import { FormattedMessage, InjectedIntlProps, injectIntl } from 'react-intl';

import DropdownMenu, {
  DropdownItemCheckbox,
  DropdownItemGroupCheckbox,
} from '@atlaskit/dropdown-menu';
import ChevronDown from '@atlaskit/icon/glyph/chevron-down';

import { RequestType, TemplateFormIndex } from '../../models/ProjectForm';
import { SearchStore } from '../../stores/domain/Search-store';

import {
  IntlListProjectFormsMessages,
  ListProjectFormsMessage,
} from './ListProjectFormsMessages.intl';
import { getLocations, Location, LocationMessages } from './location';

interface LocationDropdownProps {
  filter: (r: RequestType) => boolean;
  onChange: (locations: Location[]) => void;
  requestTypes?: boolean;
  store: SearchStore<TemplateFormIndex>;
}

export const LocationDropdown = injectIntl(
  ({
    filter,
    onChange,
    requestTypes,
    store,
    intl,
  }: LocationDropdownProps & InjectedIntlProps) => {
    const storeRequestTypes = store.items
      .map(item => item.requesttypes)
      .reduce((prev, curr) => prev.concat(...curr), [] as RequestType[])
      .filter(filter);
    const formLocations = getLocations(storeRequestTypes);

    const [selectedLocations, setSelectedLocations] = useState<Location[]>([]);

    const toggle = (location: Location) => {
      const index = selectedLocations.indexOf(location);
      const updatedSelectedLocations =
        index >= 0
          ? selectedLocations.filter(l => l !== location)
          : [...selectedLocations, location];
      setSelectedLocations(updatedSelectedLocations);
      onChange(updatedSelectedLocations);
    };

    const label =
      selectedLocations.length > 0
        ? intl.formatMessage(
            IntlListProjectFormsMessages[ListProjectFormsMessage.FormUsages],
            {
              locations: selectedLocations
                .map(l =>
                  intl.formatMessage(
                    IntlListProjectFormsMessages[LocationMessages[l]],
                  ),
                )
                .sort()
                .join(', '),
            },
          )
        : intl.formatMessage(
            IntlListProjectFormsMessages[ListProjectFormsMessage.FormUsage],
          );

    return (
      <DropdownMenu
        trigger={label}
        triggerButtonProps={{ iconAfter: <ChevronDown label="more" /> }}
        triggerType="button"
      >
        <DropdownItemGroupCheckbox id="form-locations">
          {formLocations.map(location => {
            const isSelected = selectedLocations.indexOf(location) >= 0;
            return (
              <DropdownItemCheckbox
                key={location}
                id={location}
                isSelected={isSelected}
                onClick={() => toggle(location)}
              >
                <FormattedMessage
                  {...IntlListProjectFormsMessages[LocationMessages[location]]}
                />
              </DropdownItemCheckbox>
            );
          })}
        </DropdownItemGroupCheckbox>
      </DropdownMenu>
    );
  },
);
