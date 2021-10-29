import React, { ComponentType, ReactNode } from 'react';

import Popup, { PopupComponentProps, TriggerProps } from '@atlaskit/popup';

import type {
  AsyncLoadOptions,
  FormatOptionLabel,
  OnChangeWithData,
  PaginationConfig,
  SelectValues,
} from '../common/types';

import PaginatedAsyncSelectView from './async-select';
import formatOptionLabelDefault from './format-option-label';
import { DialogInner } from './styled';

export interface PickerProps {
  isOpen: boolean;
  fieldId: string;
  fieldLabel?: string;
  fieldInvalidLabel?: string;
  value: SelectValues;
  formatOptionLabel?: FormatOptionLabel;
  pagination?: PaginationConfig;
  PopupComponent?: ComponentType<PopupComponentProps>;
  onTrigger: (a: TriggerProps) => ReactNode;
  onClearValues?: () => void;
  onClose: () => void;
  onOpen: () => void;
  onChange: OnChangeWithData;
  onLoadOptions: AsyncLoadOptions;
  initiallyAddSelectedFirst?: boolean;
}

export const Picker = ({
  isOpen,
  value,
  onClose,
  onClearValues,
  fieldId,
  fieldLabel,
  fieldInvalidLabel,
  onChange,
  formatOptionLabel = formatOptionLabelDefault,
  onLoadOptions,
  pagination,
  PopupComponent,
  onTrigger,
  initiallyAddSelectedFirst = true,
}: PickerProps) => (
  <Popup
    key={fieldId}
    placement="bottom-start"
    isOpen={isOpen}
    onClose={onClose}
    popupComponent={PopupComponent}
    trigger={onTrigger}
    autoFocus={false}
    content={() => (
      <DialogInner>
        <PaginatedAsyncSelectView
          field={{
            isRemovable: false,
            label: fieldLabel || '',
            invalidLabel: fieldInvalidLabel,
            type: 'Filter',
            key: fieldId,
            defaultOptionsLabel: 'defaultOptionsLabel',
            defaultOptions: true,
            cacheOptions: false,
            inputValue: 'string',
            enableShowMore: true,
            pagination,
            loadOptions: onLoadOptions,
          }}
          onChange={onChange}
          value={value}
          formatOptionLabel={formatOptionLabel}
          onClear={onClearValues}
          initiallyAddSelectedFirst={initiallyAddSelectedFirst}
        />
      </DialogInner>
    )}
  />
);
