import React, { useState } from 'react';
import { FilterColLabelText, FilterItem, FilterRowLabelText } from '../src';
import Avatar from '@atlaskit/avatar';
import { Col, TwoColContainer } from '../examples-helpers/two-column-container';
import Button from '@atlaskit/button/standard-button';

export const SimpleColFilter = () => {
  const [isChecked, setIsChecked] = useState(false);
  return (
    <FilterItem
      value={'value'}
      onChange={() => setIsChecked(!isChecked)}
      icon={
        <Avatar
          appearance="square"
          size="small"
          src="https://hello.atlassian.net/secure/projectavatar?pid=30630"
        />
      }
      label={'Spaceship Project'}
      isChecked={isChecked}
      defaultChecked={Boolean(Math.random() >= 0.5)}
      LabelComponent={FilterColLabelText}
    />
  );
};

export const SimpleRowFilter = () => {
  const [isChecked, setIsChecked] = useState(false);
  return (
    <FilterItem
      value={'value'}
      onChange={() => setIsChecked(!isChecked)}
      label={'Open'}
      isChecked={isChecked}
      defaultChecked={Boolean(Math.random() >= 0.5)}
      LabelComponent={FilterRowLabelText}
    />
  );
};

const ExampleColFilter = () => {
  const [isChecked, setIsChecked] = useState(false);
  return (
    <>
      <TwoColContainer>
        <Col>
          <Button onClick={() => setIsChecked(!isChecked)} appearance="default">
            Simulate {isChecked ? 'select' : 'unselect'}
          </Button>
        </Col>
        <Col>
          <p>
            State: <code>{JSON.stringify({ isChecked })}</code>
          </p>
        </Col>
      </TwoColContainer>
      <FilterItem
        value={'value'}
        onChange={() => setIsChecked(!isChecked)}
        icon={
          <Avatar
            appearance="square"
            size="small"
            src="https://hello.atlassian.net/secure/projectavatar?pid=30630"
          />
        }
        label={'Spaceship Project'}
        isChecked={isChecked}
        LabelComponent={FilterColLabelText}
      />
    </>
  );
};

const ExampleRowFilter = () => {
  const [isChecked, setIsChecked] = useState(false);
  return (
    <>
      <TwoColContainer>
        <Col>
          <Button onClick={() => setIsChecked(!isChecked)} appearance="default">
            Simulate {isChecked ? 'select' : 'unselect'}
          </Button>
        </Col>
        <Col>
          <p>
            State: <code>{JSON.stringify({ isChecked })}</code>
          </p>
        </Col>
      </TwoColContainer>
      <FilterItem
        value={'value'}
        onChange={() => setIsChecked(!isChecked)}
        label={'Open'}
        isChecked={isChecked}
        LabelComponent={FilterRowLabelText}
      />
    </>
  );
};

const ExampleFilterGroups = () => {
  const [filterGroup, setFilterGroup] = useState('col');
  return (
    <>
      <TwoColContainer>
        <Col>
          <Button
            onClick={() => setFilterGroup((f) => (f === 'col' ? 'row' : 'col'))}
            appearance="default"
          >
            Show {filterGroup === 'col' ? 'Row' : 'Column'} Filter Group
          </Button>
        </Col>
        <Col>
          <p>
            Current Filter Group:{' '}
            <code>{filterGroup === 'col' ? 'Column' : 'Row'}</code>
          </p>
        </Col>
      </TwoColContainer>
      {filterGroup === 'col' ? <ExampleColFilter /> : <ExampleRowFilter />}
    </>
  );
};

export default ExampleFilterGroups;
