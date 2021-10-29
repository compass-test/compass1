import React, { useCallback, useMemo, useState } from 'react';

import Button from '@atlaskit/button';
import HighlightsIcon from '@atlaskit/icon/glyph/highlights';
import ModalDialog, { ModalBody } from '@atlaskit/modal-dialog';
// AFP-2532 TODO: Fix automatic suppressions below
// eslint-disable-next-line @atlassian/tangerine/import/entry-points
import { colors } from '@atlaskit/theme';

import {
  ALL_CATEGORY,
  DOCS_CODE_INSIGHTS,
  FEATURED_CATEGORY,
  FEATURED_PIPES,
  RECENTLY_ADDED_CATEGORY,
} from '../const';
import { Pipe } from '../types';

import PipeCard from './PipeCard';
import PipeEmptySearch from './PipeEmptySearch';
import PipeModalHeader from './PipeModalHeader';
import PipeSearch from './PipeSearch';
import PipeTag from './PipeTag';
import {
  DiscoverPipesCategories,
  DiscoverPipesCategoryLink,
  DiscoverPipesList,
  DiscoverPipesListWrapper,
  DiscoverPipesPromoMessage,
  DiscoverPipesPromoText,
  DiscoverPipesSearchWrapper,
  DiscoverPipesSidebar,
  DiscoverPipesSuggestPipeWrapper,
  DiscoverPipesWrapper,
} from './styled';
import SuggestPipe from './SuggestPipe';

type Props = {
  pipes: Pipe[];
  setPipe: (pipe: Pipe) => void;
  onCloseDialog: () => void;
};

const DiscoverPipes: React.FC<Props> = ({ pipes, setPipe, onCloseDialog }) => {
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [filteredPipes, setFilteredPipes] = useState<Pipe[]>(pipes);

  const filterPipes = useCallback(
    (query: string, category: string = '') => {
      return pipes
        .filter(
          (item) =>
            item.name.toLowerCase().includes(query) ||
            item.description.toLowerCase().includes(query) ||
            item.tags.some((tag) => tag.toLowerCase() === query) ||
            (item.vendor && item.vendor.name.toLowerCase().includes(query)),
        )
        .filter((item: any) => (category ? category === item.category : true));
    },
    [pipes],
  );

  const onSearch = useCallback(
    (search: string) => {
      setSearch(search);
      setFilteredPipes(search ? filterPipes(search.toLowerCase()) : pipes);
      setSelectedCategory('');
    },
    [pipes, filterPipes],
  );

  const selectCategory = useCallback(
    (selectedCategory: string) => {
      let filteredPipes;
      const search = '';
      if (selectedCategory === RECENTLY_ADDED_CATEGORY) {
        filteredPipes = pipes
          .sort((pipeA: any, pipeB: any) => pipeB.timestamp - pipeA.timestamp)
          .slice(0, 10);
      } else if (selectedCategory === FEATURED_CATEGORY) {
        filteredPipes = pipes.filter(
          (pipe: Pipe) =>
            FEATURED_PIPES.indexOf(pipe.name.toLowerCase()) !== -1,
        );
      } else {
        filteredPipes = filterPipes(search, selectedCategory);
      }
      setSearch(search);
      setFilteredPipes(filteredPipes);
      setSelectedCategory(selectedCategory);
    },
    [filterPipes, pipes],
  );

  const categories = useMemo(() => {
    return pipes
      .reduce((reduction: any[], pipe) => {
        if (reduction.indexOf(pipe.category) === -1) {
          reduction.push(pipe.category);
        }
        return reduction;
      }, [])
      .sort();
  }, [pipes]);

  return (
    <ModalDialog onClose={onCloseDialog} width="x-large" height="80vh">
      <PipeModalHeader heading="Discover pipes" />
      <ModalBody>
        <DiscoverPipesWrapper>
          <DiscoverPipesSidebar>
            <DiscoverPipesSearchWrapper>
              <PipeSearch
                placeholder="Search pipes"
                value={search}
                onChange={(evt) => onSearch(evt.target.value)}
                onClear={() => onSearch('')}
              />
            </DiscoverPipesSearchWrapper>
            <DiscoverPipesCategories>
              {[ALL_CATEGORY, FEATURED_CATEGORY, RECENTLY_ADDED_CATEGORY]
                .concat(categories)
                .map((category) => (
                  <li key={`pipe_category_${category}`}>
                    <DiscoverPipesCategoryLink
                      href="#"
                      onClick={(e) => {
                        e.preventDefault();
                        selectCategory(
                          category === ALL_CATEGORY ? '' : category,
                        );
                      }}
                      isActive={
                        (category === ALL_CATEGORY ? '' : category) ===
                        selectedCategory
                      }
                      isCustom={[
                        ALL_CATEGORY,
                        FEATURED_CATEGORY,
                        RECENTLY_ADDED_CATEGORY,
                      ].includes(category)}
                    >
                      {category}
                    </DiscoverPipesCategoryLink>
                  </li>
                ))}
              <DiscoverPipesSuggestPipeWrapper>
                <SuggestPipe />
              </DiscoverPipesSuggestPipeWrapper>
            </DiscoverPipesCategories>
          </DiscoverPipesSidebar>
          <DiscoverPipesListWrapper>
            <DiscoverPipesPromoMessage>
              <HighlightsIcon
                label="Discover Code Insights Pipes"
                primaryColor={colors.P500}
              />
              <DiscoverPipesPromoText>
                Some integrations now support
                <Button
                  href={DOCS_CODE_INSIGHTS}
                  appearance="link"
                  spacing="none"
                  target="_blank"
                >
                  <strong>code insights</strong>
                </Button>
                .
              </DiscoverPipesPromoText>
              <DiscoverPipesPromoText>
                Check the list by clicking the tag{' '}
                <PipeTag tag="code-insights" onSearch={onSearch} />
              </DiscoverPipesPromoText>
            </DiscoverPipesPromoMessage>
            <DiscoverPipesList>
              {filteredPipes.length ? (
                filteredPipes.map((pipe, pipeIndex) => (
                  <PipeCard
                    key={`pipe_card_${pipeIndex}`}
                    pipe={pipe}
                    onSearch={onSearch}
                    setPipe={setPipe}
                  />
                ))
              ) : (
                <PipeEmptySearch />
              )}
            </DiscoverPipesList>
          </DiscoverPipesListWrapper>
        </DiscoverPipesWrapper>
      </ModalBody>
    </ModalDialog>
  );
};

export default React.memo(DiscoverPipes);
