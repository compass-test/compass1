import React, {
  RefObject,
  useCallback,
  useMemo,
  useRef,
  useState,
} from 'react';

import AkPopup from '@atlaskit/popup';

import { PopupComponentWithDropShadow, Trigger } from './styled';
import type {
  PopupCloseKey,
  PopupControllerActions,
  PopupControllerData,
  PopupSpec,
  PopupSpecInternal,
} from './types';
import { calculateForceRemountCounter, useKeys } from './utils';

export type { PopupControllerActions, PopupControllerData, PopupSpec };

// The amount of time to wait after a popup is closed before actually closing
// the popup, in milliseconds. This small window allows us to check if any
// other popups are closing at the same time, forcing some to stay open as
// needed. This is to work around @atlaskit/popup having poor support for
// nested popups, e.g. clicking inside a nested popup causing the parent to
// close.
const POPUP_CLOSE_EVENT_COLLAPSE_TIME_MS = 15;

const equalTo = ({
  id: idA,
  forceRemountCounter: forceRemountCounterA,
}: PopupCloseKey) => ({
  id: idB,
  forceRemountCounter: forceRemountCounterB,
}: PopupCloseKey) =>
  idA === idB && forceRemountCounterA === forceRemountCounterB;

export const usePopupController: <U>(
  context: U,
) => [PopupControllerData, PopupControllerActions<U>] = (context) => {
  const [popupSpecs, setPopupSpecs] = useState<{
    [id: string]: PopupSpecInternal<unknown, typeof context>;
  }>({});
  const popupContainerRef = useRef<HTMLDivElement>(null);

  const openPopup = useCallback<
    PopupControllerActions<typeof context>['openPopup']
  >(
    ({ targetRect, targetOffsetWidth, mouseOffsetY = 0, ...popup }) =>
      new Promise((resolve) => {
        if (popupContainerRef.current !== null) {
          const popupContainerRect = popupContainerRef.current.getBoundingClientRect();
          const newAnchorTop =
            targetRect.top -
            popupContainerRect.top +
            popupContainerRef.current.offsetTop +
            mouseOffsetY;
          const newAnchorLeft =
            targetRect.left -
            popupContainerRect.left +
            popupContainerRef.current.offsetLeft;
          // Open popup asynchronously to prevent the click event causing the popup to close
          // immediately
          setTimeout(() => {
            setPopupSpecs((prevPopups) => ({
              ...prevPopups,
              [popup.id]: {
                ...popup,
                forceRemountCounter: calculateForceRemountCounter(
                  prevPopups[popup.id],
                  newAnchorTop,
                  newAnchorLeft,
                  targetOffsetWidth,
                ),
                anchorTop: newAnchorTop,
                anchorLeft: newAnchorLeft,
                anchorWidth: targetOffsetWidth,
              },
            }));
            resolve();
          }, 0);
        }
      }),
    [],
  );

  const popupCloseTimeout = useRef<number | null>(null);
  const popupsToClose = useRef<PopupCloseKey[]>([]);
  const popupCloseFns = useRef<(() => void)[]>([]);

  const closePopup = useCallback(
    ({ id, forceRemountCounter }: PopupCloseKey) =>
      new Promise<void>((resolve) => {
        if (!popupsToClose.current.some(equalTo({ id, forceRemountCounter }))) {
          popupsToClose.current.push({ id, forceRemountCounter });
        }
        popupCloseFns.current.push(resolve);

        if (popupCloseTimeout.current !== null) {
          window.clearTimeout(popupCloseTimeout.current);
        }

        popupCloseTimeout.current = window.setTimeout(() => {
          setPopupSpecs((prevPopupSpecs) =>
            Object.keys(prevPopupSpecs)
              .filter((key) => {
                const popupToFilter = prevPopupSpecs[key];
                if (popupsToClose.current.some(equalTo(popupToFilter))) {
                  // If another popup has specified that this popup should stay open, and that
                  // popup is not being closed, then keep this popup open
                  if (
                    Object.values(prevPopupSpecs).some(
                      (otherPopup) =>
                        !popupsToClose.current.some(equalTo(otherPopup)) &&
                        otherPopup.keepOpenIds?.includes(popupToFilter.id),
                    )
                  ) {
                    return true;
                  }

                  // If another popup requested this popup to stay open but that popup closed
                  // first, then keep this popup open
                  if (
                    Object.values(prevPopupSpecs).some(
                      (otherPopup) =>
                        otherPopup.keepOpenIds?.includes(popupToFilter.id) &&
                        popupsToClose.current.some(equalTo(otherPopup)) &&
                        popupsToClose.current.findIndex(equalTo(otherPopup)) <
                          popupsToClose.current.findIndex(
                            equalTo(popupToFilter),
                          ),
                    )
                  ) {
                    return true;
                  }

                  return false;
                }
                return true;
              })
              .reduce<typeof prevPopupSpecs>((acc, key) => {
                acc[key] = prevPopupSpecs[key];
                return acc;
              }, {}),
          );

          for (const closeFn of popupCloseFns.current) {
            closeFn();
          }

          popupsToClose.current = [];
          popupCloseFns.current = [];
          popupCloseTimeout.current = null;
        }, POPUP_CLOSE_EVENT_COLLAPSE_TIME_MS);
      }),
    [],
  );

  const popups = useMemo(
    () =>
      Object.keys(popupSpecs).map((id) => {
        const {
          data,
          offset,
          placement,
          renderContents,
          anchorTop,
          anchorLeft,
          anchorWidth,
          forceRemountCounter,
        } = popupSpecs[id];
        const onClose = () => closePopup({ id, forceRemountCounter });
        return (
          <AkPopup
            key={JSON.stringify([id, forceRemountCounter])}
            isOpen
            offset={offset}
            placement={placement}
            content={() => renderContents({ id, data, context, onClose })}
            onClose={onClose}
            popupComponent={PopupComponentWithDropShadow}
            trigger={({ ref }) => (
              <Trigger
                top={anchorTop}
                left={anchorLeft}
                width={anchorWidth}
                innerRef={ref as RefObject<HTMLDivElement>}
              />
            )}
          />
        );
      }),
    [popupSpecs, context, closePopup],
  );

  const openPopupIds = useKeys(popupSpecs);

  return [
    {
      arePopupsOpen: popups.length > 0,
      openPopupIds,
      popupContainer: <div ref={popupContainerRef}>{popups}</div>,
    },
    {
      openPopup,
    },
  ];
};
