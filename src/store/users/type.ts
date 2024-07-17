export interface IUser {
  email: string;
  name: string;
  id: number;
  role: EUserRole;
  since: number;
  system_id: number;
  updated_at: number;
}

export enum EUserRole {
  ADMIN = 1,
  USER = 2,
}
