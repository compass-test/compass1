import { ApolloProvider } from '@apollo/react-hooks';
import { createMockClient } from 'mock-apollo-client';
import React, { ComponentProps, Suspense, useState } from 'react';

import { createExampleComponent } from '@atlassian/aux-test-utils';
import { LabelPickerQuery } from '@atlassian/confluence-label-picker';
import { AkButton, AkForm } from '@atlassian/forge-ui';

import { makeLabelPicker } from './LabelPicker';
import type { LabelPickerProps } from './LabelPicker';

const client = createMockClient();
const LABELS = [
  {
    prefix: 'global',
    name: '90-day-plan',
    id: '4469949120',
  },
  {
    prefix: 'global',
    name: 'competitive-analyses',
    id: '4226777175',
  },
  {
    prefix: 'global',
    name: 'confluence',
    id: '5734742',
  },
  {
    prefix: 'global',
    name: 'dafdsafdsafdafa',
    id: '3508109442',
  },
  {
    prefix: 'global',
    name: 'dank',
    id: '3283419438',
  },
  {
    prefix: 'global',
    name: 'ddd',
    id: '2020442113',
  },
  {
    prefix: 'global',
    name: 'decisions',
    id: '426934274',
  },
  {
    prefix: 'global',
    name: 'design',
    id: '5734879',
  },
  {
    prefix: 'global',
    name: 'dfd',
    id: '3489136711',
  },
  {
    prefix: 'global',
    name: 'dfdf',
    id: '3395485726',
  },
  {
    prefix: 'global',
    name: 'eafata',
    id: '3508142096',
  },
  {
    prefix: 'global',
    name: 'feature-audit',
    id: '3360326456',
  },
  {
    prefix: 'global',
    name: 'feature-shipped',
    id: '738852866',
  },
  {
    prefix: 'global',
    name: 'file-list',
    id: '469696514',
  },
  {
    prefix: 'global',
    name: 'finance',
    id: '20480001',
  },
  {
    prefix: 'global',
    name: 'ha',
    id: '602898434',
  },
  {
    prefix: 'global',
    name: 'hahaha',
    id: '2151743493',
  },
  {
    prefix: 'global',
    name: 'ifunny',
    id: '2151743494',
  },
  {
    prefix: 'global',
    name: 'jank',
    id: '3508273293',
  },
  {
    prefix: 'global',
    name: 'jf',
    id: '3395060398',
  },
  {
    prefix: 'global',
    name: 'jgcgnv',
    id: '3395158719',
  },
  {
    prefix: 'global',
    name: 'jirareport',
    id: '736985089',
  },
  {
    prefix: 'global',
    name: 'kb-how-to-article',
    id: '803700737',
  },
  {
    prefix: 'global',
    name: 'label',
    id: '19070985',
  },
  {
    prefix: 'global',
    name: 'lol',
    id: '2151743492',
  },
  {
    prefix: 'global',
    name: 'meeting',
    id: '5734442',
  },
  {
    prefix: 'global',
    name: 'meeting-notes',
    id: '323026946',
  },
  {
    prefix: 'global',
    name: 'memerino',
    id: '3508338790',
  },
  {
    prefix: 'global',
    name: 'memes',
    id: '2151743491',
  },
  {
    prefix: 'global',
    name: 'mems',
    id: '2151743490',
  },
  {
    prefix: 'global',
    name: 'pdf',
    id: '5735144',
  },
  {
    prefix: 'global',
    name: 'planning',
    id: '5734628',
  },
  {
    prefix: 'global',
    name: 'poster',
    id: '1430618113',
  },
  {
    prefix: 'global',
    name: 'project',
    id: '5734459',
  },
  {
    prefix: 'global',
    name: 'requirements',
    id: '340295681',
  },
  {
    prefix: 'global',
    name: 'retrospective',
    id: '5734552',
  },
  {
    prefix: 'global',
    name: 'sfadf',
    id: '3513319827',
  },
  {
    prefix: 'global',
    name: 'shared-links',
    id: '794624003',
  },
  {
    prefix: 'global',
    name: 'ssh-planning-meeting',
    id: '564002818',
  },
  {
    prefix: 'global',
    name: 'status',
    id: '5734535',
  },
  {
    prefix: 'global',
    name: 'super',
    id: '19070979',
  },
  {
    prefix: 'global',
    name: 'swag',
    id: '2151743489',
  },
  {
    prefix: 'global',
    name: 'test',
    id: '5734806',
  },
  {
    prefix: 'global',
    name: 'testarino',
    id: '3508076621',
  },
  {
    prefix: 'global',
    name: 'weekly',
    id: '32604161',
  },
  {
    prefix: 'global',
    name: 'yay',
    id: '3456631569',
  },
];
client.setRequestHandler(
  LabelPickerQuery,
  ({ searchText }) =>
    new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          data: {
            labelSearch: {
              suggestedLabels: LABELS.filter(({ name }) => name === searchText),
              otherLabels: LABELS.filter(
                ({ name }) =>
                  !searchText.length ||
                  (name.length > searchText.length &&
                    name.indexOf(searchText) !== -1),
              ),
            },
          },
        });
      }, 1000);
    }),
);

const LabelPicker = createExampleComponent(makeLabelPicker({ client }));

type LabelPickerExampleProps = Omit<LabelPickerProps, 'name'>;
function LabelPickerExample(props: LabelPickerExampleProps) {
  const [sumbittedFormData, setSubmittedFormData] = useState<
    Parameters<ComponentProps<typeof AkForm>['onSubmit']>[0]
  >();

  return (
    <Suspense fallback="loading">
      <ApolloProvider client={client}>
        <AkForm onSubmit={setSubmittedFormData}>
          {({ formProps }) => (
            <form {...formProps}>
              <LabelPicker name="labelPicker" {...props} />
              <AkButton type="submit">Submit</AkButton>
            </form>
          )}
        </AkForm>
      </ApolloProvider>
      Submitted form data: {JSON.stringify(sumbittedFormData)}
    </Suspense>
  );
}

export const SingleLabelPickerExample = (
  props: Partial<LabelPickerExampleProps> = {},
) => (
  <LabelPickerExample
    isMulti={false}
    label="Select a single label"
    {...props}
  />
);

export const MultiLabelPickerExample = (
  props: Partial<LabelPickerExampleProps> = {},
) => (
  <LabelPickerExample
    isMulti={true}
    label="Label"
    placeholder="All labels"
    {...props}
  />
);

export const MultiLabelPickerExampleWithDefaultValue = (
  props: Partial<LabelPickerExampleProps> = {},
) => (
  <LabelPickerExample
    defaultValue={[
      {
        prefix: 'global',
        name: 'plugin-compatibility-report',
        id: '665452545',
      },
      {
        prefix: 'global',
        name: 'sprint-planning-galaxy',
        id: '870744065',
      },
    ]}
    isMulti={true}
    label="Label"
    {...props}
  />
);

export const CreatableSingleLabelPickerExample = () =>
  SingleLabelPickerExample({ isCreatable: true });

export const CreatableMultiLabelPickerExample = () =>
  MultiLabelPickerExampleWithDefaultValue({ isCreatable: true });
