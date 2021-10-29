import React, { useEffect, useRef, useMemo } from 'react';
import uuid from 'uuid/v4';
import { noHeightMessagesQueryParameter } from './smart-links-mock-client-utils';

const shouldFireResizeMessagesWithHeight = !new URLSearchParams(
  location.search,
).has(noHeightMessagesQueryParameter);

/**
 * This is an example to be served as a content for iframe's used in embed VR and WD tests.
 * This content duplicates/mocks what iframely would be normally doing for embed sources like:
 * - Twitter and Facebook (they send `resize` message event when their content size changes)
 * - Youtube (we don't use Iframely CDN wrapper but youtube's embed directly, so there is no `resize` event)
 *   to activate this behaviour `&no-messages=true` query parameter should be added.
 * These ^ two scenarios have different code paths in embedCard and other parts, and hence
 * need to be tested separately.
 *
 * See packages/media/media-integration-test-helpers/src/integration/smart-links-mock-client-utils.ts
 * (around line 87)
 */
export function MediaEmbedHtmlSource() {
  const divComponent = useRef<HTMLDivElement>(null);

  const postResizeMessage = useMemo(
    () => () => {
      const height = divComponent?.current?.offsetHeight || 0;
      window.parent.postMessage(
        JSON.stringify({
          method: 'resize',
          ...(shouldFireResizeMessagesWithHeight ? { height } : {}),
        }),
        '*',
      );
    },
    [divComponent],
  );

  useEffect(() => {
    // Usd to uniquely mark current iframe document
    (window as any).uuid = uuid();
    let listener: () => void | undefined;
    if (shouldFireResizeMessagesWithHeight) {
      listener = () => {
        postResizeMessage();
      };
      window.addEventListener('resize', listener);
    }
    postResizeMessage();
    return function cleanup() {
      if (listener) {
        window.removeEventListener('resize', listener);
      }
    };
  });

  return (
    <div
      ref={divComponent}
      style={{
        position: 'relative',
        width: '100%',
        backgroundColor: 'darksalmon',
        boxSizing: 'border-box',
        ...(shouldFireResizeMessagesWithHeight
          ? {
              paddingTop: '40%',
              minHeight: '250px',
            }
          : {
              height: '100%',
            }),
      }}
    >
      <div
        style={{
          position: 'absolute',
          top: 0,
          bottom: 0,
          left: 0,
          right: 0,
          textAlign: 'center',
        }}
      >
        <h1>I am an Embed Content!</h1>
        <h2>expect me ... </h2>
        <h3>...respect me</h3>
      </div>
    </div>
  );
}
