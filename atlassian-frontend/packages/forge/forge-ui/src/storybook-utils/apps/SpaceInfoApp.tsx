/** @jsx ForgeUI.createElement */
import ForgeUI, {
  render,
  Text,
  useProductContext,
  useState,
  ModalDialog,
  ContentAction,
} from '@forge/ui';

interface ExtensionContext {
  type: string;
}

interface ContentActionExtensionContext extends ExtensionContext {
  type: 'contentAction';
  spaceId?: string;
  spaceKey?: string;
  contentId?: string;
}

const isContentActionExtensionContext = (
  extensionContext: ExtensionContext,
): extensionContext is ContentActionExtensionContext =>
  extensionContext.type === 'contentAction';

const App = () => {
  const [isOpen, setOpen] = useState(true);
  // @ts-ignore fix me when new @forge/ui is released
  const { extensionContext } = useProductContext();

  if (!isOpen) {
    return null;
  }

  if (!extensionContext || !isContentActionExtensionContext(extensionContext)) {
    throw new Error('not a content action');
  }
  const contentActionExtensionContext: ContentActionExtensionContext = extensionContext;

  return (
    <ModalDialog header="Space Info" onClose={() => setOpen(false)}>
      <Text
        content={JSON.stringify(contentActionExtensionContext, null, 2)}
        format="plaintext"
      />
    </ModalDialog>
  );
};

export const run = render(
  <ContentAction>
    <App />
  </ContentAction>,
);
