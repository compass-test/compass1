import { safeLoad, State } from 'js-yaml';

import { INode } from '../types';

import { YamlSyntaxError } from './entities';

export class Converter {
  rawYml: string;
  rootNode: INode | undefined;
  JSObject: string | object | undefined;
  hasAnchor: boolean;

  constructor(rawYml: string) {
    this.rawYml = rawYml;
    this.rootNode = undefined;
    this.JSObject = {};
    this.hasAnchor = false;
  }

  public toTree(yml: string): INode | YamlSyntaxError {
    const stack: INode[] = [];
    let root: INode | undefined;

    const options = {
      listener: (
        event: 'open' | 'close',
        state: State & { anchor?: boolean },
      ) => {
        if (state.anchor) {
          this.hasAnchor = true;
        }
        if (event === 'open') {
          const node = {
            start: {
              line: state.line,
              ch: state.position - state.lineStart,
            },
            children: [],
          };
          const parent = stack[stack.length - 1];
          if (parent) {
            parent.children.push(node);
          } else {
            root = node;
          }
          stack.push(node);
        } else {
          const node = stack.pop()!;
          node.result = state.result;
          node.kind = state.kind as 'scalar' | 'mapping' | 'sequence';
          if (node.kind === 'scalar') {
            node.children.splice(0, node.children.length);
          }
          node.end = {
            line: state.line,
            ch: state.position - state.lineStart,
          };
        }
      },
    };

    try {
      this.JSObject = safeLoad(yml, options);
    } catch (e) {
      return new YamlSyntaxError(e.message, {
        line: e.mark ? e.mark.line : 0,
        ch: e.mark ? e.mark.column : 0,
      });
    }

    this.rootNode = root;
    return (
      root || new YamlSyntaxError('YAML must not be empty.', { line: 0, ch: 0 })
    );
  }
}
