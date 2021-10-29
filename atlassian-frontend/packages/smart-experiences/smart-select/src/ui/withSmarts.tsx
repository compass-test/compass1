import React, { FC, useCallback, useEffect, useRef, useState } from 'react';

import cloneDeep from 'lodash/cloneDeep';
import debounce from 'lodash/debounce';
import noop from 'lodash/noop';
import type {
  DeselectOptionActionMeta,
  RemoveValueActionMeta,
} from 'react-select';
import uuid from 'uuid';

import { withAnalyticsEvents } from '@atlaskit/analytics-next';
import Select, { SelectProps } from '@atlaskit/select/src';
import {
  ActionMeta,
  InputActionMeta,
  OptionsType,
  OptionType,
  ValueType,
} from '@atlaskit/select/types';

import fireEvent from '../common/analytics';
import {
  Field,
  PartialSmartEvent,
  RankedFieldsRequest,
  RankedFieldsRequestResolver,
  SmartAnalyticsEvent,
  SmartSelectProps,
} from '../common/types';
import {
  areOptionsShallowEqual,
  dedupeOptions,
  flattenGroupedOptions,
  flattenOptions,
  getItemOrder,
  getSafeValue,
  hashString,
  isGrouped,
  toGroupedOptionsMapperFactory,
} from '../common/utils';
import fetchRankedFields from '../services/ranker';
import {
  name as packageName,
  version as packageVersion,
} from '../version.json';

const DEFAULT_DEBOUNCE_TIME_MS = 150;

export type IsMulti = boolean;
/**
 * withSmarts will Add smart analytics and optionally smart ranking to any component that uses SelectProps<Option, IsMulti>> props
 * Returns a component with additional SmartContext props
 * @param WrappedComponent - The component we wish to wrap with smarts, must implement SelectProps<Option, IsMulti>> props
 */
const withSmarts = (
  WrappedComponent: typeof Select,
): FC<SelectProps<OptionType, IsMulti> & SmartSelectProps> => {
  const WithSmarts: FC<SelectProps<OptionType, IsMulti> & SmartSelectProps> = (
    props: SelectProps<OptionType, IsMulti> & SmartSelectProps,
  ) => {
    const {
      createAnalyticsEvent,
      isLoading = false,
      onChange,
      onInputChange,
      onMenuClose,
      onMenuOpen,
      options = [], //empty if not provided
      smartContext,
    } = props;

    const requiresHashing =
      typeof smartContext.requiresHashing === 'undefined'
        ? true
        : smartContext.requiresHashing;

    const [originalSearchOptions, setOriginalSearchOptions] = useState<
      OptionsType<any> | undefined
    >([]);

    const [rankedOptions, setRankedOptions] = useState<OptionsType<any>>([]);
    const [query, setQuery] = useState<string>('');
    const [isFrsLoading, setIsFrsLoading] = useState<boolean>(false);
    const previousOptions = useRef<OptionsType<any> | undefined>([]);
    const journeyId = useRef<string>('');
    const sessionId = useRef<string>('');
    const sessionStartedAt = useRef<number>(-1);

    const fireAnalyticsEventWithDefaults = useCallback(
      (event: PartialSmartEvent<OptionType>) => {
        const {
          containerId,
          tenantId,
          fieldId,
          product,
          principalId,
        } = smartContext;
        const flattenedSelectedOptions = flattenOptions<OptionType>(
          event.additionalAttributes?.selectedOptions,
        );
        const smartAnalyticsEvent: SmartAnalyticsEvent<OptionType> = {
          componentName: 'select',
          containerId,
          createAnalyticsEvent,
          fieldId: fieldId || 'smartFieldPicker',
          query,
          isLoading,
          journeyId: journeyId.current,
          options: rankedOptions,
          packageName,
          packageVersion,
          principalId,
          product,
          requiresHashing,
          selectedOptions: flattenedSelectedOptions,
          sessionId: sessionId.current,
          sessionStartedAt: sessionStartedAt.current,
          tenantId,
          ...event,
        };
        fireEvent(smartAnalyticsEvent);
      },
      [
        createAnalyticsEvent,
        isLoading,
        journeyId,
        query,
        rankedOptions,
        requiresHashing,
        smartContext,
      ],
    );

    // maintain object reference to debounced fetchRankedFields to enable same debounced
    // function being called on every render
    const debouncedFetchRankedFields = useRef(
      debounce(
        (
          resolve: RankedFieldsRequestResolver<OptionType>,
          request: RankedFieldsRequest<OptionType>,
        ) => {
          return fetchRankedFields(request).then(resolve);
        },
        DEFAULT_DEBOUNCE_TIME_MS,
      ),
    ).current;

    const rankOptions = useCallback(
      async (options: OptionsType<any>): Promise<OptionsType<any>> => {
        const {
          objectId,
          containerId,
          hashKey,
          principalId,
          product,
          tenantId,
          fieldId,
          baseUrl,
        } = smartContext;
        let optionsToRank = options;

        const toGroupedOptionsMapper = toGroupedOptionsMapperFactory(options);
        if (isGrouped(options)) {
          // ungroup the grouped options. This may produce duplicate options.
          optionsToRank = flattenGroupedOptions(optionsToRank);
          if (optionsToRank.length === 0) {
            return options;
          }

          // Dedupe the options prior to FRS reranking (FRS otherwise throws 500)
          optionsToRank = dedupeOptions(optionsToRank);
        }

        // wrap debounced func in promise to enable it to be called via async/await
        const asyncDebouncedFetchRankedFields = (
          request: RankedFieldsRequest<OptionType>,
        ): Promise<OptionType[]> => {
          return new Promise((resolve) => {
            return debouncedFetchRankedFields(resolve, request);
          });
        };

        const rankFieldsRequest: RankedFieldsRequest<OptionType> = {
          baseUrl,
          objectId,
          containerId,
          hashKey,
          principalId,
          product,
          requiresHashing,
          tenantId,
          sessionId: sessionId.current,
          fieldId,
          values: optionsToRank.map((option) => {
            return ({
              id: option.value,
              value: option,
            } as unknown) as Field<OptionType>;
          }),
        };
        return toGroupedOptionsMapper(
          await asyncDebouncedFetchRankedFields(rankFieldsRequest),
        );
      },
      [smartContext, requiresHashing, debouncedFetchRankedFields],
    );

    const startSession = useCallback(() => {
      if (sessionId.current === '') {
        sessionId.current = uuid.v4();
      }

      sessionStartedAt.current = performance.now();

      fireAnalyticsEventWithDefaults({
        action: 'started',
        actionSubject: 'optionSelectionSession',
        eventType: 'ui',
      });
    }, [fireAnalyticsEventWithDefaults, sessionId, sessionStartedAt]);

    const endSession = useCallback(() => {
      if (sessionId.current !== undefined) {
        fireAnalyticsEventWithDefaults({
          action: 'ended',
          actionSubject: 'optionSelectionSession',
          eventType: 'ui',
        });
      }

      sessionId.current = '';
      sessionStartedAt.current = 0;
    }, [fireAnalyticsEventWithDefaults, sessionId, sessionStartedAt]);

    const restartSession = useCallback(() => {
      endSession();
      startSession();
    }, [endSession, startSession]);

    const doOnChange = (
      selectedOptionOrOptions: ValueType<OptionType>,
      actionMeta: ActionMeta,
    ) => {
      const { hashKey, tenantId } = smartContext;
      if (actionMeta) {
        // last item of selectedOptions is the most recent selected option
        const selectedOption = Array.isArray(selectedOptionOrOptions)
          ? selectedOptionOrOptions[selectedOptionOrOptions.length - 1]
          : selectedOptionOrOptions;
        switch (actionMeta.action) {
          // acts as a select-option if a new option is created
          case 'create-option':
          case 'select-option':
            if (selectedOption) {
              const selectedOptionValue: string = selectedOption.value?.toString();
              selectedOptionValue &&
                fireAnalyticsEventWithDefaults({
                  action: 'changed',
                  actionSubject: 'option',
                  eventType: 'ui',
                  additionalAttributes: {
                    selectedOption: getSafeValue(
                      hashKey || tenantId,
                      selectedOptionValue,
                      requiresHashing,
                    ),
                    selectedOrder: getItemOrder(
                      selectedOptionValue,
                      originalSearchOptions,
                    ),
                    selectedOptions: selectedOptionOrOptions,
                  },
                });

              restartSession();
            }
            break;
          case 'pop-value':
          case 'deselect-option':
          case 'remove-value':
            const removedOptionValue =
              (actionMeta as RemoveValueActionMeta<
                OptionType
              >).removedValue?.value?.toString() ||
              (actionMeta as DeselectOptionActionMeta<
                OptionType
              >).option?.value?.toString();
            removedOptionValue &&
              fireAnalyticsEventWithDefaults({
                action: 'removed',
                actionSubject: 'option',
                eventType: 'ui',
                additionalAttributes: {
                  removedItem: requiresHashing
                    ? hashString(hashKey || tenantId, removedOptionValue)
                    : removedOptionValue,
                  selectedOptions: selectedOptionOrOptions,
                },
              });
            break;
        }
      }
      onChange && onChange(selectedOptionOrOptions, actionMeta);
    };

    const doOnMenuOpen = () => {
      fireAnalyticsEventWithDefaults({
        action: 'opened',
        actionSubject: 'optionSelect',
        eventType: 'ui',
      });
      onMenuOpen && onMenuOpen();
    };

    const doOnMenuClose = () => {
      fireAnalyticsEventWithDefaults({
        action: 'closed',
        actionSubject: 'optionSelect',
        eventType: 'ui',
      });
      onMenuClose && onMenuClose();
    };

    const doOnInputChange = (value: string, actionMeta: InputActionMeta) => {
      setQuery(value);
      if (
        actionMeta?.action === 'input-change' ||
        actionMeta?.action === 'set-value'
      ) {
        fireAnalyticsEventWithDefaults({
          action: 'changed',
          actionSubject: 'filter',
          eventType: 'ui',
        });
      }
      onInputChange && onInputChange(value, actionMeta);
    };

    useEffect(
      () => {
        if (journeyId.current === '' || sessionId.current === '') {
          const startedAt = performance.now();
          const id = uuid.v4();
          journeyId.current = id;
          sessionId.current = id;
          sessionStartedAt.current = startedAt;

          fireAnalyticsEventWithDefaults({
            action: 'started',
            actionSubject: 'optionSelectionSession',
            eventType: 'ui',
          });
        }

        return () => {
          // fire on unmount
          fireAnalyticsEventWithDefaults({
            action: 'ended',
            actionSubject: 'optionSelectionSession',
            eventType: 'ui',
          });
        };
      },
      // Empty dep array ensures componentWillMount/componentWillUnmount is properly simulated
      // eslint-disable-next-line react-hooks/exhaustive-deps
      [],
    );

    /***
     * If options change then possibly re-rank
     */
    useEffect(() => {
      /**
       * Re-rank the options if they have changed and smartRank is true
       */
      const updateOptions = async () => {
        //If there are no options or they have not changed then return
        if (
          !options ||
          areOptionsShallowEqual(options, previousOptions.current)
        ) {
          return;
        }
        previousOptions.current = cloneDeep(options);
        if (smartContext.smartRank) {
          setIsFrsLoading(true);
          const rankedOptions = await rankOptions(options as OptionsType);
          setIsFrsLoading(false);
          setRankedOptions(rankedOptions);
          setOriginalSearchOptions(options);
        } else {
          setRankedOptions(options);
          const flattenedOptions = flattenOptions<OptionType>(
            options as OptionsType,
          );
          setOriginalSearchOptions(flattenedOptions);
        }
      };
      updateOptions();
    }, [options, rankOptions, smartContext.smartRank]);

    return (
      <WrappedComponent
        {...(props as any)}
        onChange={doOnChange}
        options={rankedOptions}
        onMenuOpen={doOnMenuOpen}
        onMenuClose={doOnMenuClose}
        onInputChange={doOnInputChange}
        isLoading={isLoading || isFrsLoading}
      />
    );
  };

  // @ts-ignore
  WithSmarts.displayName = `WithSmarts(${
    // @ts-ignore displayName doesn't exist on type
    WrappedComponent.displayName || WrappedComponent.name
  })`;

  WithSmarts.defaultProps = {
    onChange: noop,
    onInputChange: noop,
    onMenuOpen: noop,
    onMenuClose: noop,
  };
  return withAnalyticsEvents()(WithSmarts);
};

export default withSmarts;
