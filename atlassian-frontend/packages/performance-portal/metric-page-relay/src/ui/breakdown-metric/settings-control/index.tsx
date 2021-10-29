import React, { ChangeEvent, useCallback, useState } from 'react';

import Button from '@atlaskit/button';
import { Checkbox } from '@atlaskit/checkbox';
import SettingsIcon from '@atlaskit/icon/glyph/settings';
import {
  CustomItem,
  CustomItemComponentProps,
  PopupMenuGroup,
} from '@atlaskit/menu';
import Popup from '@atlaskit/popup';

interface HideItemVolumeThresholdMenuProps {
  hideItemVolumeThreshold: number;
  setHideItemVolumeThreshold: (value: number) => void;
}

interface HideItemDurationThresholdMenuProps {
  hideItemDurationThreshold: number;
  setHideItemDurationThreshold: (value: number) => void;
}

type CheckboxMenuProps = {
  isChecked: boolean;
  onChange: () => void;
  label: string;
};

type Props = HideItemVolumeThresholdMenuProps &
  HideItemDurationThresholdMenuProps & {
    handleAbsoluteTimingDiffChange: (isChecked: boolean) => void;
    handlePercentageTimingDiffChange: (isChecked: boolean) => void;
    isAbsoluteTimingDiffChecked: boolean;
    isPercentageTimingDiffChecked: boolean;
  };

const HideItemVolumeThresholdMenu = (
  props: CustomItemComponentProps & HideItemVolumeThresholdMenuProps,
) => {
  const {
    className,
    ref,
    hideItemVolumeThreshold,
    setHideItemVolumeThreshold,
  } = props;

  const handleChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      setHideItemVolumeThreshold(Number(e.target.value));
    },
    [setHideItemVolumeThreshold],
  );

  return (
    <div ref={ref} className={className}>
      Hide items below &nbsp;
      <input
        type="number"
        value={hideItemVolumeThreshold}
        onChange={handleChange}
      />
      &nbsp; count
    </div>
  );
};

const HideItemDurationThresholdMenu = (
  props: CustomItemComponentProps & HideItemDurationThresholdMenuProps,
) => {
  const {
    className,
    ref,
    hideItemDurationThreshold,
    setHideItemDurationThreshold,
  } = props;

  const handleChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      setHideItemDurationThreshold(Number(e.target.value));
    },
    [setHideItemDurationThreshold],
  );

  return (
    <div ref={ref} className={className}>
      Hide items below &nbsp;
      <input
        type="number"
        value={hideItemDurationThreshold}
        onChange={handleChange}
      />
      &nbsp; ms
    </div>
  );
};

const CheckboxMenu = ({
  className,
  isChecked,
  label,
  onChange,
  ref,
}: CustomItemComponentProps & CheckboxMenuProps) => {
  return (
    <div ref={ref} className={className}>
      <Checkbox isChecked={isChecked} onChange={onChange} label={label} />
    </div>
  );
};

const SettingsMenu = ({
  hideItemVolumeThreshold,
  setHideItemVolumeThreshold,
  hideItemDurationThreshold,
  setHideItemDurationThreshold,
  isAbsoluteTimingDiffChecked,
  handleAbsoluteTimingDiffChange,
  isPercentageTimingDiffChecked,
  handlePercentageTimingDiffChange,
}: Props) => (
  <PopupMenuGroup onClick={(e) => e.stopPropagation()}>
    <CustomItem
      component={HideItemVolumeThresholdMenu}
      hideItemVolumeThreshold={hideItemVolumeThreshold}
      setHideItemVolumeThreshold={setHideItemVolumeThreshold}
    />

    <CustomItem
      component={HideItemDurationThresholdMenu}
      hideItemDurationThreshold={hideItemDurationThreshold}
      setHideItemDurationThreshold={setHideItemDurationThreshold}
    />

    <CustomItem
      component={CheckboxMenu}
      isChecked={isAbsoluteTimingDiffChecked}
      onChange={() => {
        handleAbsoluteTimingDiffChange(!isAbsoluteTimingDiffChecked);
      }}
      label="Show absolute timing difference"
    />

    <CustomItem
      component={CheckboxMenu}
      isChecked={isPercentageTimingDiffChecked}
      onChange={() => {
        handlePercentageTimingDiffChange(!isPercentageTimingDiffChecked);
      }}
      label="Show percentage timing difference"
    />
  </PopupMenuGroup>
);

export const SettingsControl = (props: Props) => {
  const [isControlPopupOpen, setControlPopupOpen] = useState(false);

  const handleControlPopupClick = useCallback(() => {
    setControlPopupOpen(!isControlPopupOpen);
  }, [isControlPopupOpen]);

  const handleControlPopupClose = useCallback(() => {
    setControlPopupOpen(false);
  }, []);

  return (
    <Popup
      isOpen={isControlPopupOpen}
      onClose={handleControlPopupClose}
      placement="bottom-end"
      trigger={(triggerProps) => (
        <Button
          {...triggerProps}
          isSelected={isControlPopupOpen}
          onClick={handleControlPopupClick}
          iconAfter={<SettingsIcon label="Settings" />}
        ></Button>
      )}
      content={() => <SettingsMenu {...props} />}
    />
  );
};
