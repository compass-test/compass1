import React, { useCallback, useEffect, useMemo, useState } from 'react';

import Button from '@atlaskit/button';

import { FEATURED_PIPES } from '../const';
import { Pipe } from '../types';
import { getPipes } from '../utils/getPipes';

import CopyYml from './CopyYml';
import DiscoverPipesModal from './DiscoverPipesModal';
import PipeDetailModal from './PipeDetailModal';
import PipeEmptySearch from './PipeEmptySearch';
import PipeSearch from './PipeSearch';
import {
  ExplorePipesButton,
  PipeDescription,
  PipeIcon,
  PipeItem,
  PipeListWrapper,
  PipeText,
  PipeTitle,
} from './styled';

type Props = {
  onOpenPipeDetail?: (pipe: Pipe) => void;
};

const PipeList: React.FC<Props> = ({ onOpenPipeDetail }) => {
  const [pipe, setPipe] = useState<Pipe>();
  const [pipes, setPipes] = useState<Pipe[]>([]);
  const [search, setSearch] = useState('');
  const [filteredPipes, setFilteredPipes] = useState<Pipe[]>([]);
  const [showDiscoverPipes, setShowDiscoverPipes] = useState(false);

  useEffect(() => {
    getPipes().then((allPipes: Pipe[]) => {
      setPipes(allPipes);
      setFilteredPipes(allPipes);
    });
  }, []);

  const featuredPipes = useMemo(() => {
    return filteredPipes.filter((p) =>
      filteredPipes.length !== pipes.length
        ? true
        : FEATURED_PIPES.includes(p.name.toLowerCase()),
    );
  }, [pipes, filteredPipes]);

  const onPipeClick = useCallback(
    (pipe: Pipe) => {
      if (onOpenPipeDetail) {
        onOpenPipeDetail(pipe);
      } else {
        setPipe(pipe);
      }
    },
    [onOpenPipeDetail],
  );

  const onClearSearch = useCallback(() => {
    setSearch('');
    setFilteredPipes(pipes);
  }, [pipes]);

  const onSearch = useCallback(
    (evt: any) => {
      const value = evt.target.value;
      const normalisedInput = value.toLowerCase();

      setSearch(value);
      setFilteredPipes(
        value
          ? pipes.filter(
              (item: any) =>
                item.name.toLowerCase().includes(normalisedInput) ||
                item.description.toLowerCase().includes(normalisedInput) ||
                item.tags.some(
                  (tag: any) => tag.toLowerCase() === normalisedInput,
                ) ||
                (item.vendor &&
                  item.vendor.name.toLowerCase().includes(normalisedInput)),
            )
          : pipes,
      );
    },
    [pipes],
  );

  return (
    <PipeListWrapper>
      <PipeSearch
        placeholder="Search pipes"
        value={search}
        onChange={onSearch}
        onClear={onClearSearch}
      />
      {featuredPipes.map((pipe, id) => {
        return (
          <PipeItem key={`pipe_${id}`}>
            <PipeIcon>
              <img src={pipe.logo} alt={pipe.name} />
            </PipeIcon>
            <PipeText onClick={() => onPipeClick(pipe)}>
              <PipeTitle>
                <h4>{pipe.name}</h4>
              </PipeTitle>
              <PipeDescription>{pipe.description}</PipeDescription>
            </PipeText>
            <CopyYml
              yml={pipe.yml}
              oneClickCopy={true}
              isPipe={true}
              name={pipe.name}
            />
          </PipeItem>
        );
      })}
      {featuredPipes.length === 0 ? <PipeEmptySearch hasSmallIcon /> : null}
      <ExplorePipesButton>
        <Button onClick={() => setShowDiscoverPipes(true)}>
          Explore more pipes
        </Button>
      </ExplorePipesButton>
      {pipe && (
        <PipeDetailModal pipe={pipe} onCloseDialog={() => setPipe(undefined)} />
      )}
      {showDiscoverPipes && (
        <DiscoverPipesModal
          onCloseDialog={() => setShowDiscoverPipes(false)}
          setPipe={setPipe}
          pipes={pipes}
        />
      )}
    </PipeListWrapper>
  );
};

export default React.memo(PipeList);
