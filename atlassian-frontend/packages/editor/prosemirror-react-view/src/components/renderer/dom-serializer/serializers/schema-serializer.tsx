import React, {
  Children,
  createElement,
  forwardRef,
  ForwardRefExoticComponent,
  FunctionComponent,
} from 'react';

import { Mark, Node as ProsemirrorNode, Schema } from 'prosemirror-model';
import { Plugin } from 'prosemirror-state';

import { PMEditorProps } from '../../../../types';
import {
  DOMSerializer,
  MarkComponentProps,
  NodeComponentProps,
  ToReact,
} from '../types';

import { TextForward } from './text-node';
import { domOutputSpecToReactElement } from './utils/dom-output-spec';

interface ToReactMethods<Type extends Mark | ProsemirrorNode> {
  deprecatedToDom?: Type['type']['spec']['toDOM'];
  toReact?: ToReact<Type>;
}

// interface EditorPropsWithReact<S extends Schema> = CustomEditor<S>

function gatherToDom<
  Type extends Mark<S> | ProsemirrorNode<S>,
  S extends Schema
>(
  types: Record<string, Type['type']>,
  plugins?: Plugin<S>[],
): Record<string, ToReactMethods<Type>> {
  const result: Record<string, ToReactMethods<Type>> = {};
  for (const name in types) {
    if (Object.hasOwnProperty.call(types, name)) {
      const toDOM = types[name].spec.toDOM;
      // const toReact = obj[name].spec.toReact as ToReact<Type>;
      result[name] = {};
      if (toDOM) {
        result[name].deprecatedToDom = toDOM;
      }
    }
  }

  if (plugins) {
    for (const plugin of plugins) {
      const { toReact } = plugin.props as PMEditorProps;
      if (toReact) {
        // Check the toReact function passed by this plugin
        for (const name in toReact) {
          // Check if actually exist in our type data
          if (Object.hasOwnProperty.call(types, name) && Boolean(types[name])) {
            if (!result[name]) {
              result[name] = {};
            }
            if (!result[name].toReact) {
              // @ts-ignore
              // TODO: Check type here
              result[name].toReact = toReact[name];
            }
          }
        }
      }
    }
  }

  return result;
}

const TextComponent = forwardRef<HTMLElement, NodeComponentProps>(
  (props, ref) => {
    return (
      <span ref={ref} {...props.attrs}>
        {props.node.text}
      </span>
    );
  },
);
TextComponent.displayName = 'text';

function nodesFromSchema<S extends Schema>(schema: S, plugins?: Plugin<S>[]) {
  const result = gatherToDom<ProsemirrorNode, S>(schema.nodes, plugins);
  // If i dont get any render method for text, I need to create a new one
  if (!result.text.toReact && !result.text.deprecatedToDom) {
    result.text = {
      deprecatedToDom: (node: ProsemirrorNode) => node.text as string,
      toReact: TextForward,
    };
  }
  return result;
}

function marksFromSchema<S extends Schema>(schema: S, plugins?: Plugin<S>[]) {
  return gatherToDom<Mark, S>(schema.marks, plugins);
}

function createNodeComponent(
  name: string,
  toReactMethods: ToReactMethods<ProsemirrorNode>,
): ForwardRefExoticComponent<NodeComponentProps> {
  const ComponentRef = forwardRef<HTMLElement, NodeComponentProps>(
    (props, ref) => {
      const { deprecatedToDom, toReact } = toReactMethods;
      let children = props.children;
      const { refs, node, attrs, getPos } = props;

      if (node.isBlock && Children.count(props.children) === 0) {
        children = createElement('br');
      }

      // if toReact exist pass use that component
      if (toReact) {
        return createElement(
          toReact,
          { node, ref, refs, attrs, getPos },
          children,
        );
      }

      if (deprecatedToDom) {
        const spec = deprecatedToDom(node);
        // this should happen only for node.isText
        if (typeof spec === 'string') {
          return spec as any; // Types doesnt allow react elements to be string, but they are valid ¯\_(ツ)_/¯
        }
        return domOutputSpecToReactElement(
          spec,
          { ref, ...attrs },
          children,
          refs,
        );
      }

      return null;
    },
  );
  ComponentRef.displayName = name;

  return ComponentRef;
}

function createMarkComponent(
  name: string,
  toReactMethods: ToReactMethods<Mark>,
): FunctionComponent<MarkComponentProps> {
  const MarkComponent: FunctionComponent<MarkComponentProps> = ({
    mark,
    inline,
    children,
    attrs,
  }) => {
    const { deprecatedToDom, toReact } = toReactMethods;
    if (!deprecatedToDom && !toReact) {
      return null;
    }

    // if toReact is pass use that component
    if (toReact) {
      return createElement(toReact, { mark, attrs, inline }, children);
    }

    if (deprecatedToDom) {
      const spec = deprecatedToDom(mark, inline);
      if (typeof spec === 'string') {
        throw new Error('Only text node can render text.');
      }
      return domOutputSpecToReactElement(spec, attrs, children);
    }

    return null;
  };

  MarkComponent.displayName = name;

  return MarkComponent;
}

export function createDomSerializer<S extends Schema>(
  schema: S,
  plugin?: Plugin<S>[],
): DOMSerializer<S> {
  const nodes = nodesFromSchema(schema, plugin);
  const marks = marksFromSchema(schema, plugin);

  const nodeComponentsCache = new Map<
    string,
    ForwardRefExoticComponent<NodeComponentProps>
  >();
  const markComponentsCache = new Map<
    string,
    FunctionComponent<MarkComponentProps>
  >();

  for (const [nodeName, toReactMethods] of Object.entries(nodes)) {
    const NodeComponent = createNodeComponent(nodeName, toReactMethods);
    nodeComponentsCache.set(nodeName, NodeComponent);
  }

  for (const [markName, toDom] of Object.entries(marks)) {
    const MarkComponent = createMarkComponent(markName, toDom);
    markComponentsCache.set(markName, MarkComponent);
  }

  return {
    getNodeComponent(node): ForwardRefExoticComponent<NodeComponentProps> {
      const NodeComponent = nodeComponentsCache.get(node.type.name);
      if (!NodeComponent) {
        throw new Error('No node component found');
      }
      return NodeComponent;
    },
    getMarkComponent(mark): FunctionComponent<MarkComponentProps> {
      const MarkComponent = markComponentsCache.get(mark.type.name);
      if (!MarkComponent) {
        throw new Error('No mark component found');
      }
      return MarkComponent;
    },
  };
}
