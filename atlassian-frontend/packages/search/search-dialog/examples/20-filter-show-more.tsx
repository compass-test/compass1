import React from 'react';
import { FilterShowMore, FilterShowMoreItem, OptionType } from '../src';
import Avatar from '@atlaskit/avatar';
import faker from 'faker';
import { AsyncSelectFilterComponent } from '../src/filter-group/show-more/async-select';

const ExampleFilterItem = ({ id }: { id: string }) => (
  <FilterShowMoreItem
    icon={
      <Avatar
        appearance="square"
        size="small"
        src="https://hello.atlassian.net/secure/projectavatar?pid=30630"
      />
    }
    label={id}
  />
);

const exampleFilter = () => {
  const id = faker.random.words(2);
  return {
    label: <ExampleFilterItem id={id} />,
    value: {
      id,
    },
  };
};

const loadOptions = (query: String) => {
  const options = [...Array(3)].map(exampleFilter);

  return new Promise<OptionType<{ id: string }>[]>((resolve) => {
    setTimeout(() => resolve(options));
  });
};

const defaultOptions = [...Array(10)].map(exampleFilter);

export default () => {
  const [justAdded, setJustAdded] = React.useState(null);

  return (
    <>
      <div style={{ paddingBottom: '10px' }}>{`Recently added - ${
        justAdded ? JSON.stringify(justAdded) : ''
      }`}</div>

      <FilterShowMore<any>
        loadOptions={loadOptions}
        defaultOptions={defaultOptions}
        placeholderText="Type to search"
        buttonText="Click me"
        addFilter={(option) => setJustAdded(option.value)}
        isDisabled={false}
        filterComponent={AsyncSelectFilterComponent}
      />
    </>
  );
};
