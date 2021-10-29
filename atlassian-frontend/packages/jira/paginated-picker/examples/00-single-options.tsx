import React, { useRef, useState } from 'react';

import { IntlProvider } from 'react-intl';

import { TriggerProps } from '@atlaskit/popup';

import Picker, { formatLabel, PickerTrigger, SelectValues } from '../src';
import { AsyncLoadOptions, SelectOptions } from '../src/common/types';

const mockTotalCount = 100;
const mockOptions: SelectOptions = [
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
  },
  {
    optionType: 'option',
    label: 'Scrum',
    value: 'Scrum',
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
  },
  {
    optionType: 'option',
    label: 'HR Help Desk',
    value: 'HR Help Desk',
  },
];

export default function LoadPaginatedPickerSingleExample() {
  const [isOpen, setIsOpen] = useState(true);
  const [values, setValues] = useState<SelectValues>([]);
  const currentOptions = useRef(mockOptions);
  const page = useRef(0);

  const onTrigger = ({ ref }: TriggerProps) => {
    return (
      <PickerTrigger
        hasValues={values.length > 0}
        onClick={() => {
          setIsOpen(!isOpen);
        }}
        isSelected={isOpen}
        isInvalid={values.some(value => value.invalid)}
        ref={ref}
      >
        {formatLabel('Project', values)}
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
    if (showFullList) {
      // NOTE: This is disable in the `pagination` property on the `Picker` below.
      return;
    }
    let options: SelectOptions;
    if (showMore) {
      page.current = page.current + 1;
      const newOptions = mockOptions.map(option => ({
        ...option,
        value: `${'value' in option ? option.value : ''}-${page.current}`,
      }));
      currentOptions.current = currentOptions.current.concat(newOptions);
      if (search) {
        // NOTE: When showing more with a `search` the options are not filtered by `value`.
        options = newOptions;
      } else {
        options = currentOptions.current;
      }
    } else {
      options = currentOptions.current;
    }
    if (search) {
      options = options.filter(option => {
        if (option.optionType !== 'group') {
          return option.value.includes(search);
        }
      });
    }
    cb({
      totalCount: mockTotalCount,
      options,
    });
  };

  return (
    <div data-testid="paginated-picker-single">
      <IntlProvider>
        <Picker
          isOpen={isOpen}
          onOpen={() => {}}
          onClose={() => {}}
          value={values}
          fieldId={'project'}
          onChange={setValues}
          onLoadOptions={onLoadOptions}
          onTrigger={onTrigger}
          onClearValues={() => setValues([])}
          pagination={{
            enableFullList: false,
          }}
        />
      </IntlProvider>
    </div>
  );
}
