/** @jsx jsx */
import { css, jsx } from '@emotion/core';
import { useState } from 'react';
import { useAnalyticsEvents } from '@atlaskit/analytics-next/useAnalyticsEvents';
import { UI_EVENT_TYPE } from '@atlaskit/analytics-gas-types';
import Button from '@atlaskit/button';

import ModalDialog, {
  ModalTransition,
  ModalFooter as AKModalFooter,
  ModalBody,
  ModalTitle,
  ModalHeader,
} from '@atlaskit/modal-dialog';

import { gridSize } from '@atlaskit/theme/constants';
import type { Extension } from '../../web-client';
import { FORGE_UI_ANALYTICS_CHANNEL } from '../../analytics';

import { NavigatePayload } from '../useBridge';

import { navigate } from './navigate';

type ModalState =
  | {
      state: 'open';
      url: string;
      onConfirm: () => void;
      onCancel: () => void;
    }
  | {
      state: 'closed';
    };

const cssActionItem = css`
  flex: 1 0 auto;
  margin: 0 ${gridSize() / 2}px;
`;

export function useNavigation({
  extension,
  push,
}: {
  extension: Pick<Extension, 'properties'>;
  push?: (path: string, state?: any) => void;
}) {
  const [modalState, setModalState] = useState<ModalState>({ state: 'closed' });
  const { createAnalyticsEvent } = useAnalyticsEvents();

  return {
    onNavigate: async ({ type, url }: NavigatePayload): Promise<void> => {
      const linkType = getLinkType(url);
      if (linkType === 'invalid') {
        throw new Error(`navigate link is invalid: ${url}`);
      }
      if (linkType === 'trusted') {
        navigate(url, type, push);
        return;
      }
      const analyticsAttributes = getAnalyticsAttributes(url);
      return new Promise((resolve, reject) => {
        createAnalyticsEvent({
          eventType: UI_EVENT_TYPE,
          data: {
            action: 'viewed',
            actionSubject: 'externalLinkModal',
            attributes: analyticsAttributes,
          },
        }).fire(FORGE_UI_ANALYTICS_CHANNEL);
        setModalState({
          state: 'open',
          url,
          onConfirm: () => {
            navigate(url, type, push);
            createAnalyticsEvent({
              eventType: UI_EVENT_TYPE,
              data: {
                action: 'approved',
                actionSubject: 'externalLinkModal',
                attributes: analyticsAttributes,
              },
            }).fire(FORGE_UI_ANALYTICS_CHANNEL);
            resolve();
          },
          onCancel: () => {
            createAnalyticsEvent({
              eventType: UI_EVENT_TYPE,
              data: {
                action: 'cancelled',
                actionSubject: 'externalLinkModal',
                attributes: analyticsAttributes,
              },
            }).fire(FORGE_UI_ANALYTICS_CHANNEL);
            reject(new Error('cancelled'));
          },
        });
      });
    },

    getModalJsx: () => {
      if (modalState.state === 'closed') {
        return <ModalTransition />;
      }
      const targetUrl = new URL(modalState.url);
      const ModalFooter = () => {
        return (
          <AKModalFooter>
            <div
              css={{
                display: 'flex',
                justifyContent: 'space-between',
                width: '100%',
              }}
            >
              <Button
                css={{ padding: 0, '> span': { margin: 0 } }}
                href="https://go.atlassian.com/forge-help-app-security"
                appearance="subtle-link"
                target="_blank"
                rel="noopener noreferrer"
              >
                Learn more about app security
              </Button>
              <div
                css={css`
                  display: inline-flex;
                  margin: 0 -${gridSize() / 2}px;
                `}
              >
                <div css={cssActionItem}>
                  <Button
                    appearance="subtle"
                    onClick={() => {
                      setModalState({ state: 'closed' });
                      modalState.onCancel();
                    }}
                  >
                    Cancel
                  </Button>
                </div>
                <div css={cssActionItem}>
                  <Button
                    appearance="warning"
                    onClick={() => {
                      modalState.onConfirm();
                      setModalState({ state: 'closed' });
                    }}
                  >
                    Continue
                  </Button>
                </div>
              </div>
            </div>
          </AKModalFooter>
        );
      };
      return (
        <ModalTransition>
          <ModalDialog
            onClose={() => {
              setModalState({ state: 'closed' });
              modalState.onCancel();
            }}
          >
            <ModalHeader>
              <ModalTitle appearance="warning">
                {`Opening external page on ${targetUrl.hostname}`}
              </ModalTitle>
            </ModalHeader>

            <ModalBody>
              {extension.properties?.title ? (
                <p>
                  <strong>{extension.properties.title}</strong> is sending you
                  to an external page. Ensure you trust that page before you
                  continue.
                </p>
              ) : (
                <p>
                  <strong>This app</strong> is sending you to an external page.
                  Ensure you trust that page before you continue.
                </p>
              )}
              <p css={{ wordBreak: 'break-all' }}>{modalState.url}</p>
            </ModalBody>
            <ModalFooter />
          </ModalDialog>
        </ModalTransition>
      );
    },
  };
}

// Exported for testing only
export function getLinkType(
  urlString: string,
): 'external' | 'trusted' | 'invalid' {
  if (urlString.startsWith('//')) {
    return 'invalid';
  }
  if (urlString.startsWith('/')) {
    return 'trusted';
  }
  try {
    const url = new URL(urlString);
    if (['https:', 'http:'].includes(url.protocol)) {
      return 'external';
    }
  } catch {}
  return 'invalid';
}

// Exported for testing only
export function getAnalyticsAttributes(url: string): Record<string, any> {
  const queryUrl = new URL(
    url.startsWith('/') ? `https://example.com${url}` : url,
  );
  // Don't count the initial `?` in the query string length.
  const queryStringSize =
    queryUrl.search.length > 1 ? queryUrl.search.length - 1 : 0;
  return {
    url,
    queryStringSize,
  };
}
