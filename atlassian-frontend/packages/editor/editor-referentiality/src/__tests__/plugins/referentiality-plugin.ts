import * as pluginKeyModule from '../../plugins/plugin-key';
import { referentialityPlugin } from '../../plugins/referentiality-plugin';
import {
  doc,
  p,
  table,
  tr,
  td,
} from '@atlaskit/editor-test-helpers/doc-builder';
import defaultSchema from '@atlaskit/editor-test-helpers/schema';
import { JSONTransformer } from '@atlaskit/editor-json-transformer';
import { createEditorFactory } from '@atlaskit/editor-test-helpers/create-editor';
import { NodeMutationObserver } from '../../node-mutation-observer';
import { DataSourceProvider } from '../../data-source-provider';
import { ExternalObserver, ReferentialityPluginState } from '../../types';

jest.mock('../../node-mutation-observer');

const { getPluginState, pluginKey } = pluginKeyModule;
const transformer = new JSONTransformer();

describe('referentiality plugin', () => {
  const createEditor = createEditorFactory();
  const editor = (doc: any, externalObservers: ExternalObserver[] = []) => {
    const editorWrapper = createEditor({
      doc,
      pluginKey,
      editorProps: {
        allowExtension: true,
        allowTables: {
          advanced: true,
        },
        dangerouslyAppendPlugins: {
          __plugins: [
            referentialityPlugin({
              externalObservers,
            }),
          ],
        },
      },
    });

    return editorWrapper;
  };

  it('should set the initial plugin state', () => {
    const { editorView } = editor(doc(p('')));

    const dataSourceProvider = new DataSourceProvider();

    const state = {
      dataSourceProvider,
      nodeMutationObserver: expect.any(NodeMutationObserver),
      changedSources: expect.any(Map),
    };

    expect(getPluginState(editorView.state)).toMatchObject(state);
  });

  it('should initialize external observers', () => {
    const externalObservers: ExternalObserver[] = [
      {
        init: jest.fn(),
        destroy: jest.fn(),
      },
    ];

    editor(doc(p('')), externalObservers);

    expect(externalObservers[0].init).toHaveBeenCalledWith({
      emit: expect.any(Function),
    });
  });

  describe('update view', () => {
    const localId = 'test-id';
    const tableNode = table()(tr(td()(p(''))))(defaultSchema);
    const tableAdf = transformer.encode(tableNode);
    const dataSourceProvider = new DataSourceProvider();
    const nodeMutationObserver = new NodeMutationObserver(dataSourceProvider);
    const basePluginState = {
      dataSourceProvider,
      nodeMutationObserver,
      changedSources: new Map([['floof', tableNode]]),
    };

    afterEach(() => jest.clearAllMocks());

    it('should call emit when changedSources has nodes', () => {
      const pluginState = {
        ...basePluginState,
        changedSources: new Map([[localId, tableNode]]),
      };
      jest
        .spyOn(pluginKeyModule, 'getPluginState')
        .mockImplementation(() => pluginState);
      const emitSpy = jest.spyOn(pluginState.nodeMutationObserver, 'emit');
      expect(emitSpy).not.toHaveBeenCalledWith(localId, tableAdf);

      const { editorView } = editor(doc(p('')));

      editorView.updateState(editorView.state);

      expect(emitSpy).toHaveBeenCalledWith(localId, tableAdf);
    });

    it('should not call emit on updateState with empty changedSources', () => {
      const { editorView } = editor(doc(p('{<>}')));

      const pluginState = {
        ...basePluginState,
        // this test explicitly tests the scenario of these being empty
        changedSources: new Map([]) as any,
      };

      jest
        .spyOn(pluginKeyModule, 'getPluginState')
        .mockImplementation(() => pluginState);
      const emitSpy = jest.spyOn(pluginState.nodeMutationObserver, 'emit');

      expect(pluginState.dataSourceProvider.get(localId)).toEqual(null);
      pluginState.dataSourceProvider.createOrUpdate(localId, tableAdf);
      expect(pluginState.dataSourceProvider.get(localId)).toEqual(tableAdf);

      editorView.updateState(editorView.state);
      expect(pluginKey.getState(editorView.state).changedSources.size).toEqual(
        0,
      );

      expect(emitSpy).not.toHaveBeenCalled();
    });
  });

  describe('external observers', () => {
    it('should update data in dataSourceProvider when external observer emits data', () => {
      let externalEmitFn: any = () => null;
      const externalObservers: ExternalObserver[] = [
        {
          init: ({ emit }) => (externalEmitFn = emit),
          destroy: jest.fn(),
        },
      ];

      const { editorView } = editor(doc(p('')), externalObservers);
      const pluginState = getPluginState(
        editorView.state,
      ) as ReferentialityPluginState;
      const createOrUpdateSpy = jest.spyOn(
        pluginState.dataSourceProvider,
        'createOrUpdate',
      );

      externalEmitFn('testLocalId', { data: 'test' });

      expect(createOrUpdateSpy).toHaveBeenCalledWith('testLocalId', {
        data: 'test',
      });
    });
  });
});
