import React from 'react';
import {
  ExtensionHandlers,
  ExtensionParams,
  ExtensionProvider,
  DefaultExtensionProvider,
  ExtensionType,
  ExtensionKey,
  UpdateExtension,
  ExtensionManifest,
  ExtensionModuleNodes,
  FieldDefinition,
  DynamicFieldDefinitions,
  Parameters,
} from '@atlaskit/editor-common/extensions';

const FakeExtension = ({
  colour,
  minWidth = 85,
  children,
}: {
  colour: string;
  minWidth?: number;
  children: React.ReactChild;
}) => {
  return (
    <div
      style={{
        backgroundColor: colour,
        color: 'white',
        padding: 10,
        minWidth,
      }}
    >
      {children}
    </div>
  );
};

const InlineExtension = ({ node }: { node: ExtensionParams<any> }) => {
  return <FakeExtension colour="green">{node.content as string}</FakeExtension>;
};

class InlineAsyncExtension extends React.Component<{
  node: ExtensionParams<any>;
}> {
  state = {
    width: 85,
  };

  private widthTimeoutId: number | undefined;

  render() {
    const { node } = this.props;
    const { width } = this.state;
    return (
      <FakeExtension minWidth={width} colour="green">
        {node.content as string}
      </FakeExtension>
    );
  }

  componentDidMount() {
    this.widthTimeoutId = window.setTimeout(() => {
      this.setState({ width: 285 });
    }, 2000);
  }

  componentWillUnmount() {
    window.clearTimeout(this.widthTimeoutId);
  }
}

const BlockExtension = ({ node }: { node: ExtensionParams<any> }) => {
  return (
    <FakeExtension colour="black">
      <div style={node.parameters.style}>{node.content}</div>
    </FakeExtension>
  );
};

const BodiedExtension = () => {
  return <FakeExtension colour="blue">Bodied extension demo</FakeExtension>;
};

const IFrameExtension = () => {
  return (
    <FakeExtension colour="red">
      <div>
        <div>
          <iframe style={{ background: 'blue', width: 400, height: 200 }} />
        </div>
        <iframe style={{ background: 'yellow', width: 600, height: 300 }} />
      </div>
    </FakeExtension>
  );
};

export const extensionHandlers: ExtensionHandlers = {
  'com.atlassian.confluence.macro.core': (ext) => {
    const { extensionKey } = ext;

    // using any here because most props are going to be injected through the extension handler
    // and typescript won't accept that as valid
    const macroProps: any = {
      node: ext,
    };

    switch (extensionKey) {
      case 'block-eh':
        return <BlockExtension {...macroProps} />;
      case 'block-layout-eh':
        return <BlockExtension {...macroProps} />;
      case 'block-iframe-eh':
        return <IFrameExtension {...macroProps} />;
      case 'bodied-eh':
        return <BodiedExtension {...macroProps} />;
      case 'inline-eh':
        return <InlineExtension {...macroProps} />;
      case 'jql-table':
        return (
          <table>
            <tbody>
              <tr>
                <td>a1</td>
                <td>a2</td>
                <td>a3</td>
              </tr>
              <tr>
                <td>b1</td>
                <td>b2</td>
                <td>b3</td>
              </tr>
              <tr>
                <td>c1</td>
                <td>c2</td>
                <td>c3</td>
              </tr>
            </tbody>
          </table>
        );
      case 'inline-async-eh':
        return <InlineAsyncExtension {...macroProps} />;
    }

    return null;
  },
  'com.atlassian.extensions.update': {
    render: (ext) => {
      return <div>{ext.parameters!.count}</div>;
    },
    update: async (params) => ({
      count: params.count + 1,
    }),
  },
  'com.atlassian.extensions.noupdate': {
    render: () => {
      return <button>This is a test extension</button>;
    },
  },
};

export const createFakeModule = (content: any) => () =>
  Promise.resolve({ __esModule: true, default: content });

export const fakeIcon = createFakeModule(() => <div />);

export type NodeConfig = {
  key: string;
  parameters?: object;
  featured?: boolean;
  getFieldsDefinition?: (
    extensionParameters: Parameters,
  ) => Promise<FieldDefinition[] | DynamicFieldDefinitions<Parameters>>;
};

/**
 * Creates a test manifest with a quick insert item and an
 * auto convert pattern for each node passed
 */
interface CreateFakeExtensionManifestOptions {
  title: string;
  type: ExtensionType;
  extensionKey: ExtensionKey;
  nodes?: NodeConfig[];
  extensionUpdater?: UpdateExtension<object>;
}
export function createFakeExtensionManifest({
  title,
  type,
  extensionKey,
  nodes = [{ key: 'default' }],
  extensionUpdater,
}: CreateFakeExtensionManifestOptions): ExtensionManifest {
  return {
    title,
    type,
    key: extensionKey,
    description: `${title} extension`,
    icons: {
      '16': fakeIcon,
      '48': fakeIcon,
    },
    modules: {
      quickInsert: nodes.map(({ key, parameters = {}, featured = false }) => ({
        key,
        featured,
        action: {
          key,
          type: 'node',
          parameters,
        },
      })),

      nodes: nodes.reduce<ExtensionModuleNodes>((acc, node) => {
        acc[node.key] = {
          type: 'extension',
          render: createFakeModule(() => {
            return <div>My "{name}" extension</div>;
          }),
          update: extensionUpdater,
          ...node,
        };

        return acc;
      }, {}),
    },
  };
}

export function createFakeAutoConvertModule(
  manifest: ExtensionManifest,
  type: 'url',
  items: string[],
): ExtensionManifest {
  const handlers = items.map((link) => {
    return (url: string) => {
      if (url.startsWith(`http://${manifest.key}-${link}`)) {
        return {
          type: 'extension',
          attrs: {
            extensionType: manifest.type,
            extensionKey: manifest.key,
            text: manifest.title,
            parameters: {
              url,
            },
            localId: 'testId',
          },
        };
      }
    };
  });

  // Do not mutate the passed manifest
  const newManifest = {
    ...manifest,
    modules: {
      ...manifest.modules,
      autoConvert: {
        [type]: handlers,
      },
    },
  };

  return newManifest;
}

export function createFakeExtensionProvider(
  extensionType: ExtensionType,
  extensionKey: ExtensionKey,
  extensionHandler: (...args: any) => JSX.Element,
  extensionUpdater?: UpdateExtension<object>,
  nodes?: NodeConfig[],
): ExtensionProvider {
  const macroManifest = createFakeExtensionManifest({
    title: 'fake extension provider',
    type: extensionType,
    extensionKey,
    nodes,
    extensionUpdater,
  });

  const FakeES6Module = {
    __esModule: true,
    default: extensionHandler,
  };

  macroManifest.modules.nodes = macroManifest.modules.nodes || {};
  macroManifest.modules.nodes.default.render = () =>
    Promise.resolve(FakeES6Module);

  const confluenceMacrosExtensionProvider = new DefaultExtensionProvider([
    macroManifest,
  ]);

  return confluenceMacrosExtensionProvider;
}
