import { CompassEnumField, CreateCompassFieldInput } from '../graphql-types';
export declare function transformFieldsToGql(fields?: Record<string, Array<string>>): Array<CreateCompassFieldInput>;
export declare function transformEnumGqlFields(fields?: CompassEnumField[]): Record<string, object>;
