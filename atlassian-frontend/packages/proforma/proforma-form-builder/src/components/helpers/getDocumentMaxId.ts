import { Node } from 'prosemirror-model';

export function getDocumentMaxId(rootNode: Node): number {
  let maxId = 0;
  rootNode.descendants(node => {
    if (node.attrs && node.attrs.extensionType === 'com.thinktilt.proforma') {
      const isQuestionNode = node.attrs.extensionKey === 'question';
      const isHtmlNode = node.attrs.extensionKey === 'html';
      const isSectionNode = node.attrs.extensionKey === 'section';

      if ((isQuestionNode || isHtmlNode) && node.attrs.parameters.id > maxId) {
        maxId = node.attrs.parameters.id;
      }

      if (
        isSectionNode &&
        node.attrs.parameters &&
        node.attrs.parameters.conditions
      ) {
        const sectionConditions = node.attrs.parameters.conditions;
        const maxConditionId = Math.max(
          ...Object.keys(sectionConditions).map(Number),
        );
        if (maxConditionId > maxId) {
          maxId = maxConditionId;
        }
      }
    }
  });
  return maxId;
}
