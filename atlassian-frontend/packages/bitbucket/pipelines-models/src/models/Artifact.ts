export class Artifact {
  readonly artifact_content_url: string = '';
  readonly created_on: string = '';
  readonly file_size_bytes: number = 0;
  readonly path: string = '';
  readonly step_uuid: string = '';
  readonly uuid: string = '';

  constructor(props: Partial<Artifact> = {}) {
    Object.assign(this, props);
    Object.freeze(this);
  }
}
