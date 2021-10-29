import React, { useState } from 'react';

import debounce from 'debounce-promise';

import { useFlags } from '@atlaskit/flag';
import { AsyncSelect } from '@atlaskit/select';
import { CommonMessages } from '@atlassian/dragonfruit-common-messages';
import { BaseErrorFlagProps } from '@atlassian/dragonfruit-common-ui';
import { ComponentTypeIcon } from '@atlassian/dragonfruit-components';
import {
  SearchComponentsPickerDocument,
  SearchComponentsPickerQuery,
  SearchComponentsPickerQueryVariables,
  useImperativeQuery,
} from '@atlassian/dragonfruit-graphql';
import { useTenantInfo } from '@atlassian/dragonfruit-tenant-context';
import { useIntl, withErrorBoundary } from '@atlassian/dragonfruit-utils';

import messages from './messages';
import { IconContainer, OptionContainer, TextOverflowWrapper } from './styled';
import { ComponentOption, ComponentSearchPickerProps } from './types';

const DEBOUNCE_TIMER = 300;

// We can customise what to display in the control and list
// by taking in the FormatOptionLabelMeta argument and checking
// whether its FormatOptionLabelContext is 'menu' or 'value'
const renderOption = (option: ComponentOption) => (
  <OptionContainer>
    <IconContainer>
      <ComponentTypeIcon type={option.value.type} size="small" />
    </IconContainer>
    <TextOverflowWrapper>{option.value.name}</TextOverflowWrapper>
  </OptionContainer>
);

const ComponentSearchPicker = (props: ComponentSearchPickerProps) => {
  const { onChange, ...rest } = props;

  const { formatMessage } = useIntl();
  const { showFlag } = useFlags();
  const { cloudId } = useTenantInfo();
  const search = useImperativeQuery<
    SearchComponentsPickerQuery,
    SearchComponentsPickerQueryVariables
  >(SearchComponentsPickerDocument, { fetchPolicy: 'network-only' });

  const [
    selectedComponent,
    setSelectedComponent,
  ] = useState<ComponentOption | null>(null);

  const searchComponents = async (input: string) => {
    const trimmedInput = input.trim();
    const query = trimmedInput !== '' ? trimmedInput : undefined;

    return search({
      cloudId,
      query: {
        query,
        first: 10,
        fieldFilters: [],
        sort: [],
      },
    })
      .then(({ data }) => {
        const searchComponentsData = data?.compass?.searchComponents;
        const nodes =
          searchComponentsData?.__typename ===
            'CompassSearchComponentConnection' && searchComponentsData.nodes
            ? searchComponentsData.nodes.filter((node) => node.component)
            : [];

        const componentOptions: ComponentOption[] = nodes.reduce(
          (accumulator: ComponentOption[], currentNode) => {
            if (currentNode?.component) {
              const newOption: ComponentOption = {
                value: currentNode.component,
              };
              accumulator.push(newOption);
            }
            return accumulator;
          },
          [],
        );
        return componentOptions;
      })
      .catch((e) => {
        showFlag({
          ...BaseErrorFlagProps,
          id: 'dragonfruitSearchComponentPickerError',
          title: formatMessage(CommonMessages.error),
          description: formatMessage(
            CommonMessages.somethingWentWrongPleaseTryAgainFullStop,
          ),
        });
        return [];
      });
  };

  const debouncedLoadOptions = debounce(searchComponents, DEBOUNCE_TIMER);

  const onOptionChange = (selectedOption: ComponentOption) => {
    setSelectedComponent(selectedOption);
    onChange?.(selectedOption?.value);
  };

  return (
    <AsyncSelect<ComponentOption>
      {...rest}
      defaultOptions
      isSearchable
      loadOptions={debouncedLoadOptions}
      onChange={(newValue) => {
        onOptionChange(newValue as ComponentOption);
      }}
      onInputChange={debouncedLoadOptions}
      value={selectedComponent}
      noOptionsMessage={() => formatMessage(CommonMessages.noMatchesFound)}
      placeholder={formatMessage(messages.componentSearchPlaceholder)}
      formatOptionLabel={renderOption}
    />
  );
};

export default withErrorBoundary(ComponentSearchPicker, {
  componentName: 'componentSearchPicker',
});
