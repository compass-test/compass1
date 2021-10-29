import React from 'react';

import { DefinitionList } from './index';

export const DefinitionListExample = () => (
  <DefinitionList
    items={[
      { term: 'Term', description: 'Some Description' },
      { term: 'Key', description: 'Some Value' },
    ]}
  />
);
