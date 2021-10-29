import { Product } from '../../types';
import {
  loadAtlassianSwitcher,
  loadJiraSwitcher,
  loadConfluenceSwitcher,
  loadGenericSwitcher,
  loadTrelloSwitcher,
} from '../../ui/components/loaders';

export default (product?: string) => {
  loadAtlassianSwitcher();

  if (product === Product.JIRA) {
    return loadJiraSwitcher();
  }

  if (product === Product.CONFLUENCE) {
    return loadConfluenceSwitcher();
  }

  if (product === Product.TRELLO) {
    return loadTrelloSwitcher();
  }

  return loadGenericSwitcher();
};
