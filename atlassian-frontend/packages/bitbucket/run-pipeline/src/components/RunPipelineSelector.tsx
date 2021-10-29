import React, { useCallback, useEffect, useState } from 'react';

import Button from '@atlaskit/button/custom-theme-button';
import Select from '@atlaskit/select';

import { PIPELINE_DEFINITIONS_PAGE_SIZE } from '../const';
import {
  FetchPipelineDefinitions,
  PipelineDefinition,
  PipelineDefinitionOption,
} from '../types';

import { Label, SelectorWrapper } from './styled';

type Props = {
  configurationUrl: string;
  target: string;
  pipelineDefinitionOption: PipelineDefinitionOption | undefined;
  fetchPipelineDefinitions: FetchPipelineDefinitions;
  onChange: (pipelineDefinition: PipelineDefinitionOption | any) => void;
};

const RunPipelineSelector: React.FC<Props> = ({
  configurationUrl,
  target,
  pipelineDefinitionOption,
  fetchPipelineDefinitions,
  onChange,
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [items, setItems] = useState([]);

  const createOption = useCallback((pipelineDefinition: PipelineDefinition) => {
    const { type, pattern } = pipelineDefinition;
    const label = `${type}${pattern ? `: ${pattern}` : ''}`;
    return {
      label,
      value: JSON.stringify({ type, pattern }),
      pipelineDefinition,
    };
  }, []);

  const loadData = useCallback(async () => {
    setIsLoading(true);
    let items: any = [];
    let morePagesAvailable = true;
    let currentPage = 0;
    while (morePagesAvailable) {
      currentPage++;
      try {
        const { values, size } = await fetchPipelineDefinitions(target, {
          pagelen: PIPELINE_DEFINITIONS_PAGE_SIZE,
          page: currentPage,
        });
        items = items.concat(values.map(createOption));
        morePagesAvailable =
          size > currentPage * PIPELINE_DEFINITIONS_PAGE_SIZE;
      } catch (ignore) {
        morePagesAvailable = false;
      }
    }
    setItems(items);
    setIsLoading(false);
    const firstDefinition = items[0];
    if (firstDefinition) {
      onChange(firstDefinition);
    }
  }, [createOption, fetchPipelineDefinitions, onChange, target]);

  useEffect(() => {
    if (target) {
      loadData();
    }
  }, [loadData, target]);

  return (
    <>
      <SelectorWrapper>
        <Label>Pipeline</Label>
        <Select<PipelineDefinitionOption>
          isDisabled={!target}
          isLoading={isLoading}
          onChange={onChange}
          options={items}
          value={pipelineDefinitionOption}
          placeholder="Select a pipeline"
          noMatchesFound="No pipelines found"
          defaultOptions
          position="bottom left"
          id="run-pipeline-selector-select"
          instanceId="run-pipeline-selector-select"
        />
      </SelectorWrapper>
      <Button
        href={configurationUrl}
        target="_blank"
        spacing="none"
        appearance="link"
        isDisabled={!target}
      >
        See configuration
      </Button>
    </>
  );
};

export default React.memo(RunPipelineSelector);
