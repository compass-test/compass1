import React, { useCallback } from 'react';
import styled from 'styled-components';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import Select, { ValueType } from '@atlaskit/select';
import { useFetchReleases } from '../../hooks';

const SelectReleaseContainer = styled.div`
  flex: 200px;
  padding: 8px;
`;

interface MatchParams {
  release: string;
}

const DropDown = (props: RouteComponentProps<MatchParams>) => {
  const releases = useFetchReleases({}) || [];
  const options = releases.map((releases) => ({
    label: releases.name,
    value: releases.name,
  }));

  const releaseFromPath = releases.find((release) =>
    props.location.pathname.includes(release.name),
  );

  const defaultValue = releaseFromPath
    ? { label: releaseFromPath.name, value: releaseFromPath.name }
    : undefined;

  interface Option {
    label: string;
    value: string;
  }

  const handleSelectChange = useCallback(
    (e: ValueType<Option>) => {
      props.history.push(`/releases/${(e as Option).label}`);
    },
    [props.history],
  );

  return (
    <SelectReleaseContainer>
      <div key={JSON.stringify(defaultValue)}>
        <Select
          defaultValue={defaultValue}
          onChange={handleSelectChange}
          options={options}
          placeholder="Releases"
          spacing="default"
        />
      </div>
    </SelectReleaseContainer>
  );
};

export const ReleaseSelector = withRouter(DropDown);
