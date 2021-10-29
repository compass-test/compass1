import React, { useEffect, useState } from 'react';

import { FormattedMessage } from 'react-intl';
import styled from 'styled-components';

import Button from '@atlaskit/button';
import DropdownMenu, {
  DropdownItem,
  DropdownItemGroup,
} from '@atlaskit/dropdown-menu';
import DynamicTable from '@atlaskit/dynamic-table';
import { RowType, SortOrderType } from '@atlaskit/dynamic-table/types';
import MoreIcon from '@atlaskit/icon/glyph/more';
import Lozenge from '@atlaskit/lozenge';
import { G400, N0, N40, N500 } from '@atlaskit/theme/colors';
import Tooltip from '@atlaskit/tooltip';

import {
  HeaderBarMessage,
  IntlHeaderBarMessages,
} from '../../../form-system/components/HeaderBarMessages.intl';
import { FormStatus } from '../../../form-system/models/Form';
import { withIntlProvider } from '../../../intl-provider';
import { PermissionLevel } from '../../models/PermissionLevel';
import { isNativeApp } from '../../utils/native/detectDeviceType';

import { ListFormsActions } from './ListFormsActions';
import {
  IntlListFormsMessages,
  ListFormsMessage,
} from './ListFormsMessages.intl';

interface TableColumn {
  key: string;
  content: React.ReactElement;
  colSpan: number;
  onClick?: () => void;
}

interface TableRow extends RowType {
  key?: string;
  cells: TableColumn[];
}

interface ListFormsProps {
  actions: ListFormsActions;
  disableAddFormBtn: boolean;
  forms: ListFormsItem[];
  isIndexLoading: boolean;
  permissions: PermissionLevel;
  selectedFormId?: number;
  showFormVisibility: boolean;
  isPortalView: boolean;
  panelAddFormButtonClickedCount?: number;
}

export interface ListFormsItem {
  id: number;
  internal: boolean;
  status: FormStatus;
  name: string;
}

export const ListForms = withIntlProvider<ListFormsProps>(
  ({
    actions,
    forms,
    disableAddFormBtn,
    isIndexLoading,
    permissions,
    selectedFormId,
    showFormVisibility,
    isPortalView,
    panelAddFormButtonClickedCount,
  }) => {
    const [sortOrder, setSortOrder] = useState<SortOrderType>('ASC');

    useEffect(() => {
      if (
        !isPortalView && panelAddFormButtonClickedCount
          ? panelAddFormButtonClickedCount > 0
          : false
      ) {
        actions.showAddForm?.();
      }
    }, [
      isPortalView,
      panelAddFormButtonClickedCount,
      actions.showAddForm,
      actions,
    ]);

    const handleClickRow = (
      formId: number,
      formIsSelected: boolean,
    ): Promise<boolean> => {
      if (formIsSelected) {
        return actions.setSelectedFormId();
      }
      return actions.setSelectedFormId(formId);
    };

    const renderRow = (listFormItem: ListFormsItem): TableRow => {
      const internalExternalTooltip = listFormItem.internal
        ? IntlListFormsMessages[ListFormsMessage.InternalLozengeTooltip]
        : IntlListFormsMessages[ListFormsMessage.ExternalLozengeTooltip];

      const deleteTooltip =
        listFormItem.status === FormStatus.Locked
          ? HeaderBarMessage.DeleteLockedTooltip
          : listFormItem.status === FormStatus.Submitted
          ? HeaderBarMessage.DeleteSubmittedTooltip
          : HeaderBarMessage.DeleteTooltip;

      const isSelected = selectedFormId === listFormItem.id;
      return {
        key: listFormItem.id.toString(),
        cells: [
          {
            key: `formName-${listFormItem.name}`,
            content: (
              <TableLeftHandWrapper>
                {showFormVisibility && (
                  <Tooltip
                    position="bottom"
                    tag="span"
                    content={<FormattedMessage {...internalExternalTooltip} />}
                  >
                    {listFormItem.internal ? (
                      <InternalLozenge>I</InternalLozenge>
                    ) : (
                      <ExternalLozenge>E</ExternalLozenge>
                    )}
                  </Tooltip>
                )}
                {listFormItem.name}{' '}
                {isSelected ? (
                  <Lozenge appearance="inprogress">
                    <FormattedMessage
                      {...IntlListFormsMessages[
                        ListFormsMessage.ViewingLozenge
                      ]}
                    />
                  </Lozenge>
                ) : null}
              </TableLeftHandWrapper>
            ),
            colSpan: 8,
            onClick: () => handleClickRow(listFormItem.id, isSelected),
          },
          {
            key: `action-${listFormItem.id}`,
            content: (
              <TableRightHandWrapper>
                {listFormItem.status === FormStatus.Open ? (
                  <Lozenge appearance="inprogress" isBold>
                    <FormattedMessage
                      {...IntlListFormsMessages[ListFormsMessage.StatusOpen]}
                    />
                  </Lozenge>
                ) : listFormItem.status === FormStatus.Submitted ? (
                  <Lozenge appearance="success" isBold>
                    <FormattedMessage
                      {...IntlListFormsMessages[
                        ListFormsMessage.StatusSubmitted
                      ]}
                    />
                  </Lozenge>
                ) : listFormItem.status === FormStatus.Locked ? (
                  <Lozenge appearance="success" isBold>
                    <FormattedMessage
                      {...IntlListFormsMessages[ListFormsMessage.StatusLocked]}
                    />
                  </Lozenge>
                ) : null}
                {!isNativeApp() && (
                  <ActionsBtnWrapper>
                    <DropdownMenu
                      trigger={
                        <Button
                          spacing="compact"
                          iconBefore={
                            <MoreIcon
                              label="more icon"
                              secondaryColor="inherit"
                              size="medium"
                            />
                          }
                        />
                      }
                      boundariesElement="scrollParent"
                      position="left"
                    >
                      <DropdownItemGroup>
                        {actions.downloadFormPdf &&
                          permissions.download &&
                          !isNativeApp() && (
                            <>
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
                                  onClick={(): void =>
                                    actions.downloadFormPdf!(listFormItem.id)
                                  }
                                >
                                  <FormattedMessage
                                    {...IntlHeaderBarMessages[
                                      HeaderBarMessage.DownloadPdfBtn
                                    ]}
                                  />
                                </DropdownItem>
                              </Tooltip>
                              {actions.downloadFormXlsx && (
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
                                    onClick={(): void =>
                                      actions.downloadFormXlsx!(
                                        listFormItem.id,
                                        listFormItem.name,
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
                            </>
                          )}
                        {actions.deleteForm && permissions.delete && (
                          <Tooltip
                            position="left"
                            content={
                              <FormattedMessage
                                {...IntlHeaderBarMessages[deleteTooltip]}
                              />
                            }
                          >
                            <DropdownItem
                              isDisabled={
                                listFormItem.status !== FormStatus.Open
                              }
                              onClick={(): void =>
                                actions.deleteForm!(
                                  listFormItem.id,
                                  listFormItem.name,
                                )
                              }
                            >
                              <FormattedMessage
                                {...IntlHeaderBarMessages[
                                  HeaderBarMessage.DeleteBtn
                                ]}
                              />
                            </DropdownItem>
                          </Tooltip>
                        )}
                        {!(
                          (actions.downloadFormPdf &&
                            permissions.download &&
                            !isNativeApp()) ||
                          (actions.deleteForm && permissions.delete)
                        ) && (
                          <Tooltip
                            position="left"
                            content={
                              <FormattedMessage
                                {...IntlListFormsMessages[
                                  ListFormsMessage.NoAvailableActionsTooltip
                                ]}
                              />
                            }
                          >
                            <DropdownItem>
                              <DisabledDropdownItemStyles>
                                <FormattedMessage
                                  {...IntlListFormsMessages[
                                    ListFormsMessage.NoAvailableActionsBtn
                                  ]}
                                />
                              </DisabledDropdownItemStyles>
                            </DropdownItem>
                          </Tooltip>
                        )}
                      </DropdownItemGroup>
                    </DropdownMenu>
                  </ActionsBtnWrapper>
                )}
              </TableRightHandWrapper>
            ),
            colSpan: 4,
          },
        ],
      };
    };

    return (
      <FormListWrapper>
        {actions.showAddForm && permissions.addForm && isPortalView && (
          <AddBtnWrapper>
            <Button
              appearance="primary"
              isDisabled={disableAddFormBtn}
              onClick={(): void => actions.showAddForm!()}
            >
              <FormattedMessage
                {...IntlListFormsMessages[ListFormsMessage.TableHeaderAddForm]}
              />
            </Button>
          </AddBtnWrapper>
        )}
        <DynamicTable
          head={{
            cells: [
              ...(isPortalView
                ? [
                    {
                      content: (
                        <FormattedMessage
                          {...IntlListFormsMessages[
                            ListFormsMessage.TableHeaderFormName
                          ]}
                        />
                      ),
                      isSortable: true,
                      shouldTruncate: true,
                      key: 'formName',
                      colSpan: 11,
                    },
                  ]
                : []),
              {
                content: '',
                isSortable: false,
                shouldTruncate: false,
                key: 'actions',
                colSpan: 1,
              },
            ],
          }}
          rows={forms
            .filter(listFormItem => listFormItem.id && listFormItem.name)
            .map(renderRow)}
          isLoading={isIndexLoading}
          defaultSortOrder={sortOrder}
          onSort={(data: { sortOrder: 'ASC' | 'DESC' }): void =>
            setSortOrder(data.sortOrder)
          }
          defaultSortKey="formName"
          isFixedSize
        />
      </FormListWrapper>
    );
  },
);

const FormListWrapper = styled.div`
  position: relative;
  height: 100%;
  & > div {
    padding-top: 6px;
    margin-bottom: 16px;
  }
  & td {
    font-size: ${isNativeApp() ? '17px' : 'inherit'};
  }
`;

const AddBtnWrapper = styled.nav`
  position: absolute;
  top: 0;
  right: 1px;
  z-index: 1;

  & button {
    height: 26px;
    line-height: 26px;
  }
`;

const ActionsBtnWrapper = styled.div`
  display: inline-block;
  margin-left: 10px;
`;

const TableLeftHandWrapper = styled.div`
  cursor: pointer;
  padding-left: 1px;
`;

const TableRightHandWrapper = styled.div`
  float: right;
  padding-right: 1px;
  white-space: nowrap;
`;

const DisabledDropdownItemStyles = styled.span`
  color: grey;
  cursor: not-allowed;
`;

const TinyLozenge = styled.div`
  border-radius: 3px;
  box-sizing: border-box;
  display: inline-block;
  font-size: 11px;
  font-weight: 700;
  line-height: 1;
  text-align: center;
  margin-right: 2px;
  max-width: 100%;
  padding: 2px 0 3px 0;
  vertical-align: text-bottom;
  width: 15px;
`;

const InternalLozenge = styled(TinyLozenge)`
  background-color: ${G400};
  color: ${N0};
`;

const ExternalLozenge = styled(TinyLozenge)`
  background-color: ${N40};
  color: ${N500};
`;
