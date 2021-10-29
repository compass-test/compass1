import { GasPayload, GasPurePayload } from '@atlaskit/analytics-gas-types';

export type GasPurePayloadWithAction = GasPurePayload & {
  action: string;
};

export interface CustomAttributes {
  attributes?: Record<string, any>;
}

export interface MappedEventPayload {
  [k: string]: (payload: GasPayload) => void;
}
