import React from 'react';
import Lozenge, { ThemeAppearance } from '@atlaskit/lozenge';
import { FormatOptionLabelMeta } from '@atlaskit/select';
import Select from '@atlaskit/select';
import { InviteFixtureForResource } from './mockInviteServer';
import { inviteFixtureOptions, InviteFixtureOption } from '../uiOptions';

const getFixtureOptionValue = (cap: InviteFixtureOption) => cap.label;

const getFixtureOptionAppearance = (
  option: InviteFixtureOption,
): ThemeAppearance => {
  if (option.result === 'INVITED') {
    return 'success';
  }
  if (option.result === 'INVITED_PENDING_APPROVAL') {
    return 'inprogress';
  }
  if (option.result === 'ERROR' && option.capability !== 'none') {
    return 'removed';
  }
  return 'default';
};

const fixtureOptionWithColors = (
  option: InviteFixtureOption,
  _meta: FormatOptionLabelMeta<InviteFixtureOption>,
) => (
  <Lozenge appearance={getFixtureOptionAppearance(option)}>
    {option.label}
  </Lozenge>
);

export const InviteFixtureSelect = ({
  value,
  onChange,
}: {
  value: InviteFixtureForResource;
  onChange: (newResourceFixture: InviteFixtureForResource) => void;
}) => {
  const handleChange = React.useCallback(
    (newOption: any) => {
      onChange({ ...value, ...newOption });
    },
    [onChange, value],
  );
  const selectedOption = React.useMemo(
    () =>
      inviteFixtureOptions.find(
        (option) =>
          option.capability === value.capability &&
          option.result === value.result,
      ),
    [value.capability, value.result],
  );

  return (
    <Select
      value={selectedOption}
      onChange={handleChange}
      getOptionValue={getFixtureOptionValue}
      formatOptionLabel={fixtureOptionWithColors}
      options={inviteFixtureOptions}
      spacing={'compact'}
    />
  );
};
