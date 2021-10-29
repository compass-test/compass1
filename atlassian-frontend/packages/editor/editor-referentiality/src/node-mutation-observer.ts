import { ADFEntity } from '@atlaskit/adf-utils';
import { DataSourceProvider } from './data-source-provider';

export class NodeMutationObserver {
  private dataSourceProvider: DataSourceProvider;

  constructor(dataSourceProvider: DataSourceProvider) {
    this.dataSourceProvider = dataSourceProvider;
  }

  emit(id: string, adf: ADFEntity) {
    this.dataSourceProvider.createOrUpdate(id, adf);
  }
}
