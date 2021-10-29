import React, { useCallback, useEffect, useRef, useState } from 'react';

import { observer } from 'mobx-react-lite';
import { FormattedMessage, injectIntl } from 'react-intl';
import styled from 'styled-components';

import Button from '@atlaskit/button';
import { useFlags } from '@atlaskit/flag';
import SuccessIcon from '@atlaskit/icon/glyph/check-circle';
import ErrorIcon from '@atlaskit/icon/glyph/error';
import Textfield from '@atlaskit/textfield';
import { G300, R400 } from '@atlaskit/theme/colors';

import { withIntlProvider } from '../../../intl-provider';
import { CreateTemplateFormResponse } from '../../apis';
import { CommonMessage, IntlCommonMessages } from '../../CommonMessages.intl';
import { usePfBrowserUtils } from '../../context/BrowserUtilsContext';
import { useProjectFormApi } from '../../context/ProjectFormApiContext';
import { useProjectId } from '../../context/ProjectIdContext';
import { useTemplateFormApi } from '../../context/TemplateFormApiContext';
import { Project } from '../../models';
import { TemplateFormIndex } from '../../models/ProjectForm';
import { Table } from '../Table';

import { CachingProjectFormsSearchStore } from './CachingProjectFormsSearchStore';
import { CopyProjectFormModal } from './CopyProjectFormModal';
import { DeleteProjectFormModal } from './DeleteProjectFormModal';
import { FormActions } from './FormActions';
import {
  IntlListProjectFormsMessages,
  ListProjectFormsMessage,
} from './ListProjectFormsMessages.intl';
import { getLocations, Location } from './location';
import { FormLocationsComponent } from './LocationComponents';
import { LocationDropdown } from './LocationDropdown';
import { ListProjectFormsMessages } from './messages';
import { RequestTypesComponent } from './RequestTypeComponents';
import { FormNameWrapper, SmallSearchIcon, TextfieldWrapper } from './styled';
import { extractTicketTypeId } from './ticketType';
import { TicketTypeDropdown } from './TicketTypeDropdown';
import { IssueTypeRenderer, RequestTypeRenderer } from './TypeRenderer';

enum ProjectFormColumns {
  actions = 'actions',
  associatedTypes = 'associatedTypes',
  locations = 'locations',
  name = 'name',
  updated = 'updated',
}

interface ListProjectFormsProps {
  requestTypes?: boolean;
}

export const ListProjectForms = withIntlProvider<ListProjectFormsProps>(
  injectIntl(
    observer(({ intl, requestTypes }) => {
      const typeRendererRef = useRef(
        requestTypes ? new RequestTypeRenderer() : new IssueTypeRenderer(),
      );
      const typeRenderer = typeRendererRef.current;

      const [
        deleteFormData,
        setDeleteFormData,
      ] = useState<TemplateFormIndex | null>(null);
      const [
        copyFormData,
        setCopyFormData,
      ] = useState<TemplateFormIndex | null>(null);
      const [showDeleteFormModal, setShowDeleteFormModal] = useState(false);
      const [showCopyFormModal, setShowCopyFormModal] = useState(false);
      const [searchTextFilter, setSearchTextFilter] = useState('');

      const projectFormApi = useProjectFormApi();
      const templateFormApi = useTemplateFormApi();
      const projectId = useProjectId();
      const browserUtils = usePfBrowserUtils();
      const { showFlag } = useFlags();

      const loadForms = (pId: number): Promise<TemplateFormIndex[]> => {
        return projectFormApi.getForms(pId);
      };

      // We need to useRef here otherwise a new searchStore gets created on every re-render.
      const searchStoreRef = useRef(
        new CachingProjectFormsSearchStore(loadForms, projectId),
      );
      const searchStore = searchStoreRef.current;

      useEffect(() => {
        if (!searchStore.sortKey) {
          searchStore.sortBy({
            key: ProjectFormColumns.name,
            sortOrder: 'ASC',
          });
        } else {
          searchStore.startSearch();
        }
      }, [searchStore]);

      const [filteredTypes, setFilteredTypes] = useState<string[]>([]);

      const updateFilteredTypeIds = (ids: string[]) => {
        const newIds = [...new Set(ids.map(extractTicketTypeId))];
        setFilteredTypes(newIds);
      };

      const [filteredLocations, setFilteredLocations] = useState<Location[]>(
        [],
      );

      const handleDeleteForm = (formId: number, formName: string) => {
        setShowDeleteFormModal(false);
        projectFormApi.deleteProjectForm(projectId, formId).then(() => {
          showDeleteFormSuccessFlag(formName);
          searchStore.refresh();
        });
      };

      const handleCopyForm = (
        formToCopy: TemplateFormIndex,
        projectsToCopyTo: Project[],
      ) => {
        setShowCopyFormModal(false);
        const promises: Promise<CreateTemplateFormResponse>[] = [];
        projectsToCopyTo.forEach(project => {
          promises.push(
            templateFormApi.copyTemplateForm(
              formToCopy.id,
              project.id, // project ID to copy the form to
              projectId, // project ID to copy the form from
              formToCopy.name,
            ),
          );
        });
        Promise.all(promises)
          .then(() => {
            showCopyFormSuccessFlag(
              formToCopy.name,
              promises.length,
              projectsToCopyTo,
            );
          })
          .catch(e => {
            showCopyFormErrorFlag(formToCopy.name); // TODO: handle error here
          });
      };

      const showCopyFormSuccessFlag = (
        formName: string,
        numFormsCopied: number,
        projects: Project[],
      ) => {
        numFormsCopied > 1
          ? showFlag({
              id: 'copy-form-success-flag',
              icon: <SuccessIcon label="Success" primaryColor={G300} />,
              title: (
                <FormattedMessage
                  {...ListProjectFormsMessages.CopyFormSuccessTitleMultiple}
                  values={{ numFormsCopied: numFormsCopied }}
                />
              ),
              description: (
                <FormattedMessage
                  {...ListProjectFormsMessages.CopyFormSuccessDescMultiple}
                  values={{
                    formName: formName,
                    numFormsCopied: numFormsCopied,
                  }}
                />
              ),
              isAutoDismiss: true,
            })
          : showFlag({
              id: 'copy-form-success-flag',
              icon: <SuccessIcon label="Success" primaryColor={G300} />,
              title: (
                <FormattedMessage
                  {...ListProjectFormsMessages.CopyFormSuccessTitle}
                />
              ),
              description: (
                <FormattedMessage
                  {...ListProjectFormsMessages.CopyFormSuccessDesc}
                  values={{ formName: formName, projectName: projects[0].name }}
                />
              ),
              isAutoDismiss: true,
            });
      };

      const showCopyFormErrorFlag = (formName: string) => {
        showFlag({
          appearance: 'error',
          id: 'copy-form-error-flag',
          icon: <ErrorIcon label="error" secondaryColor={R400} />,
          title: (
            <FormattedMessage
              {...ListProjectFormsMessages.CopyFormErrorTitle}
              values={{ formName: formName }}
            />
          ),
          isAutoDismiss: true,
        });
      };

      const showDeleteFormSuccessFlag = (formName: string) => {
        showFlag({
          id: 'delete-form-success-flag',
          icon: <SuccessIcon label="Success" primaryColor={G300} />,
          title: (
            <FormattedMessage
              {...IntlListProjectFormsMessages[
                ListProjectFormsMessage.DeleteFormSuccess
              ]}
              values={{ formName: formName }}
            />
          ),
          isAutoDismiss: true,
        });
      };

      const createTableHeaders = () => {
        const columns: any[] = [];

        columns.push(
          {
            key: ProjectFormColumns.name,
            content: (
              <FormattedMessage {...IntlCommonMessages[CommonMessage.Name]} />
            ),
            isSortable: false,
            width: 8,
          },
          {
            key: ProjectFormColumns.associatedTypes,
            content: (
              <FormattedMessage
                {...IntlListProjectFormsMessages[typeRenderer.columnName]}
              />
            ),
            isSortable: false,
            width: 5,
          },
          {
            key: ProjectFormColumns.locations,
            content: (
              <FormattedMessage
                {...IntlListProjectFormsMessages[
                  ListProjectFormsMessage.FormUsage
                ]}
              />
            ),
            isSortable: false,
            width: 5,
          },
          {
            key: ProjectFormColumns.updated,
            content: (
              <FormattedMessage
                {...IntlListProjectFormsMessages[
                  ListProjectFormsMessage.LastUpdated
                ]}
              />
            ),
            isSortable: true,
            width: 3,
          },
          {
            key: ProjectFormColumns.actions,
            content: <></>,
            isSortable: false,
            width: 1,
          },
        );

        return { cells: columns };
      };

      const createRow = (form: TemplateFormIndex) => {
        const editForm = (e: React.MouseEvent<HTMLElement, MouseEvent>) =>
          browserUtils.openUrl(form.editUrl);
        const columns: any[] = [];

        const formId = form.id;

        const buttonStyles = {
          display: 'flex',
          alignItems: 'center',
        };

        columns.push(
          {
            key: `${form.name}-${formId}`,
            content: (
              <Button
                appearance="subtle-link"
                onClick={editForm}
                style={buttonStyles}
              >
                <FormNameWrapper>{form.name}</FormNameWrapper>
              </Button>
            ),
          },
          {
            key: ProjectFormColumns.associatedTypes,
            content: (
              <RequestTypesComponent
                requestTypes={form.requesttypes.filter(typeRenderer.filter)}
                typeRenderer={typeRenderer}
              />
            ),
          },
          {
            key: ProjectFormColumns.locations,
            content: (
              <FormLocationsComponent
                requestTypes={form.requesttypes.filter(typeRenderer.filter)}
              />
            ),
          },
          {
            key: `${ProjectFormColumns.updated}-${form.updated.iso8601}-${formId}`,
            content: form.updated.friendly,
          },
          {
            key: `${ProjectFormColumns.actions}-${formId}`,
            content: (
              <FormActions
                form={form}
                onDeleteForm={() => {
                  setDeleteFormData(form);
                  setShowDeleteFormModal(true);
                }}
                onCopyForm={() => {
                  setCopyFormData(form);
                  setShowCopyFormModal(true);
                }}
              />
            ),
          },
        );

        return {
          key: `row-${form.projectId}-${formId}`,
          cells: columns,
        };
      };

      const formFilter = useCallback(
        (form: TemplateFormIndex) => {
          const hasTicketTypes =
            filteredTypes.length === 0 ||
            form.requesttypes.findIndex(
              rt => filteredTypes.indexOf(extractTicketTypeId(rt.id)) >= 0,
            ) >= 0;

          const hasLocations =
            filteredLocations.length === 0 ||
            getLocations(
              form.requesttypes.filter(typeRenderer.filter),
            ).findIndex(location => filteredLocations.indexOf(location) >= 0) >=
              0;

          const searchTextFilterLower = searchTextFilter.toLowerCase();

          return (
            form.name.toLowerCase().indexOf(searchTextFilterLower) >= 0 &&
            hasTicketTypes &&
            hasLocations
          );
        },
        [
          filteredLocations,
          filteredTypes,
          searchTextFilter,
          typeRenderer.filter,
        ],
      );

      const formIds = searchStore.items.map(i => i.id).join('-');

      return (
        <ListProjectFormsWrapper>
          <TopBar>
            <TextfieldWrapper>
              <Textfield
                elemAfterInput={<SmallSearchIcon label={''} />}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setSearchTextFilter(e.target.value)
                }
                placeholder={intl.formatMessage(
                  IntlListProjectFormsMessages[
                    ListProjectFormsMessage.FilterForms
                  ],
                )}
                isCompact
              />
            </TextfieldWrapper>
            <RequestTypeWrapper>
              <TicketTypeDropdown
                key={`ttd-${formIds}`}
                store={searchStore}
                onChange={updateFilteredTypeIds}
                requestTypes={requestTypes}
                typeRenderer={typeRenderer}
              />
            </RequestTypeWrapper>
            <LocationDropdown
              key={`ld-${formIds}`}
              filter={typeRenderer.filter}
              onChange={setFilteredLocations}
              requestTypes={requestTypes}
              store={searchStore}
            />
          </TopBar>
          <TableWrapper>
            <Table
              key={`stf-${searchTextFilter}-${filteredTypes.join(
                '-',
              )}-${filteredLocations.join('-')}`}
              store={searchStore}
              columns={createTableHeaders()}
              renderRow={(form: any) => createRow(form)}
              filter={formFilter}
            />
          </TableWrapper>
          {showDeleteFormModal && deleteFormData && (
            <DeleteProjectFormModal
              onClose={() => setShowDeleteFormModal(false)}
              onConfirm={() =>
                handleDeleteForm(deleteFormData.id, deleteFormData.name)
              }
              form={deleteFormData}
              requestTypes={requestTypes || false}
              typeRenderer={typeRenderer}
            />
          )}
          {showCopyFormModal && copyFormData && (
            <CopyProjectFormModal
              onClose={() => setShowCopyFormModal(false)}
              onConfirm={projectsToCopyTo =>
                handleCopyForm(copyFormData, projectsToCopyTo)
              }
              formToCopy={copyFormData}
            />
          )}
        </ListProjectFormsWrapper>
      );
    }),
  ),
);

const ListProjectFormsWrapper = styled.div`
  max-width: 1000px;
`;

const TopBar = styled.div`
  padding-bottom: 25px;
  display: flex;
`;

const TableWrapper = styled.div`
  /* Shift first row header to align with rest of the row */
  th:first-child {
    padding-left: 12px;
  }
  /* Fix alignment of 2nd and 3rd columns */
  th:nth-child(2) {
    padding-left: 15px;
  }

  td:nth-child(2) {
    padding-left: 15px;
  }

  th:nth-child(3) {
    padding-left: 15px;
  }

  td:nth-child(3) {
    padding-left: 15px;
  }
`;

const RequestTypeWrapper = styled.div`
  margin-right: 10px;
`;
