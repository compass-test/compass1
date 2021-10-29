import { GasV3Payload } from '../analytics-helpers/types';
import { enrichWithPackageDetails } from '../enrichWithPackageDetails';

const version = process.env._PACKAGE_VERSION_;

describe('The enrichWithPackageDetails function', () => {
  it('should append the package version to the event attributes under key crossFlowSupport', () => {
    const event: GasV3Payload = {
      eventType: 'ui',
      action: 'click',
      actionSubject: 'button',
      attributes: {
        source: 'crossFlowSpa',
      },
    };
    const enrichedPayload = enrichWithPackageDetails(event);
    expect(enrichedPayload).toStrictEqual({
      ...event,
      attributes: { ...event.attributes, crossFlowSupport: { version } },
    });
  });

  it('should append the package version if there is no attributes existing', () => {
    const eventWithNoAttributes: GasV3Payload = {
      eventType: 'ui',
      action: 'click',
      actionSubject: 'button',
    };
    const enrichedPayload = enrichWithPackageDetails(eventWithNoAttributes);
    expect(enrichedPayload).toStrictEqual({
      ...eventWithNoAttributes,
      attributes: { crossFlowSupport: { version } },
    });
  });
});
