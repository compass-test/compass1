import React, { ComponentProps } from 'react';
import { Mark } from 'prosemirror-model';
import { Extension } from '@atlaskit/editor-core/extensibility';
import { ReferenceEntity } from '@atlaskit/editor-common';
import { DataSourceProvider } from '../../data-source-provider';

export type Props = ComponentProps<typeof Extension> & {
  dataSourceProvider?: DataSourceProvider;
};

const ExtensionWithDataSource: React.FC<Props> = (props) => {
  const { editorView, node, dataSourceProvider } = props;

  const dataSourceId = node.marks?.find(
    (mark: Mark) => mark.type === editorView.state.schema.marks?.dataConsumer,
  )?.attrs?.sources?.[0];

  const [reference, setReference] = React.useState<ReferenceEntity | undefined>(
    () => {
      const dataSourceReference = dataSourceProvider?.get(dataSourceId);
      if (dataSourceReference) {
        return dataSourceReference;
      }
    },
  );

  React.useEffect(() => {
    dataSourceProvider?.unsubscribe(dataSourceId, setReference);
    dataSourceProvider?.subscribe(dataSourceId, setReference);
    return () => dataSourceProvider?.unsubscribe(dataSourceId, setReference);
  }, [dataSourceProvider, dataSourceId]);

  return <Extension {...props} references={reference ? [reference] : []} />;
};

export default ExtensionWithDataSource;
