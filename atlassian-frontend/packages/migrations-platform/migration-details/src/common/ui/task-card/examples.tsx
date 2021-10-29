import React, { FC } from 'react';

import { IntlProvider } from 'react-intl';

import { TaskCard } from './index';

export const TaskCardBasicWithSelections = () => {
  return (
    <TaskCardWithSelectionsAndFunctions
      onSelect={() => undefined}
      onSkip={() => undefined}
    />
  );
};

export const TaskCardWithNoSelections = () => {
  return (
    <TaskCardWithNoSelectionsAndFunctions
      onSelect={() => undefined}
      onSkip={() => undefined}
    />
  );
};

export const TaskCardWithSelectionsAndFunctions: FC<{
  onSelect: () => void;
  onSkip: () => void;
}> = ({ onSelect, onSkip }) => {
  return (
    <IntlProvider locale="en">
      <TaskCard
        taskName="Projects"
        selections={[
          { title: 'title1', description: 'description1' },
          { title: 'title2', description: 'description2' },
        ]}
        noSelectionDescription="nothing selected"
        onSelect={onSelect}
        onSkip={onSkip}
        shouldAllowSkip={true}
        isDisabled={false}
        isLoading={false}
        isSelectLoading={false}
        isSkipLoading={false}
      />
    </IntlProvider>
  );
};

export const TaskCardWithOneSelection = () => {
  return (
    <IntlProvider locale="en">
      <TaskCard
        taskName="Projects"
        selections={[{ title: 'title1', description: 'description1' }]}
        noSelectionDescription="nothing selected"
        onSelect={() => undefined}
        onSkip={() => undefined}
        shouldAllowSkip={true}
        isDisabled={false}
        isLoading={false}
        isSelectLoading={false}
        isSkipLoading={false}
      />
    </IntlProvider>
  );
};

export const TaskCardWithSelectLoading = () => {
  return (
    <IntlProvider locale="en">
      <TaskCard
        taskName="Projects"
        selections={[]}
        noSelectionDescription="nothing selected"
        onSelect={() => undefined}
        onSkip={() => undefined}
        shouldAllowSkip={true}
        isDisabled={false}
        isLoading={false}
        isSelectLoading={true}
        isSkipLoading={false}
      />
    </IntlProvider>
  );
};

export const TaskCardWithSkipIsLoading = () => {
  return (
    <IntlProvider locale="en">
      <TaskCard
        taskName="Projects"
        selections={[]}
        noSelectionDescription="nothing selected"
        onSelect={() => undefined}
        onSkip={() => undefined}
        shouldAllowSkip={true}
        isDisabled={false}
        isLoading={false}
        isSelectLoading={false}
        isSkipLoading={true}
      />
    </IntlProvider>
  );
};

export const TaskCardIsLoading = () => {
  return (
    <IntlProvider locale="en">
      <TaskCard
        taskName="Projects"
        selections={[]}
        noSelectionDescription="nothing selected"
        onSelect={() => undefined}
        onSkip={() => undefined}
        shouldAllowSkip={true}
        isDisabled={false}
        isLoading={true}
        isSelectLoading={false}
        isSkipLoading={false}
      />
    </IntlProvider>
  );
};

export const TaskCardWithNoSelectionsAndFunctions: FC<{
  onSelect: () => void;
  onSkip: () => void;
}> = ({ onSelect, onSkip }) => {
  return (
    <IntlProvider locale="en">
      <TaskCard
        taskName="Projects"
        selections={[]}
        noSelectionDescription="You haven't selected any projects"
        onSelect={onSelect}
        onSkip={onSkip}
        shouldAllowSkip={true}
        isDisabled={false}
        isLoading={false}
        isSelectLoading={false}
        isSkipLoading={false}
      />
    </IntlProvider>
  );
};

export const TaskCardDisabled = () => {
  return (
    <IntlProvider locale="en">
      <TaskCard
        taskName="Projects"
        selections={[]}
        noSelectionDescription="You haven't selected any projects"
        onSelect={() => undefined}
        onSkip={() => undefined}
        shouldAllowSkip={true}
        isDisabled={true}
        isLoading={false}
        isSelectLoading={false}
        isSkipLoading={false}
      />
    </IntlProvider>
  );
};

export const TaskCardDisabledWithCustomDescription = () => {
  return (
    <IntlProvider locale="en">
      <TaskCard
        taskName="Projects"
        selections={[]}
        noSelectionDescription="You haven't selected any projects"
        onSelect={() => undefined}
        onSkip={() => undefined}
        shouldAllowSkip={true}
        isDisabled={true}
        disabledDescription="This is disabled because of reasons"
        isLoading={false}
        isSelectLoading={false}
        isSkipLoading={false}
      />
    </IntlProvider>
  );
};

export const TaskCardCannotSkip = () => {
  return (
    <IntlProvider locale="en">
      <TaskCard
        taskName="Projects"
        selections={[]}
        noSelectionDescription="You haven't selected any projects"
        onSelect={() => undefined}
        onSkip={() => undefined}
        shouldAllowSkip={false}
        isDisabled={false}
        disabledDescription="This is disabled because of reasons"
        isLoading={false}
        isSelectLoading={false}
        isSkipLoading={false}
      />
    </IntlProvider>
  );
};

export const TaskCardCustomSkipText = () => {
  return (
    <IntlProvider locale="en">
      <TaskCard
        taskName="Projects"
        selections={[]}
        noSelectionDescription="You haven't selected any projects"
        onSelect={() => undefined}
        onSkip={() => undefined}
        shouldAllowSkip={true}
        isDisabled={false}
        disabledDescription="This is disabled because of reasons"
        isLoading={false}
        isSelectLoading={false}
        isSkipLoading={false}
        skipButtonText="Custom skip button text"
      />
    </IntlProvider>
  );
};

export const TaskCardError: FC<{
  onFixError?: () => void;
}> = ({ onFixError = () => {} }) => {
  return (
    <IntlProvider locale="en">
      <TaskCard
        taskName="Thing"
        selections={[{ title: 'title1', description: 'description1' }]}
        noSelectionDescription="You haven't selected any projects"
        onSelect={() => undefined}
        onSkip={() => undefined}
        shouldAllowSkip={false}
        isDisabled={false}
        disabledDescription="This is disabled because of reasons"
        isLoading={false}
        isSelectLoading={false}
        isSkipLoading={false}
        fixErrorButtonText="Fix me"
        isError={true}
        onFixError={onFixError}
      />
    </IntlProvider>
  );
};

export const TaskCardErrorIsDisabled: FC<{
  onFixError?: () => void;
}> = ({ onFixError = () => {} }) => {
  return (
    <IntlProvider locale="en">
      <TaskCard
        taskName="Thing"
        selections={[{ title: 'title1', description: 'description1' }]}
        noSelectionDescription="You haven't selected any projects"
        onSelect={() => undefined}
        onSkip={() => undefined}
        shouldAllowSkip={false}
        isDisabled={true}
        disabledDescription="This is disabled because of reasons"
        isLoading={false}
        isSelectLoading={false}
        isSkipLoading={false}
        fixErrorButtonText="Fix me"
        isError={true}
        onFixError={onFixError}
      />
    </IntlProvider>
  );
};

export const TaskCardDisabledWithSelections = () => {
  return (
    <IntlProvider locale="en">
      <TaskCard
        taskName="Projects"
        selections={[
          { title: 'title1', description: 'description1' },
          { title: 'title2', description: 'description2' },
        ]}
        noSelectionDescription="You haven't selected any projects"
        onSelect={() => undefined}
        onSkip={() => undefined}
        shouldAllowSkip={true}
        isDisabled={true}
        disabledDescription="Some reason for this to be disabled"
        isLoading={false}
        isSelectLoading={false}
        isSkipLoading={false}
      />
    </IntlProvider>
  );
};
