import React, { FunctionComponent, useEffect } from 'react';
import {
  KeyboardHighlightProvider,
  useKeyboardNavigation,
} from './search-keyboard';
import faker from 'faker';

const Dummy: FunctionComponent<{}> = () => {
  const [isKeyboardHighlighted, ref] = useKeyboardNavigation<HTMLDivElement>();
  return (
    <div ref={ref}>{isKeyboardHighlighted ? 'Highlighted' : '---------'}</div>
  );
};

const DummyAsync: FunctionComponent<{}> = (props) => {
  const [loaded, setLoaded] = React.useState(false);

  useEffect(() => {
    setTimeout(
      () => setLoaded(true),
      faker.random.number({
        min: 300,
        max: 5000,
        precision: 1,
      }),
    );
  }, []);

  if (!loaded) {
    return <div>Loading</div>;
  } else {
    return <Dummy {...props} />;
  }
};

const keys = [...Array(20)].map((_, i) => i);

export const Basic = () => (
  <>
    <div>Default</div>
    {keys.map((key) => (
      <Dummy key={key} />
    ))}
  </>
);

export const ShuffledElements = () => (
  <>
    <div>Shuffled</div>
    <div>
      <p>Section 1</p>
      {keys.slice(0, 3).map((key) => (
        <DummyAsync key={key} />
      ))}
    </div>
    <div>
      <p>Section 2</p>
      {keys.slice(3, 6).map((key) => (
        <DummyAsync key={key} />
      ))}
    </div>
    {keys.slice(6, 9).map((key) => (
      <DummyAsync key={key} />
    ))}
  </>
);

export default {
  title: 'Search Dialog/Search Keyboard',
  decorators: [
    (story: () => React.ElementType) => (
      <KeyboardHighlightProvider listenerNode={document.body}>
        {story()}
      </KeyboardHighlightProvider>
    ),
  ],
};
