import {
  PortalProviderAPI,
  EventDispatcher,
  createPMSchemaAndPlugins,
  Preset,
  LightEditorPlugin,
  DispatchAnalyticsEvent,
  createTypeAheadTools,
} from '@atlaskit/editor-core/test-utils';

import { ProviderFactory } from '@atlaskit/editor-common/provider-factory';
import { EditorView } from 'prosemirror-view';
import { EditorState, Plugin, PluginKey } from 'prosemirror-state';
import { Schema } from 'prosemirror-model';
import { Refs, DocBuilder } from './doc-builder';
import { setSelection } from './utils/set-selection';
import { createDispatch } from '@atlaskit/editor-core/src/event-dispatcher';
import { FeatureFlags } from '@atlaskit/editor-core/test-utils';
export { Preset } from '@atlaskit/editor-core/test-utils';
export type {
  LightEditorPlugin,
  DispatchAnalyticsEvent,
} from '@atlaskit/editor-core/test-utils';

function createEmptyDoc(schema: Schema) {
  return schema.nodes.doc.create(schema.nodes.paragraph.create());
}
interface SchemaExclude {
  nodes?: string[];
  marks?: string[];
}

class PortalProviderMock extends EventDispatcher implements PortalProviderAPI {
  portals = new Map();
  context: any;

  setContext = () => {};
  render() {}
  forceUpdate() {}
  remove() {}
  static create() {
    return new PortalProviderMock();
  }
}

type GetPluginType<K> = K extends undefined ? null : Plugin;

export interface CreatePMEditorOptions {
  doc?: DocBuilder;
  pluginKey?: PluginKey;
  preset?: Preset<LightEditorPlugin>;
  providerFactory?: ProviderFactory;
  schemaConfig?: {
    exclude?: SchemaExclude;
  };
  attachTo?: HTMLElement;
  featureFlags?: FeatureFlags;
}

export type TypeAheadTool = ReturnType<typeof createTypeAheadTools>;
interface CreatePMEEditorOutput<K, T> {
  editorView: EditorView;
  eventDispatcher: EventDispatcher;
  dispatchAnalyticsEvent: DispatchAnalyticsEvent;
  refs: Refs;
  sel: number;
  plugin: GetPluginType<K>;
  pluginState: T;
  typeAheadTool: TypeAheadTool;
}

export function createProsemirrorEditorFactory() {
  let editorView: EditorView;
  let eventDispatcher: EventDispatcher;

  let observeMock = {
    observe: jest.fn(),
    disconnect: jest.fn(),
  };

  (window as any).ResizeObserver = () => observeMock;

  afterEach(() => {
    if (editorView) {
      editorView.destroy();
    }
    if (eventDispatcher) {
      eventDispatcher.destroy();
    }
  });
  return <T, K extends PluginKey | undefined>({
    doc,
    pluginKey,
    attachTo,
    preset,
    providerFactory = new ProviderFactory(),
    schemaConfig: schemaConfig = { exclude: undefined },
    featureFlags = {},
  }: CreatePMEditorOptions): CreatePMEEditorOutput<K, T> => {
    const eventDispatcher = new EventDispatcher();
    const dispatchAnalyticsEvent: DispatchAnalyticsEvent = jest.fn();
    // This allow test to remove node from the full schema
    const {
      plugins,
      schema,
      onEditorViewStateUpdatedCallbacks,
    } = createPMSchemaAndPlugins(preset)({
      providerFactory,
      eventDispatcher,
      dispatch: createDispatch(eventDispatcher),

      // Need to mock (Will only exist on a fully editor experience)
      props: {}, // This might no be necessary after Stan PR
      portalProviderAPI: PortalProviderMock.create(),
      reactContext: () =>
        ({
          // We need to mock format message, type ahead use this
          intl: {
            formatMessage(messageDescriptor: { defaultMessage: string }) {
              return messageDescriptor.defaultMessage;
            },
          },
        } as any),
      dispatchAnalyticsEvent,
      featureFlags,
    });

    const state = EditorState.create({
      doc: doc ? doc(schema) : createEmptyDoc(schema),
      plugins,
    });

    editorView = new EditorView(attachTo, {
      state,
      dispatchTransaction(tr) {
        const oldEditorState = editorView.state;
        const {
          state: editorState,
          transactions,
        } = oldEditorState.applyTransaction(tr);

        editorView.updateState(editorState);
        onEditorViewStateUpdatedCallbacks.forEach((cb) => {
          cb({
            originalTransaction: tr,
            transactions,
            newEditorState: editorState,
            oldEditorState,
          });
        });
      },
    });

    const refs = setSelection(doc, editorView);

    let plugin = null;
    let pluginState;

    if (pluginKey) {
      plugin = pluginKey.get(editorView!.state);
      pluginState = pluginKey.getState(editorView!.state);
    }

    return {
      editorView,
      eventDispatcher,
      dispatchAnalyticsEvent,
      refs,
      plugin: plugin as GetPluginType<K>,
      pluginState,
      sel: refs ? refs['<>'] : 0,
      typeAheadTool: createTypeAheadTools(editorView),
    };
  };
}
