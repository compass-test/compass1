import { ReactComponents } from '../collectors/get-react-components';

export const printReactComponents = (nodes: ReactComponents) => {
  for (const [reference, info] of nodes) {
    if (reference.wasForgotten()) {
      continue;
    }
    const type = info.type ? info.type.getText() : 'any';
    reference.replaceWithText(`React$AbstractComponent<${type}, any>`);
  }
};
