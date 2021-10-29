export class RepositoryAssociationSummary {
  readonly repositoryUuid: string = '';
  readonly hasChangeManagementProjectAssociation: boolean = false;
  readonly hasFetched: boolean = false;

  constructor(props: Partial<RepositoryAssociationSummary> = {}) {
    Object.assign(this, props);
    Object.freeze(this);
  }
}
