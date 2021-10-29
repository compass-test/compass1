/** @jsx ForgeUI.createElement */
import ForgeUI, {
  render,
  Button,
  Text,
  useProductContext,
  useState,
  InlineDialog,
  ContextMenu,
} from '@forge/ui';

interface ExtensionContext {
  type: string;
}

interface ContextMenuExtensionContext extends ExtensionContext {
  type: 'contextMenu';
  selectedText: string;
}

const isContextMenuExtensionContext = (
  extensionContext: ExtensionContext,
): extensionContext is ContextMenuExtensionContext =>
  extensionContext.type === 'contextMenu';

const App = () => {
  // @ts-ignore fix me when new @forge/ui is released
  const { extensionContext } = useProductContext();
  const [isFinished, setIsFinished] = useState(false);
  if (isFinished) {
    return null;
  }
  if (!extensionContext || !isContextMenuExtensionContext(extensionContext)) {
    throw new Error('not a contextMenu');
  }

  return (
    <InlineDialog>
      <Text content="**You selected**" />
      <Text content={extensionContext.selectedText} format="plaintext" />
      <Button text="do the close" onClick={() => setIsFinished(true)} />
    </InlineDialog>
  );
};

export const run = render(
  <ContextMenu>
    <App />
  </ContextMenu>,
);
