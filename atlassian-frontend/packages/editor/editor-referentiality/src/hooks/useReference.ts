import { useState, useEffect, useMemo } from 'react';

import {
  ADDoc,
  ADNode,
  ReferenceEntity,
  ExtensionParams,
} from '@atlaskit/editor-common';

import { DataSourceProvider } from '../data-source-provider';

type LocalId = string;

// Getting all nodes mapping (LocalId => ADNode)
const getAllNodes = (nodes: ADNode[] = []) => {
  let allNodes: Map<LocalId, ADNode> = new Map();

  nodes.forEach((node) => {
    if (node.attrs?.localId) {
      allNodes.set(node.attrs.localId, node);
    }

    if (node.content) {
      allNodes = new Map([...allNodes, ...getAllNodes(node.content)]);
    }
  });
  return allNodes;
};

type Props<T> = {
  adf: ADDoc;
  extensionParams: ExtensionParams<T>;
  dataSourceProvider: DataSourceProvider;
};

export const useReference = <T>({
  adf,
  extensionParams,
  dataSourceProvider,
}: Props<T>) => {
  const allADFNodes: Map<LocalId, ADNode> = useMemo(
    () => getAllNodes(adf.content),
    [adf],
  );
  const activeNodeFromADF: ADNode | undefined = allADFNodes.get(
    extensionParams.localId as string,
  );

  // At the moment we support only one data consumer
  const dataSourceId: LocalId | undefined = activeNodeFromADF?.marks?.find(
    (mark) => mark.type === 'dataConsumer',
  )?.attrs?.sources?.[0];

  const [reference, setReference] = useState<ReferenceEntity | undefined>(
    () => {
      const dataSourceNode: ADNode | undefined = allADFNodes.get(
        dataSourceId as string,
      );

      // At the momment only table nodes as a source are supported
      if (dataSourceNode?.type === 'table') {
        return dataSourceNode;
      }
    },
  );

  useEffect(() => {
    if (!dataSourceId) {
      return;
    }
    dataSourceProvider?.subscribe(dataSourceId, setReference);
    return () => dataSourceProvider?.unsubscribe(dataSourceId, setReference);
  }, [dataSourceProvider, dataSourceId]);

  return {
    references: reference ? [reference] : [],
  };
};
