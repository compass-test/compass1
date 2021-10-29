export interface ADFParagraphNode {
  type: 'paragraph';
  contents: string;
  attribute: 'regular' | 'bold' | 'italic';
}

export interface ADFParagraphsNode {
  type: 'paragraphs';
  contents: MockADFNode[];
}

export type MockADFNode = ADFParagraphNode | ADFParagraphsNode;

type NodeId = string;

export interface Node {
  id: NodeId;
  x: number;
  y: number;
  type: 'note';
  color: string;
  contents: MockADFNode;
  author: string;
}

export interface Document {
  nodes: Node[];
  width: number;
  height: number;
  name: string;
}
