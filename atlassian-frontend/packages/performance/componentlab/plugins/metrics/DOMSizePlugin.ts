import React from 'react';
import { MetricsPlugin } from '../../types';

const DOMSizePlugin: MetricsPlugin = {
  name: 'DOM Tree Size',
  id: 'dom_tree_size',
  measure({
    container,
  }: {
    element: React.ReactElement;
    container: HTMLElement;
  }) {
    return {
      unit: 'node',
      value: getDomTreeSize(container),
    };
  },
};

function getDomTreeSize(el: any): number {
  // TODO: Should this consider the node itself and text nodes?
  return el.querySelectorAll('*').length;
}

export default DOMSizePlugin;
