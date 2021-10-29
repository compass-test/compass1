import React, { useMemo } from 'react';

import Button from '@atlaskit/button/custom-theme-button';
import SectionMessage from '@atlaskit/section-message';

import { DOCS_CUSTOM_PIPELINE_URL, YML_FILE_NAME } from '../const';

const WarningMessageData = [
  {
    key: '',
    text: ({ errorMessage }: any) => errorMessage,
  },
  {
    key: 'plan-service.parse.missing-section',
    text: ({ parentElement, element }: any) => (
      <>
        The {parentElement} section in your <strong>{YML_FILE_NAME}</strong>{' '}
        file is missing a {element}. Add the missing {element} to get this
        working.
      </>
    ),
  },
  {
    key: 'plan-service.parse.missing-string-specific',
    text: ({ parentElement, element }: any) => (
      <>
        The {element} in the {parentElement} section of your{' '}
        <strong>{YML_FILE_NAME}</strong> file is missing a string. Add the
        missing string to to get this working.
      </>
    ),
  },
  {
    key: 'plan-service.parse.invalid-list',
    text: ({ element }: any) => (
      <>
        The {element} section in your <strong>{YML_FILE_NAME}</strong> file must
        be a list.
        <br />
        Check out our documentation on how to format the {element} section.
      </>
    ),
  },
  {
    key: 'plan-service.parse.invalid-map',
    text: ({ element }: any) => (
      <>
        The {element} section in your <strong>{YML_FILE_NAME}</strong> file must
        be a map.
        <br />
        Check out our documentation on how to format the {element} section.
      </>
    ),
  },
  {
    key: 'plan-service.parse.invalid-image-name',
    text: ({ element }: any) => (
      <>
        We don't recognise the image name {element} in your{' '}
        <strong>{YML_FILE_NAME}</strong> file. Correct the name to get this
        working.
      </>
    ),
  },
  {
    key: 'plan-service.parse.parse-error',
    text: () => (
      <>
        Something is misconfigured in your <strong>{YML_FILE_NAME}</strong>{' '}
        file. View it in our editor to find out where.
      </>
    ),
  },
  {
    key: 'plan-service.parse.parse-indentation-error',
    text: () => (
      <>
        The indentation in the <strong>{YML_FILE_NAME}</strong> file is
        incorrect. Correct the spacing and remove any tabs.
      </>
    ),
  },
  {
    key: 'agent.build.time-limit-exceeded',
    text: () => (
      <>
        The build stopped because one or more steps reached the timeout limit of
        two hours.
      </>
    ),
  },
  {
    key: 'agent-service.account-concurrency.reached',
    text: () => (
      <>
        Seems like you're running a lot of pipelines at the same time. This is
        usually due to an accidental push. To conserve your minutes, we won't
        run them all.
      </>
    ),
  },
  {
    key: 'pipeline-error',
    text: () => <>Unable to retrieve Pipeline.</>,
  },
];

export type Props = {
  isPipelinesDisabled?: boolean;
  isRepoReadOnly?: boolean;
  isOverAllowance?: boolean;
  isMissingPipelineDefinition?: boolean;
  error?: any;
  plansPageUrl: string;
  settingsPageUrl: string;
};

const RunPipelineMessage: React.FC<Props> = ({
  isPipelinesDisabled,
  isRepoReadOnly,
  isOverAllowance,
  isMissingPipelineDefinition,
  error,
  plansPageUrl,
  settingsPageUrl,
}) => {
  const warningMessage = useMemo(
    () =>
      error
        ? WarningMessageData.filter((l) => l.key === error.key)[0] ||
          WarningMessageData[0]
        : WarningMessageData[0],
    [error],
  );

  if (isPipelinesDisabled) {
    return (
      <SectionMessage appearance="warning">
        <p>
          Pipelines is currently <strong>disabled</strong> for this repository.
          Repository administrators can enable Pipelines in repository{' '}
          <Button
            href={settingsPageUrl}
            appearance="link"
            target="_top"
            spacing="none"
          >
            Settings → Pipelines
          </Button>
          .
        </p>
      </SectionMessage>
    );
  }

  if (isRepoReadOnly) {
    return (
      <SectionMessage appearance="warning">
        <p>
          To run custom pipelines you need <em>write</em> permission that can be
          granted by the repository administrator.
        </p>
      </SectionMessage>
    );
  }

  if (isOverAllowance) {
    return (
      <SectionMessage appearance="warning">
        <p>
          Your account has run out of build minutes. Upgrade your current plan
          or purchase more build minutes to continue running pipelines.{' '}
          <Button
            href={plansPageUrl}
            appearance="link"
            target="_top"
            spacing="none"
          >
            View plan details
          </Button>
        </p>
      </SectionMessage>
    );
  }

  if (isMissingPipelineDefinition) {
    return (
      <SectionMessage title="No Pipeline">
        <p>
          You can add a pipeline in your {YML_FILE_NAME} file to manually
          trigger it from this dialog.{' '}
          <Button
            href={DOCS_CUSTOM_PIPELINE_URL}
            spacing="none"
            appearance="link"
            target="_blank"
          >
            Find out more
          </Button>
        </p>
      </SectionMessage>
    );
  }

  if (error) {
    return (
      <SectionMessage appearance="warning">
        <p>
          {warningMessage.text({
            errorMessage: error.message,
            element: error.arguments ? error.arguments.element : '',
            parentElement: error.arguments
              ? error.arguments.parent_element
              : '',
          })}{' '}
          <Button
            href={DOCS_CUSTOM_PIPELINE_URL}
            spacing="none"
            appearance="link"
            target="_blank"
          >
            Find out more
          </Button>
        </p>
      </SectionMessage>
    );
  }

  return (
    <SectionMessage appearance="warning">
      <p>An unidentified error occurred. Please try again.</p>
    </SectionMessage>
  );
};

export default RunPipelineMessage;
