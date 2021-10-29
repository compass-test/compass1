/** @jsx ForgeUI.createElement */
import { ForgeChildren, ForgeElement } from '@atlassian/forge-ui-types';
import ForgeUI, { render, Fragment, Text } from '@forge/ui';

// TODO Replace with import from @forge/ui when it is available.
const SpaceSettings = ('SpaceSettings' as unknown) as (props: {
  children: ForgeChildren;
}) => ForgeElement;

const App = () => {
  return (
    <Fragment>
      <Text>Space Settings Content</Text>
    </Fragment>
  );
};

export const run = render(
  <SpaceSettings>
    <App />
  </SpaceSettings>,
);
