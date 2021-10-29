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

import avatarFix from './avatars/fix.svg';
import avatarMonitor from './avatars/monitor.svg';
import avatarRequest from './avatars/request.svg';

const mock: AsyncLoadOptionsData = {
  totalCount: 7,
  options: [
    {
      optionType: 'avatar',
      label: 'Email Request',
      value: 'email-request',
      avatar: avatarMonitor,
      square: true,
      hideAvatar: false,
    },
    {
      optionType: 'avatar',
      label: 'Ask a question',
      value: 'Ask a question',
      avatar: avatarRequest,
      square: false,
      hideAvatar: false,
    },
    {
      optionType: 'avatar',
      label: 'Submit a request or incident',
      value: 'Submit a request or incident',
      square: true,
      hideAvatar: false,
    },
    {
      optionType: 'avatar',
      label: 'Request an event',
      value: 'Request an event',
      square: false,
    },
    {
      optionType: 'avatar',
      label: 'Report a move',
      value: 'Report a move',
      avatar: avatarFix,
      square: true,
      hideAvatar: true,
    },
    {
      optionType: 'avatar',
      label: 'Questions for facilities',
      value: 'Questions for facilities',
      square: true,
      hideAvatar: true,
    },
    {
      optionType: 'option',
      label: 'Other - Not lozenge',
      value: 'Other',
    },
  ],
};

export default function LoadPaginatedPickerAvatarExample() {
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
    <div data-testid="paginated-picker-avatar">
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
