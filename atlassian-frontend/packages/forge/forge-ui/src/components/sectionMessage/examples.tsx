import React from 'react';
import SectionMessage from './';
import { TextPlain } from '../text';
import { createDefaultExport } from '@atlassian/aux-test-utils';

export default createDefaultExport();

export const basic = () => (
  <div>
    <SectionMessage title="The One Ring" appearance="info">
      <TextPlain content="Three Rings for the Elven Lords under the Sky" />
    </SectionMessage>
    <SectionMessage appearance="warning">
      <TextPlain
        content={`Seven for the Dwarf Lords in their halls of Stone
Nine for Mortal Men doomed to die`}
      />
    </SectionMessage>
    <SectionMessage appearance="error">
      <TextPlain
        content={`One for the Dark Lord on his dark throne
In the Land of Mordor where the Shadows lie`}
      />
    </SectionMessage>
    <SectionMessage appearance="confirmation">
      <TextPlain
        content={`One Ring to rule them all, One Ring to find them
One Ring to bring them all and in the darkness bind them`}
      />
    </SectionMessage>
  </div>
);
