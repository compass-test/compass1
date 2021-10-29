import React, { useCallback, useState } from 'react';

import debounce from 'debounce-promise';
import { FormattedHTMLMessage } from 'react-intl';

import { useAnalyticsEvents } from '@atlaskit/analytics-next';
import { ErrorMessage } from '@atlaskit/form';
import {
  ActionMeta,
  AsyncCreatableSelect,
  components,
  OptionType,
  ValueType,
} from '@atlaskit/select';
import Tag from '@atlaskit/tag';
import { fireUIAnalytics } from '@atlassian/analytics-bridge';
import { useErrorAnalytics } from '@atlassian/dragonfruit-analytics';
import {
  AddComponentLabelsHandledErrors,
  checkCompassMutationSuccess,
  CompassComponent,
  CompassMutationError,
  MAX_COMPONENT_LABEL_NAME_LENGTH,
  MAX_COMPONENT_LABELS_PER_COMPONENT,
  SearchComponentLabelsDocument,
  SearchComponentLabelsQuery,
  SearchComponentLabelsQueryVariables,
  useAddComponentLabels,
  useImperativeQuery,
  useRemoveComponentLabels,
} from '@atlassian/dragonfruit-graphql';
import { useTenantInfo } from '@atlassian/dragonfruit-tenant-context';
import { useIntl } from '@atlassian/dragonfruit-utils';

import { ANALYTICS_PACKAGE_NAME } from '../../../../../../common/constants';
import { CompassComponentLabelForUI } from '../../../../../../common/types';
import { getTagColor } from '../../../../../../common/utils/labels';

import { useLabelMutationErrorFlags } from './error-flags';
import messages from './messages';
import { DropdownSeparator } from './styled';

const DEBOUNCE_TIMER = 300;

// Query first 15 labels so we always show 5 results if up to 10 labels are filtered out by the picker
const SEARCH_LABELS_QUERY_FIRST = 15;

type Props = {
  componentId: CompassComponent['id'];
  labels: Array<CompassComponentLabelForUI>;
};

// TODO: Remove COMPONENT_LABEL_ALREADY_ADDED error which is not used in the NewComponentLabelsEditor
type ValidationErrors =
  | 'COMPONENT_LABEL_ALREADY_ADDED'
  | AddComponentLabelsHandledErrors.COMPONENT_LABEL_LIMIT_REACHED
  | AddComponentLabelsHandledErrors.COMPONENT_LABEL_NAME_TOO_LONG
  | null;

const convertToValidLabel = (label: string): string => {
  return label.replace(/\s+/g, '-').toLocaleLowerCase();
};

const formatCreateLabel = (inputValue: string) => {
  return (
    <FormattedHTMLMessage
      {...messages.addLabelSelectFormat}
      values={{
        labelName: convertToValidLabel(inputValue),
      }}
    />
  );
};

const debouncedSearchLabels = debounce(
  (searchLabelsFunction: () => Promise<OptionType[]>) => searchLabelsFunction(),
  DEBOUNCE_TIMER,
  {
    leading: true,
  },
);

export const ComponentLabelsEditor = (props: Props) => {
  const { componentId, labels } = props;

  const { formatMessage } = useIntl();
  const { createAnalyticsEvent } = useAnalyticsEvents();
  const { fireCompassMutationErrorAnalytics } = useErrorAnalytics();
  const [handleLabelAddMutation] = useAddComponentLabels();
  const [handleLabelRemoveMutation] = useRemoveComponentLabels();
  const {
    handleAddLabelError,
    showGenericAddLabelErrorFlag,
    handleRemoveLabelError,
    showGenericRemoveLabelErrorFlag,
  } = useLabelMutationErrorFlags();
  const { cloudId } = useTenantInfo();

  const [hasUserInput, setHasUserInput] = useState<boolean>(false);
  const [searchError, setSearchError] = useState<boolean>(false);
  const [validationError, setValidationError] = useState<ValidationErrors>(
    null,
  );
  const [transformedInput, setTransformedInput] = useState<string>();

  const isLabelsLimitReached =
    labels.length >= MAX_COMPONENT_LABELS_PER_COMPONENT;

  const values: OptionType[] = labels.map((componentLabel) => {
    return {
      label: componentLabel.name,
      value: componentLabel.name,
    };
  });

  const search = useImperativeQuery<
    SearchComponentLabelsQuery,
    SearchComponentLabelsQueryVariables
  >(SearchComponentLabelsDocument, { fetchPolicy: 'network-only' });

  const searchLabels = async (inputValue: string): Promise<OptionType[]> => {
    const query = inputValue === '' ? null : convertToValidLabel(inputValue);
    setSearchError(false);

    return search({
      cloudId,
      query: {
        query,
        first: SEARCH_LABELS_QUERY_FIRST,
      },
    })
      .then(({ data }) => {
        const searchLabelsData = data?.compass?.searchComponentLabels;

        if (searchLabelsData?.__typename === 'QueryError') {
          throw Error(searchLabelsData.message ?? undefined);
        }

        const nodes =
          searchLabelsData?.__typename ===
            'CompassSearchComponentLabelsConnection' && searchLabelsData.nodes
            ? searchLabelsData.nodes
            : [];

        const labelOptions = nodes.reduce(
          (accumulator: OptionType[], node: any) => {
            if (node.name) {
              const label: OptionType = {
                label: node.name,
                value: node.name,
              };
              accumulator.push(label);
            }
            return accumulator;
          },
          [],
        );

        const filteredLabelOptions = labelOptions
          .filter(
            (labelOption) =>
              !labels.some((label) => label.name === labelOption.value),
          )
          .slice(0, 5);

        return filteredLabelOptions;
      })
      .catch(() => {
        setSearchError(true);
        return [];
      });
  };

  const addLabel = useCallback(
    (labelName: string) => {
      const event = createAnalyticsEvent({
        action: 'submitted',
        actionSubject: 'componentLabels',
      });
      fireUIAnalytics(event);

      return handleLabelAddMutation({
        componentId,
        labelNames: [labelName],
      })
        .then((mutationResult) => {
          checkCompassMutationSuccess(
            mutationResult?.data?.compass?.addComponentLabels,
          );
        })
        .catch((error) => {
          if (error instanceof CompassMutationError) {
            handleAddLabelError(error);
          } else {
            showGenericAddLabelErrorFlag();
            fireCompassMutationErrorAnalytics({
              error,
              componentName: 'ComponentLabelsEditor',
              packageName: ANALYTICS_PACKAGE_NAME,
            });
          }
        });
    },
    [
      createAnalyticsEvent,
      handleLabelAddMutation,
      componentId,
      handleAddLabelError,
      showGenericAddLabelErrorFlag,
      fireCompassMutationErrorAnalytics,
    ],
  );

  const removeLabel = useCallback(
    (labelName: string) => {
      const event = createAnalyticsEvent({
        action: 'clicked',
        actionSubject: 'button',
      });
      fireUIAnalytics(event, 'removeComponentLabel');

      return handleLabelRemoveMutation({
        componentId,
        labelNames: [labelName],
      })
        .then((mutationResult) => {
          checkCompassMutationSuccess(
            mutationResult?.data?.compass?.removeComponentLabels,
          );
        })
        .catch((error) => {
          if (error instanceof CompassMutationError) {
            handleRemoveLabelError(error);
          } else {
            showGenericRemoveLabelErrorFlag();
            fireCompassMutationErrorAnalytics({
              error,
              componentName: 'ComponentLabelsEditor',
              packageName: ANALYTICS_PACKAGE_NAME,
            });
          }
        });
    },
    [
      createAnalyticsEvent,
      handleLabelRemoveMutation,
      componentId,
      handleRemoveLabelError,
      showGenericRemoveLabelErrorFlag,
      fireCompassMutationErrorAnalytics,
    ],
  );

  const handleChange = useCallback(
    (updatedLabelList: ValueType<OptionType, true>, actionMeta: ActionMeta) => {
      switch (actionMeta.action) {
        case 'select-option':
        case 'create-option':
          const labelToAdd =
            updatedLabelList[updatedLabelList.length - 1].label;
          //Clear the input after trying to add,
          // we are not waiting until the mutation is successful to allow customers add a new one right away
          setTransformedInput('');
          return addLabel(labelToAdd);
        case 'remove-value':
          const labelToRemove = actionMeta.removedValue.label;
          return removeLabel(labelToRemove);
        default:
          return;
      }
    },
    [addLabel, removeLabel],
  );

  const GetNoOptionsMessage = (props: any) => {
    const { options } = props;

    let message: string;
    if (searchError) {
      message = formatMessage(messages.editorSearchFailedError);
    } else if (hasUserInput && options.length === 0) {
      message = formatMessage(messages.editorNoResultsFound);
    } else {
      message = formatMessage(messages.editorEmptyInput);
    }

    return (
      <components.NoOptionsMessage {...props}>
        {message}
      </components.NoOptionsMessage>
    );
  };

  const MultiValueOverride = (props: any) => {
    return (
      <Tag
        color={getTagColor(props.data.value)}
        text={props.data.value}
        isRemovable={true}
        // Reuse the function that is called when the remove button is called
        onBeforeRemoveAction={props.removeProps.onClick}
      />
    );
  };

  const GetOption = (props: any) => {
    if (props.data.__isNew__ && props.options.length !== 1) {
      return (
        <>
          <DropdownSeparator />
          <components.Option {...props} />
        </>
      );
    }
    return <components.Option {...props} />;
  };

  const convertToErrorMessage = (error: ValidationErrors) => {
    switch (error) {
      case AddComponentLabelsHandledErrors.COMPONENT_LABEL_LIMIT_REACHED:
        return formatMessage(messages.editorLimitReached, {
          labelLimit: MAX_COMPONENT_LABELS_PER_COMPONENT,
        });
      case AddComponentLabelsHandledErrors.COMPONENT_LABEL_NAME_TOO_LONG:
        return formatMessage(messages.editorLabelMaxLengthReached, {
          characterLimit: MAX_COMPONENT_LABEL_NAME_LENGTH,
        });
      default:
        return formatMessage(messages.editorUnknownError);
    }
  };

  const handleInputChange = useCallback(
    (inputValue: string, actionMeta) => {
      switch (actionMeta.action) {
        case 'input-change':
          setTransformedInput(convertToValidLabel(inputValue));
          return;
      }
    },
    [setTransformedInput],
  );

  const validateUserInput = useCallback(
    (
      inputValue: string,
      selectValue: Array<OptionType>,
      selectOptions: Array<OptionType>,
      //accessors: any,
    ) => {
      const hasUserInput = inputValue.length > 0;
      setHasUserInput(hasUserInput);

      // if user has not entered an input - don't show create button
      if (!hasUserInput) {
        return false;
      }

      // inputted label already exists - don't show create button
      const inputIsAlreadyAdded = selectValue.some(
        (option) => inputValue === option.value,
      );
      if (inputIsAlreadyAdded) {
        return false;
      }

      // inputted label is already shown in the search results - don't show the create button
      const inputInSearchResults = selectOptions.some(
        (option) => option.value === inputValue,
      );
      if (inputInSearchResults) {
        return false;
      }

      // labels limit reached - throw validation error
      if (hasUserInput && isLabelsLimitReached) {
        setValidationError(
          AddComponentLabelsHandledErrors.COMPONENT_LABEL_LIMIT_REACHED,
        );
        return false;
      }

      // label name is too long - throw validation error
      const isLabelNameTooLong =
        inputValue.length > MAX_COMPONENT_LABEL_NAME_LENGTH;
      if (isLabelNameTooLong) {
        setValidationError(
          AddComponentLabelsHandledErrors.COMPONENT_LABEL_NAME_TOO_LONG,
        );
        return false;
      }

      setValidationError(null);
      return true;
    },
    [isLabelsLimitReached, setValidationError],
  );

  return (
    <>
      <AsyncCreatableSelect
        classNamePrefix="labels_editor"
        inputId="labels_editor_input"
        isMulti
        autoFocus
        placeholder={formatMessage(messages.addLabelsPlaceholder)}
        inputValue={transformedInput}
        onInputChange={handleInputChange}
        value={values}
        menuPlacement={'auto'}
        isClearable={false}
        //Avoid deleting labels by "mistake" when pressing backspace to delete your input
        backspaceRemovesValue={false}
        formatCreateLabel={formatCreateLabel}
        isValidNewOption={validateUserInput}
        validationState={!!validationError ? 'error' : 'default'}
        components={{
          // Remove the arrow in the select
          DropdownIndicator: () => null,
          NoOptionsMessage: (props: any) => GetNoOptionsMessage(props),
          MultiValue: (props: any) => MultiValueOverride(props),
          Option: (props: any) => GetOption(props),
        }}
        onChange={handleChange}
        loadOptions={
          !!validationError
            ? undefined
            : (inputValue: string) =>
                debouncedSearchLabels(() => searchLabels(inputValue))
        }
        defaultOptions={true}
        defaultMenuIsOpen={!isLabelsLimitReached}
        menuIsOpen={
          !!validationError || isLabelsLimitReached ? false : undefined
        }
        allowCreateWhileLoading={true}
      />
      {validationError && (
        <ErrorMessage>{convertToErrorMessage(validationError)}</ErrorMessage>
      )}
    </>
  );
};
