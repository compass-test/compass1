import { defaultSchema } from '@atlaskit/adf-schema';
import { ADFEntity, traverse } from '@atlaskit/adf-utils';
import { renderDocument, TextSerializer } from '@atlaskit/renderer';

const textSerializer = new TextSerializer(defaultSchema);

const parseADF = (adfString: string): ADFEntity => {
  const adf = JSON.parse(adfString);
  return traverseAndReplaceMediaWithPlaceholder(adf);
};

const convertToPlaceholder = (node: ADFEntity) => {
  node.type = 'text';
  node.text = '[media]';
  node.content = [];
  return node;
};

const traverseAndReplaceMediaWithPlaceholder = (
  adfEntity: ADFEntity,
): ADFEntity => {
  return (
    traverse(adfEntity, {
      media: convertToPlaceholder,
      mediaSingle: convertToPlaceholder,
      mediaGroup: convertToPlaceholder,
      inlineExtension: (node, _) => {
        if (node.attrs?.extensionKey === 'inline-media-image') {
          return convertToPlaceholder(node);
        }
      },
    }) || adfEntity
  );
};

const renderTextDocument = (adfString: ADFEntity): string | null => {
  return renderDocument(adfString, textSerializer).result;
};

export { parseADF, renderTextDocument };
