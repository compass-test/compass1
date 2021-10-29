import React, { FunctionComponent } from 'react';
import { useABTest, ABTestContextProvider } from './';

export default {
  title: 'AB Test Context Provider',
  decorators: [(story: () => React.ElementType) => story()],
};

const MockProduct: FunctionComponent = ({ children }) => {
  const abTest = useABTest();

  return (
    <>
      <div style={{ color: abTest ? 'green' : 'red' }}>
        The current ab test data is {JSON.stringify(abTest)}
      </div>
      {abTest ? children : null}
    </>
  );
};

export const Basic = () => {
  return (
    <ABTestContextProvider>
      <div>
        The search client will be set and ab test data will be retrieved after
        after 3 seconds
      </div>
      <MockProduct>
        <div>
          I am a child of the product, you won't see me until ab test data
          arrives
        </div>
      </MockProduct>
    </ABTestContextProvider>
  );
};
