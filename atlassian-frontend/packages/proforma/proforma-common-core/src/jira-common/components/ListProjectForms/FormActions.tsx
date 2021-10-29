import React, { useCallback, useEffect, useRef, useState } from 'react';

import { observer } from 'mobx-react';
import { FormattedMessage } from 'react-intl';
import styled from 'styled-components';

import DropdownMenu, {
  DropdownItem,
  DropdownItemGroup,
} from '@atlaskit/dropdown-menu';
import { useFlags } from '@atlaskit/flag';
import ExcelSpreadsheet24Icon from '@atlaskit/icon-file-type/glyph/excel-spreadsheet/24';
import CrossCircleIcon from '@atlaskit/icon/glyph/cross-circle';
import MoreIcon from '@atlaskit/icon/glyph/more';
import ProgressBar from '@atlaskit/progress-bar';
import { G300, R500 } from '@atlaskit/theme/colors';

import { XlsxDownloadTask } from '../../apis/ProjectFormApi';
import { usePfAnalyticsUtils } from '../../context/AnalyticsUtilsContext';
import { usePfBrowserUtils } from '../../context/BrowserUtilsContext';
import { usePfErrorUtils } from '../../context/ErrorUtilsContext';
import { useProjectFormApi } from '../../context/ProjectFormApiContext';
import { ExportFormat } from '../../models/ExportFormat';
import { TemplateFormIndex } from '../../models/ProjectForm';
import { AnalyticsEventName } from '../../utils/AnalyticsUtils';

import {
  FormActionsMessage,
  IntlFormActionsMessages,
} from './FormActionsMessages.intl';
import {
  IntlListProjectFormsMessages,
  ListProjectFormsMessage,
} from './ListProjectFormsMessages.intl';
import { ListProjectFormsMessages } from './messages';

interface FormActionsProps {
  form: TemplateFormIndex;
  onDeleteForm: () => void;
  onCopyForm: () => void;
}

enum XlsxDownloadState {
  None,
  InProgress,
  Ready,
  Completed,
  Error,
}

const spreadsheetPollMinimumDelay = 500; // 500ms = half a second
const spreadsheetPollMaximumDelay = 5000; // 5000ms = five seconds
const spreadsheetPollMultiplier = 1.2; // 1.2x = increase wait time by 20% for each poll

export const FormActions = observer(
  ({ form, onDeleteForm, onCopyForm }: FormActionsProps) => {
    const checkXlsxPollDelay = useRef<number>(spreadsheetPollMinimumDelay);
    const [xlsxDownloadState, setXlsxDownloadState] = useState(
      XlsxDownloadState.None,
    );
    const [xlsxDownloadProgress, setXlsxDownloadProgress] = useState<number>(0);

    const xlsxDownloadPollId = useRef<number>();
    const downloadTaskId = useRef<number>();
    const xlsxDownloadDismissFlagFn = useRef<() => void>();

    const xlsxDownloadFilename = `${form.name}.xlsx`;
    const xlsxFlagId = `${form.id}-download`;

    const browserUtils = usePfBrowserUtils();
    const errorUtils = usePfErrorUtils();
    const analyticsUtils = usePfAnalyticsUtils();
    const projectFormApi = useProjectFormApi();
    const { showFlag } = useFlags();

    const processXlsxDownloadResponse = (
      xlsxDownloadTask?: XlsxDownloadTask,
    ) => {
      if (!xlsxDownloadTask || xlsxDownloadTask.status.failed) {
        finishXlsxDownload(XlsxDownloadState.Error);
      } else if (xlsxDownloadTask.status.complete) {
        setXlsxDownloadProgress(100);
        setXlsxDownloadState(XlsxDownloadState.Ready);
        downloadXlsx();
        setTimeout(() => {
          setXlsxDownloadState(XlsxDownloadState.Completed);
        }, 1500);
      } else {
        setXlsxDownloadProgress(xlsxDownloadTask.status.progress);
        xlsxDownloadPollId.current = window.setTimeout(
          checkXlsxDownload,
          checkXlsxPollDelay.current,
        );
        checkXlsxPollDelay.current = Math.min(
          checkXlsxPollDelay.current * spreadsheetPollMultiplier,
          spreadsheetPollMaximumDelay,
        );
      }
    };

    const startXlsxDownload = (): void => {
      if (downloadTaskId.current) {
        finishXlsxDownload(XlsxDownloadState.Error);
        return;
      }
      checkXlsxPollDelay.current = spreadsheetPollMinimumDelay;
      projectFormApi
        .startXlsxDownload(form.projectId, form.id)
        .then(xlsxDownloadTask => {
          if (xlsxDownloadTask) {
            setXlsxDownloadState(XlsxDownloadState.InProgress);
            downloadTaskId.current = xlsxDownloadTask.id;
          }
          processXlsxDownloadResponse(xlsxDownloadTask);
        })
        .catch(_ => {
          errorUtils.reportError(
            new Error('The XLSX download task failed while starting.'),
          );
          processXlsxDownloadResponse();
        });
      analyticsUtils.track(AnalyticsEventName.ExportAllResponses, {
        projectId: form.projectId,
        exportType: ExportFormat.Xlsx,
      });
    };

    const checkXlsxDownload = (): void => {
      if (!downloadTaskId.current) {
        errorUtils.reportError(
          new Error(
            'Cannot check XLSX download, the download task ID is undefined.',
          ),
        );
        finishXlsxDownload(XlsxDownloadState.Error);
        return;
      }
      projectFormApi
        .checkXlsxDownload(form.projectId, form.id, downloadTaskId.current)
        .then(processXlsxDownloadResponse)
        .catch(_ => {
          errorUtils.reportError(
            new Error('The XLSX download task failed while checking progress.'),
          );
          processXlsxDownloadResponse();
        });
    };

    const finishXlsxDownload = useCallback(
      (downloadState: XlsxDownloadState.None | XlsxDownloadState.Error) => {
        downloadTaskId.current = undefined;
        window.clearTimeout(xlsxDownloadPollId.current);
        xlsxDownloadPollId.current = undefined;
        setXlsxDownloadState(downloadState);
        setXlsxDownloadProgress(0);
      },
      [],
    );

    const downloadXlsx = useCallback((): void => {
      if (!downloadTaskId.current) {
        errorUtils.reportError(
          new Error(
            'Cannot finish XLSX download, the download task ID is undefined.',
          ),
        );
        finishXlsxDownload(XlsxDownloadState.Error);
        return;
      }
      projectFormApi
        .downloadFinishedXlsx(form.projectId, form.id, downloadTaskId.current)
        .then(xlsxBlob => {
          finishXlsxDownload(XlsxDownloadState.None);
          const downloadLink = window.document.createElement('a');
          downloadLink.href = (global as any).URL.createObjectURL(xlsxBlob);
          downloadLink.setAttribute('download', xlsxDownloadFilename);
          window.document.body.appendChild(downloadLink);
          downloadLink.click();
          window.document.body.removeChild(downloadLink);
        })
        .catch(_ => {
          errorUtils.reportError(
            new Error('The XLSX download task failed while downloading.'),
          );
          finishXlsxDownload(XlsxDownloadState.Error);
        });
    }, [
      errorUtils,
      form.id,
      form.projectId,
      finishXlsxDownload,
      projectFormApi,
      xlsxDownloadFilename,
    ]);

    const editForm = () => {
      browserUtils.goToUrl(form.editUrl);
    };

    const showDownloadProgressFlag = useCallback(() => {
      xlsxDownloadDismissFlagFn.current = showFlag({
        id: xlsxFlagId,
        title: xlsxDownloadFilename,
        icon: (
          <ExcelSpreadsheet24Icon
            // @ts-ignore
            primaryColor={G300}
            label=""
          />
        ),
        description: (
          <>
            <FlagParagraph>
              <FormattedMessage
                {...IntlFormActionsMessages[
                  FormActionsMessage.DownloadFlagInProgress
                ]}
              />
            </FlagParagraph>
            <ProgressBar value={xlsxDownloadProgress / 100} />
            <FlagParagraph>
              <FormattedMessage
                {...IntlFormActionsMessages[
                  FormActionsMessage.DownloadFlagPercentComplete
                ]}
                values={{ percent: xlsxDownloadProgress }}
              />
            </FlagParagraph>
          </>
        ),
        onDismissed: () => finishXlsxDownload(XlsxDownloadState.None),
      });
    }, [
      finishXlsxDownload,
      showFlag,
      xlsxDownloadFilename,
      xlsxDownloadProgress,
      xlsxFlagId,
    ]);

    const showDownloadReadyFlag = useCallback(() => {
      xlsxDownloadDismissFlagFn.current = showFlag({
        id: xlsxFlagId,
        title: xlsxDownloadFilename,
        icon: (
          <ExcelSpreadsheet24Icon
            // @ts-ignore
            primaryColor={G300}
            label=""
          />
        ),
        description: (
          <FormattedMessage
            {...IntlFormActionsMessages[
              FormActionsMessage.DownloadFlagStarting
            ]}
          />
        ),
        onDismissed: () => finishXlsxDownload(XlsxDownloadState.None),
      });
    }, [finishXlsxDownload, showFlag, xlsxDownloadFilename, xlsxFlagId]);

    const showDownloadCompleteFlag = useCallback(() => {
      xlsxDownloadDismissFlagFn.current = showFlag({
        id: xlsxFlagId,
        title: xlsxDownloadFilename,
        icon: (
          <ExcelSpreadsheet24Icon
            // @ts-ignore
            primaryColor={G300}
            label=""
          />
        ),
        description: (
          <FormattedMessage
            {...IntlFormActionsMessages[
              FormActionsMessage.DownloadFlagComplete
            ]}
          />
        ),
        onDismissed: () => finishXlsxDownload(XlsxDownloadState.None),
      });
    }, [finishXlsxDownload, showFlag, xlsxDownloadFilename, xlsxFlagId]);

    const showDownloadErrorFlag = useCallback(() => {
      showFlag({
        id: xlsxFlagId,
        title: xlsxDownloadFilename,
        icon: <CrossCircleIcon label={'label'} primaryColor={R500} />,
        description: (
          <FormattedMessage
            {...IntlFormActionsMessages[FormActionsMessage.DownloadFlagError]}
          />
        ),
      });
      xlsxDownloadDismissFlagFn.current = undefined;
      finishXlsxDownload(XlsxDownloadState.None);
    }, [finishXlsxDownload, showFlag, xlsxDownloadFilename, xlsxFlagId]);

    useEffect(() => {
      switch (xlsxDownloadState) {
        case XlsxDownloadState.None:
          if (xlsxDownloadDismissFlagFn.current) {
            xlsxDownloadDismissFlagFn.current();
            xlsxDownloadDismissFlagFn.current = undefined;
          }
          break;
        case XlsxDownloadState.InProgress:
          showDownloadProgressFlag();
          break;
        case XlsxDownloadState.Ready:
          showDownloadReadyFlag();
          break;
        case XlsxDownloadState.Completed:
          showDownloadCompleteFlag();
          break;
        case XlsxDownloadState.Error:
          showDownloadErrorFlag();
          break;
      }
    }, [
      showDownloadProgressFlag,
      showDownloadReadyFlag,
      showDownloadCompleteFlag,
      showDownloadErrorFlag,
      xlsxDownloadState,
    ]);

    return (
      <>
        <DropdownMenu
          position={'bottom right'}
          triggerButtonProps={{
            iconBefore: <MoreIcon label="more" />,
            appearance: 'subtle',
          }}
          triggerType="button"
        >
          <DropdownItemGroup>
            <DropdownItem onClick={editForm}>
              <FormattedMessage
                {...IntlListProjectFormsMessages[ListProjectFormsMessage.Edit]}
              />
            </DropdownItem>
            <DropdownItem onClick={() => onCopyForm()}>
              <FormattedMessage {...ListProjectFormsMessages.Copy} />
            </DropdownItem>
            <DropdownItem onClick={() => onDeleteForm()}>
              <FormattedMessage
                {...IntlListProjectFormsMessages[
                  ListProjectFormsMessage.Delete
                ]}
              />
            </DropdownItem>
            <DropdownItem onClick={startXlsxDownload}>
              <FormattedMessage
                {...IntlFormActionsMessages[FormActionsMessage.ExportInXlsx]}
              />
            </DropdownItem>
          </DropdownItemGroup>
        </DropdownMenu>
      </>
    );
  },
);

const FlagParagraph = styled.p`
  margin: 0.5em 0;
`;
