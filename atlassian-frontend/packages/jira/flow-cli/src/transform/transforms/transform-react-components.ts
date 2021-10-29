import { SourceFile } from 'ts-morph';
import { getReactComponents } from '../collectors/get-react-components';
import { printReactComponents } from '../printers/print-react-components';

export const transformPickReferences = (target: SourceFile) => {
  const reactComponents = getReactComponents(target);
  printReactComponents(reactComponents);
};

export default transformPickReferences;
