const SCOPES_API_URL = 'scopes/v1';

interface ScopesResponse {
  products: { [key: string]: string[] };
}

export const getFetchProductPermissions = (
  makeRequest: (url: string) => Promise<ScopesResponse>,
) => async (
  productIds: string[],
  cloudId: string,
  experience: string,
): Promise<Map<string, string[]>> => {
  if (productIds.length === 0) {
    return Promise.resolve(new Map());
  }

  try {
    const productParams = productIds.map((productId) => [
      'productId',
      productId,
    ]);
    const params = new URLSearchParams([
      ['experience', experience],
      ...productParams,
    ]);
    const path = `${SCOPES_API_URL}/${cloudId}?${params.toString()}`;

    const response = await makeRequest(path);
    return new Map(
      Object.keys(response.products).map((product) => [
        product,
        response.products[product],
      ]),
    );
  } catch (e) {
    return new Map();
  }
};
