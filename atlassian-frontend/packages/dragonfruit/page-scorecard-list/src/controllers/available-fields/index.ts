import { useState } from 'react';

import { OptionType } from '@atlaskit/select';
import { withContext } from '@atlassian/dragonfruit-utils';

import { FIELDS, LINKS, OPTIONS } from './constants';

export const valueIsField = (value: string | null | undefined) => {
  return typeof value === 'string' && FIELDS.has(value);
};

export const valueIsLink = (value: string | null | undefined) => {
  return typeof value === 'string' && LINKS.has(value);
};

const useAvailableFieldsInternal: (
  initialClaims?: string[],
) => [
  { fields: OptionType[] },
  {
    claimField: (
      oldField: string | null | undefined,
      newField: string | null | undefined,
    ) => void;
  },
] = (initialClaims) => {
  const [claims, setClaims] = useState(() => new Set(initialClaims));
  const [fields, setFields] = useState(() =>
    OPTIONS.filter((option) => !claims.has(String(option.value))),
  );

  const claimField = (
    oldField: string | null | undefined,
    newField: string | null | undefined,
  ) => {
    const currentClaims = new Set(Array.from(claims));

    if (oldField !== undefined && oldField !== null) {
      currentClaims.delete(oldField);
    }

    if (newField !== undefined && newField !== null) {
      currentClaims.add(newField);
    }

    setClaims(currentClaims);

    const newFields = OPTIONS.filter(
      (link) => !currentClaims.has(link.value.toString()),
    );
    setFields(newFields);
  };

  return [
    {
      fields,
    },
    {
      claimField,
    },
  ];
};

export const {
  SharedStateProvider: AvailableFieldsProvider,
  useSharedStateHook: useAvailableFields,
} = withContext(useAvailableFieldsInternal, {
  provider: 'AvailableFieldsProvider',
  hook: 'useAvailableFields',
});
