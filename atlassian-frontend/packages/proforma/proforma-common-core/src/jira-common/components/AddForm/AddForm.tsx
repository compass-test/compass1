import React from 'react';

import { FormattedMessage, injectIntl } from 'react-intl';
import styled from 'styled-components';

import Button, { ButtonGroup } from '@atlaskit/button';
// eslint-disable-next-line no-restricted-imports
import { Label } from '@atlaskit/field-base';
import Select from '@atlaskit/select';
import { ValueType } from '@atlaskit/select/types';
import Spinner from '@atlaskit/spinner';
import { N40 } from '@atlaskit/theme/colors';

import { RenderForm } from '../../../form-system/components/RenderForm';
import { FormStore } from '../../../form-system/stores/FormStore';
import { withIntlProvider } from '../../../intl-provider';
import { AvailableForm, AvailableForms } from '../../apis/FormApi';
import { CommonMessage, IntlCommonMessages } from '../../CommonMessages.intl';

import { AddFormActions } from './AddFormActions';
import { AddFormMessage, IntlAddFormMessages } from './AddFormMessages.intl';

interface AddFormProps {
  actions: AddFormActions;
  loadingAvailableForms: boolean;
  availableForms?: AvailableForms;
  loadingFormPreview: boolean;
  previewTemplateFormId?: number;
  formStore?: FormStore;
}

export const AddForm = withIntlProvider<AddFormProps>(
  injectIntl(
    ({
      actions,
      loadingAvailableForms,
      availableForms,
      loadingFormPreview,
      previewTemplateFormId,
      formStore,
      intl,
    }) => {
      const addFormDropdown = React.createRef<any>();

      const buildSelectOptions = (
        availableForms: AvailableForms,
      ):
        | { label: JSX.Element; options: AvailableForm[] }[]
        | AvailableForm[] => {
        if (
          availableForms.recommended.length > 0 &&
          availableForms.available.length > 0
        ) {
          return [
            {
              label: (
                <FormattedMessage
                  {...IntlAddFormMessages[
                    AddFormMessage.AddFormSelectGroupRecommended
                  ]}
                />
              ),
              options: availableForms.recommended,
            },
            {
              label: (
                <FormattedMessage
                  {...IntlAddFormMessages[
                    AddFormMessage.AddFormSelectGroupOther
                  ]}
                />
              ),
              options: availableForms.available,
            },
          ];
        }
        if (availableForms.recommended.length > 0) {
          return availableForms.recommended;
        }
        if (availableForms.available.length > 0) {
          return availableForms.available;
        }
        return [];
      };

      return (
        <>
          <AddContainerStyles>
            <IssueFormSelectorStyles>
              <Label
                htmlFor="IssueFormSelector"
                label={intl.formatMessage(
                  IntlAddFormMessages[AddFormMessage.AddFormTitle],
                )}
              />
              <Select
                id="IssueFormSelector"
                isLoading={loadingAvailableForms}
                options={
                  availableForms ? buildSelectOptions(availableForms) : []
                }
                onChange={(selectedForm: ValueType<AvailableForm>): void => {
                  if (selectedForm && 'value' in selectedForm) {
                    actions.setPreviewTemplateFormId(selectedForm.value);
                    actions.loadFormPreview(selectedForm.value);
                  }
                }}
                defaultMenuIsOpen={true}
                placeholder={
                  <FormattedMessage
                    {...IntlAddFormMessages[
                      AddFormMessage.AddFormSelectPlaceholder
                    ]}
                  />
                }
                ref={addFormDropdown}
                autoFocus
                classNamePrefix="atlaskit_select_1"
              />
            </IssueFormSelectorStyles>
            <ButtonRow>
              <ButtonGroup>
                <Button
                  appearance="primary"
                  onClick={() => actions.addForm()}
                  isDisabled={previewTemplateFormId === undefined}
                >
                  <FormattedMessage
                    {...IntlCommonMessages[CommonMessage.Add]}
                  />
                </Button>
                <Button onClick={() => actions.hideAddForm()}>
                  <FormattedMessage
                    {...IntlCommonMessages[CommonMessage.Cancel]}
                  />
                </Button>
              </ButtonGroup>
            </ButtonRow>
          </AddContainerStyles>
          {formStore && !loadingFormPreview ? (
            <RenderForm
              formStore={formStore}
              revisionToken={formStore.revisionToken}
              view
            />
          ) : (
            <FormPreviewWrapperStyles>
              <FormPreviewPlaceholderStyles>
                {loadingFormPreview ? (
                  <Spinner size="xlarge" />
                ) : (
                  <FormattedMessage
                    {...IntlAddFormMessages[
                      AddFormMessage.AddFormPreviewMessage
                    ]}
                  />
                )}
              </FormPreviewPlaceholderStyles>
            </FormPreviewWrapperStyles>
          )}
        </>
      );
    },
  ),
);

// Styles
const AddContainerStyles = styled.div`
  border-radius: 4px;
  border: 1px solid ${N40};
  padding: 8px 15px;
  margin-bottom: 16px;
  margin-right: 1px;
`;

const IssueFormSelectorStyles = styled.div`
  margin: 0 1px 8px 1px;

  & > label > div {
    padding-top: 3px;
  }
`;

const FormPreviewWrapperStyles = styled.div`
  display: flex;
  justify-content: center;
  height: 34.4rem;
  padding: 1.4rem;
  border-radius: 4px;
  border: 1px solid ${N40};
  margin-right: 1px;
  overflow: auto;
`;

const FormPreviewPlaceholderStyles = styled.div`
  display: flex;
  align-items: center;
`;

const ButtonRow = styled.div`
  text-align: right;
  margin: 8px 1px;
`;
