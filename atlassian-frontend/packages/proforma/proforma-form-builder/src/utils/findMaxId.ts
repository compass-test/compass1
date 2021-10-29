import { Node } from 'prosemirror-model';

import {
  FormLayoutNode,
  FormLayoutNodeExtension,
  TemplateForm,
} from '@atlassian/proforma-common-core/form-system-models';

/**
 * Finds the largest question ID in use on a form. Checks the ADF extensions rather than the questions object.
 */
export function findMaxId(form: TemplateForm): number {
  const { layout } = form.design;

  function extractMaxId(node: FormLayoutNode, currentMaxId: number): number {
    let maxId = node.content
      ? node.content.reduce((previousMaxId, currentNode): number => {
          const newMaxId = extractMaxId(currentNode, previousMaxId);
          return newMaxId > currentMaxId ? newMaxId : currentMaxId;
        }, currentMaxId)
      : currentMaxId;

    if (node.type === 'extension') {
      // This node is an extension so it needs question data copied from the form into the node
      const extensionNode = node as FormLayoutNodeExtension;
      if (node.attrs && node.attrs.extensionType === 'com.thinktilt.proforma') {
        const isQuestionNode = node.attrs.extensionKey === 'question';
        const isHtmlNode = node.attrs.extensionKey === 'html';

        if (isQuestionNode || isHtmlNode) {
          const questionId =
            extensionNode.attrs.parameters && extensionNode.attrs.parameters.id;
          if (typeof questionId === 'number' && questionId > maxId) {
            maxId = questionId;
          }
        }
      }
    }
    return maxId;
  }

  const maxIdInLayout = layout.reduce(
    (previousMaxId, currentLayout) =>
      extractMaxId(currentLayout, previousMaxId),
    0,
  );
  const maxIdInConditions = Math.max(
    ...Object.keys(form.design.conditions).map(Number),
  );

  return Math.max(maxIdInConditions, maxIdInLayout);
}

export function findMaxIdFromNode(rootNode: Node): number {
  let maxId = 0;
  rootNode.descendants((node, pos, parent) => {
    if (node.attrs && node.attrs.extensionType === 'com.thinktilt.proforma') {
      const isQuestionNode = node.attrs.extensionKey === 'question';
      const isHtmlNode = node.attrs.extensionKey === 'html';
      const isSectionNode = node.attrs.extensionKey === 'section';

      if (isQuestionNode || isHtmlNode) {
        if (node.attrs.parameters.id > maxId) {
          maxId = node.attrs.parameters.id;
        }
      }

      if (isSectionNode) {
        if (node.attrs.parameters && node.attrs.parameters.conditions) {
          const sectionConditions = node.attrs.parameters.conditions;
          const maxConditionId = Math.max(
            ...Object.keys(sectionConditions).map(Number),
          );
          if (maxConditionId > maxId) {
            maxId = maxConditionId;
          }
        }
      }
    }
  });

  return maxId;
}
