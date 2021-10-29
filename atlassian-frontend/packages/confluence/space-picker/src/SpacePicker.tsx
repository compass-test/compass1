/** @jsx jsx */
import { jsx } from '@emotion/core';
import ApolloClient from 'apollo-client';
import { lazy, FC } from 'react';

import { Option } from './Option';
import { SpacePickerOption } from './types';
import useSpacePicker from './useSpacePicker';

const AsyncSelect = lazy(() =>
  import('@atlaskit/select').then((module) => ({
    default: module.AsyncSelect,
  })),
);

export const SpacePicker: FC<{
  isMulti?: boolean;
  onChange?: (spaceId: string | string[]) => void;
  value?: string | string[]; // space ids
  client?: ApolloClient<unknown>;
  siteUrl?: string;
  portalTarget?: HTMLDivElement | null;
}> = (props) => {
  const {
    client,
    isMulti,
    siteUrl = '',
    portalTarget,
    onChange,
    value,
  } = props;

  const { loading, selectedSpaces, querySpaces } = useSpacePicker(
    siteUrl,
    value,
    client,
  );
  let selectedValue = isMulti ? selectedSpaces : selectedSpaces?.[0];
  return (
    <AsyncSelect
      defaultOptions
      isClearable
      cacheOptions
      hideSelectedOptions
      value={selectedValue || null}
      isLoading={loading}
      loadOptions={querySpaces}
      // opt is of type `unknown` when dynamically importing AsyncSelect,
      // and so type assertion to SpacePickerOption is required
      formatOptionLabel={(option) => (
        <Option {...(option as SpacePickerOption)} />
      )}
      onChange={(val) => {
        if (props.isMulti) {
          const value = val as SpacePickerOption[];
          onChange?.(value ? value.map((option) => option?.id) : []);
        } else {
          const value = val as SpacePickerOption;
          onChange?.(value?.id);
        }
      }}
      loadingMessage={() => 'Loading spaces'}
      noOptionsMessage={() => 'No space found'}
      isMulti={isMulti}
      menuPortalTarget={portalTarget}
      getOptionLabel={(opt) => (opt as SpacePickerOption).name}
      getOptionValue={(opt) => (opt as SpacePickerOption).id}
      placeholder="Select a space"
    />
  );
};
