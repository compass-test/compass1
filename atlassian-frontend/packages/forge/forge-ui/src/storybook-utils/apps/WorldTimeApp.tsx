/** @jsx ForgeUI.createElement */
import ForgeUI, { render, Fragment, Text } from '@forge/ui';
import { ForgeChildren, ForgeElement } from '@atlassian/forge-ui-types';

// TODO Replace with import from @forge/ui when it is available.
const HomepageFeed = ('HomepageFeed' as unknown) as (props: {
  children: ForgeChildren;
}) => ForgeElement;

const App = () => {
  const clocks = [
    {
      timeZone: 'America/Los_Angeles',
      city: 'Mountain View, California, USA',
    },
    {
      timeZone: 'America/New_York',
      city: 'New York, New York, USA',
    },
    {
      timeZone: 'Australia/Sydney',
      city: 'Sydney, Australia',
    },
    {
      timeZone: 'Asia/Tokyo',
      city: 'Tokyo, Japan',
    },
  ];

  return (
    <Fragment>
      {clocks.map((clock) => (
        <Fragment key={clock.timeZone}>
          <Text>{clock.city}</Text>
          <Text>
            {new Date().toLocaleTimeString('en-US', {
              timeZone: clock.timeZone,
            })}
          </Text>
        </Fragment>
      ))}
    </Fragment>
  );
};

export const run = render(
  <HomepageFeed>
    <App />
  </HomepageFeed>,
);
