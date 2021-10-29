import React from 'react';

import { action } from '@storybook/addon-actions';
import { IntlProvider } from 'react-intl';

import AppTable, { Props } from './main';

export const AppTableEmpty = (props: Partial<Props>) => {
  return (
    <IntlProvider locale="en">
      <AppTable {...props} />
    </IntlProvider>
  );
};

export const AppTableEmptyWithHeader = (props: Partial<Props>) => {
  return (
    <IntlProvider locale="en">
      <AppTable emptyHeader="Custom Empty Header" {...props} />
    </IntlProvider>
  );
};

export const AppTableEmptyWithDescription = (props: Partial<Props>) => {
  return (
    <IntlProvider locale="en">
      <AppTable emptyDescription="Custom empty description." {...props} />
    </IntlProvider>
  );
};

export const AppTableEmptyWithReactDescription = (props: Partial<Props>) => {
  return (
    <IntlProvider locale="en">
      <AppTable
        emptyDescription={
          <>
            Cool P1 and <strong>this should be bold</strong>
          </>
        }
        {...props}
      />
    </IntlProvider>
  );
};

export const AppTableEmptyWithHomeCta = (props: Partial<Props>) => {
  return (
    <IntlProvider locale="en">
      <AppTable onHome={action('Home')} {...props} />
    </IntlProvider>
  );
};

export const AppTableEmptyWithAllProps = (props: Partial<Props>) => {
  return (
    <IntlProvider locale="en">
      <AppTable
        emptyHeader="Custom Empty Header"
        emptyDescription="Custom empty description."
        onHome={action('Home')}
        {...props}
      />
    </IntlProvider>
  );
};

export const AppTableNormal = (props: Partial<Props>) => {
  return (
    <IntlProvider locale="en">
      <AppTable
        defaultSortOrder="ASC"
        defaultSortKey="head-1"
        head={{
          cells: [
            {
              key: 'head-1',
              content: 'Header 1',
              isSortable: true,
              width: 14,
            },
            {
              key: 'head-2',
              content: 'Header 2',
              width: 14,
            },
          ],
        }}
        rows={[
          {
            key: 'row-1',
            testId: 'row1',
            cells: [
              { key: 'row-1-col-1', testId: 'col1', content: 'Row 1 Column 1' },
              { key: 'row-1-col-2', testId: 'col2', content: 'Row 1 Column 2' },
            ],
          },
          {
            key: 'row-2',
            testId: 'row2',
            cells: [
              { key: 'row-2-col-1', testId: 'col1', content: 'Row 2 Column 1' },
              { key: 'row-2-col-2', testId: 'col2', content: 'Row 2 Column 2' },
            ],
          },
        ]}
        {...props}
      />
    </IntlProvider>
  );
};

export const AppTableHeaderWithoutRows = (props: Partial<Props>) => {
  return (
    <IntlProvider locale="en">
      <AppTable
        defaultSortOrder="ASC"
        defaultSortKey="head-1"
        head={{
          cells: [
            {
              key: 'head-1',
              content: 'Header 1',
              isSortable: true,
              width: 14,
            },
            {
              key: 'head-2',
              content: 'Header 2',
              width: 14,
            },
          ],
        }}
        {...props}
      />
    </IntlProvider>
  );
};

export const AppTableNormalWithLoading = (props: Partial<Props>) => {
  return (
    <IntlProvider locale="en">
      <AppTable
        defaultSortOrder="ASC"
        defaultSortKey="head-1"
        isLoading={true}
        head={{
          cells: [
            {
              key: 'head-1',
              content: 'Header 1',
              isSortable: true,
              width: 14,
            },
            {
              key: 'head-2',
              content: 'Header 2',
              width: 14,
            },
          ],
        }}
        rows={[
          {
            key: 'row-1',
            testId: 'row1',
            cells: [
              { key: 'row-1-col-1', testId: 'col1', content: 'Row 1 Column 1' },
              { key: 'row-1-col-2', testId: 'col2', content: 'Row 1 Column 2' },
            ],
          },
          {
            key: 'row-2',
            testId: 'row2',
            cells: [
              { key: 'row-2-col-1', testId: 'col1', content: 'Row 2 Column 1' },
              { key: 'row-2-col-2', testId: 'col2', content: 'Row 2 Column 2' },
            ],
          },
        ]}
        {...props}
      />
    </IntlProvider>
  );
};
