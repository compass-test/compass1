import { replaceWithCustomDeclaration, prettify } from '..';

describe('replaceWithCustomDeclaration()', () => {
  it('Replaces nothing', () => {
    const to = 'const x = "ycx";';
    const from = 'const x = "xyc";';
    const code = 'const x = "my awesome code";';

    expect(replaceWithCustomDeclaration(code, from, to)).toEqual(
      prettify(code),
    );
  });

  it('Replaces from with to in code', () => {
    const to = 'const x = "my awesome replaced code";';
    const from = 'const x = "my awesome code";';
    const code = 'const x = "my awesome code";';

    expect(replaceWithCustomDeclaration(code, from, to)).toEqual(prettify(to));
  });

  it('Replaces from with to in code even when formatting is different', () => {
    const from = `
// eslint-disable-next-line no-unused-vars
declare export class UIAnalyticsEvent extends AnalyticsEvent {
  context: Context;
  handlers: UIAnalyticsEventHandler[];
  hasFired: boolean;
  clone: () => UIAnalyticsEvent | null;
  fire: (channel?: string | void) => void;
  constructor(props: UIAnalyticsEventProps): this;
  update(
    updater:
      | { [key: string]: any }
      | ((payload: AnalyticsEventPayload) => AnalyticsEventPayload),
  ): this;
}`;

    const to = `// eslint-disable-next-line no-unused-vars
declare export class UIAnalyticsEvent
  extends AnalyticsEvent
  implements UIAnalyticsEventInterface {
  context: Context;
  handlers: UIAnalyticsEventHandler[];
  hasFired: boolean;
  constructor(props: UIAnalyticsEventProps): UIAnalyticsEventInterface;
  clone: () => UIAnalyticsEventInterface | null;
  fire: (channel?: string | void) => void;
  update(
    updater:
      | { [key: string]: any }
      | ((payload: AnalyticsEventPayload) => AnalyticsEventPayload),
  ): UIAnalyticsEventInterface;
}`;
    const code = `
      // eslint-disable-next-line no-unused-vars
      declare export class UIAnalyticsEvent extends AnalyticsEvent {
        context: Context;
        handlers: UIAnalyticsEventHandler[];
        hasFired: boolean;
        clone: () => UIAnalyticsEvent | null;
        fire: (channel?: string | void) => void;
        constructor(props: UIAnalyticsEventProps): this;
        update(
          updater:
            | { [key: string]: any }
            | ((payload: AnalyticsEventPayload) => AnalyticsEventPayload),
        ): this;
      }
    `;

    expect(replaceWithCustomDeclaration(code, from, to)).toEqual(prettify(to));
  });
});
