import { OriginQuery } from './mock-teams';

export const mapToInvitedUser = (data: any) => {
  return {
    id: data.id,
    nickname: data.nickname,
    fullName: data.name,
    avatarUrl: data.avatarUrl,
    email: data.email,
  };
};

export function constructProductOriginParams(originQuery: OriginQuery): string {
  const product = (originQuery.product || '').toUpperCase();
  const queries: string[] = [
    `origin.cloudId=${encodeURIComponent(originQuery.cloudId)}`,
  ];
  if (product) {
    queries.push(`origin.product=${encodeURIComponent(product)}`);
  }

  return queries.join('&');
}
