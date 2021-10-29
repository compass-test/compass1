import React, { FC } from 'react';

import Select from '@atlaskit/select';
import Toggle from '@atlaskit/toggle';

import { useFilters, useFiltersAction } from '../../../controllers/filters';

import { HeaderWrapper, Heading, PackageSelectWrapper } from './styled';

const SelectPackage: FC<{
  packages: string[];
}> = ({ packages }) => {
  const [, setFilterActions] = useFiltersAction();
  const customStyles = {
    container: (base: any) => ({
      ...base,
      width: 300,
      marginRight: 16,
    }),
  };
  return (
    <Select
      className="single-select"
      classNamePrefix="react-select"
      styles={customStyles}
      onChange={inputValue => {
        const input = inputValue! as { label: string; value: string };
        const value = input.value;
        setFilterActions.showPackage(value);
      }}
      defaultValue={{
        label: 'all',
        value: 'all',
      }}
      options={packages.map(pkg => ({ label: pkg, value: pkg }))}
      placeholder="Choose a package"
    />
  );
};
export const Header: FC<{
  packages: string[];
  repository: string | undefined | null;
}> = ({ packages, repository }) => {
  const [filtersState, setFilterActions] = useFilters();
  return (
    <HeaderWrapper>
      {repository && (
        <Heading>{`Techstack for ${repository
          .charAt(0)
          .toUpperCase()}${repository.slice(1)} Frontend`}</Heading>
      )}
      <PackageSelectWrapper>
        <SelectPackage packages={packages} />
        <span>Show unavailable:</span>
        <Toggle
          isChecked={filtersState.showUnavailable}
          onChange={() => {
            setFilterActions.setUnAvailable(!filtersState.showUnavailable);
          }}
        />
      </PackageSelectWrapper>
    </HeaderWrapper>
  );
};
