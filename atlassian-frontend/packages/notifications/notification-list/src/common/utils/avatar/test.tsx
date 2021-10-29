import { getUserAvatarFromARI, getUserIdFromARI } from './index';

describe('getUserIdFromARI', () => {
  it('grabs user id from ARI', () => {
    expect(
      getUserIdFromARI('ari:cloud:identity::user/5fb4ff6c0dd553006f374da6'),
    ).toEqual('5fb4ff6c0dd553006f374da6');
    expect(
      getUserAvatarFromARI(`ari:cloud:identity::user/5fb4ff6c0dd553006f374da6`),
    ).toEqual('/gateway/api/users/5fb4ff6c0dd553006f374da6/avatar');
  });
  it('does not grab user id from non-user ARI', () => {
    expect(
      getUserIdFromARI('ari:cloud:identity::notuser/5fb4ff6c0dd553006f374da6'),
    ).toBeNull();
    expect(
      getUserAvatarFromARI(
        'ari:cloud:identity::notuser/5fb4ff6c0dd553006f374da6',
      ),
    ).toBeNull();
    // https://hello.atlassian.net/wiki/spaces/ARCH/pages/161909906/ARI+Resource+Owners+Inventory
    // 	ari:cloud:identity::user/<id>
    expect(
      getUserIdFromARI(
        'ari:cloud:identity::user/5fb4ff6c0dd553006f374da6/5fb4ff6c0dd553006f374da6',
      ),
    ).toBeNull();
    expect(
      getUserAvatarFromARI(
        'ari:cloud:identity::user/5fb4ff6c0dd553006f374da6/5fb4ff6c0dd553006f374da6',
      ),
    ).toBeNull();
  });
});
