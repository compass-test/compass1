import React, { ReactNode, useState } from 'react';

import Picker, {
  AsyncLoadOptions,
  countSingleOptions,
  OptionGroup,
  PickerTrigger,
  SelectOptions,
  SelectValues,
} from '@atlassian/paginated-picker';

import { SettingPickerWrapper } from './styled';

interface IssueRequestTypesPickerProps {
  id: string;
  children: ReactNode;
  issueRequestTypeOptions: SelectOptions;
  selectedIssueRequestTypeOptions: SelectValues;
  onChange: (newIssueRequestTypeOptions: SelectValues) => void;
}

export const IssueRequestTypesPicker = ({
  id,
  children,
  issueRequestTypeOptions,
  selectedIssueRequestTypeOptions,
  onChange,
}: IssueRequestTypesPickerProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const onLoadOptions: AsyncLoadOptions = (search, a, b, c, d, callback) => {
    let optionsToDisplay = issueRequestTypeOptions;
    if (search) {
      const lowercaseSearch = search.toLocaleLowerCase();
      optionsToDisplay = issueRequestTypeOptions
        .map(option => {
          if (option.optionType === 'group') {
            const nestedOptions = option.options.filter(nestedOption => {
              return nestedOption.label
                .toLocaleLowerCase()
                .includes(lowercaseSearch);
            });
            if (nestedOptions.length > 0) {
              return {
                ...option,
                options: nestedOptions,
              } as OptionGroup;
            } else {
              return undefined;
            }
          } else {
            return option.label.toLocaleLowerCase().includes(lowercaseSearch)
              ? option
              : undefined;
          }
        })
        .filter(option => option) as SelectOptions;
    }
    callback({
      totalCount: countSingleOptions(optionsToDisplay),
      options: optionsToDisplay,
    });
  };

  return (
    <SettingPickerWrapper>
      <Picker
        isOpen={isOpen}
        onOpen={() => {}}
        onClose={() => setIsOpen(false)}
        value={selectedIssueRequestTypeOptions}
        fieldId={id}
        onChange={onChange}
        onLoadOptions={onLoadOptions}
        onTrigger={({ ref }) => (
          <PickerTrigger
            hasValues={selectedIssueRequestTypeOptions.length > 0}
            onClick={() => setIsOpen(!isOpen)}
            isSelected={isOpen}
            isInvalid={false}
            ref={ref}
          >
            {children}
          </PickerTrigger>
        )}
        onClearValues={() => onChange([])}
        pagination={{
          enableFullList: false,
        }}
        initiallyAddSelectedFirst={
          issueRequestTypeOptions[0].optionType !== 'group'
        }
      />
    </SettingPickerWrapper>
  );
};
