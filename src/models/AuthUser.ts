import {TRole, TUserStatus} from '@constants/User';

export interface AuthUser {
  id: number;
  access: string;
  role: TRole;
  username: string;
  status: TUserStatus;
}

export interface RegisterAccountPayload {
  username: string;
  pass: string;
  role: TRole;
}

export interface RegisterProfilePayload {
  full_name: string;
  phone_number: string;
  job_position: string;
  gender: string;
  employee_id: string;
}
