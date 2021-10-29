import React, { useCallback, useState } from 'react';

import debounce from 'debounce-promise';
import { FormattedHTMLMessage } from 'react-intl';

import { ErrorMessage, FieldProps } from '@atlaskit/form';
import { AsyncCreatableSelect, components, OptionType } from '@atlaskit/select';
import type { OptionProps, SingleValueProps } from '@atlaskit/select/types';
import { Card } from '@atlaskit/smart-card';
import {
  MAX_COMPASS_LINK_URL_LENGTH,
  SearchJiraProjectsDocument,
  SearchJiraProjectsQuery,
  SearchJiraProjectsQueryVariables,
  useImperativeQuery,
} from '@atlassian/dragonfruit-graphql';
import { useTenantInfo } from '@atlassian/dragonfruit-tenant-context';
import {
  openInNewTab,
  useIntl,
  validateUrl,
} from '@atlassian/dragonfruit-utils';

import messages from './messages';
import { SmartLinkWrapper } from './styled';

const DEBOUNCE_TIMER = 300;

const formatCreateLabel = (inputValue: string) => {
  return (
    <FormattedHTMLMessage
      {...messages.addProjectsLabel}
      values={{
        projectName: inputValue,
      }}
    />
  );
};

interface ProjectsFieldOption extends OptionType {
  icon: string;
}

export const ProjectsField = (
  props: FieldProps<ProjectsFieldOption | null>,
) => {
  const { id, ...rest } = props;

  const [searchError, setSearchError] = useState<boolean>(false);
  const [validationError, setValidationError] = useState<string | undefined>(
    undefined,
  );

  const { cloudId } = useTenantInfo();
  const { formatMessage } = useIntl();

  const search = useImperativeQuery<
    SearchJiraProjectsQuery,
    SearchJiraProjectsQueryVariables
  >(SearchJiraProjectsDocument, { fetchPolicy: 'network-only' });

  const searchProjects = useCallback(
    async (inputValue: string): Promise<OptionType[]> => {
      setSearchError(false);

      return search({
        cloudId,
        filter: {
          keyword: inputValue,
        },
      })
        .then(({ data }) => {
          const allJiraProjects = data?.jira?.allJiraProjects;
          if (allJiraProjects?.__typename !== 'JiraProjectConnection') {
            throw Error('Error parsing Jira projects');
          }

          const nodes =
            allJiraProjects?.edges
              ?.filter((edge) => !!edge)
              .map((edge) => edge!.node) ?? [];

          return nodes.map((node) => ({
            label: node!.name,
            value: `${window.location.origin}/browse/${node!.key}`,
            icon: node!.avatar?.xsmall ?? undefined,
          }));
        })
        .catch(() => {
          setSearchError(true);
          return [];
        });
    },
    [cloudId, search],
  );

  const debouncedSearchProjects = debounce(
    (searchProjectsFn: () => Promise<OptionType[]>) => searchProjectsFn(),
    DEBOUNCE_TIMER,
    {
      leading: true,
    },
  );

  const validateUserInput = useCallback(
    (inputValue: string) => {
      const hasUserInput = inputValue.length > 0;

      // if user has not entered an input - don't show create button
      if (!hasUserInput) {
        return false;
      }

      const isLabelNameTooLong =
        inputValue.length > MAX_COMPASS_LINK_URL_LENGTH;
      if (isLabelNameTooLong) {
        setValidationError(formatMessage(messages.projectLengthTooLongError));
        return false;
      }

      setValidationError(undefined);
      return true;
    },
    [formatMessage, setValidationError],
  );

  // Render options in project search dropdown.
  const GetOption = (props: OptionProps<ProjectsFieldOption>) => {
    if (!props.data.icon && props.options.length !== 1) {
      return <components.Option {...props} />;
    }

    const data = {
      name: props.data.label,
      url: props.data.value,
      generator: {
        '@id': 'Compass',
        name: 'CompassLink',
        text: 'Link',
        icon: props.data.icon,
      },
    };

    return (
      <components.Option {...props}>
        <SmartLinkWrapper>
          <Card
            onClick={(event) => {
              event.preventDefault();
              props.selectOption(props.data);
            }}
            platform="web"
            appearance="inline"
            data={data}
          />
        </SmartLinkWrapper>
      </components.Option>
    );
  };

  const GetNoOptionsMessage = (props: any) => {
    let message: string;

    if (searchError) {
      message = formatMessage(messages.projectSearchFailedError);
    } else {
      message = formatMessage(messages.projectSearchEmptyInput);
    }

    return (
      <components.NoOptionsMessage {...props}>
        {message}
      </components.NoOptionsMessage>
    );
  };

  // Render selected project option.
  const GetSingleValue = (props: SingleValueProps<ProjectsFieldOption>) => {
    let url = props.data.value.toString();

    // If the user puts an invalid URL in, append https:// to the input.
    // This ensures the link will open to the absolute path and not
    // the relative path.
    if (!validateUrl(url)) {
      url = `https://${url}`;
    }

    const data = {
      name: props.data.label,
      url,
      generator: {
        '@id': 'Compass',
        name: 'CompassLink',
        text: 'Link',
        icon: props.data.icon,
      },
    };
    return (
      <SmartLinkWrapper>
        <Card
          onClick={(event) => {
            event.preventDefault();
            openInNewTab(url);
          }}
          platform="web"
          appearance="inline"
          data={data}
        />
      </SmartLinkWrapper>
    );
  };

  const loadOptions = useCallback(
    (inputValue: string) =>
      debouncedSearchProjects(() => searchProjects(inputValue)),
    [debouncedSearchProjects, searchProjects],
  );

  return (
    <>
      <AsyncCreatableSelect
        {...rest}
        autoFocus
        inputId={id}
        placeholder={formatMessage(messages.projectSelectPlaceholder)}
        loadOptions={loadOptions}
        isMulti={false}
        isClearable={true}
        defaultOptions={true}
        backspaceRemovesValue={true}
        allowCreateWhileLoading={false}
        formatCreateLabel={formatCreateLabel}
        isValidNewOption={validateUserInput}
        components={{
          ClearIndicator: () => null, // hide clear all indicator
          DropdownIndicator: () => null, // hide dropdown indicator
          Option: GetOption,
          NoOptionsMessage: GetNoOptionsMessage,
          SingleValue: GetSingleValue,
        }}
        menuIsOpen={validationError ? false : undefined}
      />
      {validationError && <ErrorMessage>{validationError}</ErrorMessage>}
    </>
  );
};
