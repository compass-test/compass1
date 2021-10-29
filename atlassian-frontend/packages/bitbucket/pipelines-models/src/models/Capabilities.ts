export const MAX_ENVIRONMENTS = 10;
export const MAX_ENVIRONMENTS_PREMIUM = 50;

export class Capabilities {
  readonly hasFetchedCapabilities: boolean = false;
  readonly fetchCapabilitiesFailed: boolean = false;
  readonly fetchCapabilitiesError?: any = null;
  readonly pipelinesEnabled: boolean = false;
  readonly pipelinesEnabledError?: any = null;
  readonly allowancePercentageUsed: number = 0;
  readonly hasMinutesLeft: boolean = false;
  readonly limited: boolean = false;
  readonly isPremium: boolean = false;
  readonly isPaid: boolean = false;

  constructor(props: Partial<Capabilities> = {}) {
    Object.assign(this, props);
    Object.freeze(this);
  }

  get isPaidOrPremium() {
    return this.isPaid || this.isPremium;
  }

  get allowedEnvironments() {
    return this.isPaidOrPremium ? MAX_ENVIRONMENTS_PREMIUM : MAX_ENVIRONMENTS;
  }
}
