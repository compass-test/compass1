interface GqlSegment {
    mutation: string;
    variables: Record<string, any>;
    parameters: Array<string>;
}
interface MutationSegment {
    mutationGql: string;
    params: Array<string>;
    inputId: string;
}
export { GqlSegment, MutationSegment, };
