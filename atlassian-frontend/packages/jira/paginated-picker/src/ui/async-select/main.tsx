import React, { useCallback, useEffect, useState } from 'react';

import findIndex from 'lodash/findIndex';
import findLast from 'lodash/findLast';

import { ActionMeta, makeAsyncSelect } from '@atlaskit/select';

import type {
  AsyncLoadOptionsData,
  ProxyBaseSelectProps,
  SelectOption,
  SelectOptions,
  SelectOrErrorOptions,
  SelectValues,
  SingleOption,
} from '../../common/types';

import ClearSelectedItemsButton from './clear-selection-button';
import MenuList from './menu-list';
import PaginationDetails from './pagination-details';
import { BaseSelect, selectComponents } from './select';
import ShowFullListButton from './show-full-list-button';
import { Footer } from './styled';
import type { IsError, PaginatedAsyncSelectViewProps } from './types';

const MAX_TOTAL_COUNT = 1000; // To be cleaned up in EM-3568

const paginatedComponents = { ...selectComponents, MenuList };

const ProxyBaseSelect = ({ selectOptions, ...props }: ProxyBaseSelectProps) => {
  return selectOptions ? (
    <BaseSelect {...props} options={selectOptions} />
  ) : (
    <BaseSelect {...props} />
  );
};

const AsyncSelect = makeAsyncSelect(ProxyBaseSelect);

/**
 * Adds option to the list of options if its value isn't currently in the Set of keys
 */
const addUniqueOptions = (
  keys: Set<string>,
  options: SelectOption[],
  option: SelectOption,
) => {
  if (option.optionType === 'group') {
    const groupOptions: SingleOption[] = [];
    option.options.forEach(groupOption => {
      addUniqueOptions(keys, groupOptions, groupOption);
    });
    options.push({ ...option, options: groupOptions });
    return;
  }

  // Add single options:
  if (!keys.has(option.value)) {
    keys.add(option.value);
    options.push(option);
  }
};

const generateOptions = (
  selectedValues: SelectValues,
  newOptions: SelectOptions,
  addSelectedFirst: boolean,
  previousOptions?: SelectOptions,
): SelectOption[] => {
  const optionKeys = new Set<string>();
  const options: SelectOption[] = [];

  if (addSelectedFirst) {
    selectedValues.forEach(option => {
      addUniqueOptions(optionKeys, options, option);
    });
  }

  previousOptions?.forEach(option => {
    addUniqueOptions(optionKeys, options, option);
  });

  newOptions.forEach(option => {
    addUniqueOptions(optionKeys, options, option);
  });

  return options;
};

const getLastCursorOption = (
  options: SelectOptions,
): SelectOption | undefined =>
  findLast(options, option => 'cursor' in option && !!option.cursor);

// Needed to disable filtering from react-select
const noFilterOptions = () => true;
const noLoadOptions = () => {};

export const countSingleOptions = (options: SelectOptions) =>
  options
    .map(option => (option.optionType === 'group' ? option.options.length : 1))
    .reduce((sumSoFar, count) => sumSoFar + count, 0);

export const PaginatedAsyncSelectView = ({
  field,
  value,
  onChange,
  onClear,
  initiallyAddSelectedFirst,
  ...restProps
}: PaginatedAsyncSelectViewProps) => {
  const [page, setPage] = useState<number>(0);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isPaginationLoading, setIsPaginationLoading] = useState<boolean>(
    false,
  );
  const [inputValue, setInputValue] = useState<string>('');
  const [loadedOptions, setLoadedOptions] = useState<SelectOptions>([]);
  const [enableFullList, setEnableFullList] = useState<boolean>(
    field.pagination?.enableFullList ?? false,
  );
  const [totalCount, setTotalCount] = useState<number | null>(null);
  const [error, setError] = useState<IsError>({
    isError: false,
    error: null,
    onRetry: null,
  });

  const getTotalCountWithFunctions = useCallback<
    (newTotalCount: number | null) => number | null
  >(
    newTotalCount => {
      if (newTotalCount === null || !field.pagination?.keywordValues?.length) {
        return newTotalCount;
      }

      const {
        pagination: { keywordValues },
      } = field;
      const newTotalCountWithKeywords =
        newTotalCount +
        value.filter(option => keywordValues.includes(option.value)).length;

      return newTotalCountWithKeywords < MAX_TOTAL_COUNT
        ? newTotalCountWithKeywords
        : MAX_TOTAL_COUNT;
    },
    [field, value],
  );

  const checkIfError = useCallback(
    (
      search: string,
      options: SelectOrErrorOptions,
      onRetry: () => void,
    ): boolean => {
      if (options.some(option => option.optionType === 'error')) {
        setError({
          isError: true,
          error: null,
          onRetry,
        });
        setIsLoading(false);
        return true;
      }

      setError({
        isError: false,
        error: null,
        onRetry: null,
      });
      return false;
    },
    [],
  );

  const handleLoadOptions = useCallback(
    (search: string): void => {
      const { loadOptions } = field;
      if (!loadOptions) {
        return;
      }

      setIsLoading(true);
      loadOptions(
        search,
        enableFullList,
        false,
        false,
        undefined,
        ({ options, totalCount: newTotalCount }: AsyncLoadOptionsData) => {
          if (checkIfError(search, options, () => handleLoadOptions(search))) {
            return;
          }

          setLoadedOptions(
            generateOptions(
              value,
              options as SelectOptions,
              initiallyAddSelectedFirst,
            ),
          );
          setTotalCount(
            search ? newTotalCount : getTotalCountWithFunctions(newTotalCount),
          );
          setIsLoading(false);
        },
      );
    },
    [
      field,
      enableFullList,
      checkIfError,
      value,
      initiallyAddSelectedFirst,
      getTotalCountWithFunctions,
    ],
  );

  const handleShowMore = useCallback(
    (showFullList: boolean = false, isRetry: boolean = false) => {
      const { loadOptions } = field;
      if (!loadOptions) {
        return;
      }

      let originalLoadedOptions: SelectOptions;
      if (showFullList) {
        originalLoadedOptions = [];
        setIsLoading(true);
      } else {
        originalLoadedOptions = loadedOptions;
        if (isRetry) {
          setIsLoading(true);
        } else {
          setIsPaginationLoading(true);
        }
      }

      loadOptions(
        inputValue,
        false,
        showFullList,
        true,
        getLastCursorOption(loadedOptions),
        ({ options, totalCount: newTotalCount }) => {
          if (
            checkIfError(inputValue, options, () => {
              handleShowMore(showFullList, true);
            })
          ) {
            return;
          }

          setPage(page + 1);
          setEnableFullList(false);
          setLoadedOptions(
            generateOptions(
              value,
              options as SelectOptions,
              showFullList,
              originalLoadedOptions,
            ),
          );
          setTotalCount(
            inputValue
              ? newTotalCount
              : getTotalCountWithFunctions(newTotalCount),
          );
          setIsPaginationLoading(false);
          setIsLoading(false);
        },
      );
    },
    [
      field,
      loadedOptions,
      inputValue,
      checkIfError,
      value,
      page,
      getTotalCountWithFunctions,
    ],
  );

  const handleShowFullList = useCallback(() => {
    handleShowMore(true, false);
  }, [handleShowMore]);

  const handleInputChange = useCallback(
    (newInputValue: string) => {
      const { onInputChange } = field;

      setEnableFullList(false);
      setPage(0);
      setInputValue(newInputValue);
      setTotalCount(null);
      setLoadedOptions([]);

      handleLoadOptions(newInputValue);

      onInputChange && onInputChange();
    },
    [field, handleLoadOptions],
  );

  const handleOnChange = useCallback(
    (options: SelectValues, action: ActionMeta<SelectOption>): void => {
      let selectData;
      if ('option' in action) {
        const actionOption = action.option;
        if (actionOption && 'value' in actionOption) {
          selectData = {
            selectedIndex: findIndex(
              loadedOptions,
              option =>
                'value' in option && option.value === actionOption.value,
            ),
          };
        }
      }
      onChange?.(options, action, selectData);
    },
    [onChange, loadedOptions],
  );

  // We only want to call this on init, so it's ok to disable react-hooks/exhaustive-deps
  useEffect(() => {
    handleLoadOptions('');
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const loadedOptionsCount =
    totalCount === null ? 0 : countSingleOptions(loadedOptions);

  return (
    <>
      <AsyncSelect
        cacheOptions={field.cacheOptions}
        // @ts-ignore
        components={paginatedComponents}
        defaultOptions={field.defaultOptions}
        defaultOptionsLabel={field.defaultOptionsLabel}
        inputValue={inputValue}
        loadOptions={noLoadOptions}
        onInputChange={handleInputChange}
        onMenuScrollToBottom={field.onMenuScrollToBottom}
        onMenuScrollToTop={field.onMenuScrollToTop}
        placeholder={field.placeholder}
        fieldKey={field.key}
        fieldLabel={field.label}
        fieldInvalidLabel={field.invalidLabel}
        selectOptions={loadedOptions}
        onFilterOption={noFilterOptions}
        menuListProps={{
          error,
          type: field.key,
          handleShowMore,
          isLoading,
          isPaginationLoading,
          showShowMoreButton:
            totalCount !== null && loadedOptionsCount < totalCount,
        }}
        onChange={handleOnChange}
        value={value}
        {...restProps}
      />
      {field.pagination &&
        !isLoading &&
        !!loadedOptions?.length &&
        !error.isError && (
          <Footer>
            {!value.length && enableFullList && (
              <ShowFullListButton
                type={field.key}
                onShowFullList={handleShowFullList}
              />
            )}
            {!!value.length && (
              <ClearSelectedItemsButton onClear={onClear} type={field.key} />
            )}
            {!enableFullList && totalCount !== null && (
              <PaginationDetails
                itemsCount={loadedOptionsCount}
                totalCount={totalCount}
              />
            )}
          </Footer>
        )}
    </>
  );
};

export default PaginatedAsyncSelectView;
