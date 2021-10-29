import React from 'react';

import { issueTypeMap, issueTypes, StoryMetadata } from '../../../common/mocks';

import ExcludeIssueType from './index';

export default {
  title: 'Exclude Issue type',
} as StoryMetadata;

export const basic = () => (
  <ExcludeIssueType
    fieldProps={{
      value: [],
      onChange: () => {},
      onBlur: () => {},
      onFocus: () => {},
      id: 'id',
      name: 'name',
      isDisabled: false,
      isRequired: false,
      isInvalid: false,
      ['aria-invalid']: 'false',
      ['aria-labelledby']: 'label',
    }}
    loading={false}
  />
);

export const prefilled = () => (
  <ExcludeIssueType
    fieldProps={{
      value: issueTypes.map(({ id }) => String(id)),
      onChange: () => {},
      onBlur: () => {},
      onFocus: () => {},
      id: 'id',
      name: 'name',
      isDisabled: false,
      isRequired: false,
      isInvalid: false,
      ['aria-invalid']: 'false',
      ['aria-labelledby']: 'label',
    }}
    loading={false}
    issueTypeMap={issueTypeMap}
  />
);

export const loading = () => (
  <ExcludeIssueType
    fieldProps={{
      value: issueTypes.map(({ id }) => String(id)),
      onChange: () => {},
      onBlur: () => {},
      onFocus: () => {},
      id: 'id',
      name: 'name',
      isDisabled: false,
      isRequired: false,
      isInvalid: false,
      ['aria-invalid']: 'false',
      ['aria-labelledby']: 'label',
    }}
    loading={true}
    issueTypeMap={issueTypeMap}
  />
);
