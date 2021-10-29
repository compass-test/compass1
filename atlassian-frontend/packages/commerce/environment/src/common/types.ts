export type HttpMethod = 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';

export type Id<T> = { id: T };

export type PagedList<T> = {
  data: T[];
};
