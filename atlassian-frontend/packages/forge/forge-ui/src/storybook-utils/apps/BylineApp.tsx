/** @jsx ForgeUI.createElement */
import { ForgeChildren, ForgeElement } from '@atlassian/forge-ui-types';
import ForgeUI, {
  render,
  Button,
  Text,
  useState,
  InlineDialog,
} from '@forge/ui';

// TODO Replace with import from @forge/ui when it is available.
const ContentBylineItem = ('ContentBylineItem' as unknown) as (props: {
  children: ForgeChildren;
}) => ForgeElement;

const App = () => {
  const [isFinished, setIsFinished] = useState(false);
  if (isFinished) {
    return null;
  }

  return (
    <InlineDialog>
      <Text content="Hello World!" />
      <Button text="do the close" onClick={() => setIsFinished(true)} />
    </InlineDialog>
  );
};

export const run = render(
  <ContentBylineItem>
    <App />
  </ContentBylineItem>,
);
