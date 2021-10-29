import { GasV3Payload } from '../analytics-helpers/types';
import { Options, Targets } from '@atlassiansox/cross-flow-api-internals';
import { enrichWithRequestOptions } from '../enrichWithRequestOptions';

describe('The enrichWithRequestOptions function', () => {
  it('should append the sourceComponent and sourceContext to the attributes', () => {
    const event: GasV3Payload = {
      eventType: 'ui',
      action: 'click',
      actionSubject: 'button',
      attributes: {
        source: 'crossFlowSpa',
      },
    };
    const requestOptions: Options = {
      targetProduct: Targets.CONFLUENCE,
      sourceComponent: 'someComponent',
      sourceContext: 'someContext',
    };

    const enrichedPayload = enrichWithRequestOptions(event, requestOptions);
    expect(enrichedPayload).toStrictEqual({
      ...event,
      attributes: {
        ...event.attributes,
        sourceComponent: requestOptions.sourceComponent,
        sourceContext: requestOptions.sourceContext,
      },
    });
  });

  it('should append the sourceComponent and sourceContext to the attributes if there is no attributes existing', () => {
    const eventWithNoAttributes: GasV3Payload = {
      eventType: 'ui',
      action: 'click',
      actionSubject: 'button',
    };

    const requestOptions: Options = {
      targetProduct: Targets.BITBUCKET,
      sourceComponent: 'someComponent',
      sourceContext: 'someContext',
    };

    const enrichedPayload = enrichWithRequestOptions(
      eventWithNoAttributes,
      requestOptions,
    );
    expect(enrichedPayload).toStrictEqual({
      ...eventWithNoAttributes,
      attributes: {
        sourceComponent: requestOptions.sourceComponent,
        sourceContext: requestOptions.sourceContext,
      },
    });
  });

  it('should not append the sourceComponent and sourceContext if there is no requestOptions', () => {
    const event: GasV3Payload = {
      eventType: 'ui',
      action: 'click',
      actionSubject: 'button',
      attributes: {
        source: 'crossFlowSpa',
      },
    };

    const enrichedPayload = enrichWithRequestOptions(event);
    expect(enrichedPayload).toStrictEqual(event);
  });
});
