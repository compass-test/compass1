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
  totalCount: 6,
  options: [
    {
      optionType: 'group',
      label: 'Next Gen',
      options: [
        {
          optionType: 'option',
          label: 'Email Request',
          value: 'email-request',
        },
        {
          optionType: 'option',
          label: 'Ask a question',
          value: 'Ask a question',
        },
        {
          optionType: 'option',
          label: 'Submit a request or incident',
          value: 'Submit a request or incident',
        },
      ],
    },
    {
      label: 'Facilities',
      optionType: 'group',
      options: [
        {
          optionType: 'option',
          label: 'Request an event',
          value: 'Request an event',
        },
        {
          optionType: 'option',
          label: 'Report a move',
          value: 'Report a move',
        },
        {
          optionType: 'option',
          label: 'Questions for facilities',
          value: 'Questions for facilities',
        },
      ],
    },
  ],
};

export default function LoadPaginatedPickerGroupedExample() {
  const [isOpen, setIsOpen] = useState(true);
  const [values, setValues] = useState<SelectValues>([]);

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
        {formatLabel('Request types', values)}
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
    <div data-testid="paginated-picker-grouped">
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
        />
      </IntlProvider>
    </div>
  );
}
