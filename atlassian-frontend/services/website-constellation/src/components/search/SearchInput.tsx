/** @jsx jsx */
import { SearchInput } from '@atlassian/search-dialog';
import { jsx, CSSObject } from '@emotion/core';
import { useEffect, useState, forwardRef, Ref } from 'react';
// eslint-disable-next-line import/no-extraneous-dependencies
import { connectSearchBox } from 'react-instantsearch-dom';
import { colors } from '@atlaskit/theme';

const searchboxWrapperCSS: CSSObject = {
  '& ::placeholder': {
    color: colors.N200,
    paddingBottom: '0px',
  },
};

const visuallyHiddenCSS: CSSObject = {
  clip: 'rect(0 0 0 0)',
  clipPath: 'inset(50%)',
  height: '1px',
  overflow: 'hidden',
  position: 'absolute',
  whiteSpace: 'nowrap',
  width: '1px',
};

const SearchBox = connectSearchBox(
  ({ onClick, onKeyDown, currentRefinement, refine, forwardRef, ...rest }) => {
    // Add a debouncer to reduce the amount of searches that occur (and also flicker)
    const [inputValue, setInputValue] = useState('');
    useEffect(() => {
      const handler = setTimeout(() => {
        refine(inputValue);
      }, 150);

      return () => clearTimeout(handler);
    }, [inputValue, refine]);
    /** NOTE: extra div added here purely to capture onKeydown events,
    as the SearchInput we're using has a much more limited hook for the onKeyDown event
    (only allows us to access Enter key events).

    Also, the implicit (wrapped) label element with the visually-hidden
    span is a workaround to label the SearchInput as it doesn't expose an
    id, aria-label or aria-labelledby prop for us to pass a label in through.
    */
    return (
      // eslint-disable-next-line jsx-a11y/label-has-associated-control,jsx-a11y/label-has-for
      <label>
        <span css={visuallyHiddenCSS}>Search</span>
        {/* eslint-disable-next-line jsx-a11y/no-static-element-interactions */}
        <div css={searchboxWrapperCSS} onKeyDown={onKeyDown}>
          <SearchInput
            ref={forwardRef}
            onClick={onClick}
            onInput={(value) => {
              setInputValue(value);
            }}
            tooltipContent={<span>Search</span>}
            placeholder="Search"
            isExpanded={false}
            value={inputValue}
            aria-label="Search"
          />
        </div>
      </label>
    );
  },
);

export default forwardRef((props, ref: Ref<HTMLInputElement>) => (
  <SearchBox {...props} forwardRef={ref} />
));
