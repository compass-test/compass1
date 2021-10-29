import React from 'react';
import Tooltip from '@atlaskit/tooltip';
import { IconButton, SearchCSS } from '@atlaskit/atlassian-navigation';
import ArrowLeftIcon from '@atlaskit/icon/glyph/arrow-left';
import SelectClearIcon from '@atlaskit/icon/glyph/select-clear';
import { useTheme } from '../theme';
import { SearchIcon, LargeSearchIcon } from '../icons';
import {
  MobileSearchIconWrapper,
  DesktopSearchIconWrapper,
  SearchInputContainer,
  SearchInputField,
  ArrowIconWrapper,
  ClearIconWrapper,
  HiddenTooltip,
} from './search-input.styled';

export interface Props {
  /**
   * Whether the search input is currently in the expanded state or not.
   */
  isExpanded: boolean;
  /**
   * Callback that is called when the value in the search input changes
   */
  onInput?: (value: string) => void;
  /**
   * Callback that is called when the input is clicked
   */
  onClick?: (e?: React.MouseEvent<HTMLElement>) => void;
  /**
   * Callback that is called when the user pressed enter while focused on this input
   */
  onEnter?: (e: React.KeyboardEvent) => void;
  /**
   * Callback that is called when the user clicks the \`<-\` (back button). This button is only available when the screen is below a certain width (mobile mode).
   */
  onBack?: (e: React.MouseEvent<HTMLElement>) => void;
  /**
   * Placeholder text for the input
   */
  placeholder?: string;
  /**
   * Tooltip text for the input. The tooltip will appear when the user hovers over the input.
   */
  tooltipContent?: JSX.Element;
  /**
   * Value of the search input, if this provided then the component is considered controlled.
   */
  value?: string | number | string[];
  /**
   * Whether or not to show the x button that clears the input
   */
  showClearButton?: boolean;
  /**
   * Callback that is called to clear the search input.
   */
  onClear?: () => void;
  /**
   * Callback to set whether or not to allow the dialog to change expansion states
   */
  allowChangeExpand?: (expand: boolean) => void;
  /**
   * Label text for the Exit Search button
   */
  exitSearchLabel?: string;
  /**
   * Label text for the Clear Search button
   */
  clearSearchLabel?: string;
}

interface InternalProps {
  forwardRef?: React.Ref<HTMLInputElement>;
  theme: SearchCSS;
}

const MAX_INPUT_LENGTH = 500;

export const SearchInput: React.FunctionComponent<Props & InternalProps> = ({
  onInput,
  onClick,
  onEnter,
  isExpanded,
  placeholder,
  forwardRef,
  value,
  theme,
  tooltipContent,
  onBack,
  showClearButton,
  onClear,
  allowChangeExpand,
  exitSearchLabel,
  clearSearchLabel,
}) => {
  const handleInput = (e: React.FormEvent<HTMLInputElement>) => {
    if (onInput) {
      onInput(e.currentTarget.value);
    }
  };

  const handleClick = (e: React.MouseEvent<HTMLElement> | undefined) => {
    if (onClick) {
      onClick(e);
    }
  };

  const handleTabEnter = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && onClick) {
      onClick();
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.nativeEvent?.isComposing || e.keyCode === 229) {
      return;
    }
    if (!e.defaultPrevented && e.key === 'Enter') {
      e.preventDefault();
      onEnter && onEnter(e);
    }
  };

  const handleClear = () => {
    onClear?.();
  };

  const TooltipComponent =
    tooltipContent && !isExpanded ? undefined : HiddenTooltip;

  return (
    <Tooltip
      content={tooltipContent}
      component={TooltipComponent}
      position="bottom"
    >
      <SearchInputContainer {...theme} isExpanded={isExpanded}>
        <MobileSearchIconWrapper isExpanded={isExpanded}>
          <IconButton
            onClick={handleClick}
            tooltip={null}
            icon={<LargeSearchIcon />}
          />
        </MobileSearchIconWrapper>
        <DesktopSearchIconWrapper
          {...theme}
          isExpanded={isExpanded}
          onClick={handleClick}
          onKeyPress={handleTabEnter}
          tabIndex={0}
        >
          <SearchIcon />
        </DesktopSearchIconWrapper>
        {isExpanded && (
          <ArrowIconWrapper {...theme} onClick={onBack}>
            <ArrowLeftIcon
              label={exitSearchLabel || 'Exit Search'}
              size="large"
              primaryColor={theme.default.color}
            />
          </ArrowIconWrapper>
        )}
        <SearchInputField
          data-test-id="search-dialog-input"
          onInput={handleInput}
          onChange={handleInput}
          onKeyDown={handleKeyDown}
          onClick={handleClick}
          isExpanded={isExpanded}
          placeholder={placeholder}
          ref={forwardRef || undefined}
          value={value}
          maxLength={MAX_INPUT_LENGTH}
          {...theme}
        />
        {showClearButton && (
          <ClearIconWrapper
            {...theme}
            onClick={handleClear}
            onMouseEnter={() => {
              allowChangeExpand?.(false);
            }}
            onMouseLeave={() => {
              allowChangeExpand?.(true);
            }}
            tabIndex={0}
          >
            <SelectClearIcon
              label={clearSearchLabel || 'Clear search session'}
              size="small"
            />
          </ClearIconWrapper>
        )}
      </SearchInputContainer>
    </Tooltip>
  );
};

export default React.forwardRef<HTMLInputElement, Props>((props, ref) => {
  const theme = useTheme();
  return <SearchInput {...props} theme={theme} forwardRef={ref} />;
});
