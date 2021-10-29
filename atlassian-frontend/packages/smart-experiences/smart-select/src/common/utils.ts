import uniqBy from 'lodash/uniqBy';
import { createHash } from 'rusha';

import {
  GroupedOptionsType,
  GroupType,
  OptionsType,
  OptionType,
} from '@atlaskit/select/types';

export const hashString = (salt: string, value?: string | number): string => {
  if (!value || value === '') {
    return '';
  }
  const stringValue = `${value}`;
  return createHash().update(`${salt}_${stringValue.trim()}`).digest('hex');
};

// consumers often use the UGC label instead of the option's ID for the value field.
// Hash it to stop potential UGC leak.
export const getOptionIdsForAnalytics = (
  hashKey: string,
  items: OptionsType<any>,
  requiresHashing: boolean,
): any[] =>
  flattenGroupedOptions(items).map(({ value }) =>
    requiresHashing ? hashString(hashKey, value) : value,
  );

export const getSafeValue = (
  hashKey: string,
  value: string,
  requiresHashing: boolean,
): string => (requiresHashing ? hashString(hashKey, value.toString()) : value);

export const getSafeOptionsForAnalytics = (
  hashKey: string,
  items: OptionsType<any>,
  requiresHashing: boolean,
): String[] =>
  flattenGroupedOptions(items).map(({ label }) =>
    requiresHashing ? hashString(hashKey, label) : label,
  );

export const getOptionsLengths = (items: OptionsType<any>): number[] =>
  flattenGroupedOptions(items)
    .filter((item) => item.label)
    .map(({ label }) => (label != null ? `${label}`.length : 0));

export const getItemOrder = (
  selectedItem: string,
  options: OptionsType | undefined,
) => {
  if (options === undefined) {
    return -1;
  }

  const matchedIndexes: number[] = [];
  flattenGroupedOptions(options).forEach((option, index) => {
    const filterValues = option.filterValues || [];
    if (option.value === selectedItem || filterValues.includes(selectedItem)) {
      matchedIndexes.push(index);
    }
  });

  return matchedIndexes.length > 0 ? matchedIndexes[0] : -1;
};

const isAGroupedOptionType = (option: GroupType<any> | OptionType) => {
  return option.options !== undefined;
};

export const isGrouped = (
  options: GroupedOptionsType<any> | OptionsType<any> | undefined,
): boolean => {
  if (options === undefined) {
    return false;
  }
  const isGroups = options.every(isAGroupedOptionType);
  return isGroups;
};

export const dedupeOptions = (options: OptionsType<any>) => {
  return uniqBy(options, 'value');
};

export const flattenOptions = <Option>(
  options:
    | ReadonlyArray<Option>
    | Option
    | GroupedOptionsType<Option>
    | null
    | void,
): OptionsType<Option> => {
  if (options == null) {
    return [];
  }
  return Array.isArray(options) ? options : [options];
};

export const flattenGroupedOptions = (
  options: GroupedOptionsType<any> | OptionsType<any>,
): OptionsType<any> =>
  isGrouped(options)
    ? (options as GroupedOptionsType<any>).reduce(
        (collectedOptions: OptionsType<any>, option: GroupType<any>) => [
          ...collectedOptions,
          ...option.options,
        ],
        [],
      )
    : options;

/**
 * This factory returns a mapper that maps the reranked FRS labels to options to show in the suggestions.
 * If the options are grouped, it will rerank the nested options within the grouped options
 * based on the ranking suggested by FRS.
 *
 * If the options are not grouped, the reranked FRS suggestions will be returned as-is.
 *
 * @param options input options from consumer
 * @returns mapper that maps the reranked FRS labels to options to show in the suggestions
 */
export const toGroupedOptionsMapperFactory = (
  options: GroupedOptionsType<any> | OptionsType<any>,
) => {
  if (isGrouped(options)) {
    const groupedOptions = options as GroupedOptionsType<any>;
    // due to possible duplication of options across groups, optionsToGroupsMap will map
    // option values to the groups they belong to.
    const optionsToGroupsMap = groupedOptions.reduce<{
      [key: string]: number[];
    }>((map, groupedOption, idx) => {
      groupedOption.options.forEach((option: OptionType) => {
        if (map[option.value]) {
          map[option.value].push(idx);
        } else {
          map[option.value] = [idx];
        }
      });
      return map;
    }, {});

    return (rerankedOptions: OptionType[]) => {
      // use the ranked options to populate the groups in order.
      const optionsToReturn: GroupedOptionsType<any> = [...options];
      optionsToReturn.forEach((groupedOption) => {
        groupedOption.options = [];
      });
      rerankedOptions.forEach((rerankedOption) => {
        optionsToGroupsMap[rerankedOption.value].forEach((idx) => {
          optionsToReturn[idx].options = [
            ...optionsToReturn[idx].options,
            rerankedOption,
          ];
        });
      });
      return optionsToReturn;
    };
  }

  // for the non-grouped case, return the FRS response
  return (rerankedOptions: OptionType[]) => {
    return rerankedOptions;
  };
};

export const shallowEqual = (objA?: Object, objB?: Object) => {
  if (objA === objB) {
    return true;
  }
  if (objA == null || objB == null) {
    return false;
  }

  const keysA = Object.keys(objA);
  const keysB = Object.keys(objB);

  if (keysA.length !== keysB.length) {
    return false;
  }

  const bHasOwnProperty = Object.prototype.hasOwnProperty.bind(objB);

  for (let idx = 0; idx < keysA.length; idx++) {
    const key = keysA[idx];

    if (!bHasOwnProperty(key)) {
      return false;
    }

    if ((objA as any)[key] !== (objB as any)[key]) {
      return false;
    }
  }

  return true;
};

export const areOptionsShallowEqual = <T>(
  left: ReadonlyArray<T> | undefined,
  right: ReadonlyArray<T> | undefined,
  compareFn: (left: T, right: T) => boolean = shallowEqual,
) => {
  if (left === undefined || right === undefined) {
    return left === right;
  }
  if (left.length !== right.length) {
    return false;
  }

  for (let idx = 0; idx < left.length; idx++) {
    if (!compareFn(left[idx], right[idx])) {
      return false;
    }
  }

  return true;
};
