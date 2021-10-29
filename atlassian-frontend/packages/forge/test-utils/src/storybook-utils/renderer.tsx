import React, { Suspense } from 'react';
import { action } from '@storybook/addon-actions';
import { ReactRenderer } from '@atlassian/forge-ui-text-renderer';
import {
  EventEffect,
  EffectsDispatcher,
  Handler,
  ForgeDoc,
} from '@atlassian/forge-ui-types';
import { RenderFn } from '@atlassian/forge-ui';

export const dispatch = action('dispatch') as EffectsDispatcher;

export const handler: Handler = {
  componentKey: 'componentKey',
  prop: 'prop',
};

const rendererDecorator = (story: () => JSX.Element) => {
  return (
    <ReactRenderer
      extensionHandlers={{
        'com.atlassian.forgestory': story,
      }}
      document={{
        type: 'doc',
        version: 1,
        content: [
          {
            type: 'extension',
            attrs: {
              extensionKey: 'doesntmatter',
              extensionType: 'com.atlassian.forgestory',
            },
          },
        ],
      }}
    />
  );
};

const suspenseDecorator = (story: () => JSX.Element) => {
  return (
    <Suspense fallback={<div className=".loading-story">Loading story</div>}>
      {story()}
    </Suspense>
  );
};

export const createDefaultExport = () => ({
  decorators: [rendererDecorator, suspenseDecorator],
});

export function createMockDispatch() {
  const MAP: Record<string, Function> = {};

  function register(
    { componentKey, prop }: EventEffect['handler'],
    fn: Function,
  ) {
    MAP[`${componentKey}:${prop}`] = fn;
  }

  async function _dispatch({ handler, args }: EventEffect) {
    const { componentKey, prop } = handler;
    const fn = MAP[`${componentKey}:${prop}`];

    setImmediate(() => {
      fn(...args);
    });
  }

  _dispatch.register = register;
  return _dispatch as EffectsDispatcher & { register: typeof register };
}

export const createMockHandler = (eventKey: string = 'click'): Handler => ({
  componentKey: 'key',
  prop: eventKey,
});

const getKey = (elem: React.ReactElement, i: number) => {
  if (typeof elem.type === 'function') {
    return elem.key ? `${elem.key}` : `${elem.type.name}.${i}`;
  }
  throw Error(`Can't get key for ${elem.type}`);
};

const elementToForgeDoc = (elem: React.ReactElement, i: number): ForgeDoc => {
  if (typeof elem.type === 'function') {
    const key = getKey(elem, i);
    return {
      type: elem.type.name,
      key,
      props: Object.entries(elem.props)
        .filter(([prop]) => prop !== 'children')
        .map(([k, v]): [string, any] =>
          typeof v === 'function'
            ? [k, { componentKey: key, prop: k }]
            : [k, v],
        )
        .reduce((p, [k, v]) => ({ ...p, [k]: v }), {}),
      children: React.Children.map(elem.props.children, elementToForgeDoc), // technically should recurse through children but one level is fine
    };
  }
  throw Error(`Can't create ForgeDoc from ${elem.type}`);
};

const find = (
  children: any[],
  fn: (child: any, i: number) => boolean,
): ForgeDoc | null => {
  let match: ForgeDoc | null = null;
  React.Children.forEach(children, (child, i) => {
    if (match) {
      return;
    }
    if (fn(child, i)) {
      match = child;
    } else {
      match = find(child.props.children, fn);
    }
  });
  return match;
};

export const createExampleComponent = <T extends { [k: string]: any }>(
  Component: (p: Parameters<RenderFn>[0]) => JSX.Element,
) => {
  const Wrapper = (props: T) => {
    const me = React.createElement(
      Component,
      // @ts-ignore
      props,
      ...[].concat(props.children),
    );
    return (
      <Component
        forgeDoc={elementToForgeDoc(me, 0)}
        dispatch={(effect) => {
          if (effect.type === 'event' && effect.handler) {
            const handler =
              getKey(me, 0) === effect.handler.componentKey
                ? props[effect.handler.prop]
                : find(
                    props.children,
                    (child, i) =>
                      getKey(child, i) === effect.handler.componentKey,
                  )?.props?.[effect.handler.prop];
            return handler?.(...effect.args);
          }
        }}
        render={(forgeDoc) => {
          if (forgeDoc.key) {
            return find(
              props.children,
              (child, i) =>
                forgeDoc.type === child.type.name &&
                forgeDoc.key === getKey(child, i),
            );
          }
        }}
      />
    );
  };
  Object.defineProperty(Wrapper, 'name', { value: Component.name });
  return Wrapper;
};
