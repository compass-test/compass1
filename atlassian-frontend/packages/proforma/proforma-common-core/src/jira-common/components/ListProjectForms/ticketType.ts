import { RequestType } from '../../../jira-common/models';

export const extractTicketTypeId = (id: string): string => id.slice(1);

// Group request types by numeric ID. Currently the ProForma RequestType id starts with a letter
// e.g. p1, s1, s2, n3, p3. This function extracts the request type ID from each ID (e.g. p1 -> 1)
// and groups them by ID e.g. Request types with IDs ['p1', 's1', 's2', 'n3', 'p3'] would get grouped as:
// {
//    '1': [ RequestType(p1), RequestType(s1) ],
//    '2': [ RequestType(s2) ],
//    '3': [ RequestType(n3), RequestType(p3) ],
// }
// The letters 'p' 's' 'n' represent:
//  * 'n' - the request type is used in ProForma for issue forms
//  * 'p' - the request type is used in ProForma for portal create
//  * 's' - the request type is used in ProForma for issue view
export const groupRequestTypes = (
  requestTypes: RequestType[],
): { [key: string]: RequestType[] } => {
  return requestTypes.reduce((acc, rt) => {
    const rtId: string = extractTicketTypeId(rt.id);
    if (rtId in acc) {
      acc[rtId] = [...acc[rtId], rt];
    } else {
      acc[rtId] = [rt];
    }
    return acc;
  }, {} as { [key: string]: RequestType[] });
};
