import React, { useCallback } from 'react';

import { graphql, useFragment } from 'react-relay';

import Button, { ButtonGroup } from '@atlaskit/button';
import Form from '@atlaskit/form';
import AKModal, {
  ModalTransition as AKModalTransition,
  ModalBody,
  ModalFooter,
  ModalHeader,
  ModalTitle,
} from '@atlaskit/modal-dialog';
import { Loading } from '@atlassian/performance-portal-common';

import { MetricFormData } from '../../types';

import type { metricEditorModalFragment$key } from './__generated__/metricEditorModalFragment.graphql';
import { MetricEditorFields } from './metric-editor-fields';
import { StyledFooter } from './styled';

export interface MetricModalProps {
  isOpen: boolean;
  closeModalHandler: () => void;
  data: metricEditorModalFragment$key | null;
  onSubmit: (formData: MetricFormData) => void | Promise<void>;
  isSaving: boolean;
}

const MODAL_HEADER_TITLE = 'Metric Editor';

export const MetricEditorModal = (props: MetricModalProps) => {
  const { isOpen, closeModalHandler, onSubmit } = props;

  const data = useFragment(
    graphql`
      fragment metricEditorModalFragment on Metric {
        ...metricEditorFieldsFragment
      }
    `,
    props.data,
  );

  const onFormSubmit = useCallback(
    async (formData: MetricFormData) => {
      await onSubmit(formData);
    },
    [onSubmit],
  );

  const submitBtnLabel = !data ? 'Create' : 'Update';

  return (
    <AKModalTransition>
      {isOpen && (
        <AKModal>
          <Form onSubmit={onFormSubmit}>
            {({ formProps }) => (
              <form {...formProps}>
                <ModalHeader>
                  <ModalTitle>{MODAL_HEADER_TITLE}</ModalTitle>
                </ModalHeader>

                <ModalBody>
                  <MetricEditorFields data={data} />
                </ModalBody>
                <ModalFooter>
                  <StyledFooter>
                    <ButtonGroup>
                      <Button
                        appearance="primary"
                        type="submit"
                        isDisabled={props.isSaving}
                      >
                        {submitBtnLabel}
                      </Button>
                      <Button
                        appearance="subtle"
                        onClick={closeModalHandler}
                        isDisabled={props.isSaving}
                      >
                        Close
                      </Button>
                    </ButtonGroup>
                  </StyledFooter>
                </ModalFooter>
              </form>
            )}
          </Form>
        </AKModal>
      )}
    </AKModalTransition>
  );
};

export const MetricEditorModalLoading = () => {
  return (
    <AKModalTransition>
      <AKModal>
        <ModalHeader>
          <ModalTitle>{MODAL_HEADER_TITLE}</ModalTitle>
        </ModalHeader>
        <ModalBody>
          <Loading />
        </ModalBody>
      </AKModal>
    </AKModalTransition>
  );
};
