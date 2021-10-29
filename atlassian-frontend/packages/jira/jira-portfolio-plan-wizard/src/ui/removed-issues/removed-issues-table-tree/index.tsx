import React from 'react';

import isEmpty from 'lodash/fp/isEmpty';
import remove from 'lodash/fp/remove';
import uniq from 'lodash/fp/uniq';

import { Checkbox } from '@atlaskit/checkbox';
import { DropdownItem, DropdownItemGroup } from '@atlaskit/dropdown-menu';
import Lozenge from '@atlaskit/lozenge';
import Spinner from '@atlaskit/spinner';
import TableTree, {
  Cell,
  Header,
  Headers,
  Row,
  Rows,
} from '@atlaskit/table-tree';

import { Issue, IssueStatusType } from '../../../common/types';
import HiddenDropdownMenu from '../../../common/ui/hidden-dropdown-menu';
import { useIntl as useIntlDI } from '../../../common/utils/intl';
import splitString from '../../../common/utils/split-string';

import { HighlightIssueLink, HighlightSummary } from './highlight';
import msgs from './messages';
import {
  EmptyTable,
  FullWidthCell,
  IssueSummary,
  RowIndent,
  RowMeatballsMenu,
  RowSummary,
  TableTreeContainer,
} from './styled';
import { Props, TableItem } from './types';
import {
  buildHierarchyTree,
  getAllDescendants,
  STATUS_COLOR_REMAP,
} from './utils';

export type { TableItem, SearchMatch } from './types';

const ItemCheckbox = ({
  item,
  allDescendants,
  onChange,
  selectedIssues,
  isDisabled,
}: {
  item: TableItem;
  allDescendants: TableItem[];
  onChange: () => void;
  selectedIssues: Issue[];
  isDisabled?: boolean;
}) => {
  const selectedChildren = allDescendants.filter(({ issue }) =>
    selectedIssues.some((selectedIssue) => selectedIssue.id === issue.id),
  );

  const selfSelected = selectedIssues.includes(item.issue);

  return (
    <Checkbox
      isChecked={!isEmpty(selectedChildren) || selfSelected}
      isIndeterminate={
        !selfSelected && selectedChildren.length !== allDescendants.length
      }
      isDisabled={isDisabled}
      name={`toggle-issue-${item.issue.id}`}
      testId={`toggle-issue-${item.issue.id}`}
      onChange={onChange}
    />
  );
};

export const DisabledTable = ({ useIntl = useIntlDI }) => {
  const { formatMessage } = useIntl();
  return (
    <TableTree>
      <Headers>
        <Header width="5%">{<Checkbox isDisabled />}</Header>
        <Header width="80%">{formatMessage(msgs.tableHeaderIssue)}</Header>
        <Header width="15%">{formatMessage(msgs.tableHeaderStatus)}</Header>
      </Headers>
    </TableTree>
  );
};

const Table = ({
  useIntl = useIntlDI,
  issues,
  loading,
  isDisabled,
  selectedIssues,
  setSelectedIssues,
  hierarchyLevelByType,
  issueTypeMap,
  issueStatusTypeMap,
  searchQuery,
  searchMatches,
  activeSearchResult,
  projects,
  forwardRef,
}: Props) => {
  const { formatMessage } = useIntl();

  if (loading) {
    return (
      <TableTreeContainer>
        <DisabledTable />
        <EmptyTable>
          <Spinner size="large" />
        </EmptyTable>
      </TableTreeContainer>
    );
  }

  if (isEmpty(issues) || !issues) {
    return (
      <TableTreeContainer>
        <DisabledTable />
        <EmptyTable>{formatMessage(msgs.noAvailableRemovedIssues)}</EmptyTable>
      </TableTreeContainer>
    );
  }

  const isAllSelected = selectedIssues.length >= issues.length;

  return (
    <TableTreeContainer innerRef={forwardRef}>
      <TableTree>
        <Headers>
          <Header width="5%">
            {
              <Checkbox
                isChecked={selectedIssues.length > 0}
                isIndeterminate={!isAllSelected}
                isDisabled={isDisabled}
                name={
                  isAllSelected
                    ? formatMessage(msgs.tableHeaderDeselectAll)
                    : formatMessage(msgs.tableHeaderSelectAll)
                }
                onChange={() => {
                  setSelectedIssues(isAllSelected ? [] : issues);
                }}
                testId="toggle-all-issues"
              />
            }
          </Header>
          <Header width="75%">{formatMessage(msgs.tableHeaderIssue)}</Header>
          <Header width="20%">{formatMessage(msgs.tableHeaderStatus)}</Header>
        </Headers>
        <Rows
          items={buildHierarchyTree(hierarchyLevelByType, issues)}
          render={(item: TableItem & { depth?: number }) => {
            const { issue, children, depth = 0 } = item;
            const allDescendants = getAllDescendants(item);
            const issueType = issueTypeMap && issueTypeMap[issue.values.type];
            const icon = issueType ? <img src={issueType.iconUrl} /> : null;
            const project = projects?.find(
              (project) => project.id === issue.values.project,
            );

            const childMatchesQuery = searchMatches.some((match) =>
              allDescendants.some((item) => item.issue.id === match.issueId),
            );

            const issueLink =
              issue.issueKey && project && project.key
                ? `${project.key}-${issue.issueKey}`
                : issue.issueKey
                ? `${issue.issueKey}`
                : '';

            const status: IssueStatusType | undefined =
              issueStatusTypeMap && issue.values.status
                ? issueStatusTypeMap[issue.values.status]
                : undefined;
            const lozengeColor =
              STATUS_COLOR_REMAP[status ? status.category.color : 'default'];

            return (
              <Row
                itemId={issue.id}
                items={children?.map((item) => ({ ...item, depth: depth + 1 }))}
                hasChildren={!isEmpty(children)}
                isDefaultExpanded
                isExpanded={childMatchesQuery || undefined}
              >
                <Cell>
                  <ItemCheckbox
                    item={item}
                    allDescendants={allDescendants}
                    selectedIssues={selectedIssues}
                    isDisabled={isDisabled}
                    onChange={() => {
                      setSelectedIssues((selectedIssues) =>
                        selectedIssues.includes(item.issue)
                          ? remove(item.issue, selectedIssues)
                          : [...selectedIssues, item.issue],
                      );
                    }}
                  />
                </Cell>
                <FullWidthCell>
                  <RowSummary>
                    <RowIndent depth={depth} />
                    <IssueSummary>
                      {icon}
                      <HighlightIssueLink
                        projectKey={project?.key}
                        issueKey={issue.issueKey}
                        issueLinkChunks={
                          searchQuery.trim()
                            ? splitString(searchQuery, issueLink)
                            : []
                        }
                        issueId={issue.id}
                        searchQuery={searchQuery}
                        activeSearchResult={activeSearchResult}
                      />
                      <HighlightSummary
                        summary={issue.values.summary}
                        numberOfIssueLinkChunks={
                          (searchQuery.trim()
                            ? splitString(searchQuery, issueLink)
                            : []
                          ).length
                        }
                        searchQuery={searchQuery}
                        id={issue.id}
                        activeSearchResult={activeSearchResult}
                        searchMatches={searchMatches}
                      />
                    </IssueSummary>

                    <RowMeatballsMenu>
                      <HiddenDropdownMenu
                        iconAltLabel={formatMessage(msgs.moreOptions)}
                        className="hidden-dropdown-menu"
                      >
                        <DropdownItemGroup>
                          <DropdownItem
                            onClick={() => {
                              setSelectedIssues((selected) => {
                                return uniq([
                                  ...selected,
                                  ...allDescendants.map(({ issue }) => issue),
                                ]);
                              });
                            }}
                          >
                            {formatMessage(msgs.selectThisAndAllDescendants)}
                          </DropdownItem>
                          <DropdownItem
                            onClick={() => {
                              setSelectedIssues((selected) => {
                                return remove(
                                  // Remove itself
                                  (oneItem) => oneItem === item.issue,
                                  uniq([
                                    ...selected,
                                    ...allDescendants.map(({ issue }) => issue),
                                  ]),
                                );
                              });
                            }}
                          >
                            {formatMessage(msgs.selectOnlyDescendants)}
                          </DropdownItem>
                        </DropdownItemGroup>
                      </HiddenDropdownMenu>
                    </RowMeatballsMenu>
                  </RowSummary>
                </FullWidthCell>
                <Cell>
                  <Lozenge appearance={lozengeColor}>
                    {status ? status.name : formatMessage(msgs.defaultStatus)}
                  </Lozenge>
                </Cell>
              </Row>
            );
          }}
        />
      </TableTree>
    </TableTreeContainer>
  );
};

export default Table;
