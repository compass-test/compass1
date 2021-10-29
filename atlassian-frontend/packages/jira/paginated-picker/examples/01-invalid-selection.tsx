import React, { useState } from 'react';

import { IntlProvider } from 'react-intl';

import { TriggerProps } from '@atlaskit/popup';

import Picker, {
  AsyncLoadOptionsData,
  formatLabel,
  PickerTrigger,
  SelectValues,
} from '../src';
import { AsyncLoadOptions } from '../src/common/types';

const mock: AsyncLoadOptionsData = {
  totalCount: 9,
  options: [
    {
      optionType: 'option',
      label: 'Jira Software',
      value: 'Jira Software',
    },
    {
      optionType: 'option',
      label: 'Next Gen',
      value: 'Next Gen',
    },
    {
      optionType: 'option',
      label: 'General Service Desk',
      value: 'General Service Desk',
    },
    {
      optionType: 'option',
      label: 'Rocket Launch',
      value: 'Rocket Launch',
      invalid: true,
    },
    {
      optionType: 'option',
      label: 'Scrum',
      value: 'Scrum',
      invalid: true,
    },
    {
      optionType: 'option',
      label: 'Tracker',
      value: 'Tracker',
    },
    {
      optionType: 'option',
      label: 'Facilities',
      value: 'Facilities',
    },
    {
      optionType: 'option',
      label: 'Legal Entities',
      value: 'Legal Entities',
      invalid: false,
    },
    {
      optionType: 'option',
      label: 'HR Help Desk',
      value: 'HR Help Desk',
    },
  ],
};

export default function LoadPaginatedPickerInvalidExample() {
  const [isOpen, setIsOpen] = useState(true);
  const [values, setValues] = useState<SelectValues>([
    {
      optionType: 'option',
      label: 'Rocket Launch',
      value: 'Rocket Launch',
      invalid: true,
    },
    {
      optionType: 'option',
      label: 'Legal Entities',
      value: 'Legal Entities',
      invalid: false,
    },
  ]);

  const onTrigger = ({ ref }: TriggerProps) => {
    return (
      <PickerTrigger
        hasValues={values.length > 0}
        onClick={() => {
          setIsOpen(!isOpen);
        }}
        isSelected={isOpen}
        isInvalid={values.some(val => val.invalid)}
        ref={ref}
      >
        {formatLabel('Projects', values)}
      </PickerTrigger>
    );
  };

  const onLoadOptions: AsyncLoadOptions = (
    search,
    enableFullList,
    showFullList,
    showMore,
    lastOption,
    cb,
  ) => {
    cb(mock);
  };

  return (
    <div data-testid="paginated-picker-invalid">
      <IntlProvider>
        <Picker
          isOpen={isOpen}
          onOpen={() => {}}
          onClose={() => {}}
          value={values}
          fieldId={'Request types'}
          onChange={setValues}
          onLoadOptions={onLoadOptions}
          onTrigger={onTrigger}
          onClearValues={() => setValues([])}
          fieldInvalidLabel={
            'Your project and request type selection is invalid'
          }
        />
      </IntlProvider>
    </div>
  );
}
