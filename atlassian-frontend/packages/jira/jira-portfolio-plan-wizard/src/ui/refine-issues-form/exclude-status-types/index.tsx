import React from 'react';

import groupBy from 'lodash/fp/groupBy';
import uniqBy from 'lodash/fp/uniqBy';
import { FormattedMessage } from 'react-intl';

import Lozenge, { ThemeAppearance } from '@atlaskit/lozenge';

import { IssueStatusCategory, IssueStatusType } from '../../../common/types';
import PopupMultiSelect from '../../../common/ui/popup-multi-slect';
import { useIntl } from '../../../common/utils/intl';

import msgs from './messages';
import { Props } from './types';

export const CATEGORY_PREFIX = 'CATEGORY_PREFIX_';

const COLOR_REMAP: {
  [color: string]: ThemeAppearance;
} = {
  'medium-gray': 'default',
  'blue-gray': 'default',
  yellow: 'inprogress',
  green: 'success',
};

const ExcludeStatusTypes = ({
  fieldProps,
  error,
  valid,
  loading,
  statusTypeMap,
}: Props) => {
  const { formatMessage } = useIntl();
  const availableCategories = uniqBy(
    (category) => String(category.id),
    Object.values(statusTypeMap || [])
      .map((statusTypeMap) => statusTypeMap.category)
      .map((category) => ({ ...category, id: CATEGORY_PREFIX + category.id })),
  );

  const groupedByCategory = groupBy(
    (statusType: IssueStatusType) => statusType.category.id,
    Object.values(statusTypeMap || []),
  );

  const groupedOptions = Object.entries(groupedByCategory).map(
    ([key, value]) => {
      const category = availableCategories.find(
        (category) => category.id === CATEGORY_PREFIX + key,
      );

      return {
        label: category ? category.name : '',
        options: groupedByCategory[key],
      };
    },
  );

  const allCategoryOptions = {
    label: '',
    options: availableCategories,
  };

  return (
    <PopupMultiSelect<IssueStatusType | IssueStatusCategory>
      testId="exclude-status-type"
      fieldProps={fieldProps}
      valid={valid}
      optionsMap={[allCategoryOptions, ...groupedOptions]}
      loading={loading}
      loadingMessage={formatMessage(msgs.statusLoading)}
      noOptionsMessage={formatMessage(msgs.statusNoOptions)}
      noneExcludedMessage={formatMessage(msgs.noStatusesExcluded)}
      searchPlaceholder={formatMessage(msgs.chooseStatusPlaceholder)}
      renderSelectedOption={(categoryOrStatus) => {
        const isAllCategory = !(categoryOrStatus as IssueStatusType).category;
        const category =
          (categoryOrStatus as IssueStatusType).category || categoryOrStatus;

        if (isAllCategory) {
          return (
            <FormattedMessage
              {...msgs.allStatusesFromCategory}
              values={{
                categoryName: (
                  <Lozenge appearance={COLOR_REMAP[category.color]}>
                    {category.name}
                  </Lozenge>
                ),
              }}
            />
          );
        }

        return (
          <Lozenge appearance={COLOR_REMAP[category.color]}>
            {categoryOrStatus.name}
          </Lozenge>
        );
      }}
    >
      {(selectedExclusions) =>
        `${formatMessage(msgs.status)}: ${selectedExclusions
          .map((statusOrCategory) => {
            if ((statusOrCategory as IssueStatusType).category) {
              return statusOrCategory.name;
            }
            return formatMessage(msgs.allStatusesFromCategory, {
              categoryName: statusOrCategory.name,
            });
          })
          .join(', ')}`
      }
    </PopupMultiSelect>
  );
};

export default ExcludeStatusTypes;
