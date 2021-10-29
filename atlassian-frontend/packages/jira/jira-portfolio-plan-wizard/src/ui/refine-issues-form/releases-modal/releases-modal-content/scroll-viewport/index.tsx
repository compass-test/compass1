import React, { useCallback, useEffect, useRef, useState } from 'react';

import {
  HTMLElementRef,
  ScrollViewportProps,
  ScrollViewportRowProps,
} from './types';
/**
 * Gets the initial offset Y of the rows as the base offset Y.
 */
const useBaseOffsetY = (
  containerRef: HTMLElementRef,
  contentRef: HTMLElementRef,
): number | null => {
  const offsetYRef = useRef<number>(null);

  useEffect(() => {
    const containerEl = containerRef.current;
    const contentEl = contentRef.current;

    if (containerEl == null || contentEl == null) {
      return;
    }

    (offsetYRef as React.MutableRefObject<number>).current =
      contentEl.getBoundingClientRect().top -
      containerEl.getBoundingClientRect().top +
      containerEl.scrollTop;
  }, [containerRef, contentRef]);

  return offsetYRef.current;
};

type ViewportPayload<T> = {
  items: T[];
  offsetY: number;
};

const useViewport = <T,>({
  containerRef,
  contentRef,
  itemHeight,
  items,
}: {
  containerRef: HTMLElementRef;
  contentRef: HTMLElementRef;
  itemHeight: number;
  items: T[];
}) => {
  const baseOffsetY = useBaseOffsetY(containerRef, contentRef);
  const numOfItems = items.length;
  const [payload, setPayload] = useState<ViewportPayload<T>>({
    items: [],
    offsetY: 0,
  });
  const resetPayload = useCallback(() => {
    const containerEl = containerRef.current;
    const contentEl = contentRef.current;

    // Type guarding
    if (containerEl == null || contentEl == null || baseOffsetY == null) {
      return;
    }

    const scrollTop = containerEl.scrollTop;
    const viewportHeight = containerEl.offsetHeight;
    const containerRect = containerEl.getBoundingClientRect();
    const maxNumOfVisibleItems =
      Math.floor(containerRect.height / itemHeight) +
      2; /* includes the item on top and the item at the bottom */

    /** The index of the last item that could be visible inside the viewport */
    const visibleTo = Math.floor(
      (scrollTop + viewportHeight - baseOffsetY) / itemHeight,
    );

    /** The index of the first item to render */
    const renderFrom = Math.max(0, visibleTo - maxNumOfVisibleItems * 2);

    /** The index of the last item to render */
    const renderTo = Math.min(visibleTo + maxNumOfVisibleItems, numOfItems - 1);

    const itemsToRender = items.slice(renderFrom, renderTo + 1);

    setPayload({
      items: itemsToRender,
      offsetY: renderFrom * itemHeight,
    });
  }, [containerRef, contentRef, itemHeight, items, numOfItems, baseOffsetY]);

  useEffect(() => {
    resetPayload();
  }, [resetPayload]);

  useEffect(() => {
    const containerEl = containerRef.current;
    if (containerEl == null) {
      return;
    }

    const handler = (e: Event) => {
      const containerEl = e.currentTarget as HTMLElement;
      if (containerEl == null) {
        return;
      }
      resetPayload();
    };

    containerEl.addEventListener('scroll', handler);
    return () => containerEl.removeEventListener('scroll', handler);
  }, [containerRef, resetPayload]);

  return payload;
};

/**
 * ScrollViewport renders the scroll content only the rows that are visible.
 */
export const ScrollViewport = <T,>({
  containerRef,
  itemHeight,
  items: allItems,
  renderRow,
}: ScrollViewportProps<T>): JSX.Element => {
  const contentRef = useRef<HTMLDivElement>(null);
  const { items, offsetY } = useViewport<T>({
    containerRef,
    contentRef,
    itemHeight: itemHeight,
    items: allItems,
  });

  return (
    <div
      ref={contentRef}
      style={{ position: 'relative', height: itemHeight * allItems.length }}
    >
      {items.map((item, index) =>
        renderRow(item, offsetY + index * itemHeight),
      )}
    </div>
  );
};

export const ScrollViewportRow: React.FC<ScrollViewportRowProps> = ({
  offsetY,
  children,
}) => {
  return (
    <div
      style={{
        position: 'absolute',
        top: offsetY,
        width: '100%',
      }}
    >
      {children}
    </div>
  );
};
