import { EUserRole } from "shared-core";

export interface ICredential {
  email: string;
  name: string;
  user_id: number;
  role: EUserRole;
  since: number;
  system_id: number;
  updated_at: number;
  created_by: string;
}
