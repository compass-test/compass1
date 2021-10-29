import React, { useState, useCallback, forwardRef, RefObject } from 'react';
import Tooltip, {
  TooltipProps,
  TooltipPrimitiveProps,
} from '@atlaskit/tooltip';
import { NudgeTooltipPrimitive } from './styled';
import { NudgeTooltipPulse } from '../shared/styled';
import {
  UIAnalyticsEvent,
  withAnalyticsContext,
  WithAnalyticsEventsProps,
  withAnalyticsEvents,
} from '@atlaskit/analytics-next';
import {
  onClickPayload,
  onHidePayload,
  onShowPayload,
} from './analyticPayloads';
import { once } from './utils';

interface NudgeTooltipProps
  extends Omit<TooltipProps, 'component' | 'onShow' | 'onHide'>,
    WithAnalyticsEventsProps {
  children: JSX.Element;
  hidden?: boolean;
  hideTooltipOnClick?: boolean;
  minReadTime?: number;
  onShow?: (analyticsEvent?: UIAnalyticsEvent) => void;
  onHide?: (analyticsEvent?: UIAnalyticsEvent) => void;
  onClick?: (analyticsEvent?: UIAnalyticsEvent) => void;
}

const NudgeTooltip = ({
  onShow = () => {},
  onHide = () => {},
  onClick = () => {},
  children,
  content,
  hidden,
  delay = 0,
  hideTooltipOnClick = true,
  minReadTime = 1000,
  ...rest
}: NudgeTooltipProps) => {
  const [hasNudged, setNudgedState] = useState<boolean>(false);
  const [minReadTimeout, setMinReadTimeout] = useState<NodeJS.Timeout | null>(
    null,
  );

  const hideNudge = hasNudged || !!hidden;
  const textContent = !hideNudge && content;
  const clearMinReadTimeout = useCallback(() => {
    if (minReadTimeout) {
      clearTimeout(minReadTimeout);
    }
    setMinReadTimeout(null);
  }, [minReadTimeout]);

  // we call this from onClick and onHide
  // it only needs to run the code once
  // AFP-2511 TODO: Fix automatic suppressions below
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const markDoneOnce = useCallback(
    once(() => {
      setNudgedState(true);
      onHide();
    }),
    [],
  );

  // AFP-2511 TODO: Fix automatic suppressions below
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const onClickOnce = useCallback(
    once(() => onClick()),
    [],
  );

  const handleClick = useCallback(() => {
    if (hideNudge) {
      return;
    }
    if (hideTooltipOnClick) {
      onClickOnce();
      markDoneOnce();
    } else {
      onClick();
    }
  }, [hideNudge, hideTooltipOnClick, onClickOnce, markDoneOnce, onClick]);

  // AFP-2511 TODO: Fix automatic suppressions below
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const component = useCallback(
    forwardRef<HTMLDivElement, TooltipPrimitiveProps>((props, ref) => (
      <NudgeTooltipPrimitive
        {...props}
        innerRef={ref as RefObject<HTMLDivElement>}
      />
    )),
    [],
  );

  return (
    <Tooltip
      hideTooltipOnClick={hideTooltipOnClick}
      component={component}
      delay={delay}
      onShow={() => {
        onShow();
        if (minReadTimeout) {
          clearMinReadTimeout();
        }
        // @ts-ignore
        setMinReadTimeout(setTimeout(clearMinReadTimeout, minReadTime));
      }}
      onHide={() => {
        if (minReadTimeout === null) {
          markDoneOnce();
        }
      }}
      content={textContent}
      {...rest}
    >
      <NudgeTooltipPulse hasPulse={!hideNudge} onClickCapture={handleClick}>
        {children}
      </NudgeTooltipPulse>
    </Tooltip>
  );
};

export default withAnalyticsContext({
  componentName: 'NudgeTooltip',
})(
  withAnalyticsEvents({
    onHide: { ...onHidePayload },
    onShow: { ...onShowPayload },
    onClick: { ...onClickPayload },
  })(NudgeTooltip),
);
