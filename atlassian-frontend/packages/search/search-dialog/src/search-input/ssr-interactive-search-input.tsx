/* eslint-disable import/extensions */
import React, { FC, useRef, useLayoutEffect } from 'react';
import {
  SSRsearchInputField,
  SSRsearchInputContainer,
  SSRdesktopSearchIconWrapper,
  SSRmobileSearchIconWrapper,
  SSRformContainer,
  SSRsearchInputWrapper,
} from './search-input.styled';
// @ts-ignore
import { script } from './ssr-scripts/min-script-interactive-search-input';

import { SearchIcon, LargeSearchIcon } from '../icons';

export interface Props {
  advancedSearchUrl?: string;
  placeholder?: string;
}
export const SSRsearchInput: FC<Props> = ({
  advancedSearchUrl,
  placeholder,
}) => {
  const scriptRef = useRef(null);

  useLayoutEffect(() => {
    const current: any = scriptRef?.current;
    if (current) {
      // eslint-disable-next-line
      eval(current.innerHTML);
    }
  });

  return (
    <SSRsearchInputWrapper>
      <div id="ssr-search-input-popout-container">
        <SSRformContainer id="ssr-form-container">
          <form method="get" action={advancedSearchUrl}>
            <SSRsearchInputContainer id="ssr-input-container">
              <SSRmobileSearchIconWrapper>
                <LargeSearchIcon />
              </SSRmobileSearchIconWrapper>
              <SSRdesktopSearchIconWrapper id="ssr-search-icon-wrapper">
                <SearchIcon />
              </SSRdesktopSearchIconWrapper>
              <SSRsearchInputField
                id="ssr-search-input"
                name="text"
                placeholder={placeholder}
                autoComplete="off"
              />
            </SSRsearchInputContainer>
            <script
              data-test-id="ssr-scripts-init"
              ref={scriptRef}
              dangerouslySetInnerHTML={{ __html: script }}
            />
          </form>
        </SSRformContainer>
      </div>
    </SSRsearchInputWrapper>
  );
};
