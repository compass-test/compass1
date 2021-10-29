import React, { useRef, useState, useEffect } from 'react';
import {
  ThemeProvider,
  SearchAnchor,
  KeyboardHighlightProvider,
  SearchInput,
  SearchDialog,
} from '../src';
import { getMockSearchResults } from '../examples-helpers/mock-data';

const ControlSearchInput = ({
  isExpanded,
  openDialog,
  closeDialog,
  search,
  children,
}: any) => {
  const [value, setValue] = useState('');

  useEffect(() => {
    // Reset, when dialog is collapsed
    if (!isExpanded) {
      setValue('');
    }
  }, [isExpanded]);
  const onInput = (v: any) => {
    console.log('fired onInput for SearchInput, with:', v);
    setValue(v);
    if (v === '') {
      return search();
    }
    return search(v);
  };
  const onClick = () => {
    console.log('fired onClick for SearchInput');
    openDialog();
  };
  const onEnter = () => {
    console.log('fired onEnter for SearchInput');
    // onNavigate();
  };
  const onNavigate = (href: any) => {
    console.log('fired onNavigate for SearchInput');
    // window.location.assign(href);
    closeDialog();
  };
  return children({ onInput, onClick, onEnter, value, onNavigate });
};

const Demo = () => {
  const refSearchInput = useRef(null);
  const [inputExpanded, setInputExpanded] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [searchResults, setSearchResults] = useState([]);
  const search = (value = null) => {
    if (!value) {
      return setSearchResults([]);
    }
    return setSearchResults(getMockSearchResults(3) as any);
  };

  const expandInput = () => {
    console.log('fired expandInput');
    setInputExpanded(true);
  };
  const collapseInput = () => {
    console.log('fired collapseInput');
    setInputExpanded(false);
  };

  const openDialog = () => {
    console.log('fired openDialog');
    setDialogOpen(true);
  };
  const closeDialog = () => {
    console.log('fired closeDialog');
    setDialogOpen(false);
  };

  const onBlur = () => {
    console.log('fired onBlur for SearchAnchor');
    search();
    closeDialog();
    collapseInput();
  };
  const onFocus = () => {
    console.log('fired onFocus for SearchAnchor');
    expandInput();
  };
  const onKeyDown = () => {
    console.log('fired onKeyDown for SearchAnchor');
  };

  return (
    <>
      <div>
        <code>{JSON.stringify({ inputExpanded, dialogOpen })}</code>
      </div>
      <br />

      <ThemeProvider>
        <SearchAnchor
          onBlur={onBlur}
          onFocus={onFocus}
          onKeyDown={onKeyDown}
          isExpanded={inputExpanded}
        >
          <KeyboardHighlightProvider
            listenerNode={refSearchInput && refSearchInput.current}
          >
            <>
              <ControlSearchInput
                isExpanded={true}
                openDialog={openDialog}
                closeDialog={closeDialog}
                search={search}
              >
                {({ onInput, onClick, onEnter, value }: any) => (
                  <SearchInput
                    ref={refSearchInput}
                    isExpanded={true}
                    placeholder="Search"
                    onInput={onInput}
                    onClick={onClick}
                    onEnter={onEnter}
                    value={value}
                  />
                )}
              </ControlSearchInput>
              {dialogOpen && (
                <SearchDialog>
                  <p>Search results:</p>
                  <code>{JSON.stringify(searchResults)}</code>
                </SearchDialog>
              )}
            </>
          </KeyboardHighlightProvider>
        </SearchAnchor>
      </ThemeProvider>
    </>
  );
};

export default Demo;
