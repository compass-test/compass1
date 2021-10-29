import { MutationSegment, GqlSegment } from './gql-segments/types';
export default function constructGqlSegmentFromArray<T>(items: Array<T>, constructSingleGqlSegment: () => MutationSegment, constructVariablesInput: (item: T, componentId?: string) => Record<string, any>, gqlAcc: GqlSegment, componentId?: string): GqlSegment;
