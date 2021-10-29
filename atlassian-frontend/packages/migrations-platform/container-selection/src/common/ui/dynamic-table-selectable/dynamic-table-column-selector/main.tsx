import React from 'react';

import { FormattedMessage, InjectedIntlProps, injectIntl } from 'react-intl';

import { Checkbox } from '@atlaskit/checkbox';
import Dropdown, {
  DropdownItem,
  DropdownItemGroup,
} from '@atlaskit/dropdown-menu';
import ChevronDownIcon from '@atlaskit/icon/glyph/chevron-down';
import Tooltip from '@atlaskit/tooltip';
import { useCallbackWithAnalyticsController } from '@atlassian/mpt-analytics';

import type { ContainerUnit } from '../../../types';

import messages from './messages';
import { CheckboxWrapper, IconWrapper } from './styled';

type Props = {
  containerUnit: ContainerUnit;
  totalCount: number;
  currentPageItemKeys: string[];
  selectedItemKeys: string[];
  onSelectionChangeOnCurrentPage: (checked: boolean) => void;
  onSelectAllItems: () => void;
  onClearAllSelection: () => void;
};

const selectMessageForContainerUnit: Record<
  ContainerUnit,
  FormattedMessage.MessageDescriptor
> = {
  project: messages.selectAllProjectsOption,
  space: messages.selectAllSpacesOption,
  plan: messages.selectAllPlansOption,
};

const DynamicTableColumnSelector = ({
  totalCount,
  containerUnit,
  currentPageItemKeys,
  selectedItemKeys,
  onSelectionChangeOnCurrentPage,
  onSelectAllItems,
  onClearAllSelection,
  intl,
}: Props & InjectedIntlProps) => {
  const allCurrentRowsAreSelected = React.useMemo(() => {
    const selectedItemKeySet = new Set(selectedItemKeys);
    return currentPageItemKeys.length
      ? currentPageItemKeys.every((k) => selectedItemKeySet.has(k))
      : false;
  }, [selectedItemKeys, currentPageItemKeys]);

  const onCheckboxChange = React.useCallback(
    (e: React.ChangeEvent<HTMLInputElement>): void => {
      onSelectionChangeOnCurrentPage(e.target.checked);
    },
    [onSelectionChangeOnCurrentPage],
  );

  const onDropdownSelectAllCurrentPage = React.useCallback(() => {
    onSelectionChangeOnCurrentPage(true);
  }, [onSelectionChangeOnCurrentPage]);

  const withButtonClickedEvent1 = useCallbackWithAnalyticsController(
    onDropdownSelectAllCurrentPage,
    {
      eventType: 'UI',
      action: 'Clicked',
      actionSubject: 'Button',
      actionSubjectId: 'SelectAllOnCurrentPage',
    },
  );

  const withButtonClickedEvent2 = useCallbackWithAnalyticsController(
    onSelectAllItems,
    {
      eventType: 'UI',
      action: 'Clicked',
      actionSubject: 'Button',
      actionSubjectId: 'SelectAll',
    },
  );

  const withButtonClickedEvent3 = useCallbackWithAnalyticsController(
    onClearAllSelection,
    {
      eventType: 'UI',
      action: 'Clicked',
      actionSubject: 'Button',
      actionSubjectId: 'ClearAllSelection',
    },
  );

  return (
    <CheckboxWrapper>
      <Tooltip
        content={intl.formatMessage(messages.selectAllTooltip)}
        position="top"
      >
        <Checkbox
          testId="checkbox-select-all-in-current-page"
          isChecked={allCurrentRowsAreSelected}
          onChange={onCheckboxChange}
        />
      </Tooltip>
      <Tooltip
        content={intl.formatMessage(messages.selectOptionsTooltip)}
        position="top"
      >
        <Dropdown
          trigger={
            <IconWrapper data-testid="table-selector-dropdown-icon">
              <ChevronDownIcon label="open" size="large" />
            </IconWrapper>
          }
        >
          <DropdownItemGroup>
            <DropdownItem
              onClick={withButtonClickedEvent1}
              analyticsId="selectOnPageObjectsButton"
              data-testid="selector-dropdown-current-page"
            >
              {intl.formatMessage(messages.selectAllOnPageOption)}
            </DropdownItem>
            <DropdownItem
              onClick={withButtonClickedEvent2}
              analyticsId="selectAllObjectsButton"
              data-testid="selector-dropdown-all"
            >
              {intl.formatMessage(
                selectMessageForContainerUnit[containerUnit],
                {
                  totalCount,
                },
              )}
            </DropdownItem>
            <DropdownItem
              onClick={withButtonClickedEvent3}
              analyticsId="clearSelectionButton"
              data-testid="selector-dropdown-clear-all"
            >
              {intl.formatMessage(messages.clearAllSelectionOption)}
            </DropdownItem>
          </DropdownItemGroup>
        </Dropdown>
      </Tooltip>
    </CheckboxWrapper>
  );
};

export default injectIntl(DynamicTableColumnSelector);
