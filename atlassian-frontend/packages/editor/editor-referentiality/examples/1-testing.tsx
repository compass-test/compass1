import React from 'react';
import ReactDOM from 'react-dom';
import { Step } from 'prosemirror-transform';
import { JSONTransformer } from '@atlaskit/editor-json-transformer';
import { Editor, EditorProps } from '@atlaskit/editor-core';
import { extensionProvider } from '../example-helpers/table-vis-provider';
import { referentialityPlugin } from '../src';
import { IntlProvider, injectIntl } from 'react-intl';

type LifeCycleHandlers = {
  onChange?: any;
  onMount?: (actions: any) => void;
  onDestroy?: () => void;
};

export function createEditorExampleForTests<T>(render: any) {
  createEditorWindowBindings<T>(window, render);
  return (
    <div id="editor-container" style={{ height: '100%', width: '100%' }} />
  );
}

function createEditorWindowBindings<T>(win: any, render: any) {
  if (win.__mountEditor) {
    return;
  }

  const mountEditor: (props: T, opts: any, MaybeWrapper?: any) => void = (
    props,
    options = {},
    MaybeWrapper,
  ) => {
    const target = document.getElementById('editor-container');

    if (!target) {
      return;
    }

    const Wrapper = MaybeWrapper || createWrappers(render);

    createUpdateEditorProps(win, props, options, Wrapper);

    ReactDOM.render(
      <Wrapper
        props={props || {}}
        lifeCycleHandlers={{
          onMount(actions: any) {
            const view = actions._privateGetEditorView();
            win.__editorView = view;
            win.__documentToJSON = function () {
              const transform = new JSONTransformer();
              const doc = view!.state.doc;

              return transform.encode(doc);
            };
            win.__applyRemoteSteps = function (stepsAsString: string[]) {
              const {
                state,
                state: { schema, tr },
              } = view!;

              const stepsAsJSON = stepsAsString.map((s) => JSON.parse(s));
              const steps = stepsAsJSON.map((step) =>
                Step.fromJSON(schema, step),
              );

              if (tr) {
                steps.forEach((step) => tr.step(step));

                tr.setMeta('addToHistory', false);
                tr.setMeta('isRemote', true);

                const { from, to } = state.selection;
                const [firstStep] = stepsAsJSON;

                /**
                 * If the cursor is a the same position as the first step in
                 * the remote data, we need to manually set it back again
                 * in order to prevent the cursor from moving.
                 */
                if (from === firstStep.from && to === firstStep.to) {
                  tr.setSelection(state.selection);
                }

                const newState = state.apply(tr);
                view!.updateState(newState);
              }
            };
          },
          onChange() {
            if (win.onChangeCounter !== undefined) {
              win.onChangeCounter++;
            }
          },
          onDestroy: () => {
            win.__editorView = undefined;
            win.__applyRemoteSteps = undefined;
            win.__documentToJSON = undefined;
            win.onChangeCounter = undefined;
          },
        }}
      />,
      target,
    );
  };

  win.__mountEditor = mountEditor;
}

const EditorWithIntl = injectIntl<EditorProps & LifeCycleHandlers>(
  ({ intl, onMount, onChange, onDestroy, ...props }) => {
    return (
      <Editor
        {...props}
        insertMenuItems={[]}
        extensionProviders={(editorActions) => [
          extensionProvider(intl, editorActions),
        ]}
        onEditorReady={onMount}
        onChange={onChange}
        onDestroy={onDestroy}
        allowExtension={true}
        allowTables={{ advanced: true }}
        dangerouslyAppendPlugins={{
          __plugins: [referentialityPlugin()],
        }}
      />
    );
  },
);

export function EditorExampleForTests() {
  return createEditorExampleForTests<any>(
    (props: EditorProps, lifecycleHandlers: LifeCycleHandlers) => {
      return (
        <IntlProvider locale="en">
          <EditorWithIntl {...props} {...lifecycleHandlers} />
        </IntlProvider>
      );
    },
  );
}

function createUpdateEditorProps<T>(
  win: any,
  props: T,
  opts: any,
  Wrapper: any,
) {
  win.__updateEditorProps = (
    newProps: Partial<T>,
    newOptions: Partial<any>,
  ) => {
    if (!win.__mountEditor) {
      return;
    }
    win.__mountEditor(
      { ...props, ...newProps },
      { ...opts, ...newOptions },
      Wrapper,
    );
  };
}

function createWrappers(RenderCmp: any) {
  return (props: {
    props: EditorProps;
    lifeCycleHandlers: LifeCycleHandlers;
  }) => RenderCmp(props.props, props.lifeCycleHandlers);
}

export default () => <EditorExampleForTests />;
