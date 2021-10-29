type AppMessageType = 'error' | 'info' | 'normal' | 'success' | 'warning';

export class AppMessage {
  readonly body: string = '';
  readonly title: string = '';
  readonly type: AppMessageType = 'normal';
  readonly actions?: any;

  constructor(props: Partial<AppMessage> = {}) {
    Object.assign(this, props);
    Object.freeze(this);
  }
}
