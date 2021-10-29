import { Field, RankedFieldsRequest, ServerResponse } from '../common/types';
import { hashString } from '../common/utils';

async function fetchRankedFields<T>(
  request: RankedFieldsRequest<T>,
): Promise<T[]> {
  const {
    baseUrl,
    containerId,
    hashKey,
    objectId,
    fieldId,
    requiresHashing,
    principalId,
    product,
    sessionId,
    tenantId,
    values,
  } = request;

  const FRS_URL = baseUrl
    ? `${baseUrl}/gateway/api/fields/v2/recommendations/`
    : `/gateway/api/fields/v2/recommendations/`;

  const hashValues = (hashKey: string, values: Field<T>[]) => {
    return values.map((value) => {
      return {
        ...value,
        id: hashString(hashKey || tenantId, value.id),
      };
    });
  };

  const preparedValues = requiresHashing
    ? hashValues(hashKey || tenantId, values)
    : values;

  const response = await doFetch(FRS_URL, {
    method: 'POST',
    credentials: 'include',
    headers: {
      'content-type': 'application/json',
    },
    body: JSON.stringify({
      context: {
        objectId,
        containerId,
        principalId,
        product,
        tenantId,
        sessionId,
      },
      fieldId,
      fieldObjects: preparedValues,
    }),
  });
  if (response.status === 200) {
    let res = (await response.json()) as ServerResponse<T>;
    return res.fieldObjects.map((value) => value.value);
  }
  // return original values on error
  return request.values.map((value) => value.value);
}

export async function doFetch(url: string, payload: any) {
  return fetch(url, payload);
}

export default fetchRankedFields;
