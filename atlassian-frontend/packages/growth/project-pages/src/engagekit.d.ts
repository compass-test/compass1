declare module '@atlassiansox/engagekit';

declare module '@atlassiansox/engagekit/dist/esm/coordination/coordination-client' {
  export default class CoordinationClient {
    // eslint-disable-next-line no-useless-constructor
    constructor(cloudId: string, stargateUrl: string);

    start(messageId: string): Promise<boolean>;

    stop(messageId: string): Promise<boolean>;
  }
}

declare module '@atlassiansox/engagekit/dist/esm/coordination/useCoordination' {
  export const useCoordination = (
    client: CoordinationClient,
    messageId: string,
  ): [boolean, () => {}] => {};
}
