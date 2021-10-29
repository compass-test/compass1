/** @jsx jsx */
import { useCallback } from 'react';

import { CSSObject, jsx } from '@emotion/core';

import Button from '@atlaskit/button/standard-button';
import { KEY_DOWN } from '@atlaskit/ds-lib/keycodes';
import noop from '@atlaskit/ds-lib/noop';
import useControlledState from '@atlaskit/ds-lib/use-controlled';
import useFocus from '@atlaskit/ds-lib/use-focus-event';
import useKeydownEvent from '@atlaskit/ds-lib/use-keydown-event';
import ExpandIcon from '@atlaskit/icon/glyph/chevron-down';
import Popup, { TriggerProps } from '@atlaskit/popup';
import Spinner from '@atlaskit/spinner';
import { gridSize, visuallyHidden } from '@atlaskit/theme/constants';

import FocusManager from './internal/components/focus-manager';
import MenuWrapper from './internal/components/menu-wrapper';
import SelectionStore from './internal/context/selection-store';
import type { DropdownMenuProps } from './types';

const spinnerContainerStyles: CSSObject = {
  display: 'flex',
  justifyContent: 'center',
  minWidth: `${gridSize() * 20}px`,
  padding: `${gridSize() * 2.5}px`,
};

const statusLabelStyles: CSSObject = visuallyHidden();

const DropdownMenu = (props: DropdownMenuProps) => {
  const {
    defaultOpen = false,
    isOpen,
    onOpenChange = noop,
    children,
    placement = 'bottom-start',
    trigger: Trigger,
    shouldFlip = true,
    isLoading = false,
    testId,
    statusLabel = 'Loading',
  } = props;
  const [isLocalOpen, setLocalIsOpen] = useControlledState(
    isOpen,
    () => defaultOpen,
  );

  const handleTriggerClicked = useCallback(() => {
    const newValue = !isLocalOpen;
    setLocalIsOpen(newValue);
    onOpenChange({ isOpen: newValue });
  }, [onOpenChange, isLocalOpen, setLocalIsOpen]);

  const handleOnClose = useCallback(() => {
    const newValue = false;
    setLocalIsOpen(newValue);
    onOpenChange({ isOpen: newValue });
  }, [onOpenChange, setLocalIsOpen]);

  const { isFocused, bindFocus } = useFocus();
  const handleDownArrow = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === KEY_DOWN) {
        // prevent page scroll
        e.preventDefault();
        handleTriggerClicked();
      }
    },
    [handleTriggerClicked],
  );
  useKeydownEvent(handleDownArrow, isFocused);

  const renderTrigger = (triggerProps: TriggerProps) => {
    if (typeof Trigger === 'function') {
      return (
        <Trigger
          {...triggerProps}
          {...bindFocus}
          isSelected={isLocalOpen}
          onClick={handleTriggerClicked}
          testId={testId && `${testId}-trigger`}
        />
      );
    }

    return (
      <Button
        {...triggerProps}
        {...bindFocus}
        isSelected={isLocalOpen}
        iconAfter={<ExpandIcon size="medium" label="expand" />}
        onClick={handleTriggerClicked}
        testId={testId && `${testId}-trigger`}
      >
        {Trigger}
      </Button>
    );
  };

  return (
    <SelectionStore>
      <Popup
        shouldFlip={shouldFlip}
        isOpen={isLocalOpen}
        onClose={handleOnClose}
        content={({ setInitialFocusRef }) => (
          <FocusManager>
            <MenuWrapper
              maxHeight={800}
              maxWidth={800}
              onClose={handleOnClose}
              setInitialFocusRef={setInitialFocusRef}
            >
              {isLoading ? (
                <div css={spinnerContainerStyles}>
                  <Spinner size="small" />
                  <span role="status" css={statusLabelStyles}>
                    {statusLabel}
                  </span>
                </div>
              ) : (
                children
              )}
            </MenuWrapper>
          </FocusManager>
        )}
        trigger={renderTrigger}
        placement={placement}
        testId={testId}
      />
    </SelectionStore>
  );
};

export default DropdownMenu;
