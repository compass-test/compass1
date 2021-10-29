export class Variable {
  readonly name: string = '';

  constructor(props: Partial<Variable> = {}) {
    Object.assign(this, props);
    Object.freeze(this);
  }
}

export class PipelineDefinition {
  readonly type: string = '';
  readonly pattern: string = '';
  readonly variables: Array<Variable> = [];
  readonly error?: any;

  constructor(props: Partial<PipelineDefinition> = {}) {
    Object.assign(this, {
      ...props,
      variables: props.variables?.map(v => new Variable(v)),
    });
    Object.freeze(this);
  }
}
