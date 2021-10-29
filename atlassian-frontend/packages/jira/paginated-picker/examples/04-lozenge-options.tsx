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
  totalCount: 7,
  options: [
    {
      optionType: 'lozenge',
      label: 'Email Request',
      value: 'email-request',
      appearance: 'default',
      isBold: false,
      maxWidth: 150,
    },
    {
      optionType: 'lozenge',
      label: 'Ask a question',
      value: 'Ask a question',
      appearance: 'inprogress',
      isBold: true,
      maxWidth: 50,
    },
    {
      optionType: 'lozenge',
      label: 'Submit a request or incident',
      value: 'Submit a request or incident',
      appearance: 'moved',
      isBold: false,
      maxWidth: 500,
    },
    {
      optionType: 'lozenge',
      label: 'Request an event',
      value: 'Request an event',
      appearance: 'new',
      isBold: true,
      maxWidth: '100',
    },
    {
      optionType: 'lozenge',
      label: 'Report a move',
      value: 'Report a move',
      appearance: 'removed',
      isBold: false,
      maxWidth: '75',
    },
    {
      optionType: 'lozenge',
      label: 'Questions for facilities',
      value: 'Questions for facilities',
      appearance: 'success',
      isBold: true,
      maxWidth: '200',
    },
    {
      optionType: 'option',
      label: 'Other - Not lozenge',
      value: 'Other',
    },
  ],
};

export default function LoadPaginatedPickerLozengeExample() {
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
    <div data-testid="paginated-picker-lozenge">
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
