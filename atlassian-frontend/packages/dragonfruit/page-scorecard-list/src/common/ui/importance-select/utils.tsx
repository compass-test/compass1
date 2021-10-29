import React from 'react';

import { ValueType } from '@atlaskit/select';
import { CompassScorecardImportance } from '@atlassian/dragonfruit-graphql';
import { ScorecardStandardIcon } from '@atlassian/dragonfruit-scorecards';
import { useIntl } from '@atlassian/dragonfruit-utils';

import { OptionWithIcon } from '../icon-select/types';

import messages from './messages';

export const ImportanceOptions = (isAdmin: boolean) => {
  const { formatMessage } = useIntl();

  const importanceOptions: OptionWithIcon[] = [];

  if (isAdmin) {
    importanceOptions.push({
      label: formatMessage(messages.optionRequired),
      value: CompassScorecardImportance.REQUIRED,
      icon: (
        <ScorecardStandardIcon
          importance={CompassScorecardImportance.REQUIRED}
        />
      ),
    });
  }

  importanceOptions.push(
    {
      label: formatMessage(messages.optionRecommended),
      value: CompassScorecardImportance.RECOMMENDED,
      icon: (
        <ScorecardStandardIcon
          importance={CompassScorecardImportance.RECOMMENDED}
        />
      ),
    },
    {
      label: formatMessage(messages.optionUserDefined),
      value: CompassScorecardImportance.USER_DEFINED,
      icon: (
        <ScorecardStandardIcon
          importance={CompassScorecardImportance.USER_DEFINED}
        />
      ),
    },
  );

  return importanceOptions;
};

export const GetImportanceOptionFromValue = (
  value: string | null | undefined,
): ValueType<OptionWithIcon> | null => {
  //  We need to return all the options here so that we can always find
  //  the correct option for user in those scenarios:
  //  User's permission is changed to admin, or non-admin.
  const options = ImportanceOptions(true);

  if (!value || !options) {
    return null;
  }

  const option = options.find(
    (option: ValueType<OptionWithIcon>) =>
      option?.value ===
      CompassScorecardImportance[
        value as keyof typeof CompassScorecardImportance
      ],
  );
  return option === undefined ? null : option;
};
