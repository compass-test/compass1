import React from 'react';
import { IntlProvider } from 'react-intl';
import {
  EditorInstance,
  EditorPlugin,
  EditorProps,
  EventDispatcher,
  PortalProvider,
  PortalProviderAPI,
  PortalRenderer,
  ReactEditorView,
} from '@atlaskit/editor-core';
import { ProviderFactory } from '@atlaskit/editor-common';
import { mount, ReactWrapper } from 'enzyme';
import { Refs, DocBuilder } from './doc-builder';
import { PluginKey } from 'prosemirror-state';
import patchEditorViewForJSDOM from './jsdom-fixtures';
import { CreateUIAnalyticsEvent } from '@atlaskit/analytics-next';
import { setSelection } from './utils/set-selection';

import { dedupe, createTypeAheadTools } from '@atlaskit/editor-core';
import { createDefaultPreset } from '@atlaskit/editor-core/labs-next';
import { getDefaultPresetOptionsFromEditorProps } from '@atlaskit/editor-core';
import { EditorView } from 'prosemirror-view';
import { EditorConfig } from '@atlaskit/editor-core/editor';

class TestReactEditorView extends ReactEditorView<{
  plugins?: EditorPlugin[];
}> {
  getPlugins(editorProps: EditorProps): EditorPlugin[] {
    return (
      this.props.plugins ||
      super.getPlugins(editorProps, undefined, this.props.createAnalyticsEvent)
    );
  }
}

/**
 * Currently skipping these three failing tests
 * TODO: JEST-23 Fix these tests
 */

export type Options = {
  doc?: DocBuilder;
  // It needs to be any, otherwise TypeScript complains about mismatching types when dist folder exists
  editorPlugins?: any[];
  editorProps?: EditorProps;
  providerFactory?: ProviderFactory;
  pluginKey?: PluginKey;
  createAnalyticsEvent?: CreateUIAnalyticsEvent;
  /**
   * Skip refs gives us a mechanism to stop a call to `setSelection`, triggering
   * a transaction when you are only interested in the initial state.
   */
  skipRefs?: boolean;
};

export type TypeAheadTool = ReturnType<typeof createTypeAheadTools>;
export type EditorInstanceWithPlugin<T> = EditorInstance & {
  portalProviderAPI: PortalProviderAPI;
  refs: Refs;
  sel: number;
  plugin: any;
  pluginState: T;
  editorProps: EditorProps;
  wrapper: ReactWrapper;
  typeAheadTool: TypeAheadTool;
};

interface CreateEditorFactoryFn<T> {
  (options: Options): EditorInstanceWithPlugin<T>;
}
export function createEditorFactory<PluginState = any>(
  renderFunction: (...args: any[]) => any = mount,
): CreateEditorFactoryFn<PluginState> {
  let place: HTMLDivElement;
  let wrapper: ReactWrapper;

  let observeMock = {
    observe: jest.fn(),
    disconnect: jest.fn(),
  };
  (window as any).ResizeObserver = () => observeMock;

  afterEach(() => {
    if (wrapper && renderFunction === mount) {
      if (wrapper.length > 0) {
        wrapper.unmount();
      }
      wrapper.detach();
    }

    if (place && place.parentNode) {
      place.parentNode.removeChild(place);
    }
  });

  return (options: Options) => {
    const {
      doc,
      editorProps = {},
      editorPlugins,
      providerFactory,
      pluginKey,
      createAnalyticsEvent,
      skipRefs,
    } = options;
    let portalProviderAPI: PortalProviderAPI | undefined;
    const preset = createDefaultPreset(
      getDefaultPresetOptionsFromEditorProps(editorProps),
    );
    const plugins = editorPlugins
      ? dedupe(
          [...editorPlugins, ...preset.getEditorPlugins()],
          ({ name }: EditorPlugin) => name,
        )
      : undefined;
    place = document.body.appendChild(document.createElement('div'));

    let editorView: EditorView | undefined;
    let eventDispatcher: EventDispatcher | undefined;
    let config: EditorConfig | undefined;

    wrapper = renderFunction(
      <PortalProvider
        render={(portalProvider: PortalProviderAPI) => {
          portalProviderAPI = portalProvider;
          return (
            <IntlProvider locale="en">
              <>
                <TestReactEditorView
                  editorProps={editorProps}
                  createAnalyticsEvent={createAnalyticsEvent}
                  allowAnalyticsGASV3={editorProps.allowAnalyticsGASV3}
                  portalProviderAPI={portalProvider}
                  providerFactory={
                    providerFactory ? providerFactory : new ProviderFactory()
                  }
                  onEditorCreated={({
                    view,
                    eventDispatcher: editorEventDispatcher,
                    config: editorConfig,
                  }) => {
                    editorView = view;
                    eventDispatcher = editorEventDispatcher;
                    config = editorConfig;
                  }}
                  onEditorDestroyed={() => {}}
                  plugins={plugins}
                />
                <PortalRenderer portalProviderAPI={portalProviderAPI} />
              </>
            </IntlProvider>
          );
        }}
      />,
      { attachTo: place },
    );

    if (!editorView || !eventDispatcher || !config) {
      throw new Error("Editor didn't mount correctly");
    }

    // Work around JSDOM/Node not supporting DOM Selection API
    if (!('getSelection' in window)) {
      // TODO JEST-23
      patchEditorViewForJSDOM(editorView);
    }

    const refs = skipRefs ? {} : setSelection(doc, editorView);

    let plugin;
    let pluginState;

    if (pluginKey) {
      plugin = pluginKey.get(editorView!.state);
      pluginState = pluginKey.getState(editorView!.state);
    }

    const {
      contentComponents,
      primaryToolbarComponents,
      secondaryToolbarComponents,
      onEditorViewStateUpdatedCallbacks,
    } = config;

    return {
      portalProviderAPI: portalProviderAPI!,
      onEditorViewStateUpdatedCallbacks,
      editorView: editorView!,
      eventDispatcher,
      contentComponents,
      primaryToolbarComponents,
      secondaryToolbarComponents,
      refs: refs!,
      sel: refs ? refs['<>'] : 0,
      plugin,
      pluginState,
      editorProps,
      wrapper,
      typeAheadTool: createTypeAheadTools(editorView),
    };
  };
}
