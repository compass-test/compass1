export interface Collaborator {
  id: string;
  name: string;
  avatarUrl: string;
}

export interface CollaboratorsState {
  users: Collaborator[];
  loaded: boolean;
}
