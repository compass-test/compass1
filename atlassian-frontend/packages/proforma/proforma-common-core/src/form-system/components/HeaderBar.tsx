import React from 'react';

import { observer } from 'mobx-react';
import { FormattedMessage } from 'react-intl';
import styled from 'styled-components';

import Button, { ButtonGroup } from '@atlaskit/button';
import LoadingButton from '@atlaskit/button/loading-button';
import DropdownMenu, {
  DropdownItem,
  DropdownItemGroup,
} from '@atlaskit/dropdown-menu';
import EditFilledIcon from '@atlaskit/icon/glyph/edit-filled';
import LockFilledIcon from '@atlaskit/icon/glyph/lock-filled';
import MoreIcon from '@atlaskit/icon/glyph/more';
import { N0 } from '@atlaskit/theme/colors';
import Tooltip from '@atlaskit/tooltip';
import { MessageDescriptor } from '@atlassian/proforma-translations';

import { withIntlProvider } from '../../intl-provider';
import {
  CommonMessage,
  IntlCommonMessages,
} from '../../jira-common/CommonMessages.intl';
import { PermissionLevel } from '../../jira-common/models/PermissionLevel';
import { isNativeApp } from '../../jira-common/utils/native/detectDeviceType';
import { FormStatus } from '../models/Form';
import { FormStore } from '../stores/FormStore';

import {
  HeaderBarMessage,
  IntlHeaderBarMessages,
} from './HeaderBarMessages.intl';
import { ViewMode } from './ViewModeBar';

interface HeaderBarProps {
  formStore: FormStore;
  viewMode: ViewMode;
  showTitle: boolean;
  isPortalView?: boolean;
  isIssueView?: boolean;
  handleViewModeChange: (viewMode: ViewMode) => void;
  handleUpdateVisibility?: (isInternal: boolean) => void;
  handleDownloadPdf?: (formId: number) => void;
  handleDownloadXlsx?: (formId: number, formName: string) => void;
  handleDeleteForm?: () => void;
  handleCancelEdit: () => void;
  handleSubmitForm: () => void;
  handleSaveForm: () => void;
  handleReopenForm?: () => void;
  submittingForm: boolean;
  reopeningForm?: boolean;
  permissions: PermissionLevel;
  showFormVisibility: boolean;
  formVisibilityLoading?: boolean;
  savingAnswers: boolean;
}

export const HeaderBar = withIntlProvider<HeaderBarProps>(
  observer(
    ({
      formStore,
      viewMode,
      showTitle,
      isPortalView,
      isIssueView,
      handleViewModeChange,
      handleUpdateVisibility,
      handleDownloadPdf,
      handleDownloadXlsx,
      handleDeleteForm,
      handleCancelEdit,
      handleSubmitForm,
      handleSaveForm,
      handleReopenForm,
      submittingForm,
      reopeningForm,
      permissions,
      showFormVisibility,
      formVisibilityLoading,
      savingAnswers,
    }) => {
      const { formId } = formStore;

      let deleteTooltipMessage: MessageDescriptor;
      if (formStore.status === FormStatus.Locked) {
        deleteTooltipMessage =
          IntlHeaderBarMessages[HeaderBarMessage.DeleteLockedTooltip];
      } else if (formStore.status === FormStatus.Submitted) {
        deleteTooltipMessage =
          IntlHeaderBarMessages[HeaderBarMessage.DeleteSubmittedTooltip];
      } else {
        deleteTooltipMessage =
          IntlHeaderBarMessages[HeaderBarMessage.DeleteTooltip];
      }

      const showSubmit =
        viewMode === ViewMode.Edit &&
        permissions.submit &&
        (!isPortalView || formStore.portalCanSubmit);
      const headerClassName =
        (formStore?.templateFormId &&
          `proforma-controls-form-${formStore.templateFormId}`) ||
        '';

      return (
        <HeaderBarStyles>
          <FormTitleWrapper>
            {showTitle ? formStore.formName : ''}
          </FormTitleWrapper>
          <FormActions className={headerClassName}>
            {(viewMode === ViewMode.View || viewMode === ViewMode.Full) && (
              <ButtonGroup>
                {handleReopenForm &&
                  ((formStore.status === FormStatus.Submitted &&
                    permissions.reopen) ||
                    (formStore.status === FormStatus.Locked &&
                      permissions.reopen &&
                      permissions.unlock)) && (
                    <LoadingButton
                      className="proforma-reopen"
                      onClick={() => handleReopenForm()}
                      isLoading={reopeningForm}
                      iconBefore={
                        <EditFilledIcon
                          label="Edit icon"
                          secondaryColor="inherit"
                          size="small"
                        />
                      }
                    >
                      <FormattedMessage
                        {...IntlCommonMessages[CommonMessage.Reopen]}
                      />
                    </LoadingButton>
                  )}
                {permissions.save && formStore.status === FormStatus.Open && (
                  <Button
                    className="proforma-edit"
                    appearance="primary"
                    onClick={() => handleViewModeChange(ViewMode.Edit)}
                    iconBefore={
                      <EditFilledIcon
                        label="Edit icon"
                        secondaryColor="inherit"
                        size="small"
                      />
                    }
                  >
                    <FormattedMessage
                      {...IntlCommonMessages[CommonMessage.Edit]}
                    />
                  </Button>
                )}
                {showFormVisibility &&
                  handleUpdateVisibility &&
                  permissions.toggleAccess && (
                    <DropdownMenu
                      testId="proforma-visibility"
                      trigger={
                        formStore.internal ? (
                          <FormattedMessage
                            {...IntlHeaderBarMessages[
                              HeaderBarMessage.VisibilityDropdownInternal
                            ]}
                          />
                        ) : (
                          <FormattedMessage
                            {...IntlHeaderBarMessages[
                              HeaderBarMessage.VisibilityDropdownExternal
                            ]}
                          />
                        )
                      }
                      triggerType="button"
                      triggerButtonProps={{ isLoading: formVisibilityLoading }}
                    >
                      {formStore.internal ? (
                        <DropdownItemGroup>
                          <Tooltip
                            position="bottom"
                            content={
                              <FormattedMessage
                                {...IntlHeaderBarMessages[
                                  HeaderBarMessage
                                    .VisibilityDropdownCurrentlyInternalTooltip
                                ]}
                              />
                            }
                          >
                            <DropdownItem>
                              <DisabledDropdownItemStyles>
                                <FormattedMessage
                                  {...IntlHeaderBarMessages[
                                    HeaderBarMessage
                                      .VisibilityDropdownCurrentlyInternal
                                  ]}
                                />
                              </DisabledDropdownItemStyles>
                            </DropdownItem>
                          </Tooltip>
                          <Tooltip
                            position="bottom"
                            content={
                              <FormattedMessage
                                {...IntlHeaderBarMessages[
                                  HeaderBarMessage
                                    .VisibilityDropdownMakeExternalTooltip
                                ]}
                              />
                            }
                          >
                            <DropdownItem
                              onClick={() => handleUpdateVisibility(false)}
                            >
                              <FormattedMessage
                                {...IntlHeaderBarMessages[
                                  HeaderBarMessage
                                    .VisibilityDropdownMakeExternal
                                ]}
                              />
                            </DropdownItem>
                          </Tooltip>
                        </DropdownItemGroup>
                      ) : (
                        <DropdownItemGroup>
                          <Tooltip
                            position="bottom"
                            content={
                              <FormattedMessage
                                {...IntlHeaderBarMessages[
                                  HeaderBarMessage
                                    .VisibilityDropdownCurrentlyExternalTooltip
                                ]}
                              />
                            }
                          >
                            <DropdownItem>
                              <DisabledDropdownItemStyles>
                                <FormattedMessage
                                  {...IntlHeaderBarMessages[
                                    HeaderBarMessage
                                      .VisibilityDropdownCurrentlyExternal
                                  ]}
                                />
                              </DisabledDropdownItemStyles>
                            </DropdownItem>
                          </Tooltip>
                          <Tooltip
                            position="bottom"
                            content={
                              <FormattedMessage
                                {...IntlHeaderBarMessages[
                                  HeaderBarMessage
                                    .VisibilityDropdownMakeInternalTooltip
                                ]}
                              />
                            }
                          >
                            <DropdownItem
                              onClick={() => handleUpdateVisibility(true)}
                            >
                              <FormattedMessage
                                {...IntlHeaderBarMessages[
                                  HeaderBarMessage
                                    .VisibilityDropdownMakeInternal
                                ]}
                              />
                            </DropdownItem>
                          </Tooltip>
                        </DropdownItemGroup>
                      )}
                    </DropdownMenu>
                  )}
                <DropdownMenu
                  trigger={
                    <Button
                      iconBefore={
                        <MoreIcon
                          label="more icon"
                          secondaryColor="inherit"
                          size="medium"
                        />
                      }
                    />
                  }
                  position="bottom right"
                  shouldFlip
                  boundariesElement="scrollParent"
                >
                  <DropdownItemGroup>
                    {formStore.conditions &&
                      Object.keys(formStore.conditions).length > 0 &&
                      isIssueView && (
                        <React.Fragment>
                          {viewMode === ViewMode.View && (
                            <Tooltip
                              position="left"
                              content={
                                <FormattedMessage
                                  {...IntlHeaderBarMessages[
                                    HeaderBarMessage.FullFormTooltip
                                  ]}
                                />
                              }
                            >
                              <DropdownItem
                                className="proforma-fullform"
                                onClick={() =>
                                  handleViewModeChange(ViewMode.Full)
                                }
                              >
                                <FormattedMessage
                                  {...IntlHeaderBarMessages[
                                    HeaderBarMessage.FullFormBtn
                                  ]}
                                />
                              </DropdownItem>
                            </Tooltip>
                          )}
                          {viewMode === ViewMode.Full && (
                            <Tooltip
                              position="left"
                              content={
                                <FormattedMessage
                                  {...IntlHeaderBarMessages[
                                    HeaderBarMessage.DynamicFormTooltip
                                  ]}
                                />
                              }
                            >
                              <DropdownItem
                                className="proforma-dynamic"
                                onClick={() =>
                                  handleViewModeChange(ViewMode.View)
                                }
                              >
                                <FormattedMessage
                                  {...IntlHeaderBarMessages[
                                    HeaderBarMessage.DynamicFormBtn
                                  ]}
                                />
                              </DropdownItem>
                            </Tooltip>
                          )}
                        </React.Fragment>
                      )}
                    {handleDownloadPdf &&
                      permissions.download &&
                      !isNativeApp() &&
                      formId && (
                        <React.Fragment>
                          <Tooltip
                            position="left"
                            content={
                              <FormattedMessage
                                {...IntlHeaderBarMessages[
                                  HeaderBarMessage.DownloadPdfTooltip
                                ]}
                              />
                            }
                          >
                            <DropdownItem
                              className="proforma-download-pdf"
                              onClick={() => handleDownloadPdf(formId)}
                            >
                              <FormattedMessage
                                {...IntlHeaderBarMessages[
                                  HeaderBarMessage.DownloadPdfBtn
                                ]}
                              />
                            </DropdownItem>
                          </Tooltip>
                          {handleDownloadXlsx && (
                            <Tooltip
                              position="left"
                              content={
                                <FormattedMessage
                                  {...IntlHeaderBarMessages[
                                    HeaderBarMessage.DownloadXlsxTooltip
                                  ]}
                                />
                              }
                            >
                              <DropdownItem
                                className="proforma-download-xlsx"
                                onClick={() =>
                                  handleDownloadXlsx(
                                    formId,
                                    formStore.formName
                                      ? formStore.formName
                                      : '',
                                  )
                                }
                              >
                                <FormattedMessage
                                  {...IntlHeaderBarMessages[
                                    HeaderBarMessage.DownloadXlsxBtn
                                  ]}
                                />
                              </DropdownItem>
                            </Tooltip>
                          )}
                        </React.Fragment>
                      )}
                    {handleDeleteForm && permissions.delete && (
                      <Tooltip
                        position="left"
                        // @ts-ignore
                        content={<FormattedMessage {...deleteTooltipMessage} />}
                      >
                        <DropdownItem
                          className="proforma-delete"
                          onClick={() => handleDeleteForm()}
                          isDisabled={formStore.status !== FormStatus.Open}
                        >
                          <FormattedMessage
                            {...IntlHeaderBarMessages[
                              HeaderBarMessage.DeleteBtn
                            ]}
                          />
                        </DropdownItem>
                      </Tooltip>
                    )}
                  </DropdownItemGroup>
                </DropdownMenu>
              </ButtonGroup>
            )}
            {viewMode === ViewMode.Edit && (
              <ButtonGroup>
                {showSubmit && (
                  <LoadingButton
                    className="proforma-submit"
                    appearance="primary"
                    onClick={() => handleSubmitForm()}
                    isLoading={submittingForm}
                    iconBefore={
                      formStore.submitLock ? (
                        <LockFilledIcon
                          label="Lock icon"
                          secondaryColor="inherit"
                          size="medium"
                        />
                      ) : (
                        ''
                      )
                    }
                  >
                    {formStore.answersModified ? (
                      <FormattedMessage
                        {...IntlCommonMessages[CommonMessage.SubmitSave]}
                      />
                    ) : (
                      <FormattedMessage
                        {...IntlCommonMessages[CommonMessage.Submit]}
                      />
                    )}
                  </LoadingButton>
                )}
                {permissions.save && (
                  <LoadingButton
                    className="proforma-save"
                    onClick={() => handleSaveForm()}
                    isDisabled={
                      !formStore.answersModified || formStore.savingAnswers
                    }
                    isLoading={savingAnswers}
                  >
                    {formStore.answersModified ? (
                      <FormattedMessage
                        {...IntlCommonMessages[CommonMessage.Save]}
                      />
                    ) : (
                      <FormattedMessage
                        {...IntlCommonMessages[CommonMessage.Saved]}
                      />
                    )}
                  </LoadingButton>
                )}
                <Button
                  className="proforma-canceledit"
                  onClick={() => handleCancelEdit()}
                  isDisabled={formStore.savingAnswers}
                >
                  {formStore.answersModified ? (
                    <FormattedMessage
                      {...IntlCommonMessages[CommonMessage.Cancel]}
                    />
                  ) : (
                    <FormattedMessage
                      {...IntlCommonMessages[CommonMessage.Close]}
                    />
                  )}
                </Button>
              </ButtonGroup>
            )}
          </FormActions>
        </HeaderBarStyles>
      );
    },
  ),
);

// Styles
const HeaderBarStyles = styled.div`
  background-color: ${N0};
  display: flex;
  justify-content: space-between;
  padding: 8px 0;
  flex-direction: ${isNativeApp() ? 'column' : 'row'};
`;

const FormTitleWrapper = styled.h3`
  &:first-child {
    margin-top: 4px;
  }
`;

const FormActions = styled.div`
  margin-top: ${isNativeApp() ? '5px' : '0px'};
`;

const DisabledDropdownItemStyles = styled.span`
  color: grey;
  cursor: not-allowed;
`;
