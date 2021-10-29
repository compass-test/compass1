import React, { useState } from 'react';
import { SearchResult } from '../src';
import ListIcon from '@atlaskit/icon/glyph/list';
import format from 'date-fns/format';
import Button from '@atlaskit/button/standard-button';
import { TwoColContainer, Col } from '../examples-helpers/two-column-container';
import MockLinkComponent from '../examples-helpers/mock-link-component';

const KitchenSink = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  return (
    <>
      <TwoColContainer>
        <Col>
          <Button
            onClick={() => setIsCollapsed(!isCollapsed)}
            appearance="default"
          >
            Simulate {isCollapsed ? 'full width' : 'narrow space'}
          </Button>
        </Col>
        <Col>
          <p>
            State: <code>{JSON.stringify({ isCollapsed })}</code>
          </p>
        </Col>
      </TwoColContainer>

      <div>
        <SearchResult
          href="#"
          title="PSA: Search Result is shown with custom link component"
          icon={<ListIcon label="list icon" />}
          containerDetail="Facilities Workplace Support"
          timeDetail={<time>{format(new Date(), 'DD/MM')}</time>}
          onSelect={() => window.alert('fired onSelect')}
          onHighlighted={() => window.alert('fired onHighlighted')}
          isCollapsed={isCollapsed}
          label={'QS-001'}
          linkComponent={MockLinkComponent}
        />
      </div>
    </>
  );
};

export default KitchenSink;
