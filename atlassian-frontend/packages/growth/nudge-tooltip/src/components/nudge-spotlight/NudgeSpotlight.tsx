import React, {
  useState,
  useCallback,
  useRef,
  useEffect,
  forwardRef,
} from 'react'; // eslint-disable-line import/no-extraneous-dependencies
import Tooltip, { PositionType } from '@atlaskit/tooltip';
import { NudgeSpotlightPrimitive } from './styled';
import { NudgeTooltipPulse } from '../shared/styled';
import {
  UIAnalyticsEvent,
  withAnalyticsContext,
  WithAnalyticsEventsProps,
  withAnalyticsEvents,
} from '@atlaskit/analytics-next';
import {
  onRenderPayload,
  onShowPayload,
  onHidePayload,
  onClickPayload,
  onOutsideClickPayload,
} from './analyticPayloads';
import { SpotlightCard } from '@atlaskit/onboarding';
// eslint-disable-next-line import/no-extraneous-dependencies
import debounce from 'lodash/debounce';

type SpotlightCardProps = React.ComponentProps<typeof SpotlightCard>;
type Exclusions = 'children' | 'testId' | 'key' | 'ref';
interface NudgeSpotlightProps
  extends Omit<SpotlightCardProps, Exclusions>,
    WithAnalyticsEventsProps {
  children: JSX.Element;
  hidden?: boolean;
  hideNudgeOnClick?: boolean;
  hideSpotlightOnOutsideClick?: boolean;
  autoShow?: boolean;
  content: React.ReactNode;
  zIndex?: number;
  position?: PositionType;
  setHidden?: () => void;
  onRender?: (analyticsEvent?: UIAnalyticsEvent) => void;
  onShow?: (analyticsEvent?: UIAnalyticsEvent) => void;
  onHide?: (analyticsEvent?: UIAnalyticsEvent) => void;
  onClick?: (analyticsEvent?: UIAnalyticsEvent) => void;
  onOutsideClick?: (analyticsEvent?: UIAnalyticsEvent) => void;
}

const oneYear = 31556952000;

// eslint-disable-next-line react/display-name
const SpotlightCardContent = forwardRef(
  (
    {
      setSpotlightMounted,
      setDelayValue,
      children,
      ...spotlightCardProps
    }: {
      setSpotlightMounted: (value: boolean) => void;
      setDelayValue: (value: number) => void;
      children: React.ReactNode;
    } & Omit<SpotlightCardProps, Exclusions>,
    ref: React.Ref<HTMLElement>,
  ) => {
    useEffect(() => {
      setDelayValue(oneYear);
      setSpotlightMounted(true);
      return () => {
        setDelayValue(0);
        setSpotlightMounted(false);
      };
    }, [setDelayValue, setSpotlightMounted]);
    return (
      <SpotlightCard ref={ref} {...spotlightCardProps}>
        {children}
      </SpotlightCard>
    );
  },
);

const NudgeSpotlight = ({
  onRender = () => {},
  onShow = () => {},
  onHide = () => {},
  onClick = () => {},
  onOutsideClick = () => {},
  setHidden: setRemoteHidden = () => {},
  children,
  content,
  hidden: remoteHidden,
  hideNudgeOnClick = true,
  hideSpotlightOnOutsideClick = false,
  autoShow = true,
  zIndex = -1,
  position,
  ...spotlightCardProps
}: NudgeSpotlightProps) => {
  const nudgeRef = useRef<HTMLDivElement | null>(null);
  const spotlightRef = useRef<HTMLElement | null>(null);
  const [delayValue, setDelayValue] = useState(0);
  const [optimisticHide, setOptimisticHide] = useState<boolean>(false);
  const [hideWasExpected, setHideWasExpected] = useState<boolean>(!autoShow);
  const [spotlightMounted, setSpotlightMounted] = useState<boolean>(false);
  const [atLeastOneRender, setAtLeastOneRender] = useState<boolean>(false);

  const overallHidden = optimisticHide || !!remoteHidden;
  const textContent = !overallHidden && content;

  const programmaticSpotlightToggle = useCallback(
    (value: 'show' | 'hide') => {
      if (!nudgeRef.current) {
        return;
      }

      const [isShow, isHide] = [value === 'show', value === 'hide'];
      const eventName = isShow ? 'mouseover' : 'mouseout';
      setHideWasExpected(isHide);
      setDelayValue(0);

      nudgeRef.current.dispatchEvent(
        new MouseEvent(eventName, {
          view: window,
          bubbles: true,
          cancelable: true,
        }),
      );
    },
    [setHideWasExpected, setDelayValue],
  );

  // Used when reviving spotlight during scrolling
  // AFP-2511 TODO: Fix automatic suppressions below
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const debouncedSpotlightToggle = useCallback(
    debounce(programmaticSpotlightToggle, 1000, {
      leading: true,
      trailing: true,
    }),
    [programmaticSpotlightToggle],
  );

  // Needed bc tooltip onShow callback does not fire predictably
  // AFP-2511 TODO: Fix automatic suppressions below
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const debouncedOnShow = useCallback(
    debounce(onShow, 100, { trailing: true }),
    [onShow],
  );

  const hideNudgeAndSpotlight = useCallback(() => {
    programmaticSpotlightToggle('hide');
    setOptimisticHide(true);
    setRemoteHidden();
  }, [programmaticSpotlightToggle, setRemoteHidden]);

  const onShowHandler = useCallback(() => {
    setHideWasExpected(false);
    debouncedOnShow();
  }, [debouncedOnShow]);

  const handleInsideClick = useCallback(() => {
    if (overallHidden) {
      return;
    }
    onClick();
    if (hideNudgeOnClick) {
      hideNudgeAndSpotlight();
    }
  }, [overallHidden, onClick, hideNudgeOnClick, hideNudgeAndSpotlight]);

  // AFP-2511 TODO: Fix automatic suppressions below
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const renderSpotlightCard = useCallback(
    forwardRef(({ children, ...rest }, ref) =>
      textContent ? (
        <NudgeSpotlightPrimitive {...rest} innerRef={ref}>
          <SpotlightCardContent
            setDelayValue={setDelayValue}
            setSpotlightMounted={setSpotlightMounted}
            ref={spotlightRef}
            {...spotlightCardProps}
          >
            {children}
          </SpotlightCardContent>
        </NudgeSpotlightPrimitive>
      ) : null,
    ),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [textContent],
  );

  // Callback fired on global 'click' to detect if it happened outside of nudge
  const handleGlobalClick = useCallback(
    (evt: MouseEvent) => {
      const nudgeRing = nudgeRef.current;
      const spotlight = spotlightRef.current;
      const clickTarget = evt.target as HTMLElement;

      if (overallHidden) {
        return;
      }
      if (!hideSpotlightOnOutsideClick) {
        return;
      }
      if (!nudgeRing) {
        return;
      }
      if (!clickTarget) {
        return;
      }
      if (!spotlight) {
        return;
      }
      if (nudgeRing.contains(clickTarget)) {
        return;
      }
      if (spotlight.contains(clickTarget)) {
        return;
      }

      programmaticSpotlightToggle('hide');
      onOutsideClick();
    },
    [
      overallHidden,
      hideSpotlightOnOutsideClick,
      programmaticSpotlightToggle,
      onOutsideClick,
    ],
  );

  const setOneYearDelay = useCallback(() => {
    if (overallHidden) {
      return;
    }
    if (hideWasExpected) {
      return;
    }
    if (!spotlightMounted) {
      return;
    }
    setDelayValue(oneYear);
  }, [hideWasExpected, spotlightMounted, overallHidden]);

  // When spotlight is mounted and an actual mouseout of the nudgeRing happens
  // AK attempts to remove the tooltip. This prevents it.
  useEffect(() => {
    const nudgeRing = nudgeRef.current;
    if (!nudgeRing) {
      return;
    }
    nudgeRing.addEventListener('mouseout', setOneYearDelay);
    return () => nudgeRing.removeEventListener('mouseout', setOneYearDelay);
  }, [setOneYearDelay]);

  // Needed Delay Cleanup after remoteHidden becomes true
  // Sometimes debounced programmaticShowToggle gets dispatched after hiding the nudge
  // If not for this fix, delay gets set to oneYear and then if nudge is shown again
  // The spotlight won't appear automatically because of the lingering oneYear delay
  useEffect(() => {
    if (!delayValue) {
      return;
    }
    if (!remoteHidden) {
      return;
    }
    setDelayValue(0);
  }, [delayValue, remoteHidden]);

  // Reset optimistic hide when remote gets hidden and fire callback
  // If no renders happened we skip it, bc remoteHidden started out as hidden
  useEffect(() => {
    if (!remoteHidden) {
      return;
    }
    programmaticSpotlightToggle('hide');

    if (!atLeastOneRender) {
      return;
    }
    setAtLeastOneRender(false);
    setOptimisticHide(false);
    onHide();
  }, [
    remoteHidden,
    atLeastOneRender,
    setAtLeastOneRender,
    programmaticSpotlightToggle,
    onHide,
  ]);

  // Auto-show Effect
  useEffect(() => {
    if (overallHidden) {
      return;
    }
    if (!autoShow) {
      return;
    }
    programmaticSpotlightToggle('show');
    debouncedOnShow();
  }, [overallHidden, autoShow, programmaticSpotlightToggle, debouncedOnShow]);

  // Render Nudge Ring Effect
  useEffect(() => {
    if (overallHidden) {
      return;
    }
    setAtLeastOneRender(true);
    onRender();
  }, [onRender, overallHidden]);

  // Effect to revive spotlight if no closure was expected
  // This happens when AK tries to de-conflict spotlights
  useEffect(() => {
    if (overallHidden) {
      return;
    }
    if (spotlightMounted) {
      return;
    }
    if (hideWasExpected) {
      return;
    }
    debouncedSpotlightToggle('show');
  }, [
    overallHidden,
    spotlightMounted,
    hideWasExpected,
    debouncedSpotlightToggle,
  ]);

  // Register and de-register global click callback
  useEffect(() => {
    if (overallHidden) {
      return;
    }
    setImmediate(() => window.addEventListener('click', handleGlobalClick));
    return () => window.removeEventListener('click', handleGlobalClick);
  }, [overallHidden, handleGlobalClick]);

  // Set desired zIndex
  useEffect(() => {
    if (zIndex === -1) {
      return;
    }
    if (spotlightRef.current === null) {
      return;
    }
    let current: HTMLElement | null = spotlightRef.current;

    while (current) {
      if (current.classList.contains('atlaskit-portal')) {
        break;
      }
      current = current.parentNode as HTMLElement | null;
    }

    if (!current) {
      return;
    }
    (current as HTMLDivElement).style.zIndex = `${zIndex}`;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [spotlightRef.current, zIndex]);

  return (
    <Tooltip
      hideTooltipOnClick={hideNudgeOnClick}
      hideTooltipOnMouseDown={false}
      delay={delayValue}
      component={renderSpotlightCard as any}
      content={textContent}
      onShow={onShowHandler}
      position={position}
    >
      <NudgeTooltipPulse
        hasPulse={!overallHidden}
        innerRef={nudgeRef}
        onClickCapture={handleInsideClick}
      >
        {children}
      </NudgeTooltipPulse>
    </Tooltip>
  );
};

export default withAnalyticsContext({
  componentName: 'NudgeSpotlight',
})(
  withAnalyticsEvents({
    onRender: { ...onRenderPayload },
    onShow: { ...onShowPayload },
    onHide: { ...onHidePayload },
    onClick: { ...onClickPayload },
    onOutsideClick: { ...onOutsideClickPayload },
  })(NudgeSpotlight),
);
