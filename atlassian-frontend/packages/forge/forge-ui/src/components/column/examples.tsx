import React from 'react';
import {
  ButtonProps,
  ColumnProps,
  ColumnsProps,
} from '@atlassian/forge-ui-types';
import {
  createDefaultExport,
  createExampleComponent,
} from '@atlassian/aux-test-utils';
import { Button as DefaultButton } from '../button';
import Image from '../image';
import { Column as DefaultColumn } from './Column';
import { Columns as DefaultColumns } from './Columns';

const Button = createExampleComponent<ButtonProps>(DefaultButton);
const Column = createExampleComponent<ColumnProps>(DefaultColumn);
const Columns = createExampleComponent<ColumnsProps>(DefaultColumns);

export const ThreeColumn = () => {
  return (
    <Columns>
      <Column>
        <Button text="One" onClick={() => {}} />
      </Column>
      <Column>
        <Button text="Two" onClick={() => {}} />
      </Column>
      <Column>
        <Button text="Three" onClick={() => {}} />
      </Column>
    </Columns>
  );
};

export const ThreeColumnVariableWidth = () => {
  return (
    <Columns>
      <Column>
        <Button text="Three" onClick={() => {}} />
      </Column>
      <Column width={2}>
        <Image
          src="https://wac-cdn.atlassian.com/dam/jcr:b86a32cb-0aa8-4783-aa81-9592d4fbf829/jsw-header-illustrations---v3.png"
          alt="homer"
        />
      </Column>
      <Column>
        <Button text="Three" onClick={() => {}} />
      </Column>
    </Columns>
  );
};

export default createDefaultExport();
