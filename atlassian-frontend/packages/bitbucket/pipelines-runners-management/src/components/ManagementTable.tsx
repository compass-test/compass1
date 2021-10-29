import React from 'react';

import { FormattedRelative, InjectedIntlProps, injectIntl } from 'react-intl'; // eslint-disable-line import/no-extraneous-dependencies

import DynamicTable from '@atlaskit/dynamic-table';
import Lozenge from '@atlaskit/lozenge';
import { SimpleTag } from '@atlaskit/tag';
import TagGroup from '@atlaskit/tag-group';
import {
  Runner,
  SELF_HOSTED_LABEL,
  SYSTEM_LABELS,
} from '@atlassian/pipelines-models';

import { ManagementTableColumn, RunnerStatusTagColors } from '../types';

import ActionsDialog from './ActionsDialog';
import LabelsPopup from './LabelsPopup';
import { NameRow } from './styled';

const head = {
  cells: [
    {
      key: 'name',
      content: 'Runner name',
      shouldTruncate: true,
      width: 25,
    },
    {
      key: 'labels',
      content: 'Labels',
    },
    {
      key: 'status',
      content: 'Status',
      width: 15,
    },
    {
      key: 'updated',
      content: 'Updated',
      width: 15,
    },
    {
      key: 'actions',
      content: 'Actions',
      width: 7,
    },
  ],
};

export const detectRunnerSystemFromLabels = (customLabels: string[]) => {
  const system = customLabels.filter((value) => SYSTEM_LABELS.includes(value));
  return system[0];
};

type Props = {
  runners: Runner[];
  hideActionsColumn?: boolean;
  onEditRunner?: (runnerUuid: string) => void;
  onDeleteRunner?: (runnerUuid: string) => void;
  onChangeStatus?: (runnerUuid: string, newStatus: string) => void;
} & InjectedIntlProps;

const ManagementTable = injectIntl(
  ({
    runners,
    hideActionsColumn,
    onEditRunner,
    onDeleteRunner,
    onChangeStatus,
  }: Props) => {
    const createCellKey = (
      runnerUuid: string,
      column: ManagementTableColumn,
    ) => {
      return `${runnerUuid}_${column}`;
    };

    const reorderLabelList = (labels: string[]): string[] => {
      const system = detectRunnerSystemFromLabels(labels);
      let reorderedLabels = labels.filter(
        (label) =>
          !SYSTEM_LABELS.includes(label) && label !== SELF_HOSTED_LABEL,
      );

      return reorderedLabels.concat([SELF_HOSTED_LABEL, system]);
    };

    const createLabelCell = (labels: string[], index: number) => {
      const reorderedLabels = reorderLabelList(labels);
      return (
        <TagGroup>
          {reorderedLabels.length <= 4 &&
            reorderedLabels.map((key, i) => (
              <SimpleTag text={reorderedLabels[i]} key={i} />
            ))}
          {reorderedLabels.length > 4 ? (
            <>
              {reorderedLabels.slice(0, 4).map((key, i) => (
                <SimpleTag text={reorderedLabels[i]} key={i} />
              ))}
              <LabelsPopup labels={reorderedLabels} index={index} />
            </>
          ) : null}
        </TagGroup>
      );
    };

    const tableHead = {
      cells: head.cells.map((cell) =>
        cell.key === 'actions' && hideActionsColumn ? { width: 7 } : cell,
      ),
    };

    const createRunnerRows = (runners: Runner[]) => {
      return runners.map((runner: Runner, index: number) => ({
        key: `row-${index}-${runner.uuid}`,
        cells: [
          {
            key: createCellKey(runner.uuid, ManagementTableColumn.NAME),
            content: <NameRow>{runner.name}</NameRow>,
          },
          {
            key: createCellKey(runner.uuid, ManagementTableColumn.LABELS),
            content: createLabelCell(runner.labels, index),
          },
          {
            key: createCellKey(runner.uuid, ManagementTableColumn.STATUS),
            content: (
              <Lozenge
                appearance={
                  RunnerStatusTagColors[runner.state.status].appearance
                }
              >
                {runner.state.status}
              </Lozenge>
            ),
          },
          {
            key: createCellKey(runner.uuid, ManagementTableColumn.UPDATED),
            content: <FormattedRelative value={runner.updated_on} />,
          },
          !hideActionsColumn && onEditRunner && onDeleteRunner && onChangeStatus
            ? {
                key: createCellKey(runner.uuid, ManagementTableColumn.ACTIONS),
                content: (
                  <ActionsDialog
                    runnerUuid={runner.uuid}
                    status={runner.state.status}
                    onEdit={onEditRunner}
                    onDelete={onDeleteRunner}
                    onChangeStatus={onChangeStatus}
                  />
                ),
              }
            : {},
        ],
      }));
    };

    return (
      <DynamicTable
        head={tableHead}
        rows={createRunnerRows(runners)}
        rowsPerPage={10}
        isFixedSize={true}
      />
    );
  },
);

export default React.memo(ManagementTable);
