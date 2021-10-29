import React from 'react';

import { graphql, useLazyLoadQuery } from 'react-relay';

import Button, { ButtonGroup } from '@atlaskit/button';
import Form, { Field } from '@atlaskit/form';
import AKModal, {
  ModalTransition as AKModalTransition,
  ModalBody,
  ModalHeader,
  ModalTitle,
} from '@atlaskit/modal-dialog';
import Spinner from '@atlaskit/spinner';
import TextField from '@atlaskit/textfield';
import { SendScreenEvent } from '@atlassian/performance-portal-analytics';
import { Loading } from '@atlassian/performance-portal-common';

import { isSupportedEventType } from '../common/utils/threshold-item-default-value';
import { useFormSubmit } from '../utils/use-form-submit';

import type { mainEditAlertConfigModalQuery } from './__generated__/mainEditAlertConfigModalQuery.graphql';
import { Container, StyledFooter } from './styled';
import { ThresholdSection } from './thresholds-section';

export interface Props {
  metricId: string;
  isOpen: boolean;
  closeModalHandler: () => void | Promise<void>;
}

const MODAL_HEADING_TITLE = 'Alert Config';

export const EditAlertConfigModal = ({
  metricId,
  isOpen,
  closeModalHandler,
}: Props) => {
  // eslint-disable-next-line relay/generated-flow-types
  const data = useLazyLoadQuery<mainEditAlertConfigModalQuery>(
    graphql`
      query mainEditAlertConfigModalQuery($id: ID!) {
        metric(id: $id) {
          opsgenieTeamId
          ... on BrowserMetric {
            eventType
          }
          ...thresholdsSectionFragment
        }
      }
    `,
    { id: metricId },
    { fetchPolicy: 'network-only', networkCacheConfig: { force: true } },
  );

  if (!data.metric) {
    throw new Error(
      `Unexpected condition metric data is null for metricId ${metricId}`,
    );
  }

  const metricData = data.metric;
  const eventType = data.metric.eventType;
  if (!isSupportedEventType(eventType)) {
    throw new Error(`unexpected eventType ${eventType}`);
  }

  const { isSaving, onFormSubmit } = useFormSubmit(
    metricId,
    eventType,
    closeModalHandler,
  );

  return (
    <AKModalTransition>
      {isOpen && (
        <AKModal width="auto">
          <ModalHeader>
            <ModalTitle>{MODAL_HEADING_TITLE}</ModalTitle>
          </ModalHeader>

          <ModalBody>
            <Container>
              <Form onSubmit={onFormSubmit}>
                {({ formProps, setFieldValue }) => (
                  <form {...formProps}>
                    <Field
                      name="opsgenieTeamId"
                      label="Opsgenie Team Id"
                      defaultValue={metricData.opsgenieTeamId ?? undefined}
                      isRequired
                    >
                      {({ fieldProps }) => <TextField {...fieldProps} />}
                    </Field>
                    <ThresholdSection
                      data={metricData}
                      setFieldValue={setFieldValue}
                    />

                    <StyledFooter>
                      <ButtonGroup>
                        <Button
                          appearance="primary"
                          type="submit"
                          isDisabled={isSaving}
                          iconBefore={
                            isSaving ? <Spinner size="small" /> : undefined
                          }
                        >
                          Save
                        </Button>
                        <Button onClick={closeModalHandler}>Close</Button>
                      </ButtonGroup>
                    </StyledFooter>
                  </form>
                )}
              </Form>
              <SendScreenEvent name="metricAlertsConfig" />
            </Container>
          </ModalBody>
        </AKModal>
      )}
    </AKModalTransition>
  );
};

export const EditAlertConfigModalLoading = () => {
  return (
    <AKModalTransition>
      <AKModal width="auto">
        <ModalHeader>
          <ModalTitle>{MODAL_HEADING_TITLE}</ModalTitle>
        </ModalHeader>

        <ModalBody>
          <Loading />
        </ModalBody>
      </AKModal>
    </AKModalTransition>
  );
};
