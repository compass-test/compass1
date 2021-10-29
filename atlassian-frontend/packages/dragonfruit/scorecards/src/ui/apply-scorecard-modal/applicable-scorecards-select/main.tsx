import React, { useState } from 'react';

import {
  AsyncSelect,
  components,
  SelectComponentsConfig,
} from '@atlaskit/select';
import { useIntl } from '@atlassian/dragonfruit-utils';

import { InlineErrorMessage } from '../../../common/ui/inline-error-message';
import { ScorecardOption } from '../../../common/ui/types';
import { useGetComponentApplicableScorecards } from '../../../services/get-component-applicable-scorecards';

import messages from './messages';
import { ScorecardItem, ScorecardLoadingItem } from './scorecard-item';
import { LoadingItemWrapper } from './styled';
import { ApplicableScorecardsSelectProps } from './types';

type ComponentProps = SelectComponentsConfig<ScorecardOption>;
type Option = NonNullable<ComponentProps['Option']>;
type LoadingMessage = NonNullable<ComponentProps['LoadingMessage']>;

const Option: Option = (props) => {
  const option: ScorecardOption = props.data;

  return (
    <components.Option {...props}>
      <ScorecardItem option={option} />
    </components.Option>
  );
};

const LoadingMessage: LoadingMessage = (props) => {
  return (
    <div>
      {Array.from({ length: 10 }, (_, k) => (
        <LoadingItemWrapper key={k}>
          <ScorecardLoadingItem />
        </LoadingItemWrapper>
      ))}
    </div>
  );
};

export const ApplicableScorecardsSelect = (
  props: ApplicableScorecardsSelectProps,
) => {
  const [selectedOption, setSelectedOption] = useState<
    ScorecardOption | null | undefined
  >(null);

  const [, setError] = useState(undefined);

  const { formatMessage } = useIntl();

  const defaultTestId =
    'dragonfruit-scorecards.ui.apply-scorecard-modal.applicable-scorecards-select';
  const {
    componentId,
    onChange,
    inlineErrorMessage = null,
    testId = defaultTestId,
    clearError = () => {},
    ...forwardProps
  } = props;

  const { search } = useGetComponentApplicableScorecards(componentId);

  const loadOptions = (inputValue: string) =>
    search(inputValue)
      .then((options) => {
        return options;
      })
      .catch((error) => {
        // For now, we aren't handling this error once it's set and render our normal empty state message instead
        // If we ultimately decide to handle this in the error boundary, we can throw the error here
        setError(error);
      });

  const onOptionChange = (selectedOption: ScorecardOption) => {
    setSelectedOption(selectedOption);
    clearError();
    if (onChange) {
      onChange(selectedOption);
    }
  };

  return (
    <div data-testid={testId}>
      <AsyncSelect<ScorecardOption>
        {...forwardProps}
        components={{
          Option,
          LoadingMessage,
        }}
        placeholder={formatMessage(
          messages.applicableScorecardsSelectPlaceholder,
        )}
        // Since we currently only filter our data client-side,
        // we want to cache the data once it is loaded from the backend
        cacheOptions
        defaultOptions
        isSearchable
        onChange={(newValue) => {
          onOptionChange(newValue as ScorecardOption);
        }}
        value={selectedOption}
        loadOptions={loadOptions}
        onInputChange={loadOptions}
        classNamePrefix="applicable-scorecards-select"
        noOptionsMessage={() => formatMessage(messages.noScorecardsMessage)}
        menuPosition={'fixed'}
        validationState={inlineErrorMessage ? 'error' : 'default'}
      />
      {inlineErrorMessage && (
        <InlineErrorMessage testId={testId} message={inlineErrorMessage} />
      )}
    </div>
  );
};
