import React, { useState } from 'react';
import { ColumnFilterGroup, RowFilterGroup } from '../src';
import { SimpleColFilter, SimpleRowFilter } from './17-filter-item';
import { Col, TwoColContainer } from '../examples-helpers/two-column-container';
import Button from '@atlaskit/button/standard-button';

const Example = () => {
  const [isLoading, setIsLoading] = useState(false);
  return (
    <>
      <TwoColContainer>
        <Col>
          <Button onClick={() => setIsLoading(!isLoading)} appearance="default">
            Simulate {isLoading ? 'loaded' : 'loading'}
          </Button>
        </Col>
        <Col>
          <p>
            State: <code>{JSON.stringify({ isLoading })}</code>
          </p>
        </Col>
      </TwoColContainer>
      <ColumnFilterGroup title="Column Filters" isLoading={isLoading}>
        <SimpleColFilter />
        <SimpleColFilter />
      </ColumnFilterGroup>
      <RowFilterGroup title="Row Filters" isLoading={isLoading}>
        <SimpleRowFilter />
        <SimpleRowFilter />
        <SimpleRowFilter />
        <SimpleRowFilter />
      </RowFilterGroup>
    </>
  );
};

export default Example;
