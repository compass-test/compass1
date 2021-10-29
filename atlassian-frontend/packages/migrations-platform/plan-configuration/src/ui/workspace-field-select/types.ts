// Limited version of Bitbucket workspace object
export type BBWorkspace = {
  uuid: string;
  links: {
    self: {
      href: string;
    };
    html: {
      href: string;
    };
    avatar: {
      href: string;
    };
  };
  created_on: string;
  type: 'workspace';
  slug: string;
  is_private: boolean;
  name: string;
};
