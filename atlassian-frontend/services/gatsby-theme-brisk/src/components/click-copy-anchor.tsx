import React from 'react';
/** @jsx jsx */
import { jsx, css } from '@emotion/core';

import Popup from '@atlaskit/popup';
import { N0, N800 } from '@atlaskit/theme/colors';
import { borderRadius } from '@atlaskit/theme/constants';

type Props = {
  href: string;
  children: any;
  testId?: string;
};

type State = {
  shouldShowCopyInfo: boolean;
  shouldShowCopyConfirm: boolean;
};

type ReducerAction = {
  type: 'OnClick' | 'OnMouseEnter' | 'OnMouseLeave' | 'DismissCopyConfirm';
};

/* ----- Constants start here ----- */

export const COPY_INFO = 'Copy link to heading';
export const COPY_COMPLETED = 'Copied!';
export const COPY_CONFIRM_TIMEOUT = 3000;

/* ----- Constants end here ----- */

/* ----- CSS starts here ----- */

const PopupCSS = css`
  background-color: ${N800};
  box-sizing: border-box;
  color: ${N0};
  font-size: 12px;
  left: 0;
  line-height: 1.3;
  max-width: 240px;
  padding: 2px 6px;
  top: 0;
  border-radius: ${borderRadius()}px;
  /* Edge does not support overflow-wrap */
  word-wrap: break-word;
  overflow-wrap: break-word;
`;

/* ----- CSS ends here ----- */

/* ----- Util methods start here -----  */

export const extractURLWithHash = (window: Window, newHash: string): string => {
  const fullURLWithHash = window.location.href;
  const existingHashIfAny = window.location.hash;
  const urlWithHash = fullURLWithHash.replace(existingHashIfAny, '') + newHash;
  return urlWithHash;
};

export const copyToClipboard = (str: string): void => {
  try {
    const el = document.createElement('textarea');
    el.value = str;
    el.setAttribute('readonly', '');
    el.style.position = 'absolute';
    el.style.left = '-9999px';
    document.body.appendChild(el);

    el.select();
    document.execCommand('copy');
    document.body.removeChild(el);
  } catch (e) {
    // do nothing
  }
};

/* ----- Util methods end here ----- */

const initialState: State = {
  shouldShowCopyInfo: false,
  shouldShowCopyConfirm: false,
};

export const ActionTypes = {
  OnClick: 'OnClick' as ReducerAction['type'],
  OnMouseEnter: 'OnMouseEnter' as ReducerAction['type'],
  OnMouseLeave: 'OnMouseLeave' as ReducerAction['type'],
  DismissCopyConfirm: 'DismissCopyConfirm' as ReducerAction['type'],
};

/*
  - Only one popup should be visibile at any time
  - copy confirm takes priority over copy info
  - handle complexity gracefully like a state machine
*/
export const reducer = (state: State, action: ReducerAction) => {
  switch (action.type) {
    case ActionTypes.OnClick:
      return {
        ...state,
        shouldShowCopyInfo: false,
        shouldShowCopyConfirm: true,
      };
    case ActionTypes.OnMouseEnter:
      return {
        ...state,
        shouldShowCopyInfo: true,
        shouldShowCopyConfirm: false,
      };
    case ActionTypes.OnMouseLeave:
      return {
        ...state,
        shouldShowCopyInfo: false,
        shouldShowCopyConfirm: false,
      };
    case ActionTypes.DismissCopyConfirm:
      return {
        ...state,
        shouldShowCopyInfo: false,
        shouldShowCopyConfirm: false,
      };
    default:
      throw new Error('Busted custard - unknown action spotted!');
  }
};

const ClickCopyAnchor = ({ href, children, testId }: Props) => {
  const [state, dispatch] = React.useReducer(reducer, initialState);

  const memoizedAnchorOnClick = React.useCallback(
    (e: React.MouseEvent) => {
      e.preventDefault();
      const urlToCopy = extractURLWithHash(window, href);
      copyToClipboard(urlToCopy);
      dispatch({ type: ActionTypes.OnClick });
    },
    [href],
  );

  /* Dismiss copy confirm popup in 3s */
  React.useEffect(() => {
    if (state.shouldShowCopyConfirm) {
      const id = window.setTimeout(() => {
        dispatch({ type: ActionTypes.DismissCopyConfirm });
      }, COPY_CONFIRM_TIMEOUT);
      return () => window.clearTimeout(id);
    }
  }, [state.shouldShowCopyConfirm]);

  const popupText = state.shouldShowCopyInfo ? COPY_INFO : COPY_COMPLETED;

  return (
    <Popup
      isOpen={state.shouldShowCopyInfo || state.shouldShowCopyConfirm}
      onClose={() => dispatch({ type: ActionTypes.DismissCopyConfirm })}
      placement="top"
      content={() => <div css={PopupCSS}>{popupText}</div>}
      trigger={(triggerProps) => (
        <a
          {...triggerProps}
          href={href}
          onClick={memoizedAnchorOnClick}
          onMouseEnter={() => dispatch({ type: ActionTypes.OnMouseEnter })}
          onMouseLeave={() => dispatch({ type: ActionTypes.OnMouseLeave })}
          data-testid={testId}
        >
          {children}
        </a>
      )}
    />
  );
};

export default ClickCopyAnchor;
