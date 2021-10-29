import React, { useCallback, useState } from 'react';

import memoize from 'lodash/memoize';

import Button from '@atlaskit/button';
import Calendar, { CalendarProps } from '@atlaskit/calendar';
import CalendarIcon from '@atlaskit/icon/glyph/calendar';
import { ButtonItem, PopupMenuGroup } from '@atlaskit/menu';
import Popup from '@atlaskit/popup';

import { ComparisonType } from '../../../common/types';
import { getStartOfDayUTC, toISODateString } from '../../../common/utils';

import { ComparisonControlProps, SelectedComparison } from './types';
import { generateDisabledDateStrArr } from './utils';

const memoizedGenerateDisabledDateStrArr = memoize(generateDisabledDateStrArr);

export const ComparisonControl = ({
  baseDateStr,
  selectedComparison,
  onComparisonSelected,
}: ComparisonControlProps) => {
  let comparisonDate: Date | undefined;
  const [isControlPopupOpen, setControlPopupOpen] = useState(false);
  const [isCalendarPopupOpen, setCalendarPopupOpen] = useState(false);
  const [disabledDates, setDisabledDates] = useState(
    memoizedGenerateDisabledDateStrArr(),
  );

  if (selectedComparison.comparisonType === ComparisonType.Fixed) {
    comparisonDate = selectedComparison.selectedFixedDate;
  }

  const comparisonType = selectedComparison.comparisonType;

  const onDoDClick = useCallback(() => {
    onComparisonSelected({ comparisonType: ComparisonType.DoD });
    setControlPopupOpen(false);
  }, [onComparisonSelected]);

  const onWoWClick = useCallback(() => {
    onComparisonSelected({ comparisonType: ComparisonType.WoW });
    setControlPopupOpen(false);
  }, [onComparisonSelected]);

  const handleCalendarSelect = useCallback<Required<CalendarProps>['onSelect']>(
    (e) => {
      if (e.iso) {
        onComparisonSelected({
          comparisonType: ComparisonType.Fixed,
          selectedFixedDate: getStartOfDayUTC(new Date(e.iso)),
        });
        setControlPopupOpen(false);
      }
    },
    [onComparisonSelected],
  );

  let buttonText = `DoD`;
  if (comparisonType === ComparisonType.DoD) {
    buttonText = `DoD`;
  } else if (comparisonType === ComparisonType.WoW) {
    buttonText = `WoW`;
  } else if (comparisonType === ComparisonType.Fixed) {
    buttonText = `Compare to ${
      comparisonDate && toISODateString(comparisonDate)
    }`;
  }

  const handleCalendarChange = useCallback((e) => {
    if (e.iso) {
      setDisabledDates(memoizedGenerateDisabledDateStrArr(e.iso));
    }
  }, []);

  const handleControlPopupClick = useCallback(() => {
    setControlPopupOpen(!isControlPopupOpen);
  }, [isControlPopupOpen]);

  const handleControlPopupClose = useCallback(() => {
    setControlPopupOpen(false);
  }, []);

  const handleCalendarPopupClick = useCallback(() => {
    setCalendarPopupOpen(!isCalendarPopupOpen);
  }, [isCalendarPopupOpen]);

  const handleCalendarPopupClose = useCallback(() => {
    setCalendarPopupOpen(false);
  }, []);

  return (
    <Popup
      isOpen={isControlPopupOpen}
      onClose={handleControlPopupClose}
      placement="bottom-end"
      content={() => (
        <PopupMenuGroup onClick={(e) => e.stopPropagation()}>
          <ButtonItem onClick={onDoDClick}>Day over Day (DoD)</ButtonItem>
          <ButtonItem onClick={onWoWClick}>Week over Week (WoW)</ButtonItem>
          <Popup
            isOpen={isCalendarPopupOpen}
            placement="bottom-end"
            onClose={handleCalendarPopupClose}
            content={() => (
              <Calendar
                disabled={disabledDates}
                today={baseDateStr}
                selected={
                  comparisonDate
                    ? [comparisonDate.toISOString().substring(0, 10)]
                    : []
                }
                onSelect={handleCalendarSelect}
                onChange={handleCalendarChange}
              />
            )}
            trigger={(triggerProps) => (
              <ButtonItem
                {...triggerProps}
                isSelected={isCalendarPopupOpen}
                onClick={handleCalendarPopupClick}
                iconAfter={<CalendarIcon label="Compare to" />}
              >
                Fixed Date
              </ButtonItem>
            )}
          />
        </PopupMenuGroup>
      )}
      trigger={(triggerProps) => (
        <Button
          {...triggerProps}
          isSelected={isControlPopupOpen}
          onClick={handleControlPopupClick}
          iconAfter={<CalendarIcon label="Compare to" />}
        >
          {buttonText}
        </Button>
      )}
    />
  );
};

export type { SelectedComparison };
