import React, {
  FunctionComponent,
  Fragment,
  ComponentProps,
  JSXElementConstructor,
  ReactNode,
  useRef,
  useCallback,
  useState,
  useMemo,
  useEffect,
  RefObject,
} from 'react';
import { SpotlightCard } from '@atlaskit/onboarding';
import { DefaultNudge, NudgeType } from '../shared/DefaultNudge';
import Portal from '@atlaskit/portal';
import { Popper, Placement } from '@atlaskit/popper';
import { bind, UnbindFn } from 'bind-event-listener';
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
import { SpotlightContainer } from './styled';

type Offset = [number | null | undefined, number | null | undefined];

type SpotlightCardProps = ComponentProps<typeof SpotlightCard>;

type NudgeSpotlightProps = WithAnalyticsEventsProps &
  Omit<SpotlightCardProps, 'children' | 'ref'> & {
    hidden: boolean;
    hideNudgeOnClick?: boolean;
    hideSpotlightOnOutsideClick?: boolean;
    concealSpotlightOnReferenceHidden?: boolean; // note this intentionally does NOT trigger onHide()
    autoShow?: boolean;
    spotlight?: JSXElementConstructor<any>;
    nudge?: NudgeType;
    content?: ReactNode;
    position?: Placement;
    offset?: Offset;
    zIndex?: number;
    pulseColor?: string;
    pulseShadowColor?: string;
    pulseBorderRadius?: number;
    registerUpdateFn?: (update: Function) => void;
    registerToggleCardFn?: (toggleFn: (show: boolean) => void) => void;
    setHidden: (event: Event) => void;
    onRender?: (analyticsEvent?: UIAnalyticsEvent) => void;
    onShow?: (analyticsEvent?: UIAnalyticsEvent) => void;
    onHide?: (analyticsEvent?: UIAnalyticsEvent) => void;
    onClick?: (analyticsEvent?: UIAnalyticsEvent) => void;
    onOutsideClick?: (analyticsEvent?: UIAnalyticsEvent) => void;
  };

type HandlersRef = Pick<
  NudgeSpotlightProps,
  'onRender' | 'onShow' | 'onClick' | 'onHide' | 'onOutsideClick'
>;

const RelayFuncToParent: FunctionComponent<{
  fn: () => void;
  relay: (fn: Function) => void;
}> = ({ fn, relay }) => {
  useEffect(() => {
    relay(() => fn);
  }, [fn, relay]);
  return null;
};

export const NudgeSpotlight: FunctionComponent<NudgeSpotlightProps> = ({
  hidden: externalHidden,
  setHidden,
  hideNudgeOnClick = true,
  hideSpotlightOnOutsideClick = true,
  concealSpotlightOnReferenceHidden = false,
  autoShow = true,
  children,
  content,
  spotlight: Spotlight = SpotlightCard,
  nudge: Nudge = DefaultNudge,
  position = 'bottom',
  offset,
  zIndex = 800,
  onRender,
  onShow,
  onHide,
  onClick,
  onOutsideClick,
  createAnalyticsEvent,
  pulseColor,
  pulseShadowColor,
  pulseBorderRadius,
  registerUpdateFn,
  registerToggleCardFn,
  ...spotlightCardProps
}) => {
  // Put all listeners inside a ref to avoid misfiring events
  // When the listener functions themselves change.
  const handlers = useRef<HandlersRef>();
  handlers.current = { onRender, onHide, onShow, onClick, onOutsideClick };

  const nudgeRef = useRef<HTMLDivElement | null>(null);
  const spotlightRef = useRef<HTMLDivElement | null>(null);
  const cardConfig = useMemo(
    () =>
      Spotlight === SpotlightCard
        ? { ...spotlightCardProps, children: content }
        : {},
    [Spotlight, spotlightCardProps, content],
  );

  const showNudge = !externalHidden;
  const [canShowSpotlight, setCanShowSpotlight] = useState<boolean>(autoShow);
  const [showSpotlight, setShowSpotlight] = useState<boolean>(false);

  const markReadyToShow = useCallback(() => setCanShowSpotlight(true), []);
  const onTargetClick = useCallback(
    (event) => {
      if (!externalHidden) {
        if (hideNudgeOnClick) {
          setHidden(event);
        }
        handlers.current?.onClick?.();
      }
    },
    [externalHidden, hideNudgeOnClick, setHidden, handlers],
  );

  // Provide update position function to outside world if requested
  const [updateFn, setUpdateFn] = useState<Function>();
  useEffect(() => {
    updateFn && registerUpdateFn?.(() => updateFn);
  }, [updateFn, registerUpdateFn]);

  // Provide toggle function to manually show/hide card when necessary
  useEffect(() => {
    setCanShowSpotlight && registerToggleCardFn?.(() => setCanShowSpotlight);
  }, [setCanShowSpotlight, registerToggleCardFn]);

  // Effect for show/hide the spotlight
  useEffect(() => {
    setShowSpotlight(showNudge && canShowSpotlight);
  }, [showNudge, canShowSpotlight]);

  // Effect for onRender and onHide
  useEffect(() => {
    if (!externalHidden) {
      handlers.current?.onRender?.();
      return () => handlers.current?.onHide?.();
    }
  }, [externalHidden, handlers]);

  // Effect for onShow
  useEffect(() => {
    if (showSpotlight) {
      handlers.current?.onShow?.();
    }
  }, [showSpotlight, handlers]);

  // Effect to reset autoShow when hidden
  useEffect(() => {
    if (externalHidden) {
      setCanShowSpotlight(autoShow);
    }
  }, [externalHidden, autoShow]);

  // Effect to hide spotlight on outside click
  useEffect(() => {
    let unbind: UnbindFn;
    let timeout: number;
    if (showSpotlight && hideSpotlightOnOutsideClick) {
      timeout = setTimeout(() => {
        unbind = bind(window, {
          type: 'click',
          listener: (event) => {
            if (
              nudgeRef.current &&
              spotlightRef.current &&
              event.target instanceof Node &&
              !nudgeRef.current.contains(event.target) &&
              !spotlightRef.current.contains(event.target)
            ) {
              handlers.current?.onOutsideClick?.();
              setCanShowSpotlight(false);
              unbind?.();
            }
          },
          options: { capture: true, passive: true },
        });
      });
    }
    return () => {
      unbind?.();
      clearTimeout(timeout);
    };
  }, [showSpotlight, hideSpotlightOnOutsideClick, setHidden, handlers]);

  return (
    <Fragment>
      <Nudge
        ref={nudgeRef}
        hasPulse={showNudge}
        onClickCapture={onTargetClick}
        onMouseEnter={markReadyToShow}
        pulseColor={pulseColor}
        pulseShadowColor={pulseShadowColor}
        pulseBorderRadius={pulseBorderRadius}
      >
        {children}
      </Nudge>

      {showSpotlight && (
        <Portal zIndex={zIndex}>
          <Popper
            placement={position}
            referenceElement={nudgeRef.current || undefined}
            offset={offset}
          >
            {({ ref, style, forceUpdate, isReferenceHidden }) => (
              <SpotlightContainer
                innerRef={ref as RefObject<HTMLElement>}
                style={{
                  ...style,
                  ...(concealSpotlightOnReferenceHidden && isReferenceHidden
                    ? { display: 'none' }
                    : {}),
                }}
              >
                <RelayFuncToParent fn={forceUpdate} relay={setUpdateFn} />
                <Spotlight {...cardConfig} ref={spotlightRef} />
              </SpotlightContainer>
            )}
          </Popper>
        </Portal>
      )}
    </Fragment>
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
