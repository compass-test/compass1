import React, { useState } from 'react';
import {
  SearchDialog,
  SearchInput,
  FilterItem,
  ResultContainer,
  SidebarContainer,
  SearchDialogContent,
  FilterRowLabelText,
  FilterColLabelText,
  ColumnFilterGroup,
  RowFilterGroup,
} from '../src';
import { ExampleSearchResults } from './102-step-2-with-results';
import { ExampleFooter } from './103-step-3-with-footer';
import Avatar from '@atlaskit/avatar';

export const ExampleFilterColItem = () => {
  const [isChecked, setIsChecked] = useState(false);
  return (
    <FilterItem
      value="value"
      onChange={() => setIsChecked(!isChecked)}
      icon={
        <Avatar
          appearance="square"
          size="small"
          src="https://hello.atlassian.net/secure/projectavatar?pid=30630"
        />
      }
      label="Spaceship Project"
      isChecked={isChecked}
      LabelComponent={FilterColLabelText}
    />
  );
};

export const ExampleFilterRowItem = () => {
  const [isChecked, setIsChecked] = useState(false);
  return (
    <FilterItem
      value="value"
      onChange={() => setIsChecked(!isChecked)}
      label="Open"
      isChecked={isChecked}
      LabelComponent={FilterRowLabelText}
    />
  );
};

export const ExampleFilterColContent = ({ loading = false }) => {
  return (
    <ColumnFilterGroup title="Filter by project" isLoading={loading}>
      <ExampleFilterColItem />
      <ExampleFilterColItem />
      <ExampleFilterColItem />
      <ExampleFilterColItem />
      <ExampleFilterColItem />
      <ExampleFilterColItem />
    </ColumnFilterGroup>
  );
};

export const ExampleFilterRowContent = ({ loading = false }) => {
  return (
    <RowFilterGroup title="Filter by status" isLoading={loading}>
      <ExampleFilterRowItem />
      <ExampleFilterRowItem />
    </RowFilterGroup>
  );
};

export default () => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <>
      <button
        style={{ marginBottom: '10px' }}
        onClick={() => setIsExpanded(!isExpanded)}
      >
        {isExpanded ? 'Close Dialog' : 'Open Dialog'}
      </button>

      <SearchInput
        isExpanded={isExpanded}
        onInput={() => setIsExpanded(true)}
        onClick={() => setIsExpanded(true)}
      />
      {isExpanded && (
        <SearchDialog>
          <SearchDialogContent>
            <ResultContainer>
              <ExampleSearchResults />
            </ResultContainer>
            <SidebarContainer>
              <ExampleFilterColContent />
              <ExampleFilterRowContent />
            </SidebarContainer>
          </SearchDialogContent>
          <ExampleFooter />
        </SearchDialog>
      )}
    </>
  );
};
