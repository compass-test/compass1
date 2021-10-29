import { User } from '@atlassian/pipelines-models';

export const users = [
  {
    display_name: 'User 1',
    links: {
      avatar: {
        href: 'https://live.staticflickr.com/6077/6088656472_da16447033_n.jpg',
      },
    },
    uuid: '{11111}',
  },
  {
    display_name: 'User 2',
    links: {
      avatar: {
        href:
          'https://avatar-management--avatars.us-west-2.prod.public.atl-paas.net/557057:df2e56d6-313e-46b6-b524-584f659fc03d/21bb0dec-6324-4c87-b237-31a3b6718a37/128',
      },
    },
    uuid: '{22222}',
  },
  {
    display_name: 'User 3',
    links: {
      avatar: {
        href:
          'https://avatar-management--avatars.us-west-2.prod.public.atl-paas.net/557057:ed04c6c4-86a5-4713-b85f-d811f81f2a40/6461fd62-b683-474c-a448-c0b35d08d468/128',
      },
    },
    uuid: '{33333}',
  },
  {
    display_name: 'User 4',
    links: { avatar: { href: '#' } },
    uuid: '{44444}',
  },
  {
    display_name: 'User 5',
    links: { avatar: { href: '#' } },
    uuid: '{55555}',
  },
  {
    display_name: 'User 6',
    links: { avatar: { href: '#' } },
    uuid: '{66666}',
  },
  {
    display_name: 'User 7',
    links: { avatar: { href: '#' } },
    uuid: '{77777}',
  },
  {
    display_name: 'User 8',
    links: { avatar: { href: '#' } },
    uuid: '{88888}',
  },
].map((u) => new User(u));
