import React, {
  FC,
  MouseEvent,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';

import flatten from 'lodash/fp/flatten';
import get from 'lodash/fp/get';
import remove from 'lodash/fp/remove';
import sortBy from 'lodash/fp/sortBy';
import { FormattedMessage } from 'react-intl';

import Button from '@atlaskit/button/custom-theme-button';
import ChevronDownIcon from '@atlaskit/icon/glyph/chevron-down';
import EditorCloseIcon from '@atlaskit/icon/glyph/editor/close';
import Select, {
  components,
  MenuProps,
  OptionsType,
  ValueContainerProps,
} from '@atlaskit/select';
import Spinner from '@atlaskit/spinner';
import TextField from '@atlaskit/textfield';

import msgs from './messages';
import Popup from './popup';
import {
  ExcludedFromPlanTitle,
  List,
  ListContainer,
  ListItem,
  LoadingContainer,
  PopupComponent,
  PopupContentContainer,
  TriggerLoading,
} from './styled';
import { Props } from './types';

const PopupMultiSelect = <T extends { id: string }>({
  testId,
  fieldProps,
  error,
  valid,
  loading,
  loadingMessage,
  noOptionsMessage,
  optionsMap,
  renderSelectedOption,
  noneExcludedMessage,
  searchPlaceholder,
  children,
}: Props<T>) => {
  const popupContainer = useRef<HTMLDivElement>(null);
  const triggerContainer = useRef<HTMLDivElement>(null);
  const selectRef = useRef<HTMLDivElement>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [selectedExclusions, setSelectedExclusions] = useState<OptionsType<T>>(
    [],
  );
  const [popUpWidth, setPopUpWidth] = useState(600);
  const MemoizedPopupComponent = useMemo(() => PopupComponent(popUpWidth), [
    popUpWidth,
  ]);

  useEffect(
    () => {
      const allOptions = optionsMap
        ? flatten(optionsMap.map((option) => option.options))
        : [];

      const result = (fieldProps.value || [])
        .map((id) => {
          return allOptions.find((option) => String(option.id) === String(id));
        })
        .filter((option) => !!option) as T[];

      setSelectedExclusions(result);
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [optionsMap],
  );

  const MemoizedValueContainer: FC<ValueContainerProps<T, true>> = useMemo(
    () => ({ children }) => {
      // Have to hack internals of react-select
      const onChange = get('1.props.onChange', children);
      const onBlur = get('1.props.onBlur', children);
      const handleOnClick = (e: MouseEvent<HTMLInputElement>) => {
        e.stopPropagation();
        setIsSearchOpen((currentlyOpen) => !currentlyOpen);
      };

      return (
        <TextField
          autoFocus
          testId={testId + '_input'}
          onChange={onChange}
          onClick={handleOnClick}
          onKeyPress={() => {
            setIsSearchOpen(true);
          }}
          onBlur={onBlur}
          isCompact
          elemAfterInput={
            <div onClick={handleOnClick}>
              <ChevronDownIcon label="exclude issue types" />
            </div>
          }
          placeholder={searchPlaceholder}
        />
      );
    },
    [searchPlaceholder, testId],
  );

  useEffect(() => {
    setPopUpWidth(
      triggerContainer.current ? triggerContainer.current.clientWidth : 0,
    );
  }, [triggerContainer]);

  const handleClickOutside = useCallback((event) => {
    const clickedInside = [
      popupContainer,
      triggerContainer,
      selectRef,
    ].some((ref) => ref.current?.contains(event.target));

    // If we clicked inside the poup or the select we do nothing
    if (clickedInside) {
      return;
    }

    setIsSearchOpen((isOpen) => {
      if (!isOpen) {
        setIsDialogOpen(false);
      }
      return false;
    });
  }, []);

  const handleEscKey = useCallback((e) => {
    if (e.key !== 'Escape') {
      return;
    }

    setIsSearchOpen((isOpen) => {
      if (!isOpen) {
        setIsDialogOpen(false);
      }
      return false;
    });
  }, []);

  useEffect(() => {
    window.addEventListener('click', handleClickOutside);
    window.addEventListener('keyup', handleEscKey);
    return () => {
      window.removeEventListener('click', handleClickOutside);
      window.removeEventListener('keyup', handleEscKey);
    };
  }, [handleClickOutside, handleEscKey]);

  const toggleExclusion = (option: T) => {
    if (!selectedExclusions) {
      setSelectedExclusions([option]);
      fieldProps.onChange([option.id]);
      return;
    }

    if (Array.isArray(selectedExclusions)) {
      const newExclusions = selectedExclusions.includes(option)
        ? remove(
            (currentOption) => option === currentOption,
            selectedExclusions,
          )
        : sortBy(['name'], selectedExclusions.concat(option));
      setSelectedExclusions(newExclusions);
      fieldProps.onChange(newExclusions.map((item) => item.id));
    } else {
      // We dont support single select no use case for now
    }
  };

  const Menu = ({ children, ...rest }: MenuProps<T, true>) => (
    <div ref={selectRef} onClick={(e) => e.stopPropagation()}>
      <components.Menu {...rest}>{children}</components.Menu>
    </div>
  );

  const content = (
    <div ref={popupContainer} onClick={() => setIsSearchOpen(false)}>
      <PopupContentContainer>
        {loading ? (
          <LoadingContainer>{loadingMessage}</LoadingContainer>
        ) : (
          <ListContainer>
            <Select<T, true>
              id={testId + '_select'}
              isMulti
              menuIsOpen={isSearchOpen}
              options={optionsMap && Object.values(optionsMap)}
              formatOptionLabel={renderSelectedOption}
              isOptionSelected={(option, options) =>
                !!options.find(({ id }) => id === option.id)
              }
              onChange={(selection) => {
                if (!selection) {
                  return;
                } else {
                  setSelectedExclusions(selection);
                  fieldProps.onChange(selection.map((item) => item.id));
                }
              }}
              isSearchable
              closeMenuOnSelect={false}
              isClearable={false}
              components={{
                Menu,
                ValueContainer: MemoizedValueContainer,
                DropdownIndicator: null,
                LoadingIndicator: null,
              }}
              value={selectedExclusions}
              filterOption={(option, rawInput = '') => {
                if (!option.data.name) {
                  return true;
                }
                return option.data.name
                  .toLowerCase()
                  .includes(rawInput.toLowerCase());
              }}
              backspaceRemovesValue={false}
              noOptionsMessage={() => noOptionsMessage || null}
              styles={{
                control: (provided) => ({
                  ...provided,
                  border: 0,
                  background: 0,
                  '&:hover': { background: '0 !important' },
                }),
              }}
            />
            <List>
              <ExcludedFromPlanTitle>
                {selectedExclusions.length ? (
                  <FormattedMessage {...msgs.excludedFromPlan} />
                ) : (
                  noneExcludedMessage
                )}
              </ExcludedFromPlanTitle>
              {selectedExclusions.map((option: T, index) => (
                <ListItem key={option.id}>
                  <span>{renderSelectedOption(option)}</span>
                  <Button
                    testId={testId + `_remove_${index}`}
                    appearance="subtle"
                    onClick={(e) => {
                      e.stopPropagation();
                      setIsSearchOpen(false);
                      toggleExclusion(option);
                    }}
                    iconBefore={<EditorCloseIcon label="close" />}
                  ></Button>
                </ListItem>
              ))}
            </List>
          </ListContainer>
        )}
      </PopupContentContainer>
    </div>
  );

  return (
    <>
      <Popup
        isOpen={isDialogOpen}
        onClose={fieldProps.onBlur}
        content={content}
        popupComponent={MemoizedPopupComponent}
        trigger={
          <div ref={triggerContainer}>
            <Button
              testId={testId}
              shouldFitContainer
              isSelected={isDialogOpen}
              onClick={(e) => {
                setIsDialogOpen(!isDialogOpen);
              }}
              theme={(current, props) => {
                const originalStyles = current(props);
                return {
                  ...originalStyles,
                  buttonStyles: {
                    ...originalStyles.buttonStyles,
                    textAlign: 'left',
                  },
                };
              }}
              iconAfter={
                <TriggerLoading>
                  {loading ? <Spinner size="small" /> : null}
                  <ChevronDownIcon label="exclude issue types" />
                </TriggerLoading>
              }
            >
              {Array.isArray(selectedExclusions)
                ? children(selectedExclusions)
                : null}
            </Button>
          </div>
        }
      ></Popup>
      {error ? error : null}
    </>
  );
};

export default PopupMultiSelect;
