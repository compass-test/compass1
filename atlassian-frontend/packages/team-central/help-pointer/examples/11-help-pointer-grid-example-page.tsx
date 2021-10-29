import React, { useCallback, useState } from 'react';

import styled from '@emotion/styled';
import { IntlProvider } from 'react-intl';

import Textfield from '@atlaskit/textfield';
import { getEmojiResource } from '@atlaskit/util-data-test/get-emoji-resource';

import { HelpPointerGrid } from '../src';

import EditModal from './helpers/EditModal';
import { linkClickCallback } from './helpers/example-callbacks';
import { EXAMPLE_HELP_POINTERS, EXAMPLE_TAGS } from './helpers/example-data';
import RemoveModal from './helpers/RemoveModal';

const SPLIT_REGEX = new RegExp('[# ]');
const emojiProvider = Promise.resolve(getEmojiResource());

const HelpDirectorySizeWrapper = styled.div`
  margin: 20px auto 10px auto;
  max-width: 500px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;
const SearchWrapper = styled.div`
  margin-bottom: 20px;
  width: 100%;
`;

export default function HelpPointerGridExample() {
  const [isLoading, setIsLoading] = useState(false);
  const [queryString, setQueryString] = useState('');

  const tagClickCallback = useCallback(
    (tagValue: string) => setQueryString(tagValue),
    [],
  );
  return (
    <IntlProvider locale={'en'}>
      <HelpDirectorySizeWrapper>
        <SearchWrapper>
          <Textfield
            onChange={(event) =>
              setQueryString((event.target as HTMLInputElement).value)
            }
            value={queryString}
          />
        </SearchWrapper>
        <HelpPointerGrid
          maxColumnCount={1}
          testId="help-pointer-list"
          helpPointers={EXAMPLE_HELP_POINTERS.map((pointer) => ({
            ...pointer,
            editable: true,
          }))}
          searchTerms={{
            query: queryString,
            tags:
              (queryString.length > 1 &&
                EXAMPLE_TAGS.filter((tag) =>
                  queryString
                    .split(SPLIT_REGEX)
                    .filter((term) => term.length > 2)
                    .some((searchTerm) => tag.name.indexOf(searchTerm) !== -1),
                )) ||
              [],
          }}
          showOwner={true}
          emojiProvider={emojiProvider}
          tagClickCallback={tagClickCallback}
          linkClickCallback={linkClickCallback}
          renderRemoveModal={({ close, target }) => (
            <RemoveModal
              close={close}
              target={target}
              isLoading={isLoading}
              setIsLoading={setIsLoading}
            />
          )}
          renderEditModal={({ close, target }) => (
            <EditModal close={close} target={target} />
          )}
        />
      </HelpDirectorySizeWrapper>
    </IntlProvider>
  );
}
